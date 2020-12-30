<template>
	<view class="content">
		<view v-if="option.tab == 1" class="change-menu daizhifu">
			<view class="active">待支付</view>
			<view class="border-line">待打印</view>
			<view class="border-line">已打印</view>
			<view>售后</view>
		</view>
		<view v-if="option.tab == 2" class="change-menu daiday">
			<view>待支付</view>
			<view class="active"> 待打印</view>
			<view class="border-line">已打印</view>
			<view>售后</view>
		</view>
		<view v-if="option.tab == 3" class="change-menu yiday">
			<view class="border-line">待支付</view>
			<view> 待打印</view>
			<view class="active">已打印</view>
			<view>售后</view>
		</view>
		<view v-if="option.tab == 4" class="change-menu shouhou">
			<view class="border-line">待支付</view>
			<view class="border-line"> 待打印</view>
			<view>已打印</view>
			<view class="active">售后</view>
		</view>
		<view class="order-item">
			<ordedetail></ordedetail>
			<!-- 支付取消 -->
			<cancelorpay></cancelorpay>
			<!-- 取件码 -->
			<!-- <qjCode></qjCode> -->
		</view>
		<view class="order-item">
			<ordedetail></ordedetail>
			<!-- 支付取消 -->
			<!-- <cancelorpay></cancelorpay> -->
			<!-- 取件码 -->
			<qjCode></qjCode>
		</view>
		<view class="order-item"><ordedetail></ordedetail></view>
	</view>
</template>

<script>
import ordedetail from '@/components/order/ordedetail.vue';
import cancelorpay from '@/components/order/cancelorpay.vue';
import qjCode from '@/components/order/qjCode.vue';

export default {
	components: {
		ordedetail,
		cancelorpay,
		qjCode
	},
	data() {
		return {
			option:[]
		};
	},
	async onLoad(option) {
		this.option = option
		console.log(this.option)
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
	& .change-menu {
		@include w-h(100%, 88upx);
		@include display-flex-start;

		view {
			width: 25%;
			line-height: 29upx;
			@include font-no-height(26upx, 400, $color-ff);
			text-align: center;
		}
		& .active {
			@include font-no-height(26upx, 400, $color-22);
		}

		& .border-line {
			border-right: solid 3upx $color-ff;
		}
	}
	& .daizhifu {
		background: url('http://qswy.com/static/xcximg/me_dingdan_tab1@2x.png');
		background-size: 100%;
	}
	& .daiday {
		background: url('http://qswy.com/static/xcximg/me_dingdan_tab2@2x.png');
		background-size: 100%;
	}
	& .yiday {
		background: url('http://qswy.com/static/xcximg/me_dingdan_tab3@2x.png');
		background-size: 100%;
	}
	& .shouhou {
		background: url('http://qswy.com/static/xcximg/me_dingdan_tab4@2x.png');
		background-size: 100%;
	}
	& .order-item {
		margin-top: 20upx;
		padding: 30upx;
		background: $color-ff;
		border-radius: 30upx;
	}
}
</style>
