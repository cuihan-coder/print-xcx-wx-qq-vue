<template>
	<view class="indexq">
		<view class="circle-top"></view>
		<view class="circle-down"></view>
		<view class="jlq-left">
			<view>{{ useWhere }}</view>
			<view>
				<text>有效时间：</text>
				<text>{{ expireTime }}</text>
			</view>
			<view>使用范围：{{ cardType }}</view>
		</view>
		<view class="jlq-right">
			<view>
				<text>¥</text>
				<text>{{ money }}</text>
			</view>
			<view @click="toPage('/pages/userModule/voucher')">去使用</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'indexq',
	props: {
		money: {
			type: [Number, String],
			default: 0
		},
		useWhere: {
			type: String,
			default: '无门槛券 下单立减'
		},

		expireTime: {
			type: String,
			default: '2020.11.01-11.20'
		},
		cardType: {
			type: String,
			default: '一次用户限1次'
		}
	},
	methods: {
		toPage(url) {
			this.$store.commit('home/SET_VOUCHERDIALOGSHOW', false);
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
.indexq {
	width: 50%;
	margin: 20upx auto 0;
	padding: 0 0 0 25upx;
	height: 130upx;
	position: relative;
	@include display-flex-start;
	margin-bottom: 18upx;
	background: $color-ff;
	box-shadow: 0px 10upx 12upx 0px rgba(0, 0, 0, 0.05);
	border-radius: 10upx;
	.jlq-left {
		width: calc(70% - 2upx);
		height: 100%;
		display: grid;
		justify-content: start;
		align-content: center;
		flex-shrink: 0;
		border-right: 2upx dotted $color-F2AAA6;
		view:nth-child(1) {
			@include font-no-height(25upx, 500, $color-33);
		}
		view:nth-child(2) {
			@include font-no-height(17upx, 500, $color-99);
		}
		view:nth-child(3) {
			@include font-no-height(17upx, 500, $color-99);
		}
	}
	.jlq-right {
		width: 30%;
		height: 100%;
		display: grid;
		justify-content: center;
		align-content: center;
		view:nth-child(1) {
			width: 100%;
			text-align: center;
			text:nth-child(1) {
				@include font-no-height(24upx, 500, $color-E84033);
			}
			text:nth-child(2) {
				padding-left: 10upx;
				@include font-no-height(40upx, 500, $color-E84033);
			}
		}
		view:nth-child(2) {
			width: 86upx;
			line-height: 29upx;
			background: $color-E84033;
			border-radius: 15upx;
			@include font-no-height(17upx, 500, $color-ff);
			text-align: center;
		}
	}

	& .circle-top {
		position: absolute;
		top: -15upx;
		right: calc(30% - 19upx);
		@include w-h(24upx, 24upx);
		border-radius: 50%;
		background: $color-E94234;
	}
	& .circle-down {
		position: absolute;
		bottom: -15upx;
		right: calc(30% - 19upx);
		@include w-h(24upx, 24upx);
		border-radius: 50%;
		background: $color-E94234;
	}
}
</style>
