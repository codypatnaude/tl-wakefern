import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

import { RouterTestingModule } from '@angular/router/testing';

import { SearchService } from '../../services/search/search.service'
import { MockSearchService } from '../../test/mocks/search.service'

import { LoaderService } from '../../services/loader/loader.service';
import { MockLoaderService } from '../../test/mocks/loader.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers:[
        {provide: SearchService, useClass: MockSearchService},
        {provide: LoaderService, useClass: MockLoaderService}
      ],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
