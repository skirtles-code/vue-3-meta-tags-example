<script setup>
import { computed } from 'vue'
import { useProducts } from '../composables/useProducts'

const { loading, products } = useProducts()

const props = defineProps({
  productId: Number
})

const product = computed(() => {
  if (loading.value) {
    return null
  }

  return products.value.find(({ id }) => props.productId === id)
})
</script>

<template>
  <main>
    <p v-if="loading">
      Loading {{ productId }}...
    </p>
    <template v-else-if="product">
      <p>
        <strong>Product name:</strong> {{ product.name }}
      </p>
      <p>
        <strong>Description:</strong> {{ product.description }}
      </p>
    </template>
    <p v-else>
      Product not found: {{ productId }}
    </p>
  </main>
</template>
