const ghostContentAPI = require("@tryghost/content-api");

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

class People {
  // or `async data() {`
  // or `get data() {`
  async data() {
    const projectsPage = await api.pages.read({
      slug: 'projects'
    })
    // const projects = await api.pages.browse({
    //   filter: 'tag:hash-fsp'
    // })
    return {
      title: projectsPage.title,
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js",
      // projects,
      projectsPage
    }
  }

  async render({projectsPage, projects}) {
    return ` <div>
      <section class="flex flex-column black-70">
        <div class="ph3 ph5-l pb4 pb5-ns pt3">
          <section class="mw8 center">
            <h2 class="f2 ttu fw5">
              ${ projectsPage.title }
            </h2>
            <div class="mb5 f5 f4-l lh-copy measure-wide">
              ${projectsPage.html}
            </div>
            ${await Promise.all(projects.map(async (project) => {
              if (project['Tags (css.org)'] && project['Tags (css.org)'].includes('alumni') || !project['Description (css.org)']) return
              return `<article
                class="pv4 bt b--black-10 ph3 ph0-l mw7"
              >
                <div class="black-70">
                  <div class="flex flex-column flex-row-ns items-center">
                    <div class="order-2 order-1-ns mb4 mb0-ns w-100 w-40-ns">
                      ${project["Logo"] && await this.Image(project["Logo"][0].url, project['Display Name'], "db mw5-l mw4 center")}
                    </div>
                    <div class="w-100 w-60-ns pl4-l pr3-ns order-1 order-2-ns">
                      <h1 class="f4 mt0 lh-title">
                        ${ project['Display Name'] }
                      </h1>
                      <div class="f5 f4-l lh-copy">
                      ${project['Description (css.org)']}
                      <p>Website: <a href="${project['Website']}">${project['Website'].replace(/^https?:\/\//,'')}</a></p>
                        <a
                          href="/donate/${this.slug(project['Display Name'])}/"
                          class="mt3 f5 no-underline black dim inline-flex items-center pa2 ba border-box"
                        >
                          Donate
                          <svg class="w1 pl2" data-icon="chevronRight" viewBox="0 0 32 32" style="fill:currentcolor">
                            <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>`
            })).then((arr) => arr.join(''))}
            <h2 class="f2 ttu fw5 pt5">
              Alumni
            </h2>
            ${await Promise.all(projects.map(async (project) => {
              if (!project['Tags (css.org)'] || !project['Tags (css.org)'].includes('alumni')) return
              return `<article
                class="pv4 bt b--black-10 ph3 ph0-l mw7"
              >
                <div class="black-70">
                  <div class="flex flex-column flex-row-ns items-center">
                    <div class="order-2 order-1-ns mb4 mb0-ns w-100 w-40-ns">
                      ${project["Logo"] && await this.Image(project["Logo"][0].url, project['Display Name'], "db mw5-l mw4 center")}
                    </div>
                    <div class="w-100 w-60-ns pl4-l pr3-ns order-1 order-2-ns">
                      <h1 class="f4 mt0 lh-title">
                        ${ project['Display Name'] }
                      </h1>
                      <div class="f5 f4-l lh-copy">
                      ${project['Description (css.org)']}
                      <p>Website: <a href="${project['Website']}">${project['Website'].replace(/^https?:\/\//,'')}</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>`
            })).then((arr) => arr.join(''))}
          </section>
        </div>
    </section>
  </div>`
  }
}

module.exports = People;
