<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="banner[0].dt_pic"></image>
			<view class="banner-title">{{banner[0].dt_title}}</view>
		</view>
		<view class="article-meta">
			<text class="article-author">{{banner[0].dt_title}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner[0].dt_addtime | datetimeFilter}}</text>
		</view>
		<view class="article-content">
			<view class="content-title">{{banner[0].dt_desc}}</view>
		</view>
		<!-- #ifdef MP-WEIXIN || MP-QQ -->
		<!-- <ad v-if="htmlNodes.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad> -->
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [],
				parameter:''
			}
		},
		onLoad:function(option){
			this.parameter = option.badge;
			this.getDetail();
		},
		methods: {
			getDetail : function() {
				console.log(this.parameter)
				uni.request({
					url: 'http://122.114.120.6:3000/admin/notice/dynamicDeta',
					header: {
						'content-type': 'application/x-www-form-urlencoded', 
					},
					data:{parameter:this.parameter},
					method:'POST',
					dataType:'json',
					success: res => {
						console.log(res.data)
						this.banner = res.data;
						this.banner = this.banner.map(banner => {
							banner.dt_pic = banner.dt_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
							return banner;
						})
					},
					fail: () => {
						console.log('fail');
					}
				});
			}
		}
	}
</script>

<style>
	.banner {
		height: 400upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 30upx;
		line-height: 40upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
</style>

