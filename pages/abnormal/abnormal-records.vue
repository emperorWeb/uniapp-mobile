<template>
	<view class="abnormal-records">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/icon/chr.png"></image>
				<view class="identify-icon-text">异常记录</view>
			</view>
		</view>
		<view class="find">
			<input class="find-put" type="text" placeholder="请输入学号" value="pass" v-model="studentsId"/>
			<button class="btn-find" @tap="students_abnormal">查询</button>
		</view>
		<view class="records-article">
			<view class="article" v-for="(item,index) in list" :key="index">
				<text class="article-information information-one">{{item.abnormal}}</text>
				<text class="article-information information-two">日期：{{item.come_time | datetimeFilter}}</text>
			</view>
		</view> 
	</view>
</template>

<script>
export default{
	data() {
		return {
			studentsId:'',
			list:[]
		}
	},
	methods:{
		students_abnormal(){
			uni.request({
				url:'http://122.114.120.6:3000/identity/administrator/elders',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{studentsId:this.studentsId},
				method:'POST',
				dataType:'json',
				success:res =>{
					if(res.data.code == 200){
						uni.showToast({
							title: '无不正常记录',
							icon: 'none'
						});
					}else{
						var ince = res.data;
						for(var i=0;i<ince.length;i++){
							if(ince[i].abnormal == 1){
								ince[i].abnormal ='早出'
							}else if(ince[i].abnormal == 2){
								ince[i].abnormal ='晚归'
							}else if(ince[i].abnormal == 3){
								ince[i].abnormal ='早彻夜未归'
							}else if(ince[i].abnormal == 4){
								ince[i].abnormal ='一周无通行'
							}
						}
						this.list = this.list.concat(ince);
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
	.find{
		width:90%;
		height:80upx;
		margin:20upx auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
	}
	.find-put{
		width:70%;
		background:#fff;
		height:80upx;
		padding-left:15upx;
		border-radius: 10upx;
	}
	.btn-find{
		line-height: 80upx;
		height:80upx;
		color:#fff;
		font-size:40upx;
		background: -webkit-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: -moz-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: -o-linear-gradient(left,#3be1be 0,#1781d7 100%);
		background: linear-gradient(to left,#3be1be,#1781d7 100%);
	}
	.article{
		width:95%;
		height:80upx;
		margin:20upx auto;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
		background-color:#fff;
		line-height:80upx;
		border-radius: 15upx;
	}
	.article-information{
		font-size: 36upx;
		color:#000000;
	}
	.information-one{margin-left:20upx;}
	.information-two{margin-right:20upx;}
</style>
