export class ImageService {
  static imagesType = {
    right: 'right',
    left: 'left',
    ok: 'ok',
    victory: 'victory',
    unknown: '2754',
  };
  static getImageURL(image: string): string {
    return '/assets/' + image + '.png';
  }
}
