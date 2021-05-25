const ghostContentAPI = require("@tryghost/content-api");

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

class Docs {
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

  async render({projectsPage, docs}) {
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
            ${await Promise.all(docs.map(async (doc) => {
              // if (doc['Tags (css.org)'] && project['Tags (css.org)'].includes('alumni') || !project['Description (css.org)']) return
              console.log(doc)
              return `<article
                class="pv4 bt b--black-10 ph3 ph0-l mw7"
              >
                <div class="black-70">
                  <div class="flex flex-column flex-wrap flex-row-ns items-center justify-between">
                    <div class="w-100 w-60-ns pl4-l pr3-ns order-1 order-2-ns">
                      <h1 class="f4 mt0 lh-title">
                        ${ doc['Name'] }
                      </h1>
                      <div class="f5 f4-l lh-copy">
                      ${doc['Description']}
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

module.exports = Docs;
