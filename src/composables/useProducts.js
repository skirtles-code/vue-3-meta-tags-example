import { ref } from 'vue'

const BASE_URL = import.meta.env.BASE_URL

export function useProducts() {
  const products = ref()
  const loading = ref(true)

  // Load data from the 'database'
  fetch(BASE_URL + 'products.json').then(async resp => {
    products.value = await resp.json()
    loading.value = false
  })

  return {
    loading,
    products
  }
}
