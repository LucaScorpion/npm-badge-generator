import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from './packageInfo';
import { initFonts } from './fonts';

const MARGIN = 4;

initFonts();

export function drawBadge(info: PackageInfo): PNGStream {
  const width = 400;
  const height = 56;

  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  drawBox(ctx, MARGIN, width, height);
  drawNpmLogo(ctx, MARGIN, '');
  drawNpmInstall(ctx, MARGIN, info.name, '');

  return canvas.createPNGStream();
}

function drawNpmLogo(
  ctx: CanvasRenderingContext2D,
  margin: number,
  style: string
): void {
  ctx.font =
    style == 'mini'
      ? '22px gubblebum'
      : style == 'compact'
      ? '40px gubblebum'
      : '50px gubblebum';
  ctx.fillStyle = 'rgb(203, 56, 55)';
  ctx.textBaseline = 'top';
  ctx.fillText(
    'npm',
    style == 'mini' ? 5 : margin + 7,
    style == 'mini' ? 0 : 1
  );
}

function drawNpmInstall(
  ctx: CanvasRenderingContext2D,
  margin: number,
  name: string,
  style: string
): void {
  ctx.font = '14px ubuntu-b';
  ctx.fillStyle = 'rgb(102, 102, 102)';
  ctx.textBaseline = 'top';
  ctx.fillText(
    `npm install ${name}`,
    margin + (style == 'mini' ? 50 : style == 'compact' ? 86 : 106),
    margin + 3
  );
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  margin: number,
  width: number,
  height: number
) {
  const inset = 2;
  ctx.strokeStyle = 'rgb(203, 56, 55)';
  ctx.fillStyle = 'rgb(244, 244, 242)';
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.lineTo(inset, inset);
  ctx.lineTo(width - inset, inset);
  ctx.lineTo(width - inset, height - inset);
  ctx.lineTo(inset, height - inset);
  ctx.lineTo(inset, inset);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
