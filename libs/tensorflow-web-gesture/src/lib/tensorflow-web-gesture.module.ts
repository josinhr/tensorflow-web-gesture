import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoComponent } from './components/gesture-recognition/video.component';
import { GestureFeedbackComponent } from './components/gesture-feedback/gesture-feedback.component';
import { HandGestureService, ImageService } from './services';
import { ShadowTutorialComponent } from './components/shadow-tutorial/shadow-tutorial.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    GestureFeedbackComponent,
    VideoComponent,
    ShadowTutorialComponent,
  ],
  exports: [GestureFeedbackComponent, VideoComponent, ShadowTutorialComponent],
  providers: [HandGestureService, ImageService],
})
export class TensorflowWebGestureModule {}
