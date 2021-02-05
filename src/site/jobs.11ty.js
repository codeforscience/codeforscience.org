class Jobs {
  data() {
    return {
      title: 'Jobs',
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js"
    };
  }

  render({title, page, jobs}) {
    return `
  <section class="flex flex-wrap">
    <div class="ph3 ph5-l pt2">
      <div class="pv3 lh-copy">
        <h2 class="f2 ttu fw5 measure-narrow">
          ${ title }
        </h2>
        ${jobs && Object.keys(jobs).length ?
          `<div class="f5 f4-ns fw4 measure">
            <h4>Currently Hiring:</h4>
            <ul>
            ${Object.entries(jobs).map(([filename, job]) => {
              return `<li>
                <a href="#${filename}">
                  ${ job.title }
                </a>
              </li>`
            }).join('')}
            </ul>
            <hr>
          </div>`
        :
          `<div v-else class="f5 f4-ns fw4 measure">
            <h4>No open positions.</h4>
          </div>`
        }
      </div>
    </div>
    <div class="mw7-l">
    ${Object.entries(jobs).map(([filename, job]) => {
      return `<article class="ph3 ph5-l pb4" id="${ filename }">
        <h3>${ job.title }</h3>
        <div class="f4 lh-copy">${this.markdown(job.description)}</div>
        <a
          href="/jobs/${ this.slug(job.title) }"
          class="f5 no-underline black bg-animate hover-bg-black
            hover-white dib items-center pa2 ba border-box"
        >
          <span class="fw5 pr1">Read More</span>
          <svg
            class="w1 v-mid"
            data-icon="chevronRight"
            viewBox="0 0 32 32"
            style="fill:currentcolor"
          >
            <title>chevronRight icon</title>
            <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
          </svg>
        </a>
      </article>`
    }).join('')}
    </div>
    <div class="ph3 ph5-l pt3 pb5">
      <hr>
      <p>
        CS&S is an equal opportunity employer committed to hiring a diverse workforce at all levels of the organization, creating a culture that allows us to better serve our projects, our employees, and our communities. We value and encourage the contributions of our employees and strive to create an environment where everyone can reach their full potential and drive outstanding results. All qualified applicants will receive consideration for employment without regard to race, national origin, age, sex, religion, disability, sexual orientation, marital status, veteran status, gender identity or expression, or any other basis protected by local, state, or federal law. This policy applies with regard to all aspects of one’s employment, including hiring, transfer, promotion, compensation, eligibility for benefits, and termination.
      </p>
    </div>
  </section>`
  }
}

module.exports = Jobs;
