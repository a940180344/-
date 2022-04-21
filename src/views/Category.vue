<template>
  <div class="category-box">
    <img :src="this.$store.state.tiao" alt="" >
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      img:[]
    }
  },
  computed:{
    img:function(){
      this.img = this.$store.suijiimg
    }
  }
}
</script>

<style lang="less" scoped>
  .category-box {
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 360px;
    }
  }
</style>