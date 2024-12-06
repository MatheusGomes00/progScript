import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/carts';

// Função para obter todos os carrinhos
export const getCarts = () => axios.get(API_URL);

// Função para obter os detalhes de um carrinho específico
export const getCartDetails = (id) => axios.get(`${API_URL}/${id}`); // Corrigido uso de template literals

// Função para adicionar um item ao carrinho
export const addItemToCart = (cartId, item) =>
  axios.post(`${API_URL}/${cartId}`, item); // Corrigido uso de template literals

// Função para atualizar um item no carrinho
export const updateCartItem = (cartId, itemId, item) =>
  axios.put(`${API_URL}/${cartId}/items/${itemId}`, item); // Corrigido uso de template literals

// Função para remover um item do carrinho
export const removeItemFromCart = (cartId, itemId) =>
  axios.delete(`${API_URL}/${cartId}/items/${itemId}`); // Corrigido uso de template literals
