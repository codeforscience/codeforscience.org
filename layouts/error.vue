<template>
  <section class="lh-copy mw8">
    <div class="pa3 ph5-ns">
      <h2
        v-if="error.statusCode === 404"
        class="f2 ttu fw5"
      >
        Page not found
      </h2>
      <h2 v-else>
        An error occurred
      </h2>
      <article ref="pageContent" class="lh-copy measure-wide">
        <nuxt-link to="/" tag="a">
          Go Home
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'default'
}
</script>
