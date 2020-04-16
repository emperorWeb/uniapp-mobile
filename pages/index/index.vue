<template>
	<view class="mpvue-picker">
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#FFF" class="carousel">
			<swiper-item v-for="(item,index) in info" :key="index">
				<image class="sw-img" :src="item.content"></image>
			</swiper-item>
		</swiper>
		<!-- 九宫格 -->
		<view class="gongge">
			<view class="long_ge">
				<view class="gongge-text" v-for="(item, index) in list" :key="index" @click="scratchable(index)">
					<image class="gongge_img" :src="item.url"></image>
					<view class="gongge_name">{{ item.text }}</view>
				</view>
			</view>
		</view>
		<!-- 底部校园新闻栏 -->
		<view class="content-module">
			<view class="content-level" v-for="(item,index) in part" :key='index' @tap="btnDepar(index)">
				<image :src="item.college_pic"></image>
				<view class="level-name black-color">{{item.college_name}}</view>
			</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
</template>

<script>
import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
export default {
	components: {
		mpvuePicker
	},
	data() {
		return {
			// 轮播图
			info: [],
			// 九宫格
			list: [],
			// title: 'nav-city-dropdown',
			pickerValueArray: [
				{
					label: '龙子湖校区',
					value: 5
				},
				{
					label: '北林校区',
					value: 2
				},
				{
					label: '英才街校区',
					value: 3
				}
			],
			themeColor: '#007AFF',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			part: [],
			campus:{
				sid:'',
				campusName:''
			}
		};
	},
	onLoad:function(){
		this.shuffling();
		this.forever();
	},
	onReady() {
		this.setStyle(1, '选择校区');
		if(this.campus.sid == ''){
			uni.showModal({
			    title: '提示',
			    content: '请选择校区',
			    success: function (res) {}
			});
		}
	},
	methods: {
		// 轮播图
		shuffling(){
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/shuffling',
				method:'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				dataType:'json',
				success:res =>{
					this.info.push({content:res.data[0].ad_pic1},{content:res.data[0].ad_pic2},{content:res.data[0].ad_pic3},{content:res.data[0].ad_pic4});
					this.info = this.info.map(info => {
						info.content = info.content.replace(/../,'http://zhxy.kezhuangyuan.com')
						return info;
					})
					// console.log(this.info)
				}
			})
		},
		// 页面加载前请求数据
		forever(){
			const Identity = uni.getStorageSync('Identity');
			if(Identity == ''){
				var list = [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					}
				]
				this.list = list
			}else if(Identity == 4){//公众，只有微信登录
				var list = [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					}
				]
				this.list = list
			}else if(Identity == 1){//学生
				uni.setNavigationBarTitle({
					title:'学生'
				});
				var list = [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					},{
						url: '../../static/nine/churu.png',
						text: '出入记录',
						badge: '4'
					},{
						url: '../../static/nine/mima.png',
						text: '修改密码',
						badge: '5'
					},{
						url: '../../static/nine/shenpi.png',
						text: '主动申请',
						badge: '6'
					},{
						url: '../../static/nine/jiaren.png',
						text: '家人来访',
						badge: '7'
					},{
						url: '../../static/nine/xiuli.png',
						text: '宿舍报修',
						badge: '8'
					},{
						url: '../../static/nine/jindu.png',
						text: '申请进度',
						badge: '9'
					}
				]
				this.list = list
			}else if(Identity == 2){//宿管
				uni.setNavigationBarTitle({
					title:'宿管'
				});
				var list = [
					{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					},{//看所有学生的出入记录情况
						url: '../../static/nine/churu.png',
						text: '出入记录',
						badge: '144'
					},{
						url: '../../static/nine/mima.png',
						text: '修改密码',
						badge: '5'
					},{
						url: '../../static/nine/xiuli.png',
						text: '宿舍报修',
						badge: '12'
					}
				]
				this.list = list
			}else if(Identity == 3){//辅导员
				uni.setNavigationBarTitle({
					title:'辅导员'
				});
				var list = [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					},{//学生的出入记录页面
						url: '../../static/nine/churu.png',
						text: '出入记录',
						badge: '14'
					},{
						url: '../../static/nine/mima.png',
						text: '修改密码',
						badge: '5'
					},{
						url: '../../static/nine/buzai.png',
						text: '不在寝情况',
						badge: '15'
					},{
						url: '../../static/nine/tingx.png',
						text: '异常通行',
						badge: '16'
					},{
						url: '../../static/nine/tongji.png',
						text: '数据统计',
						badge: '13'
					}
				]
				this.list = list
			}else if(Identity == 5){//家长
				uni.setNavigationBarTitle({
					title:'家长'
				});
				var list = [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					},{
						url: '../../static/nine/mima.png',
						text: '修改密码',
						badge: '5'
					},{//家长看孩子的
						url: '../../static/nine/tingx.png',
						text: '异常通行',
						badge: '17'
					},{
						url: '../../static/nine/tongji.png',
						text: '数据统计',
						badge: '13'
					}
				]
				this.list = list
			}else if(Identity == 6){//学生处
				uni.setNavigationBarTitle({
					title:'学生处'
				});
				var list= [
					{
						url: '../../static/nine/jieshao.png',
						text: '院系介绍',
						badge: '0'
					},{
						url: '../../static/nine/dongtai.png',
						text: '校园动态',
						badge: '1'
					},{
						url: '../../static/nine/tongzhi.png',
						text: '通知公告',
						badge: '2'
					},{
						url: '../../static/nine/ziliao.png',
						text: '个人资料',
						badge: '3'
					},{
						url: '../../static/nine/mima.png',
						text: '修改密码',
						badge: '5'
					},{//学生处看所有
						url: '../../static/nine/churu.png',
						text: '出入记录',
						badge: '18'
					},{//学生处审批
						url: '../../static/nine/shenpi.png',
						text: '学生申请',
						badge: '19'
					},{
						url: '../../static/nine/tongji.png',
						text: '数据统计',
						badge: '13'
					}
				]
				this.list = list
			}
			
		},
		// 九宫格导航{
		scratchable(e) {
			console.log(this.list[e].badge)
			if(this.list[e].badge == 0){//院系介绍
				uni.navigateTo({
					url:'../introduce/introduce'
				})
			}else if(this.list[e].badge == 1){//校园动态
				uni.navigateTo({
					url:'../campus-dynamic/campus-dynamic'
				})
			}else if(this.list[e].badge == 2){//通知公告
				uni.navigateTo({
					url:'../announcements/announcements'
				})
			}else if(this.list[e].badge == 3){//个人资料
				uni.navigateTo({
					url:'../personal/personal'
				})
			}else if(this.list[e].badge == 4){//修改密码
				uni.navigateTo({
					url:'../abnormal/access_record'
				})
			}else if(this.list[e].badge == 5){//出入记录
				uni.navigateTo({
					url:'../change-pwd/change-pwd'
				})
			}else if(this.list[e].badge == 6){//主动申请
				uni.navigateTo({
					url:'../abnormal/application'
				})
			}else if(this.list[e].badge == 7){//家人来访
				uni.navigateTo({
					url:'../visit-registration/visit-registration'
				})
			}else if(this.list[e].badge == 8){//宿舍报修
				uni.navigateTo({
					url:'../dormitory-service/dormitory-service'
				})
			}else if(this.list[e].badge == 9){//申请进度
				uni.navigateTo({
					url:'../progress/progress'
				})
			}else if(this.list[e].badge == 10){//异常通行
				uni.navigateTo({
					url:'abnormal/abnormal-records'
				})
			}else if(this.list[e].badge == 11){//数据统计
				uni.navigateTo({
					url:'../data-statistics/data-statistics'
				})
			}else if(this.list[e].badge == 12){//数据统计
				uni.navigateTo({
					url:'../tube-approval/tube-apprival'
				})
			}else if(this.list[e].badge == 13){//数据统计
				uni.navigateTo({
					url:'../data-statistics/data-statistics'
				})
			}else if(this.list[e].badge == 14){//辅导员看学生的通行记录
				uni.navigateTo({
					url:'../administrator-access-records/administrator-access-records?identityName=14'
				})
			}else if(this.list[e].badge == 144){
				uni.navigateTo({
					url:'../administrator-access-records/administrator-access-records?identityName=144'
				})
			}else if(this.list[e].badge == 18){
				uni.navigateTo({
					url:'../administrator-access-records/administrator-access-records?identityName=18'
				})
			}else if(this.list[e].badge == 15){//未在寝人数统计
				uni.navigateTo({
					url:'../not-bedroom/not-bedroom'
				})
			}else if(this.list[e].badge == 16){
				uni.navigateTo({
					url:'../abnormal/abnormal-traffic'
				})
			}else if(this.list[e].badge == 17){//家长看孩子的异常
				uni.navigateTo({
					url:'../abnormal/abnormal-records'
				})
			}else if(this.list[e].badge == 19){//家长看孩子的异常
				uni.navigateTo({
					url:'../school-batck/school-batch'
				})
			}
		},
		onCancel(e) {
			console.log(e);
		},
		// 单列
		showSinglePicker() {
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			// console.log(e.label+e.value);
			this.setStyle(e.value, e.label);
			this.campus.sid =e.value;
			 this.campus.campusName = e.label;
		},
		/**
		 * 修改导航栏buttons
		 * index[number] 修改的buttons 下标索引，最右边索引为0
		 * text[string] 需要修改的text 内容
		 */
		setStyle(index, text) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			if (text.length > 4) {
				text = text.substr(0, 4) + '...';
			}
			// #ifdef APP-PLUS
			let currentWebview = page.$getAppWebview();
			let titleNView = currentWebview.getStyle().titleNView;
			// 添加文字过长截取为3个字符，请根据自己业务需求更改
			titleNView.buttons[0].text = text;
			currentWebview.setStyle({
				titleNView: titleNView
			});
			// #endif
			// #ifdef H5
			// h5 临时方案
			document.getElementsByClassName('uni-btn-icon')[2].innerText = text;
			// #endif
			// 下部新闻内容
			var attributeId = index;
			// var attributeName = text;
			uni.request({
				url:'http://122.114.120.6:3000/admin/notice/indexIntroduce',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{attributeId:attributeId},
				method:'POST',
				dataType:'json',
				success:res =>{
					this.part = res.data;
					this.part = this.part.map(part => {
						part.college_pic = part.college_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
						return part;
					})
				}
			})
		},
		// 底部校园新闻通知公告跳转详情
		btnDepar(e){
			var badge = this.part[e].id
			console.log()
			uni.navigateTo({
				url:'../details-page/details?badge='+badge
			})
		}
	},
	onBackPress() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
		}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 1) {
			this.showSinglePicker();
		}else {
			const Identity = uni.getStorageSync('Identity');
			// console.log(nameId)
			// 点击导航我的，页面跳转
			if(Identity == ''){
				//登录页面
				uni.navigateTo({
					url:'../public/login'
				})
			}else{
				// 跳转到个人信息页
				uni.navigateTo({
					url:'../personal/personal?Identity='+Identity,
				})
			}
			
		}
	},
};
</script>

<style lang='scss'>
	.carousel{
		width:100%;
		height:440upx;
	}
	.sw-img{
		width:750upx;
		height:440upx;
	}
	
	/* .example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	} */

	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}
	/* .example-body {
		flex-direction: column;
		padding: 10px;
		background-color: #ffffff;
	}
 */
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.image {
		width: 120rpx;
		height: 120rpx;
	}

	.text {
		font-size: 36rpx;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		/* position: relative;
*/
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px 0;
	}
	
	.gongge{
		width:100%;
		padding-bottom:30upx;
	}
	.long_ge{
	    width:100%;
	    display:flex;
	    flex-wrap: wrap;
	    /* justify-content: space-between; */
	}
	.gongge-text{
		width:25%;
		text-align:center;
	}
	.gongge_img{
		width:140upx;
		height:140upx;
		margin:30upx auto 0;
	}
	
	.content-module{
	    width:100%;
	    display:flex;
	    flex-wrap: wrap;
	    /* justify-content: space-around; */
	}
	.content-level{
	    width:45%;
	    height:8rem;
	    margin:10px 0 0 3%;
	}
	.content-level image{
	    width:100%;
	    height:6rem;
	    box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.level-name{
	    height:2rem;
	    line-height:2rem;
	    text-align:center;
	    font-size:18px;
		overflow: hidden;    
		text-overflow:ellipsis;    
		white-space: nowrap;
	}
</style>
