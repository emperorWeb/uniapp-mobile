<template>
	<view class="personal">
		<view class="personal-outside">
			<!-- 头像 -->
			<view class="personal-portrait">
				<image class="portrait" :src="wechatFace.wechat_icon"></image>
			</view>
			<!-- 信息栏 -->
			<view class="personal-information">
				<!-- 姓名 -->
				<view class="information-layer">
					<view class="information-name information-icon"></view>
					<text class="information-sole">姓名</text>
					<text class="information-sole-call">{{basic.name}}</text>
				</view>
				<!-- 性别 -->
				<view class="information-layer">
					<view class="information-gender information-icon"></view>
					<text class="information-sole">性别</text>
					<image class="information-distinction-gender" :src="basic.sex"></image>
					<!-- <text class="information-sole-call">常山赵子龙</text> -->
				</view>
				<!-- 手机号绑定 -->
				<view class="information-layer information-average">
					<view class="information-sole-average">
						<view class="information-phone information-icon"></view>
						<text class="information-sole">手机号</text>
					</view>
					<text class="information-sole-call">{{basic.phone}}</text>
					<view class="information-binding" @click="bindingPhone "></view>
				</view>
				<!-- 微信号绑定 -->
				<view class="information-layer information-average">
					<view class="information-sole-average">
						<view class="information-wechat information-icon"></view>
						<text class="information-sole">微信绑定</text>
					</view>
					<input class="information-phone-pt" type="text" :placeholder="wechatFace.wechat_nick" value="">
					<view class="information-binding" @click="bindingWechat"></view>
				</view>
				<!-- 学号 -->
				<view class="information-layer">
					<view class="information-student information-icon"></view>
					<text class="information-sole">学号</text>
					<text class="information-sole-call">{{basic.studentId}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			wechatFace:'',
			basic:{
				name:'',
				phone:'',
				sex:'',
				studentId:''
			},
			bindPhone:'',
			bindWechat:''
		}
	},
	 onLoad:function (option) {
		 var openId = uni.getStorageSync('openId');
		 if(openId !== ''){
			 this.bindWechat = false;
			 uni.request({
				 url:'http://122.114.120.6:3000/admin/information/wechat',
				 header: {
				 	'content-type': 'application/x-www-form-urlencoded', 
				 },
				 data:{openId:openId},
				 method:'POST',
				 dataType:'json',
				 success:res =>{
					 this.wechatFace = res.data[0];
					 console.log(res.data[0])
				 }
			 })
		 }else{
			 this.bindWechat =  true;
		 }
		this.information();
	},
	methods:{
		information(){
			var renId = uni.getStorageSync('renId')
			var Identity = uni.getStorageSync('Identity');
			uni.request({
				url:'http://122.114.120.6:3000/admin/information/personal',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{Identity:Identity,renId:renId},
				method:'POST',
				dataType:'json',
				success:res =>{
					var data = res.data[0];
					if(Identity == 1){
						this.basic.name = data.student_name;
						this.basic.phone = data.student_sj;
						this.basic.studentId = data.student_no;
						if(data.student_sex == 1){
							this.basic.sex = '../../static/nine/man.png'
						}else{
							this.basic.sex = '../../static/nine/woman.png'
						}
					}else if(Identity == 2){
						this.basic.name = data.worker_name;
						this.basic.phone = data.worker_sj;
						this.basic.studentId = data.worker_no;
						if(data.worker_sex ==1){
							this.basic.sex = '../static/nine/man.png'
						}else{
							this.basic.sex = '../static/nine/woman.png'
						}
					}
					if(this.basic.phone == ''){
						this.bindPhone = true
					}else{this.bindPhone = false}
				}
			})
		},
		bindingPhone(){
			if(this.bindPhone == true){
				uni.navigateTo({
					url:'../phone-binding/phone-binding'
				})
			}else{
				uni.showToast({
					title:'您已验证，禁止使用',
					icon:'none'
				})
			}
		},
		bindingWechat(){
			if(this.bindWechat == true){
				// 获取微信接口数据
			}else{
				uni.showToast({
					title:'您已验证，禁止使用',
					icon:'none'
				})
			}
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color:#00a3e8,
	}
	.personal-outside{
		width:95%;
		margin:200upx auto;
		background:#fff;
		border-radius: 15upx;
		padding:25upx 0 200upx;
		box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.personal-portrait{
		width:100%;
		height:130upx;
		position: relative;
	}
	.portrait{
		width:200upx;
		height:200upx;
		position:absolute;
		top:-100upx;
		left:50%;
		margin-left:-100upx;
		border-radius: 50%;
	}
	.information-layer{
		width:90%;
		height:70upx;
		line-height: 70upx;
		margin:40upx auto 0;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.information-sole-average{
		height:70upx;
		line-height: 70upx;
		display:flex;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.information-average{
		justify-content:space-between !important;
	}
	.information-icon{
	    width:70upx;
	    height:70upx;
	    position: relative;
	}
	.information-icon:before{
	    content: " ";
	    position: absolute;
	    width:70upx;
	    height:70upx;
	}
	.information-name:before{
		background:url(../../static/nine/xinmin.png) no-repeat;
		background-size:100% 100%;
	}
	.information-sole{
		color:#000;
		font-size:40upx;
		margin-left:25upx;
		font-weight: 700;
	}
	.information-sole-call{
		margin-left:30upx;
		color:#b3b3b3;
		font-size:32upx;
	}
	.information-gender:before{
		background:url(../../static/nine/xinbie.png) no-repeat;
		background-size:100% 100%;
	}
	.information-distinction-gender{
		width:50upx;
		height:70upx;
		margin-left:100upx;
	}
	.information-phone{
		background:url(../../static/nine/bangding.png) no-repeat;
		background-size:100% 100%;
	}
	.information-binding{
		width:80upx;
		height:40upx;
		margin:15upx 0 0;
		background:url(../../static/nine/binding.png) no-repeat;
		background-size:100% 100%;
	}
	.information-wechat{
		background:url(../../static/nine/wei.png) no-repeat;
		background-size:100% 100%;
	}
	.information-phone-pt{
		height:65upx;
		width:230upx;
		// margin-left:15upx;
	}
	.information-student{
		background:url(../../static/nine/xuehao.png) no-repeat;
		background-size:100% 100%;
	}
</style>
