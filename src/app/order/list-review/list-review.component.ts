import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreComponent } from './store/store.component';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {

  constructor(public model: OrderService, private route: ActivatedRoute, public modalService: NgbModal, public loaderService: LoaderService) { }
  list = {};
  hidelist = false;

  ngOnInit() {
    /**pass the list id from the url to the service */
    console.log('params')
    console.log(this.route);
    let id = this.route.snapshot.params['listid'];
    console.log('List ID', id)
    this.loaderService.show("Gathering list details");
    this.model.getList(id)
    .subscribe(list => {
      console.log(list)
      this.loaderService.hide();
      this.list = this.model.list;
    })
  }

  getStore(){
    return this.model.getStore();
  }

  getList(){
    return this.model.list;
  }

  getSession(){
    return this.model.session;
  }

  getStoreDirectionsURL(){
    if(!this.getStore()){
      return null
    }
    return this.getStore().AppLinks.find(elem => elem.Rel == "driving-directions").Uri
  }

  getStoreAddress(){
    if(!this.getStore()){
      return null
    }
    return this.getStore().Sections.find(elem => elem.Section === 'Store')
  }

  filteredListDetails(){
    if(!this.getList() || !this.getList().list_details){
      return []
    }
    return this.getList().list_details.filter(elem=>!elem.deleted) || [];
  }

  resetList(){
    return this.model.resetList()
  }

  openStoreModal(){
    console.log('click')
    console.log(StoreComponent);
    this.modalService.open(StoreComponent);
  }

  isPreferredStore(){
    return this.getStore().PseudoStoreId === this.model.session.UserInfo.StoreId;
  }

  orderableItems(){
    return this.getList().list_details.filter(elem=>(!elem.deleted && elem.available && elem.qty > 0));
  }

  addListToCart(){
    console.log('adding to cart')
    this.hidelist = true
    this.loaderService.show('Filling your cart', 'You will be re-directed to your cart automatically')
    this.model.addListToCart()
    .subscribe(res=>window.location.assign(`http://shop-sr75stg.staging.shoprite.com/store/${this.model.getStore().PseudoStoreId}#/cart`))
  }

  log(){
    console.log(this.getStoreAddress())
    this.getStore().Sections.find(elem => console.log(elem.Name))
  }

}
