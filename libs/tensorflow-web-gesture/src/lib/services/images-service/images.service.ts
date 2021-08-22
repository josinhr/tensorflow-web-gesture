import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  imagesType = {
    right: 'right',
    one: 'one',
    cero: 'cero',
    up: 'up',
    down: 'down',
    left: 'left',
    ok: 'ok',
    victory: 'victory',
    unknown: '2754',
  };
  getImageURL(image: string): string {
    return '/assets/' + image + '.png';
  }
}
