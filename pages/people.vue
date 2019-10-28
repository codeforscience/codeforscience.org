<template>
  <div class="bg-lightest-blue pa3 ph5-l">
    <section
        v-for="group of page.group"
        :key="group.name"
        class="flex flex-wrap">
      <h3 class="f2 db w-100">
        {{ group.name }}
      </h3>
      <h5 class="f5 db w-100">
        {{ group.description }}
      </h5>
      <person
        v-for="person in group.people"
        :key="person"
        :name="person"
      />
    </section>
    <section class="flex flex-wrap">
      <h3 class="f2 db w-100">
        CS&amp;S Leadership
      </h3>
      <article
        v-for="(person, index) of page.team"
        :key="index"
        class="mw6 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"
      >
        <div class="tc">
          <img :src="person.photo" class="br-100 h4 w4 dib ba b--black-05 pa2" :title="person.name">
          <h1 class="f3 mb2">
            {{ person.name }}
          </h1>
          <h2 class="f5 fw4 gray mt0">
            {{ person.position }}
          </h2>
          <hr class="mw3 bb bw1 b--black-10">
        </div>
        <p class="lh-copy measure center f6 black-70">
          {{ person.description }}
        </p>
      </article>
    </section>
    <section class="flex flex-wrap">
      <h3 class="f2 w-100">
        Board of Directors
      </h3>
      <article
        v-for="(person, index) of page.board"
        :key="index"
        class="w5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10"
      >
        <div class="tc">
          <img
            :src="person.photo"
            class="br-100 h4 w4 dib ba b--black-05 pa2"
            :title="person.name"
            style="object-fit:cover;"
          >
          <h1 class="f3 mb2">
            {{ person.name }}
          </h1>
          <h2 class="f5 fw4 gray mt0">
            {{ person.position }}
          </h2>
        </div>
        <p class="lh-copy measure center f6 black-70">
          {{ person.description }}
        </p>
      </article>
    </section>
  </div>
</template>

<style>

</style>

<script>
import Person from '~/components/Person.vue'

export default {
  components: {
    Person
  },
  computed: {
    page () {
      const route = this.$route.name
      return this.$store.state.pages.find((page) => {
        return route === page.slug
      })
    }
  }
}
</script>
