<template>
  
  <div class="home_c" ref="home_c">
    <div>
      <!-- 悬浮按钮 -->
      <div class="set_float" v-show="!show">
        <img src="./set.png" alt=""  @click="set()"/>
        <!-- <img src="./set.png" alt=""  @click="test1()"/> -->
      </div>
      <!-- 设置框 -->
      <div class="set" :style="setDiv" ref="set" v-show="show"> 
        <div @mousedown="this.dragDown" @mouseup="this.dragUp2" >
          <div class="box">
            <div>
              <label for="loop">
                循环播放<input id="loop" class="switch-component" type="checkbox" v-model="loop">
              </label>
              <label for="mirror">
                镜像<input id="mirror" class="switch-component" type="checkbox" v-model="mirror">
              </label>
              <label for="direction">
                方向<input id="direction" class="switch-component" type="checkbox" v-model="direction">{{directionText}}
              </label>
            </div>
            <div>
              <label for="speed">
                速度<input class="range" id="speed" type="range" min="1" max="10" step="1" v-model.number="playSpeed"/>{{playSpeed}}
              </label>
            </div>
            <div>
              <label for="fontsize">
                字体大小<input class="range" id="fontsize" type="range" min="10" max="100" step="1" v-model="size"/>{{size}}
              </label>
            </div>
            <div>
              <label for="countnbm">
                倒计时<input class="range" id="countnbm" type="range" min="0" max="10" step="1" v-model="countNum"/>{{countNum}}
              </label>
            </div>
            <div v-show="!direction">
              <label for="lineheight">
                字间距<input class="range" id="lineheight" type="range" min="1" max="3" step="0.1" v-model="pObj['line-height']"/>{{pObj['line-height']}}
              </label>
            </div>
            <div>
              字体颜色
              <el-color-picker v-model="pObj.color" size="mini" show-alpha></el-color-picker>
              <input class="color_slider" type="range" min="0" max="360" step="1" v-model="fontColor"/>
            </div>
            <div>
              背景颜色
              <el-color-picker v-model="divObj.background" size="mini" show-alpha></el-color-picker>
              <input class="color_slider" type="range" min="0" max="360" step="1" v-model="backgroundColor"/>
            </div>
            <div>
              <label for="orientation">
                {{screenText}}<input id="orientation" class="switch-component" type="checkbox" v-model="screen">
              </label>
            </div>
          </div>
          <div class="box">
            <div>
              <textarea v-model="text" id="txt"></textarea>
            </div>
          </div>
          <div class="box"><br>
        <p>历史记录</p>
        <!-- <button type="button" @click="test1()">test</button> -->
        <div id="history" class="box1" style="overflow:scroll;width:auto;border: 0;
            border-radius: 5px;color:black;
            background-color: #fffcfcec;">
        <ul type="disc" id="myul">
        <li v-for="(item,index) in datas" :key="index">{{item}}</li>
        </ul>
          
        </div>
          </div>
          <!-- 关闭按钮 -->
          <div class="setButton">
            <img src="./shut.png" alt=""  @click="set()">
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
      //设置框
      show:true,
      setDiv:{
        'top': 0,
        transform: 'rotate(0deg)',
        width: '100vw'
      },    
      //横竖屏
      screen:false,
      screenText:'横屏',
      //倒计时div
      clockDiv:{
        display: 'none'
      },
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
      fontColor: 0,
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
      backgroundColor: 0,
      divObj:{
        width:'100vw',
        height:'100vh',
        background:'rgba(0, 0, 0, 1)',
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
        _self._fetchData()
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
          this.setDiv.width = this.$refs.tici.clientHeight + 'px'
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
          //改变设置框位置
          setTimeout(()=>{
            let a = Math.abs(this.$refs.tici.clientWidth - this.$refs.set.scrollHeight)
            let b = -this.$refs.set.scrollHeight
            this.setDiv.transform = 'rotate(90deg) translate(' + b + 'px,' + -a + 'px)'
          },100)
        }else{//横屏
          this.screenText = '横屏'
          this.pObj['text-orientation'] = 'mixed'
          this.pObj['writing-mode'] = 'horizontal-tb'
          this.setDiv.width = 100 + 'vw'
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
          //改变设置框位置
          this.setDiv.transform = 'rotate(0deg)' 
        }
        //重置镜像
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
    fontColor:{
      handler(newValue){
        let r,g,b
        if(newValue >= 0 && newValue <= 60){
          r = 255
          g = Math.round(4.25 * newValue)
          b = 0
        }else if(newValue > 60 && newValue <= 120){
          r = Math.round(518.4 - 4.32 * newValue)
          g = 255
          b = 0
        }else if(newValue > 120 && newValue <= 180){
          r = 0
          g = 255
          b = Math.round(4.32 * newValue - 522.72)
        }else if(newValue > 180 && newValue <= 240){
          r = 0
          g = Math.round(1036.8 - 4.32 * newValue)
          b = 255
        }else if(newValue > 240 && newValue <= 300){
          r = Math.round(4.32 * newValue - 1041.12)
          g = 0
          b = 255
        }else if(newValue > 300 && newValue < 360){
          r = 255
          g = 0
          b = Math.round(1576.01 - 4.39 * newValue)
        }else{
          r = 255
          g = 0
          b = 0
        }
        this.pObj.color = 'rgb(' + r + ',' + g + ',' + b + ')'
        // console.log('r,g,b:' + r,g,b)
      }
    },
    backgroundColor:{
      handler(newValue){
        let r,g,b
        if(newValue >= 0 && newValue <= 60){
          r = 255
          g = Math.round(4.25 * newValue)
          b = 0
        }else if(newValue > 60 && newValue <= 120){
          r = Math.round(518.4 - 4.32 * newValue)
          g = 255
          b = 0
        }else if(newValue > 120 && newValue <= 180){
          r = 0
          g = 255
          b = Math.round(4.32 * newValue - 522.72)
        }else if(newValue > 180 && newValue <= 240){
          r = 0
          g = Math.round(1036.8 - 4.32 * newValue)
          b = 255
        }else if(newValue > 240 && newValue <= 300){
          r = Math.round(4.32 * newValue - 1041.12)
          g = 0
          b = 255
        }else if(newValue > 300 && newValue < 360){
          r = 255
          g = 0
          b = Math.round(1576.01 - 4.39 * newValue)
        }else{
          r = 255
          g = 0
          b = 0
        }
        this.divObj.background = 'rgb(' + r + ',' + g + ',' + b + ', 0.4 )'
      }
    }

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
      let url = `/ticiqi-history`
      this.$http({
        url: url,
        method: 'get',
        showLoading: true,
      }).then((res) => {
        // console.log(res)
        let data = JSON.parse(JSON.stringify(res.data.data))
        that.datas=data
        // console.log(datas)
        var datas = data
        // console.log(datas)
        
        // var html = '';
        for (var i = 0; i < datas.length; i++) {
          var result = datas[i];
          // console.log(result.histories)
          that.datas = result.histories
          // 	for (var j = 0; j < result.histories.length; j++) {
          // 		html += "<li>";
          // 		html += result.histories[j];
			    // 		html += "</li>";
		
          // 	}
          // 	myul.innerHTML = html;
		    }
		
      })
    },
    test1() {
      var that=this
      var phone="13628560191"
	    var histories = ["提词记录1","提词记录2","提词记录3"]
      // var histories=[
      //         "提词记录1",
      //         "提词记录2",
      //         "提词记录3"
      //       ]
      // 拿到输入框的值
      var text = document.getElementById("txt").value
      // console.log(text)
      // histories.push(text)
      // 添加到数组中
      histories.unshift(text)
      // console.log(histories)
      let url = `/ticiqi-history/find` 
      this.$http({
        url: url,
        method: 'post',
        data:{
          query: {
            phone:phone,
			      histories:histories
          }
        },
        showLoading: true,
      }).then((res) => {
        // console.log(res)
		// console.log(res.data.total)
        if(res.data.total>=1){//如果有记录就更新
          url = `/ticiqi-history`
          that.$http({
            url: url,
            method: 'patch',
            data:{
                query: {
                  phone: phone
                },
                data: {
                  histories:histories
                }
            },
            showLoading: true,
          }).then((res) => {
            // console.log(res)
            that._fetchData()
          })
        }
        else{//如果没有记录就插入
          url = `/ticiqi-history`
          that.$http({
            url: url,
            method: 'post',
            data:{
                data: [
                  {
                    phone:phone,
                    histories:histories
                  }
                ]
            },
            showLoading: true,
          }).then((res) => {
            // console.log(res)
            that._fetchData()
          })
        }
      })
    },
    //微信支付测试
    wxpay(money){
      this.$http({
        url: 'https://api.mch.weixin.qq.com/v3/pay/transactions/native',
        method: 'post',
        data:{
          "mchid": "1900006XXX",	//直连商户的商户号，由微信支付生成并下发。
			  	"out_trade_no": "native12177525012014070332333",	//商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一
			  	"appid": "wxdace645e0bc2cXXX",	//由微信生成的应用ID，全局唯一。请求基础下单接口时请注意APPID的应用属性，例如公众号场景下，需使用应用属性为公众号的APPID
			  	"description": "Image形象店-深圳腾大-QQ公仔",	//商品描述
			  	"notify_url": "https://weixin.qq.com/",	//通知URL必须为直接可访问的URL，不允许携带查询串，要求必须为https地址。格式：URL
			  	"amount": {	//订单金额信息
			  		"total": money,	//订单总金额，单位为分。
			  		"currency": "CNY"	//CNY：人民币，境内商户号仅支持人民币。
			  	}
        },
        showLoading: true,
      }).then((res) => {
        //测试
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
	//改变播放状态之后，调用保存的方法
	this.test1()
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
      this.show = !this.show
    },
    //倒计时效果
    playClock(){
      //打开倒计时div
      this.clockDiv.display = 'inline'
      //保存倒计时
      let mNum = this.countNum
      // console.log(mNum);
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

.box1 li:hover {
		border: 2px;
		letter-spacing: 2px;
		border-color: lightblue;
		border-width: 2px;
		background-color: #cac8c8;
	}

</style>
