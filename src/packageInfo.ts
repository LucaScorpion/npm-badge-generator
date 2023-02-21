const REGISTRY_URL = 'https://registry.npmjs.com';
const MONTH_DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-month';

export async function getPackageInfo(name: string): Promise<PackageInfo> {
  const [packageRes, downloadsRes] = await Promise.all([
    fetch(`${REGISTRY_URL}/${name}`),
    fetch(`${MONTH_DOWNLOADS_URL}/${name}`),
  ]);

  if (!packageRes.ok) {
    throw new Error('Could not get package info from NPM.');
  }

  if (!downloadsRes.ok) {
    throw new Error('Could not get downloads info from NPM.');
  }

  const packageInfo = await packageRes.json();
  const downloadsInfo = await downloadsRes.json();
  return npmRegistryInfoToPackageInfo(packageInfo, downloadsInfo);
}

export interface PackageInfo {
  version: string;
  dependencies: number;
  size: number;
  date: string;
  license: string;
  monthlyDownloads: number;
}

interface NpmRegistryInfo {
  'dist-tags': {
    latest: string;
  };
  versions: Record<
    string,
    {
      dependencies: Record<string, string>;
      dist: {
        unpackedSize: number;
      };
    }
  >;
  time: Record<string, string>;
  license: string;
}

interface NpmDownloadsInfo {
  downloads: number;
}

function npmRegistryInfoToPackageInfo(
  npm: NpmRegistryInfo,
  downloads: NpmDownloadsInfo
): PackageInfo {
  const version = npm['dist-tags'].latest;
  const versionInfo = npm.versions[version];

  return {
    version,
    dependencies: Object.keys(versionInfo.dependencies).length,
    size: versionInfo.dist.unpackedSize,
    date: npm.time[version],
    license: npm.license,
    monthlyDownloads: downloads.downloads,
  };
}
