const computedBehavior = require('miniprogram-computed')
Component({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    selectAllStatus: true    // 全选状态，默认全选

  },
  behaviors: [computedBehavior],
  computed: {
    selectAllStatus(data) {
      let { carts } = data;
      let flag = true;
      for (let i = 0; i < carts.length; i++) {
        if (!carts[i].selected) {
          flag = false;
          break;
        }
      };
      return flag;
    },
    totalPrice(data) {
      let { carts } = data;
      let total = 0;
      for (let i = 0; i < carts.length; i++) {
        if (carts[i].selected) {
          total += carts[i].num * carts[i].price;
        }
      }
      return total;

    }
  },
  methods: {
    onShow() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      let movieStore = wx.getStorageSync('movie');
      let cartsObj = movieStore.length > 0 ? JSON.parse(movieStore) : [];
      if (cartsObj.length === 0) return;
      this.setData({
        hasList: true,
        carts: cartsObj.carts
      });
    },
    /**
     * 当前商品选中事件
     */
    selectList(e) {
      const index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      const selected = carts[index].selected;
      carts[index].selected = !selected;
      this.setData({
        carts: carts
      });
    },

    /**
     * 删除购物车当前商品
     */
    deleteList(e) {
      const index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      carts.splice(index, 1);
      this.setData({
        carts: carts
      });
      if (!carts.length) {
        this.setData({
          hasList: false
        });
      }
    },

    /**
     * 购物车全选事件
     */
    selectAll(e) {
      let selectAllStatus = this.data.selectAllStatus;
      selectAllStatus = !selectAllStatus;
      let carts = this.data.carts;

      for (let i = 0; i < carts.length; i++) {
        carts[i].selected = selectAllStatus;
      }
      this.setData({
        carts: carts
      });
    },

    /**
     * 绑定加数量事件
     */
    addCount(e) {
      const index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      let num = carts[index].num;
      num = num + 1;
      carts[index].num = num;
      this.setData({
        carts: carts
      });
    },

    /**
     * 绑定减数量事件
     */
    minusCount(e) {
      const index = e.currentTarget.dataset.index;
      let carts = this.data.carts;
      let num = carts[index].num;
      if (num <= 1) {
        return false;
      }
      num = num - 1;
      carts[index].num = num;
      this.setData({
        carts: carts
      });
    },
  }
})