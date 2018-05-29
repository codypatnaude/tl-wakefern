const express = require('express');
const request = require('request-promise');
var { graphql, buildSchema } = require('graphql');

function CreateRouter(config, teacherlistsSchema){

  const router = express.Router();

  router.get('/schoolsByZip/:zip', (req, res) =>{

    request.get(`https://api.teacherlists.com/v3/School?app_id=${config.teacherlists.app_id}&app_key=${config.teacherlists.app_key}&zip=${req.params.zip}`)
    .then(
      response => res.send(JSON.parse(response).subset),
      err => res.status(500).send(err)
    );
  });

  router.get('/listsBySchool/:schoolId', (req, res) =>{

    const query = `query {
      school_lists(school_id: "${req.params.schoolId}"){
        id
        list_name
        classroom{
          name
          grade_levels{
            grade
          }
        }
        item_count
      }
    }`

    graphql(teacherlistsSchema, query)
    .then(
      response => res.send(response.data.school_lists)
    )
  });

  router.get('/login', (req, res) => {
    const returnURL = req.query.returnurl;
    const sessionId = req.query.sessId;

    console.log('login called');

     ////KP : Alert to verify login called for SSO to get SessionId - Alert is NOT Defined
     //alert("KP : Alert to verify login called for SSO to get SessionId : " + sessionId + " returnURL : " + returnURL); 
     //console.log('KP : Alert to verify call login SSO to get SessionId : ' + sessionId + ' returnURL : ' + returnURL);
     var tmpKPVar = `https://wfcapi.azurewebsites.net/api/v1/sp/sso${sessionId?`/sessId/${sessionId}`:''}?returnUrl=${encodeURIComponent(returnURL)}`;
     console.log('KP : SSO to get SessionId : ' + sessionId + ' returnURL : ' + returnURL + ' tmpKPVar : '+ tmpKPVar);

    /**Get session info or redirect url for SSO */
    request({
      method: 'GET',
      uri: `https://wfcapi.azurewebsites.net/api/v1/sp/sso${sessionId?`/sessId/${sessionId}`:''}?returnUrl=${encodeURIComponent(returnURL)}`,
      followAllRedirects: true,
      headers: {
        'Authorization': config.myWebGrocer.sso_key
      },
      body: {},
      json: true
    })

    /**Create MWG session */
    .then(
      response => {
        response.log = []
        
        /**Check to see if the user is logged in, if not just return the response containing the redirect url */
        if(response.SSOUrl.length){
          //KP : Additional Alert to verify if SSO URL is active and if User is logged-in
          //alert("KP : Additional Alert to verify if SSO URL is active and if User is logged-in");
          console.log('KP : SSO Response.SSOUrl.length : ' +  response.SSOUrl.length + '  SSO Response : ' + response);
          return response
        }

        console.log('no SSO URL');
        response.log.push('no SSO URL');

        //KP : Additional Alert to verify if SSO URL is called
        //alert("KP : Additional Alert to verify if SSO URL is called");
        console.log('KP : no SSO URL : In-between & creating annonymous');

        console.log('creating annonymous');
        response.log.push('creating annonymous');
        /**Create an annonymous session */
        return request({
          method: 'POST',
          uri: `${config.myWebGrocer.host}/api/authorization/v7/authorization`,
          followAllRedirects: true,
          headers: {
            'Authorization': config.myWebGrocer.api_key,
            'Content-Type': 'application/json'
          },
          body: {},
          json: true
        })
      
        /**Next elevate the session with user credentials */
        /**KP : Elevation of Session Credentials - Errors $http.PUT  */
        // .then(
        //   sessionRes => {
        //     console.log('elevating')
        //     response.log.push('elevating');

        //     //KP : Additional Alert to verify if SSO Auth Request and corresponding response
        //     console.log('KP : SSO Auth Request sessionRes.Token : ' + sessionRes.Token + ' sessionRes : '+ sessionRes) ;
 
        //     //KP : It appears that the Error is getting thrown here due to the PUT Verb
        //     return request({
        //       method: 'PUT',
        //       uri: `${config.myWebGrocer.host}/api/account/v7/chains/${config.myWebGrocer.chain}/authentication`,
        //       followAllRedirects: true,
        //       headers: {
        //         'Authorization': sessionRes.Token,
        //         //'Content-Type': 'application/json'
        //         'Content-Type': 'application/vnd.mywebgrocer.account-authentication+json'
        //       },
        //       ////KP : Body parameters have changed.
        //       //body: {Email: "mlcboarder@gmail.com", Password:"Wakefern1!"},
        //       body: {Email: "kpasumarthy@gmail.com", Password:"Shoprite2018!"},
        //       //body: {},
        //       json: true
        //     })
        //     .then(
        //       ////KP : Commented Out
        //       //res => sessionRes.Token,
        //       //err => Promise.reject(err)
        //       res => {
        //         sessionRes.Token
        //         //KP : Additional Alert to verify if SSO Auth Request and corresponding response
        //         console.log('KP : SSO Auth Request Resp sessionRes.Token : ' + sessionRes.Token + ' res : '+ res) ;
        //       },
        //       err => {
        //         Promise.reject(err)
        //         //KP : Additional Alert to verify if SSO Auth Request and corresponding response
        //         console.log('KP : SSO Auth Request Resp Error sessionRes.Token : ' + sessionRes.Token + ' sessionRes (1) err : '+ err) ;
              
        //       }

        //     )
        //   },
        //   ////KP : Commented Out
        //   //err => Promise.reject(err)
        //   err => {
        //     Promise.reject(err)
        //     //KP : Additional Alert to verify if SSO Auth Request and corresponding response
        //     console.log('KP : SSO Auth Request Resp Error sessionRes.Token : ' + sessionRes.Token + ' sessionRes (2) err : '+ err) ;
          
        //   }
        // )
        
        /**Next elevate the session with user credentials */
        /**KP : UPGRADING of Session Credentials - Try $http.POST  */
        .then(
          sessionRes => {
            console.log('Upgrading - $http.PUT')
            response.log.push('Upgrading - $http.PUT');

            //KP : Additional Alert to verify if SSO Auth Request and corresponding response
            console.log('KP : SSO Auth Request sessionRes.Token : ' + sessionRes.Token + ' sessionRes : '+ sessionRes) ;
 
            //KP : It appears that the Error is getting thrown here due to the PUT Verb - So trying $http.POST
            return request({
              method: 'PUT',
              //uri: `${config.myWebGrocer.host}/api/account/v7/chains/${config.myWebGrocer.chain}/authentication`,
              uri: 'https://shop-sr75stg.staging.shoprite.com/api/authorization/v7/authorization/' + sessionRes.Token + '/upgrade',
              followAllRedirects: true,
              headers: {
                //'Authorization': sessionRes.Token,
                //'Content-Type': 'application/json'
                'Authorization': config.myWebGrocer.api_key,
                'Content-Type': 'application/json'
              },
              ////KP : Body parameters have changed.
              //body: {Email: "mlcboarder@gmail.com", Password:"Wakefern1!"},
              //body: {Email: "kpasumarthy@gmail.com", Password:"Shoprite2018!"},
              //body: { UserId: "5719e5a1-a51c-4dda-8a9d-7245be6833cf"}, //KP : Mark Covello's ID
              body: { 'UserId': 'e7f05a44-efba-4954-b43c-c6c387078675'}, //KP : Kailash Pasumarthy's MWG DEP A/c-ID
              json: true
            })
            .then(
              ////KP : Commented Out
              //res => sessionRes.Token,
              //err => Promise.reject(err)
              res => {
                sessionRes.Token
                //KP : Additional Alert to verify if SSO Auth Request and corresponding response
                console.log('KP : SSO Auth Request Resp sessionRes.Token : ' + sessionRes.Token + ' res : '+ res) ;
              },
              err => {
                Promise.reject(err)
                //KP : Additional Alert to verify if SSO Auth Request and corresponding response
                console.log('KP : SSO Auth Request Resp Error sessionRes.Token : ' + sessionRes.Token + ' sessionRes (1) err : '+ err) ;
              
              }

            )
          },
          ////KP : Commented Out
          //err => Promise.reject(err)
          err => {
            Promise.reject(err)
            //KP : Additional Alert to verify if SSO Auth Request and corresponding response
            console.log('KP : SSO Auth Request Resp Error sessionRes.Token : ' + sessionRes.Token + ' sessionRes (2) err : '+ err) ;
          
          }
        )


        //**Add mwg session id to response */
        .then(
          res => {
            response.log.push('adding ' + res);
            response.MWGSession = res;
            req.session.MWGSession = res;

             //KP : Additional Alert to verify if SSO Auth Request and corresponding response
             console.log('KP : SSO Auth Request Resp response.MWGSession : ' + response.MWGSession ) ;

            return response;
          },
          ////KP : Commented Out
          //err => Promise.reject(err)
          err => {
            Promise.reject(err)
            //KP : Additional Alert to verify if SSO Auth Request and corresponding response
            console.log('KP : SSO Auth Request Resp Error sessionRes.Token : ' + sessionRes.Token + ' sessionRes (3) err : '+ err) ;
          
          }
        )

      }
    )
    .then(
      response => {
        res.send(response);
      },
      err => res.status(500).send(err)
    )
    .catch(err=>res.status(500).send(err));

  });

  router.get('/school/:id', (req, res) => {
    request.get(`https://api.teacherlists.com/v3/School/${req.params.id}?app_id=${config.teacherlists.app_id}&app_key=${config.teacherlists.app_key}`)
      .then(
        response => res.send(JSON.parse(response)),
        err => res.status(500).send(err)
      );
  })

  router.get('/list/:id', (req, res) => {
    const query = `query {
      list(id: "${req.params.id}"){
        id
        list_name
        modified
        classroom{
          name
          grade_levels{
            grade
          }
        }
        school{
          id
          name
        }
        list_details{
          item{
            name
            brand
            upc1
            upc1_qty
            upc2
            upc2_qty
            upc3
            upc3_qty
            item_qty_desc
            orderable
          }
          qty
        }
      }
    }`;

    graphql(teacherlistsSchema, query)
    .then(
      response => res.send(response.data.list)
    );

  });

  router.get('/storesByZip/:zip/radius/:radius', (req, res) => {

    let query = `${config.myWebGrocer.host}/api/stores/v7/chains/${config.myWebGrocer.chain}/stores?postalCode=${req.params.zip}&radius=${req.params.radius}`

    request({
      method: 'GET',
      uri: query,
      followAllRedirects: true,
      headers: {
        'Authorization': req.session.MWGSession,
        'Accept': 'application/vnd.mywebgrocer.stores+json'
      },
      json: true
    })
    .then(
      response => res.send(response)
    )
  })

  router.get('/product/:itemId/store/:storeId', (req, res) => {

    let query = `${config.myWebGrocer.host}/api/product/v7/product/store/${req.params.storeId}/sku/${req.params.itemId}`;
    console.log(query);
    request({
      method: 'GET',
      uri: query,
      followAllRedirects: true,
      headers: {
        'Authorization': req.session.MWGSession,
        'Accept': 'application/vnd.mywebgrocer.grocery-item+json'
      },
      json: true
    })
    .then(
      response => res.send(response),
      response => {
        console.log(response.statusCode)
        if(response.statusCode === 404){
          res.status(404).send(response);//JSON.stringify('Item not found'))
        }else{
          res.status(500).send(response);
        }
      }
    )
  })

  router.get('/store/:id', (req, res) => {
    request({
      method: 'GET',
      uri: `${config.myWebGrocer.host}/api/stores/v7/chains/${config.myWebGrocer.chain}/stores/${req.params.id}`,
      followAllRedirects: true,
      headers: {
        'Authorization': req.session.MWGSession,
        'Accept': 'application/vnd.mywebgrocer.store+json'
      },
      json: true
    })
    .then(
      response => res.send(response)
    )
  })

  router.get('/addToCart/user/:userId/store/:storeId/item/:itemId/qty/:qty', (req, res) => {
    console.log(`${config.myWebGrocer.host}/api/cart/v7/user/${req.params.userId}/store/${req.params.storeId}/item`)
    request({
      method: 'POST',
      uri: `${config.myWebGrocer.host}/api/cart/v7/user/${req.params.userId}/store/${req.params.storeId}/item`,
      followAllRedirects: true,
      headers: {
        'Authorization': req.session.MWGSession,
        'Content-Type': 'application/vnd.mywebgrocer.cart-item+json'
      },
      json: true,
      body: {
        "ItemType": "product",
        "Quantity": req.params.qty,
        "Note": "",
        "ItemKey":`product~${req.params.itemId}`
      }
    })
    .then(
      response => res.send(response),
      err => res.send(err)
    )
  })

  router.get('/session', (req, res)=>{
    res.send(req.session);
  })

  return router;
}

module.exports = CreateRouter;