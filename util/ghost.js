import GhostContentAPI from '@tryghost/content-api'

// we have this function accept variables to be accessible to config.js
const ghost = (url, key) => {
  return new GhostContentAPI({
    url,
    key,
    version: 'v2'
  })
}

const generateRoutes = async () => {
  // need to use env set in .env file or set on your server since this is called during nuxt config
  // cannot use process.env.ghostUri which is available after config
  const url = process.env.GHOST_URI
  const key = process.env.GHOST_KEY

  const api = ghost(url, key)

  // initialize array of routes to be filled
  const routes = []

  /*
  ** get pages
  */
  const pages = await api.pages.browse({
    limit: 'all',
    include: 'authors,tags'
  })

  pages.forEach((page) => {
    routes.push({
      route: '/' + page.slug,
      payload: page
    })
  })

  return routes
}

const ghostAPI = () => {
  // called as function to make sure env variables are available
  return ghost(process.env.ghostUri, process.env.ghostKey)
}

export { ghostAPI, generateRoutes }
