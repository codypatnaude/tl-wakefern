import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiService } from '../services/api/api.service';
import { MockApiService } from '../test/mocks/api.service';

import { SearchService } from '../services/search/search.service'
import { MockSearchService } from '../test/mocks/search.service'

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [RouterTestingModule],
      providers:[
        {provide: SearchService, useClass: MockSearchService},
        {provide: ApiService, useClass: MockApiService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
