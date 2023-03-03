import { PackageInfo } from '../packageInfo';
import { formatNumber } from '../formatNumber';

export interface BadgeElements {
  npmLogo: TextElement;
  installCommand: TextElement;
  dependencyCount: TextElement;
  weeklyDownload: TextElement;
}

export interface TextElement {
  text: string;
  font: string;
}

export function getBadgeElements(pkg: PackageInfo): BadgeElements {
  return {
    npmLogo: {
      text: 'npm',
      font: '50px gubblebum',
    },
    installCommand: {
      text: `npm install ${pkg.name}`,
      font: '14px ubuntu-b',
    },
    dependencyCount: {
      text: `${pkg.dependencies} dependenc${
        pkg.dependencies === 1 ? 'y' : 'ies'
      }`,
      font: '13px ubuntu-r',
    },
    weeklyDownload: {
      text: `${formatNumber(pkg.monthlyDownloads)} weekly download${
        pkg.monthlyDownloads === 1 ? '' : 's'
      }`,
      font: '13px ubuntu-r',
    },
  };
}
