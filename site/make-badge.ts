const NPM_BADGE_URL = 'https://npmbadge.com/npm/';
const DEBOUNCE_TIME = 300;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('make-badge-input') as HTMLInputElement;
  const modeSelect = document.getElementById(
    'make-badge-mode'
  ) as HTMLSelectElement;
  const imgOutput = document.getElementById(
    'make-badge-img'
  ) as HTMLImageElement;
  const info = document.getElementById('make-badge-info') as HTMLSpanElement;
  const embedMd = document.getElementById(
    'make-badge-embed-md'
  ) as HTMLTextAreaElement;
  const embedHtml = document.getElementById(
    'make-badge-embed-html'
  ) as HTMLTextAreaElement;

  const setBadgeSrcDebounced = debounce(() =>
    setBadgeSrc(input, modeSelect, imgOutput)
  );
  const setStatusInstant = () =>
    setStatusAndEmbedCodes(
      input.value,
      modeSelect.value,
      info,
      embedMd,
      embedHtml
    );

  input.addEventListener('input', setBadgeSrcDebounced);
  input.addEventListener('input', setStatusInstant);
  modeSelect.addEventListener('change', setBadgeSrcDebounced);
  modeSelect.addEventListener('change', setStatusInstant);

  imgOutput.addEventListener('error', () => handleImgError(info));
  imgOutput.addEventListener('load', () => handleImgLoad(info));

  setStatusAndEmbedCodes('', 'install', info, embedMd, embedHtml);
});

function setBadgeSrc(
  input: HTMLInputElement,
  modeSelect: HTMLSelectElement,
  imgOutput: HTMLImageElement
): void {
  const pkg = input.value;
  const mode = modeSelect.value;

  if (pkg) {
    let src = `${NPM_BADGE_URL}${pkg}`;
    if (mode !== 'install') {
      src = `${src}?mode=${mode}`;
    }
    imgOutput.src = src;
  }
}

function handleImgError(info: HTMLSpanElement): void {
  info.textContent = 'That package could not be found.';
}

function handleImgLoad(info: HTMLSpanElement): void {
  info.textContent = '';
}

function setStatusAndEmbedCodes(
  name: string,
  mode: string,
  info: HTMLSpanElement,
  embedMd: HTMLTextAreaElement,
  embedHtml: HTMLTextAreaElement
): void {
  if (!name) {
    name = '{package}';
    info.textContent = '';
  } else {
    info.textContent = 'Loading...';
  }
  const modeQuery = mode === 'install' ? '' : `?mode=${mode}`;

  const badgeLink = `${NPM_BADGE_URL}${name}${modeQuery}`;
  const npmLink = `https://www.npmjs.com/package/${name}`;

  embedMd.value = `[![npm](${badgeLink})](${npmLink})`;
  embedHtml.value = `<a href="${npmLink}"><img src="${badgeLink}"></a>`;
}

function debounce(fn: () => void): () => void {
  let timer: number;
  return () => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(), DEBOUNCE_TIME);
  };
}
