import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './components/gesture-recognition/video.component';
import { GestureFeedbackComponent } from './components/gesture-feedback/gesture-feedback.component';
import { HandGestureService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [GestureFeedbackComponent, VideoComponent],
  exports: [GestureFeedbackComponent, VideoComponent],
  providers: [HandGestureService],
})
export class TensorflowWebGestureModule {}
