// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from 'fingerpose';
import { oneFingerGesture } from './oneFingerGesture';
import { noFingerGesture } from './noFingerGesture';
// import { thumbsDownGesture } from './thumbsDownGesture';

const victoryGesture = fingerpose.Gestures.VictoryGesture;
const thumbsUpGesture = fingerpose.Gestures.ThumbsUpGesture;

export const GE = new fingerpose.GestureEstimator([
  oneFingerGesture,
  noFingerGesture,
  //thumbsDownGesture,
  victoryGesture,
  thumbsUpGesture,
]);
