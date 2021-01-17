<template>
	<view class="content">
		<view class="thump-image">
			<image :src="info.thumbnail"></image>
		</view>
		<view class="active-article">
			<view class="active-title">
				{{info.title}}
			</view>
			<view class="active-time">活动时间：{{info.start_time}}至{{info.end_time}}</view>
			<rich-text selectable="true" class :nodes="info.content"></rich-text>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			info:{},
		};
	},
	async onLoad(option) {	
		let id = option.id
		let ret = await this.$helper.httpGet(this.$api.activetyInfo_url_get+'?id='+id)
		if(ret.state == 'success'){
			this.info = ret.data.info
		}
		
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: $color-ff;
}
.content {
	@include center;
	& .thump-image{
		width: 100%;
		font-size: 0;
		image {
			width: 100%;
		}
	}
	& .active-article{
		padding: 42upx 39upx;
		& .active-title{
			@include  font-no-height(36upx,500,$color-33);
		}
		& .active-time{
			padding: 34upx 0 20upx;
			margin-bottom: 10upx;
			@include  font-no-height(24upx,500,$color-FF8A00);
			border-bottom: 2upx solid $color-F0;
		}
	}
	
}
</style>
