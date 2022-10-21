import { useState } from "react";
import { Point } from "../types";
import { useCanvas } from "./drawingUtils";
import { getIntersectionPoint } from "./mathUtils";

import './style.css';

export const Canvas: React.FC = () => {
  const { area, setArea, canvasRef, setIsCollapse, canvasWidth, canvasHeight, canvasStyleWidth, canvasStyleHeight } = useCanvas();
  const [startMousePos, setStartMousePos] = useState<Point>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [indexCurLine, setIndexCurLine] = useState(-1);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      setStartMousePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      setIndexCurLine(indexCurLine + 1);
    }
    setIsDrawing(!isDrawing);
  };

  const handleRightButtonClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    return;
  };

  const handleCanvasClear = () => {
    setIsCollapse(true);
    setIndexCurLine(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    const lines = { ...area.lines };
    const points = { ...area.points };
    const curLine = {
      startX: startMousePos.x!,
      startY: startMousePos.y!,
      endX: e.nativeEvent.offsetX,
      endY: e.nativeEvent.offsetY
    };

    // check for Intersection
    Object.keys(lines).forEach((line, i) => {
      if (indexCurLine === i || indexCurLine < 1) {
        return;
      }

      const indexIntersection = String(indexCurLine) + i;
      if (!!points[indexIntersection]) {
        points[indexIntersection] = {};
      }

      const intersection = getIntersectionPoint(curLine, lines[line]);
      if (!!Object.keys(intersection).length) {
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