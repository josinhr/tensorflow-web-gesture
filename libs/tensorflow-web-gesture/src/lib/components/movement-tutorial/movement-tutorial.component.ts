import { Component } from '@angular/core';
import { HandGestureService, ImageService } from '../../services';

@Component({
  selector: 'tensorflow-web-gesture-movement-tutorial',
  templateUrl: './movement-tutorial.component.html',
  styleUrls: ['./movement-tutorial.component.css'],
})
export class MovementTutorialComponent {
  image: string;

  constructor(
    public handGesture: HandGestureService,
    public imageService: ImageService
  ) {
    const subscribers = handGesture.getMovementSubscribersArray();
    const subscribersKeys = Array.from(subscribers.keys());
    const longitud = subscribers.size;
    this.image = imageService.getImageURL(
      imageService.imagesType[subscribersKeys[0]]
    );

    for (let i = 0; i < longitud; i++) {
      subscribers.get(subscribersKeys[i]).subscribe(() => {
        this.image = imageService.getImageURL(
          imageService.imagesType[subscribersKeys[(i + 1) % longitud]]
        );
      });
    }
  }
}
