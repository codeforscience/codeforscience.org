export const state = () => ({
  jobs: []
})

export const mutations = {
  setJobs (state, list) {
    state.jobs = list
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const files = await require.context('~/assets/content/jobs/', false, /\.json$/)
    const jobs = files.keys().map((key) => {
      const res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setJobs', jobs)
  }
}
