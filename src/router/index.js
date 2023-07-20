import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/product/:productId',
      name: 'product',
      props: route => ({ productId: +route.params.productId }),
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/:dummy(.*)*',
      component: {
        setup() {
          return () => '404 - Page not found'
        }
      }
    }
  ]
})

export default router
