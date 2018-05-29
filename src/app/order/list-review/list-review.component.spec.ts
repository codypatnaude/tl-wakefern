import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { ListReviewComponent } from './list-review.component';

import { OrderService } from '../../services/order/order.service';
import { MockOrderService } from '../../test/mocks/order.service';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../test/mocks/activatedroute';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../test/mocks/ngbmodal';

import { LoaderService } from '../../services/loader/loader.service';
import { MockLoaderService } from '../../test/mocks/loader.service';

describe('ListReviewComponent', () => {
  let component: ListReviewComponent;
  let fixture: ComponentFixture<ListReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReviewComponent, MockListDetailComponent],
      providers:[ 
        {provide: OrderService, useClass: MockOrderService},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: NgbModal, useClass: MockNgbModal},
        {provide: LoaderService, useClass: MockLoaderService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: '<app-list-detail>',
  template: '<li>test detail</li>'
})
class MockListDetailComponent{
  @Input() item;
}