// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from 'fingerpose';

const thumbsUp = new fingerpose.GestureDescription('thumbs_up');
thumbsUp.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.NoCurl, 1.0);
thumbsUp.addDirection(
  fingerpose.Finger.Thumb,
  fingerpose.FingerDirection.VerticalUp,
  1.0
);

thumbsUp.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.FullCurl, 1.0);
thumbsUp.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.FullCurl, 1.0);
thumbsUp.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl, 1.0);
thumbsUp.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl, 1.0);

export const thumbsUpGesture = thumbsUp;
