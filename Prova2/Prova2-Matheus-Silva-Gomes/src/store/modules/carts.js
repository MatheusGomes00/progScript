import axios from 'axios';
import { isSameDay, isWithinRange } from '../../utils/dateUtils';

const state = {
  carts: [], // Armazena todos os carrinhos
  cartDetails: {}, // Armazena detalhes de um carrinho específico
  cartItems: [], // Novo estado para armazenar os itens no carrinho do usuário
};

const getters = {
  allCarts: (state) => state.carts,
  cartDetails: (state) => state.cartDetails,
  cartItems: (state) => state.cartItems, // Getter para os itens do carrinho
  cartCount: (state) => state.cartItems.reduce((count, item) => count + item.quantity, 0), // Conta a quantidade total de itens no carrinho
  filteredCarts: (state) => (filter) => {
    return state.carts.filter((cart) => {
      const dateMatch = !filter.date || isSameDay(cart.date, filter.date);
      const dateRangeMatch =
        !filter.startDate || !filter.endDate || isWithinRange(cart.date, filter.startDate, filter.endDate);
      const userMatch = !filter.userId || cart.userId === filter.userId;
      return (dateMatch || dateRangeMatch) && userMatch;
    });
  },
};

const actions = {
  async fetchCarts({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/carts');
    commit('setCarts', response.data);
  },
  async fetchCartDetails({ commit }, id) {
    const response = await axios.get(`https://fakestoreapi.com/carts/${id}`); // Corrigido uso de template literals
    commit('setCartDetails', response.data);
  },
  addToCart({ commit }, product) {
    // Adiciona o produto ao carrinho no estado local
    commit('addItemToCart', product);
  },
  async addItemToCartAPI({ commit }, { cartId, item }) {
    const response = await axios.post(`https://fakestoreapi.com/carts/${cartId}`, item); // Corrigido uso de template literals
    commit('updateCart', response.data);
  },
  async updateCartItem({ commit }, { cartId, itemId, item }) {
    const response = await axios.put(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`, item); // Corrigido uso de template literals
    commit('updateCart', response.data);
  },
  async removeItemFromCart({ commit }, { cartId, itemId }) {
    await axios.delete(`https://fakestoreapi.com/carts/${cartId}/items/${itemId}`); // Corrigido uso de template literals
    commit('removeItem', { cartId, itemId });
  },
};

const mutations = {
  setCarts: (state, carts) => (state.carts = carts),
  setCartDetails: (state, cart) => (state.cartDetails = cart),
  updateCart: (state, updatedCart) => {
    const index = state.carts.findIndex((cart) => cart.id === updatedCart.id);
    if (index !== -1) {
      state.carts.splice(index, 1, updatedCart);
    }
  },
  removeItem: (state, { cartId, itemId }) => {
    const cart = state.carts.find((cart) => cart.id === cartId);
    if (cart) {
      cart.items = cart.items.filter((item) => item.id !== itemId);
    }
  },
  // Mutação para adicionar um item ao carrinho no estado
  addItemToCart: (state, product) => {
    const existingProduct = state.cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Se o produto já existe, aumente a quantidade
    } else {
      state.cartItems.push({ ...product, quantity: 1 }); // Caso contrário, adicione o produto ao carrinho
    }
  },
  // Mutação para remover um item do carrinho
  removeItemFromCart: (state, productId) => {
    state.cartItems = state.cartItems.filter((item) => item.id !== productId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
