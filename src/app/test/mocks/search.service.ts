import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockSearchService{
  getList(){
    return Observable.of(
      {"id":"1166078","list_name":"Kindergarten Supply List 2017-2018","modified":"2017-07-20 11:44:47","classroom":{"name":"All kindergarten Teachers","grade_levels":[{"grade":"Kindergarten"}]},"school":{"id":"30051","name":"Center School"},"list_details":[{"item":{"name":"Crayola Crayons, 24 Count","brand":"Crayola","upc1":"071662069247","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"2"},{"item":{"name":"Crayola Washable Markers, 8 Count","brand":"Crayola","upc1":"071662078089","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"},{"item":{"name":"Crayola Colored Pencils ","brand":"Crayola","upc1":"071662040246","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"},{"item":{"name":"Elmer's Glue Stick, Large (22g /.77 oz)","brand":"Elmer's","upc1":"026000005432","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"6"},{"item":{"name":"Mead® Five Star® Composition Notebook Wide Ruled, Bound","brand":"Mead","upc1":"043100095958","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"}]}
    )
  }

  getSchool(){
    return Observable.of(
      {"id":30051,"School_Name":"Center School","Address":"11 ASH ST","Address2":null,"City":"HOPKINTON","State":"MA","Zip":"01748","Zip4":"1894","Lowest_Grade":"K","Highest_Grade":"G1","District_ID":3830,"modified_at":"2017-07-06 16:30:10","created_at":null,"_href":"/v3/School/30051"}
    )
  }

  findListsBySchool(){
    return Observable.of(
      [{"id":"1166078","list_name":"Kindergarten Supply List 2017-2018","classroom":{"name":"All kindergarten Teachers","grade_levels":[{"grade":"Kindergarten"}]},"item_count":5},{"id":"1166088","list_name":"First Grade Supply List 2017-2018","classroom":{"name":"All 1st Grade Teachers","grade_levels":[{"grade":"1st Grade"}]},"item_count":7}]
    )
  }

  findSchoolsByZip(){
    return Observable.of(
      [{"id":30051,"School_Name":"Center School","Address":"11 ASH ST","Address2":null,"City":"HOPKINTON","State":"MA","Zip":"01748","Zip4":"1894","Lowest_Grade":"K","Highest_Grade":"G1","District_ID":3830,"modified_at":"2017-07-06 16:30:10","created_at":null,"_href":"/v3/School/30051"},{"id":30052,"School_Name":"Elmwood School","Address":"14 Elm Street","Address2":null,"City":"Hopkinton","State":"MA","Zip":"01748","Zip4":"1612","Lowest_Grade":"G2","Highest_Grade":"G3","District_ID":3830,"modified_at":"2016-03-15 00:27:31","created_at":null,"_href":"/v3/School/30052"},{"id":30053,"School_Name":"Hopkins Elementary School","Address":"104 HAYDEN ROWE ST","Address2":null,"City":"HOPKINTON","State":"MA","Zip":"01748","Zip4":"2508","Lowest_Grade":"G4","Highest_Grade":"G5","District_ID":3830,"modified_at":"2017-07-06 16:30:10","created_at":null,"_href":"/v3/School/30053"},{"id":1000006686,"School_Name":"Hopkinton High School","Address":"90 HAYDEN ROWE STREET","Address2":null,"City":"HOPKINTON","State":"MA","Zip":"01748","Zip4":"1847","Lowest_Grade":"G9","Highest_Grade":"G12","District_ID":3830,"modified_at":"2017-07-10 17:30:04","created_at":null,"_href":"/v3/School/1000006686"},{"id":131354,"School_Name":"The Learning Center of Hopkinton","Address":"59 Wood St","Address2":null,"City":"Hopkinton","State":"MA","Zip":"01748","Zip4":null,"Lowest_Grade":"PreK","Highest_Grade":"K","District_ID":null,"modified_at":"2017-06-14 15:26:04","created_at":"2016-11-30 13:34:37","_href":"/v3/School/131354"}]
    )
  }

}