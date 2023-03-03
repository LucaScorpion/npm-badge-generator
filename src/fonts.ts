import path from 'path';
import { registerFont } from 'canvas';

const fonts = [
  {
    file: fontPath('GUBBLO___.ttf'),
    family: 'Gubblebum Blocky',
  },
];

export function initFonts(): void {
  for (const font of fonts) {
    console.debug(`Registering font: ${font.family}`);
    registerFont(font.file, { family: font.family });
  }
}

function fontPath(file: string): string {
  return path.join(__dirname, '../fonts', file);
}
