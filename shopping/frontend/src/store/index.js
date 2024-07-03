import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
  products: [],
  products2: [],
  products3: [],

  images: [
    101, 102, 103, 104, 105, 106,
    107, 108, 109, 1010, 1011, 1012,
    1013, 1014, 1015, 1016, 1017, 1018,
    1019, 1020,
  ],
  images2: [
    201, 202, 203, 204, 205, 206,
    207, 208, 209, 2010, 2011, 2012,
    2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021,
  ],
  people: [],
  selectedPerson: null,
  
};

const getters = {
  total(state, getters) {
    return getters.cartProducts.reduce((total, p) => {
      return total + Number(p.price.replace(/,/g, "")) * p.quantity;
    }, 0).toLocaleString(); 
  },
  cartProducts: (state) => {
    const uniqueProducts = {};
    [...state.products, ...state.products2, ...state.products3].forEach(product => {
      const key = `${product.name}_${product.price}`;
      if (!uniqueProducts[key]) {
        uniqueProducts[key] = { ...product }; 
      } else {
        uniqueProducts[key].quantity += product.quantity; 
      }
    });
    return Object.values(uniqueProducts).filter((p) => p.quantity !== 0);
  },
  likedProducts: (state) => {
    const uniqueLikedProducts = {};
    [...state.products, ...state.products2, ...state.products3].forEach(product => {
      const key = `${product.name}_${product.price}`;
      if (!uniqueLikedProducts[key] && product.liked === "yes") {
        uniqueLikedProducts[key] = { ...product }; 
      }
    });
    return Object.values(uniqueLikedProducts);
  },
  itemsInCart: (state, getters) => {
    return getters.cartProducts.reduce(
      (accum, item) => accum + item.quantity,
      0
    );
  },
  itemsInLiked(state, getters) {
    return getters.likedProducts.length;
  },
};



const actions = {
  
  getProducts({ commit }) {
    
    const products = [
      { id: 1, name: "스티치 생지 데님 와이드팬츠 사계절 루즈핏 일자 흑청 진청 중청 청", price: 100, inven: 3, loc: "A3"},
      { id: 2, name: "엠보 반집업 카라 반팔 (3 color)", price: 29800, inven: 3, loc: "A2" },
      { id: 3, name: "남녀공용 스마일 프린팅 여름 쿨 오버핏 반팔티", price: 28800, inven: 3, loc: "A2" },
      { id: 4, name: "레터링 오버핏 반팔티셔츠 모음 6종", price: 18900, inven: 3, loc: "A2" },
      { id: 5, name: "순면 기본 무지 이너 반팔 레이어드 라운드 u넥 흰색 흰티 어깨 넓고 비침없는 오버핏 코디만능 특양면 두툼한 레이어드 여름 반팔티", price: 8900, inven: 3, loc: "A2" },
      { id: 6, name: "1+1 버뮤다팬츠 핀턱반바지 회색트레이닝바지 남자빅사이즈반바지", price: 38800, inven: 3, loc: "A3" },
      { id: 7, name: "가성비 끝판왕 9부10부 구김없는 링클프리 스판 히든 밴딩 슬랙스", price: 26800, inven: 3, loc: "A3" },
      { id: 8, name: "Y2k 카고 와이드 스트링 조거 루즈핏 트레이닝 팬츠 스트릿 벌룬핏 (3COLOR / S~3XL)", price: 18900, inven: 3, loc: "A3" },
      { id: 9, name: "제이 머슬핏 니플 안도드라지는 분또 스포츠 반팔 티셔츠_(12 colors)", price: 19300, inven: 3, loc: "A2" },
      { id: 10, name: "핀턱 트레이닝 버뮤다 하프 팬츠 반바지 카고 합포 VER.추가 (4 color)", price: 22200, inven: 3, loc: "A3" },
      { id: 11, name: "핀턱 와이드 팬츠 (L-XL) 벌룬 원턱 트레이닝 스웻 스웨트 츄리닝 추리닝 통큰 회색 바지 면", price: 29800, inven: 3, loc: "A3" },
      { id: 12, name: "샌드 워싱 와이드 데님 팬츠 2color 진청 중청 흑청 통넓은 통 청바지", price: 39800, inven: 3, loc: "A3" },
      { id: 13, name: "크롭 스웨이드 자켓 블루종 트러커 아우터", price: 39800, inven: 3, loc: "A1" },
      { id: 14, name: "나일론 후드 바람막이 Y2K 아노락 프린팅", price: 34900, inven: 3, loc: "A1" },
      { id: 15, name: "스트릿 윈드브레이커 스트링 후드 바람막이 자켓 점퍼 코디 오버핏 나일론 봄자켓", price: 21900, inven: 3, loc: "A1" },
      { id: 16, name: "남자 여름 머슬핏 케이블 꽈배기 라운드 니트 반팔티셔츠 5Color", price: 39400, inven: 3, loc: "A2" },
      { id: 17, name: "데일리 벌룬 밴딩 오버핏 데님 집업 루즈핏 하이넥 카라 생지 청자켓 흑청 연청", price: 43900, inven: 3, loc: "A3" },
      { id: 18, name: "+5cm 기장선택 데일리 세미와이드 데님팬츠_(5color)", price: 29500, inven: 3, loc: "A3" },
      { id: 19, name: "[2타입]와커 남자 링클프리 와이드 핀턱 슬랙스 바지", price: 19800, inven: 3, loc: "A3" },
      { id: 20, name: "목안늘어나는 어깨넓어보이는 두꺼운 분또 레이어드 10수 반팔 티셔츠 봄 여름 가을 겨울 오버핏 무지 흰색 면 흰티", price: 18900, inven: 3, loc: "A2" },
    ];

    const productsWithFormattedPrice = products.map(product => ({
      ...product,
      price: product.price.toLocaleString(),
    }));

    commit("allProducts", productsWithFormattedPrice);


    const products2 = [
      { id: 21, name: "하체 보정효과! 트레이닝 핀턱 와이드 롱 밴딩팬츠[P]", price: 24900, inven: 3, loc: "B3" },
      { id: 22, name: "슬림 일자 밴딩 데님 팬츠(4color)[P]", price: 24900, inven: 4, loc: "B3" },
      { id: 23, name: "구김없는 여리핏 찰랑셔츠[P]", price: 19900, inven: 2, loc: "B2" },
      { id: 24, name: "(4컬러) 로즈 리본 반팔 여름 티셔츠(T)", price: 14900, inven: 2, loc: "B2" },
      { id: 25, name: "일자핏 밴딩 데님 팬츠 (4color)[P]", price: 26900, inven: 3, loc: "B3" },
      { id: 26, name: "핏예쁨! 찰랑찰랑 골지 밴딩 팬츠[P]", price: 14900, inven: 3, loc: "B3" },
      { id: 27, name: "군살커버!! 투핀턱 카고 스트링 조거 와이드 팬츠[P]", price: 22900, inven: 3, loc: "B3" },
      { id: 28, name: "캐주얼 레터링 오버핏 반팔티 반소매 티셔츠(T)", price: 17900, inven: 3, loc: "B2" },
      { id: 29, name: "[숏,미디,롱/11컬러] 핏보장! 컬러풀 트레이닝 밴딩 와이드 팬츠(TR)", price: 16900, inven: 3, loc: "B3" },
      { id: 30, name: "완전편한 차르르 투핀턱 하이웨스트 팬츠 와이드 슬랙스[P]", price: 26900, inven: 3, loc: "B3" },
      { id: 31, name: "리즐 레터링 반팔 티셔츠(T)", price: 9900, inven: 3, loc: "B2" },
      { id: 32, name: "컬러감에 반한♥ 베이직핏 반팔 셔츠(NB)", price: 19900, inven: 3, loc: "B2" },
      { id: 33, name: "와이드핏 밴딩 데님 팬츠 (5color)[P]", price: 25900, inven: 3, loc: "B3" },
      { id: 34, name: "겨드랑이 보정효과! 레이어드 나시(기본/크롭)[P]", price: 17900, inven: 3, loc: "B2" },
      { id: 35, name: "심쿵!여리 박시핏 꽈배기 가디건(G)", price: 22900, inven: 3, loc: "B1" },
      { id: 36, name: "잇츠쿨-5℃ 기장별 데님 반바지[P]", price: 22900,  inven: 3,loc: "B3" },
      { id: 37, name: "쿨 베이직 데님 반바지 숏팬츠(JE)", price: 27400, inven: 3, loc: "B3" },
      { id: 38, name: "기장별 와이드 찰랑 골지 팬츠(150/160/170)[P]", price: 19800, inven: 3, loc: "B3" },
      { id: 39, name: "(5컬러) 여리 카라넥 무지 셔츠 블라우스(BK)", price: 19900, inven: 3, loc: "B2" },
      { id: 40, name: "쿨반팔트레이닝세트(TR)", price: 19900, inven: 3, loc: "B1" },
    ];

    const productsWithFormattedPrice2 = products2.map(product => ({
      ...product,
      price: product.price.toLocaleString(),
    }));
    
    commit("allProducts2", productsWithFormattedPrice2);

  },

    
};

const mutations = {
    allProducts: (state, payload) => {
    payload.forEach((el, index) => {
      el.quantity = 0;
      const imageIndex = index % state.images.length;
      el.src = "images/" + state.images[imageIndex] + ".jpg";

      el.liked = "no";
    });
    state.products = payload;
    },

    allProducts2: (state, payload) => {
      payload.forEach((el, index) => {
        el.quantity = 0;
        const imageIndex = index % state.images2.length;
        el.src = "images/" + state.images2[imageIndex] + ".jpg";

        el.liked = "no";
      });
      state.products2 = payload;
    },


    addToCart: (state, product) => {
      const allProducts = [...state.products, ...state.products2];
      const item = allProducts.find((p) => p.id === product.id);
      if (item) {
          item.quantity++;
        }
    },

    removeFromCart: (state, product) => {
      const allProducts = [...state.products, ...state.products2];
      const item = allProducts.find((p) => p.id === product.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity <= 1) {
        item.quantity = 0; 
      }
    },

    addToLiked: (state, product) => {
      const item = [...state.products, ...state.products2].find((p) => p.id === product.id);
      if (item) {
        item.liked = "yes";
      }
    },
    removeFromLiked: (state, product) => {
      const item = [...state.products, ...state.products2].find((p) => p.id === product.id);
      item.liked = "no";
    },

    addToCart2: (state, product) => {
      const item = state.products2.find((p) => p.id === product.id);
      item.quantity++;
    },

    removeFromCart2: (state, product) => {
      const item = state.products2.find((p) => p.id === product.id);
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        item.quantity = 0;
      }
    },

    addToLiked2: (state, product) => {
    const item = state.products2.find((p) => p.id === product.id); 
    if (item) {
      item.liked = "yes";
      const imageIndex = state.products2.indexOf(item) % state.images2.length; 
      item.src = `images/${state.images2[imageIndex]}.jpg`; 
      }
    },
    removeFromLiked2: (state, product) => {
      const item = state.products2.find((p) => p.id === product.id);
      item.liked = "no";
    },

    SelectedPerson(state, person) {
      state.selectedPerson = person;
    },

    addUserToUserlist(state, user) {
      const newUser = {
        id: state.people.length + 1,
        name: user.name,
        total: user.total
      };
      state.people.push(newUser);
    },

    removeUserFromUserlist(state, user) {
      state.people = state.people.filter(person => person.name !== user.name);
    },

    clearCart(state) {
    state.products.forEach(product => {
      product.quantity = 0;
    });
    state.products2.forEach(product => {
      product.quantity = 0;
    });
    state.selectedPerson = null;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()]
});
