<template>
	<view class="content">
		<view v-if="tab == 1" class="change-menu daizhifu">
			<view @click="tab = 1" class="active">待支付</view>
			<view @click="tab = 2" class="border-line">待打印</view>
			<view @click="tab = 3" class="border-line">已打印</view>
			<view @click="tab = 4">售后</view>
		</view>
		<view v-if="tab == 2" class="change-menu daiday">
			<view @click="tab = 1">待支付</view>
			<view @click="tab = 2" class="active">待打印</view>
			<view @click="tab = 3" class="border-line">已打印</view>
			<view @click="tab = 4">售后</view>
		</view>
		<view v-if="tab == 3" class="change-menu yiday">
			<view @click="tab = 1" class="border-line">待支付</view>
			<view @click="tab = 2">待打印</view>
			<view @click="tab = 3" class="active">已打印</view>
			<view @click="tab = 4">售后</view>
		</view>
		<view v-if="tab == 4" class="change-menu shouhou">
			<view @click="tab = 1" class="border-line">待支付</view>
			<view @click="tab = 2" class="border-line">待打印</view>
			<view @click="tab = 3">已打印</view>
			<view @click="tab = 4" class="active">售后</view>
		</view>
		<view v-for="(item, index) in list" class="order-item" :key="index">
			<ordedetail
				:file_name="item.file_name"
				:file_ext="item.file_ext"
				:is_print="item.is_print"
				:is_pay="item.is_pay"
				:is_tk="item.is_tk"
				:detail="item.detail"
				:price="item.price"
				:ctime="item.created_at"
				:voucherMoney="item.voucher_money"
				:taskId="item.id"
			></ordedetail>
			<!-- 支付取消 -->
			<cancelorpay v-if="item.is_pay == 0" :index="index"></cancelorpay>
			<!-- 取件码 -->
			<qjCode :receive_code="item.receive_code"></qjCode>
		</view>
	</view>
</template>

<script>
import ordedetail from '@/components/order/ordedetail.vue';
import cancelorpay from '@/components/order/cancelorpay.vue';
import qjCode from '@/components/order/qjCode.vue';

export default {
	components: {
		ordedetail,
		cancelorpay,
		qjCode
	},
	data() {
		return {
			tab: 1,
			page: 1,
			pageSize: 15,
			list:[]
		};
	},
	async onLoad(option) {
		this.tab = option.tab;
		let that = this
		//取消订单
		uni.$on('cancelOrder', async function(orderlistIndex){
			let postData = {
				mainId:that.list[orderlistIndex].main_order_id,
				taskId:that.list[orderlistIndex].id,
			}
			let ret = await that.$helper.httpPost(that.$api.cancelOrder_url_post,postData);
			if(ret.state == 'success'){
				that.list.splice(orderlistIndex, 1)
				uni.showToast({
					title:ret.msg,
					duration:3000,
					icon:'none'
				})
			}
		})
		uni.$on('payOrder',function(orderlistIndex){
			uni.navigateTo({
				url:"/pages/print/payPrint?main_id=" + that.list[orderlistIndex].main_order_id + '&task_id=' + that.list[orderlistIndex].id
			})
		})
	},
	//分页加载
	onReachBottom() {
		this.getOrderList()
	},
	computed: {
		tab_change() {
			return this.tab;
		}
	},
	watch: {
		tab_change(val) {
			this.tab = val
			this.page = 1
			this.list = []
			//获取对应tab的内容
			this.getOrderList()
		}
	},
	methods: {

		async getOrderList(type) {
			let query = this.$helper.objToQuery({
				type:this.tab,
				page: this.page,
				pageSize: this.pageSize
			});
			let ret = await this.$helper.httpGet(this.$api.orderList_url_get + query);
			if(ret.state == 'success'){
				if(ret.data.length == 0 && this.page > 1){
					uni.showToast({
						title:'记录没有了',
						duration:3000,
						icon:'none'
					})
					return
				}
				for(let item of ret.data){
					this.list.push(item)
				}
				this.page++
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
	& .change-menu {
		@include w-h(100%, 88upx);
		@include display-flex-start;

		view {
			width: 25%;
			line-height: 100%;
			@include font-no-height(26upx, 400, $color-ff);
			text-align: center;
		}
		& .active {
			@include font-no-height(26upx, 400, $color-22);
		}

		& .border-line {
			border-right: solid 3upx $color-ff;
		}
	}
	& .daizhifu {
		background: url('https://qs.shideng-inc.com/static/xcximg/me_dingdan_tab1@2x.png');
		background-size: 100%;
	}
	& .daiday {
		background: url('https://qs.shideng-inc.com/static/xcximg/me_dingdan_tab2@2x.png');
		background-size: 100%;
	}
	& .yiday {
		background: url('https://qs.shideng-inc.com/static/xcximg/me_dingdan_tab3@2x.png');
		background-size: 100%;
	}
	& .shouhou {
		background: url('https://qs.shideng-inc.com/static/xcximg/me_dingdan_tab4@2x.png');
		background-size: 100%;
	}
	& .order-item {
		margin-top: 20upx;
		padding: 30upx;
		background: $color-ff;
		border-radius: 30upx;
	}
}
</style>
