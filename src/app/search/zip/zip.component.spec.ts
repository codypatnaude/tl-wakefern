import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ZipComponent } from './zip.component';
import { SearchService } from '../../services/search/search.service'
import { MockSearchService } from '../../test/mocks/search.service'

import { LoaderService } from '../../services/loader/loader.service';
import { MockLoaderService } from '../../test/mocks/loader.service';

describe('ZipComponent', () => {
  let component: ZipComponent;
  let fixture: ComponentFixture<ZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipComponent ],
      imports:[RouterTestingModule],
      providers:[
        {provide: SearchService, useClass: MockSearchService},
        {provide: LoaderService, useClass: MockLoaderService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
