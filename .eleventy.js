require("dotenv").config();

const cleanCSS = require("clean-css");
const fs = require("fs");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const localImages = require("eleventy-plugin-local-images");
const lazyImages = require("eleventy-plugin-lazyimages");
const Image = require("@11ty/eleventy-img");
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
  return "/news" + stripDomain(url)
};

module.exports = function(config) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/default.njk');

  // Add some utility filters
  // config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );

  // Assist RSS feed template
  config.addPlugin(pluginRSS);

  if (process.env.ELEVENTY_ENV === 'production') {
    // Apply performance attributes to images
    config.addPlugin(lazyImages, {
      scriptSrc: '/js/lazysizes.min.js',
      transformImgPath: (src) => {
        if (src.startsWith('/')) return `./src/public${src}`
        return src
      }
    });
  }

  // minify the html output + css
  config.addPlugin(require("./src/utils/minify-html.js"));

  // eleventy-plugin-lazyimages must run before eleventy-plugin-local-images
  // Copy images over from Ghost
  config.addPlugin(localImages, {
    distPath: "dist",
    assetPath: "/img",
    selector: "img",
    attribute: "data-src", // Lazy images attribute
    verbose: false
  });

  // Inline CSS
  config.addFilter("cssmin", code => {
    return new cleanCSS({}).minify(code).styles;
  });

  config.addFilter("markdown", (content) => {
    return md.render(content)
  })

  // compress and combine js files
  config.addNunjucksAsyncFilter("jsmin", async function(code, callback) {
    const { minify } = require("terser")
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  config.addJavaScriptFunction("Avatar", async (src, alt) => {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [50, 150, 300],
      formats: ["jpeg", "webp"],
      urlPath: "/img/",
      outputDir: "./dist/img/",
    });

    let lowestSrc = stats["jpeg"][0];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`;

    const img = `<img
      class="lazy br-100 h4 w4 dib ba b--black-05 pa2"
      style="object-fit:cover;"
      alt="${alt}"
      src="${lowestSrc.url}"
      data-srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

    return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
  });

  config.addJavaScriptFunction("Image", async (src, alt, cls) => {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [25, 320, 640, 960, 1200, 1800, 2400],
      formats: ["jpeg", "webp"],
      urlPath: "/img/",
      outputDir: "./dist/img/",
    });

    let lowestSrc = stats["jpeg"][0];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`;

    const img = `<img
      class="lazy ${cls}"
      alt="${alt}"
      src="${lowestSrc.url}"
      data-src="${lowestSrc.url}"
      data-sizes='(min-width: 1024px) 1024px, 100vw'
      data-srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

    return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
  });

  config.addNunjucksAsyncShortcode("ProjectImage", async (src, alt, cls) => {
    if (!src) {
      throw new Error('No image source')
    }
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    src = src.startsWith('/') ? `./src/public${src}` : src

    let stats = await Image(src, {
      widths: [50, 150, 300, 500],
      formats: ["jpeg", "webp"],
      urlPath: "/img/",
      outputDir: "./dist/img/",
    });

    let lowestSrc = stats["jpeg"][0];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          ""
        ),
      }),
      {}
    );

    const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`;

    const img = `<img
      class="lazy ${cls}"
      alt="${alt}"
      src="${lowestSrc.url}"
      data-src="${lowestSrc.url}"
      data-sizes='(min-width: 1024px) 1024px, 100vw'
      data-srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

    return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
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

  /**
   * Override BrowserSync Server options
   *
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  config.setBrowserSyncConfig({
    notify: false,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
    // Set local server 404 fallback
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html')

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.write(content_404)
          res.end()
        })
      },
    },
  })

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
