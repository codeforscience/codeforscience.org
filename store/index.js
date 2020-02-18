import { ghostAPI } from '@/util/ghost'

export const state = () => ({
  jobs: [],
  pages: [],
  globals: {},
  people: [],
  ghostSettings: null
})

export const mutations = {
  setJobs (state, list) {
    state.jobs = list
  },
  setPeople (state, list) {
    state.people = list
  },
  setPages (state, pages) {
    state.pages = pages
  },
  setGlobals (state, globals) {
    state.globals = globals
  },
  setGhostSettings (state, ghostSettings) {
    state.ghostSettings = ghostSettings
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { error }) {
    const jobFiles = await require.context('~/assets/content/jobs/', false, /\.json$/)
    const jobs = jobFiles.keys().map((key) => {
      const res = jobFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setJobs', jobs)

    const peopleFiles = await require.context('~/assets/content/people/', false, /\.json$/)
    const peoples = peopleFiles.keys().map((key) => {
      const res = peopleFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setPeople', peoples)

    const pageFiles = await require.context('~/assets/content/pages/', false, /\.json$/)
    const pages = pageFiles.keys().map((key) => {
      const res = pageFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setPages', pages)

    const content = await require('~/assets/content/content.json')
    const globalFiles = await require.context('~/assets/content/globals/', false, /\.json$/)
    globalFiles.keys().map((key) => {
      content[key.slice(2, -5)] = globalFiles(key)
    })
    await commit('setGlobals', content)

    // get site settings from ghost
    try {
      const settings = await ghostAPI().settings.browse()
      commit('setGhostSettings', settings)
    } catch (e) {
      // since this is server init, the error would be a server error
      error({ statusCode: 500, message: e.message })
      throw e
    }
  }
}
