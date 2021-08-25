/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GE } from './gestures';
import { toSeconds, Gesture } from '../../shared/utils';
import { BehaviorSubject } from 'rxjs';

export class GestureEstimation {
  private lastGestureTiemstamp = -1;
  private lastGesture: string = null;
  private emitGesture = true;

  estimateGestures(
    landmarks: Array<Array<number>>,
    emitPoint: BehaviorSubject<Gesture>
  ) {
    const gesture = GE.estimate(landmarks, 4);

    if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
      let m = -1;
      let maxConfidence = -1;

      for (let i = 0; i < gesture.gestures.length; i++) {
        if (gesture.gestures[i].confidence >= m) {
          m = gesture.gestures[i].confidence;
          maxConfidence = i;
        }
      }

      if (this.lastGesture !== gesture.gestures[maxConfidence].name) {
        this.lastGesture = gesture.gestures[maxConfidence].name;
        this.lastGestureTiemstamp = Date.now();
        this.emitGesture = true;
      } else if (
        this.emitGesture &&
        toSeconds(Date.now() - this.lastGestureTiemstamp) > 0.85
      ) {
        console.log('c');

        emitPoint.next(gesture.gestures[maxConfidence].name);
        this.emitGesture = false;
      }
    }
  }
}
