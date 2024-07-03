<template>
  <div class="user-container">
    <div class="user-list">
      <h2>결제자 리스트</h2>
      <ul v-if="users.length > 0">
        <li v-for="(user, index) in users" :key="index">
          <div class="person-info">
            <span>{{ user.username }} - {{ formatPrice(user.price) }} 원</span>
            <div class="button-group">
              <button @click="confirmCheckout(user)" class="checkout-button">
                결제하기
              </button>
              <button @click="removePerson(index)" class="delete-button">
                삭제하기
              </button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>결제할 사용자가 없습니다.</p>
      <button
        v-if="users.length === 0"
        @click="refreshPage"
        class="shopping-button"
      >
        새로고침
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  name: "ShopUser",
  data() {
    return {
      users: [],
      error: false,
      IMPReady: false,
    };
  },

  created() {
    this.fetchUsers();
    this.loadIMP();
  },

  methods: {
    ...mapMutations(["SelectedPerson", "removeUserFromUserlist"]),

    async fetchUsers() {
      try {
        const response = await axios.get(
          "http://192.168.35.11:8080/api/shop/user"
        );
        console.log("Fetched users:", response.data);
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        this.error = true;
      }
    },

    loadIMP() {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
      script.onload = () => {
        this.IMPReady = true;
      };
      document.head.appendChild(script);
    },

    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 천 단위 쉼표 포함 문자열로 변환
    },

    confirmCheckout(user) {
      if (!this.IMPReady) {
        alert(
          "결제 모듈을 아직 로드하지 못했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }

      const IMP = window.IMP;
      IMP.init("imp38377537"); // 아임포트 가맹점 식별코드로 초기화

      // 숫자 가격을 문자열로 변환
      const priceString = user.price.toString();

      const paymentData = {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: `${user.username} 님의 결제`,
        amount: parseInt(priceString.replace(/,/g, ""), 10),
        buyer_name: user.username,
        buyer_tel: "010-1234-5678",
        buyer_email: "example@example.com",
      };

      IMP.request_pay(paymentData, async (rsp) => {
        if (rsp.success) {
          // 결제 성공 시 서버에 삭제 요청 보내기
          try {
            await axios.delete(
              `http://localhost:8080/api/shop/user/${user.id}`
            );
            this.removeUserFromUserlist(user);
            this.users = this.users.filter((u) => u.id !== user.id);
            alert(`${user.username}님의 결제가 성공적으로 완료되었습니다.`);
          } catch (error) {
            console.error("Error removing user after payment:", error);
            alert("결제 성공 후 사용자 삭제 중 오류가 발생했습니다.");
          }
        } else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}.`);
        }
      });
    },

    async removePerson(index) {
      const userToRemove = this.users[index];
      if (confirm(`${userToRemove.username} 님을(를) 삭제하시겠습니까?`)) {
        try {
          await axios.delete(
            `http://localhost:8080/api/shop/user/${userToRemove.id}`
          );
          this.removeUserFromUserlist(userToRemove);
          this.users.splice(index, 1);
        } catch (error) {
          console.error("Error removing user:", error);
          alert("사용자 삭제 중 오류가 발생했습니다.");
        }
      }
    },

    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.user-list {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h2 {
  font-size: 36px;
}

ul {
  padding: 0;
}

li {
  font-size: 20px;
  list-style: none;
}

.person-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.person-text {
  flex-grow: 1;
}

.button-group {
  display: flex;
  align-items: center;
}
.checkout-button {
  padding: 10px 10px;
  margin-left: 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.shopping-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
}

.delete-button {
  padding: 10px 10px;
  background-color: #7a7a7a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
