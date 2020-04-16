<template>
	<view class="dynamic">
		<view class="introduce-title">校园动态</view>
		<view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in listData" :key="index" @tap="goDetail(index)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.dt_pic"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ item.dt_desc }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ item.dt_title }}</text>
								<text>{{ item.dt_addtime | datetimeFilter }}</text>
							</view>
						</view>
					</view>
				</view>
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
			listData: [],
			loadingText: '加载中...'
		}
	},
	onLoad:function(){
	  _self = this;
	  this.campus();
	    },
	onPullDownRefresh:function(){
	  this.campus();
	 },
	onReachBottom:function(){
	  if(timer != null){
	   clearTimeout(timer);
	  }
	  timer = setTimeout(function(){
	   _self.dynamic();
	  }, 1000);
	 },
	methods:{
		dynamic : function(){
			if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			    return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/campusDynamic',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{page:page},
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
					 ince = ince.map(ince => {
					 	ince.dt_pic = ince.dt_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
					 	return ince;
					 })
					 _self.listData = _self.listData.concat(ince);
					 _self.loadingText = '加载更多';
					 uni.hideNavigationBarLoading();
				}
			})
		},
		campus : function(){
			page = 1;
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/campusDynamic',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{page:page},
				method:'POST',
				dataType:'json',
			    success: res =>{
					 page++;
					 _self.listData = res.data;
					 _self.listData = _self.listData.map(listData => {
						listData.dt_pic = listData.dt_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
						return listData;
					 })
					 uni.hideNavigationBarLoading();
					 uni.stopPullDownRefresh();
					 _self.loadingText = '加载更多';
			    }
			});
		},
		goDetail(e){
			var badge = _self.listData[e].id
			uni.navigateTo({
				url:'../details-page/dynamicDetails?badge='+badge
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
	.uni-list {
	    background-color: #FFFFFF;
	    position: relative;
	    width: 100%;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	}
	.uni-list-cell {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.uni-media-list {
	    padding: 11px 15px;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    width: 100%;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
		margin-right: 10px;
	}
	.uni-media-list-body {
	    height: auto;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	    -webkit-box-pack: justify;
		-webkit-justify-content: space-around;
		justify-content: space-around;
	    -webkit-box-align: start;
	    -webkit-align-items: flex-start;
	    align-items: flex-start;
	    overflow: hidden;
	}
	.uni-media-list-text-bottom{
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	}
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	
	.uni-media-list-text-top {
		width: 100%;
		height: 74upx;
		line-height: 18px;
		font-size: 28upx;
		overflow: hidden;
	}
	
	.uni-media-list-text-bottom {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		line-height: 15px;
		font-size: 13px;
		color: #8f8f94;
	}
	.loading{text-align:center; line-height:50px;}
</style>
