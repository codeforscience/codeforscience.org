<template>
  <section class="section">
    <div class="container post-container">
      <h1 class="title has-text-weight-bold has-text-centered has-text-primary">
        {{ page.title }}
      </h1>
      <article ref="pageContent" class="content page-content" v-html="page.html" />
    </div>
  </section>
</template>

<script>
import { ghostAPI } from '@/util/ghost'
export default {
  name: 'GhostPage',
  async asyncData ({ params }) {
    const page = await ghostAPI().pages.read({
      slug: params.page
    })
    return {
      page
    }
  },
  computed: {
    siteSettings () {
      return this.$store.state.siteSettings
    }
  },
  head () {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.page.og_title || this.page.meta_title },
        { hid: 'og:description', property: 'og:description', content: this.page.og_description || this.page.meta_description },
        { hid: 'og:image', property: 'og:image', content: this.page.og_image || this.page.feature_image },
        { hid: 'og:url', property: 'og:url', content: process.env.siteUrl + this.$route.path }
      ]
    }
  }
}
</script>

<style>
</style>
