import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TensorflowWebGestureModule } from 'dist/libs/tensorflow-web-gesture';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TensorflowWebGestureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
