import { Canvas, CanvasRenderingContext2D, PNGStream } from 'canvas';
import { PackageInfo } from '../packageInfo';
import { initFonts } from './fonts';
import { getBadgeElements } from './badgeElements';
import { drawText, getTextSizes } from './text';
import { COLORS } from './colors';
import { InstallMode } from '../installMode';

const BORDER_WIDTH = 2;
const PADDING = 9;
const LINE_SPACING = 2;
const LOGO_SPACING_RIGHT = 14;
const PKG_INFO_Y = 7;
const PKG_INFO_COL_SPACING = 14;
const NPM_LOGO_Y = 1;
const NPM_LOGO_X = BORDER_WIDTH + PADDING;

/*
+---------------------------------------------------+
| N    npm install package                          |
|  P   10 dependencies         version 1.2.3        |
|   M  1,000 weekly downloads  updated 5 months ago |
+---------------------------------------------------+
 */
export function drawBadge(
  pkg: PackageInfo,
  installMode?: InstallMode
): PNGStream {
  const canvas = new Canvas(0, 0);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';

  const elems = getBadgeElements(pkg, installMode);
  const sizes = getTextSizes(ctx, elems);

  const pkgInfoX = NPM_LOGO_X + sizes.npmLogo.width + LOGO_SPACING_RIGHT;
  const pkgInfoRightColX =
    pkgInfoX +
    Math.max(sizes.dependencyCount.width, sizes.weeklyDownload.width) +
    PKG_INFO_COL_SPACING;
  const pkgInfoRowOneY =
    PKG_INFO_Y + sizes.installCommand.height + LINE_SPACING;
  console.log(sizes.installCommand.height);
  const pkgInfoRowTwoY =
    pkgInfoRowOneY +
    Math.max(sizes.dependencyCount.height, sizes.version.height) +
    LINE_SPACING;

  const pkgInfoRightBound = Math.max(
    pkgInfoX + sizes.installCommand.width,
    pkgInfoRightColX + sizes.version.width,
    pkgInfoRightColX + sizes.updated.width
  );
  const pkgInfoBottomBound =
    pkgInfoRowTwoY +
    Math.max(sizes.weeklyDownload.height, sizes.updated.height);

  canvas.width = pkgInfoRightBound + PADDING + BORDER_WIDTH;
  canvas.height = pkgInfoBottomBound + PADDING + BORDER_WIDTH;
  ctx.textBaseline = 'top';

  drawBorder(ctx, canvas.width, canvas.height);
  drawText(ctx, elems.npmLogo, NPM_LOGO_X, NPM_LOGO_Y);
  drawText(ctx, elems.installCommand, pkgInfoX, PKG_INFO_Y);
  drawText(ctx, elems.dependencyCount, pkgInfoX, pkgInfoRowOneY);
  drawText(ctx, elems.weeklyDownload, pkgInfoX, pkgInfoRowTwoY);
  drawText(ctx, elems.version, pkgInfoRightColX, pkgInfoRowOneY);
  drawText(ctx, elems.updated, pkgInfoRightColX, pkgInfoRowTwoY);

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
