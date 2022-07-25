<template>
<div class="board">
    <div class="header">
    <div class="label">
      <img :src="showMain1?require('@/img/shouqi.png'):require('@/img/zhankai.png')" mode="widthFix" @click="zhedie" v-if="showZhedie"/>
    </div>
    <div :class="showMain1?'tag show':'tag '">{{title}}</div>
    </div>
    <div class="main" v-if="showMain1">
        <!-- <div class="wrap" v-if="datas.title=='教育局局长'">
          <div class="name">{{datas.name}}</div>
        </div> -->
        <div class="wrap" v-for="(item,index) in datas" :key="index">
          <div class="total">
          <div>{{item.title}}</div>
          </div>
          <div class="line">
            <div class="item" v-for="(item,index) in item.data" :key="index">
              <div class="num">{{item.value}}</div>
              <div class="desc" :style="item.name.length>=10?'font-size:50%':''">{{item.name}}</div>
            </div>
          </div>
          <!-- <div class="line">
            <div class="item">
              <div class="num">{{datas.num1[3]}}</div>
              <div class="desc">普惠性幼儿园<br>数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num1[4]}}</div>
              <div class="desc">示范幼儿园<br>数量</div>
            </div>
          </div>
          <div class="total">
          <div>小学学校数量</div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[1]}}</div>
              <div class="desc">在校生数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[2]}}</div>
              <div class="desc">教职工数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[3]}}</div>
              <div class="desc" style="font-size:40%">专任教师<br>高等学校专科<br>及以上学历人数</div>
            </div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[4]}}</div>
              <div class="desc">总体师生比</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[5]}}</div>
              <div class="desc">高级职称人数</div>
            </div>
          </div>
          
          <div class="total">
          <div>初中学校数量</div>
          <div class="num">{{datas.num2[0]}}</div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[1]}}</div>
              <div class="desc">在校生数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[2]}}</div>
              <div class="desc">教职工数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[3]}}</div>
              <div class="desc" style="font-size:40%">专任教师<br>高等学校专科<br>及以上学历人数</div>
            </div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[4]}}</div>
              <div class="desc">总体师生比</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[5]}}</div>
              <div class="desc">高级职称人数</div>
            </div>
          </div>

          <div class="total">
          <div>高中学校数量</div>
          <div class="num">{{datas.num2[0]}}</div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[1]}}</div>
              <div class="desc">在校生数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[2]}}</div>
              <div class="desc">教职工数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[3]}}</div>
              <div class="desc" style="font-size:40%">专任教师<br>高等学校专科<br>及以上学历人数</div>
            </div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num2[4]}}</div>
              <div class="desc">总体师生比</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num2[5]}}</div>
              <div class="desc">高级职称人数</div>
            </div>
          </div>
        
        </div>
        <div class="wrap" v-else-if="num==1">
          <div class="total">
          <div>中职学校数量</div>
          <div class="num">{{datas.num1[0]}}</div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num1[1]}}</div>
              <div class="desc">学生数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num1[2]}}</div>
              <div class="desc">教职工数量</div>
            </div>
          </div>
          <div class="total">
          <div>高职学校数量</div>
          <div class="num">{{datas.num1[0]}}</div>
          </div>
          <div class="line">
            <div class="item">
              <div class="num">{{datas.num1[1]}}</div>
              <div class="desc">学生数量</div>
            </div>
            <div class="item">
              <div class="num">{{datas.num1[2]}}</div>
              <div class="desc">教职工数量</div>
            </div>
          </div>
        
        </div>
        <div class="wrap" v-else-if="num==2">
          <div class="total">
          <div>学校数量</div>
          <div class="num">{{datas.num1[0]}}</div>
          </div>
          <div class="total">
          <div>学生数量</div>
          <div class="num">{{datas.num1[0]}}</div>
          </div>
          <div class="total">
          <div>教职工数量</div>
          <div class="num">{{datas.num1[0]}}</div>
          </div>
        </div> -->
        <!-- <div class="wrap" v-else-if="num==3">
          <div class="line">
            <div class="item">
              <div class="num">¥12.36万</div>
              <div class="desc">资金支出</div>
            </div>
            <div class="item">
              <div class="num">¥11.36万</div>
              <div class="desc">资金到位</div>
            </div>
          </div>
          <div class="line">
            <div class="item">
              <div class="desc" style="color:black;font-size:100%;margin-top:0px">资金执行率</div>
              <div class="num" style="color:#5756D7;font-size:150%;margin-top:20px">15%</div>
            </div>
            <div class="item">
              <div class="desc" style="color:black;font-size:100%;margin-top:0px">资金到位率</div>
              <div class="num" style="color:#5756D7;font-size:150%;margin-top:20px">80%</div>
            </div>
          </div>
        </div> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'board',
  props: {
    showZhedie:{
      type:Boolean,
      default:true
    },
    showMain:{
      type:Boolean,
      default:true
    },
    datas:{
      type:Array
    },
    title:{
      type:String
    },
    num:{
      type:Number
    }
  },
  data() {
    return {
      showMain1:true
    }
  },
  watch:{
    
  },
  methods: {
    zhedie(){
      this.showMain1=!this.showMain1
    },
  },
  activated(){
    this.showMain1=this.showMain
  },
  mounted() {
    
  },
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
