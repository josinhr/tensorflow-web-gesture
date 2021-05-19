/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import '@tensorflow/tfjs-backend-webgl';
import { BehaviorSubject } from 'rxjs';
import * as handpose from '@tensorflow-models/handpose';
import { GestureEstimation } from './hand-gesture.service';
import { MovementEstimation } from './hand-movement.service';
import { Direction, Gesture, Subscribers } from '../../shared/utils';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

//The data manager
@Injectable()
export class HandGestureService {
  private video: HTMLVideoElement;
  private movementEstimator: MovementEstimation;
  private gestureEstimator: GestureEstimation;

  private _swipe$ = new BehaviorSubject<Direction>('none');
  private swipe$ = this._swipe$.asObservable();

  private _gesture$ = new BehaviorSubject<Gesture>('none');
  private gesture$ = this._gesture$.asObservable();

  public subscribers: Subscribers;

  constructor() {
    const vid = document.createElement('video');
    vid.autoplay = true;
    vid.width = 640;
    vid.height = 480;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function success(streamReceived) {
        vid.srcObject = streamReceived;
      });
    this.setVideo(vid);
    this.runModel();
    this.movementEstimator = new MovementEstimation([vid.width, vid.height]);

    this.gestureEstimator = new GestureEstimation();
    this.initializeSubscribers();
  }
  private initializeSubscribers(): void {
    //Output of recognition -> Listens to the data manager
    this.subscribers = {
      right: this.swipe$.pipe(filter((value) => value === 'right')),
      left: this.swipe$.pipe(filter((value) => value === 'left')),
      ok: this.gesture$.pipe(filter((value) => value === 'thumbs_up')),
      victory: this.gesture$.pipe(filter((value) => value === 'victory')),
    };
  }
  setVideo(video: HTMLVideoElement) {
    this.video = video;
    this.movementEstimator = new MovementEstimation([
      video.width,
      video.height,
    ]);
  }

  runModel() {
    handpose
      .load()
      .then((model) => {
        //Start data processing system -> Video procesor
        const runDetection = () => {
          model.estimateHands(this.video).then((predictions) => {
            if (predictions && predictions[0]) {
              //Run gesture detection
              this.gestureEstimator.estimateGestures(
                predictions[0].landmarks,
                this._gesture$
              );
              //Run movement detection
              this.movementEstimator.estimateHand(
                predictions[0].boundingBox,
                this._swipe$
              );
            }
            requestAnimationFrame(runDetection);
          });
        };
        runDetection();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}