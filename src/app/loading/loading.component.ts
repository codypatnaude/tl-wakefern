import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public model: LoaderService) { }

  ngOnInit() {
  }

  show(){
    return this.model.isVisible();
  }

  message(){
    return this.model.getMessage();
  }

  description(){
    return this.model.getDescription();
  }

}
