import { Injectable } from '@angular/core';
import { Subject, filter, Subscription } from 'rxjs';
import {
  Direction,
  GeneralSubscriber,
  Gesture,
  Subscribers,
} from '../../shared/utils';

@Injectable()
export class SubscribersManagementService {
  private classSubscritors = new Map<unknown, Array<Subscription>>();
  readonly swipe$ = new Subject<Direction>();
  readonly gesture$ = new Subject<Gesture>();

  readonly subscribers: Subscribers;

  constructor() {
    this.subscribers = {
      right$: this.swipe$.pipe(filter((value) => value === 'right')),
      left$: this.swipe$.pipe(filter((value) => value === 'left')),
      up$: this.swipe$.pipe(filter((value) => value === 'up')),
      down$: this.swipe$.pipe(filter((value) => value === 'down')),
      ok$: this.gesture$.pipe(filter((value) => value === 'thumbs_up')),
      cero$: this.gesture$.pipe(filter((value) => value === 'cero')),
      victory$: this.gesture$.pipe(filter((value) => value === 'victory')),
      one$: this.gesture$.pipe(filter((value) => value === 'one_finger')),
    };
  }

  public addSubscriber(interested: unknown, subscriber: Subscription) {
    let arrayWithAddedSubscriber = this.classSubscritors.get(interested);
    if (arrayWithAddedSubscriber) arrayWithAddedSubscriber.push(subscriber);
    else arrayWithAddedSubscriber = [subscriber];
    this.classSubscritors.set(interested, arrayWithAddedSubscriber);
  }
  public unsubscribe(interested: unknown) {
    this.classSubscritors.get(interested).forEach((s) => s.unsubscribe());
  }

  public getMovementSubscribersArray(): Array<GeneralSubscriber> {
    return [
      { name: 'right', subscriber: this.subscribers.right$ },
      { name: 'left', subscriber: this.subscribers.left$ },
      { name: 'up', subscriber: this.subscribers.up$ },
      { name: 'down', subscriber: this.subscribers.down$ },
    ];
  }
  public getPoseSubscribersArray(): Array<GeneralSubscriber> {
    return [
      { name: 'cero', subscriber: this.subscribers.cero$ },
      { name: 'victory', subscriber: this.subscribers.victory$ },
      { name: 'one', subscriber: this.subscribers.one$ },
      { name: 'ok', subscriber: this.subscribers.ok$ },
    ];
  }

  public getAllSubscribersArray(): Array<GeneralSubscriber> {
    const movementSubscribersMap = this.getMovementSubscribersArray();
    const poseSubscribersMap = this.getPoseSubscribersArray();
    return [...movementSubscribersMap, ...poseSubscribersMap];
  }
}
