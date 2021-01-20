<template>
	<view class="order-infos" @click="toPage('/pages/order/orderInfo?taskId='+taskId)">
		<view class="type-img">
			<view>
				<!-- pptx -->
				<image v-if="file_ext == 'pptx' || file_ext == 'ppt'" class="img-icon" src="http://qswy.com/static/xcximg/file_ppt@2x.png"></image>
				<!-- xlsx -->
				<image v-if="file_ext == 'xlsx' || file_ext == 'xls'" class="img-icon" src="http://qswy.com/static/xcximg/file_exl@2x.png"></image>
				<!-- doc -->
				<image v-if="file_ext == 'doc' || file_ext == 'docx'" class="img-icon" src="http://qswy.com/static/xcximg/file_word@2x.png"></image>
				<!-- pdf -->
				<image v-if="file_ext == 'pdf'" class="img-icon" src="http://qswy.com/static/xcximg/file_pdf@2x.png"></image>
				<!-- 图片打印 -->
				<image v-if="~['png','jpg','jpeg'].indexOf(file_ext) != 0" class="img-icon" src="http://qswy.com/static/xcximg/certificates_s_5@2x.png"></image>
				{{file_name}}
			</view>
			<text v-if="is_print == 1" class="ydy">已打印</text>
			<text v-if="is_print == 0 && is_pay == 1" class="ddy">待打印</text>
			<text v-if="is_pay == 0 "  class="dzf">待支付</text>
			<text  v-if="is_pay == 1 && is_tk == 1" class="clz">处理中</text>
			<text  v-if="is_pay == 1 && is_tk == 3"  class="tksb">退款失败</text>
		</view>
		<view class="print-info" >
			<text class="print-fo">{{detail}}</text>
			<view>
				<text  class="print-fo">计</text>
				<text class="print-mo">{{price}}元</text>
			</view>
		</view>
		<view class="print-ot">时间：{{ctime}}</view>
		<view class="print-ot">实付：{{price - voucherMoney}}元</view>
		<view class="print-ot">优惠：{{voucherMoney}}元</view>
	</view>
</template>

<script>
	export default {
		props:{
			taskId:{
				type:[String,Number],
				default:''
			},
			file_name: {
				type:String,
				default:''
			},
			file_ext: {
				type:String,
				default:''
			},
			is_print: {
				type:[String,Number],
				default:''
			},
			is_pay: {
				type:[String,Number],
				default:''
			},
			is_tk: {
				type:[String,Number],
				default:''
			},
			detail: {
				type:String,
				default:''
			},
			price:{
				type:String,
				default:''
			},
			ctime:{
				type:String,
				default:''
			},
			voucherMoney:{
				type:String,
				default:''
			}
		},
		methods: {
			toPage(url){
				uni.navigateTo({
					url:url
				})
			}
		}
		
		
	};
</script>

<style lang="scss">
.order-infos {
	width: 100%;
	& .type-img {
		@include display-flex-space-between;
		view:nth-child(1) {
			@include item-center;
			@include font-no-height(30upx, 500, $color-33);
			image {
				@include w-h(55upx, 55upx);
				padding-right: 10upx;
			}
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
	& .print-info{
		@include display-flex-space-between;
		padding: 30upx 0;
		border-bottom: 2upx solid $color-f1;
		& .print-fo{
			@include font-no-height(28upx, 500, $color-66);
		}
		& .print-mo{
			padding-left: 10upx;
			@include font-no-height(28upx, 500, $color-FF4646);
		}
	}
	& .print-ot{
		margin-top: 15upx;
		@include font-no-height(28upx, 400, $color-66);
	}
}
</style>
