<template>
	<view class="content">
		<image class="banner-image" src="http://qswy.com/static/xcximg/banner_2@2x.png"></image>
		<view class="pay-type">
			<text class="pay-type-title">支付方式</text>
			<view class="pay-type-select">
				<view class="pay-type-select-title">
					<image src="http://qswy.com/static/xcximg/file_yply@2x.png"></image>
					<text>余额支付</text>
					<text>（可用 {{balance}}元）</text>
				</view>
				<image v-if="default_pay != 'balance'"  @click="default_pay = 'balance'" class="pay-checked" src="http://qswy.com/static/xcximg/file_choice_n@2x.png"></image>
				<image v-if="default_pay == 'balance'" class="pay-checked"  src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image>
				
			</view>
			<view class="pay-type-select">
				<view class="pay-type-select-title">
					<image src="http://qswy.com/static/xcximg/file_wply@2x.png"></image>
					<text>微信支付</text>
				</view>
				<image v-if="default_pay != 'wxpay'"  @click="default_pay = 'wxpay'" class="pay-checked" src="http://qswy.com/static/xcximg/file_choice_n@2x.png"></image>
				<image v-if="default_pay == 'wxpay'" class="pay-checked"  src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image>
			</view>
		</view>

		<view class="voucher-cont" v-if="voucherList[0] != undefined">
			<text class="title">优惠券</text>
			<view class="selector">
				<picker @change="selectVoucher" class="picker-style" mode="selector" :range="voucherList" range-key="title">{{ voucherName }}</picker>
				<image src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
			</view>
		</view>

		<view class="qujian-code">
			<view>到店取件码</view>
			<view>{{receiveCode}}</view>
		</view>

		<view class="fee-detail">
			<view class="row-1">
				<text class="title">费用明细</text>
				<view class="play-btn" @click="is_show_detail = false" v-if="is_show_detail==true">
					<image src="http://qswy.com/static/xcximg/file_hide@2x.png"></image>
					<text class="shouqi">收起</text>
				</view>
				<view class="play-btn" @click="is_show_detail = true" v-if="is_show_detail==false">
					<image src="http://qswy.com/static/xcximg/file_display@2x.png"></image>
					<text class="zhankai">展开</text>
				</view>
			</view>
			<view class="row-2" v-if="is_show_detail==true" v-for="(item,index) in printTaskList" :key="index">
				<view class="title">类别{{index+1}}</view>
				<view class="row-2-vals">
					<view class="type-val">
						<text>项目：</text>
						<text>{{item.detail}}</text>
					</view>
					<view class="type-val">
						<text>单价：</text>
						<text>{{item.avg_price}}元/份</text>
					</view>
					<view class="type-val">
						<text>小计：</text>
						<text>{{item.price}}元</text>
					</view>
				</view>
			</view>
			<view class="row-3">
				<text>共{{pageNum}}面</text>
				<text>总小计：</text>
				<text>{{originalMoney}}元</text>
			</view>
		</view>
		<payCount
		:orderMoney="orderMoney"
		:pageNum="pageNum"
		></payCount>
	</view>
</template>

<script>
import payCount from '../../components/payCount.vue';
import payModel from '../../common/js/pay.js';

export default {
	components: {
		payCount
	},
	data() {
		return {
			main_id: 0,
			is_show_detail:false,
			voucherList: [],
			voucherName: '',
			//优惠券下标
			voucherIndex: 0,
			//默认支付类型
			default_pay: 'wxpay',
			//钱包余额
			balance: 0,
			//打印任务列表
			printTaskList: [],
			//取件码
			receiveCode:'',
			//折扣后总支付金额
			orderMoney: 0,
			//原始价格
			originalMoney:0,
			pageNum: 0
		};
	},
	computed:{
		voucherIndex(){
			return this.voucherIndex
		},
		default_pay(){
			return this.default_pay
		}
	},
	watch:{
		voucherIndex(val){
			this.voucherIndex = val
			this.getOrderInfo(this.voucherIndex, this.default_pay)
		},
		default_pay(val){
			this.default_pay = val
			this.getOrderInfo(this.voucherIndex, this.default_pay)
		}
	},
	async onLoad(option) {
		let main_id = this.main_id =  option.main_id;
		let userInfo = await this.$helper._getCache('userInfo')
		if(userInfo.member_type == 1){
			this.default_pay = 'wxpay'
		}
		if(userInfo.member_type == 2){
			this.default_pay = 'balance'
		}
		
		// this.getOrderInfo(this.voucherIndex,this.default_pay)
		let that = this
		uni.$on('paySub', async function(){
			let ret = await that.$helper.httpPost(that.$api.paySign_url_post,
			{main_id:that.main_id,
			voucher_index:that.voucherIndex,
			default_pay: that.default_pay
			});
			uni.showToast({
				title: ret.msg,
				icon: 'none',
				duration:3000
			});
			if (ret.state == 'success' && that.default_pay == 'wxpay') {
				// #ifdef MP-WEIXIN
				let state = await payModel.wxPay(ret.data)
				if(state == true){
					uni.showToast({
						title:'支付成功'
					})
				}
				// #endif
				// #ifdef MP-QQ
				uni.showToast({
					title:'QQ支付功能开发中-可使用微信',
					icon:'none'
				})
				// #endif
			}
		})
	},
	methods:{
		selectVoucher: function(e) {
			this.voucherName = this.voucherList[e.target.value]['title']
			this.voucherIndex = e.target.value
        },
		async getOrderInfo(voucherIndex,default_pay){
			let query = this.$helper.objToQuery({
				main_id: this.main_id,
				//默认取第一个能用的优惠券
				voucher_index: voucherIndex,
				default_pay:default_pay
			})
			let ret = await this.$helper.httpGet(this.$api.payOrderInfo_url_get+query);
			if (ret.state == 'success') {
				uni.showToast({
					title: ret.msg,
					icon: 'none'
				});
				this.voucherList = ret.data.voucherList;
				this.balance = ret.data.balance;
				this.default_pay = ret.data.default_pay
				this.printTaskList = ret.data.taskList;
				this.receiveCode = ret.data.receiveCode;
				this.orderMoney = ret.data.orderMoney;
				this.originalMoney = ret.data.originalMoney;
				this.pageNum = ret.data.pageNum;
				this.voucherName = this.voucherList[this.voucherIndex].title;
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $color-f8;
}
.content {
	padding: 20upx 40upx;
	& .banner-image {
		width: 100%;
		height: 98upx;
		border-radius: 49upx;
	}
	& .pay-type {
		margin-top: 30upx;
		padding: 42upx 29upx;
		background: $color-ff;
		border-radius: 30upx;
		& .pay-type-title {
			@include font-no-height(30upx, 500, $color-33);
		}
		& .pay-type-select {
			margin-top: 50upx;
			@include display-flex-space-between;
			& .pay-type-select-title {
				@include display-flex-start;
				image {
					@include w-h(35upx, 35upx);
				}
				text:nth-child(2) {
					padding-left: 10upx;
					@include font-no-height(32upx, 500, $color-66);
				}
				text:nth-child(3) {
					@include font-no-height(28upx, 500, $color-66);
				}
			}
			& .pay-checked {
				@include w-h(40upx, 40upx);
			}
		}
	}
	& .voucher-cont {
		@include display-flex-space-between;
		padding: 52upx 28upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(30upx, 500, $color-33);
		}
		& .selector {
			@include display-flex-start;
			& .picker-style {
				@include font-no-height(28upx, 500, $color-66);
			}
			image {
				@include w-h(25upx, 25upx);
			}
		}
	}
	& .qujian-code {
		padding: 52upx 28upx 30upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		view:nth-child(1) {
			@include font-no-height(30upx, 500, $color-33);
		}
		view:nth-child(2) {
			@include font-no-height(80upx, 500, $color-33);
			text-align: center;
		}
	}
	& .fee-detail {
		padding: 44upx 30upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .row-1 {
			@include display-flex-space-between;
			padding-bottom: 42upx;
			border-bottom: 2upx solid $color-f1;
			& .title {
				@include font-no-height(30, 500, $color-33);
			}
			& .play-btn {
				image {
					@include w-h(30upx, 30upx);
				}
				& .shouqi {
					padding-left: 10upx;
					@include font-no-height(24, 500, $color-A4);
				}
				& .zhankai {
					padding-left: 10upx;
					@include font-no-height(24, 500, $color-3985FF);
				}
			}
		}
		& .row-2 {
			border-bottom: 2upx solid $color-f1;
			& .title {
				margin-top: 20upx;
				@include font-no-height(24upx, 500, $color-99);
			}
			& .row-2-vals {
				padding: 38upx 40upx;
				& .type-val {
					@include display-flex-start;
					text:nth-child(1) {
						@include font-no-height(32upx, 400, $color-33);
					}
					text:nth-child(2) {
						@include font-no-height(32upx, 500, $color-33);
					}
				}
			}
		}
		& .row-3 {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-top: 10upx;
			text:nth-child(1) {
				@include font-no-height(28upx, 400, $color-66);
			}
			text:nth-child(2) {
				padding-left: 10upx;
				@include font-no-height(32upx, 400, $color-00);
			}
			text:nth-child(3) {
				@include font-no-height(32upx, 400, $color-FF4646);
			}
		}
	}
}
</style>
