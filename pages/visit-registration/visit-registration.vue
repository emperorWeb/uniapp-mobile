<template>
	<view class="registration">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/laifang.png"></image>
				<view class="identify-icon-text">来访登记</view>
			</view>
		</view>
		<!-- 登记区域 -->
		<view class="registration-area">
			<view class="fill-information-white">
				<view class="fill-information-head">
					<image class="fill-information-lg" src="../../static/nine/mint.png"></image>
					<view class="fill-information-text color-purple">登记信息</view>
				</view>
				<!-- 输入框 -->
				<view class="fill-information-fill">
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">姓名</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写姓名" value="" v-model="username"/>
					</view>
					<view class="fill-information-area">
						<text class="fill-information-area-title color-purple">手机</text>
						<input class="fill-information-area-put" type="text" placeholder="请填写手机号" value="" v-model="phone"/>
					</view>
					<view class="fill-information-local">
						<text class="fill-information-area-title color-purple">来访备注</text>
						<textarea class="fill-information-area-text" name="" id="" placeholder="请描述来访目的" v-model="why"></textarea>
					</view>
					<view class="fill-information-local">
						<text class="fill-information-area-title color-purple">上传图片</text>
						<view class="upload-pictures">
							<view class="pload-pictures-picture" v-for="(image,index) in imageList" :key="index">
								<image class="pload-pictures-img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
							<view class="upload-pictures-icon" @tap="chooseVideoImage"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="fill-information-btn">
				<button class="fill-information-submit" @tap="btnVisit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '../../components/common/common.js'
export default{
	data() {
		return {
			username:'',
			phone:'',
			why:'',
			imageList:[],
			imageFile:'',
		}
	},
	methods:{
		chooseVideoImage(){
		    uni.showActionSheet({
		        // title:"选择上传类型",
		        itemList: ['图片'],
		        success: (res) => {
		            // console.log(res)
		            // if(res.tapIndex == 0){
		                this.chooseImages()
		            // } else {
		            //     this.chooseVideo()
		            // }
		        }
		    })
		},
		chooseImages:async function(){
			if (this.imageList.length === 1){
				let isContinue = await this.isFullImg();
				console.log("是否继续?", isContinue);
				if (!isContinue) {
					return;
				}
			}
		    // 上传图片
		    uni.chooseImage({
		        count: 1, 
		        // sizeType: ['original', 'compressed'],
		        sourceType: ['album','camera'], 
		        success:(res)=> {
					this.imageFile = res.tempFilePaths;
		            this.imageList = this.imageList.concat(res.tempFilePaths);
		        },
		    });
		},
		isFullImg: function() {
			return new Promise((res) => {
				uni.showModal({
					content: "已经有1张图片了,是否清空现有图片？",
					success: (e) => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false)
						}
					},
					fail: () => {
						res(false)
					}
				})
			})
		},
		previewImage: function(e) {
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.imageList
			})
		},
		// 提交
		btnVisit(){
			const renId = uni.getStorageSync('renId');
			uni.showLoading({
				title: "正在提交数据..",
				mask:true
			});
			uni.uploadFile({
				url:'http://122.114.120.6:3000/identity/student/visitRegistration?renId='+renId+'&username='+this.username+'&phone='+this.phone+'&why='+this.why,
				filePath: this.imageFile[0],
				name:'file',
				formData: {
					'user': 'test'
				},
				success:res =>{
					var data = JSON.parse(res.data)
					uni.hideLoading();
					if(data.code == 100){
						uni.showToast({title: '提交成功',icon: 'none'});
						uni.navigateTo({url: '../index/index'});
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
	.fill-information-head{
		text-align: center;
	}
	.fill-information-lg{
		width:100upx;
		height:100upx;
	}
	// 输入框区域
	.fill-information-area{
		width:100%;
		height:60upx;
		margin:10upx 0;
		line-height:60upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.fill-information-local{
		width:95%;
		// height:60upx;
		margin:10upx 0;
		line-height:60upx;
	}
	.fill-information-area-title{
		font-size:40upx;
		margin-left: 24upx;
	}
	.fill-information-area-put{
		height:100%;
		margin-left: 30upx;
		padding-left:15upx;
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
	.upload-pictures-icon{
		width:110upx;
		height:110upx;
		position: relative;
	}
	.upload-pictures-icon:before{
	    content: " ";
	    position: absolute;
	    width:110upx;
	    height:110upx;
		background:url(../../static/icon/xiangji.png) no-repeat;
		background-size:100% 100%;
	}
</style>
