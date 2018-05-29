import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockOrderService{
  storeObservable = new Subject();

  constructor(){
    setTimeout(()=>{
      this.storeObservable.next(
        {"Id":623,"PseudoStoreId":"F8F1623","AggregatorLocationId":0,"DistanceFrom":null,"Retailer":{"DisplayName":"Wakefern","ApiIdentifier":"pricerite","StoreGroupId":3602},"Chain":{"StoreGroupId":3601,"Id":139,"Label":"00001","DisplayName":"ShopRite","PseudoChainId":"FBFB139"},"ExternalId":"239","WebsiteDetailPage":"http://www.shoprite.com/member_srs/","Subdomain":"ShopRite","ContentHostingSubdomain":null,"PseudoStoreownerId":"0BFD3","TimeZone":"Eastern Standard Time","Sections":[{"Name":"ShopRite of Montgomery, NY","Section":"Store","SectionSchedule":["Mon-Sat 6am-12am","Sun 6am-10pm"],"Coordinates":{"Latitude":41.511399,"Longitude":-74.210376},"GeoFencing":{"GeoEnabled":false,"BeaconEnabled":false,"Latitude":0,"Longitude":0,"Radius":0},"Phone":"(845) 457 - 4114","Fax":"(845) 457 - 1940","Email":"shoprite@mywebgrocer.net","Address":{"AddressLine1":"99 Hawkins Dr","AddressLine2":null,"AddressLine3":null,"City":"Montgomery","Region":"New York","CountryCode":"USA","PostalCode":"12549"},"Contact":"Peter Torchiano"}],"ShoppingServices":[],"StoreServices":[],"MyWebGrocerServices":[{"Name":"Shop2GroPickup","Url":null},{"Name":"Shop2GroDelivery","Url":null},{"Name":"OnlineCirculars","Url":"https://shop-sr75stg.staging.shoprite.com/store/F8F1623#/circular/Weekly"},{"Name":"Shop2Gro","Url":"https://shop-sr75stg.staging.shoprite.com/store/F8F1623"},{"Name":"OrderReady","Url":"http://orders-sr75stg.staging.shoprite.com/Store/00001/239"}],"Links":[{"Rel":"self","Placeholders":[],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/stores/v7/chains/FBFB139/stores/F8F1623"},{"Rel":"delivers-to-template","Placeholders":["{postalCode}"],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/stores/v7/chains/FBFB139/stores/F8F1623/delivers-to/{postalCode}"},{"Rel":"store-entry","Placeholders":["{userId}"],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/shop/v7/shop/user/{userId}/store/F8F1623"}],"AppLinks":[{"Rel":"driving-directions","Placeholders":[],"Queries":null,"Uri":"http://maps.google.com/?daddr=41.5113990000000000,-74.2103760000000000"}]}
      )
    }, 1)
  }

  getList(){
    return Observable.of(
      {"id":"1166078","list_name":"Kindergarten Supply List 2017-2018","modified":"2017-07-20 11:44:47","classroom":{"name":"All kindergarten Teachers","grade_levels":[{"grade":"Kindergarten"}]},"school":{"id":"30051","name":"Center School"},"list_details":[{"item":{"name":"Crayola Crayons, 24 Count","brand":"Crayola","upc1":"071662069247","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"2"},{"item":{"name":"Crayola Washable Markers, 8 Count","brand":"Crayola","upc1":"071662078089","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"},{"item":{"name":"Crayola Colored Pencils ","brand":"Crayola","upc1":"071662040246","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"},{"item":{"name":"Elmer's Glue Stick, Large (22g /.77 oz)","brand":"Elmer's","upc1":"026000005432","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"6"},{"item":{"name":"Mead® Five Star® Composition Notebook Wide Ruled, Bound","brand":"Mead","upc1":"043100095958","upc1_qty":"1","upc2":null,"upc2_qty":null,"upc3":null,"upc3_qty":null,"item_qty_desc":"","orderable":"1"},"qty":"1"}]}
    )
  }
}