import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolComponent } from './school.component';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchService } from '../../services/search/search.service'
import { MockSearchService } from '../../test/mocks/search.service'

import { LoaderService } from '../../services/loader/loader.service';
import { MockLoaderService } from '../../test/mocks/loader.service';

describe('SchoolComponent', () => {
  let component: SchoolComponent;
  let fixture: ComponentFixture<SchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolComponent ],
      imports: [RouterTestingModule],
      providers:[
        {provide: SearchService, useClass: MockSearchService},
        {provide: LoaderService, useClass: MockLoaderService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
