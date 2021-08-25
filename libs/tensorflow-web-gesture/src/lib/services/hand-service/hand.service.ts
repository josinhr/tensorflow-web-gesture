/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import '@tensorflow/tfjs-backend-webgl';
import * as handpose from '@tensorflow-models/handpose';
import { GestureEstimation } from './hand-gesture.service';
import { MovementEstimation } from './hand-movement.service';
import { SubscribersManagementService } from './subscribers-management.service';
import { Injectable } from '@angular/core';

//The data manager
@Injectable()
export class HandGestureService {
  private video: HTMLVideoElement;
  private movementEstimator: MovementEstimation;
  private gestureEstimator: GestureEstimation;
  private subscribersMaganager: SubscribersManagementService;

  public modelLoaded = false;

  constructor() {
    this.gestureEstimator = new GestureEstimation();
    this.subscribersMaganager = new SubscribersManagementService();
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
        this.runModel();
        // Video is loaded and can be played
      },
      false
    );
  }
  runModel() {
    handpose
      .load()
      .then((model) => {
        this.modelLoaded = true;
        //Start data processing system -> Video procesor
        const runDetection = () => {
          model.estimateHands(this.video).then((predictions) => {
            if (predictions && predictions[0]) {
              //Run gesture detection
              this.gestureEstimator.estimateGestures(
                predictions[0].landmarks,
                this.subscribersMaganager.gesture$
              );
              //Run movement detection
              this.movementEstimator.estimateHand(
                predictions[0].boundingBox,
                this.subscribersMaganager.swipe$
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
