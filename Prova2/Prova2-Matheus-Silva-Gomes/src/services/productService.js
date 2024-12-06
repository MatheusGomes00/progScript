import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export default {
  // Obter todos os produtos
  getAllProducts() {
    return axios.get(API_URL);
  },

  // Obter produto por ID
  getProductById(id) {
    return axios.get(`${API_URL}/${id}`); // Corrigido uso de template literals
  },

  // Obter categorias de produtos
  getCategories() {
    return axios.get(`${API_URL}/categories`); // Corrigido uso de template literals
  },

  // Adicionar um novo produto
  addProduct(product) {
    return axios.post(API_URL, product);
  },

  // Atualizar produto existente
  updateProduct(product) {
    return axios.put(`${API_URL}/${product.id}`, product); // Corrigido uso de template literals
  },

  // Excluir produto
  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`); // Corrigido uso de template literals
  },
};
