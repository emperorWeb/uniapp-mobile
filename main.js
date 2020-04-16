import Vue from 'vue'
import store from './store'
import App from './App'


Vue.config.productionTip = false
Vue.prototype.$store = store 

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
//创建全局日期格式过滤器
Vue.filter("datetimeFilter",function(val){
  //val 当前日期对象
  //1.创建日期对象
  var data=new Date(val);
  //2.获取年月日时分秒
  var y=data.getFullYear();
  var m=data.getMonth()+1;
  var d=data.getDate();
  var h=data.getHours();
  var mi=data.getMinutes();
  var s=data.getSeconds();
  //3.拼接字符串
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  h<10&&(h="0"+h);
  mi<10&&(mi="0"+mi);
  s<10&&(s="0"+s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})
app.$mount()
