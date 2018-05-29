import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreComponent } from './store.component';

import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbActiveModal } from '../../../test/mocks/ngbactivemodal'
import { OrderService } from '../../../services/order/order.service';
import { MockOrderService } from '../../../test/mocks/order.service';

describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreComponent ],
      imports:[FormsModule],
      providers: [
        {provide: NgbActiveModal, useClass: MockNgbActiveModal},
        {provide: OrderService, useClass: MockOrderService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
