<template>
  
  <div class="home_c">
    <div>
      <span>题词页面</span>
    </div>
    <textarea :style="textareaObj" v-model.lazy="text"></textarea>
    <div>
      <button @click="startPlay()">开始</button>
      <router-link to="/config">开始2</router-link>
    </div>




    <div :style="divObj" ref="tici" v-show="show">
      <div class="dingwei">
        <button @click.stop="endPlay()">返回</button>
        <button>设置</button>
        <div class="z-index">
          <label for="loop">
            循环播放<input id="loop" class="switch-component" type="checkbox" v-model="loop">
          </label>
          <label for="mirror">
            镜像<input id="mirror" class="switch-component" type="checkbox" v-model="mirror" @click="mirrorImage(mirror)">
          </label>
          <label for="direction">
            滚动方向<input id="direction" class="switch-component" type="checkbox" v-model="direction" @click="fontDirection(direction)">
          </label>
          <br>
          速度<input type="range" min="1" max="10" step="1" v-model.number="playSpeed"/>{{playSpeed}}
          字体大小<input type="range" min="10" max="100" step="1" v-model="size" @change="changeSize(size)"/>{{size}}
          倒计时<input type="range" min="0" max="10" step="1" v-model="countNum"/>{{countNum}} ！功能没加
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
      </div>
      <div @click="playSwichover($event)">
        <p :style="pObj">
          {{text}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticiqi',
  components: {
    
  },
  data() {
    return {
      //滚动方向
      direction:false,
      //倒计时
      countNum:0,
      //播放状态
      playState:false,
      //提词器模式，目前好像没用
      show:false,
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
        //'white-space': 'nowrap',
        transform: 'rotateY(0deg)',
        padding:'200px 0',
        'white-space':'normal',
      },
      divObj:{
        overflow:'auto',
        width:'100%',
        height:'0',
        background:'#000000',
        // padding:'425px 0 425px 0',
        
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
  watch: {},
  computed: {},
  mounted() {
    // let a = window.innerHeight/2
    // console.log(a)
    // console.log(window.innerHeight)
 
    // console.log(this);
    // document.addEventListener('fullscreenchange', function(){
    //   console.log('全屏状态改变了1')
    //   console.log(show)
    // })
    // document.addEventListener('webkitfullscreenchange', function(){console.log('全屏状态改变了2');});
    // document.addEventListener('mozfullscreenchange', function(){console.log('全屏状态改变了3');});
    // document.addEventListener('MSFullscreenChange', function(){console.log('全屏状态改变了4');});
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
    //进入提词器模式
    startPlay(){
      this.show = true
      //进入全屏
      this.$refs.tici.requestFullscreen()
    },
    //退出提词器模式
    endPlay(){
      this.show = false
      //console.log(1);
      if (document.fullscreenElement) {
       // console.log(2);
        document.exitFullscreen()
      }
    },
    //开始播放
    play(){
      //判断现在播放状态
      //true时，开始播放
      if(this.playState === true){
        //设置播放速度
        this.$refs.tici.scrollTop += this.playSpeed
        //判断scrollTop位置是否到达底部
        if(this.$refs.tici.scrollTop < this.$refs.tici.scrollHeight - window.innerHeight){
          //11毫秒90帧率
          setTimeout(this.play,11)
        }else{  
          //到底底部时，判断是否需要循环
          if(this.loop === true){
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
      }else{
        //测试用
        // console.log('暂停了')
      }
    },

    //点击文本，切换暂停开始状态
    playSwichover(event){
      //改变设置框状态，最后加

      //改变播放状态
      this.playState = !this.playState
      //调用播放
      this.play()
      // console.log('scrollTop'+this.$refs.tici.scrollTop)
      // console.log('scrollHeight'+this.$refs.tici.scrollHeight)
      // console.log('innerHeight'+window.innerHeight)
    },
    //字体大小
    changeSize(size){
      //测试
      // console.log(size+'px')
      this.pObj.fontSize = size+'px'
    },
    //镜像
    mirrorImage(mirror){
      mirror ? this.pObj.transform = 'rotateY(0deg)' : this.pObj.transform = 'rotateY(180deg)'
    },
    fontDirection(direction){
      direction ? this.pObj['white-space'] = 'normal' : this.pObj['white-space'] = 'nowrap'
    },

    //判断是否进入全屏,进入全屏返回true,否则返回false，暂时没用上
    isFullScreen(){
      return !! (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.webkitFullScreen || document.msFullScreen )
    }
  },
}
</script>

<style lang="less" scoped>
/*
*{
  box-sizing: border-box;
}
*/

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
