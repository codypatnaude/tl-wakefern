import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../../services/order/order.service';
import { Observable } from 'rxjs'
import { ApiService } from '../../../services/api/api.service';
import { isArray } from 'util';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  @Input() item;
  loading = false;

  constructor(public orderService: OrderService, public api: ApiService) {
    
    console.log(this.api);
  }

  ngOnInit() {
    console.log(this);
    this.item.available = true;
    this.orderService.storeObservable.subscribe(store => this.handleStoreChange(store));
  }
  
  private handleStoreChange(store){
    if(store && this.item){
      this.api.getStoreItem(this.item.item.upc2, store.PseudoStoreId)
      .subscribe(item=>{
        if(!item || (isArray(item) && item.length === 0) || item.InStock === false){
          this.item.available = false;
        }else{
          this.item.available = true;
        }
        
        this.item.productInfo = item
      })
    }
  }

}
