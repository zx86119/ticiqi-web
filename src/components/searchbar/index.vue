<template>
<div class="searchwrap">
    <div class="searchbar" @click="navigatorTosearch">
        <img src="@/img/search.png" mode="widthFix" />
     </div>
</div>
</template>

<script>
export default {
  name: 'searchbar',
  props: {},
  data() {
    return {
      
    }
  },
  methods: {
    navigatorTosearch(){
      this.$router.push({
        path: '/search',
        query: {
          
        },
      })
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
