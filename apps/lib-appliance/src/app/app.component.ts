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
