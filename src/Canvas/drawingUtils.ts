import { useState, useEffect, useRef } from 'react';
import { Area, Line, Point } from '../types';
import { backColor, canvasHeight, canvasWidth, extraColor, mainColor, scale, canvasStyleWidth, canvasStyleHeight } from './consts';

const drawLine = (ctx: CanvasRenderingContext2D, location: Line) => {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 1;
  ctx.moveTo(location.startX!, location.startY!);
  ctx.lineTo(location.endX!, location.endY!);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

const drawIntersection = (ctx: CanvasRenderingContext2D, location: Point) => {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.arc(location.x!, location.y!, 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = extraColor;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = mainColor;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};

const collapseLine = (ctx: CanvasRenderingContext2D, location: Line) => {
  let { startX, startY, endX, endY } = location;
  let n = 10;

  const interval = setInterval(function () {
    let k = 1 / n;
    if (n < 1) {
      clearInterval(interval);
    }

    ctx.save();
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.strokeStyle = backColor;
    ctx.lineWidth = 3;
    ctx.moveTo(location.startX!, location.startY!);
    ctx.lineTo(location.endX!, location.endY!);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 1;
    ctx.moveTo(startX!, startY!);
    ctx.lineTo(endX!, endY!);
    ctx.stroke();
    ctx.closePath();

    startX = (location.startX! + location.endX! * k) / (1 + k);
    startY = (location.startY! + location.endY! * k) / (1 + k);
    endX = (location.endX! + location.startX! * k) / (1 + k);
    endY = (location.endY! + location.startY! * k) / (1 + k);
    n -= 0.1;

    ctx.restore();
  }, 10);
};

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [area, setArea] = useState<Area>({ lines: {}, points: {} });
  const [isCollapse, setIsCollapse] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    Object.keys(area.lines!).forEach(el => {
      isCollapse ?
        collapseLine(ctx, area.lines![el]) :
        drawLine(ctx, area.lines![el]);
    });

    Object.keys(area.points!).forEach(el => {
      drawIntersection(ctx, area.points![el])
    });
  });

  useEffect(() => {
    setArea({ lines: {}, points: {} });
    setIsCollapse(false);
  }, [isCollapse])

  return { area, setArea, canvasRef, setIsCollapse, canvasWidth, canvasHeight, canvasStyleWidth, canvasStyleHeight };
}