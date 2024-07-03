<template>
  <nav class="menu">
    <div>
      <router-link class="router-link" to="/">Men</router-link>
    </div>
    <div>
      <router-link class="router-link" to="/women">Women</router-link>
    </div>
    <div>
      <router-link class="router-link" to="/liked">Favorites ({{ itemsInLiked }})</router-link>
    </div>
    <div>
      <router-link class="router-link" to="/cart">Cart ({{ itemsInCart }})</router-link>
    </div>
    <div>
      <router-link class="router-link" to="/user">-</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShopNavbar",

  data() {
    return {
      showSubMenu: false
    };
  },
  methods: {
    toggleSubMenu() {
      this.showSubMenu = !this.showSubMenu;
    }
  },
  computed: {
    ...mapGetters(["itemsInCart", "itemsInLiked"]),
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: flex-end;
}

.submenu {
  display: flex;
  justify-content: center;
}

.menu > div {
  margin-right: 20px;
  margin-bottom: 20px;
}
.router-link {
  text-decoration: none;
  color: gray;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 10px;
}
.router-link:hover {
  color: #217d9c;
}
.router-link-exact-active {
  border: 1px solid #35a2c7;
  color: #35a2c7;
}
</style>
