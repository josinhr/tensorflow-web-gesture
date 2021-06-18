# TensorflowWebGesture

Tensorflow Web Gesture it's an angular library developed in order to implement gesture interaction in every existing web page. This library just has an eduactional purpose. Here I will define how to use it and wich important aspects you should know. Also two important links:

-Thesis documentation:
**\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***Soon**\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***

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
` { "glob": "**/*", "input": "./node_modules/tensorflow-web-gesture/assets", "output": "/assets/" }`

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

6.2.The use of subscribers. This use is not recommended, you would have to manage the subscriptions and unsubscription. You can include that code inside the constructor.

     handGestureService.subscribers.right.subscribe(() => {
      consoloe.log('Hello world')
    });
