<template>
	<view class="content">
		<view class="thump-image">
			<image src="http://qswy.com/static/xcximg/huodong.jpeg"></image>
		</view>
		<view class="active-article">
			<view class="active-title">
				深圳同城  乐翻天-大牌来袭  Vlink 线下活动
				第四期-轰趴大狂欢
			</view>
			<view class="active-time">活动时间：2019-12-23至2019-12-31</view>
			<rich-text :nodes="content"></rich-text>
		</view>
		
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			content:'重大疾病的发病率越来越趋于年轻化，为了给孩子更好的保障，有很多宝爸宝妈在咨询孩子保险的配置方案，希望能够给孩子一个全面的保障。当下市场上关于少儿保障的产品很多，各家保险公司也在激烈竞争，希望能够推出爆款产品。但是产品良莠不齐，适合小孩的保险排行榜很难说是一个具体的方案或者产品，小孩保险的配置还是要和家庭的经济情况挂钩的，今天以一个中等收入家庭为例，看看哪些小孩保险更值得被推荐。2018年，Vitalik Buterin 在Sharding FAQ 也提出“不可能三角”模型：设计一条公链，去中心化、安全不可篡改性，可扩展性（高效）三者只能取其二。在给孩子配置保险前，作为家长一定要清晰的认识到孩子可能面临的风险有哪些。那么疾病是一个很大的风险，小病风险如常见感冒、发烧等，大病风险如白血病、脑膜炎等，这些发病率都是比较高的。'
		};
	},
	async onLoad() {	
		
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
