import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ZipLookupComponent } from './zip-lookup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ZipLookupComponent', () => {
  let component: ZipLookupComponent;
  let fixture: ComponentFixture<ZipLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipLookupComponent ],
      imports:[FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
