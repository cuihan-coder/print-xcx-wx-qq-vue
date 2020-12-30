<template>
	<view class="log-item">
		<view class="item-row-1">
			<text>{{typeName}}</text>
			<text class="zhichu">支出</text>
		</view>
		<view class="item-row-2">
			<text class="zc-mon">-{{money}}</text>
			<text>{{ctime}}</text>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		typeName:{
			type: String,
			default: ''
		},
		money:{
			type: String,
			default: ''
		},
		ctime:{
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss">
.log-item {
	border-top: solid 2upx $color-f1;
	padding: 40upx 0;
	& .item-row-1 {
		@include display-flex-space-between;
		text:nth-child(1) {
			@include font-no-height(32upx, 400, $color-66);
		}
		& .zhichu {
			@include font-no-height(26upx, 400, $color-FF2424);
		}
	}
	& .item-row-2 {
		margin-top: 30upx;
		@include display-flex-space-between;
		& .zc-mon {
			@include font-no-height(30upx, 400, $color-079A26);
		}
		text:nth-child(2) {
			@include font-no-height(32upx, 400, $color-66);
		}
	}
}
</style>
