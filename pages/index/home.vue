<template>
	<view class="content">
		<view class="title">青速文印</view>
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000">
			<swiper-item @click="toPage(item.link)" v-for="(item,index) in bannerList" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="pad-height"></view>
		<scroll-view class="scroll-view" scroll-y="true" show-scrollbar="false">
			<scanEquipment></scanEquipment>
			<view class="item-entry" @click="toPage('/pages/order/suborder')">
				<image src="https://qs.shideng-inc.com/static/xcximg/home_file@2x.png"></image>
				<view class="item-entry-font" >
					<view>文件打印</view>
					<view>微信文档，支持PDF/DOC/XLS/PPT</view>
				</view>
			</view>
			<view class="item-entry" @click="toPage('/pages/print/zjzPicPrint')">
				<image src="https://qs.shideng-inc.com/static/xcximg/home_certificates@2x.png"></image>
				<view class="item-entry-font">
					<view>证件照</view>
					<view>智能修图 美颜 排版 换红白蓝底</view>
				</view>
			</view>
			<view class="item-entry" @click="`${$store.commit('home/SET_PRINTDIALOGSHOW', true)}`">
				<image src="https://qs.shideng-inc.com/static/xcximg/home_img@2x.png"></image>
				<view class="item-entry-font">
					<view>图片打印</view>
					<view>打印至6寸相纸或A4普通纸张</view>
				</view>
			</view>
			<view class="pad-height-50"></view>
		</scroll-view>
		<!-- 选择图片打印弹窗 -->
		<picPrintSelectDialog :isShow="printDialogShow"></picPrintSelectDialog>
		<!-- 首屏优惠券弹窗 -->
		<voucherDialog 
		:isShow="voucherDialogShow"
		:voucherList="voucherList"
		></voucherDialog>
		<footerMenu></footerMenu>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerMenu from '../../components/footerMenu.vue';
import picPrintSelectDialog from '../../components/picPrintSelectDialog.vue';
import voucherDialog from '../../components/voucher/dialog.vue';

export default {
	components: {
		scanEquipment,
		footerMenu,
		picPrintSelectDialog,
		voucherDialog
	},
	computed: {
		store_printDialogShow() {
			return this.$store.state.home.printDialogShow;
		},
		store_voucherDialogShow() {
			return this.$store.state.home.voucherDialogShow;
		}
	},
	watch: {
		store_printDialogShow(val) {
			this.printDialogShow = val;
		},
		store_voucherDialogShow(val) {
			this.voucherDialogShow = val;
		}
	},
	data() {
		return {
			title: 'Hello',
			printDialogShow: false,
			voucherDialogShow: false,
			voucherList:[],
			bannerList:[]
		};
	},
	async onLoad(option) {
		//设置全局的平台属性
		this.$store.commit('SET_PLATFORM',await this.$helper.getPlatform())
		let code = await this.$login.getCode()
		let pid = option.pid ? option.pid : 0
		let group_id = option.group_id ? option.group_id : 0
		let platform = this.$store.state.platform
		//存储全局登录信息
		this.$helper._setCache('loginPostData',{code,pid,platform,group_id})
		let ret = await this.$login.login({code,pid,platform,group_id})
		let userInfo = await this.$helper._getCache('userInfo')
		this.voucherList = await this.$helper._getCache('voucherList')
		if(userInfo.is_receive_couple_reward == 0 && this.voucherList.length > 0){
			//显示红包弹窗
			this.$store.commit('home/SET_VOUCHERDIALOGSHOW', true);
			userInfo.is_receive_couple_reward = 1
			this.$helper._setCache('userInfo',userInfo)
		}
		//获取banner
		this.bannerList = this.$store.state.mainBanner
		if(this.bannerList < 1){
			let bannerRet = await this.$helper.httpGet(this.$api.getBanner_url_get+'?type=1')
			if(bannerRet.state == 'success'){
				this.$store.commit('SET_MAINBANNER',bannerRet.data)
				this.bannerList = bannerRet.data
			}
		}
	},
	methods: {
		toPage(url) {
			this.$store.commit('home/SET_VOUCHERDIALOGSHOW', false);
			uni.navigateTo({
				url: url
			});
		}
	}
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
		overflow-y: scroll;
		position: fixed;
		top: 468upx;
		bottom: 100upx;
		left: 0;
		width: calc(100% - 80upx);
		padding: 40upx;
		background: $color-F8;
		border-radius: 40upx 40upx 0px 0px;
	}
	& .scroll-view ::-webkit-scrollbar {
	  display:none;
	  width:0;
	  height:0;
	  color:transparent;
	}
	& .pad-height {
		@include w-h(100%, 20upx);
	}
	& .pad-height-50 {
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
