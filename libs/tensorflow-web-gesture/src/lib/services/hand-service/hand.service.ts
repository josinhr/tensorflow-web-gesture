/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BehaviorSubject } from 'rxjs';
import * as handpose from '@tensorflow-models/handpose';
import { GestureEstimation } from './hand-gesture.service';
import { MovementEstimation } from './hand-movement.service';
import { Direction, Gesture, Subscribers } from '../../shared/utils';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as handTrack from 'handtrackjs';
import { HandTrack } from './hand-track.service';

//The data manager
@Injectable()
export class HandGestureService {
  private video: HTMLVideoElement;
  private movementEstimator: MovementEstimation;
  private gestureEstimator: GestureEstimation;
  private handTracker: HandTrack;

  private _swipe$ = new BehaviorSubject<Direction>('none');
  private swipe$ = this._swipe$.asObservable();

  private _gesture$ = new BehaviorSubject<Gesture>('none');
  private gesture$ = this._gesture$.asObservable();

  public subscribers: Subscribers;
  constructor() {
    this.gestureEstimator = new GestureEstimation();
    this.initializeSubscribers();
  }

  init(vid: HTMLVideoElement) {
    vid.addEventListener(
      'loadeddata',
      () => {
        this.video = vid;
        this.movementEstimator = new MovementEstimation([
          vid.width,
          vid.height,
        ]);
        this.handTracker = new HandTrack([vid.width, vid.height]);
        this.runModel();
        // Video is loaded and can be played
      },
      false
    );
  }
  private initializeSubscribers(): void {
    //Output of recognition -> Listens to the data manager
    this.subscribers = {
      right: this.swipe$.pipe(filter((value) => value === 'right')),
      left: this.swipe$.pipe(filter((value) => value === 'left')),
      up: this.swipe$.pipe(filter((value) => value === 'up')),
      down: this.swipe$.pipe(filter((value) => value === 'down')),
      ok: this.gesture$.pipe(filter((value) => value === 'thumbs_up')),
      cero: this.gesture$.pipe(filter((value) => value === 'cero')),
      victory: this.gesture$.pipe(filter((value) => value === 'victory')),
      one: this.gesture$.pipe(filter((value) => value === 'one_finger')),
    };
  }

  private runModel() {
    handTrack
      .load()
      .then((model) => {
        this.handTrackDetection(model);
      })
      .catch((err) => {
        console.error(err);
      });
    handpose
      .load()
      .then((model) => {
        this.handMovementDetection(model);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  private handTrackDetection(model: any): void {
    const runHandTrackDetection = () => {
      model.detect(this.video).then((predictions) => {
        this.handTracker.estimateHand(predictions, this._swipe$);
        requestAnimationFrame(runHandTrackDetection);
      });
    };
    runHandTrackDetection();
  }

  private handMovementDetection(model: handpose.HandPose): void {
    //Start data processing system -> Video procesor
    const runDetection = () => {
      model.estimateHands(this.video).then((predictions) => {
        if (predictions.length > 0) {
          //Run gesture detection
          this.gestureEstimator.estimateGestures(
            predictions[0].landmarks,
            this._gesture$
          );
          //Run movement detection
          // this.movementEstimator.estimateHand(
          //   predictions[0].boundingBox,
          //   this._swipe$
          // );
        }
        requestAnimationFrame(runDetection);
      });
    };
    runDetection();
  }
}
