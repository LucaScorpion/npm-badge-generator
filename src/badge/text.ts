import { CanvasRenderingContext2D } from 'canvas';
import { BadgeElements, TextElement } from './badgeElements';

export interface TextSize {
  width: number;
  height: number;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  elem: TextElement,
  x: number,
  y: number
): void {
  ctx.font = elem.font.name;
  ctx.fillStyle = elem.color;
  ctx.fillText(elem.text, x, y);
}

export function getTextSize(
  ctx: CanvasRenderingContext2D,
  elem: TextElement
): TextSize {
  ctx.font = elem.font.name;
  const metrics = ctx.measureText(elem.text);

  return {
    width: metrics.width,
    height: elem.font.lineHeight,
  };
}

export function getTextSizes(
  ctx: CanvasRenderingContext2D,
  elems: BadgeElements
): Record<keyof BadgeElements, TextSize> {
  const init = {} as Record<keyof BadgeElements, TextSize>;
  return Object.entries(elems).reduce((acc, [k, v]) => {
    return { ...acc, [k]: getTextSize(ctx, v) };
  }, init);
}
