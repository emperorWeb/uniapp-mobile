<template>
	<view class="abnormal-records">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/chr.png"></image>
				<view class="identify-icon-text">出入记录</view>
			</view>
		</view>
		<view class="records-article">
			<view class="article" v-for="(item,index) in list" :key="index">
				<text class="article-information information-one" :class="item.color_text">{{item.in_out_direction}}</text>
				<text class="article-information information-two" :class="item.color_text">{{item.in_out_time | datetimeFilter}}</text>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
var _self,page = 1,timer = null;
export default{
	data() {
		return {
			loadingText: '加载中...',
			list:[]
		}
	},
	onLoad:function(){
	  _self = this;
	  this.students_abnormal();
	  // this.lastOne();
	    },
	onPullDownRefresh:function(){
	  this.students_abnormal();
	  // this.lastOne();
	 },
	onReachBottom:function(){
	  if(timer != null){
	   clearTimeout(timer);
	  }
	  timer = setTimeout(function(){
	   _self.students_records();
	  }, 1000);
	 },
	methods:{
		students_records : function(){
			const renId = uni.getStorageSync('renId');
			if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			    return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/identity/student/record',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{page:page,renId:renId},
				method:'POST',
				dataType:'json',
				success:res =>{
					_self.loadingText = '';
					 if(res.data == ''){
						  uni.hideNavigationBarLoading();
						  _self.loadingText = '已加载全部';
						  return false;
					 }
					 page++;
					 var ince = res.data;
					 _self.list = _self.list.concat(ince);
					 _self.loadingText = '加载更多';
					 uni.hideNavigationBarLoading();
				}
			})
		},
		students_abnormal : function(){
			const renId = uni.getStorageSync('renId');
			page = 1;
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/identity/student/record',
				header: {'content-type': 'application/x-www-form-urlencoded',},
				data:{page:page,renId:renId},
				method:'POST',
				dataType:'json',
				success: res =>{
					console.log(res.data)
					page++;
					_self.list = res.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					_self.loadingText = '加载更多';
			    }
			});
		}
	}
}
</script>

<style lang="scss">
	@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.article{
		width:90%;
		height:80upx;
		margin:20upx auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		background-color:#fff;
		line-height:80upx;
		border-radius: 15upx;
	}
	.article-information{
		font-size: 36upx;
		color:#000000;
	}
	.information-one{margin-left:20upx;}
	.information-two{margin-right:20upx;}
	.loading{text-align:center; line-height:50px;color:#fff;}
	.color_purple{
		color:#6850cc;
	}
	.color_bonus{
		color:#e96d9f;
	}
</style>
