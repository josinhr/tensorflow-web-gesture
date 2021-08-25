import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoComponent } from './components/gesture-recognition/video.component';
import { GestureFeedbackComponent } from './components/gesture-feedback/gesture-feedback.component';
import {
  HandGestureService,
  ImageService,
  SubscribersManagementService,
} from './services';
import { MovementTutorialComponent } from './components/movement-tutorial/movement-tutorial.component';
import { PoseTutorialComponent } from './components/pose-tutorial/pose-tutorial.component';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [
    GestureFeedbackComponent,
    VideoComponent,
    MovementTutorialComponent,
    PoseTutorialComponent,
  ],
  exports: [
    GestureFeedbackComponent,
    VideoComponent,
    MovementTutorialComponent,
    PoseTutorialComponent,
  ],
  providers: [HandGestureService, ImageService, SubscribersManagementService],
})
export class TensorflowWebGestureModule {}
