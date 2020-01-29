<template>
  <div>
    <section class="bl b--black-10 flex flex-column black-70">
      <div class="cover bg-center" style="background-image:url('/img/background.jpg')">
        <div class="bt b--black-10 ph3 ph5-l pb4 pb5-ns pt2 bg-black-60 w-100 vh-75 dt">
          <div class="tc dtc v-mid">
            <h1 class="f2 f1-l fw2 mw7 ph5 center white-90 mb0 lh-title">
              {{ globals.tagline }}
            </h1>
            <h2 class="f5 f4-ns fw5 measure-wide center white-80 mt3 mb4">
              {{ globals.description }}
            </h2>
          </div>
        </div>
      </div>
      <div class="bt b--black-10 ph3 ph5-l pb4 pb5-ns pt2">
        <h3 class="f2 ttu fw5">
          Latest News
        </h3>
        <div class="f5 f4-ns fw4 cf">
          <div v-if="featuredPost.feature_image" class="card-image">
            <figure class="image">
              <img :src="featuredPost.feature_image" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="is-title has-text-centered">
                {{ featuredPost.title }}
              </h3>
            </div>
            <div class="content" v-html="featuredPost.excerpt" />
          </div>
          <p>{{ featuredPost }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ghostAPI } from '@/util/ghost'

export default {
  async asyncData () {
    const posts = await ghostAPI().posts.browse({
      filter: 'featured:true'
    })
    const featuredPost = posts[0]
    return {
      featuredPost
    }
  },
  computed: {
    globals () {
      return this.$store.state.globals
    },
    siteSettings () {
      return this.$store.state.siteSettings
    }
  }
}
</script>

<style>
</style>
