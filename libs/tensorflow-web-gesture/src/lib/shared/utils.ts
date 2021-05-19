import { Observable } from 'rxjs';

function toSeconds(ms: number): number {
  return ms / 1000;
}

function aroundCenter(center: Point, dimesions: Size): boolean {
  return inRegion(0.4, 0.6, center, dimesions);
}

function inRegion(
  start: number,
  end: number,
  point: Point,
  dimensions: Size
): boolean {
  return dimensions[0] * start < point[0] && dimensions[0] * end > point[0];
}
function getMiddle(rect: Rect): Point {
  return [
    rect.topLeft[0] + (rect.topLeft[0] + rect.bottomRight[0]) / 2,
    rect.topLeft[1] + (rect.topLeft[1] + rect.bottomRight[1]) / 2,
  ];
}

type Size = [number, number];
type Point = [number, number];
type Gesture =  //"one" |
  | 'victory'
  | 'thumbs_up'
  //"notOk" |
  | 'none';
type Direction = 'left' | 'right' | 'none';
type Rect = { topLeft: [number, number]; bottomRight: [number, number] };

type Subscribers = {
  left: Observable<Direction>;
  right: Observable<Direction>;
  ok: Observable<Gesture>;
  victory: Observable<Gesture>;
};

export {
  toSeconds,
  aroundCenter,
  inRegion,
  getMiddle,
  Size,
  Point,
  Gesture,
  Direction,
  Rect,
  Subscribers,
};
