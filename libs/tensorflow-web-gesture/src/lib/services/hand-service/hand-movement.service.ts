/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Rect,
  getMiddle,
  aroundCenter,
  inRegion,
  toSeconds,
  Size,
} from '../../shared/utils';
import { BehaviorSubject } from 'rxjs';
import { Direction } from '../../shared/utils';

export class MovementEstimation {
  private initialTimestamp = -1;
  private initiated: boolean;
  private dimensions: Size;
  constructor(dimensions: Size) {
    this.dimensions = dimensions;
  }
  estimateHand(rect: Rect, emitPoint: BehaviorSubject<Direction>) {
    const middle = getMiddle(rect);

    if (aroundCenter(middle, this.dimensions)) {
      this.initialTimestamp = Date.now();
      this.initiated = true;
      return;
    }
    if (!this.initiated) {
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
