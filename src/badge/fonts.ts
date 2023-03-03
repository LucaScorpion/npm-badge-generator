import path from 'path';
import { registerFont } from 'canvas';

const fonts = [
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

export function initFonts(): void {
  for (const font of fonts) {
    console.debug(`Registering font: ${font.family}`);
    registerFont(font.file, { family: font.family });
  }
}

function fontPath(file: string): string {
  return path.join(__dirname, '../../fonts', file);
}
