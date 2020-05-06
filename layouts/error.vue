<template>
  <section class="lh-copy mw8">
    <div class="pa3 ph5-ns">
      <h2 v-if="error.statusCode === 404" class="f2 ttu fw5">
        Page not found
      </h2>
      <h2 v-else class="f2 ttu fw5">
        An error occurred
      </h2>
      <article class="lh-copy measure-wide">
        <nuxt-link to="/">
          Home page
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script>
</script>
