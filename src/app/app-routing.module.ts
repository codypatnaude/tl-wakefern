import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ZipLookupComponent } from './search/zip-lookup/zip-lookup.component';
import { ZipComponent } from './search/zip/zip.component';
import { SchoolComponent } from './search/school/school.component';
import { ListComponent } from './search/list/list.component';
import { OrderComponent } from './order/order.component';
import { ListReviewComponent } from './order/list-review/list-review.component';
import { StoreComponent } from './order/list-review/store/store.component';

const routes: Routes = [
  {
    path:'search', 
    component: SearchComponent,
    children: [
      {
        path: '',
        component: ZipLookupComponent
      },
      {
        path: 'zip/:zip',
        component: ZipComponent
      },
      {
        path: 'school/:id',
        component: SchoolComponent
      },
      {
        path: 'list/:id',
        component: ListComponent
      }
    ]
  },
  {
    path:'order',
    component: OrderComponent,
    children: [
      {
        path:':listid',
        component: ListReviewComponent,
        children: [
          {
            path: 'store',
            component: StoreComponent
          }
          
        ]
      }
    ]
  },
  {path:'**', redirectTo: '/search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
