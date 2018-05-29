import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SearchService {

  zip: string;
  schools: Array<any>;
  selectedSchool: any;
  lists: Array<any>;
  selectedList: any;
  constructor(private api: ApiService) { }

  findSchoolsByZip(zip: string){
    this.zip = zip;
    this.schools = null;
    this.selectedSchool = null;
    this.selectedList = null;
    this.lists = null;

    return this.api.findSchoolsByZip(zip)
    .pipe(
      tap(results=>this.schools = results)
    );
  }

  findListsBySchool(schoolId: any){
    return this.api.findListsBySchool(schoolId)
    .pipe(
      tap(results=>this.lists = results)
    );
  }

  getSchool(id:string){
    return this.api.getSchool(id);
  }

  getList(id: string){
    
    return this.api.getList(id)
    .pipe(
      tap(
        results=>{
          console.log(results)
          this.selectedList = results;
          console.log(this.selectedList)
        }
      ),
      catchError(err=>{console.log(err);return err})  
    )
  }

}
