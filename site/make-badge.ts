const npmBadgeApi = 'https://npmbadge.com/npm/';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('make-badge-input') as HTMLInputElement;
  const imgOutput = document.getElementById('make-badge-img') as HTMLImageElement;
  const info = document.getElementById('make-badge-info') as HTMLSpanElement;
  const embedMd = document.getElementById('make-badge-embed-md') as HTMLTextAreaElement;
  const embedHtml = document.getElementById('make-badge-embed-html') as HTMLTextAreaElement;

  input.addEventListener('input', () => {
    makeBadge(input, imgOutput, info)
    setEmbedCodes(input.value, embedMd, embedHtml);
  });
  imgOutput.addEventListener('error', () => handleImgError(info));
  imgOutput.addEventListener('load', () => handleImgLoad(info));

  setEmbedCodes('', embedMd, embedHtml);
});

function makeBadge(
    input: HTMLInputElement,
    imgOutput: HTMLImageElement,
    info: HTMLSpanElement
): void {
  info.textContent = 'Loading...';
  const pkg = input.value;

  if (pkg) {
    imgOutput.src = `${npmBadgeApi}${pkg}`
  } else {
    info.textContent = '';
  }
}

function handleImgError(info: HTMLSpanElement): void {
  info.textContent = 'That package could not be found.';
}

function handleImgLoad(info: HTMLSpanElement): void {
  info.textContent = '';
}

function setEmbedCodes(name: string, embedMd: HTMLTextAreaElement, embedHtml: HTMLTextAreaElement): void {
  if (!name) {
    name = '{package}';
  }

  const badgeLink = `https://npmbadge.com/npm/${name}`;
  const npmLink = `https://www.npmjs.com/package/${name}`;

  embedMd.value = `[![npm](${badgeLink})](${npmLink})`;
  embedHtml.value = `<a href="${npmLink}"><img src="${badgeLink}"></a>`
}
