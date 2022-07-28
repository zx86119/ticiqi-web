<template>
  <div id="app">
      <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <tarbar/> -->
  </div>
</template>

<script>
import { getUuid } from '@/utils/getUuid' // 获取uuid
import tarbar from '@/components/tarbar/tarbar.vue'
export default {
  name: 'App',
  components: {
    // tarbar
  },
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + getUuid() : this.$route + getUuid()
    },
  },
  created() {
  },
  methods: {},
  mounted() {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}
</style>
