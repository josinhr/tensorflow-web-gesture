// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as fingerpose from 'fingerpose';

const victory = new fingerpose.GestureDescription('victory');
victory.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.NoCurl, 1.0);
victory.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.NoCurl, 1.0);

victory.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl, 1.0);
victory.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl, 1.0);
victory.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl, 1.0);

export const victoryGesture = victory;
