<template>
	<view class="content">
		<view class="topup">
			<view class="title">账户余额</view>
			<view class="pay-icon"><image src="http://qswy.com/static/xcximg/me_wallet@2x.png"></image></view>
			<view class="balance">
				<text>¥</text>
				<text>{{userInfo.balance}}</text>
			</view>
			<view class="blance-desc">可用账户余额</view>
			<view class="cz-title">充值</view>
			<view class="money-list">
				<view class="money-item" v-for="(item,index) in toupList" @click="topup(item.money)">
					<view>{{item.money}}元</view>
					<view>{{item.title}}</view>
				</view>
			</view>
			<image class="banner-image" src="http://qswy.com/static/xcximg/banner_2@2x.png"></image>
		</view>
		<view class="money-log-list">
			<view class="title">消费明细</view>
			<view v-for="(item,index) in log" :key="index">
				<zhichu
				v-if="item.type == 1"
				:typeName="item.pay_type_content"
				:money="item.money"
				:ctime="item.created_at"
				></zhichu>
				<tuikuan
				v-if="item.type == 2"
				:typeName="item.pay_type_content + '-退款'"
				:money="item.money"
				:ctime="item.created_at"
				></tuikuan>
			</view>
		</view>
	</view>
</template>

<script>
import zhichu from "@/components/balance/zhichu.vue"
import tuikuan from "@/components/balance/tuikuan.vue"
import payModel from '../../common/js/pay.js';

export default {
	components:{
		zhichu,
		tuikuan
	},
	data() {
		return {
			userInfo:{},
			toupList:{},
			log:[]
		};
	},
	async onLoad() {
		
		let ret = await this.$helper.httpGet(this.$api.topupInfo_url_get)
		if(ret.state == 'success'){
			this.log = ret.data.log
			this.toupList = ret.data.toupList
			this.userInfo = ret.data.userInfo
		}
	},
	methods: {
		async topup(money){
			let post = {
				money
			}
			let ret = await this.$helper.httpPost(this.$api.userTopup_url_post,post)
			if(ret.state == 'success'){
				// #ifdef MP-WEIXIN
				let state = await payModel.wxPay(ret.data)
				if(state == true){
					uni.navigateTo({
						url:'/pages/print/payOk'
					})
				}
				// #endif
				// #ifdef MP-QQ
				qq.requestWxPayment({
				  url:ret.data.mweb_url,
				  referer: ret.data.referer,
				  success(res) {
					  uni.navigateTo({
					  	url:'/pages/print/payOk'
					  })
				  },
				  fail(res) {}
				})
				// #endif
			}
			
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
	& .topup {
		padding: 62upx 40upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(36upx, 500, $color-22);
		}
		& .pay-icon {
			width: 100%;
			text-align: center;
			margin-top: 83upx;
			image {
				@include w-h(130upx, 130upx);
			}
		}
		& .balance {
			width: 100%;
			text-align: center;
			margin-top: 30upx;
			text:nth-child(1) {
				@include font-no-height(28upx, 500, $color-33);
			}
			text:nth-child(2) {
				padding-left: 10upx;
				@include font-no-height(50upx, 500, $color-33);
			}
		}
		& .blance-desc {
			text-align: center;
			margin-top: 18upx;
			padding-bottom: 58upx;
			@include font-no-height(24upx, 400, $color-33);
			border-bottom: 2upx solid $color-f1;
		}
		& .cz-title {
			margin-top: 46upx;
			@include font-no-height(28upx, 500, $color-22);
		}
		& .money-list{
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .money-item{
				display: grid;
				justify-content: center;
				align-content: center;
				@include w-h(30%, 114upx);
				background: $color-F6F9FE;
				border-radius: 10upx;
				view:nth-child(1){
					@include font-no-height(32upx, 600, $color-1668FF);
					text-align: center;
				}
				view:nth-child(2){
					@include font-no-height(24upx, 400, $color-66);
					text-align: center;
				}
			}
		}
		& .banner-image{
			@include w-h(100%, 98upx);
			margin-top: 52upx;
		}
	}
	& .money-log-list{
		margin-top: 20upx;
		padding: 62upx 40upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title{
			@include font-no-height(36upx, 500, $color-22);
			margin-bottom: 20upx;
		}
	}
}
</style>
