<template>
  <div>
    <h3 class="title">장바구니</h3>
    <div v-show="!products.length">
      <p>장바구니에 추가된 상품이 없습니다!</p>
      <router-link to="/">쇼핑 계속하기</router-link>
    </div>

    <div v-show="products.length">
      <div class="cart_list">
        <div v-for="p in products" :key="p.id">
          <div class="cart_item">
            <span>{{ p.name }}</span>
            <span>수량 : {{ p.quantity }}</span>
            <span
              >{{
                new Intl.NumberFormat("ko-KR").format(
                  Number(p.price.replace(/,/g, "")) * p.quantity
                )
              }}
              원</span
            >
            <div>
              <button
                type="button"
                class="button item_button cart_button"
                @click="addToCart(p)"
              >
                +
              </button>
              <button
                type="button"
                class="button item_button remove_button"
                @click="removeFromCart(p)"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
      </div>
      <span class="total">총 가격 : {{ total }} 원</span>
    </div>

    <button v-show="products.length" @click="showModal" class="checkout">
      결제하기
    </button>

    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p class="modal-text">결제할 사용자의 이름을 입력하세요:</p>
        <input
          type="text"
          v-model="inputName"
          @keyup.enter="confirmCheckout"
          class="modal-input"
        />
        <button @click="confirmCheckout" class="modal-button">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "ShopCart",

  data() {
    return {
      isModalVisible: false,
      inputName: "",
    };
  },

  computed: {
    ...mapGetters({
      products: "cartProducts",
      total: "total",
    }),
    ...mapState(["people", "selectedPerson"]),
  },

  methods: {
    ...mapMutations([
      "addToCart",
      "removeFromCart",
      "SelectedPerson",
      "clearCart",
      "addUserToUserlist",
    ]),

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      this.inputName = "";
    },

    async confirmCheckout() {
      if (!this.inputName) {
        alert("사용자 이름을 입력하세요.");
        return;
      }

      this.$store.commit("SelectedPerson", { name: this.inputName });

      if (
        confirm(
          `${this.inputName}님이 결제하실 금액은 총 ${this.total} 원 입니다.\nPOS기기에서 결제해주세요.`
        )
      ) {
        try {
          // total 값을 숫자로 변환
          const numericTotal = Number(this.total.replace(/,/g, ""));

          await axios.post("http://localhost:8080/api/shop/user", {
            username: this.inputName, // 필드 이름을 백엔드와 일치하게 수정
            price: numericTotal, // 쉼표 제거된 숫자 값으로 수정
          });

          this.$store.commit("clearCart");
          this.closeModal();
        } catch (error) {
          console.error("Error during checkout:", error);
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      }
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  font-size: 30px;
}

.cart_list {
  margin-bottom: 20px;
}
.cart_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid gray;
}
.cart_item > span {
  width: 300px;
}
.button {
  background: #fff;
  border: 1px solid #35a2c7;
  border-radius: 4px;
}
.button:hover {
  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.item_button {
  margin-right: 10px;
}
.cart_button,
.remove_button {
  width: 30px;
  height: 30px;
}
.checkout {
  margin-top: 30px;
  padding: 10px;
  border-radius: 4px;

  background: #35a2c7;
  color: #fff;
  border: none;
  cursor: pointer;
}
.total {
  font-weight: bold;
}

/* 모달 스타일 */
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  text-align: center;
}

.modal-input {
  display: block;
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-button {
  display: block;
  width: 25%;
  margin: 10px auto;
  padding: 10px;
  background-color: #797979;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #3c3c3c;
}

.modal-text {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
