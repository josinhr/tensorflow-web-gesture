import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tensorflow-web-gesture-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [],
})
export class VideoComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const vid = <HTMLVideoElement>document.getElementById('videoElement');
    //Video Processor
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function success(streamReceived) {
        vid.srcObject = streamReceived;
      });
  }
}
