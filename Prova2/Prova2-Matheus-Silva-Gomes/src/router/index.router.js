import { createRouter, createWebHistory } from 'vue-router';

// Utilizando lazy loading para carregar os componentes sob demanda
const Products = () => import('../components/Products.vue');
const Overview = () => import('../components/Overview.vue');
const CartDetails = () => import('../components/CartDetails.vue');
const Carts = () => import('../components/Carts.vue');

const routes = [
  // Página inicial (Visão geral)
  { path: '/', component: Overview, name: 'overview' },

  // Página de produtos
  { path: '/products', component: Products, name: 'products' },

  // Página de detalhes de um carrinho específico
  { path: '/cart/:id', component: CartDetails, name: 'cartDetails' },

  // Página dos carrinhos
  { path: '/carts', component: Carts, name: 'carts' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;