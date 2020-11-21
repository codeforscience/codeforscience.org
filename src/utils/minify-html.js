const htmlmin = require("html-minifier");
const PurgeCSS = require("purgecss").PurgeCSS;
const csso = require("csso");
const path = require('path');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

const cleanCSS = async (rawContent, outputPath) => {
  let content = rawContent;
  if (outputPath && outputPath.endsWith(".html")) {
    let before

    if (!process.env.ELEVENTY_ENV === 'production') {
      before = require("fs").readFileSync(path.join(__dirname, `../site/_includes/postcss/${fileName}`), {
        encoding: "utf-8",
      });
    } else {
      let rawFilepath = path.join(__dirname, `../site/_includes/postcss/${fileName}`)
      before = await require('postcss')([
         require('postcss-import'),
         require('precss'),
         require('postcss-mixins'),
         require('postcss-color-mix'),
         require('postcss-utilities'),
         require('autoprefixer')
       ])
       .process(require('fs').readFileSync(rawFilepath), { from: rawFilepath })
       before = before.css
    }
    before = before.replace(/@font-face {/g, "@font-face {font-display:swap;")

    const purged = await new PurgeCSS().purge({
      content: [
        {
          raw: rawContent,
          extension: "html",
        },
      ],
      css: [
        {
          raw: before,
        },
      ],
      fontFace: true,
      variables: true,
    });

    const after = csso.minify(purged[0].css).css;
    // console.log("CSS reduction", before.length - after.length);

    content = content.replace("</head>", `<style>${after}</style></head>`);
  }
  return content;
};

const minifyhtml = function(content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      sortClassName: true,
      sortAttributes: true,
      html5: true,
      decodeEntities: true,
      removeOptionalTags: true,
    });
    return minified;
  }
  return content;
}

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig, pluginOptions = {}) => {
    eleventyConfig.addTransform("cleanCSS", cleanCSS);
    eleventyConfig.addTransform("minifyhtml", minifyhtml);
  },
};
