import path from 'path';
import { Canvas, registerFont } from 'canvas';

// TODO: Make this nicer.
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialChars = '.,:-/';
const allCharacters = `${alphabet}${alphabet.toUpperCase()}${numbers}${specialChars}`;

const fontFiles = [
  {
    file: fontPath('Gubblebum_Blocky.ttf'),
    family: 'Gubblebum Blocky',
  },
  {
    file: fontPath('Ubuntu_Mono_Bold.ttf'),
    family: 'Ubuntu Mono Bold',
    weight: 'bold',
  },
  {
    file: fontPath('Ubuntu_Mono_Regular.ttf'),
    family: 'Ubuntu Mono Regular',
  },
];

export interface Font {
  name: string;
  lineHeight: number;
}

export const FONTS: Record<string, Font> = {
  npm: {
    name: '50px gubblebum',
    lineHeight: 0,
  },
  bold: {
    name: 'bold 14px "Ubuntu Mono"',
    lineHeight: 0,
  },
  regular: {
    name: '13px "Ubuntu Mono"',
    lineHeight: 0,
  },
};

export function initFonts(): void {
  for (const font of fontFiles) {
    console.debug(`Registering font: ${font.family}`);
    registerFont(font.file, {
      family: font.family,
      weight: font.weight || undefined,
    });
  }

  for (const font of Object.values(FONTS)) {
    font.lineHeight = calculateFontLineHeight(font.name);
  }
}

function fontPath(file: string): string {
  return path.join(__dirname, '../../fonts', file);
}

function calculateFontLineHeight(font: string): number {
  const canvas = new Canvas(0, 0);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'subpixel';
  ctx.font = font;
  const metrics = ctx.measureText(allCharacters);
  return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
}
