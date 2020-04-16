<template>
	<view class="administrator">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/chr.png"></image>
				<view class="identify-icon-text">出入记录</view>
			</view>
		</view>
		<view class="admin-records">
			<view class="records-white" v-for="(item,index) in records" :key="index">
				<view class="records-white-content records-purple" :class="item.color_text">
					<view class="records-information">
						<text class="records-font">姓名：</text>
						<text class="records-font">{{item.student_name}}</text>
					</view>
					<view class="records-information">
						<text class="records-font">出入信息：</text>
						<text class="records-font">{{item.in_out_direction}}</text>
					</view>
					<view class="records-information">
						<text class="records-font">出入时间：</text>
						<text class="records-font">{{item.in_out_time | datetimeFilter}}</text>
					</view>
					<view class="records-information">
						<text class="records-font">出入位置：</text>
						<text class="records-font">{{item.pass_name}}</text>
					</view>
					<view class="records-information">
						<text class="records-font">所在班级：</text>
						<text class="records-font">{{item.class_name}}</text>
					</view>
					<view class="records-information">
						<text class="records-font">所在宿舍：</text>
						<text class="records-font">{{item.dorm_name}}</text>
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
			loadingText: '加载中...',
			records:[],
			identityName:''
		}
	},
	onLoad:function(options){
	  _self = this;
	  this.identityName = JSON.parse(options.identityName);
	  this.recordsInitial();
	},
	onPullDownRefresh:function(){
		this.recordsInitial();
	},
	onReachBottom:function(){
		if(timer != null){clearTimeout(timer);}
		timer = setTimeout(function(){
		  _self.recordsAfter();
		}, 1000);
	},
	methods:{
		recordsAfter : function(){
			const nameId = uni.getStorageSync('nameId');
			if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			    return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://122.114.120.6:3000/identity/administrator/recordsInitial',
				
				header: {'content-type': 'application/x-www-form-urlencoded',},
				data:{page:page,nameId:nameId,identityName:this.identityName},
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
					 _self.records = _self.records.concat(ince);
					 _self.loadingText = '加载更多';
					 uni.hideNavigationBarLoading();
				}
			})
		},
		recordsInitial : function(){
			const nameId = uni.getStorageSync('nameId');
			page = 1;
			uni.showNavigationBarLoading();
			 uni.request({
				url:'http://122.114.120.6:3000/identity/administrator/recordsInitial',
				header: {'content-type': 'application/x-www-form-urlencoded', },
				data:{
					page:page,
					nameId:nameId,
					identityName:this.identityName,
				},
				method:'POST',
				dataType:'json',
			    success: res =>{
					console.log(res.data)
			     page++;
				 _self.records = res.data;
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
	.records-white{
		width:95%;
		margin:20upx auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		background-color:#fff;
		border-radius: 10upx;
	}
	.records-white-content{
		width: 95%;
		padding:20upx;
		margin:10upx;
	}
	.records-information{
		padding:8upx;
	}
	.records-font{
		font-size:38upx;
		padding:5upx;
	}
	.records-purple{
		color:#6850cc;
	}
	.records-bonus{
		color:#e96d9f;
	}
	.loading{text-align:center; line-height:50px;color:#fff;}
</style>
