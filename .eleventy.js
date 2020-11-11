require("dotenv").config();

const cleanCSS = require("clean-css");
const fs = require("fs");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const localImages = require("eleventy-plugin-local-images");
const lazyImages = require("eleventy-plugin-lazyimages");
const ghostContentAPI = require("@tryghost/content-api");
let md = require("markdown-it")({
  html: true
});

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

// Strip Ghost domain from urls
const stripDomain = url => {
  return url.replace(process.env.GHOST_API_URL, "");
};

const blogDomain = url => {
  return "news" + stripDomain(url)
};

module.exports = function(config) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/default.njk');

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );

  // Assist RSS feed template
  config.addPlugin(pluginRSS);

  // Apply performance attributes to images
  // config.addPlugin(lazyImages, {
  //   cacheFile: "",
  //   verbose: false
  // });

  // Copy images over from Ghost
  config.addPlugin(localImages, {
    distPath: "dist",
    assetPath: "/img",
    selector: "img",
    attribute: "data-src", // Lazy images attribute
    verbose: false
  });

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // Inline CSS
  config.addFilter("cssmin", code => {
    return new cleanCSS({}).minify(code).styles;
  });

  config.addFilter("markdown", (content) => {
    return md.render(content)
  })

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  config.addFilter("getReadingTime", text => {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  });

  // Date formatting filter
  config.addFilter("htmlDateString", dateObj => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Don't ignore the same files ignored in the git repo
  config.setUseGitIgnore(false);

  // pass assets right through
  config.addPassthroughCopy({"./src/public": "/"});

  // Get all pages, called 'ghostPages' to prevent
  // conflicting the eleventy page object
  config.addCollection("ghostPages", async function(collection) {
    collection = await api.pages
      .browse({
        // include: "authors",
        limit: "all",
        filter: 'tag:-hash-fsp+tag:-hash-no-11ty'
      })
      .catch(err => {
        console.error(err);
      });

    collection.map(ghostPage => {
      ghostPage.url = stripDomain(ghostPage.url);
      // ghostPage.primary_author.url = blogDomain(ghostPage.primary_author.url);

      // Convert publish date into a Date object
      ghostPage.published_at = new Date(ghostPage.published_at);
      return ghostPage;
    });

    return collection;
  });

  // Get all posts
  config.addCollection("posts", async function(collection) {
    collection = await api.posts
      .browse({
        include: "tags,authors",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    collection.forEach(post => {
      post.url = blogDomain(post.url);
      post.primary_author.url = blogDomain(post.primary_author.url);
      post.tags.map(tag => (tag.url = blogDomain(tag.url)));

      // Convert publish date into a Date object
      post.published_at = new Date(post.published_at);
    });

    // Bring featured post to the top of the list
    collection.sort((post, nextPost) => nextPost.featured - post.featured);

    return collection;
  });

  // Get all authors
  // config.addCollection("authors", async function(collection) {
  //   collection = await api.authors
  //     .browse({
  //       limit: "all"
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //
  //   // Get all posts with their authors attached
  //   const posts = await api.posts
  //     .browse({
  //       include: "authors",
  //       limit: "all"
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //
  //   // Attach posts to their respective authors
  //   collection.forEach(async author => {
  //     const authorsPosts = posts.filter(post => {
  //       post.url = blogDomain(post.url);
  //       return post.primary_author.id === author.id;
  //     });
  //     if (authorsPosts.length) author.posts = authorsPosts;
  //
  //     author.url = blogDomain(author.url);
  //   });
  //
  //   return collection;
  // });
  //
  // // Get all tags
  // config.addCollection("tags", async function(collection) {
  //   collection = await api.tags
  //     .browse({
  //       include: "count.posts",
  //       limit: "all"
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //
  //   // Get all posts with their tags attached
  //   const posts = await api.posts
  //     .browse({
  //       include: "tags,authors",
  //       limit: "all"
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  //
  //   // Attach posts to their respective tags
  //   collection.forEach(async tag => {
  //     const taggedPosts = posts.filter(post => {
  //       post.url = blogDomain(post.url);
  //       return post.primary_tag && post.primary_tag.slug === tag.slug;
  //     });
  //     if (taggedPosts.length) tag.posts = taggedPosts;
  //
  //     tag.url = blogDomain(tag.url);
  //   });
  //
  //   return collection;
  // });

  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: "_data"
      // data: `_data/${env}`
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
