<template>
  <div class="bg-lightest-blue pa3 pb5-ns ph5-l">
    <section
      v-for="group of page.group"
      :key="group.name"
      class="flex flex-wrap"
    >
      <h3 class="f2 db w-100 mb2">
        {{ group.name }}
      </h3>
      <h5
        v-if="group.description"
        class="f4 db w-100 mt0"
      >
        {{ group.description }}
      </h5>
      <person
        v-for="person in group.people"
        :key="person"
        :name="person"
      />
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
  },
  head: {
    title: 'People at CS&S'
  }
}
</script>
