// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from "fingerpose";

const oneFinger = new fingerpose.GestureDescription("one_finger");
oneFinger.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.NoCurl, 1.0);
oneFinger.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl, 1.0);
oneFinger.addCurl(
  fingerpose.Finger.Middle,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
oneFinger.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl, 1.0);
oneFinger.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl, 1.0);

export const oneFingerGesture = oneFinger;
