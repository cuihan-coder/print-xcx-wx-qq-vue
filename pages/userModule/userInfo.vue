<template>
	<view class="content">
		<view class="top-back">
			<view class="title">青速文印</view>
			<view class="userinfo">
				<image class="userinfo-image" src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image>
				<view class="userinfo-right">
					<view class="userinfo-name-vip">
						李天霸 <image  class="image" src="http://qswy.com/static/xcximg/me_vip@2x.png"></image>
					</view>
					<view class="userinfo-phone">18000012234</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="order-block">
				<view class="all-order">
					<view>订单</view>
					<view>全部订单<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image></view>
				</view>
				<view class="my-play-btn-list">
					<navigator class="my-play-btn" open-type="navigate" url="../print/suborder">
						<image class="btn-img" src="http://qswy.com/static/xcximg/me_order_1@2x.png"></image>
						<view>待支付</view>
					</navigator>
					<view class="my-play-btn">
						<view class="tip-num">99</view>
						<image  class="btn-img" src="http://qswy.com/static/xcximg/me_order_2@2x.png"></image>
						<view>待打印</view>
					</view>
					<view class="my-play-btn">
						<image  class="btn-img" src="http://qswy.com/static/xcximg/me_order_3@2x.png"></image>
						<view>已打印</view>
					</view>
					<view class="my-play-btn">
						<image  class="btn-img" src="http://qswy.com/static/xcximg/me_order_4@2x.png"></image>
						<view>售后</view>
					</view>
				</view>
			</view>
			<view class="active-list">
				<view class="active-item border-bottom-line">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/me_menu_1@2x.png"></image>
						<view>我的钱包</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item border-bottom-line">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/conpon@2x.png"></image>
						<view>优惠券</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item border-bottom-line">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/me_menu_3@2x.png"></image>
						<view>分享有礼</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/me_menu_4@2x.png"></image>
						<view>活动中心</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
			</view>
			<view class="active-list margin-bootom-height">
				<view class="active-item border-bottom-line">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/me_menu_5@2x.png"></image>
						<view>使用帮助</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item">
					<view class="active-item-left">
						<image class="active-icon" src="http://qswy.com/static/xcximg/me_menu_6@2x.png"></image>
						<view>联系我们</view>
					</view>
					<image class="more-jt" src="http://qswy.com/static/xcximg/file_more@2x.png"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background-color: $color-f1;
	}
	.content {
		@include center;
		& .top-back{
			position: fixed;
			top: 0;
			left: 0;
			width: 750upx;
			height: 395upx;
			background: url('http://qswy.com/static/xcximg/a.png') no-repeat;
			background-size: contain;
			& .title{
				margin-top: var(--status-bar-height);
				margin-left: 30upx;
				@include font-no-height(40upx, bold, $color-ff);
			}
			z-index: 2;
		}
		& .userinfo{
			width: calc(100% - 196upx);
			margin: 70upx auto 0;
			@include display-flex-start;
			padding: 50upx 58upx;
			background: $color-ff;
			border-radius: 30upx;
			& .userinfo-image{
				@include w-h(100upx, 100upx);
				border-radius: 50%;
			}
			& .userinfo-right{
				padding-left: 14upx;
				& .userinfo-name-vip{
					@include item-center;
					@include font-no-height(34upx, 500, $color-33);
				    & .image{
						@include w-h(34upx, 34upx);
					}
				}
				
				& .userinfo-phone{
					@include font-no-height(28upx, 400, $color-99);
				}	
			}
		}
		
		& .container{
			width: calc(100% - 80upx);
			margin: 400upx auto 0;
			& .order-block{
				width: calc(100% - 64upx);
				padding: 30upx 34upx 42upx;
				background: $color-ff;
				border-radius: 30upx;
				& .all-order{
					@include display-flex-space-between;
					& view:nth-child(1){
						@include font-no-height(28upx, 500, $color-33);
					}
					& view:nth-child(2){
						@include item-center;
						@include font-no-height(24upx, 500, $color-66);
					}
					& .more-jt{
						padding-left: 5upx;
						@include w-h(16upx, 18upx);
					}
				}
				
				& .my-play-btn-list{
					@include display-flex-space-around;
					& .my-play-btn{
						position: relative;
						display: grid;
						justify-items: center;
						margin-top: 44upx;
						& .btn-img{@include w-h(48upx,48upx);}
						& view{
							padding-top: 18upx;
							@include  font-no-height(26upx, 500, $color-00);
						}
						& .tip-num{
							padding: 0;
							position: absolute;
							top: -16upx;
							right: -8upx;
							width: 40upx;
							line-height: 24upx;
							background: $color-FF3D61;
							border-radius: 10upx;
							@include  font-no-height(20upx, 400, $color-ff);
							text-align: center;
						}
					}
				}
			}
			
			& .active-list{
				width: 100%;
				padding: 10upx 0;
				margin-top: 20upx;
				background: $color-ff;
				border-radius: 30upx;
				& .active-item{
					padding: 42upx 44upx 42upx;
					@include display-flex-space-between;
					& .active-item-left{
						& .active-icon{
							@include w-h(44upx, 40upx);
						}
						@include display-flex-start;
						& view{
							padding-left: 19upx;
							@include font-no-height(30upx, 500, $color-00);
						}
					}
					& .more-jt{
						@include w-h(16upx, 18upx);
					}
				}
				& .border-bottom-line{
					border-bottom: solid 2upx $color-f1;
				}
			}
			& .margin-bootom-height{
				margin-bottom: 92upx;
			}
		}
	}
	
	
</style>
