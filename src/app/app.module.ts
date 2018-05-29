import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from './services/api/api.service'
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './services/search/search.service';
import { ZipComponent } from './search/zip/zip.component';
import { SchoolComponent } from './search/school/school.component';
import { ListComponent } from './search/list/list.component';
import { ZipLookupComponent } from './search/zip-lookup/zip-lookup.component';
import { OrderComponent } from './order/order.component';
import { OrderService } from './services/order/order.service';
import { StoreComponent } from './order/list-review/store/store.component';
import { ListReviewComponent } from './order/list-review/list-review.component';
import { ListDetailComponent } from './order/list-review/list-detail/list-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchComponent,
    ZipComponent,
    SchoolComponent,
    ListComponent,
    ZipLookupComponent,
    OrderComponent,
    StoreComponent,
    ListReviewComponent,
    ListDetailComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  providers: [ApiService, SearchService, OrderService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
