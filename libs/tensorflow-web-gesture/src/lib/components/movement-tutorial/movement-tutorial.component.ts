import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandGestureService, ImageService } from '../../services';

@Component({
  selector: 'tensorflow-web-gesture-movement-tutorial',
  templateUrl: './movement-tutorial.component.html',
  styleUrls: ['./movement-tutorial.component.css'],
})
export class MovementTutorialComponent implements OnDestroy {
  image: string;
  private subscritors = new Array<Subscription>();

  constructor(
    public handGesture: HandGestureService,
    public imageService: ImageService
  ) {
    this.startSubscriptions(handGesture, imageService);
  }

  private startSubscriptions(
    handGesture: HandGestureService,
    imageService: ImageService
  ) {
    const subscribers = handGesture.getMovementSubscribersArray();
    const subscribersKeys = Array.from(subscribers.keys());
    const longitud = subscribers.size;
    this.image = imageService.getImageURL(
      imageService.imagesType[subscribersKeys[0]]
    );

    for (let i = 0; i < longitud; i++) {
      this.subscritors.push(
        subscribers.get(subscribersKeys[i]).subscribe(() => {
          this.image = imageService.getImageURL(
            imageService.imagesType[subscribersKeys[(i + 1) % longitud]]
          );
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscritors.forEach((s) => s.unsubscribe());
  }
}
