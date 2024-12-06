<template>
  <div class="container">
    <h1 class="my-4">Carts</h1>
    <div class="row mb-4">
      <div class="col-md-4">
        <input type="date" v-model="filter.date" class="form-control" placeholder="Filter by Date" />
      </div>
      <div class="col-md-4">
        <input type="number" v-model="filter.userId" class="form-control" placeholder="Filter by User ID" />
      </div>
      <div class="col-md-4">
        <button @click="applyFilter" class="btn btn-primary">Apply Filter</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="list-group">
          <li v-for="cart in filteredCarts" :key="cart.id" class="list-group-item">
            <router-link :to="'/cart/' + cart.id">
              Cart ID: {{ cart.id }} - User ID: {{ cart.userId }} - Date: {{ cart.date }}
            </router-link>
            <button
              @click="addProductToCart(cart.id)"
              class="btn btn-success btn-sm float-end ms-2"
            >
              Add Product
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Carts',
  data() {
    return {
      filter: {
        date: '',
        userId: ''
      }
    };
  },
  computed: {
    ...mapGetters(['filteredCarts']) // Assumindo que filteredCarts está corretamente implementado no Vuex
  },
  methods: {
    ...mapActions(['fetchCarts', 'addProductToCart']), // Certifique-se de que essas ações estão configuradas no Vuex
    applyFilter() {
      // Atualiza a lista de carrinhos com base nos filtros aplicados
      this.fetchCarts(this.filter);
    },
    addProductToCart(cartId) {
      // Exemplo de produto a ser adicionado
      const product = { id: 1, name: 'Sample Product', price: 10.99 };
      this.addProductToCart({ cartId, product });
    }
  },
  created() {
    // Carrega os carrinhos assim que o componente for montado
    this.fetchCarts();
  }
};
</script>

<style scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ms-2 {
  margin-left: 0.5rem;
}
</style>
