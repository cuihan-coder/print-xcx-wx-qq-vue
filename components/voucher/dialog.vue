<template>
	<view class="dialog" v-if="isShow == true">
		<view class="background-ceng" @click="closeFc"></view>
		<view class="voucher-container">
			<view class="row-1">恭喜你获得</view>
			<view class="row-2">{{voucherList.length}}张代金券</view>
			<voucher 
			v-for="(item, index) in voucherList" 
			:key="index"
			:money="item.use_benefits"
			:useWhere="item.title"
			:expireTime="item.expire_time"
			></voucher>
			
			<view class="tips">
				优惠券已放入您的账户中，点击
				<navigator url="/pages/userModule/voucher" class="tiaozhuan">优惠券</navigator>
				可查看
			</view>
			<view class="close-btn" @click="`${$store.commit('home/SET_VOUCHERDIALOGSHOW', false)}`">
				<image  src="http://qswy.com/static/xcximg/coupon_new_gb@2x.png"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
import voucher from '@/components/voucher/indexq.vue';
export default {
	name: 'picPrintSelectDialog',
	components: {
		voucher
	},
	props: {
		isShow: {
			type: Boolean,
			default: true
		},
		voucherList:{
			type:[Array, Object],
			default: ()=> []
		}
	},
	methods: {
		topage() {
			this.$store.commit('home/SET_VOUCHERDIALOGSHOW', false);
			//跳转地址
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
	& .voucher-container {
		position: absolute;
		top: 100upx;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('http://qswy.com/static/xcximg/coupon_new_bg@2x.png') no-repeat;
		background-size: 120%;
		background-position-x: 50%;
		z-index: 12;

		& .row-1 {
			margin-top: 58%;
			text-align: center;
			font-size: 50upx;
			font-weight: 600;
			color: #ffffff;
			background: linear-gradient(0deg, #fffdf3 0%, #faeca5 80.322265625%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		& .row-2 {
			text-align: center;
			font-size: 33upx;
			font-weight: 500;
			color: #ffffff;
			background: linear-gradient(0deg, #fffdf3 0%, #faeca5 80.322265625%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		& .tips {
			@include font-no-height(19upx, 500, $color-ff);
			& .tiaozhuan {
				display: inline-block;
				@include font-no-height(19upx, 500, $color-FFC807);
			}
			text-align: center;
		}
	}
	& .close-btn {
		@include w-h(100%, 54upx);
		margin-top: 0 auto;
		padding-top: 40upx;
		image{
			@include w-h(54upx, 54upx);
		}
		text-align: center;
	}
}
</style>
