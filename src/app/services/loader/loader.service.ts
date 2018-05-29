import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private visible = false;
  private defaultMessage = 'Stocking the shelves';
  private message;
  private description;
  constructor() { }

  show(message?, description?){
    console.log("MESSAGE: " + this.defaultMessage)
    if(message){
      this.message = message;
    }else{
      this.message = this.defaultMessage;
    }

    this.description = description;

    this.visible = true;
  }

  hide(){
    this.visible = false;
  }

  isVisible(){
    return this.visible;
  }

  getMessage(){
    return this.message;
  }

  getDescription(){
    return this.description;
  }

}
