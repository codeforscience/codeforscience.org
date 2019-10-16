<template>
  <section class="min-vh-100 bl b--black-10 flex flex-column black-70 w-100">
    <div class="ph3 ph5-l pt2 pb5 mw8">
      <h1>{{ job.title }}</h1>
      <div class="f4 lh-copy" v-html="$md.render(job.description)" />
      <div v-html="$md.render(job.body)" />
      <a
        v-if="job.useForm"
        href="/jobs/apply/"
        class="f5 no-underline white bg-black bg-animate hover-bg-white
        hover-black dib items-center pa2 ba border-box"
      >
        <span class="fw5">Apply Now!</span>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData ({ params, payload }) {
    if (payload) {
      return { job: payload }
    } else {
      return {
        job: await require(`~/assets/content/jobs/${params.jobs}.json`)
      }
    }
  }
}
</script>
