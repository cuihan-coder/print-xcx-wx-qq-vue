<template>
	<view class="order-infos" @click="toPage('/pages/order/orderInfo')">
		<view class="type-img">
			<view>
				<image src="http://qswy.com/static/xcximg/file_word@2x.png"></image>
				年终报告.docd
			</view>
			<text class="ydy">已打印</text>
			<!-- <text class="ddy">待打印</text> -->
			<!-- <text class="dzf">待支付</text> -->
			<!-- 	<text class="clz">处理中</text> -->
			<!-- 	<text class="tksb">退款失败</text> -->
		</view>
		<view class="print-info" >
			<text class="print-fo">A4/黑白/单面/1份 共5张</text>
			<view>
				<text  class="print-fo">计</text>
				<text class="print-mo">20.50元</text>
			</view>
		</view>
		<view class="print-ot">时间：2020-12-06 15:44</view>
		<view class="print-ot">实付：10.11元</view>
		<view class="print-ot">优惠：0.00元</view>
	</view>
</template>

<script>
	export default {
		data() {
			
		},
		methods: {
			toPage(url){
				uni.navigateTo({
					url:url
				})
			}
		}
		
		
	};
</script>

<style lang="scss">
.order-infos {
	width: 100%;
	& .type-img {
		@include display-flex-space-between;
		view:nth-child(1) {
			@include item-center;
			@include font-no-height(30upx, 500, $color-33);
			image {
				@include w-h(55upx, 55upx);
				padding-right: 10upx;
			}
		}
		//已打印
		& .ydy {
			@include font-no-height(30upx, 400, $color-99);
		}
		//待打印
		& .ddy {
			@include font-no-height(30upx, 400, $color-1668FF);
		}
		//待支付
		& .dzf {
			@include font-no-height(30upx, 400, $color-FF7420);
		}
		//处理中
		& .clz {
			@include font-no-height(30upx, 400, $color-1668FF);
		}
		//退款失败
		& .tksb {
			@include font-no-height(30upx, 400, $color-FF3434);
		}
		& .ytk {
			@include font-no-height(30upx, 400, $color-99);
		}
	}
	& .print-info{
		@include display-flex-space-between;
		padding: 30upx 0;
		border-bottom: 2upx solid $color-f1;
		& .print-fo{
			@include font-no-height(28upx, 500, $color-66);
		}
		& .print-mo{
			padding-left: 10upx;
			@include font-no-height(28upx, 500, $color-FF4646);
		}
	}
	& .print-ot{
		margin-top: 15upx;
		@include font-no-height(28upx, 400, $color-66);
	}
}
</style>
