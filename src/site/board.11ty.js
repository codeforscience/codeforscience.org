class People {
  data() {
    return {
      title: 'Board of Directors',
      layout: 'layouts/base.njk',
      templateEngineOverride: "11ty.js"
    };
  }

  async render({people}) {
    const board = people.filter((person) => person['Page'] === 'Board')
    return `<div class="bg-lightest-blue pa3 pb5-ns ph5-l">
      <section class="flex flex-wrap">
        <h3 class="f2 db w-100 mb2">
          Board of Directors
        </h3>
        ${await Promise.all(board.map(async (person) => {
            console.log('person', person)
            return `<article class="center bg-white br3 pa2 pa3-ns mv3 ba b--black-10">
                <div class="tc">
                  ${await this.Avatar(person['Photo'][0].url, person['Name'])}
                  <h1 class="f3 mb2">
                    ${person['Name']}
                  </h1>
                  <h2 class="f5 fw5 black-70 mt0 measure-narrow">
                    ${person['Title']}
                  </h2>
                </div>
                ${person['Bio'] ?
                  `<div class="measure-narrow center f6 black-70">${this.markdown(person['Bio'])}</div>` : ''}
              </article>`
          })).then((arr) => arr.join(''))}
      </section>
    </div>`
  }
}

module.exports = People;
