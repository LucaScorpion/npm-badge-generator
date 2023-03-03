import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from './packageInfo';
import { initFonts } from './fonts';
import { formatNumber } from './formatNumber';

const MARGIN = 4;

const COLORS = {
  red: 'rgb(203, 56, 55)',
  lightGray: 'rgb(244, 244, 242)',
  darkGrey: 'rgb(102, 102, 102)',
};

initFonts();

export function drawBadge(info: PackageInfo): PNGStream {
  const width = 400;
  const height = 80;

  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';

  drawBox(ctx, width, height);
  drawNpmLogo(ctx, MARGIN);

  ctx.fillStyle = COLORS.darkGrey;
  drawNpmInstall(ctx, MARGIN, info.name);
  drawDependencies(ctx, MARGIN, info.dependencies);
  drawDownloads(ctx, MARGIN, info.monthlyDownloads, 'monthly');

  return canvas.createPNGStream();
}

function drawBox(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const inset = 2;
  ctx.lineWidth = inset * 2;
  ctx.strokeStyle = COLORS.red;
  ctx.fillStyle = COLORS.lightGray;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
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

function drawNpmLogo(ctx: CanvasRenderingContext2D, margin: number): void {
  ctx.font = '50px gubblebum';
  ctx.fillStyle = COLORS.red;
  ctx.textBaseline = 'top';
  ctx.fillText('npm', margin + 7, 1);
}

function drawNpmInstall(
  ctx: CanvasRenderingContext2D,
  margin: number,
  name: string
): void {
  ctx.font = '14px ubuntu-b';
  ctx.textBaseline = 'top';
  ctx.fillText(`npm install ${name}`, margin + 106, margin + 3);
}

function drawDependencies(
  ctx: CanvasRenderingContext2D,
  margin: number,
  dependencies: number
): void {
  ctx.font = '13px ubuntu-r';
  ctx.fillText(
    `${dependencies} dependenc${dependencies === 1 ? 'y' : 'ies'}`,
    margin + 106,
    margin + 19
  );
}

function drawDownloads(
  ctx: CanvasRenderingContext2D,
  margin: number,
  downloadsNum: number,
  downloadsTime: string
) {
  ctx.font = '13px ubuntu-r';
  ctx.fillText(
    `${formatNumber(downloadsNum)} ${downloadsTime} download${
      downloadsNum === 1 ? '' : 's'
    }`,
    margin + 106,
    margin + 19 + 12 * 2
  );
}
