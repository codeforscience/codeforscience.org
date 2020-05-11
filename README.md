# css-website

> Code for Science &amp; Society website

To update content on homepage, navigation/globals, jobs, and people, visit https://codeforscience.org/admin/.

Other content is managed via ghost blog at https://blog.codeforscience.org/ghost/

* Fiscally Sponsored Projects
* "Latest news" section shows latest featured posts
* Other full content pages such as "About CS&S" can also be edited in the ghost pages list. 

## Development

This site uses Nuxt.js](https://nuxtjs.org). Content is pulled from the local json files, managed by NetlifyCMS, and our ghost blog.

To run the website locally, create an `.env` file with the following variables from the Ghost blog:

```
GHOST_KEY=''
GHOST_URI=''
SITE_URL=''
```

Other development commands:

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
