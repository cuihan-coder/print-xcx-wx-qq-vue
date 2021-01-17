<template>
	<view>
		<view class="height-pad"></view>
		<view class="heji">
			<view class="heji-left">
				<text>共{{pageNum}}面</text>
				<text>合计：</text>
				<text>{{orderMoney}}元</text>
			</view>
			<view class="heji-right" @click="paySub">支付并打印</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "footerCount",
		props:{
			orderMoney:{
				type:[String,Number],
				default:0
			},
			pageNum:{
				type:[String,Number],
				default:0
			}
		},
		methods:{
			paySub(){
				uni.$emit('paySub')
			}
		}
	}
</script>

<style lang="scss">
	.height-pad{
		width: 100%;
		height: 100upx;
	}
	 .heji{
		@include display-flex-space-between;
		width: 100%;
		height: 87upx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 2;
		
		.heji-left{
			width: 60%;
			height: 100%;
			padding-left: 40upx;
			@include item-center;
			background: $color-ff;
			text:nth-child(1){
				@include font-no-height(28upx, 400, $color-66);
			}
			text:nth-child(2){
				padding: 0 6upx;
				@include font-no-height(32upx, 400, $color-00);
			}
			text:nth-child(3){
				@include font-no-height(32upx, bold, $color-FF4646);
			}
		}
		.heji-right{
			width: 40%;
			height: 100%;
			display: grid;
			justify-content: center;
			align-items: center;
			background: $color-FF4646;
			@include font-no-height(30upx, 500, $color-ff);
		}
		
	}
</style>
