import { Response } from 'express';
import { Canvas } from 'canvas';

export type CanvasType = 'png' | 'svg';

export function sendCanvasResponse(
  res: Response,
  canvas: Canvas,
  type: CanvasType
): void {
  switch (type) {
    case 'png':
      res.type('image/png');
      canvas.createPNGStream().pipe(res);
      break;
    case 'svg':
      res.type('image/svg+xml');
      res.send(canvas.toBuffer());
      break;
    default:
      console.error(`Unknown canvas type: ${type}, using png instead`);
      sendCanvasResponse(res, canvas, 'png');
      break;
  }
}
