import axios from 'axios'
import { generateRoutes } from './util/ghost'
require('dotenv').config()

export default async () => {
  const { data: { settings } } = await axios.get(process.env.GHOST_URI + '/ghost/api/v3/content/settings/?key=' + process.env.GHOST_KEY + '&v=3')

  return {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: settings.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: settings.description }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: "preconnect",
          href: "https://images.unsplash.com/",
          crossorigin: true
        }
      ]
    },
    sitemap: {
      hostname: 'https://codeforscience.org',
      gzip: true,
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
      'tachyons/css/tachyons.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
      { src: '~/plugins/vue-lazyload' }
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      'nuxt-purgecss',
      '@aceforth/nuxt-optimized-images'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
      '@nuxtjs/markdownit',
      '@nuxtjs/dotenv',
      '@nuxtjs/sitemap'
    ],
    env: {
      // loaded from .env file locally and from netlify in deployment
      ghostUri: process.env.GHOST_URI,
      ghostKey: process.env.GHOST_KEY,
      siteUrl: process.env.SITE_URL
    },
    markdownit: {
      injected: true
    },
    optimizedImages: {
      optimizeImages: true
    },
    /*
    ** Build configuration
    */
    build: {
      /*
      ** You can extend webpack config here
      */
      extend (config, ctx) {
      }
    },
    /*
    ** Dynamic page generation
    */
    generate: {
      subFolders: false,
      fallback: true,
      async routes () {
        const routes = await generateRoutes()
        const fs = require('fs')
        fs.readdirSync('./assets/content/jobs').map((file) => {
          if (file.indexOf('.json') < 0) return
          routes.push({
            route: `/jobs/${file.slice(2, -5)}`, // Remove the .json from the end of the filename
            payload: require(`./assets/content/jobs/${file}`)
          })
        })
        return routes
      }
    }
  }
}
