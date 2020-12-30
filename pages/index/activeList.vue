<template>
	<view class="content">
		<view class="active-item" @click="toPage('/pages/index/activeInfo')">
			<image src="http://qswy.com/static/xcximg/huodong.jpeg"></image>
			<view class="item-padding">
				<view class="title">深圳同城 乐翻天-大牌来袭 Vlink 线下活动第四期-轰趴大狂欢</view>
				<view class="active-time">
					<image src="http://qswy.com/static/xcximg/me_activity_time@2x.png"></image>
					至2019-12-31
				</view>
			</view>
		</view>
		<view class="active-item">
			<image src="http://qswy.com/static/xcximg/huodong.jpeg"></image>
			<view class="item-padding">
				<view class="title">深圳同城 乐翻天-大牌来袭 Vlink 线下活动第四期-轰趴大狂欢</view>
				<view class="active-time">
					<image src="http://qswy.com/static/xcximg/me_activity_time@2x.png"></image>
					至2019-12-31
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	async onLoad() {},
	methods: {
		toPage(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-F2;
}
.content {
	padding: 20upx 40upx;
	& .active-item {
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		image {
			width: 100%;
			display: block;
			border-radius: 30upx 30upx 0 0;
		}
		& .item-padding {
			padding: 30upx 40upx;
			& .title {
				@include font-no-height(30upx, 500, $color-3F);
			}
			& .active-time {
				@include item-center;
				margin-top: 20upx;
				image {
					@include w-h(24upx, 24upx);
					padding-right: 10upx;
				}
				@include font-no-height(24upx, 500, $color-91);
			}
		}
	}
}
</style>
