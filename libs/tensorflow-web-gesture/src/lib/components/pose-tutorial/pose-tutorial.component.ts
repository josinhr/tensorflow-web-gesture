import { Component, OnDestroy } from '@angular/core';
import { ImageService, SubscribersManagementService } from '../../services';

@Component({
  selector: 'tensorflow-web-gesture-pose-tutorial',
  templateUrl: './pose-tutorial.component.html',
  styleUrls: ['./pose-tutorial.component.css'],
})
export class PoseTutorialComponent implements OnDestroy {
  image: string;

  constructor(
    public subscribersManagementService: SubscribersManagementService,
    public imageService: ImageService
  ) {
    this.startSubscriptions();
  }

  private startSubscriptions() {
    const subscribers =
      this.subscribersManagementService.getPoseSubscribersArray();

    for (let i = 0; i < subscribers.length; i++) {
      this.subscribersManagementService.addSubscriber(
        this,
        subscribers[i].subscriber.subscribe(() => {
          this.image = this.imageService.getImageURL(
            this.imageService.imagesType[
              subscribers[(i + 1) % subscribers.length].name
            ]
          );
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscribersManagementService.unsubscribe(this);
  }
}
