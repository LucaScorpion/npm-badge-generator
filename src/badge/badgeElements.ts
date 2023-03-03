import { PackageInfo } from '../packageInfo';
import { formatNumber } from '../formatNumber';
import { COLORS } from './colors';

export interface BadgeElements {
  npmLogo: TextElement;
  installCommand: TextElement;
  version: TextElement;
  dependencyCount: TextElement;
  weeklyDownload: TextElement;
}

export interface TextElement {
  text: string;
  font: string;
  color: string;
}

export function getBadgeElements(pkg: PackageInfo): BadgeElements {
  return {
    npmLogo: {
      text: 'npm',
      font: '50px gubblebum',
      color: COLORS.red,
    },
    installCommand: {
      text: `npm install ${pkg.name}`,
      font: '14px "Ubuntu Mono Bold"',
      color: COLORS.darkGrey,
    },
    version: {
      text: `version ${pkg.version}`,
      font: '13px "Ubuntu Mono Regular"',
      color: COLORS.darkGrey,
    },
    dependencyCount: {
      text: `${pkg.dependencies} dependenc${
        pkg.dependencies === 1 ? 'y' : 'ies'
      }`,
      font: '13px "Ubuntu Mono Regular"',
      color: COLORS.darkGrey,
    },
    weeklyDownload: {
      text: `${formatNumber(pkg.monthlyDownloads)} weekly download${
        pkg.monthlyDownloads === 1 ? '' : 's'
      }`,
      font: '13px "Ubuntu Mono Regular"',
      color: COLORS.darkGrey,
    },
  };
}
