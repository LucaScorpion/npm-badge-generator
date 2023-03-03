import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from '../packageInfo';
import { initFonts } from './fonts';
import { getBadgeElements } from './badgeElements';
import { drawText } from './drawText';

const BORDER_WIDTH = 2;
const PADDING_TOP_LEFT = 9;
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

  drawBorder(ctx, width, height);

  const elems = getBadgeElements(pkg);
  let x = BORDER_WIDTH + PADDING_TOP_LEFT;
  let y = 1;

  ctx.fillStyle = COLORS.red;
  const npmLogoSize = drawText(ctx, elems.npmLogo, x, y);

  x += npmLogoSize.width + 14;
  y = 7;

  ctx.fillStyle = COLORS.darkGrey;

  const installTextSize = drawText(ctx, elems.installCommand, x, y);
  y += LINE_SPACING + installTextSize.height;

  const depsTextSize = drawText(ctx, elems.dependencyCount, x, y);
  y += LINE_SPACING + depsTextSize.height;

  drawText(ctx, elems.weeklyDownload, x, y);

  return canvas.createPNGStream();
}

function drawBorder(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  ctx.lineWidth = BORDER_WIDTH * 2;
  ctx.strokeStyle = COLORS.red;
  ctx.fillStyle = COLORS.lightGray;
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.lineTo(BORDER_WIDTH, BORDER_WIDTH);
  ctx.lineTo(width - BORDER_WIDTH, BORDER_WIDTH);
  ctx.lineTo(width - BORDER_WIDTH, height - BORDER_WIDTH);
  ctx.lineTo(BORDER_WIDTH, height - BORDER_WIDTH);
  ctx.lineTo(BORDER_WIDTH, BORDER_WIDTH);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
