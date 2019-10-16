<script>
export default {
  computed: {
    content () {
      return this.$store.state.content
    }
  }
}
</script>

<template>
  <main class="relative flex flex-wrap">
    <nav class="bb bn-l b--black-10 w-20-l w-100 vh-100-l pa3 pa4-l pl3-l top-0 sticky-l">
      <div class="flex flex-column-l justify-between mw-100">
        <a href="/" class="dim flex-none-l items-center mw-100 mw5">
          <img :src="content.logo" :title="content.title" class=" mw-100-l mw5">
        </a>
        <h3 class="f5 f4-ns fw4 bt b--gray pv3-l pv2 mw5 dn db-l">
          {{ content.subtitle }}
        </h3>
      </div>

      <footer class="absolute bottom-0 mb4 black-70 dn db-l">
        <a :href="`mailto:${content.contact.email}`" class="link fw6 f4 dim black-70 lh-solid">
          {{ content.contact.email }}
        </a>
        <a :href="`https://twitter.com/${content.contact.twitter}`" target="_blank" class="dim black-50 mt1 f5 db b ttu lh-solid">
          {{ content.contact.twitter }}
        </a>
      </footer>
    </nav>
    <div class="min-vh-100-l w-100 w-80-l lh-copy bl b--black-10">
      <nuxt />
    </div>
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
