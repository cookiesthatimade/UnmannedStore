<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <div class="product-info">
        <div class="product-image">
          <img :src="selectedProduct.src" alt="상품 이미지" />
        </div>
        <div class="product-details">
          <p class="product-name">상품명 : {{ selectedProduct.name }}</p>
          <p>재고(수) : {{ selectedProduct.inven }}</p>
          <p>위치 : {{ selectedProduct.loc }}</p>
        </div>
      </div>
      <span class="close" @click="closeModal">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    selectedProduct: Object
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  display: flex;
  justify-content: space-between; 
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image img {
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #000000;
}


.product-details {
  margin-left: 20px;
  font-size: 18px; 

}

.product-details .product-name {
  font-size: 20px; 
  font-weight: bold;
}

.close {
  font-size: 20px;
  cursor: pointer;
}
</style>
