const sass = require('sass');
const esbuild = require('esbuild');

module.exports = function (eleventyConfig) {
  // See: https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy
  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',
    compile: function (inputContent) {
      const result = sass.compileString(inputContent, {
        style: 'compressed'
      });
      return () => result.css;
    }
  });

  eleventyConfig.addTemplateFormats('ts');
  eleventyConfig.addExtension('ts', {
    outputFileExtension: 'js',
    compile: async function (inputContent) {
      const result = await esbuild.build({
        stdin: {
          contents: inputContent,
          loader: 'ts'
        },
        bundle: true,
        minify: true,
        format: 'cjs',
        write: false,
        target: 'es2018'
      });

      return () => result.outputFiles[0].text;
    }
  });
};
