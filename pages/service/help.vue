<template>
	<view class="content">
		<view class="voucher-cont">
			<text class="title">QQ文档如何分享到微信</text>
			<image src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	async onLoad() {
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
	& .voucher-cont {
		@include display-flex-space-between;
		padding: 47upx 60upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(30upx, 500, $color-33);
		}
		image {
			padding-left: 20upx;
			@include w-h(25upx, 25upx);
		}
		
	}
}
</style>
