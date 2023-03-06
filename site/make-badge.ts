const NPM_BADGE_URL = 'https://npmbadge.com/npm/';
const DEBOUNCE_TIME = 300;

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('make-badge-input') as HTMLInputElement;
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

  input.addEventListener(
    'input',
    debounce(() => setBadgeSrc(input, imgOutput))
  );
  input.addEventListener('input', () =>
    setStatusAndEmbedCodes(input.value, info, embedMd, embedHtml)
  );
  imgOutput.addEventListener('error', () => handleImgError(info));
  imgOutput.addEventListener('load', () => handleImgLoad(info));

  setStatusAndEmbedCodes('', info, embedMd, embedHtml);
});

function setBadgeSrc(
  input: HTMLInputElement,
  imgOutput: HTMLImageElement
): void {
  const pkg = input.value;
  if (pkg) {
    console.log(pkg);
    imgOutput.src = `${NPM_BADGE_URL}${pkg}`;
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

  const badgeLink = `${NPM_BADGE_URL}${name}`;
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
