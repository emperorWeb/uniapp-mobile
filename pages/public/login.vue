<template>
	<view class="content">
		<page-logo></page-logo>
		<view class="login-user">
			<view class="login-piece white-block">
				<navigator url="../registered/registered"><view class="jump">注册</view></navigator>
				<view class="piece-one">
					<view class="login-name">
						<view class="name-portrait"></view>
						<input class="name-put" type="text" placeholder="请输入手机号" value="user" v-model="uname"/>
					</view>
					<view class="login-name">
						<view class="password-portrait"></view>
						<input class="name-put"  password="true" type="text" placeholder="请输入密码" value="pass" v-model="passw"/>
					</view>
					<view class="login-name">
						<view class=" mui-input-row mui-checkbox ">
				            <!-- <input id="chkRem" type="checkbox" checked="checked" class="RememberCheck"  @change="checkboxChange" /> -->
				            <checkbox-group @change="checkboxChange">
				                <checkbox id="chkRem" type="checkbox" :checked="rememberPsw" @tap="rememberPsw = !rememberPsw" class="RememberCheck">
				                    记住密码
				                </checkbox>
				                <view class="RememberPass forget-right" @click="forgat">记住密码?</view>
				            </checkbox-group>
				        </view>
						
					</view>
					<view class="login-name">
						<button class="btn" @tap="lands">登录</button>
					</view>
					<view class="login-name wachat">
						<view class="chat" @click="checkAuth"></view>
					</view>
				</view>
			</view>
			<view class="copyright white-color">郑州科壮元信息技术有限公司</view>
		</view>
	</view>
	
</template>

<script>
import pageLogo from '../../components/logo/logo.vue';
import '../css/common-user.css';
	export default {
		components:{
			'page-logo':pageLogo
		},
		data() {
			return {
				title:'',
				uname: '',
				passw: '',
				rememberPsw: true,
			}
		},
		// 页面初始加载
		mounted(){
			// let that = this;
			
	        //缓存的账号
	        const nameID = uni.getStorageSync('nameId');
	        //缓存的密码
	        const passWord = uni.getStorageSync('passWord');
	        //有缓存就赋值给文本没有就清空
	        if (nameID && passWord) {
	           this.uname = nameID;
	            this.passw = passWord;
	        } else {
	            this.uname = '';
	            this.passw = '';
	        }
		},
		methods:{
			lands() {
				if (this.uname.length <= 0 || this.passw.length <= 0) {
				    uni.showToast({
				       title: '账号或密码不能为空',
				       icon: 'none'
				     });
				      return;
				 } else {
				    var uname = this.uname;
					var passw = this.passw;
				   	uni.request({
						url:'http://122.114.120.6:3000/admin/login',
						header: {
							'content-type': 'application/x-www-form-urlencoded', 
						},
						data:{
							uname:uname,
							passw:passw
						},
						method:'POST',
						dataType:'json',
						success:res =>{
							if(res.data.code == 0){
								uni.showToast({
							       title: '用户名或密码不正确',
							       icon: 'none'
								});
								return;
							}else{
								var username = res.data[0].username;
								var Identity = res.data[0].fk_roletype;
								var openId = res.data[0].fk_wxopenid;
								var renId = res.data[0].fk_renid;
								if(this.rememberPsw){
									// 存
									uni.setStorageSync('nameId',username);
									uni.setStorageSync('Identity',Identity);
									uni.setStorageSync('openId',openId);
									uni.setStorageSync('renId',renId)
									uni.redirectTo({
										url: '../index/index'
									});
								}
							}
						}
				})
				}
			},
			//复选框
	        checkboxChange: function(e) {
	            if (e.detail.value.length == 1) {
	                //获取缓存的账号
					uni.setStorageSync('nameId',this.uname);
					uni.setStorageSync('passWord',this.passw)
	                uni.getStorageSync('nameID');
	                uni.getStorageSync('passWord');
	            } else {
	                  uni.removeStorageSync('nameID');
	                  uni.removeStorageSync('passWord');              
	            }
	        },
			// app微信登录
			checkAuth:function() {
				uni.getProvider({
					service: 'oaut',
					success:function(res){
						consoe.log(res.procider);
						if(res.provider.indexOf(weixin)){
							uni.login({
								provider:'weixin',
								success(res) {
									// 方案一
									uni.getUserInfo({
										provider:'weixin',
										success:function(infoRes){
											console.log(JSON.stringify(infoRes))
										}
									})
									// 方案二
									// let data = {}
									// data = {code:re.code}
									// data = {
									// 	type:1,
									// 	access_token:res.authResult.access_token,
									// 	openid: res.authResult.openid
									// }
									// res.code && PostactivityAppleftLogin(data).then(function (e){
									// 	if(e.access_token) {
									// 		uni.setStorageSync('access_token',e.access_token)
									// 		uni.setStorageSync('user',e.user)
									// 		resolve()
									// 	}
									// })
								},
								fail(err){
									reject()
									uni.showToast({
										icon:'none',
										title:'授权失败!'
									})
									uni.hideLoading()
								}
							});
						}
					}
				})
			},
			// 忘记密码
			forgat:function(){
				uni.redirectTo({
					url: '../forgot-password/forgot-password'
				});
			}
		},
	}
</script>

<style lang='scss'>
	/* 背景 */
	page {
		background:url(../../static/nine/back03.jpg) no-repeat;
		    background-size:cover;
	}
	/* .login-user{
	    margin-top:5%;
	} */
	.white-block{
	  width:92%;
	  background:#fff;
	  margin:0 auto 10px;
	  border-radius:10px;
	  box-shadow: rgba(0,0,0,0.1) 0px 15px 35px 0px, rgba(0,0,0,0.07) 0px 3px 10px 0px;
	}
	.login-piece{
	    padding-bottom:3upx;
	}
	.jump{
	    float:right;
	    margin:20px 25px 0 0;
	    font-size:16px;
	}
	.piece-one{
	    padding-top:70px;
	}
	.login-name{
	    width:80%;
	    margin:0 auto 32px;
	    font-size:16px;
	}
	.name-portrait{
	    width:40upx;
	    height:50upx;
	    position: relative;
	}
	.name-portrait:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:50upx;
		top:50%;
		margin-top:25upx;
	    background:url(../../static/number.png) no-repeat;
	    background-size:100% 100%;
	}
	.name-put{
	    width:90%;
	    height:50upx;
	    padding-left:60upx;
	}
	.password-portrait{
	    width:40upx;
	    height:50upx;
	    position: relative;
	}
	.password-portrait:before{
	    content: " ";
	    position: absolute;
	    width:40upx;
	    height:50upx;
		top:50%;
		margin-top:25upx;
	    background:url(../../static/password.png) no-repeat;
	    background-size:100% 100%;
	}
	.keep-left{
	    float:left;
	}
	.keep-left>input{
	    vertical-align:middle;
	}
	.forget-right{
	    float:right;
	}
	.wachat{
	    height:60upx;
	    margin-top:-20upx;
	}
	.chat{
	    width:70upx;
	    height:60upx;
	    position: relative;
	    left:50%;
	    margin-left:-35upx;
	}
	.chat:before{
	    content: " ";
	    position: absolute;
	    width:70upx;
		height:60upx;
	    background:url(../../static/weixin.png) no-repeat;
	    background-size:100% 100%;
	}
</style>
