import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/forkJoin';
import * as _ from "lodash";
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class OrderService {

  session;
  originalList;
  list;
  private store;
  loggedIn = false;

  storeObservable = new BehaviorSubject(this.store);

  constructor(private api: ApiService) {
    
    api.getSession()
    .subscribe(session=>{
      this.loggedIn = true;
      this.session = session;
      if(!session.UserInfo.StoreId){
        return
      }
      this.getStore(session.UserInfo.StoreId);
    })
  }

  setStore(store){
    this.store = store;
    this.storeObservable.next(store);
  }

  getStore(id?){
    
    if(!id){
      return this.store
    }

    if(!this.loggedIn){
      return null
    }
    this.api.getStore(id).
    subscribe(store => this.setStore(store))
  }

  getList(id: string){
    console.log(id);
    let obs = this.api.getList(id)
    .share()

    console.log('just shared')

    obs.subscribe(res=>{
      console.log('got list')

      this.originalList = res;
      this.resetList();
    })
    
    return obs
  }

  resetList(){
    this.list = _.cloneDeep(this.originalList);
  }

  storesByZip(zip, radius){
    return this.api.storesByZip(zip, radius);
  }

  orderableItems(){
    return this.list.list_details.filter(elem=>(!elem.deleted && elem.available && elem.qty > 0));
  }

  addListToCart(): Observable<any>{
    let cartObservable = new Subject();
    let requests = [];

    this.orderableItems().forEach(item => {
      console.log(item)
      requests.push(this.api.addCartItem(this.session.UserInfo.AccountId, this.store.PseudoStoreId, item.productInfo.Id, item.qty))
    });

    forkJoin(...requests)
    .subscribe(res=>{
      console.log(res)
      cartObservable.next(true);
      cartObservable.complete();
    })


    return cartObservable;
  }

}
