
# TensorflowWebGesture
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/56626396/130964846-e9b857d5-1888-48f5-82d0-6c483d0e70ff.gif)
![ezgif com-gif-maker](https://user-images.githubusercontent.com/56626396/130964414-d9f036cd-b2fa-4f73-a969-f0ab4174f777.gif)


Tensorflow Web Gesture it's an angular library developed in order to implement gesture interaction in every existing web page. Here I will define how to use it and wich important aspects you should know. Also two important links:

-Thesis documentation:
******\*\*******\*\*\*\*******\*\*******Soon******\*\*******\*\*\*\*******\*\*******

-Example of implementation:
https://github.com/josinhr/smart-tv-example

Let's go with the steps:

  1. Install tensorflow-web-gesture: `npm i tensorflow-web-gesture`
  2. In you project angular.json add the library assets, should look like this: 
  
    "assets": [
              "apps/lib-appliance/src/favicon.ico",
              "apps/lib-appliance/src/assets",
              {
                "glob": "**/*",
                "input": "./node_modules/tensorflow-web-gesture/assets",
                "output": "/assets/"
              }
        ],
The part you should add is:
           `  {
                "glob": "**/*",
                "input": "./node_modules/tensorflow-web-gesture/assets",
                "output": "/assets/"
              }`
  
  3.Let's do the magic. Import the module in your app.module.ts:
  
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { TensorflowWebGestureModule } from 'tensorflow-web-gesture';

     import { AppComponent } from './app.component';

    @NgModule({
       declarations: [AppComponent],
      imports: [BrowserModule, TensorflowWebGestureModule],
      providers: [],
      bootstrap: [AppComponent],
    })
    export class AppModule {}
    
  4.Create a video input in the app HTML. Our library needs a video input in order to do the detection of the hands. Your can use the provided video component:
  
`<tensorflow-web-gesture-video></tensorflow-web-gesture-video>`

  This component can be refered with the etiquette "videoElement". In order to make everything working you just have to inject the Hand Gesture Service in your App component and runAfterInit the init of the service. A simple app.component.ts would be like this:
  
     import { AfterViewInit, Component } from '@angular/core';
     import { HandGestureService } from 'tensorflow-web-gesture';

    @Component({
      selector: 'tensorflow-web-gesture-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css'],
     providers: [],
    })
    export class AppComponent implements AfterViewInit {
      title = 'lib-appliance';

      public constructor(public handGestureService: HandGestureService) {}
      ngAfterViewInit(): void {
       const vid = <HTMLVideoElement>document.getElementById('videoElement');

       this.handGestureService.init(vid);
      }
    }

Or you can create also your own video element.

  5.Now everything is working. In every class you want to use this service you just need to inject it in the constructor.
  
  6. Finally we propose two ways to use the endpoints of our detector:
  
   6.1.The use of the async function. You can use directly in html, so will perform something when the subscriber receives a message.
  
    <div *ngIf="(handGestureService.subscribers.left | async) === 'left'">
       Hello world
    </div>
    
   6.2.The use of subscribers. This use is not recommended, you would have to manage the subscriptions and unsubscription. You can include that code inside the constructor.Then you also have to unsubscribe. For that, we have implemented a service that manages this. In constructor we have to add SubscriberManagementService.
   
    constructor(
    public imageService: ImageService,
    public subscribersManagementService: SubscribersManagementService
    )
  
  
  Get needed subscribers
  
  
    const subscribers =
        this.subscribersManagementService.getMovementSubscribersArray();
      
Then subscribe to them

    this.subscribersManagementService.addSubscriber(
          this,
          subscribers[i].subscriber.subscribe(() => {
           //Inside some code
            );
         })
        );

And finaly we have to implement onDestroy, that will remove the subscriptions after view is out.

    export class ClassName implements OnDestroy
    
Use the unsubscription of the service  
  
    ngOnDestroy() {
      this.subscribersManagementService.unsubscribe(this);
    }

# Nx Documentation

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@tensorflow-web-gesture/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

# tensorflow-web-gesture
