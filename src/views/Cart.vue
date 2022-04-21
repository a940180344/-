<template>
  <div class="cart-box">
    <s-header :title="'收藏夹'"></s-header>
    <div class="cart-body">
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
      >
        <van-swipe-cell
          :right-width="50"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="good-item">
            <van-button
              slot="right"
              square
              icon="cross"
              type="default"
              class="shouchangbutton"
              color="red"
              @click="changshou(item)"
            ></van-button>
            <div class="good-img"><img :src="item.urls.small" alt="" /></div>
            <div class="good-desc">
              <div class="product-info" @click="tiaozhuan(item.links.html)">
                <h3>《{{ item.alt_description }}》</h3>
                <div>
                  <p class="name">喜欢数：{{ item.likes }}</p>
                </div>
              </div>
            </div>
          </div>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <div class="empty" v-if="!list.length">
      <van-icon name="smile-o" />
      <div class="title">收藏夹空空空如也</div>
      <van-button color="#1baeae" type="primary" to="/home"
        >前往首页</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
export default {
  name: "Cart",
  components: {
    sHeader,
  },
  data() {
    return {
      list: [],
      result: [],
      checkAll: true,
      arr: [],
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    total: function () {
      let sum = 0;
      let _list = this.list.filter((item) =>
        this.result.includes(item.cartItemId)
      );
      _list.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    },
  },
  methods: {
    init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const data = this.$store.state.shouchangimg;
      this.list = data;
      Toast.clear();

      let that = this;
      let i = 0;
    },
    changshou(item) {
      this.$store.commit("shouchangimg", item);
      Toast.fail('已删除')
    },
    async onChange(value, detail) {
      if (
        this.list.filter((item) => item.cartItemId == detail.name)[0]
          .goodsCount == value
      )
        return;
      Toast.loading({ message: "修改中...", forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value,
      };
      const { data } = await modifyCart(params);
      this.list.forEach((item) => {
        if (item.cartItemId == detail.name) {
          item.goodsCount = value;
        }
      });
      Toast.clear();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
}
</style>

<style lang="less">
@import "../common/style/mixin";
.van-checkbox__icon--checked .van-icon {
  background-color: @primary;
  border-color: @primary;
}
</style>