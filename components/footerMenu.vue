<template>
	<view class="footer-menu">
		<view class="menu-icon"  @click="toPage('/pages/index/home')">
			<image src="http://qswy.com/static/xcximg/home_home_s@2x.png"></image>
			<view>首页</view>
		</view>
		<view class="menu-center">
			<image src="http://qswy.com/static/xcximg/home_saoyisao@2x.png"></image>
			<view>扫码打印</view>
		</view>
		<view class="menu-icon" @click="toPage('/pages/userModule/userInfo')">
			<image src="http://qswy.com/static/xcximg/home_me_s@2x.png"></image>
			<view>我的</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'footerMenu',
		methods:{
			toPage(url) {
				uni.reLaunch({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.footer-menu{
		
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
		.menu-icon{
			display: grid;
			align-content: center;
			height: 100%;
			image{
				@include w-h(39upx,39upx);
			}
			view{
				@include font-no-height(20upx, 400, $color-00);
			}
		}
		.menu-center{
			margin-top: -40upx;
			image{
				@include w-h(84upx,84upx);
			}
			view{
				@include font-no-height(20upx, 400, $color-00);
			}
		}
	}
</style>
