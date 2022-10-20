export type Line = {
  startX?: number,
  startY?: number,
  endX?: number,
  endY?: number,
}

export type Lines = {
  [index: string]: Line
}

export type Point = {
  x?: number,
  y?: number,
}

export type Points = {
  [index: string]: Point
}

export type Area = {
  lines?: Lines,
  points?: Points,
}