import { Component, AfterViewInit } from '@angular/core';
import { HandGesture } from '../../services';

@Component({
  selector: 'tensorflow-web-gesture-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [],
})
export class VideoComponent implements AfterViewInit {
  public constructor(private handGesture: HandGesture) {}

  ngAfterViewInit(): void {
    const vid = <HTMLVideoElement>document.getElementById('videoElement');
    const setHand = this.handGesture;
    //Video Processor
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function success(streamReceived) {
        vid.srcObject = streamReceived;
        setHand.setVideo(vid);
        setHand.runModel();
      });
  }
}
