<template>
	<view class="content">
		<view class="active-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/index/activeInfo?id='+ item.id)">
			<image :src="item.thumbnail"></image>
			<view class="item-padding">
				<view class="title">{{item.title}}</view>
				<view class="active-time">
					<image src="https://qs.shideng-inc.com/static/xcximg/me_activity_time@2x.png"></image>
					至{{item.end_time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	async onLoad() {
		let ret = await this.$helper.httpGet(this.$api.activetyList_url_get)
		if(ret.state == 'success'){
			this.list = ret.data.list
		}
	},
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
