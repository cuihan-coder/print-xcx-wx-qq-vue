<template>
	<view class="footer-menu">
		<view class="menu-icon" @click="toPage('/pages/index/home')">
			<image src="http://qswy.com/static/xcximg/home_home_s@2x.png"></image>
			<view>首页</view>
		</view>
		<view class="menu-center" @click="scanCode">
			<image src="http://qswy.com/static/xcximg/home_saoyisao@2x.png"></image>
			<view>扫码打印</view>
		</view>
		<view class="menu-icon" @click="toPage('/pages/userModule/userInfo')">
			<image src="http://qswy.com/static/xcximg/home_me_n@2x.png"></image>
			<view>我的</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'footerMenu',
	methods: {
		toPage(url) {
			uni.reLaunch({
				url: url
			});
		},
		scanCode() {
			let that = this;
			uni.scanCode({
				onlyFromCamera: true,
				scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
				success: async function(res) {
					that.$store.commit('SET_DEVICECODE', res.result);
					console.log(res.result)
					//获取分组价格以及设备信息
					let userInfo = await that.$helper._getCache('userInfo');
					let query = that.$helper.objToQuery({ device_code: that.$store.state.deviceCode, group_id: userInfo.group_id });
					let ret = await that.$helper.httpGet(that.$api.getDeviceGroupInfo_url_get + query);
					if (ret.state == 'success') {
						that.$store.commit('SET_DEVICEINFO', ret.data.deviceInfo);
						that.$store.commit('SET_GROUPINFO', ret.data.groupInfo);
						that.$store.commit('SET_PTPRICE', ret.data.ptPrice);
						that.$store.commit('SET_CZPRICE', ret.data.czPrice);
						//组ID与设备对应组ID不一致，则进行绑定设备对于的组ID，并且更新用户的组ID
						if (ret.data.token) {
							userInfo.group_id = ret.data.groupInfo.id;
							that.$helper._setCache('userInfo', userInfo);
							that.$helper._setCache('loginToken', token);
						}
					} else {
						uni.showToast({
							title: ret.msg,
							icon: 'none',
							duration: 3000
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.footer-menu {
	width: 100%;
	height: 98upx;
	position: fixed;
	bottom: 0;
	left: 0;
	background: $color-ff;
	display: flex;
	justify-content: space-around;
	align-content: center;

	z-index: 2;
	.menu-icon {
		display: grid;
		align-content: center;
		height: 100%;
		image {
			@include w-h(39upx, 39upx);
		}
		view {
			@include font-no-height(20upx, 400, $color-00);
		}
	}
	.menu-center {
		margin-top: -40upx;
		image {
			@include w-h(84upx, 84upx);
		}
		view {
			@include font-no-height(20upx, 400, $color-00);
		}
	}
}
</style>
