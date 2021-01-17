<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="mn-A4">
			<view class="title">
				<image src="http://qswy.com/static/xcximg/certificates_s_1@2x(1).png"></image>
				<text>多图片一次性打印</text>
				<text>（单次最多9张）</text>
			</view>
			<view class="a4-model">
				<view class="file-img">
					<image class="cha" src="http://qswy.com/static/xcximg/certificates_del_s@2x.png"></image>
					<image class="img" src="http://qswy.com/static/xcximg/byz.png"></image>
				</view>
				<view class="file-img">
					<image class="cha" src="http://qswy.com/static/xcximg/certificates_del_s@2x.png"></image>
					<image class="img" src="http://qswy.com/static/xcximg/byz.png"></image>
				</view>
				<view class="file-img">
					<image class="cha" src="http://qswy.com/static/xcximg/certificates_del_s@2x.png"></image>
					<image class="img" src="http://qswy.com/static/xcximg/byz.png"></image>
				</view>
				<view class="file-img">
					<image class="cha" src="http://qswy.com/static/xcximg/certificates_del_s@2x.png"></image>
					<image class="img" src="http://qswy.com/static/xcximg/byz.png"></image>
				</view>
				<view class="add-file-img">
					<view>+</view>
					<view>点击添加</view>
				</view>
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
			showParam: [1,3]
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
			& text:nth-child(3) {
				@include font-no-height(28upx, 500, $color-99);
			}
			image {
				@include w-h(38upx, 38upx);
				padding-right: 6upx;
			}
		}
		& .a4-model {
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .file-img {
				margin-top: 40upx;
				@include w-h(30%, 249upx);
				position: relative;
				& .img {
					@include w-h(100%, 100%);
				}
				& .cha {
					@include w-h(44upx, 44upx);
					position: absolute;
					right: -22upx;
					top: -22upx;
				}
			}
			& .add-file-img {
				margin-top: 40upx;
				@include w-h(30%, 249upx);
				display: grid;
				justify-content: center;
				align-content: center;
				border: 2upx solid $color-D7;
				view:nth-child(1) {
					@include w-h(100%, 50upx);
					text-align: center;
					@include font-no-height(48upx, 400, $color-D2);
				}
				view:nth-child(2) {
					@include w-h(100%, 22upx);
					@include font-no-height(22upx, 400, $color-B6);
				}
			}
		}
		& .a4-model::after {
			content: '';
			width: 30%;
		}
	}
}
</style>
