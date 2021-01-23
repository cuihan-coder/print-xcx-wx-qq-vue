<template>
	<view class="content">
		<view class="order-info">
			<view class="print-name">
				<view class="print-name-1">
					<!-- pptx -->
					<image v-if="info.file_ext == 'pptx' || info.file_ext == 'ppt'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_ppt@2x.png"></image>
					<!-- xlsx -->
					<image v-if="info.file_ext == 'xlsx' || info.file_ext == 'xls'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_exl@2x.png"></image>
					<!-- doc -->
					<image v-if="info.file_ext == 'doc' || info.file_ext == 'docx'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_word@2x.png"></image>
					<!-- pdf -->
					<image v-if="info.file_ext == 'pdf'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_pdf@2x.png"></image>
					<!-- 图片打印 -->
					<image v-if="~['png','jpg','jpeg'].indexOf(info.file_ext) != 0" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/certificates_s_5@2x.png"></image>
					{{info.file_name}}
				</view>
				<!-- <text class="ydy">已打印</text> -->
				<!-- <text class="ddy">待打印</text> -->
				<!-- <text class="dzf">待支付</text> -->
				<!-- 	<text class="clz">处理中</text> -->
				<!-- 	<text class="tksb">退款失败</text> -->
				<text v-if="info.is_print == 1" class="ydy">已打印</text>
				<text v-if="info.is_print == 0 && info.is_pay == 1 && info.is_tk == 0" class="ddy">待打印</text>
				<text v-if="info.is_pay == 0 "  class="dzf">待支付</text>
				<text  v-if="info.is_pay == 1 && info.is_tk == 1" class="clz">处理中</text>
				<text  v-if="info.is_pay == 1 && info.is_tk == 3"  class="tksb">退款失败</text>
			</view>
			<view class="print-type-info">
				<view class="title">类别一</view>
				<view class="type-detail">
					<view class="item">
						<text>项目：</text>
						<text>{{info.detail}}</text>
					</view>
					<view class="item">
						<text>单价：</text>
						<text>{{info.avg_price}}元/份</text>
					</view>
					<view class="item">
						<text>小计：</text>
						<text>{{info.price}}元</text>
					</view>
				</view>
			</view>
			<view class="money-heji">
				<text>共{{(info.end_page - info.start_page + 1 ) * info.printNum}}面</text>
				<text>总小计：</text>
				<text>{{info.price}}元</text>
			</view>
			<view class="detail-desc">编号：{{info.order_no}}</view>
			<view class="detail-desc">时间：{{info.created_at}}</view>
			<view class="detail-desc">优惠：{{info.voucher_money}}元</view>
			<view class="sj-pay">
				<text>实付：</text>
				<text>{{info.price - info.voucher_money}}元</text>
			</view>
		</view>
		<!-- 待打印出现 -->
		<view class="ddy-block" v-if="info.is_pay == 1 && info.is_print == 0">
			<view class="ddqjm">
				<view>到店取件码</view>
				<view>{{info.receive_code}}</view>
			</view>
			<navigator open-type="navigate" :url="'/pages/order/tksq?taskId='+info.id" class="sq-tuikuan">申请退款</navigator>
		</view>

		<!-- 待支付 -->
		<view class="ljzf" v-if="info.is_pay == 0 && info.is_print == 0">
			<navigator :url="'/pages/print/payPrint?main_id=' + info.main_order_id + '&task_id=' + info.id" class="btn">立即支付</navigator>
		</view>

		<!-- 已打印出现 -->
		<view class="ydy-block" v-if="info.is_pay ==1 && info.is_print == 1">
			<navigator class="sq-tuikuan" :url="'/pages/order/tksq?taskId='+info.id">申请退款</navigator>
		</view>
		<!-- 处理中出现 -->
		<view class="clz-tip"  v-if="info.is_pay ==1 && info.is_tk == 1">
			已提交退款申请，请耐心等待客服审核，如审核通过， 资金将原路返回。
		</view>
		<!-- 退款失败出现 -->
		<view class="tksb-tip" v-if="info.is_pay ==1 && info.is_tk == 3">很抱歉，经审核，机器没有出现问题，您的退款失败。 如不接受，可再次提交退款申请。</view>

		<!-- 已退款出现 -->
		<view class="tksb-tip" v-if="info.is_pay ==1 && info.is_tk == 2">已退款，资金原路返回。</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taskId: '',
			info:{}
		}
	},
	async onLoad(option) {
		this.taskId = option.taskId
		let query = this.$helper.objToQuery({
			taskId:this.taskId
		});
		let ret = await this.$helper.httpGet(this.$api.orderInfo_url_get + query);
		if(ret.state == 'success'){
			this.info = ret.data.info
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

	& .order-info {
		padding: 29upx 32upx;
		background: $color-ff;
		border-radius: 30upx;
		& .print-name {
			@include display-flex-space-between;
			padding-bottom: 45upx;
			border-bottom: 2upx solid $color-f1;
			& .print-name-1 {
				width: 80%;
				white-space: nowrap;
				overflow-y: hidden;
				text-overflow: ellipsis;
				@include item-center;
				image {
					@include w-h(56upx, 56upx);
					flex-shrink:0;
					padding-right: 10upx;
				}
				@include font-no-height(30upx, 500, $color-33);
			}
			//已打印
			& .ydy {
				@include font-no-height(30upx, 400, $color-99);
			}
			//待打印
			& .ddy {
				@include font-no-height(30upx, 400, $color-1668FF);
			}
			//待支付
			& .dzf {
				@include font-no-height(30upx, 400, $color-FF7420);
			}
			//处理中
			& .clz {
				@include font-no-height(30upx, 400, $color-1668FF);
			}
			//退款失败
			& .tksb {
				@include font-no-height(30upx, 400, $color-FF3434);
			}
			& .ytk {
				@include font-no-height(30upx, 400, $color-99);
			}
		}
		& .print-type-info {
			margin-top: 20upx;
			& .title {
				@include font-no-height(24upx, 500, $color-99);
			}
			& .type-detail {
				padding: 38upx 40upx;
				border-bottom: 2upx solid $color-f1;
				& .item {
					text:nth-child(1) {
						@include font-no-height(32upx, 500, $color-33);
					}
					text:nth-child(2) {
						@include font-no-height(32upx, 500, $color-00);
					}
				}
			}
		}
		& .money-heji {
			text-align: right;
			padding: 29upx 0 38upx 0;
			margin-bottom: 20upx;
			border-bottom: 2upx solid $color-f1;
			text:nth-child(1) {
				@include font-no-height(28upx, 500, $color-66);
			}
			text:nth-child(2) {
				@include font-no-height(32upx, 500, $color-00);
				padding-left: 10upx;
			}
			text:nth-child(3) {
				@include font-no-height(32upx, 500, $color-FF4646);
			}
		}
		& .detail-desc {
			@include font-no-height(28upx, 400, $color-66);
			margin-top: 20upx;
		}
		& .sj-pay {
			margin-top: 20upx;
			text:nth-child(1) {
				@include font-no-height(28upx, 400, $color-66);
			}
			text:nth-child(2) {
				@include font-no-height(28upx, 400, $color-FF4646);
			}
		}
	}

	& .ddy-block {
		& .ddqjm {
			margin-top: 20upx;
			padding: 42upx 29upx;
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
		& .sq-tuikuan {
			width: 100%;
			margin: 300upx 0 100upx 0;
			@include font-no-height(28upx, 400, $color-66);
			text-align: center;
		}
	}
	& .ydy-block {
		& .sq-tuikuan {
			width: 100%;
			position: absolute;
			bottom: 100upx;
			left: 0;
			@include font-no-height(28upx, 400, $color-66);
			text-align: center;
		}
	}
	& .ljzf {
		margin-top: 280upx;
		& .btn {
			margin: 20upx auto 0;
			width: 520upx;
			line-height: 95upx;
			background: linear-gradient(-30deg, #fd7028, #fc4231);
			box-shadow: 0 10upx 8upx #f6a69f;
			border-radius: 48upx;
			@include font-no-height(36upx, 400, $color-ff);
			text-align: center;
		}
		& .sq-tuikuan {
			width: 100%;
			margin: 96upx 0 100upx 0;
			@include font-no-height(28upx, 400, $color-66);
			text-align: center;
		}
	}
	& .clz-tip {
		margin-top: 60upx;
		@include font-no-height(28upx, 400, $color-1668FF);
		line-height: 30upx;
	}
	& .tksb-tip {
		margin-top: 60upx;
		@include font-no-height(28upx, 400, $color-FF3434);
		line-height: 30upx;
	}
}
</style>
