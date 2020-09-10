# css-website

> Code for Science &amp; Society website

## Content Mangement

To update content on homepage, navigation/globals, jobs, and people, visit the CMS at https://codeforscience.org/admin/. Other pages and blog content is managed in Ghost. See details below.

#### Homepage

* Blog posts marked **featured** in Ghost are shown on the homepage under latest news
* Other content on the homepage can be [edited in the CMS](https://codeforscience.org/admin/#/collections/content/entries/globals) under `Content > Globals`

#### Navigation

* Navigation is set in the CMS
* See below on how to add a new page

#### People

* Add a new person to the [Collection: People](https://codeforscience.org/admin/#/collections/people)
* Then they must be added to the [Content > People Page](https://codeforscience.org/admin/#/collections/content/entries/People) to be displayed

#### Job

* Add a new job to the [Collection: Jobs](https://codeforscience.org/admin/#/collections/jobs)
* If there are jobs, the "Jobs" item will appear in the navigation. If there are not jobs, it will not be displayed.

#### Pages

Content for about page, project descriptions, and additional pages are managed via ghost blog at https://blog.codeforscience.org/ghost/

* Fiscally Sponsored Projects
  * Each project is a "page" in ghost with the `#fsp` tag.
  * To add a new project, add a new page and tag wit with `#fsp`
* Other full content pages such as "About CS&S" can also be edited in the ghost pages list. 
* To add a new page, create and publish a page in Ghost. It will be available at the url specificied in ghost. It can then be added to the navigation in the CMS.


## Development

This site uses [Nuxt.js](https://nuxtjs.org). Content is pulled from the local json files, managed by NetlifyCMS, and our ghost blog.

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
