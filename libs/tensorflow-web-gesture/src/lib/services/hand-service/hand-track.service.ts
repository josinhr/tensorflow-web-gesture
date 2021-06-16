import { BehaviorSubject } from 'rxjs';
import {
  Size,
  Direction,
  getMiddle,
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
    if (this.currentHand && this.currentHand.bbox[0] < 20) {
      emitPoint.next('right');
    }

    if (
      this.currentHand &&
      this.currentHand.bbox[0] > this.dimensions[0] - 120
    ) {
      emitPoint.next('left');
    }
  }
}
