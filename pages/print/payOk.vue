<template>
	<view class="content">
		<view class="pay-ok">
			<image src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image>
			<view>支付完成</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
page {
	background-color: $color-f8;
}
.content {
	@include center;
	& .pay-ok{
		margin-top: 40%;
		image{
			@include w-h(164upx,164upx);
		}
		view{
			width: 100%;
			margin-top: 30upx;
			text-align: center;
			@include font-no-height(30upx, 500, $color-33);
		}
	}
	
	
}
</style>
