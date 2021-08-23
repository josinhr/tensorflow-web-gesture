import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HandGestureService, ImageService } from '../../services';
@Component({
  selector: 'tensorflow-web-gesture-gesture-feedback',
  templateUrl: './gesture-feedback.component.html',
  styleUrls: ['./gesture-feedback.component.css'],
})
export class GestureFeedbackComponent implements OnDestroy {
  public image: string;
  private subscritors = new Array<Subscription>();

  public constructor(
    private handGesture: HandGestureService,
    private imageService: ImageService
  ) {
    this.image = imageService.getImageURL(imageService.imagesType.unknown);
    this.startSubscriptions(imageService);
  }

  private startSubscriptions(imageService: ImageService) {
    const movementSubscribersMap =
      this.handGesture.getMovementSubscribersArray();
    const poseSubscribersMap = this.handGesture.getPoseSubscribersArray();
    const movementSubscribers = Array.from(movementSubscribersMap.keys());
    const poseSubscribers = Array.from(poseSubscribersMap.keys());

    for (let i = 0; i < movementSubscribers.length; i++) {
      this.subscritors.push(
        movementSubscribersMap.get(movementSubscribers[i]).subscribe(() => {
          this.image = imageService.getImageURL(
            imageService.imagesType[movementSubscribers[i]]
          );
        })
      );
    }
    for (let i = 0; i < poseSubscribers.length; i++) {
      this.subscritors.push(
        poseSubscribersMap.get(poseSubscribers[i]).subscribe(() => {
          this.image = imageService.getImageURL(
            imageService.imagesType[poseSubscribers[i]]
          );
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscritors.forEach((s) => s.unsubscribe());
  }
}
