<template>
	<view class="bedroom">
		<view>
			<!-- 图标-->
			<view class="identify-icon">
				<image class="identify-icon-lg" src="../../static/nine/suguan.png"></image>
				<view class="identify-icon-text">未在寝人数统计</view>
			</view>
		</view>
		<view class="bedroom-statistical">
			<view class="fill-information-white" v-for="(item, index) in resultslist" :key="index">
				<view class="night-back-title">
					<text class="night-back-grade tiny-purple">{{item.class_name}}</text>
					<view class="tiny-purple digital-statistical">
						共
						<text class="digital-orange">{{item.totai}}</text>人
						<text style="margin-left:10upx;" class="digital-red">{{item.countList}}</text>
						人未在寝
					</view>
				</view>
				<view class="display-wall">
					<text class="display-wall-name" v-for="(orders, index) in resultslist[index].num" :key="index">{{orders.student_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var _self;
export default {
	data() {
		return {
			list:[],
			listg:[],
			lop:[],
			personnelList:[],
			resultslist:[]
		}
	},
	onLoad:function(){
	  _self = this;
	  this.bedroomBefore();
	},
	methods:{
		bedroomBefore: function(){
			const nameId = uni.getStorageSync('nameId');
			uni.showNavigationBarLoading();
			uni.request({
			   url:'http://122.114.120.6:3000/identity/teacher/bedroom',
			   header: {
			   	'content-type': 'application/x-www-form-urlencoded', 
			   },
				data:{nameId:nameId},
				method:'POST',
				dataType:'json',
				success: res =>{
					_self.list = res.data;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					this.number();
					this.personnel()
			    }
			});
		},
		number(){
			var totai = _self.list;
			for(var i=0;i<totai.length;i++){
				var id=totai[i].id;
				uni.request({
				   url:'http://122.114.120.6:3000/identity/teacher/number',
				   header: {
				   	'content-type': 'application/x-www-form-urlencoded', 
				   },
					data:{id:id},
					method:'POST',
					dataType:'json',
					success: res =>{
						_self.listg.push(res.data);
						var ha = []
						for(var i = 0;i<_self.list.length;i++){
							ha.push(Object.assign(_self.list[i],_self.listg[i]))
							_self.lop  = ha;
						}
				    }
				});
			}
		},
		personnel(){
			var totai = _self.list;
			const nameId = uni.getStorageSync('nameId');
			for(var i=0;i<totai.length;i++){
				var id=totai[i].id;
				uni.request({
					url:'http://122.114.120.6:3000/identity/teacher/personnel',
					header: {'content-type': 'application/x-www-form-urlencoded',},
					data:{id:id,nameId:nameId},
					method:'POST',
					dataType:'json',
					success: res =>{
						_self.personnelList.push({resList:res.data,countList:res.data.length});
						console.log(_self.personnelList)
						var hb = []
						for(var i = 0;i<_self.lop.length;i++){
							hb.push(Object.assign(_self.lop[i],_self.personnelList[i]))
							_self.resultslist = hb;
						}
					}
				})
			}
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
