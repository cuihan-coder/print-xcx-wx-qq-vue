<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="pad-height"></view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_5@2x.png"></image>
			<view class="cont-info">
				<view>图片打印</view>
				<text>手机图片快速打印，可自定义打印至 A4纸的尺寸/位置</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_1@2x(1).png"></image>
			<view class="cont-info">
				<view>多图一次性打印</view>
				<text>图片按最大尺寸打印到A4纸，可一次 多选9张 </text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_6@2x.png"></image>
			<view class="cont-info">
				<view>二合一打印</view>
				<text>两张图片平均分布，打印至一张A4纸 上面</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_3@2x.png"></image>
			<view class="cont-info">
				<view>身份证打印</view>
				<text>身份证正反面打印至一张A4纸上</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_8@2x.png"></image>
			<view class="cont-info">
				<view>户口本打印</view>
				<text>打印至A4纸上</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_9@2x.png"></image>
			<view class="cont-info">
				<view>出生证打印</view>
				<text>打印至A4纸上</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_10@2x.png"></image>
			<view class="cont-info">
				<view>结婚证打印</view>
				<text>打印至A4纸上</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_11@2x.png"></image>
			<view class="cont-info">
				<view>房产证打印</view>
				<text>打印至A4纸上</text>
			</view>
		</view>
		<view class="entry-btn">
			<image src="http://qswy.com/static/xcximg/certificates_s_12@2x.png"></image>
			<view class="cont-info">
				<view>毕业证打印</view>
				<text>打印至A4纸上</text>
			</view>
		</view>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
export default {
	components: {
		scanEquipment
	},
	data: () => {}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
	
	& .pad-height{
		width: 100%;
		height: 20upx;
	}
	& .entry-btn {
		@include display-flex-start;
		margin-top: 20upx;
		padding: 43upx 60upx 41upx;
		background: $color-ff;
		border-radius: 30upx;
		image {
			@include w-h(83upx, 83upx);
			flex-shrink: 0;
		}
		& .cont-info {
			padding-left: 62upx;
			view {
				@include font-no-height(38upx, bold, $color-33);
			}
			text {
				@include font-no-height(24upx, 400, $color-66);
			}
		}
	}
}
</style>
