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
  ctx.fillStyle = elem.color;
  ctx.fillText(elem.text, x, y);

  const metrics = ctx.measureText(elem.text);
  return {
    width: metrics.width,
    height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };
}

export function drawTextLines(
  ctx: CanvasRenderingContext2D,
  elems: TextElement[],
  x: number,
  y: number,
  lineSpacing: number
): void {
  for (const elem of elems) {
    const size = drawText(ctx, elem, x, y);
    y += size.height + lineSpacing;
  }
}

export function getTextSize(
  ctx: CanvasRenderingContext2D,
  elems: TextElement[],
  lineSpacing: number
): TextSize {
  const size: TextSize = {
    width: 0,
    height: 0,
  };

  for (let i = 0; i < elems.length; i++) {
    if (i > 0) {
      size.height += lineSpacing;
    }

    ctx.font = elems[i].font;
    const metrics = ctx.measureText(elems[i].text);

    size.width = Math.max(size.width, metrics.width);
    size.height +=
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  }

  return size;
}
