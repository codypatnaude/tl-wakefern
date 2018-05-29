import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockApiService{
  login(){
    return Observable.of(
      {"SSOUrl":"","UserInfo":{"Email":"mlcboarder@gmail.com","FSN":"48500727525","FirstName":"Mark","LastName":"Covello","AccountId":"5719e5a1-a51c-4dda-8a9d-7245be6833cf","StoreId":"F8F1623","ReturnUrl":"https://localhost:3000/order/1166078","sessId":"e4680e44-ce05-42f1-9f00-cb11d609f302"},"Active":"Y","Message":"","log":["no SSO URL","creating annonymous","elevating","adding 9cd9b1a2-4ab8-48a2-9377-8f3a2d1377c5"],"MWGSession":"9cd9b1a2-4ab8-48a2-9377-8f3a2d1377c5"}
    )
  }

  getSession(){
    return this.login()
  }

  getStore(){
    return Observable.of(
      {"Id":623,"PseudoStoreId":"F8F1623","AggregatorLocationId":0,"DistanceFrom":null,"Retailer":{"DisplayName":"Wakefern","ApiIdentifier":"pricerite","StoreGroupId":3602},"Chain":{"StoreGroupId":3601,"Id":139,"Label":"00001","DisplayName":"ShopRite","PseudoChainId":"FBFB139"},"ExternalId":"239","WebsiteDetailPage":"http://www.shoprite.com/member_srs/","Subdomain":"ShopRite","ContentHostingSubdomain":null,"PseudoStoreownerId":"0BFD3","TimeZone":"Eastern Standard Time","Sections":[{"Name":"ShopRite of Montgomery, NY","Section":"Store","SectionSchedule":["Mon-Sat 6am-12am","Sun 6am-10pm"],"Coordinates":{"Latitude":41.511399,"Longitude":-74.210376},"GeoFencing":{"GeoEnabled":false,"BeaconEnabled":false,"Latitude":0,"Longitude":0,"Radius":0},"Phone":"(845) 457 - 4114","Fax":"(845) 457 - 1940","Email":"shoprite@mywebgrocer.net","Address":{"AddressLine1":"99 Hawkins Dr","AddressLine2":null,"AddressLine3":null,"City":"Montgomery","Region":"New York","CountryCode":"USA","PostalCode":"12549"},"Contact":"Peter Torchiano"}],"ShoppingServices":[],"StoreServices":[],"MyWebGrocerServices":[{"Name":"Shop2GroPickup","Url":null},{"Name":"Shop2GroDelivery","Url":null},{"Name":"OnlineCirculars","Url":"https://shop-sr75stg.staging.shoprite.com/store/F8F1623#/circular/Weekly"},{"Name":"Shop2Gro","Url":"https://shop-sr75stg.staging.shoprite.com/store/F8F1623"},{"Name":"OrderReady","Url":"http://orders-sr75stg.staging.shoprite.com/Store/00001/239"}],"Links":[{"Rel":"self","Placeholders":[],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/stores/v7/chains/FBFB139/stores/F8F1623"},{"Rel":"delivers-to-template","Placeholders":["{postalCode}"],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/stores/v7/chains/FBFB139/stores/F8F1623/delivers-to/{postalCode}"},{"Rel":"store-entry","Placeholders":["{userId}"],"Queries":null,"Uri":"https://api-sr75stg.staging.shoprite.com/api/shop/v7/shop/user/{userId}/store/F8F1623"}],"AppLinks":[{"Rel":"driving-directions","Placeholders":[],"Queries":null,"Uri":"http://maps.google.com/?daddr=41.5113990000000000,-74.2103760000000000"}]}
    )
  }
}