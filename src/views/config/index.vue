<template>
  
  <div class="home_c">
    设置页面
    <div :style="divObj" ref="tici" @click="playState($event)" v-show="show">
      <div class="dingwei">
        <button @click.stop="endPlay()">返回</button>
        <label for="loop">
          循环播放<input id="loop" class="switch-component" type="checkbox" v-model="loop">
        </label>
        <label for="mirror">
          镜像<input id="mirror" class="switch-component" type="checkbox" v-model="mirror" @click="mirrorImage(mirror)">
        </label>
        <br>
        速度<input type="range" min="1" max="10" step="1" v-model.number="playSpeed"/>
        字体大小<input type="range" min="10" max="100" step="1" v-model="size" @change="changeSize(size)"/>
        <br>
        字体颜色
        <input type="radio" name="fontcolor" value="#ffffff" v-model="pObj.color"> 白色
        <input type="radio" name="fontcolor" value="#808080" v-model="pObj.color"> 灰色
        <input type="radio" name="fontcolor" value="#FFA500" v-model="pObj.color"> 橙色
        <input type="radio" name="fontcolor" value="#FF0000" v-model="pObj.color"> 红色
        <input type="radio" name="fontcolor" value="#0000FF" v-model="pObj.color"> 蓝色
        <input type="radio" name="fontcolor" value="#008000" v-model="pObj.color"> 绿色
        <input type="radio" name="fontcolor" value="#000000" v-model="pObj.color"> 黑色
        <br>
        背景颜色
        <input type="radio" name="backgroundcolor" value="#ffffff" v-model="divObj.background"> 白色
        <input type="radio" name="backgroundcolor" value="#000000" v-model="divObj.background"> 黑色
      </div>
      <p :style="pObj">
        {{text}}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Config',
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
