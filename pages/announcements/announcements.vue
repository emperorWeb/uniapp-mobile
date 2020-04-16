<template>
	<view class="announcements">
		<view class="fill-information-white" v-for="(item, index) in cement" :key="index">
			<!-- 头部 -->
			<view class="announcements-head">
				<view class="announcements-head-left">
					<view class="announcements-head-icon announcements-head-icon-left"></view>
					<view>
						<text>发布人：</text>
						<text>智慧校园</text>
					</view>
				</view>
				<!-- 时间 -->
				<view class="announcements-head-right">
					<view class="announcements-head-icon announcements-head-icon-right"></view>
					<view>{{item.tongzhi_addtime | formatDate}}</view>
				</view>
			</view>
			<view class="announcements-title">
				<view class="announcements-head-icon announcements-title-icon"></view>
				<text class="announcements-title-name">{{item.tongzhi_title}}</text>
			</view>
			<view class="container">
				<view class="topic_cont_text" :class="item.isFload ? 'hide' : 'show'">    
					<text class="container-text">{{item.tongzhi_desc}}</text>
				</view>
				<view class="ondisplay" @tap="fload(index)" v-if="item.isFload">
					<view class="show-icon show-icon-open"></view>
					<text>展开全部</text>
				</view>
				<view class="ondisplay" @tap="fload(index)" v-if="!item.isFload">
					<view class="show-icon show-icon-small"></view>
					<text>点击收起</text>
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
			loadingText:'加载更多...',
			cement:[],
			
		}
	},
	onLoad : function () {
		_self = this;
		this.announcements();
	},
	onPullDownRefresh : function () {
		this.announcements();
	},
	onReachBottom:function(){
	  if(timer != null){
	   clearTimeout(timer);
	  }
	  timer = setTimeout(function(){
	   _self.getMoreNews();
	  }, 1000);
	 },
	methods:{
		getMoreNews : function(){
			if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			    return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/announcementsList',
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
					 _self.cement = _self.cement.concat(ince);
					 _self.loadingText = '加载更多';
					 uni.hideNavigationBarLoading();
				}
			})
		},
		announcements : function(){
			page = 1;
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/announcementsList',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{page:page},
				method:'POST',
				dataType:'json',
			    success: res =>{
					 page++;
					 _self.cement = res.data;
					 // _self.cement = _self.cement.map(cement => {
						// cement.tongzhi_pic = cement.tongzhi_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
						// return cement;
					 // })
					 uni.hideNavigationBarLoading();
					 uni.stopPullDownRefresh();
					 _self.loadingText = '加载更多';
			    }
			});
		},
		fload(e){
			//改变isFload的状态
			_self.cement[e].isFload =! _self.cement[e].isFload;
		}
	},
	filters:{
		formatDate (date){
			const nDate = new Date(date)
			const year = nDate.getFullYear()
			const month = nDate.getMonth().toString().padStart(2,0)
			const day = nDate.getDay().toString().padStart(2,0)
			return year+'-'+month+'-'+day
		}
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.announcements-head{
		width:95%;
		height:60upx;
		line-height:60upx;
		margin:0 auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		color:#4d4d4d;
		font-size: 30upx;
	}
	.announcements-head-left{
		width:60%;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.announcements-head-right{
		width:40%;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-end;
	}
	.announcements-head-icon{
	    width:40upx;
	    height:40upx;
		margin-right:10upx;
	    position: relative;
	}
	.announcements-head-icon:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:40upx;
		top:20%;
		// margin-top:25upx;
	}
	.announcements-head-icon-left:before{
		background:url(../../static/icon/tou.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-head-icon-right:before{
		background:url(../../static/icon/time.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-title{
		width:95%;
		margin:0 auto;
		height:70upx;
		line-height:70upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.announcements-title-icon:before{
		position: absolute;
		top:46%;
		background:url(../../static/icon/zui.png) no-repeat;
		background-size:100% 100%;
	}
	.announcements-title-name{
		color:#000;
		font-size:36upx;
		font-weight: 700;
	}
	// .container{
	// 	width:95%;
	// 	margin:0 auto;
	// }
	.topic_cont_text{
		width:95%;
		margin:0 auto;
		height: auto;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		/* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hide{
		display: -webkit-box;
	}
	.show{
		display: block;
	}
	.container-text{
		font-size:38upx;
	}
	.ondisplay{
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-end;
		margin-right:30upx;
		color:#00a3e8;
		font-size:30upx;
	}
	.show-icon{
		width:40upx;
		height:25upx;
		margin-right:10upx;
		position: relative;
	}
	.show-icon:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:25upx;
		top:40%;
		// margin-top:25upx;
	}
	.show-icon-open:before{
		background:url(../../static/icon/open.png) no-repeat;
		background-size:100% 100%;
	}
	.show-icon-small:before{
		background:url(../../static/icon/small.png) no-repeat;
		background-size:100% 100%;
	}
	.loading{
		line-height: 2em;
		text-align: center;
		color:#888;
		margin-top:60upx;
	}
	.loading{text-align:center; line-height:50px;}
</style>
