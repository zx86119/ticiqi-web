<template>
    <div class="gheader_container">
      <div class="title" v-if="title">
        <img src="@/img/menu.png" mode="widthFix" @click="showMenu"/>
        <div class="name">掌上教育</div>
        <div class="name"></div>
      </div>
      <div class="title" v-if="navi">
        <img src="@/img/back.png" mode="widthFix" @click="back"/>
        <div class="name">{{title1}}</div>
        <div class="name">{{title2}}</div>
      </div>
      <searchbar v-if="search"/>
      <div class="allscreen" @click="screenCancel" v-if="showLeftMenu">
      <div class="mengban"></div>
      <div class="leftFloat">
        <div style="margin-top:50px"></div>
        <div class="item" v-for="(item,index) in localList" :key="index" @click="onLeftButton(item.cityname,'',$event)">{{item.cityname}}
          <div class="county" v-for="(item1,index) in item.countys" :key="index" @click="onLeftButton(item.cityname,item1.countyName,$event)">{{item1.countyName}}</div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import searchbar from '@/components/searchbar/index.vue'
export default {
  name: 'gheader',
  props: {
    title:{
      type:Boolean,
      default:true
    },
    navi:{
      type:Boolean,
      default:true
    },
    search:{
      type:Boolean,
      default:true
    },
    title1:{
      type:String,
      default:'掌上教育'
    },
    title2:{
      type:String
    }
  },
  components: {
    searchbar
  },
  data() {
    return {
      showLeftMenu:false,
      localList:[]
    }
  },
  methods: {
    showMenu(){
      this.showLeftMenu=true
    },
    screenCancel(){
      this.showLeftMenu=false
    },
    onLeftButton(cityname,countyname,event){
      event.stopPropagation()
      this.$emit('localclick',{
        cityname:cityname,
        countyname:countyname
      })
      this.showLeftMenu=false
    },
    back(){
      this.$router.back()
    },
    _fetchLocalList() {
      var that=this
      let url = `/cockpit/get_areaNames`
      this.$http({
        url: url,
        method: 'get',
        showLoading: true,
      }).then((res) => {
        console.log(res)
        let data = JSON.parse(JSON.stringify(res.data))
        that.localList=data
      })
    }
  },
  mounted() {
    var _self=this
    _self.$nextTick(() => {
       _self._fetchLocalList()
    })
   
  },
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
