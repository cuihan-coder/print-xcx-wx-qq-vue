<template>
	<view>
		<view class="row-1-container">
			<view class="row-1-container-top">
				<view class="item-1">
					<view class="item-1-left">
						<image class="item-1-left-image" src="http://qswy.com/static/xcximg/currency_printer_s@2x.png"></image>
						<text>湖南大学</text>
					</view>
					<image class="item-1-right" src="http://qswy.com/static/xcximg/file_scan_code@2x.png"></image>
				</view>
				<view class="item-2">
					<image class="item-2-image" src="http://qswy.com/static/xcximg/currency_add@2x.png"></image>
					<text>湖南大学万家乐超市01</text>
				</view>
				<view class="item-3">
					<text>彩色</text>
					<text>黑白</text>
					<text>相片冲印</text>
					<text>证件照</text>
				</view>
			</view>
			<view class="print-directly">当前未连接设备，可采用到店取件方式打印</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "scanEquipment"
	}
</script>

<style lang="scss">
	 .row-1-container {
		width: 100%;
		background: #ffffff;
		border-radius: 30upx;
		& .row-1-container-top {
			padding: 30upx 30upx 0 43upx;
			& .item-1 {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				& .item-1-left {
					& .item-1-left-image {
						@include w-h(32upx, 32upx);
						padding-right: 8upx;
					}
					@include font-no-height(26upx, 400, $color-33);
					@include item-center;
				}
				& .item-1-right {
					@include w-h(190upx, 64upx);
				}
			}
			& .item-2 {
				@include item-center;
				@include font-no-height(24upx, 400, $color-99);
				& .item-2-image {
					@include w-h(20upx, 24upx);
					padding-right: 12upx;
				}
			}
			& .item-3 {
				padding: 22upx 0 30upx 0;
				text {
					margin-right: 10upx;
					padding: 5upx 23upx;
					border: 2upx solid $color-4F79FF;
					border-radius: 16px;
					@include font-no-height(22upx, 400, $color-4F79FF);
				}
			}
		}
		& .print-directly {
			width: 100%;
			line-height: 80upx;
	
			background: #ff6c6c;
			border-radius: 0 0 30upx 30upx;
			@include font-no-height(28upx, 400, $color-ff);
			text-align: center;
		}
	}
</style>
