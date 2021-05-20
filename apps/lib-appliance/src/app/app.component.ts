import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { HandGestureService } from 'tensorflow-web-gesture';

@Component({
  selector: 'tensorflow-web-gesture-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements AfterViewInit {
  title = 'lib-appliance';
  handGestureService: HandGestureService;

  public constructor() {
    this.handGestureService = new HandGestureService();
  }
  ngAfterViewInit(): void {
    const vid = <HTMLVideoElement>document.getElementById('videoElement');

    this.handGestureService.init(vid);
    this.handGestureService.subscribers.right.subscribe(() =>
      console.log('derecha')
    );
  }
}
