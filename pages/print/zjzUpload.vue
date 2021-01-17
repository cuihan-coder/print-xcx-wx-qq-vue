<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<zjzupload
		:printType="printType"
		></zjzupload>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import zjzupload from '../../components/zjzupload.vue';
export default {
	components: {
		scanEquipment,
		zjzupload
	},
	data() {
		return {
			showParam: [1, 3],
			printType:{}
		};
	},
	onLoad() {
		this.printType = this.$store.state.zjzprint.printTypeIndex
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
					@include w-h(283upx, 200upx);
				}
				view {
					padding-top: 28upx;
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
