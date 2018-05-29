import { Component } from '@angular/core'

@Component({
  selector: 'host-component',
  template: '<app-list-detail [item]=item></app-list-detail>'
})
export class MockHostComponent{
  item = {
    qty: 2,
    item: {
      name: 'test item'
    }
  };

  constructor(){}
  
}