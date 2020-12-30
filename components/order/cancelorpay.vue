<template>
	<view class="cancelorpay">
		<view>取消订单</view>
		<view>立即支付</view>
	</view>
</template>

<script></script>

<style lang="scss">
.cancelorpay{
	@include display-flex-end;
	margin-top: 40upx;
	padding-top: 32upx;
	border-top: 2upx solid $color-f1;
	view:nth-child(1){
		@include font-no-height(28upx, 500, $color-78);
	}
	view:nth-child(2){
		width: 184upx;
		line-height: 65upx;
		margin-left: 42upx;
		border: 3upx solid $color-1668FF;
		border-radius: 33upx;
		@include font-no-height(28upx, 500, $color-1668FF);
		text-align: center;
	}
}
</style>
