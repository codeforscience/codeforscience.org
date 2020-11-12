class People {
  data() {
    return {
      title: 'Board of Directors',
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js"
    };
  }

  render({pages, people}) {
    return `<div class="bg-lightest-blue pa3 pb5-ns ph5-l">
      ${pages.board.group.map((group) => {
        return `<section class="flex flex-wrap">
          <h3 class="f2 db w-100 mb2">
            ${ group.name }
          </h3>
          ${ group.description ? `class="f4 db w-100 mt0">${ group.description }</h5>` : ''}
          ${ group.people.map((name) => {
              const person = Object.values(people).filter(x => x.name === name)[0]
              if (!person) return
              return `<article
                  class="center bg-white br3 pa2 pa3-ns mv3 ba b--black-10"
                >
                  <div class="tc">
                    ${person.image ?
                      `<img
                        class="br-100 h4 w4 dib ba b--black-05 pa2"
                        title="${person.name}"
                        src="${person.image}"
                        width="150"
                        style="object-fit:cover;"
                        >` : ''}
                    <h1 class="f3 mb2">
                      ${person.name}
                    </h1>
                    <h2 class="f5 fw5 black-70 mt0 measure-narrow">
                      ${person.title}
                    </h2>
                  </div>
                  ${person.bio ?
                    `<div class="measure-narrow center f6 black-70">${this.markdown(person.bio)}</>` : ''}
                </article>`
            }).join('')}
        </section>`
       }).join('')}
    </div>`
  }
}

module.exports = People;
