# Teacherlists UX for Wakefern

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Installation and Configuration

To install the application simply navigate to the desired directory and clone the repo.

```
git clone https://github.com/schoolfamilymedia/tl-wakefern
```

The configuration file included in the repo needs to be renamed in order to be picked up by the application. From the root of the directory

```
mv config.default.js config.js
```

Before you can run the applicaiton a small amount of configuration needs to be done. To do this open the `config.js` file that is in the project directory. This file contains all the configuration options for the application.

* `teacherlists.app_id` and `teacherlists.app_key` need match the credentials you were provided to access the teacherlists api. If you don't have those credentials please reach out.
* `myWebGrocier.api_key` is the authorization token for the MWG api
* `myWebGrocier.sso_key` is the authorization token used to access the SAML api
* `myWebGrocier.host` is the endpoint for the MWG api
* `myWebGrocier.chain` is the chain id for shop rite
* `ssl.cert` The ssl certificate file to use for https.
* `ssl.key` The ssl key file to use for https.

Once all of this has been configured execute `npm install` in the project directory to install dependencies.

## Serving the application

This project uses an express server as a back end. To run the server execute `node server.js` in the working directory of the project. By default the application will run on port 3000

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Building and serving the documentation

This project uses compodoc to automatically build and maintain documentation. Run `npm run doc:buildandserve` to build and serve the documentation.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
