<template>
  <div class="bg-moon-gray pa3 ph5-l">
    <h2>
      {{ title }}
    </h2>
  </div>
</template>

<style>

</style>

<script>
export default {
  async asyncData ({ route }) {
    const page = await require(`~/assets/content/pages/${route.name}.json`)
    return page
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
