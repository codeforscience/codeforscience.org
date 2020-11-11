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

#### Pages

Content for about page, project descriptions, and additional pages are managed via ghost blog at https://blog.codeforscience.org/ghost/

* Fiscally Sponsored Projects
  * Each project is a "page" in ghost with the `#fsp` tag.
  * To add a new project, add a new page and tag wit with `#fsp`
* Other full content pages such as "About CS&S" can also be edited in the ghost pages list.
* To add a new page, create and publish a page in Ghost. It will be available at the url specificied in ghost. It can then be added to the navigation in the CMS.
* Use the tag `#no-11ty` in Ghost if you create a page in ghost that should not be added to the site.


## Development

This site is built on [Eleventy](https://11ty.io) from starters [EleventyOne](https://github.com/philhawksworth/eleventyone) by philhawksworth and [Eleventy Ghost]( https://eleventy.ghost.org).

- [Eleventy](https://11ty.io) with a skeleton site
- A date format filter for Nunjucks based on [Luxon](https://moment.github.io/luxon)
- A tiny CSS pipeline with PostCSS
- A tiny inline JS pipeline
- [Netlify Dev](https://www.netlify.com/products/dev) for testing [Netlify redirects](https://netlify.com/docs/redirects/)

Content is pulled from the local json files, managed by NetlifyCMS, and our ghost blog.

### Ghost

To run the website locally, create an `.env` file with the following variables from the Ghost blog:

```
GHOST_KEY=''
GHOST_URI=''
SITE_URL=''
```

To use your own install, edit the `.env` config file with your credentials. You can find your `contentApiKey` in the "Integrations" screen in Ghost Admin. The minimum required version for Ghost is `2.10.0` in order to use this starter without issues.

## Prerequisites

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash
# install the dependencies
npm install

# External data sources can be stashed locally
npm run seed

# It will then be available locally for building with
npm run start
```

# Copyright & License

Copyright (c) 2020 Code for Science and Society - Released under the [MIT license](LICENSE).

* EleventyOne Starter Files - Copyright (c) 2020 Phil Hawksworth
* Eleventy Ghost Starter Files - Copyright (c) 2013-2020 Ghost Foundation
