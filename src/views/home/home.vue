<template>
  
  <div class="home_c">
    <div>
      <div class="dingwei" v-show="show">
        <button @click="set()">设置</button>
        <div v-show="show_2">
          <label for="loop">
            循环播放<input id="loop" class="switch-component" type="checkbox" v-model="loop">
          </label>
          <label for="mirror">
            镜像<input id="mirror" class="switch-component" type="checkbox" v-model="mirror">
          </label>
          <label for="direction">
            滚动方向<input id="direction" class="switch-component" type="checkbox" v-model="direction">
          </label>
          <br>
          <label for="speed">
            速度<input id="speed" type="range" min="1" max="10" step="1" v-model.number="playSpeed"/>{{playSpeed}}
          </label>
          <label for="fontsize">
            字体大小<input id="fontsize" type="range" min="10" max="100" step="1" v-model="size"/>{{size}}
          </label>
          <label for="countnbm">
            倒计时<input id="countnbm" type="range" min="0" max="10" step="1" v-model="countNum"/>{{countNum}}
          </label>
          <label for="lineheight" v-show="!direction">
            字间距<input id="lineheight" type="range" min="1" max="3" step="0.1" v-model="pObj['line-height']"/>{{pObj['line-height']}}
          </label>
          <br>
          字体颜色
          <label for="color_1">
            <input id="color_1" type="radio" name="fontcolor" value="#ffffff" v-model="pObj.color"> 白色
          </label>
          <label for="color_2">
            <input id="color_2" type="radio" name="fontcolor" value="#808080" v-model="pObj.color"> 灰色
          </label>
          <label for="color_3">
            <input id="color_3" type="radio" name="fontcolor" value="#FFA500" v-model="pObj.color"> 橙色
          </label>
          <label for="color_4">
            <input id="color_4" type="radio" name="fontcolor" value="#FF0000" v-model="pObj.color"> 红色
          </label>
          <label for="color_5">
            <input id="color_5" type="radio" name="fontcolor" value="#0000FF" v-model="pObj.color"> 蓝色
          </label>
          <label for="color_6">
            <input id="color_6" type="radio" name="fontcolor" value="#008000" v-model="pObj.color"> 绿色
          </label>
          <label for="color_7">
            <input id="color_7" type="radio" name="fontcolor" value="#000000" v-model="pObj.color"> 黑色
          </label>
          <br>
          背景颜色
          <label for="color_8">
            <input id="color_8" type="radio" name="backgroundcolor" value="#ffffff" v-model="divObj.background"> 白色
          </label>
          <label for="color_9">
            <input id="color_9" type="radio" name="backgroundcolor" value="#000000" v-model="divObj.background"> 黑色
          </label>
          <div>
            <textarea :style="textareaObj" v-model="text"></textarea>
          </div>
        </div>
      </div>
      <div :style="divObj" ref="tici" @click="playSwichover()">
        <p :style="pObj">
          {{text}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      datas:[],
      show:true,
      show_2:true,
      //滚动方向
      direction:false,
      //倒计时
      countNum:0,
      //播放状态
      playState:false,
      //镜像状态
      mirror:false,
      //循环状态
      loop:false,
      //字体大小
      size:40,
      //播放速度
      playSpeed:1,
      //输入文本
      text:'输入文稿，马上生成滚屏跑马提词。帮助记者、主持人、vlog拍摄者随时随地开展工作',
      pObj:{
        fontSize: '40px',
				color:'#ffffff',
        transform: 'rotateY(0deg)',
        padding:'100vh 0',
        'white-space':'pre-wrap',
        'line-height': 1,
      },
      divObj:{
        overflow:'auto',
        width:'100vw',
        height:'100vh',
        background:'#000000',
      },
      textareaObj:{
        width:'50%',
        height:'200px',
      }
    }
  },
  created() {
    const _self = this
    _self.$nextTick(() => {
      
    })
  },
  watch: {
    //滚动方向
    direction:{
      handler(newValue){
        if(newValue == true){
          //console.log('向左播放')
          this.pObj.padding = '45vh 100vw 0 100vw'
          this.pObj['white-space'] = 'pre'
          //  !!!因为样式采用了 box-sizing: border-box;所以要设置300vw才会有留白
          // this.pObj.width = '300vw'

        }else{
          //console.log('向上播放')
          this.pObj.padding = '100vh 0'
          this.pObj['white-space'] = 'pre-wrap'
          // this.pObj.width = 'auto'
        }
      }
    },
    //镜像
    mirror:{
      handler(newValue){
        if(newValue == true){
          //console.log('镜像')
          this.pObj.transform = 'rotateY(180deg)'
        }else{
          //console.log('没镜像')
          this.pObj.transform = 'rotateY(0deg)'
        }
      }
    },
    //字体大小
    size:{
      handler(newValue){
        //console.log('字体改变了')
        this.pObj.fontSize = newValue+'px'
      }
    },
  },
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
    //开始播放
    play(){
      //判断现在播放状态
      //true时，开始播放
      if(this.playState == true){
        //判断播放方向   向上播放
        if(this.direction == false){
          //设置播放速度
          this.$refs.tici.scrollTop += this.playSpeed
          //判断scrollTop位置是否到达底部
          if(this.$refs.tici.scrollTop < this.$refs.tici.scrollHeight - window.innerHeight){
            //11毫秒90帧率
            setTimeout(this.play,11)
          }else{  
            //到底底部时，判断是否需要循环
            if(this.loop == true){
              //scrollTop位置重新赋值为0
              this.$refs.tici.scrollTop = 0
              this.play()
            }else{
              //测试用
              // console.log('准备结束了')
              //scrollTop位置重新赋值为0
              this.$refs.tici.scrollTop = 0
              //改变播放状态
              this.playState = !this.playState
              //测试用
              // console.log('结束了')
              return
            }
          }
        }else{   //向左播放
          //设置播放速度
          this.$refs.tici.scrollLeft += this.playSpeed
          //判断scrollLeft位置是否到达底部
          if(this.$refs.tici.scrollLeft < this.$refs.tici.scrollWidth - window.innerWidth){
            //11毫秒90帧率
            setTimeout(this.play,11)
          }else{  
            //到底底部时，判断是否需要循环
            if(this.loop == true){
              //scrollLeft位置重新赋值为0
              this.$refs.tici.scrollLeft = 0
              this.play()
            }else{
              //测试用
              // console.log('准备结束了')
              //scrollLeft位置重新赋值为0
              this.$refs.tici.scrollLeft = 0
              //改变播放状态
              this.playState = !this.playState
              //测试用
              // console.log('结束了')
              return
            }
          }
        } 
      }else{
        //测试用
        // console.log('暂停了')
      }
    },
    //点击文本，切换暂停开始状态
    playSwichover(){
      //改变设置框状态
      this.show = !this.show
      //改变播放状态
      this.playState = !this.playState
      //调用播放
      this.play()
      // console.log('scrollTop'+this.$refs.tici.scrollTop)
      // console.log('scrollHeight'+this.$refs.tici.scrollHeight)
      // console.log('innerHeight'+window.innerHeight)
    },
    //打开(关闭)设置框
    set(){
      this.show_2 = !this.show_2
    },
    
  },
}
</script>

<style lang="less" scoped>
@import 'home';

*{
  box-sizing: border-box;
}

.switch-component {
  position: relative;
  width: 60px;
  height: 30px;
  background-color: #dadada;
  border-radius: 30px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  transition: all .2s ease;
}

/* 按钮 */
.switch-component::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 50%;
  transition: all .2s ease;
}

/* 选中状态时，背景色切换 */
.switch-component:checked {
  background-color: #86c0fa;
}

/* 选中状态时，按钮的位置移动 */
.switch-component:checked::after {
  left: 50%;
}

//滚动条样式
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #49b1f5; /* or add it to the track */
}

::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #dbeffd;
  border-radius: 32px;
}

.dingwei{
  position:fixed;
  top:0;
  z-index: 1;
  background-color: rgb(128, 105, 105);
}
</style>
