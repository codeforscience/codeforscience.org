<template>
  <div>
    <section class="bl b--black-10 flex flex-column black-70">
      <div class="bt b--black-10 ph3 ph5-l pb4 pb5-ns pt3">
        <section class="mw8 center">
          <h2 class="ph3 ph0-l f2 ttu fw5">
            {{ page.title }}
          </h2>
          <div class="mb5 f5 f4-l lh-copy measure-wide" v-html="page.html"/>
          <article
            v-for="project of projects"
            :key="project.slug"
            class="pv4 bt bb b--black-10 ph3 ph0-l"
          >
            <div class="black-70">
              <div class="flex flex-column flex-row-ns items-center">
                <div v-if="project.feature_image" class="pl3-ns order-2 order-1-ns mb4 mb0-ns w-100 w-40-ns">
                  <img :src="project.feature_image" class="db mw5 center" style="max-height:150px;" alt="Featured Image">
                </div>
                <div class="w-100 w-60-ns pr3-ns order-1 order-2-ns">
                  <h1 class="f4 mt0 lh-title">
                    {{ project.title }}
                  </h1>
                  <div v-if="project.html" class="f5 f4-l lh-copy" v-html="project.html" />
                </div>
              </div>
            </div>
          </article>
        </section>
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
    const page = await ghostAPI().pages.read({
      slug: 'projects'
    })
    const projects = await ghostAPI().pages.browse({
      filter: 'tag:hash-fsp'
    })
    return {
      projects,
      page
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
