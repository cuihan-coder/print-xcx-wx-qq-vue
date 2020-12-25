<template>
	<view class="mn-A4">
		<view class="title">
			<image :src="titleParam.pic"></image>
			{{titleParam.name}}
		</view>
		<view class="a4-model">
			<!-- <view class="no-file">
				<image src="http://qswy.com/static/xcximg/certificates_img@2x.png"></image>
				<view>点击添加图片</view>
			</view> -->
			<image class="file-img" src="http://qswy.com/static/xcximg/byz.png"></image>
			<image class="trush" src="http://qswy.com/static/xcximg/certificates_del@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'singlePicUp',
	props: {
		titleParam: {
			type: Object,
			default: () =>{
				return {
					name: '',
					pic: ''
				}
			} 
		}
	}
};
</script>

<style lang="scss">
.mn-A4 {
	margin: 20upx 0 20upx 0;
	padding: 42upx 25upx;
	background: $color-ff;
	border-radius: 30upx;
	& .title {
		@include item-center;
		padding-bottom: 43upx;
		border-bottom: solid 2upx $color-f1;
		@include font-no-height(30upx, 500, $color-33);

		image {
			@include w-h(38upx, 38upx);
			padding-right: 6upx;
		}
	}
	& .a4-model {
		position: relative;
		padding: 120upx 84upx;
		height: 752upx;
		margin-top: 40upx;
		border: solid 2upx $color-D7;
		display: flex;
		justify-content: center;
		align-items: center;
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
		& .file-img {
			@include w-h(100%, 100%);
		}
		& .trush {
			position: absolute;
			left: 32upx;
			bottom: 32upx;
			@include w-h(60upx, 60upx);
		}
	}
}
</style>
