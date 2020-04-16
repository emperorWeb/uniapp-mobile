<template>
	<view class="night-back">
		<view class="fill-information-white">
			<view class="night-back-title">
				<text class="night-back-grade tiny-purple">{{class_name}}</text>
				<view class="tiny-purple digital-statistical">
					<text class="digital-red">{{totai}}</text>
					人{{exception_type}}
				</view>
			</view>
			<view class="display-wall">
				<text class="display-wall-name" v-for="(item, index) in list" :key="index">{{item.student_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			class_name:'',
			list:[],
			abnormal:'',
			totai:'',
			exception_type:''
		}
	},
	onLoad:function(options) {
		this.abnormal = JSON.parse(options.abnormal); 
		this.signature();
		if(this.abnormal == 1){
			this.exception_type = '彻夜未归';
			uni.setNavigationBarTitle({
				title:'彻夜未归'
			});
		}else if(this.abnormal == 2){
			this.exception_type = '晚归';
			uni.setNavigationBarTitle({
				title:'晚归'
			});
		}else if(this.abnormal == 3){
			this.exception_type = '早归';
			uni.setNavigationBarTitle({
				title:'早归'
			});
		}else if(this.abnormal == 4){
			this.exception_type = '一周无记录';
			uni.setNavigationBarTitle({
				title:'一周无记录'
			});
		}
	},
	methods:{
		signature(){
			const nameId = uni.getStorageSync('nameId');
			uni.request({
				url:'http://122.114.120.6:3000/identity/teacher/nightBack',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{nameId:nameId,abnormal:this.abnormal},
				method:'POST',
				dataType:'json',
				success:res =>{
					this.list = res.data;
					this.class_name = res.data[0].class_name;
					this.totai = res.data.length;
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
</style>
