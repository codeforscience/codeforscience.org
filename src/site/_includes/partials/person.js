class Person {
  // or `async data() {`
  // or `get data() {`
  data() {
    // return {
    //   person (name) {
    //     return this.$store.state.people
    //       .filter(x => x.name === this.name)[0]
    //   },
    //   image (name) {
    //     const person = this.$store.state.people
    //       .filter(x => x.name === this.name)[0]
    //     if (!person.image) return
    //     return require(`@/assets${person.image}?resize&size=146`).src
    //   }
    // };
  }

  render({name}) {
    // will always be "Ted"
    return `  <article
        class="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"
      >
        <div class="tc">
          <img
            v-if="person.image"
            v-lazy="image"
            class="br-100 h4 w4 dib ba b--black-05 pa2"
            :title="person.name"
            style="object-fit:cover;"
          >
          <h1 class="f3 mb2">
            {{ person.name }}
          </h1>
      </article>`;
  }
}

module.exports = Person;
