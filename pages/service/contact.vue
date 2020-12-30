<template>
	<view class="content">
		<view class="voucher-cont" v-if="typeList[0] != undefined">
			<text class="title">咨询问题</text>
			<view class="selector">
				<picker class="picker-style" mode="selector" :range="typeList" range-key="name">{{ typeName }}</picker>
				<image src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
			</view>
		</view>
		<view class="leave-msg">
			<view>备注</view>
			<textarea maxlength="1000" placeholder="请备注信息（详细说明，或联系方式等），我们回尽快给您回电！"></textarea>
		</view>
		<view class="ok-btn">确定提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: [
				{
					name: '合作',
					id: 1
				},
				{
					name: '投诉',
					id: 2
				},
				{
					name: '建议',
					id: 3
				}
			],
			typeName: ''
		};
	},
	async onLoad() {
		this.typeName = this.typeList[0].name;
	},
	methods: {}
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
		padding: 47upx 42upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(30upx, 500, $color-33);
		}
		& .selector {
			@include display-flex-start;
			& .picker-style {
				@include font-no-height(28upx, 500, $color-99);
			}
			image {
				padding-left: 20upx;
				@include w-h(25upx, 25upx);
			}
		}
	}
	& .leave-msg {
		margin-top: 20upx;
		padding: 47upx 42upx;
		background: $color-ff;
		border-radius: 30upx;
		view {
			margin-bottom: 30upx;
			@include font-no-height(30upx, 500, $color-00);
		}
		textarea{
			@include font-no-height(30upx, 400, $color-99);
		}
	}
	& .ok-btn{
		margin: 94upx auto 0;
		width: 511upx;
		line-height: 94upx;
		background: linear-gradient(-30deg, #4F79FF, #285AFF);
		border-radius: 47upx;
		box-shadow: 0 10upx 5upx #A9BBF6;
		@include font-no-height(32upx, 400, $color-ff);
		text-align: center;
	}
}
</style>
