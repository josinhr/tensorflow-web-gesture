import { BehaviorSubject } from 'rxjs';
import {
  Size,
  Direction,
  getMiddleHandTrack,
  aroundCenter,
  inRegionY,
  toSeconds,
  inRegion,
} from '../../shared/utils';

export class HandTrack {
  private initialTimestamp = -1;
  private initiated: boolean;
  private dimensions: Size;
  private currentHand: any;

  constructor(dimensions: Size) {
    this.dimensions = dimensions;
  }
  async estimateHand(predictions: any, emitPoint: BehaviorSubject<Direction>) {
    this.currentHand = predictions.filter(
      (prediction) => prediction.label != 'face'
    )[0];
    if (this.currentHand) {
      const middle = getMiddleHandTrack(this.currentHand);

      if (aroundCenter(middle, this.dimensions)) {
        this.initialTimestamp = Date.now();
        this.initiated = true;
        return;
      }
      if (!this.initiated) {
        return;
      }
      if (
        inRegionY(0, 0.2, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('up');
        this.initiated = false;
        return;
      }
      if (
        inRegionY(0.8, 1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('down');
        this.initiated = false;
        return;
      }

      if (
        inRegion(0, 0.1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('right');
        this.initiated = false;
        return;
      }
      if (
        inRegion(0.9, 1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('left');
        this.initiated = false;
        return;
      }
    }
  }
}
