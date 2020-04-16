<script>
	global.isLogin = function (){
		try{
			var nameId = uni.getStorageSync('nameId');
			var passWord = uni.getStorageSync('passWord');
		}catch(e){
			
		}
		if(nameId == '' || passWord == ''){
			return false;
		}else{
			return [nameId,passWord]
		}
	}
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
