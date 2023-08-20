import { PackageInfo } from '../packageInfo';
import { formatNumber } from '../utils/formatNumber';
import { COLORS } from './colors';
import { timeAgo } from '../utils/timeAgo';
import { FONTS } from './fonts';
import { InstallMode } from '../installMode';

export interface BadgeElements {
  npmLogo: TextElement;
  installCommand: TextElement;
  version: TextElement;
  dependencyCount: TextElement;
  weeklyDownload: TextElement;
  updated: TextElement;
}

export interface TextElement {
  text: string;
  font: string;
  color: string;
}

export function getBadgeElements(
  pkg: PackageInfo,
  installMode?: InstallMode
): BadgeElements {
  const result: BadgeElements = {
    npmLogo: {
      text: 'npm',
      font: FONTS.npm,
      color: COLORS.red,
    },
    installCommand: {
      text: `npm install ${pkg.name}`,
      font: FONTS.bold,
      color: COLORS.darkGrey,
    },
    version: {
      text: `version ${pkg.version}`,
      font: FONTS.regular,
      color: COLORS.darkGrey,
    },
    dependencyCount: {
      text: `${pkg.dependencies} dependenc${
        pkg.dependencies === 1 ? 'y' : 'ies'
      }`,
      font: FONTS.regular,
      color: COLORS.darkGrey,
    },
    weeklyDownload: {
      text: `${formatNumber(pkg.weeklyDownloads)} weekly download${
        pkg.weeklyDownloads === 1 ? '' : 's'
      }`,
      font: FONTS.regular,
      color: COLORS.darkGrey,
    },
    updated: {
      text: `updated ${timeAgo(pkg.date)}`,
      font: FONTS.regular,
      color: COLORS.darkGrey,
    },
  };

  if (installMode === 'global') {
    result.installCommand.text = `npm install -g ${pkg.name}`;
  }

  if (installMode === 'npx') {
    result.installCommand.text = `npx ${pkg.name}`;
  }

  if(installMode === 'yarn') {
    result.installCommand.text = `yarn add ${pkg.name}`;
  }

  return result;
}
