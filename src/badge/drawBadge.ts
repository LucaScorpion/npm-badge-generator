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
const PKG_INFO_COL_SPACING = 14;
const NPM_LOGO_Y = 1;
const NPM_LOGO_X = BORDER_WIDTH + PADDING;

initFonts();

/*
+---------------------------------------------------+
| N    npm install package                          |
|  P   10 dependencies         version 1.2.3        |
|   M  1,000 weekly downloads  updated 5 months ago |
+---------------------------------------------------+
 */
export function drawBadge(pkg: PackageInfo): PNGStream {
  const canvas = new Canvas(0, 0);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';

  const elems = getBadgeElements(pkg);
  const pkgInfoLeft = [elems.dependencyCount, elems.weeklyDownload];
  const pkgInfoRight = [elems.version, elems.updated];

  const installCommandSize = getTextSize(ctx, [elems.installCommand], 0);
  const pkgInfoLeftSize = getTextSize(ctx, pkgInfoLeft, LINE_SPACING);
  const pkgInfoRightSize = getTextSize(ctx, pkgInfoRight, LINE_SPACING);
  const npmLogoSize = getTextSize(ctx, [elems.npmLogo], 0);

  const pkgInfoWidth = Math.max(
    installCommandSize.width,
    pkgInfoLeftSize.width + PKG_INFO_COL_SPACING + pkgInfoRightSize.width
  );
  const pkgInfoHeight =
    installCommandSize.height +
    LINE_SPACING +
    Math.max(pkgInfoLeftSize.height, pkgInfoRightSize.height);

  const pkgInfoX = NPM_LOGO_X + npmLogoSize.width + LOGO_SPACING_RIGHT;
  canvas.width = pkgInfoX + pkgInfoWidth + PADDING + BORDER_WIDTH;
  canvas.height =
    PKG_INFO_Y + pkgInfoHeight + LINE_SPACING + PADDING + BORDER_WIDTH;
  ctx.textBaseline = 'top';

  drawBorder(ctx, canvas.width, canvas.height);
  drawText(ctx, elems.npmLogo, NPM_LOGO_X, NPM_LOGO_Y);
  drawText(ctx, elems.installCommand, pkgInfoX, PKG_INFO_Y);
  drawTextLines(
    ctx,
    pkgInfoLeft,
    pkgInfoX,
    PKG_INFO_Y + installCommandSize.height + LINE_SPACING,
    LINE_SPACING
  );
  drawTextLines(
    ctx,
    pkgInfoRight,
    pkgInfoX + pkgInfoLeftSize.width + PKG_INFO_COL_SPACING,
    PKG_INFO_Y + installCommandSize.height + LINE_SPACING,
    LINE_SPACING
  );

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
