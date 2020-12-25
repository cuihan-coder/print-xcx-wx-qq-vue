<template>
	<view class="content">
		<image class="banner-image" src="http://qswy.com/static/xcximg/banner_2@2x.png"></image>
		<view class="pay-type">
			<text class="pay-type-title">支付方式</text>
			<view class="pay-type-select">
				<view class="pay-type-select-title">
					<image src="http://qswy.com/static/xcximg/file_yply@2x.png"></image>
					<text>余额支付</text>
					<text>（可用 10.00元）</text>
				</view>
				<image class="pay-checked" src="http://qswy.com/static/xcximg/file_choice_n@2x.png"></image>
				<!-- <image  class="pay-checked"  src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image> -->
			</view>
			<view class="pay-type-select">
				<view class="pay-type-select-title">
					<image src="http://qswy.com/static/xcximg/file_wply@2x.png"></image>
					<text>微信支付</text>
				</view>
				<image class="pay-checked" src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image>
			</view>
		</view>
		
		<view class="voucher-cont" v-if="voucherList[0] != undefined">
			<text class="title">优惠券</text>
			<view class="selector">
				<picker class="picker-style" mode="selector" :range="voucherList" range-key="name">{{voucherName}}</picker>
				<image src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
			</view>
		</view>
		
		<view class="qujian-code">
			<view>到店取件码</view>
			<view>882211</view>
		</view>
		
		<view class="fee-detail">
			<view class="row-1">
				<text class="title">费用明细</text>
				<view class="play-btn">
					<image src="http://qswy.com/static/xcximg/file_hide@2x.png"></image>
					<text class="shouqi">收起</text>
				</view>
				<!-- <view class="play-btn">
					<image src="http://qswy.com/static/xcximg/file_display@2x.png"></image>
					<text class="zhankai">展开</text>
				</view> -->
			</view>
			<view class="row-2">
				<view class="title">类别一</view>
				<view class="row-2-vals">
					<view class="type-val">
						<text>项目：</text>
						<text>文件·单面·黑白30张</text>
					</view>
					<view class="type-val">
						<text>单价：</text>
						<text>0.50元/份</text>
					</view>
					<view class="type-val">
						<text>小计：</text>
						<text>15.00元</text>
					</view>
				</view>
			</view>
			<view class="row-2">
				<view class="title">类别二</view>
				<view class="row-2-vals">
					<view class="type-val">
						<text>项目：</text>
						<text>文件·单面·彩色1张</text>
					</view>
					<view class="type-val">
						<text>单价：</text>
						<text>2元/份</text>
					</view>
					<view class="type-val">
						<text>小计：</text>
						<text>2.00元</text>
					</view>
				</view>
			</view>
			<view class="row-3">
				<text>共56张</text>
				<text>总小计：</text>
				<text>20.50元</text>
			</view>
		</view>
		<payCount></payCount>
	</view>
</template>

<script>
	import payCount from "../../components/payCount.vue"
export default {
	components:{
		payCount
	},
	data() {
		return {
			voucherList: [
				{
					name: '满十元减一元',
					id: 1
				},
				{
					name: '满十元减二元',
					id: 2
				}
			],
			 voucherName: ''
		};
	},
	onLoad() {
		this.voucherName = this.voucherList[0].name
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-f8;
}
.content {
	padding: 20upx 40upx;
	& .banner-image {
		width: 100%;
		height: 98upx;
		border-radius: 49upx;
	}
	& .pay-type {
		margin-top: 30upx;
		padding: 42upx 29upx;
		background: $color-ff;
		border-radius: 30upx;
		& .pay-type-title {
			@include font-no-height(30upx, 500, $color-33);
		}
		& .pay-type-select {
			margin-top: 50upx;
			@include display-flex-space-between;
			& .pay-type-select-title {
				@include display-flex-start;
				image {
					@include w-h(35upx, 35upx);
				}
				text:nth-child(2) {
					padding-left: 10upx;
					@include font-no-height(32upx, 500, $color-66);
				}
				text:nth-child(3) {
					@include font-no-height(28upx, 500, $color-66);
				}
			}
			& .pay-checked {
				@include w-h(40upx, 40upx);
			}
		}
	}
	& .voucher-cont{
		@include display-flex-space-between;
		padding: 52upx 28upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title{
			@include font-no-height(30upx, 500, $color-33);
		}
		& .selector{
			@include display-flex-start;
			& .picker-style{
				@include font-no-height(28upx, 500, $color-66);
			}
			image{
				@include w-h(25upx, 25upx);
			}
		}
	}
	& .qujian-code{
		padding: 52upx 28upx 30upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		view:nth-child(1){
			@include font-no-height(30upx,500,$color-33);
		}
		view:nth-child(2){
			@include font-no-height(80upx,500,$color-33);
			text-align: center;
		}
	}
	& .fee-detail{
		padding: 44upx 30upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .row-1{
			@include display-flex-space-between;
			padding-bottom: 42upx;
			border-bottom: 2upx solid $color-f1;
			& .title{
				@include font-no-height(30,500,$color-33);
			}
			& .play-btn{
				image{
					@include w-h(30upx,30upx);
				}
				& .shouqi{
					padding-left: 10upx;
					@include font-no-height(24,500,$color-A4);
				}
				& .zhankai{
					padding-left: 10upx;
					@include font-no-height(24,500,$color-3985FF);
				}
			}
		}
		& .row-2{
			border-bottom: 2upx solid $color-f1;
			& .title{
				margin-top: 20upx;
				@include font-no-height(24upx, 500, $color-99);
			}
			& .row-2-vals{
				padding: 38upx 40upx;
				& .type-val{
					@include display-flex-start;
					text:nth-child(1){
						@include font-no-height(32upx, 400, $color-33);
					}
					text:nth-child(2){
						@include font-no-height(32upx, 500, $color-33);
					}
				}
			}
		}
		& .row-3{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-top: 10upx;
			text:nth-child(1){
				@include font-no-height(28upx, 400, $color-66);
			}
			text:nth-child(2){
				padding-left: 10upx;
				@include font-no-height(32upx, 400, $color-00);
			}
			text:nth-child(3){
				@include font-no-height(32upx, 400, $color-FF4646);
			}
		}
	}
}

</style>
