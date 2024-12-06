<template>
  <div class="container">
    <h1 class="my-4">Overview</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Products</h5>
            <p class="card-text">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total Categories</h5>
            <p class="card-text">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Overview',
  computed: {
    ...mapGetters(['allProducts', 'allCategories']),
    totalProducts() {
      return this.allProducts.length;
    },
    totalCategories() {
      return this.allCategories.length;
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories']),
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>
