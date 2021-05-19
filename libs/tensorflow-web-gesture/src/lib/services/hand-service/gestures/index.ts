// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from 'fingerpose';
import { oneFingerGesture } from './oneFingerGesture';
import { thumbsDownGesture } from './thumbsDownGesture';

const victoryGesture = fingerpose.Gestures.VictoryGesture;
const thumbsUpGesture = fingerpose.Gestures.ThumbsUpGesture;

export const GE = new fingerpose.GestureEstimator([
  oneFingerGesture,
  //thumbsDownGesture,
  victoryGesture,
  thumbsUpGesture,
]);
