<template>
  <article
    v-if="person"
    class="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"
  >
    <div class="tc">
      <img
        v-if="person.image"
        :src="person.image"
        class="br-100 h4 w4 dib ba b--black-05 pa2"
        :title="person.name"
        style="object-fit:cover;"
      >
      <h1 class="f3 mb2">
        {{ person.name }}
      </h1>
      <h2 class="f5 fw5 black-70 mt0">
        {{ person.title }}
      </h2>
    </div>
    <div
      v-if="person.bio"
      class="lh-copy measure center f5 black-70"
      v-html="$md.render(person.bio)"
    />
  </article>
</template>

<script>
export default {
  name: 'Person',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    person (name) {
      return this.$store.state.people
        .filter(x => x.name === this.name)[0]
    }
  }
}
</script>
