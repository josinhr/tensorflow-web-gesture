import { Component } from '@angular/core';
import { HandGestureService } from 'tensorflow-web-gesture';

@Component({
  selector: 'tensorflow-web-gesture-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent {
  title = 'lib-appliance';

  public constructor(public handGestureService: HandGestureService) {
    this.handGestureService.subscribers.right.subscribe(() =>
      console.log('derecha')
    );
  }
}
