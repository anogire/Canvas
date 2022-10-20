import { useState } from "react";
import { Point } from "../types";
import { useCanvas } from "./drawingUtils";
import { hasIntersection } from "./mathUtils";

import './style.css';

export const Canvas: React.FC = () => {
  const { area, setArea, canvasRef, setIsCollapse, canvasWidth, canvasHeight, canvasStyleWidth, canvasStyleHeight } = useCanvas();
  const [curPos, setCurPos] = useState<Point>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isNumber, setNumber] = useState(0);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      setCurPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      setNumber(isNumber + 1);
    }
    setIsDrawing(!isDrawing);
  };

  const handleRightButtonClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    return;
  };

  const handleCanvasClear = () => {
    setIsCollapse(true);
    setNumber(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const lines = { ...area.lines };
    const points = { ...area.points };
    const curLine = { startX: curPos.x!, startY: curPos.y!, endX: e.nativeEvent.offsetX, endY: e.nativeEvent.offsetY };
    const indexCurLine = isNumber - 1;

    // check for Intersection
    Object.keys(lines).forEach((line, i) => {
      if (indexCurLine === i || indexCurLine < 1) {
        return;
      }

      const indexIntersection = String(indexCurLine) + i;

      if (!!points[indexIntersection]) {
        points[indexIntersection] = {};
      }
      const { startX, startY, endX, endY } = lines[line];

      const x1 = startX!;
      const y1 = startY!;
      const x2 = endX!;
      const y2 = endY!;

      const x3 = curLine.startX!;
      const y3 = curLine.startY!;
      const x4 = curLine.endX;
      const y4 = curLine.endY;

      if (hasIntersection(x1, y1, x2, y2, x3, y3, x4, y4)) {
        const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        const intersection = { x: x, y: y };

        points[indexIntersection] = intersection;
      }
    });

    lines[indexCurLine] = curLine;

    setArea({ ...area, lines: lines, points: points });
  };


  return (
    <main className="Canvas-main" >
      <canvas
        ref={canvasRef}
        className="Canvas-area"
        width={canvasWidth}
        height={canvasHeight}
        style={{ width: canvasStyleWidth, height: canvasStyleHeight }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onContextMenu={handleRightButtonClick}
      />
      <button className="Canvas-button" onClick={handleCanvasClear}>
        Collapse lines
      </button>
    </main>
  );
}