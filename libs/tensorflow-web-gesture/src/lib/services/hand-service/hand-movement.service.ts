/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Rect,
  getMiddle,
  aroundCenter,
  inRegionX,
  toSeconds,
  Size,
  inRegionY,
  Direction,
} from '../../shared/utils';
import { BehaviorSubject } from 'rxjs';

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
    if (this.initiated) {
      if (
        inRegionY(0, 0.1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('up');
        this.initiated = false;
        return;
      }
      if (
        inRegionY(0.9, 1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('down');
        this.initiated = false;
        return;
      }

      if (
        inRegionX(0, 0.1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('right');
        this.initiated = false;
        return;
      }
      if (
        inRegionX(0.9, 1, middle, this.dimensions) &&
        toSeconds(Date.now() - this.initialTimestamp) < 2
      ) {
        emitPoint.next('left');
        this.initiated = false;
        return;
      }
    }
  }
}
