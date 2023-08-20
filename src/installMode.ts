export type InstallMode = 'install' | 'global' | 'npx' | 'yarn';

const validModes: InstallMode[] = ['install', 'global', 'npx', 'yarn'];

export function parseInstallMode(mode?: unknown): InstallMode | undefined {
  if (typeof mode === 'string' && validModes.includes(mode as InstallMode)) {
    console.log({mode});
    return mode as InstallMode;
  }
  console.log({mode});
}
