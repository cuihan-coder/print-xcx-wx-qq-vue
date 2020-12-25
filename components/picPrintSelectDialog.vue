<template>
	<view class="dialog" v-if="isShow == true">
		<view class="background-ceng" @click="closeFc"></view>
		<view @click="topage('jz')" class="orange-back">
			<view>图片打印至</view>
			<view>6寸胶纸</view>
		</view>
		<view @click="topage('a4')" class="blue-back">
			<view>图片打印至</view>
			<view>A4纸</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'picPrintSelectDialog',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	methods:{
		topage(){
			this.$store.commit('print/SET_PRINTDIALOGSHOW',false)
			//跳转地址
		},
		closeFc(){
			this.$store.commit('print/SET_PRINTDIALOGSHOW',false)
		}
	}
};
</script>

<style lang="scss">
.dialog {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	& .background-ceng {
		width: 100%;
		height: 100%;
		background: $zhezhao;
		z-index: 11;
	}
	& .orange-back {
		position: absolute;
		left: 231upx;
		bottom: 179upx;
		@include w-h(180upx, 180upx);
		display: grid;
		justify-content: center;
		align-content: center;
		background: linear-gradient(-30deg, #fd7028, #fc4231);
		border: 4upx solid $color-ff;
		border-radius: 50%;
		text-align: center;
		z-index: 12;
		view:nth-child(1) {
			@include font-no-height(26upx, 400, $color-ff);
		}
		view:nth-child(2) {
			@include font-no-height(28upx, 500, $color-ff);
		}
	}
	& .blue-back {
		position: absolute;
		right: 113upx;
		bottom: 357upx;
		@include w-h(180upx, 180upx);
		display: grid;
		justify-content: center;
		align-content: center;
		background: linear-gradient(-30deg, #4f79ff, #285aff);
		border: 4upx solid $color-ff;
		border-radius: 50%;
		text-align: center;
		z-index: 12;
		view:nth-child(1) {
			@include font-no-height(26upx, 400, $color-ff);
		}
		view:nth-child(2) {
			@include font-no-height(28upx, 500, $color-ff);
		}
	}
}
</style>
