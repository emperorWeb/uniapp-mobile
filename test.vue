<template>
    <view class="content">
        <!-- <image class="logo" src="../../static/logo.png"></image> -->
        <view class="titletal">
            <text class="title">{{ title }}</text>
        </view>
        <from name="from1">
            <!--账号-->
            <view class="inputView">
                <image class="nameImage" src="../../static/name.png"></image>
                <label class="loginLab">账号</label>
                <input
                    class="inputText"
                    type="text"
                    placeholder="请输入账号"
                    value="user"
                    v-model="uname"
                />
            </view>
        </from>
        <view class="line"></view>
        <!--密码-->
        <view class="inputView">
            <image class="keyImage" src="../../static/key.png"></image>
            <label class="loginLab">密码</label>
            <input
                class="inputText"
                password="true"
                type="text"
                placeholder="请输入密码"
                value="pass"
                v-model="passw"
            />
        </view>
        <!-- 记住密码 -->
        <view class=" mui-input-row mui-checkbox ">
            <!-- <input id="chkRem" type="checkbox" checked="checked" class="RememberCheck"  @change="checkboxChange" /> -->
            <checkbox-group @change="checkboxChange">
                <checkbox
                    id="chkRem"
                    type="checkbox"
                    :checked="rememberPsw"
                    @tap="rememberPsw = !rememberPsw"
                    class="RememberCheck"
                >
                    记住密码
                </checkbox>
                <!-- <lable for="chkRem" class="RememberPass">记住密码</lable> -->
            </checkbox-group>
        </view>

        <!--按钮-->
        <view class="loginBtnView"><button class="loginBtn" @tap="lands">登录</button></view>

 <!--背景图-->      

<!--  <image class="backlogo" src="../../static/BGNew.png"></image>-->
    </view>
</template>

<script>
var self;

var webapiaddress = null; //链接地址
export default {
    data() {
        lists: [], (self = this);
        return {
            title: '标题',
            uname: '',
            passw: '',
            rememberPsw: true
        };
    },
    //页面初始加载
    mounted() {
        let that = this;

        //缓存的账号
        const HCuname = uni.getStorageSync('HCuname');
        //缓存的密码
        const HCpassw = uni.getStorageSync('HCpassw');
        //         console.log(HCpassw+"缓存的密码")
        //         console.log(HCuname)
        //有缓存就赋值给文本没有就清空
        if (HCuname && HCpassw) {
            that.uname = HCuname;
            that.passw = HCpassw;
        } else {
            that.uname = '';
            that.passw = '';
        }
    },
    methods: {
        //             //用户名：
        //         nameChange:function(e){
        //             this.uname=e.traget.value
        //         },
        //         //密码：
        //         passChange:function(e){
        //             this.passw=e.traget.value
        //         },

        //登陆
        lands() {
            if (this.uname.length <= 0 || this.passw.length <= 0) {
                uni.showToast({
                    title: '账号或密码不能为空',
                    icon: 'none'
                });
                return;
            } else {
                let TFTwoName = this.uname.substring(0, 2);
                let TFLastName = this.uname.substring(2);
                let Passwd = this.passw;
          

                var that = this;
                //链接登录  （我这是两次，第一次获取链接地址，第二次才为登录 ）
                uni.request({
                    url: 'http链接地址',
                    success: res => {
                        var sabb = [];
                    
                        // console.log(webapiaddress+"链接地址")
                        //打印链接地址
                       

                       //这里是登录（你可以直接在这里进行操作你的登录链接上面的你要删除包含对应的括号）
                        var that = this;
                        uni.request({
                            url: '' + webapiaddress + '/api/User', //链接地址
                            data: {
                                strUser: TFLastName,
                                strPwd: Passwd
                            },
                            dataType: 'json',
                            success: res => {
                                //成功
                                if (res.data.IsSuccess == true) {
                                    
                                    //缓存账号和密码
                                    if (that.rememberPsw) {
                                        uni.setStorageSync('HCuname', that.uname);
                                        uni.setStorageSync('HCpassw', that.passw);
                                    } else {
                                        uni.removeStorageSync('HCuname');
                                        uni.removeStorageSync('HCpassw');
//                                         that.uname = '';
//                                         that.passw = '';
                                    }
                                    uni.navigateTo({
                                        url: '../index/index'
                                    });
                                } else {
                                    uni.showToast({
                                        title: '用户名或密码错误',
                                        icon: 'none'
                                    });
                                }
                            }
                        });
                    }
                });
            }
        },

        //复选框
        checkboxChange: function(e) {
        
            console.log(e.detail.value.length);
            if (e.detail.value.length == 1) {
    
                //获取缓存的账号
                 uni.getStorageSync('HCuname',this.uname);
                 uni.getStorageSync('HCpassw',this.passw);
            } else {
                  uni.removeStorageSync('HCuname');
                  uni.removeStorageSync('HCpassw');              
            }
        }
    }
};
</script>

<style>
</style>

<template>
	<view class="dynamic">
		<view class="introduce-title">校园动态</view>
		<view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in listData" :key="index" @tap="goDetail(index)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="item.dt_pic"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ item.dt_title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ item.dt_desc }}</text>
								<!-- <text>{{ item. }}</text> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
var _self,page = 1,timer = null;
export default{
	data() {
		return {
			listData: [],
			loadingText: '加载中...'
		}
	},
	onLoad:function(){
	  _self = this;
	  this.campus();
	    },
	onPullDownRefresh:function(){
	  this.campus();
	 },
	onReachBottom:function(){
	  if(timer != null){
	   clearTimeout(timer);
	  }
	  timer = setTimeout(function(){
	   _self.dynamic();
	  }, 1000);
	 },
	methods:{
		dynamic : function(){
			if(_self.loadingText != '' && _self.loadingText != '加载更多'){
			    return false;
			}
			_self.loadingText = '加载中...';
			uni.showNavigationBarLoading();
			uni.request({
				url:'http://localhost:3000/campusDynamic?page='+page,
				method:'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				dataType:'json',
				success:res =>{
					console.log(res.data)
					_self.loadingText = '';
					 if(res.data.code == 1){
						  uni.hideNavigationBarLoading();
						  _self.loadingText = '已加载全部';
						  return false;
					 }
					 page++;
					 var ince = res.data;
					 ince = ince.map(ince => {
					 	ince.dt_pic = ince.dt_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
					 	return ince;
					 })
					 _self.listData = _self.listData.concat(ince);
					 _self.loadingText = '加载更多';
					 uni.hideNavigationBarLoading();
				}
			})
		},
		campus : function(){
			page = 1;
			uni.showNavigationBarLoading();
			 uni.request({
			   url:'http://localhost:3000/campusDynamic?page='+page,
			   method:'POST',
			   header: {
			   	'content-type': 'application/x-www-form-urlencoded', 
			   },
			   dataType:'json',
			    success: res =>{
					 page++;
					 _self.listData = res.data;
					 _self.listData = _self.listData.map(listData => {
						listData.dt_pic = listData.dt_pic.replace(/../,'http://zhxy.kezhuangyuan.com')
						return listData;
					 })
					 console.log(_self.listData)
					 uni.hideNavigationBarLoading();
					 uni.stopPullDownRefresh();
					 _self.loadingText = '加载更多';
			    }
			});
		},
	}
}
</script>

<style>
	.introduce-title{
		width:100%;
		height:80upx;
		text-align: center;
		line-height:80upx;
		background:#f3f3f3;
	}
	.uni-list {
	    background-color: #FFFFFF;
	    position: relative;
	    width: 100%;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	}
	.uni-list-cell {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.uni-media-list {
	    padding: 11px 15px;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    width: 100%;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	}
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
		margin-right: 10px;
	}
	.uni-media-list-body {
	    height: auto;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	    -webkit-box-pack: justify;
		-webkit-justify-content: space-around;
		justify-content: space-around;
	    -webkit-box-align: start;
	    -webkit-align-items: flex-start;
	    align-items: flex-start;
	    overflow: hidden;
	}
	.uni-media-list-text-bottom{
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-pack: justify;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	}
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	
	.uni-media-list-text-top {
		width: 100%;
		height: 74upx;
		line-height: 18px;
		font-size: 28upx;
		overflow: hidden;
	}
	
	.uni-media-list-text-bottom {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		line-height: 15px;
		font-size: 13px;
		color: #8f8f94;
	}
	.loading{text-align:center; line-height:50px;}
</style>
