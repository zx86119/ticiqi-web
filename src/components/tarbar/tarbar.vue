<template>
    <div class="bottom-tab">
      <div :class="item.selected ?'tab-item selected':'tab-item '" @click="switchTo(index)" v-for="(item,index) in tabBarArr" :key="index">
          <img :src="item.selected ? item.selectedImg : item.normalImg" alt="首页" v-if="item.showImg">
          <span>{{item.title}}</span>
      </div>
    <!-- <div :class="item[index].selected ?'selected':'tab-item'" @click="switchTo(index)" v-for="(item,index) in tabBarArr" :key="index">
          <img :src="item[index].selected ? item[index].selectedImg : item[index].normalImg" alt="首页" v-if="item[index].showImg">
          <span>item[index].title</span>
    </div> -->
    <!-- <div :class="'/home1' === $route.path?'selected':'tab-item'" @click="switchTo('/home1')" >
            <img :src="'/home1' === $route.path ? tabBarArr[0].selected : tabBarImgArr[0].normal" alt="首页" v-if="tabBarImgArr[0].show">
            <span>首页</span>
        </div>
    <div :class="'/home2' === $route.path?'selected':'tab-item'" @click="switchTo('/home2')">
            <img :src="'/home2' === $route.path ? tabBarArr[1].selected : tabBarImgArr[1].normal" alt="基教" v-if="tabBarImgArr[1].show">
            <span>基教</span>
        </div>
    <div :class="'/home3' === $route.path?'selected':'tab-item'" @click="switchTo('/home3')">
            <img :src="'/home3' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="职教" v-if="tabBarImgArr[2].show">
            <span>职教</span>
        </div>
    <div :class="'/home4' === $route.path?'selected':'tab-item'" @click="switchTo('/home4')">
            <img :src="'/home4' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="高教" v-if="tabBarImgArr[3].show">
            <span>高教</span>
        </div> -->
  </div>
</template>

<script>
export default {
  name: 'tarbar',
  props: {},
  data() {
    return {
      tabBarArr:[   //图片切换
        {normalImg: require('@/img/icon_home.png'), selectedImg: require('@/img/icon_home.png'),showImg:false,title:"首页",selected:true,path:"/home"},
        {normalImg: require('@/img/icon_home.png'), selectedImg: require('@/img/icon_home.png'),showImg:false,title:"题词",selected:false,path:"/ticiqi"},
        {normalImg: require('@/img/icon_home.png'), selectedImg: require('@/img/icon_home.png'),showImg:false,title:"配置",selected:false,path:"/config"},
        {normalImg: require('@/img/icon_home.png'), selectedImg: require('@/img/icon_home.png'),showImg:false,title:"支付",selected:false,path:"/pay"},
      ]
    }
  },
  methods: {
    switchTo(index){
      for(var i=0;i<this.tabBarArr.length;i++){
        if(index==i){
          this.tabBarArr[i].selected=true
        }
        else{
          this.tabBarArr[i].selected=false
        }
      }
      this.$router.replace(this.tabBarArr[index].path)
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
@import 'tarbar';
</style>
