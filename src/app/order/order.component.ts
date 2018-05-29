import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader/loader.service';
import { StoreComponent } from './list-review/store/store.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent{

  authenticated = false;

  constructor(public route: ActivatedRoute, public api: ApiService, public loader: LoaderService) {
    console.log('logging in in base');
    
    this.route.queryParams.subscribe(params =>{
      let sessionId = null;
      if(params.sessId){
        sessionId = params.sessId;
      }
      this.loader.show("Logging in to ShopRite")
      this.login(sessionId);
    })

  }

  ngOnInit() {}

  login(sessionId){
    //Make sure we're logged in
    console.log('CALLING LOGIN!!')
    //console.log(this.api.login(window.location.href.split('?')[0], sessionId))
    this.api.login(window.location.href.split('?')[0], sessionId)
    .subscribe(res => {
      console.log(res);
      if(!res.UserInfo.Email){
        console.log(decodeURIComponent(res.SSOUrl))
        window.location.href = decodeURIComponent(res.SSOUrl);
      }else{
        this.loader.hide();
        this.authenticated = true;
      }
    });
  }

}
