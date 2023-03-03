import { PackageInfo } from '../packageInfo';
import { formatNumber } from '../formatNumber';

export interface BadgeElements {
  installText: TextElement;
  dependenciesText: TextElement;
  downloadsText: TextElement;
}

export interface TextElement {
  text: string;
  font: string;
}

export function getBadgeElements(pkg: PackageInfo): BadgeElements {
  return {
    installText: {
      text: `npm install ${pkg.name}`,
      font: '14px ubuntu-b',
    },
    dependenciesText: {
      text: `${pkg.dependencies} dependenc${
        pkg.dependencies === 1 ? 'y' : 'ies'
      }`,
      font: '13px ubuntu-r',
    },
    downloadsText: {
      text: `${formatNumber(pkg.monthlyDownloads)} weekly download${
        pkg.monthlyDownloads === 1 ? '' : 's'
      }`,
      font: '13px ubuntu-r',
    },
  };
}
