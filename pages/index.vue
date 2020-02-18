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
      <div class="bt b--black-10 ph3 ph5-l pb4 pb5-ns pt3">
        <section class="mw8 center">
          <h2 class="ph3 ph0-l f2 ttu fw5">
            Latest News
          </h2>
          <article
            v-for="post of posts.slice(0,3)"
            :key="post.slug"
            class="pv4 bt bb b--black-10 ph3 ph0-l"
          >
            <a class="black-70 dim" :href="ghostSettings.url + post.slug">
              <div class="flex flex-column flex-row-ns">
                <div class="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                  <h1 class="f4 mt0 lh-title">
                    {{ post.title }}
                  </h1>
                  <div class="f5 f4-l lh-copy" v-html="$md.render(post.excerpt)" />
                </div>
                <div v-if="post.feature_image" class="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
                  <img :src="post.feature_image" class="db h5" alt="Featured Image">
                </div>
              </div>
            </a>
          </article>
          <a
            :href="ghostSettings.url"
            class="mt4 f4 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
          >
            Read More on the Blog
            <svg class="w1 pl2" data-icon="chevronRight" viewBox="0 0 32 32" style="fill:currentcolor">
              <title>chevronRight icon</title>
              <path d="M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z" />
            </svg>
          </a>
        </section>
      </div>
      <div class="bt b--black-10 bg-lightest-blue">
        <div class="pv3 pb5-ns mw8 center">
          <h3 class="ph3 ph0-l f2 ttu fw5">Projects</h3>
        </div>
      </div>
      <div class="bt b--black-10">
        <div class="pv3 pb5-ns mw8 center">
          <h3 class="ph3 ph0-l f2 ttu fw5">Footer</h3>
        </div>
      </div>
    </section>
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
    return {
      posts
    }
  },
  computed: {
    globals () {
      return this.$store.state.globals
    },
    ghostSettings () {
      return this.$store.state.ghostSettings
    }
  }
}
</script>

<style>
</style>
