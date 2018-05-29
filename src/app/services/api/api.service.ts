import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/share';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService{

  sessionId=null;
  session=null;
  loginObservable=null;
  constructor(private http: HttpClient) {console.log('API SERVICE') }

  /** 
   * @param {string} returnURL  The url to return to once the SSO process is complete
   * @param {string} sessionID  The SSO session id if you have one (optional)
   * 
   * @returns {Observable} Observable that resolves to the user login info upon success
   * 
   * @description Makes a call to the wakefern login api to check to see if user has an active session
   */
  login(returnURL, sessionId){

    if(this.session && this.session.UserInfo.Email){
      let ret = Observable.create(observer => observer.next(this.session));
      return ret
    }else if(this.loginObservable){
      return this.loginObservable;
    }else{
      let url = `/api/login?returnurl=${returnURL}${sessionId?`&sessId=${sessionId}`:''}`;
      
      //When creating this observable we need to call 'share' otherwise the call will be made once per subscriber
      this.loginObservable = this.http.get<any>(url).share();

      this.loginObservable.subscribe(res=>this.session = res)

      return this.loginObservable;
    }
  }

  /**
   * @returns {Observable} Observable that resolves to the session information
   */
  getSession():Observable<any>{
    return this.session? Observable.create(observer => observer.next(this.session)): this.loginObservable
  }

  /**
   * 
   * @param {string} zip  the zip code to check
   * @returns {observable}  response from api
   * @description Uses the teacherlists api to return all schools in a ceratin zip code
   */
  findSchoolsByZip(zip: string): Observable<any>{
    return this.http.get<any>(`/api/schoolsByZip/${zip}`)
    .pipe(
      catchError(this.handleError('findSchoolsByZip', []))
    )
  }

  /**
   * 
   * @param {string} schoolId  the teacherlists id of the school
   * @returns array of lists for the selected school
   * @description Uses the teacherlists api to get supply lists associated with a certain school
   */
  findListsBySchool(schoolId: string): Observable<any>{
    return this.http.get<any>(`/api/listsBySchool/${schoolId}`)
    .pipe(
      catchError(this.handleError('findListsBySchool', []))
    )
  }

  /**
   * 
   * @param {string} id  teacherlists list id
   * @returns {observable}  list object
   * @description Uses the teacherlists API to retrieve list details
   */
  getList(id: string): Observable<any>{
    return this.http.get<any>(`/api/list/${id}`)
    .pipe(
      map(
        results=>{
          results.classroom.grade_level_string = results.classroom.grade_levels.map(elem=>elem.grade).join(', ');
          return results
        }
      ),
      catchError(this.handleError('getList', []))
    )
  }

  /**
   * 
   * @param id id of school to revrieve
   * @returns school details
   * @description Uses the teacherlists api to retrieve details about a school
   */
  getSchool(id: string): Observable<any>{
    return this.http.get<any>(`/api/school/${id}`)
    .pipe(
      catchError(this.handleError('getSchool', []))
    )
  }

  /**
   * 
   * @param id MWG store id
   * @description Uses the MWG api to retrieve store information
   */
  getStore(id: string): Observable<any>{
    return this.http.get<any>(`/api/store/${id}`)
    .pipe(
      catchError(this.handleError('getList', []))
    )
  }

  /**
   * 
   * @param zip 
   * @param radius 
   * @description Uses the MWG api to return stores within a certain radius of a zip
   */
  storesByZip(zip, radius): Observable<any>{
    return this.http.get<any>(`/api/storesByZip/${zip}/radius/${radius}`)
    .pipe(
      catchError(this.handleError('getList', []))
    )
  }

  getStoreItem(itemId, storeId){
    return this.http.get<any>(`/api/product/${itemId}/store/${storeId}`)
    .pipe(
      catchError(this.handleError('getItemAvailability', []))
    )
  }

  /**
   * 
   */
  addCartItem(userId, storeId, itemId, qty): Observable<any>{
    console.log(itemId)
    
    return this.http.get<any>(`/api/addToCart/user/${userId}/store/${storeId}/item/${itemId}/qty/${qty}`)
    .pipe(
      catchError(this.handleError('getItemAvailability', []))
    )
    /*
    let ret = new Subject();
    
    setTimeout(()=>{
      ret.next(itemId);
      ret.complete();
    }, 2000)
    
    return ret;*/
  }

  /**
   * @ignore
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
