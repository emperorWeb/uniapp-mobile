<template>
	<view class="apprival">
		<view>
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/weixiu.png"></image>
				<view class="identify-icon-text">学生报修</view>
			</view>
		</view>
		<view class="approval-outside">
			<view class="fill-information-white" v-for="(item , index) in list" :key="index">
				<view class="approval-every">
					<view class="approval-icon approval-type"></view>
					<view class="approval-centent tiny-purple">{{item.dorm_name}}</view>
				</view>
				<view class="approval-every">
					<view class="approval-icon approval-name"></view>
					<view class="approval-centent tiny-purple">{{item.student_name}}</view>
				</view>
				<view class="approval-every">
					<view class="approval-icon approval-why"></view>
					<view class="approval-details tiny-purple">{{item.repair_bz}}</view>
				</view>
				<view class="information-every">
					<image class="information-img" :src="item.repair_pic1"></image>
				</view>
				<view class="approval-btn">
					<button class="fill-information-submit approval-submit" @tap="approval(index)">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data(){
		return {
			list:[]
		}
	},
	onLoad: function(){
		this.apprival();
	},
	methods:{
		apprival(){
			uni.request({
				url:'http://122.114.120.6:3000/identity/logistics/apprivalTu',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{},
				method:'POST',
				dataType:'json',
				success:res =>{
					this.list = res.data;
					this.list = this.list.map(list => {
						list.repair_pic1 = list.repair_pic1.replace(/../,'http://zhxy.kezhuangyuan.com')
						return list;
					})
				}
			})
		},
		approval(e){
			uni.showLoading({
				title: "正在提交数据..",
				mask:true
			});
			var dealId = this.list[e].id;
			uni.request({
				url:'http://122.114.120.6:3000/identity/logistics/dealWith',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{dealId:dealId},
				method:'POST',
				dataType:'json',
				success:res =>{
					uni.hideLoading();
					if(res.data.code == 100){
						uni.showToast({title: '修理成功',icon: 'none'});
					}else{
						uni.showToast({title: '处理失败，请重试',icon: 'none'});
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
.apprival-white{
	width:95%;
	margin:20upx auto;
	display:flex;
	flex-wrap:wrap;
	justify-content:space-between;
	background-color:#fff;
	line-height:80upx;
	border-radius: 15upx;
}
.approval-every{
	height:100%;
	margin-top:30upx;
	display:flex;
	flex-wrap:wrap;
	justify-content:flex-start;
}
.approval-icon{
	width:10%;
	height:50upx;
	text-align: center;
	position: relative;
}
.approval-icon:before{
	content: " ";
	position: absolute;
	width:40upx;
	height:40upx;
}
.approval-type:before{
	background:url(../../static/nine/dingw.png) no-repeat;
	background-size:100% 100%;
}
.approval-name:before{
	background:url(../../static/nine/mint.png) no-repeat;
	background-size:100% 100%;
}
.approval-why:before{
	background:url(../../static/nine/mints.png) no-repeat;
	background-size:100% 100%;
}
.approval-centent{
	width:80%;
	height:50upx;
	line-height:50upx;
	margin-left:5%;
}
.approval-details{
	width:80%;
	margin-left:5%;
}
// 按钮
.approval-btn{
	width:70%;
	margin:20upx auto 0;
}
.information-every{
	width: 90%;
	margin: 20upx auto;
}
.information-img{
	width:100upx;
	height:120upx;
}
</style>
