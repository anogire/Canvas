// returns true if the line from (x1,y1)->(x2,y2) intersects with (x3,y3)->(x4,y4)
export const hasIntersection = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) => {
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