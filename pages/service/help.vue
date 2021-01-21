<template>
	<view class="content">
		<view class="voucher-cont" v-for="(item,index) in list" @click="toPage('/pages/service/helpInfo?info='+ encodeURIComponent(JSON.stringify(item)))">
			<text class="title">{{item.title}}</text>
			<image src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:[]
		};
	},
	async onLoad() {
		let ret = await this.$helper.httpGet(this.$api.helpArt_url_get)
		if(ret.state == 'success'){
			this.list = ret.data.list
		}
	},
	methods: {
		toPage(url){
			console.log(url)
			uni.navigateTo({
				url:url
			})
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
	& .voucher-cont {
		@include display-flex-space-between;
		padding: 47upx 60upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(30upx, 500, $color-33);
		}
		image {
			padding-left: 20upx;
			@include w-h(25upx, 25upx);
		}
		
	}
}
</style>
