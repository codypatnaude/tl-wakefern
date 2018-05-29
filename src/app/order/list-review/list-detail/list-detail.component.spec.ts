import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderService } from '../../../services/order/order.service';
import { MockOrderService } from '../../../test/mocks/order.service';

import { ApiService } from '../../../services/api/api.service';
import { MockApiService } from '../../../test/mocks/api.service';

import { ListDetailComponent } from './list-detail.component';
import { FormsModule } from '@angular/forms';

import { MockHostComponent } from '../../../test/mocks/list.detail.host';

describe('ListDetailComponent', () => {
  let component: ListDetailComponent;
  let fixture: ComponentFixture<ListDetailComponent>;
  let testFixture: ComponentFixture<MockHostComponent>;
  let testComponent: MockHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailComponent, MockHostComponent ],
      imports: [ FormsModule ],
      providers:[ 
        {provide: OrderService, useClass: MockOrderService},
        {provide: ApiService, useClass: MockApiService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(MockHostComponent);
    testComponent = testFixture.componentInstance;
    testFixture.detectChanges();
  });

  it('should create', () => {
    //testComponent.setItem();
    //testFixture.detectChanges();
    expect(testComponent).toBeTruthy();
  });
});

