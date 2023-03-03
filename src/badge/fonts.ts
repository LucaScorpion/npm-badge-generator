import path from 'path';
import { registerFont } from 'canvas';

const fontFiles = [
  {
    file: fontPath('Gubblebum_Blocky.ttf'),
    family: 'Gubblebum Blocky',
  },
  {
    file: fontPath('Ubuntu_Mono_Bold.ttf'),
    family: 'Ubuntu Mono Bold',
  },
  {
    file: fontPath('Ubuntu_Mono_Regular.ttf'),
    family: 'Ubuntu Mono Regular',
  },
];

export const FONTS = {
  npm: '50px gubblebum',
  bold: '14px "Ubuntu Mono Bold"',
  regular: '13px "Ubuntu Mono Regular"',
};

export function initFonts(): void {
  for (const font of fontFiles) {
    console.debug(`Registering font: ${font.family}`);
    registerFont(font.file, { family: font.family });
  }
}

function fontPath(file: string): string {
  return path.join(__dirname, '../../fonts', file);
}
