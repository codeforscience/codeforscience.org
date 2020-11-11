const ghostContentAPI = require("@tryghost/content-api");

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

class Donate {
  // or `async data() {`
  // or `get data() {`
  async data() {
    const donatePage = await api.pages.read({
      slug: 'donate'
    })
    return {
      title: 'Donate',
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js",
      donorbox: "https://donorbox.org/embed/code-for-science-society?default_interval=m",
      donatePage
    }
  }

  render({donatePage, donorbox}) {
    return `<section class="black-70">
      <div class="flex flex-wrap justify-between pl3 pl5-l pb3 pt3 pt5-ns">
          <div class="pr2 pr3-l">
            <h2 class="f2 ttu fw5 mt0">
              ${ donatePage.title }
            </h2>
            <div class="f5 f4-l lh-copy measure-narrow">
              ${donatePage.html}
            </div>
          </div>
          <script defer src="https://donorbox.org/widget.js" paypalExpress="true"></script><iframe allowpaymentrequest="" frameborder="0" height="900px" name="donorbox" scrolling="no" seamless="seamless" src="${ donorbox }" style="max-width: 500px; min-width: 310px; max-height:none!important" width="100%"></iframe>
      </div>
      <footer class="mw7 center pb2 pb3-ns pl3">
        <p class="f6 i">Code for Science and Society is a registered US 501(c)(3) nonprofit.
Donations are tax deductible to the extent allowed by law in US.
Tax ID 81-3791683</p>
      </footer>
    </section>`
  }
}

module.exports = Donate;
