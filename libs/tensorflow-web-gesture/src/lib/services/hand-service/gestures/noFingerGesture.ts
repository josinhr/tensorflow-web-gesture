// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fp from 'fingerpose';

const noFinger = new fp.GestureDescription('cero');
noFinger.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
noFinger.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
noFinger.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
noFinger.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
noFinger.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export const noFingerGesture = noFinger;
