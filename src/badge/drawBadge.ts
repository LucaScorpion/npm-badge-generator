import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from '../packageInfo';
import { initFonts } from './fonts';
import { getBadgeElements } from './badgeElements';
import { drawText, drawTextLines, getTextSize } from './drawText';
import { COLORS } from './colors';

const BORDER_WIDTH = 2;
const PADDING = 9;
const LINE_SPACING = 2;
const LOGO_SPACING_RIGHT = 14;
const PKG_INFO_Y = 7;
const NPM_LOGO_Y = 1;
const NPM_LOGO_X = BORDER_WIDTH + PADDING;

initFonts();

export function drawBadge(pkg: PackageInfo): PNGStream {
  const canvas = new Canvas(0, 0);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';

  const elems = getBadgeElements(pkg);
  const pkgInfo = [
    elems.installCommand,
    elems.version,
    elems.dependencyCount,
    elems.weeklyDownload,
  ];

  const npmLogoSize = getTextSize(ctx, [elems.npmLogo], 0);
  const pkgInfoSize = getTextSize(ctx, pkgInfo, LINE_SPACING);

  const pkgInfoX = NPM_LOGO_X + npmLogoSize.width + LOGO_SPACING_RIGHT;
  canvas.width = pkgInfoX + pkgInfoSize.width + PADDING + BORDER_WIDTH;
  canvas.height =
    PKG_INFO_Y + pkgInfoSize.height + LINE_SPACING + PADDING + BORDER_WIDTH;
  ctx.textBaseline = 'top';

  drawBorder(ctx, canvas.width, canvas.height);
  drawText(ctx, elems.npmLogo, NPM_LOGO_X, NPM_LOGO_Y);
  drawTextLines(ctx, pkgInfo, pkgInfoX, PKG_INFO_Y, LINE_SPACING);

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
