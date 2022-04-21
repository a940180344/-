import Vue from 'vue'
import Vuex from 'vuex'
import {reqHomefenlei} from '../utils/unsplash'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shouchangimg: [],
    tiao:"",
    suijiimg:[]
  },
  mutations: {
    shouchangimg(state, data) {
      if (state.shouchangimg.indexOf(data) >= 0) {
        state.shouchangimg.forEach(function (item, index, arr) {
          if (item == data) {
            arr.splice(index, 1);
          }
        });
      } else {
        state.shouchangimg.push(data);
      }

    },
    reimg(state, data){
      state.tiao = data.urls.thumb;
      console.log(data)
      state.suijiimg = data
    }
  },
  actions: {
    async getImg({commit},data){//get请求数据
      let result = await reqHomefenlei(data);
      console.log(result)
      commit('reimg' ,result);
  },
  },
  modules: {
  }
})
