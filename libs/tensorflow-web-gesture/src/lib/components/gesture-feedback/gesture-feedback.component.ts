import { Component, OnDestroy } from '@angular/core';
import { ImageService } from '../../services';
import { SubscribersManagementService } from '../../services/hand-service/subscribers-management.service';
@Component({
  selector: 'tensorflow-web-gesture-gesture-feedback',
  templateUrl: './gesture-feedback.component.html',
  styleUrls: ['./gesture-feedback.component.css'],
})
export class GestureFeedbackComponent implements OnDestroy {
  public image: string;

  public constructor(
    private imageService: ImageService,
    private subscribersMaganagerServie: SubscribersManagementService
  ) {
    this.image = this.imageService.getImageURL(
      this.imageService.imagesType.unknown
    );
    const subscribersArray =
      this.subscribersMaganagerServie.getAllSubscribersArray();

    for (let i = 0; i < subscribersArray.length; i++) {
      console.log(subscribersArray[i]);

      this.subscribersMaganagerServie.addSubscriber(
        this,
        subscribersArray[i].subscriber.subscribe(() => {
          this.image = this.imageService.getImageURL(
            this.imageService.imagesType[subscribersArray[i].name]
          );
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscribersMaganagerServie.unsubscribe(this);
  }
}
