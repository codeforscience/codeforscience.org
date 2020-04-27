<template>
  <section class="lh-copy mw8">
    <div class="pa3 ph5-ns">
      <h2 class="f2 ttu fw5">
        {{ page.title }}
      </h2>
      <article ref="pageContent" class="lh-copy measure-wide" v-html="page.html" />
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
