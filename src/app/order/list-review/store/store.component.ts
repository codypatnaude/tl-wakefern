import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public orderService: OrderService) { }

  stores;

  ngOnInit() {
  }

  findStoresByZip(form){
    this.orderService.storesByZip(form.zip, form.radius)
    .subscribe(res=>{this.stores = res.Stores;console.log(this.stores)});
  }

  selectStore(store){
    this.orderService.setStore(store);
    this.activeModal.dismiss();
  }

}
