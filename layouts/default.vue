<script>
export default {
  computed: {
    globals () {
      return this.$store.state.globals
    }
  }
}
</script>

<template>
  <main class="relative flex flex-wrap">
    <header class="bb bn-l b--black-10 w-20-l w-100 vh-100-l pa3 pa4-l pl3-l top-0 sticky-l">
      <div class="flex flex-column-l justify-between mw-100">
        <a href="/" class="dim flex-none-l items-center mw-100 mw5">
          <img :src="globals.logo" :title="globals.title" class=" mw-100-l mw5">
        </a>
        <h3 class="f5 f4-ns fw4 bt b--gray pv3-l pv2 mw5 dn db-l">
          {{ globals.subtitle }}
        </h3>
      </div>

      <footer class="absolute bottom-0 mb4 black-70 dn db-l">
        <a :href="`mailto:${globals.contact.email}`" class="link fw6 f4 dim black-70 lh-solid">
          {{ globals.contact.email }}
        </a>
        <a :href="`https://twitter.com/${globals.contact.twitter}`" target="_blank" class="dim black-50 mt1 f5 db b ttu lh-solid">
          {{ globals.contact.twitter }}
        </a>
      </footer>
    </header>
    <section class="min-vh-100-l w-100 w-80-l lh-copy bl b--black-10">
      <header class="bg-white b--black-10 bb fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav class="f4 fw6">
          <nuxt-link to="/" class="link dim black-70 dib mr3" title="Home">
            Home
          </nuxt-link>
          <nuxt-link to="/about" class="link dim black-70 dib mr3" title="About">
            About
          </nuxt-link>
          <nuxt-link to="/people" class="link dim black-70 dib mr3" title="People">
            People
          </nuxt-link>
          <nuxt-link to="/jobs" class="link dim black-70 dib mr3" title="Store">
            Jobs
          </nuxt-link>
          <nuxt-link to="/contact" class="link dim black-70 dib" title="Contact">
            Contact
          </nuxt-link>
        </nav>
      </header>
      <div class="pt5">
        <nuxt />
      </div>
    </section>
  </main>
</template>

<style>
:root {
  --background: #fff;
  --foreground: #000;
}

body {
  font-family: 'Work Sans', sans-serif;
  background: var(--background);
  color: var(--foreground);
}

a {
  text-decoration: none;
}

nav .nuxt-link-exact-active {
  opacity: 0.6;
}

.sticky {
  position:sticky;
}

@media screen and (min-width: 60em) {
  .sticky-l { position:sticky; }
}

/**
 * not found
 */

.notfound {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 8rem);
  width: 100vw;
}

/**
 * typography
 */

@font-face {
  font-family: 'Work Sans';
  src: url('/fonts/WorkSans-Regular.woff2') format('woff2'),
       url('/fonts/WorkSans-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('/fonts/WorkSans-Medium.woff2') format('woff2'),
    url('/fonts/WorkSans-Medium.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('/fonts/WorkSans-Light.woff2') format('woff2'),
    url('/fonts/WorkSans-Light.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('/fonts/WorkSans-Medium.woff2') format('woff2'),
    url('/fonts/WorkSans-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Work Sans';
  src: url('/fonts/WorkSans-Bold.woff2') format('woff2'),
    url('/fonts/WorkSans-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}
</style>
