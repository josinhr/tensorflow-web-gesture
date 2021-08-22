import { Component } from '@angular/core';
import { HandGestureService, ImageService } from '../../services';
@Component({
  selector: 'tensorflow-web-gesture-gesture-feedback',
  templateUrl: './gesture-feedback.component.html',
  styleUrls: ['./gesture-feedback.component.css'],
})
export class GestureFeedbackComponent {
  public image: string;

  public constructor(
    private handGesture: HandGestureService,
    private imageService: ImageService
  ) {
    this.image = imageService.getImageURL(imageService.imagesType.unknown);
    this.handGesture.subscribers.right.subscribe(
      () =>
        (this.image = imageService.getImageURL(imageService.imagesType.right))
    );
    this.handGesture.subscribers.left.subscribe(
      () =>
        (this.image = imageService.getImageURL(imageService.imagesType.left))
    );
    this.handGesture.subscribers.up.subscribe(
      () => (this.image = imageService.getImageURL(imageService.imagesType.up))
    );
    this.handGesture.subscribers.down.subscribe(
      () =>
        (this.image = imageService.getImageURL(imageService.imagesType.down))
    );
    this.handGesture.subscribers.ok.subscribe(
      () => (this.image = imageService.getImageURL(imageService.imagesType.ok))
    );
    this.handGesture.subscribers.victory.subscribe(
      () =>
        (this.image = imageService.getImageURL(imageService.imagesType.victory))
    );
    this.handGesture.subscribers.one.subscribe(
      () => (this.image = imageService.getImageURL(imageService.imagesType.one))
    );
    this.handGesture.subscribers.cero.subscribe(
      () =>
        (this.image = imageService.getImageURL(imageService.imagesType.cero))
    );
  }
}
