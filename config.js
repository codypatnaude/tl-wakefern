var fs = require('fs');

let config = {
    teacherlists: {
        app_id:'b5dce0cc',
        app_key:'1d9c53545b773abb6393819bbd0e218c'
    },
    // ////KP : MWG Production Keys
    // myWebGrocer: {
    //     api_key: '5f757482-92e6-4818-84d4-febe95c0f77c',
    //     sso_key: '8edf1735-e698-49de-b391-fdffdd245f3d',
    //     host: 'https://api.shoprite.com',
    //     chain: 'FBFB139'
    // },
      // ////KP : MWG Staging Keys
    myWebGrocer: {
        api_key: '566E23CB-00BC-46C4-A8AE-66AE8FBB896F',
        sso_key: '8edf1735-e698-49de-b391-fdffdd245f3d',
        host: 'https://shop-sr75stg.staging.shoprite.com',
        chain: 'FBFB139'
    },
    ssl: {

        cert: './certificates/webserver.cert',
        key: './certificates/webserver.key'

    }
};

module.exports = config;