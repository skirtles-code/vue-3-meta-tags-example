<script setup>
import { onMounted, ref } from 'vue'

const headText = ref('')

function update() {
  headText.value = Array.from(document.getElementsByTagName('meta'))
    .map(meta => meta.outerHTML)
    .join('\n')
}

onMounted(update)
setInterval(update, 500)
</script>

<template>
  <div class="show-meta">
    <strong>This page is part of an example showing how to add dynamic <code>&lt;meta&gt;</code> tags to a Vue/Vite application.</strong>
    <p>
      See <a href="https://vue-land.github.io/faq/dynamic-meta-tags.html">https://vue-land.github.io/faq/dynamic-meta-tags.html</a> for more details.
    </p>
    <hr>
    The <code>&lt;meta&gt;</code> tags for this page are:
    <pre>{{ headText }}</pre>
    The <code>description</code> and <code>og:</code> tags are included in the HTML returned by the server in production. They aren't updated by client-side navigation, you'll need to refresh the page to see the new tags.
  </div>
</template>

<style scoped>
.show-meta {
  background: #ffc;
  border-top: 1px solid #cc0;
  bottom: 0;
  box-shadow: 1px 1px 1px #000;
  left: 0;
  padding: 20px;
  position: fixed;
  right: 0;
}

pre {
  background: #eee;
  border: 3px double #000;
  overflow: auto;
  padding: 10px;
}
</style>
