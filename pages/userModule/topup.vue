<template>
	<view class="content">
		<view class="topup">
			<view class="title">账户余额</view>
			<view class="pay-icon"><image src="http://qswy.com/static/xcximg/me_wallet@2x.png"></image></view>
			<view class="balance">
				<text>¥</text>
				<text>320.00</text>
			</view>
			<view class="blance-desc">可用账户余额</view>
			<view class="cz-title">充值</view>
			<view class="money-list">
				<view class="money-item">
					<view>10元</view>
				</view>
				<view class="money-item">
					<view>20元</view>
					<view>充值送2元</view>
				</view>
				<view class="money-item">
					<view>50元</view>
					<view>充值送5元</view>
				</view>
			</view>
			<image class="banner-image" src="http://qswy.com/static/xcximg/banner_2@2x.png"></image>
		</view>
		<view class="money-log-list">
			<view class="title">消费明细</view>
			<zhichu
			typeName="证件照打印"
			money="1.00"
			ctime="2019-08-29 18:29:21"
			></zhichu>
			<tuikuan
			typeName="证件照打印-退款"
			money="1.00"
			ctime="2019-08-29 18:29:21"
			></tuikuan>
		</view>
	</view>
</template>

<script>
import zhichu from "@/components/balance/zhichu.vue"
import tuikuan from "@/components/balance/tuikuan.vue"
export default {
	components:{
		zhichu,
		tuikuan
	},
	data() {
		return {};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
	& .topup {
		padding: 62upx 40upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(36upx, 500, $color-22);
		}
		& .pay-icon {
			width: 100%;
			text-align: center;
			margin-top: 83upx;
			image {
				@include w-h(130upx, 130upx);
			}
		}
		& .balance {
			width: 100%;
			text-align: center;
			margin-top: 30upx;
			text:nth-child(1) {
				@include font-no-height(28upx, 500, $color-33);
			}
			text:nth-child(2) {
				padding-left: 10upx;
				@include font-no-height(50upx, 500, $color-33);
			}
		}
		& .blance-desc {
			text-align: center;
			margin-top: 18upx;
			padding-bottom: 58upx;
			@include font-no-height(24upx, 400, $color-33);
			border-bottom: 2upx solid $color-f1;
		}
		& .cz-title {
			margin-top: 46upx;
			@include font-no-height(28upx, 500, $color-22);
		}
		& .money-list{
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .money-item{
				display: grid;
				justify-content: center;
				align-content: center;
				@include w-h(30%, 114upx);
				background: $color-F6F9FE;
				border-radius: 10upx;
				view:nth-child(1){
					@include font-no-height(32upx, 600, $color-1668FF);
					text-align: center;
				}
				view:nth-child(2){
					@include font-no-height(24upx, 400, $color-66);
					text-align: center;
				}
			}
		}
		& .banner-image{
			@include w-h(100%, 98upx);
			margin-top: 52upx;
		}
	}
	& .money-log-list{
		margin-top: 20upx;
		padding: 62upx 40upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title{
			@include font-no-height(36upx, 500, $color-22);
			margin-bottom: 20upx;
		}
	}
}
</style>
