<script setup>
import { RouterLink } from 'vue-router'
import { useProducts } from '../composables/useProducts'

const { loading, products } = useProducts()
</script>

<template>
  <main>
    <p v-if="loading">
      Loading...
    </p>
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <RouterLink :to="{ name: 'product', params: { productId: product.id } }">{{ product.name }}</RouterLink>
        - {{ product.description }}
      </li>
    </ul>
  </main>
</template>
