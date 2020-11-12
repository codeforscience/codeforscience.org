// Copyright (c) 2020 Phil Hawksworth

const htmlmin = require("html-minifier");

module.exports = function(content, outputPath) {
  if( outputPath.endsWith(".html") ) {
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
