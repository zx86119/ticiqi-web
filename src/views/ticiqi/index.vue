<template>
  
  <div class="home_c">
    题词页面
  </div>
</template>

<script>

export default {
  name: 'Ticiqi',
  components: {
    
  },
  data() {
    return {
      datas:[]
    }
  },
  created() {
    const _self = this
    _self.$nextTick(() => {
      
    })
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    _fetchData() {
      var that=this
      let url = `/cockpit/get_index`
      this.$http({
        url: url,
        method: 'get',
        showLoading: true,
      }).then((res) => {
        console.log(res)
        let data = JSON.parse(JSON.stringify(res.data.data))
        that.datas=data
      })
    },
    
  },
}
</script>

<style lang="less" scoped>

</style>
