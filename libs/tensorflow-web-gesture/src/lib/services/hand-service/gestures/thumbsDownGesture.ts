// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from "fingerpose";

const thumbsDown = new fingerpose.GestureDescription("thumbs_down");
thumbsDown.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.NoCurl, 1.0);
thumbsDown.addDirection(
  fingerpose.Finger.Thumb,
  fingerpose.FingerDirection.VerticalDown,
  1.0
);
thumbsDown.addDirection(
  fingerpose.Finger.Thumb,
  fingerpose.FingerDirection.DiagonalDownLeft,
  0.5
);
thumbsDown.addDirection(
  fingerpose.Finger.Thumb,
  fingerpose.FingerDirection.DiagonalDownRight,
  0.5
);
// do this for all other fingers
thumbsDown.addCurl(
  fingerpose.Finger.Index,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
thumbsDown.addCurl(
  fingerpose.Finger.Middle,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
thumbsDown.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl, 1.0);
thumbsDown.addCurl(
  fingerpose.Finger.Pinky,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
export const thumbsDownGesture = thumbsDown;
