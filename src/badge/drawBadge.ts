import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from '../packageInfo';
import { initFonts } from './fonts';
import { formatNumber } from '../formatNumber';
import { getBadgeElements } from './badgeElements';
import { drawText } from './drawText';

const MARGIN = 4;
const LINE_SPACING = 2;

const COLORS = {
  red: 'rgb(203, 56, 55)',
  lightGray: 'rgb(244, 244, 242)',
  darkGrey: 'rgb(102, 102, 102)',
};

initFonts();

export function drawBadge(pkg: PackageInfo): PNGStream {
  const width = 400;
  const height = 80;

  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';
  ctx.textBaseline = 'top';

  drawBox(ctx, width, height);
  drawNpmLogo(ctx, MARGIN);

  const elems = getBadgeElements(pkg);
  ctx.fillStyle = COLORS.darkGrey;

  const x = MARGIN + 106;
  let y = MARGIN + 3;

  const installTextSize = drawText(ctx, elems.installText, x, y);
  y += LINE_SPACING + installTextSize.height;

  const depsTextSize = drawText(ctx, elems.dependenciesText, x, y);
  y += LINE_SPACING + depsTextSize.height;

  drawText(ctx, elems.downloadsText, x, y);

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
  ctx.fillText('npm', margin + 7, 1);
}
