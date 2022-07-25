<template>
<div class="chartboard">
    <div :ref="chartId" class="echart"></div>
</div>
</template>

<script>
export default {
  name: 'echart', // 数据展示
  props: {
    edata: {
      type: Object,
    },
    chartId:{
      type:String
    },
    option:{
      type:Object
    }
  },
  components: {},
  data() {
    return {
      
    }
  },
  created() {
    
  },
  activated(){
    // console.log('activated')
    // const _self = this
    // _self.$nextTick(() => {
    //   setTimeout(() => {
    //     _self.draw()
    //   }, 500)
    // })
  },
  mounted(){
    console.log('mounted')
     const _self = this
    _self.$nextTick(() => {
      setTimeout(() => {
        _self.draw()
      }, 100)
    })
  },
  watch: {
    // edata: {
    //     handler(newValue, oldValue) {
    //     const _self = this
    //     setTimeout(() => {
    //       _self.draw()
    //     }, 500)
    //     },
    //   deep: true
    // }
  },
  computed: {
   
  },
  methods: {
    draw() {
      var that=this
      // console.log('draw',this.chartId,this.edata)
      var myChart = this.$echarts.init(this.$refs[this.chartId]);
      myChart.clear()
      var option1 = {//柱状图模板
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: []
        },
        xAxis: {
          type:'category',
          axisLabel :{
            interval:0,
            fontSize:8
          },
          data: []
        },
        yAxis: {
          axisLabel :{
            fontSize:6
          },
        },
        series: [
          {
            type: 'bar',
            data: []
          }
        ]
      };
     var option2 = {//饼图模板
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        show:false
      },
      series: [
          {
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      if(this.edata.type=='柱图'){
        option1.title.text=this.edata.title?this.edata.title:'数据读取中'
        option1.xAxis.data=this.edata.labledata?this.edata.labledata:[]
        option1.series[0].data=this.edata.seriesdata?this.edata.seriesdata:[]
        myChart.setOption(option1);
      }
      else if(this.edata.type=='饼图'){
        option2.title.text=this.edata.title?this.edata.title:'数据读取中'
        option2.series[0].data=this.edata.datas?this.edata.datas:[]
        myChart.setOption(option2);
      }
      else if(this.edata.type=='特殊'){
        myChart.setOption(this.option);
      }
      else{
        myChart.setOption(option1);
      }
      myChart.on('click',function(param){
        that.$emit('clickbing',{
          cityname:param.name
        })
      })
      
    },
    // @mouseenter 移入
    // @mouseleave 移处
  },
  beforeDestroy() {
  },
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
