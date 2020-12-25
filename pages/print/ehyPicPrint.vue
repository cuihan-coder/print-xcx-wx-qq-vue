<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="mn-A4">
			<view class="title">
				<image src="http://qswy.com/static/xcximg/certificates_s_6@2x.png"></image>
				<text>二合一图片打印</text>
			</view>
			<view class="a4-model">
				<view class="no-file">
					<image src="http://qswy.com/static/xcximg/certificates_img@2x.png"></image>
					<view>点击添加图片</view>
				</view>
				
			</view>
			<view class="a4-model">
				<image class="file-img" src="http://qswy.com/static/xcximg/byz.png"></image>
				<image class="trush" src="http://qswy.com/static/xcximg/certificates_del@2x.png"></image>
			</view>
		</view>
		<printParam :showParam="showParam"></printParam>
		<footerCount></footerCount>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerCount from '../../components/footerCount.vue';
import printParam from '../../components/printParam.vue';
import singlePicUp from '../../components/singlePicUp.vue';
export default {
	components: {
		scanEquipment,
		printParam,
		footerCount,
		singlePicUp
	},
	data() {
		return {
			showParam: [1, 3]
		};
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
	.mn-A4 {
		margin: 20upx 0 20upx 0;
		padding: 42upx 25upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include item-center;
			padding-bottom: 43upx;
			border-bottom: solid 2upx $color-f1;
			& text:nth-child(2) {
				@include font-no-height(30upx, 500, $color-33);
			}
			image {
				@include w-h(38upx, 38upx);
				padding-right: 6upx;
			}
		}
		& .a4-model {
			position: relative;
			border: 2upx solid #d7d7d7;
			@include item-center;
			padding: 9upx;
			height: 431upx;
			& .no-file {
				width: 100%;
				text-align: center;
				image {
					@include w-h(100upx, 100upx);
				}
				view {
					@include font-no-height(26upx, 500, $color-B6);
				}
			}
			& .file-img{
				width: 100%;
				height: 100%;
			}
			& .trush {
				position: absolute;
				left: 20upx;
				bottom: 20upx;
				@include w-h(60upx, 60upx);
			}
		}
	}
}
</style>
