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
      const confidence = gesture.gestures.map(
        (prediction: { confidence: number }) => prediction.confidence
      );

      const maxConfidence = confidence.indexOf(
        Math.max.apply(null, confidence)
      );
      if (this.lastGesture !== gesture.gestures[maxConfidence].name) {
        this.lastGesture = gesture.gestures[maxConfidence].name;
        this.lastGestureTiemstamp = Date.now();
        this.emitGesture = true;
      } else if (
        this.emitGesture &&
        toSeconds(Date.now() - this.lastGestureTiemstamp) > 1 &&
        confidence[0] > 6
      ) {
        emitPoint.next(gesture.gestures[maxConfidence].name);
        this.emitGesture = false;
      }
    }
  }
}
