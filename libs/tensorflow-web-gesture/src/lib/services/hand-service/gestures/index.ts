// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from 'fingerpose';
import { oneFingerGesture } from './oneFingerGesture';
import { noFingerGesture } from './noFingerGesture';
import { victoryGesture } from './victoryGesture';
// import { thumbsUpGesture } from './thumbsUpGesture';

const thumbsUpGesture = fingerpose.Gestures.ThumbsUpGesture;

export const GE = new fingerpose.GestureEstimator([
  oneFingerGesture,
  noFingerGesture,
  victoryGesture,
  thumbsUpGesture,
]);
