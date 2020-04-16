<template>
	<view class="content-module">
		<view class="content-level" v-for="(item,index) in part" :key='index' @tap="btnDepar(index)">
			<image :src="item.url"></image>
			<view class="level-name black-color">{{item.text}}</view>
		</view>
		
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
	var _self,page = 1,timer = null;
	export default {
		data(){
			return {
				part: [{
					url:'../../static/11.jpg',
					text:'理学部',
					badge:'0'
				},{
					url:'../../static/16.jpg',
					text:'理学部',
					badge:'1'
				},{
					url:'../../static/19.jpg',
					text:'理学部',
					badge:'3'
				}],
				loadingText: '加载中...',
				
			}
		},
		onLoad:function(){
		  _self = this;
		  this.getnewsList();
		    },
		onPullDownRefresh:function(){
		  this.getnewsList();
		 },
		onReachBottom:function(){
		  if(timer != null){
		   clearTimeout(timer);
		  }
		  timer = setTimeout(function(){
		   _self.departments();
		  }, 1000);
		 },
		methods:{
			departments(){
				if(_self.loadingText != '' && _self.loadingText != '加载更多'){
				    return false;
				}
				_self.loadingText = '加载中...';
				uni.showNavigationBarLoading();
				uni.request({
					url:'http://localhost:3000/departmentsIntroduce?page='+page,
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					dataType:'json',
					success:res =>{
						_self.loadingText = '';
						 if(res.data == null){
							  uni.hideNavigationBarLoading();
							  _self.loadingText = '已加载全部';
							  return false;
						 }
						 page++;
						 console.log(res);
						 _self.newsList = _self.newsList.concat(res.data.split('--hcSplitor--'));
						 _self.loadingText = '加载更多';
						 uni.hideNavigationBarLoading();
					}
				})
			},
			getnewsList : function(){
				page = 1;
				uni.showNavigationBarLoading();
				 uni.request({
				   url:'http://localhost:3000/departmentsIntroduce?page='+page,
				   method:'POST',
				   header: {
				   	'content-type': 'application/x-www-form-urlencoded', 
				   },
				    success: function(res){
				     page++;
				     _self.newsList = res.data.split('--hcSplitor--');
				     uni.hideNavigationBarLoading();
				     uni.stopPullDownRefresh();
				     _self.loadingText = '加载更多';
				    }
				   });
			},
			btnDepar(e){
				var deta = this.part[e].badge
				uni.navigateTo({
					url:'../details-page/details?deta='+deta
				})
			}
		}
	}
</script>

<style>
	.content-module{
	    width:100%;
	    display:flex;
	    flex-wrap: wrap;
	    /* justify-content: space-around; */
	}
	.content-level{
	    width:45%;
	    height:8rem;
	    margin:10px 0 0 3%;
	}
	.content-level image{
	    width:100%;
	    height:6rem;
	    box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.level-name{
	    height:2rem;
	    line-height:2rem;
	    text-align:center;
	    font-size:18px;
	}
	.loading{text-align:center; line-height:80px;}
</style>
