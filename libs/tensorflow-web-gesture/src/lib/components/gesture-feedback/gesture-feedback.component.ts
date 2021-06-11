import { Component } from '@angular/core';
import { HandGestureService } from '../../services';
import { ImageService } from '../../services';

@Component({
  selector: 'tensorflow-web-gesture-gesture-feedback',
  templateUrl: './gesture-feedback.component.html',
  styleUrls: ['./gesture-feedback.component.css'],
})
export class GestureFeedbackComponent {
  public image: string;

  public constructor(private handGesture: HandGestureService) {
    this.image = ImageService.getImageURL(ImageService.imagesType.unknown);
    this.handGesture.subscribers.right.subscribe(
      () =>
        (this.image = ImageService.getImageURL(ImageService.imagesType.right))
    );
    this.handGesture.subscribers.left.subscribe(
      () =>
        (this.image = ImageService.getImageURL(ImageService.imagesType.left))
    );
    this.handGesture.subscribers.up.subscribe(
      () => (this.image = ImageService.getImageURL(ImageService.imagesType.up))
    );
    this.handGesture.subscribers.down.subscribe(
      () =>
        (this.image = ImageService.getImageURL(ImageService.imagesType.down))
    );
    this.handGesture.subscribers.ok.subscribe(
      () => (this.image = ImageService.getImageURL(ImageService.imagesType.ok))
    );
    this.handGesture.subscribers.victory.subscribe(
      () =>
        (this.image = ImageService.getImageURL(ImageService.imagesType.victory))
    );
    this.handGesture.subscribers.one.subscribe(
      () => (this.image = ImageService.getImageURL(ImageService.imagesType.one))
    );
  }
}
