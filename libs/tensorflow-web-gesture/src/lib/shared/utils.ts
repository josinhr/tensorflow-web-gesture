import { Observable } from 'rxjs';

function toSeconds(ms: number): number {
  return ms / 1000;
}

function aroundCenter(center: Point, dimensions: Size): boolean {
  console.log(dimensions);
  console.log(inRegionY(0.4, 0.6, center, dimensions));

  return (
    inRegionX(0.35, 0.65, center, dimensions) &&
    inRegionY(0.35, 0.65, center, dimensions)
  );
}

function inRegionX(
  start: number,
  end: number,
  point: Point,
  dimensions: Size
): boolean {
  return dimensions[0] * start < point[0] && dimensions[0] * end > point[0];
}
function inRegionY(
  start: number,
  end: number,
  point: Point,
  dimensions: Size
): boolean {
  return dimensions[1] * start < point[1] && dimensions[1] * end > point[1];
}

function getMiddle(rect: Rect): Point {
  return [
    rect.topLeft[0] + (rect.topLeft[0] + rect.bottomRight[0]) / 2,
    rect.topLeft[1] + (rect.topLeft[1] + rect.bottomRight[1]) / 2,
  ];
}

type Size = [number, number];
type Point = [number, number];
type Gesture =
  | 'one_finger'
  | 'victory'
  | 'thumbs_up'
  | 'cero'
  //"notOk" |
  | 'none';
type Direction = 'left' | 'right' | 'up' | 'down' | 'none';
type Rect = { topLeft: [number, number]; bottomRight: [number, number] };

type Subscribers = {
  left: Observable<Direction>;
  right: Observable<Direction>;
  up: Observable<Direction>;
  down: Observable<Direction>;
  ok: Observable<Gesture>;
  victory: Observable<Gesture>;
  one: Observable<Gesture>;
  cero: Observable<Gesture>;
};

export {
  toSeconds,
  aroundCenter,
  inRegionX,
  getMiddle,
  Size,
  Point,
  Gesture,
  Direction,
  Rect,
  inRegionY,
  Subscribers,
};
