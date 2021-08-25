import { Component, OnDestroy } from '@angular/core';
import { HandGestureService, ImageService } from '../../services';
import { SubscribersManagementService } from '../../services/hand-service/subscribers-management.service';

@Component({
  selector: 'tensorflow-web-gesture-movement-tutorial',
  templateUrl: './movement-tutorial.component.html',
  styleUrls: ['./movement-tutorial.component.css'],
})
export class MovementTutorialComponent implements OnDestroy {
  image: string;

  constructor(
    public imageService: ImageService,
    public subscribersManagementService: SubscribersManagementService
  ) {
    this.startSubscriptions();
  }

  private startSubscriptions() {
    const subscribers =
      this.subscribersManagementService.getMovementSubscribersArray();
    this.image = this.imageService.getImageURL(
      this.imageService.imagesType[subscribers[0].name]
    );

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
