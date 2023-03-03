import { CanvasRenderingContext2D } from 'canvas';
import { TextElement } from './badgeElements';

export interface TextSize {
  width: number;
  height: number;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  elem: TextElement,
  x: number,
  y: number
): TextSize {
  ctx.font = elem.font;
  ctx.fillText(elem.text, x, y);

  const metrics = ctx.measureText(elem.text);
  return {
    width: metrics.width,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };
}
