class Home {
  data() {
    return {
      title: 'CS&S',
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js",
      pagination: {
        data: "collections.posts",
        size: 3,
        alias: 'posts',
        before: function(data) {
          return data.filter(entry => entry.featured);
        }
      },
    };
  }

  async render({posts, site}) {
    return `
  <div>
    <section class="flex flex-column black-70">
      <div class="">
        <div class="relative overflow-hidden w-100 vh-75 dt">
          <div class="relative z-5 ph3 ph5-l pb4 pb5-ns pt2 bg-black-60 w-100 h-100 tc dtc v-mid">
            <h2 class="f2 f1-l fw2 mw6 ph3 center white-90 mb0 lh-title">
              ${ site.tagline }
            </h2>
            <h3 class="f5 f4-ns fw5 measure-wide ph3 center white-80 mt3 mb5">
              ${ site.homeDescription }
            </h3>
          </div>
          ${await this.Image(site.cover_image, "", "home-bg absolute z-0 left-0 top-0 w-100 h-100")}
        </div>
      </div>
      <div class="bt b--black-10 ph3 ph5-ns pb4 pb5-ns pt3">
        <section class="mw8 center">
          <h3 class="ph3 ph0-l f2 ttu fw5">
            Latest News
          </h3>
          ${await Promise.all(posts.map(async post => {
            return `<article
              id="${post.slug}"
              class="pv4 bt bb b--black-10 ph3 ph0-l"
            >
              <a class="black-70 dim" href="${site.blogUrl + post.slug}">
                <div class="flex flex-column flex-row-ns">
                  <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                    <h4 class="f4 mt0 lh-title">
                      ${ post.title }
                    </h4>
                    <div class="f5 f4-l lh-copy">
                    ${this.markdown(post.excerpt)}
                    </div>
                  </div>
                  ${post.feature_image ? `
                    <div class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-40">
                    ${await this.Image(post.feature_image, post.title, "db h-auto w6-ns")}
                    </div>`
                  : ``}
                </div>
              </a>
            </article>`
          })).then((arr) => arr.join(''))}
          <a
            href="${site.blogUrl}"
            class="mt4 f4 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
          >
            Read More on the Blog
            <svg class="w1 pl2" data-icon="chevronRight" viewBox="0 0 32 32" style="fill:currentcolor">
              <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
            </svg>
          </a>
        </section>
      </div>
      <div class="bt b--black-10 bg-lightest-blue ph3 ph5-ns">
        <div class="pv3 pb5-l mw8 center">
          <div class="cf">
          ${site.programs.map(program => {
            return `<article class="pv2 fl w-100 w-50-l pr0 pr5-l flex flex-column">
              <h5 class="f5 f4-ns fw6 mb3">
                ${program.title}
              </h5>
              <div class="f5 f4-l lh-copy measure mt0">
                ${this.markdown(program.description)}
              </div>
              <div><a
                href="${program.ctaLink}"
                class="mt3 f5 no-underline black dim inline-flex items-center pa2 ba border-box"
              >
                ${program.ctaText}
                <svg class="w1 pl2" data-icon="chevronRight" viewBox="0 0 32 32" style="fill:currentcolor">
                  <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
                </svg>
              </a></div>
            </article>`
          }).join('')}
          </div>
        </div>
      </div>
    </section>
  </div>
  </section>
  </div>`
  }
}

module.exports = Home;
