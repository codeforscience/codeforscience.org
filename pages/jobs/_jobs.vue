<template>
  <article>
    <h1>{{ job.title }}</h1>
    <div v-html="$md.render(job.body)" />
  </article>
</template>

<script>
export default {
  async asyncData ({ params, payload }) {
    if (payload) {
      return { job: payload }
    } else {
      return {
        job: await require(`~/assets/content/jobs/${params.job}.json`)
      }
    }
  }
}
</script>
