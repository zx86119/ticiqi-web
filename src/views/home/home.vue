<template>
  
  <div class="home_c" ref="home_c">
    <div>
      <!-- 设置框 -->
      <div class="set" :style="setDiv" v-show="show">
        <button @click="set()">设置</button>
        <div v-show="show_2" @mousedown="this.dragDown" @mouseup="this.dragUp2" >
          <label for="loop">
            循环播放<input id="loop" class="switch-component" type="checkbox" v-model="loop">
          </label>
          <label for="mirror">
            镜像<input id="mirror" class="switch-component" type="checkbox" v-model="mirror">
          </label>
          <label for="direction">
            滚动方向<input id="direction" class="switch-component" type="checkbox" v-model="direction">{{directionText}}
          </label>
          <br>
          <label for="speed">
            速度<input class="range" id="speed" type="range" min="1" max="10" step="1" v-model.number="playSpeed"/>{{playSpeed}}
          </label>
          <label for="fontsize">
            字体大小<input class="range" id="fontsize" type="range" min="10" max="100" step="1" v-model="size"/>{{size}}
          </label>
          <label for="countnbm">
            倒计时<input class="range" id="countnbm" type="range" min="0" max="10" step="1" v-model="countNum"/>{{countNum}}
          </label>
          <label for="lineheight" v-show="!direction">
            字间距<input class="range" id="lineheight" type="range" min="1" max="3" step="0.1" v-model="pObj['line-height']"/>{{pObj['line-height']}}
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
          <br>
          <label for="orientation">
            {{screenText}}<input id="orientation" class="switch-component" type="checkbox" v-model="screen">
          </label>
          <div>
            <textarea v-model="text"></textarea>
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div id="progress" :style="progressDiv"></div>
      <!-- 倒计时页面 -->
      <div class="clock" :style="clockDiv">
        <p>
          {{countNum}}
        </p>
      </div>
      <!-- 提词器 -->
      <div id="tici" :style="divObj" ref="tici" @mousedown="this.dragDown" @mouseup="this.dragUp" @touchmove="this.touchMove">
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
      setDiv:{
        'top': 0,
        transform: 'rotate(0deg)',
      },
      //横竖屏
      screen:false,
      screenText:'横屏',
      //倒计时div
      clockDiv:{
        display: 'none'
      },
      //设置按钮
      show:true,
      //设置框
      show_2:true,
      //滚动方向
      direction:false,
      directionText:'向上',
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
				color: '#ffffff',
        width: 'auto',
        height: 'auto',
        transform: 'rotateY(0deg)',
        padding: '100vh 0 100vh 0',
        'white-space':'pre-wrap',
        'line-height': 1,
      },
      divObj:{
        width:'100vw',
        height:'100vh',
        background:'#000000',
      },
      //进度条
      progressDiv:{
        width: '10px',
        height: '0',
      },
      //鼠标xy坐标
      location:{
        downX:0,
        downY:0,
        upX:0,
        upY:0,
      },
    }
  },
  created() {
    const _self = this
    _self.$nextTick(() => {
      
    })
  },
  watch: {
    //横竖屏
    screen:{
      handler(newValue){
        //竖屏
        if(newValue == true){
          this.screenText = '竖屏'
          this.pObj['text-orientation'] = 'sideways'
          this.pObj['writing-mode'] = 'vertical-rl'
          if(this.direction == true){//向左
            this.pObj.padding = '100vh 0 100vh 45vw'
            this.pObj['white-space'] = 'pre'
            this.progressDiv.width = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollTop = this.$refs.tici.clientHeight/2
              this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            },100)
          }else{//向上
            this.pObj.height = '97vh'
            this.pObj.padding = '0 100vw 0 100vw'
            this.pObj['white-space'] = 'pre-wrap'
            this.progressDiv.height = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollLeft = this.$refs.tici.clientWidth/2
              this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            },100)
          } 
        }else{//横屏
          this.screenText = '横屏'
          this.pObj['text-orientation'] = 'mixed'
          this.pObj['writing-mode'] = 'horizontal-tb'
          if(this.direction == true){//向左
            this.pObj.padding = '45vh 100vw 0 100vw'
            this.pObj['white-space'] = 'pre'
            this.progressDiv.height = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollLeft = this.$refs.tici.clientWidth/2
              this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            },100)
          }else{//向上
            this.pObj.padding = '100vh 0 100vh 0'
            this.pObj['white-space'] = 'pre-wrap'
            this.progressDiv.width = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollTop = this.$refs.tici.clientHeight/2
              this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            },100)
          } 
        }
        this.mirror = false
      }
    },
    //滚动方向
    direction:{
      handler(newValue){
        if(newValue == true){
          this.directionText = '向左'
        }else{
          this.directionText = '向上'
        }
        //横屏状态
        if(this.screen == false){
          //向左播放
          if(newValue == true){
            this.pObj.padding = '45vh 100vw 0 100vw'
            this.pObj['white-space'] = 'pre'
            this.progressDiv.height = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollLeft = this.$refs.tici.clientWidth/2
              this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            },100)
          }else{//向上播放
            this.pObj.padding = '100vh 0 100vh 0'
            this.pObj['white-space'] = 'pre-wrap'
            this.progressDiv.width = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollTop = this.$refs.tici.clientHeight/2
              this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            },100)
          }
        }else{//竖屏状态
          //向左播放
          if(newValue == true){
            this.pObj.padding = '100vh 0 100vh 45vw'
            this.pObj['white-space'] = 'pre'
            this.progressDiv.width = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollTop = this.$refs.tici.clientHeight/2
              this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            },100)
          }else{//向上播放
            this.pObj.padding = '0 100vw 0 100vw'
            this.pObj['white-space'] = 'pre-wrap'
            this.progressDiv.height = '10px'
            setTimeout(()=>{
              this.$refs.tici.scrollLeft = this.$refs.tici.clientWidth/2
              this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            },100)
          }
        }
        

        
      }
    },
    //镜像
    mirror:{
      handler(newValue){
        if(this.screen == true){
          if(newValue == true){
            //console.log('镜像')
            this.pObj.transform = 'rotateX(180deg)'
          }else{
            //console.log('没镜像')
            this.pObj.transform = 'rotateX(0deg)'
          }
        }else{
          if(newValue == true){
            //console.log('镜像')
            this.pObj.transform = 'rotateY(180deg)'
          }else{
            //console.log('没镜像')
            this.pObj.transform = 'rotateY(0deg)'
          }
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
  mounted() {
    //初始化文本在提词器中位置
    this.$refs.tici.scrollTop = this.$refs.tici.clientHeight/2
    this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
  },
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
    //拖动效果
    dragDown(){
      this.location.downX = event.clientX
      this.location.downY = event.clientY
      window.addEventListener("mousemove", this.dragMove)
    },
    dragMove(){
      let x = event.movementX
      let y = event.movementY
      if(y > 0){
        this.$refs.tici.scrollTop -= Math.abs(y)
      }else{
        this.$refs.tici.scrollTop += Math.abs(y)

      }
      if(x > 0){
        this.$refs.tici.scrollLeft -= Math.abs(x)
      }else{
        this.$refs.tici.scrollLeft += Math.abs(x)
      }
      this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
      this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
    },
    dragUp(){
      this.location.upX = event.clientX
      this.location.upY = event.clientY
      if((this.location.upX - this.location.downX == 0) && (this.location.upY - this.location.downY == 0)){
        this.playSwichover()
      }
      window.removeEventListener("mousemove", this.dragMove)
    },
    dragUp2(){
      this.location.upX = event.clientX
      this.location.upY = event.clientY
      window.removeEventListener("mousemove", this.dragMove)
    },
    touchMove(){
      this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
      this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
    },
    //开始播放
    play(){
      //判断现在播放状态
      //true时，开始播放
      if(this.playState == true){
        //判断横屏竖屏   竖屏
        if(this.screen == true){
          //判断播放方向   向上播放
          if(this.direction == false){
            //滚动一次
            this.$refs.tici.scrollLeft -= this.playSpeed
            //改变进度条
            this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            //判断scrollTop位置是否到达底部
            if(this.$refs.tici.scrollLeft > 0){
              //11毫秒90帧率
              setTimeout(this.play,16)
            }else{  
              //到底底部时，判断是否需要循环
              if(this.loop == true){
                //scrollLeft位置重新赋值到底部
                this.$refs.tici.scrollLeft = this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth
                this.play()
              }else{
                //测试用
                // console.log('准备结束了')
                //scrollLeft位置重新赋值到底部
                this.$refs.tici.scrollLeft = this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth
                //进度条清零
                this.progressDiv.width = '0'
                //改变播放状态
                this.playState = !this.playState
                //改变设置框状态
                this.show = !this.show
                //测试用
                // console.log('结束了')
                return
              }
            }
          }else{   //向左播放
            //滚动一次
            this.$refs.tici.scrollTop += this.playSpeed
            //改变进度条
            this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            //判断scrollTop位置是否到达底部
            if(this.$refs.tici.scrollTop < this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight){
              //11毫秒90帧率
              setTimeout(this.play,16)
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
                //进度条清零
                this.progressDiv.height = '0'
                //改变播放状态
                this.playState = !this.playState
                //改变设置框状态
                this.show = !this.show
                //测试用
                // console.log('结束了')
                return
              }
            }
          }
        }else{  //横屏
          //判断播放方向   向上播放
          if(this.direction == false){
            //滚动一次
            this.$refs.tici.scrollTop += this.playSpeed
            //改变进度条
            this.progressDiv.height = (this.$refs.tici.scrollTop/(this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight))*100 + 'vh'
            //判断scrollTop位置是否到达底部
            if(this.$refs.tici.scrollTop < this.$refs.tici.scrollHeight - this.$refs.tici.clientHeight){
              //11毫秒90帧率
              setTimeout(this.play,16)
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
                //进度条清零
                this.progressDiv.height = '0'
                //改变播放状态
                this.playState = !this.playState
                //改变设置框状态
                this.show = !this.show
                //测试用
                // console.log('结束了')
                return
              }
            }
          }else{   //向左播放
            //滚动一次
            this.$refs.tici.scrollLeft += this.playSpeed
            //改变进度条
            this.progressDiv.width = (this.$refs.tici.scrollLeft/(this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth))*100 + 'vw'
            //判断scrollLeft位置是否到达底部
            if(this.$refs.tici.scrollLeft < this.$refs.tici.scrollWidth - this.$refs.tici.clientWidth){
              //11毫秒90帧率
              setTimeout(this.play,16)
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
                //进度条清零
                this.progressDiv.width = '0'
                //改变播放状态
                this.playState = !this.playState
                //改变设置框状态
                this.show = !this.show
                //测试用
                // console.log('结束了')
                return
              }
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
      //判断倒计时
      if(this.countNum === 0){
        //调用播放
        this.play()
      }else{
        //暂停时不需要倒计时
        if(this.playState == true){
          this.playClock()
        }else{
          this.play()
        }
      }
    },
    //打开(关闭)设置框
    set(){
      this.show_2 = !this.show_2
    },
    //倒计时效果
    playClock(){
      //打开倒计时div
      this.clockDiv.display = 'inline'
      //保存倒计时
      let mNum = this.countNum
      console.log(mNum);
      //一秒之后countNum-1
      this.timerID = setInterval(()=>{
        this.countNum --
      },1000)
      //countNum=0,关闭到时间div
      setTimeout(()=>{
        clearInterval(this.timerID)
        this.clockDiv.display = 'none'
        this.countNum = mNum
        this.play()
      },mNum*1000)
    },   
  },
}
</script>

<style lang="less" scoped>
@import 'home';

// *{
//   box-sizing: border-box;
// }

// .switch-component {
//   position: relative;
//   width: 60px;
//   height: 30px;
//   background-color: #dadada;
//   border-radius: 30px;
//   border: none;
//   outline: none;
//   -webkit-appearance: none;
//   transition: all .2s ease;
// }

// /* 按钮 */
// .switch-component::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 50%;
//   height: 100%;
//   background-color: #fff;
//   border-radius: 50%;
//   transition: all .2s ease;
// }

// /* 选中状态时，背景色切换 */
// .switch-component:checked {
//   background-color: #86c0fa;
// }

// /* 选中状态时，按钮的位置移动 */
// .switch-component:checked::after {
//   left: 50%;
// }

// //滚动条样式
// ::-webkit-scrollbar {
//   width: 10px;
//   height: 10px;
//   background-color: transparent; /* or add it to the track */
// }

// .dingwei{
//   position:fixed;
//   top:0;
//   z-index: 1;
//   color: #fff;
//   user-select: none;
// }

// .clock{
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   z-index: 2;
//   background-color: #000;
// }

// .clock p{
//   color: #fff;
//   font-size: 200px;
// }
</style>
