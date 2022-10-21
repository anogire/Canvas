import { Line, Point } from "../types";

// returns true if the line from (x1,y1)->(x2,y2) intersects with (x3,y3)->(x4,y4)
const hasIntersection = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) => {
  let det, gamma, lambda;
  det = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
  if (!det) {
    return false;
  } else {
    lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
    gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

// returns the coordinates of the intersection point if (x1,y1)->(x2,y2) intersects with (x3,y3)->(x4,y4)
export const getIntersectionPoint = (curLine: Line, startLine: Line) => {
  let intersection: Point = {};

  const x1 = startLine.startX!;
  const y1 = startLine.startY!;
  const x2 = startLine.endX!;
  const y2 = startLine.endY!;

  const x3 = curLine.startX!;
  const y3 = curLine.startY!;
  const x4 = curLine.endX!;
  const y4 = curLine.endY!;

  if (hasIntersection(x1, y1, x2, y2, x3, y3, x4, y4)) {
    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    intersection = { x: x, y: y };
  }
  return intersection;
}