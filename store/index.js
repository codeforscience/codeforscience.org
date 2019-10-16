export const state = () => ({
  jobs: [],
  pages: [],
  content: {}
})

export const mutations = {
  setJobs (state, list) {
    state.jobs = list
  },
  setPages (state, pages) {
    state.pages = pages
  },
  setContent (state, content) {
    state.content = content
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const jobFiles = await require.context('~/assets/content/jobs/', false, /\.json$/)
    const jobs = jobFiles.keys().map((key) => {
      const res = jobFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setJobs', jobs)

    const pageFiles = await require.context('~/assets/content/', false, /\.json$/)
    const pages = pageFiles.keys().map((key) => {
      const res = pageFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setPages', pages)

    const content = await require('~/assets/content/content.json')
    await commit('setContent', content)
  }
}
