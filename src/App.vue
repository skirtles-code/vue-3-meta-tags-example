<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ShowMeta from './components/ShowMeta.vue'
</script>

<template>
  <header>
    <RouterLink :to="{ name: 'products' }">Products</RouterLink>
  </header>
  <hr>
  <RouterView />
  <hr>
  <ShowMeta />
  <a href="https://github.com/skirtles-code/vue-3-meta-tags-example" target="_blank" class="github-link" title="View GitHub repository">
    <img src="./assets/github-mark.svg">
  </a>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 5px;
}

header > * {
  border: 1px solid #777;
  margin: 0 10px;
  padding: 10px;
}

.router-link-active {
  background: #7f7;
}

.github-link {
  opacity: 0.8;
  position: fixed;
  right: 10px;
  top: 10px;
}

.github-link:hover {
  opacity: 1;
}

.github-link img {
  height: 24px;
}
</style>
