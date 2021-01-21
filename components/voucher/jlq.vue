<template>
	<view class="jlq">
		<view class="circle-top"></view>
		<view class="circle-down"></view>
		<view class="jlq-left">
			<view>{{ money }}</view>
			<view>奖励券</view>
		</view>
		<view class="jlq-right">
			<view>{{ useWhere }}</view>
			<view>
				<text>有效时间：</text>
				<text>{{ expireTime }}</text>
			</view>
			<view>使用范围：{{ cardType }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'jlq',
	props: {
		money: {
			type: [Number, String],
			default: 0
		},
		useWhere: {
			type: String,
			default: ''
		},
		expireTime: {
			type: String,
			default: ''
		},
		cardType: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss">
.jlq {
	position: relative;
	@include display-flex-start;
	height: 200upx;
	margin-bottom: 30upx;
	background: $color-ff;
	box-shadow: 0px 10upx 12upx 0px rgba(0, 0, 0, 0.05);
	border-radius: 10upx;
	& .jlq-left {
		display: grid;
		justify-content: center;
		align-content: center;
		flex-shrink: 0;
		@include w-h(30%, 100%);
		background: url('https://qs.shideng-inc.com/static/xcximg/coupon_wave_ls @2x.png') no-repeat;
		background-size: 20upx 200upx;
		background-position: left 0;
		view:nth-child(1) {
			@include font-no-height(48upx, 500, $color-53C117);
			text-align: center;
		}
		view:nth-child(2) {
			@include w-h(82upx, 32upx);
			border: 1upx solid $color-53C117;
			border-radius: 4upx;
			@include font-no-height(22upx, 500, $color-53C117);
			text-align: center;
		}
	}
	& .jlq-right {
		height: 100%;
		display: grid;
		justify-content: center;
		align-content: center;
		border-left: 2upx dotted $color-DC;
		padding-left: 30upx;
		view:nth-child(1) {
			@include font-no-height(34upx, 500, $color-282828);
		}
		view:nth-child(2) {
			padding-top: 10upx;
			text:nth-child(1) {
				@include font-no-height(26upx, 500, $color-90);
			}
			text:nth-child(2) {
				@include font-no-height(26upx, 500, $color-FF5420);
			}
			
		}
		view:nth-child(3) {
			padding-top: 10upx;
			@include font-no-height(26upx, 500, $color-90);
		}
	}

	& .circle-top {
		position: absolute;
		top: -15upx;
		left: calc(30% - 15upx);
		@include w-h(30upx, 30upx);
		border-radius: 50%;
		background: $color-f1;
	}
	& .circle-down {
		position: absolute;
		bottom: -15upx;
		left: calc(30% - 15upx);
		@include w-h(30upx, 30upx);
		border-radius: 50%;
		background: $color-f1;
	}
}
</style>
