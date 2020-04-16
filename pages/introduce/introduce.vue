<template>
	<view class="introduce">
		<view class="introduce-title">院系介绍</view>
		<view class="content-module">
			<view class="content-level" v-for="(item,index) in part" :key='index' @tap="btnDepar(index)">
				<image :src="item.college_pic"></image>
				<view class="level-name black-color">{{item.college_name}}</view>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
var _self,page = 1,timer = null;
	export default {
		data(){
			return {
				part: [],
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
			departments : function(){
				if(_self.loadingText != '' && _self.loadingText != '加载更多'){
				    return false;
				}
				_self.loadingText = '加载中...';
				uni.showNavigationBarLoading();
				uni.request({
					url:'http://122.114.120.6:3000/admin/notice/departmentsIntroduce',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{page:page},
					method:'POST',
					dataType:'json',
					success:res =>{
						console.log(res.data)
						_self.loadingText = '';
						 if(res.data == ''){
							  uni.hideNavigationBarLoading();
							  _self.loadingText = '已加载全部';
							  return false;
						 }
						 page++;
						 var ince = res.data;
						 ince = ince.map(ince => {
						 	ince.college_pic = ince.college_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
						 	return ince;
						 })
						 _self.part = _self.part.concat(ince);
						 _self.loadingText = '加载更多';
						 uni.hideNavigationBarLoading();
					}
				})
			},
			getnewsList : function(){
				page = 1;
				uni.showNavigationBarLoading();
				uni.request({
					url:'http://122.114.120.6:3000/admin/notice/departmentsIntroduce',
					header: {
				  	'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{page:page},
					method:'POST',
					dataType:'json',
				    success: res =>{
				     page++;
					 _self.part = res.data;
					 _self.part = _self.part.map(part => {
					 	part.college_pic = part.college_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
					 	return part;
					 })
					 // console.log(_self.part)
				     uni.hideNavigationBarLoading();
				     uni.stopPullDownRefresh();
				     _self.loadingText = '加载更多';
				    }
				});
			},
			btnDepar(e){
				var badge = this.part[e].id
				uni.navigateTo({
					url:'../details-page/details?badge='+badge
				})
			}
		}
	}
</script>

<style>
	.introduce-title{
		width:100%;
		height:80upx;
		text-align: center;
		line-height:80upx;
		background:#f3f3f3;
	}
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
		overflow: hidden;
		text-overflow:ellipsis;    
		white-space: nowrap;
	}
	.loading{text-align:center; line-height:50px;}
</style>
