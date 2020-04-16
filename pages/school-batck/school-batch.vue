<template>
	<view class="batch">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/zhuan.jpg"></image>
				<view class="identify-icon-text">学生申请</view>
			</view>
		</view>
		<view class="batch-main">
			<view class="fill-information-white">
				<view class="fill-information-head">
					<image class="fill-information-lg" src="../../static/nine/mint.png"></image>
					<view class="fill-information-text color-purple">登记信息</view>
				</view>
				<view class="fill-information-area">
					<text class="fill-information-area-title color-purple">申请类型</text>
					<view class="batch-data">{{conditions[0].application_status}}</view>
				</view>
				<view class="fill-information-area">
					<text class="fill-information-area-title color-purple">学生证号</text>
					<view class="batch-data">{{conditions[0].fk_studentid}}</view>
				</view>
				<view class="fill-information-area">
					<text class="fill-information-area-title color-purple">申请时间</text>
					<view class="batch-data">{{conditions[0].application_addtime | datetimeFilter}}</view>
				</view>
				<view class="approval-every">
					<text class="fill-information-area-title color-purple">休学原因</text>
					<view class="approval-details tiny-purple">{{conditions[0].application_bz}}</view>
				</view>
				<view class="fill-information-local">
					<text class="fill-information-area-title color-purple">文件图片</text>
					<view class="upload-pictures">
						<view class="pload-pictures-picture">
							<image class="pload-pictures-img" :src="conditions[0].application_pic2" ></image>
						</view>
					</view>
				</view>
				<view class="fill-information-area">
					<text class="fill-information-area-title color-purple">保留开门权限</text>
					<view class="right-date" @click="arrowDown" >
						<!-- <uni-icon type="arrowdown" size="20"></uni-icon> -->
						<p style="font-size: 20upx;" title="请选择">{{unitName}}</p>
					</view>
					
				</view>
				<view class="fill-information-local">
					<text class="fill-information-area-title color-purple">备注</text>
					<textarea class="fill-information-area-text" name="" id="" placeholder="请填写备注" v-model="note"></textarea>
				</view>
			</view>
		</view>
		<view class="fill-information-btn">
			<button class="fill-information-submit" @tap="btnAdvance">提交</button>
		</view>
		<view class="selectBox_list" v-show="isShowSelect">
			<view class="selectBox_listLi" v-for="(item, index) in dataList" :key="index" @click.stop="select(item, index)">{{item.value}}
			 </view>
		</view>
	</view>
	
</template>

<script>
export default{
	data(){
		return{
			isShowSelect: false,
			dataList: [
				{key: 1, value: "1天"},
				{key: 7, value: "1周"},
				{key: 30, value: "1月"},
				{key: 365, value: "1年"}
			],
			unitName:'请选择',
			conditions:[],
			note:'',
			keyTime:''
		}
	},
	onLoad() {
		this.advance();
	},
	methods:{
		arrowDown() {
			this.isShowSelect = !this.isShowSelect;
		  },
		  select(item, index) {
			this.isShowSelect = false;
			this.unitName = item.value;
			this.keyTime = item.key;
		  },
		  // 页面加载前请求数据
		advance(){
			uni.showNavigationBarLoading();
			uni.request({
			  	url:'http://122.114.120.6:3000/identity/logistics/schoolBatch',
			  	header: {
			  		'content-type': 'application/x-www-form-urlencoded', 
			  	},
				data:{},
				method:'POST',
			  	dataType:'json',
			  	success:res =>{
					this.conditions = res.data;
					this.conditions = this.conditions.map(conditions => {
						conditions.application_pic2 = conditions.application_pic2.replace(/../,'http://zhxy.kezhuangyuan.com')
						return conditions;
					})
					uni.stopPullDownRefresh();
				}
			})
		},
		btnAdvance(){
			uni.showLoading({
				title: "正在提交数据..",
				mask:true
			});
			uni.request({
			   	url:'http://122.114.120.6:3000/identity/logistics/schoolAudit',
				header: {
			   		'content-type': 'application/x-www-form-urlencoded', 
			   	},
				data:{
					studentId:this.conditions[0].fk_studentid,
					note:this.note,
					keyTime:this.keyTime
				},
				method:'POST',
			   	dataType:'json',
				success:res =>{
					uni.hideLoading();
					if(res.data.code == 100){
						uni.showToast({title: '提交成功',icon: 'none'});
						uni.redirectTo({
	                        url: '../school-batck/school-batck',
	                    });
					}else{
						uni.showToast({title: '提交失败',icon: 'none'});
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
	.batch{
		width:100%;
		height:100%;
	}
	.fill-information-head{
		text-align: center;
	}
	.fill-information-lg{
		width:100upx;
		height:100upx;
	}
	.fill-information-area{
		width:100%;
		height:60upx;
		margin:10upx 0;
		line-height:60upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.fill-information-area-title{
		font-size:40upx;
		margin-left: 24upx;
	}
	.batch-data{
		margin-left:30upx;
		color:#C6B4F3;
		font-size:32upx;
	}
	.approval-every{
		height:100%;
		margin-top:30upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.approval-details{
		width:90%;
		padding:15upx;
		margin:0 auto;
		background:#f2edfd;
		border-radius: 15upx;
		font-size:30upx;
	}
	.fill-information-local{
		width:95%;
		// height:60upx;
		margin:10upx 0;
		line-height:60upx;
	}
	.upload-pictures{
		width:95%;
		height:110upx;
		margin:10upx auto 0;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.pload-pictures-img{
		width:110upx;
		height:110upx;
		margin-right:15upx;
	}
	.right-date{
		width:150upx;
		height:50upx;
		background-color: #00a3e8;
		text-align: center;
		line-height:50upx;
		font-size:34upx;
		color:#fff;
		border-radius: 20upx;
		margin-left:30upx;
	}
	.selectBox_list{
		width:100%;
		position:fixed;
		bottom: 0;
		background-color: #fff;
	}
	.selectBox_listLi{
		width:100%;
		height:60upx;
		border-bottom: #e8e8e8 solid 2upx;
		text-align: center;
		line-height: 60upx;
		font-size:32upx;
		color:#000;
	}
	.fill-information-area-text{
		display:block;
		width:100%;
		padding:15upx;
		background:#e3e3e3;
	}
	uni-textarea{
		height:200upx;
	}
</style>
