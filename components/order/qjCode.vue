<template>
	<view class="qjcode">
		<view>到店取件码</view>
		<view>{{receive_code}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			receive_code:{
				type:String,
				default:''
			}
		}
	}
</script>

<style lang="scss">
.qjcode{
	margin-top: 40upx;
	padding-top: 32upx;
	border-top: 2upx solid $color-f1;
	view:nth-child(1){
		@include font-no-height(30upx, 500, $color-33);
	}
	view:nth-child(2){
		@include font-no-height(80upx, 500, $color-33);
		letter-spacing: 15upx;
		text-align: center;
	}
}
</style>
