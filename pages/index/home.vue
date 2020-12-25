<template>
	<view class="content">
		<view class="title">青速文印</view>
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000">
			<swiper-item><image src="http://qswy.com/static/xcximg/bannerb.jpg"></image></swiper-item>
		</swiper>
		<view class="pad-height"></view>
		<scroll-view class="scroll-view" scroll-y="true" show-scrollbar="false">
			<scanEquipment></scanEquipment>
			<view class="item-entry">
				<image src="http://qswy.com/static/xcximg/home_file@2x.png"></image>
				<view class="item-entry-font">
					<view>文件打印</view>
					<view>微信文档，支持PDF/DOC/XLS/PPT</view>
				</view>
			</view>
			<view class="item-entry">
				<image src="http://qswy.com/static/xcximg/home_certificates@2x.png"></image>
				<view class="item-entry-font">
					<view>证件照</view>
					<view>智能修图 美颜 排版 换红白蓝底</view>
				</view>
			</view>
			<view class="item-entry" @click="`${$store.commit('print/SET_PRINTDIALOGSHOW',true)}`">
				<image src="http://qswy.com/static/xcximg/home_img@2x.png"></image>
				<view class="item-entry-font">
					<view>图片打印</view>
					<view>打印至6寸相纸或A4普通纸张</view>
				</view>
			</view>
			<view class="pad-height-50"></view>
		</scroll-view>
		<!-- 选择图片打印弹窗 -->
		<picPrintSelectDialog :isShow="printDialogShow"></picPrintSelectDialog>
		<footerMenu></footerMenu>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerMenu from '../../components/footerMenu.vue';
import picPrintSelectDialog from '../../components/picPrintSelectDialog.vue';

export default {
	components: {
		scanEquipment,
		footerMenu,
		picPrintSelectDialog
	},
	computed:{
		store_printDialogShow(){
			return this.$store.state.print.printDialogShow
		}
	},
	watch:{
		store_printDialogShow(val){
			this.printDialogShow = val
		}
	},
	data() {
		return {
			title: 'Hello',
			printDialogShow: false
		};
	},
	async onLoad() {	
		
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: $color-F8;
}
.content {
	@include center;
	& .title {
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		width: 100%;
		@include font-no-height(40upx, bold, $color-ff);
		font-style: italic;
		text-align: left;
		z-index: 2;
	}
	& .swiper {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 500upx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	& .scroll-view {
		overflow: scroll;
		position: fixed;
		top: 468upx;
		bottom: 100upx;
		left: 0;
		width: calc(100% - 80upx);
		padding: 40upx;
		background: $color-F8;
		border-radius: 40upx 40upx 0px 0px;
	}
	& .pad-height {
		@include w-h(100%, 20upx);
	}
	& .pad-height-50{
		@include w-h(100%, 50upx);
	}
	& .item-entry {
		@include display-flex-start;
		margin-top: 20upx;
		padding: 57upx 0 56upx 64upx;
		background: $color-ff;
		box-shadow: 0px 0px 20upx 0px rgba(10, 2, 4, 0.04);
		border-radius: 30upx;
		image {
			@include w-h(84upx, 84upx);
		}
		& .item-entry-font {
			padding-left: 59upx;
			view:nth-child(1) {
				@include font-no-height(40upx, bold, $color-33);
			}
			view:nth-child(2) {
				@include font-no-height(24upx, 400, $color-66);
			}
		}
	}
}
</style>
