<template>
	<view class="progress">
		<view>
				<!-- 图标-->
				<view class="identify-icon">
					<image class="identify-icon-lg" src="../../static/icon/jindu.png"></image>
					<view class="identify-icon-text">申请进度</view>
				</view>
			</view>
		<view class="fill-information-white" v-for="(item,index) in progress" :key="index">
			<view class="progress-bar">
				<view class="progress-type">{{item.application_status}}</view>
				<progress   border-radius="5" :percent="item.application_deal_status" stroke- backgroundColor="#EAEAEA" activeColor="#0596f2"></progress>
				<view class="progress-situation">
					<view class="progress-situation-has">已申请</view>
					<view class="progress-situation-is">正在审核</view>
					<view class="progress-situation-have">已通过</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {   
	data() {
		return{
			progress:[]
		}
	},
	onLoad : function(){
		this.progressBar();
	},
	methods:{
		progressBar(){
			const renId = uni.getStorageSync('renId');
			console.log(renId)
			uni.request({
				url:'http://122.114.120.6:3000/identity/student/progress',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{renId:renId},
				method:'POST',
				dataType:'json',
				success:res =>{
					if(res.data.code == 200){
						uni.showToast({title: '网络不好，请重试',icon: 'none'});
					}else{
						this.progress = res.data;
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import '../css/abnormal.css';
	page{
		background-color:#00a3e8,
	}
	.progress-type{
		width:100%;
		text-align: center;
		height:80upx;
		// line-height: 80upx;
		margin-left:-20upx;
		color:#814de4;
		font-size:38upx;
		font-weight: 600;
	}
	.progress-bar{
		width:90%;
		margin:0 auto;
	}
	.progress{
		 width:100%;
			/deep/ .uni-progress-bar{  // 这主要是加上deep才能改变它原来的样式 
			border-radius:10rpx !important;
			uni-progress-inner-bar{
				border-radius:10rpx 0rpx 0rpx 10rpx !important;
			}
		}  
	}
	.progress-situation{
		width:100%;
		height:70upx;
		line-height: 70upx;display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
	}
	.progress-situation-has{
		color:#0596f2;
	}
	.progress-situation-is{
		color:#775885;
	}
	.progress-situation-have{
		color:#ec1b18;
	}
</style>
