import { AfterViewInit, Component } from '@angular/core';
import {
  HandGestureService,
  SubscribersManagementService,
} from 'tensorflow-web-gesture';

@Component({
  selector: 'tensorflow-web-gesture-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements AfterViewInit {
  title = 'lib-appliance';
  public constructor(
    public handGestureService: HandGestureService,
    public subscribersMaganagerService: SubscribersManagementService
  ) {}
  ngAfterViewInit(): void {
    const vid = <HTMLVideoElement>document.getElementById('videoElement');

    this.handGestureService.init(vid);
  }
}
