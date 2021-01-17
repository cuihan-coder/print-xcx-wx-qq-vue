<template>
	<view class="content">
		<image class="top-guize" src="http://qswy.com/static/xcximg/invitation_rule@2x.png"></image>
		<view class="container">
			<view class="dalibao">
				<image class="title-img" src="http://qswy.com/static/xcximg/invitation_but_1@2x.png"></image>
				<view class="voucher-list">
					<view class="voucher-info" v-for="(item, index) in voucherList" :key="index">
						<view>{{ item.title }}</view>
						<view>
							<text>¥</text>
							<text>{{ item.use_benefits }}</text>
						</view>
						<view>优惠劵</view>
					</view>
					<!-- <view class="voucher-info">
						<view>满1使用</view>
						<view>
							<text>¥</text>
							<text>1</text>
						</view>
						<view>优惠劵</view>
					</view> -->
				</view>
				<view class="share-int">被邀请人完成首笔消费</view>
				<view class="share-int">优惠券自动发送至您的账户中</view>
				<button open-type="share"  class="ljyq-btn">立即邀请</button>
			</view>
			<image class="haoyou-img" src="http://qswy.com/static/xcximg/invitation_but_2@2x.png"></image>
			<scroll-view scroll-y="true" class="yaoqinglist">
				<view class="table-head">
					<text>昵称</text>
					<text>邀请时间</text>
					<text>状态</text>
				</view>
				<view class="share-list" v-for="(item, index) in friendList" :key="index">
					<view>
						<image :src="item.headimgurl"></image>
						{{ item.nickname }}
					</view>
					<view>{{ item.ctime }}</view>
					<view>已注册</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import djq from '../../components/voucher/djq.vue';
import jlq from '../../components/voucher/jlq.vue';
import xrq from '../../components/voucher/xrq.vue';
import ygqq from '../../components/voucher/ygqq.vue';

export default {
	components: {},
	data() {
		return {
			voucherList: [],
			friendList: []
		};
	},
	async onLoad() {
		let ret = await this.$helper.httpGet(this.$api.shareInfo_url_get);
		if (ret.state == 'success') {
			this.voucherList = ret.data.voucherList;
			this.friendList = ret.data.friendList;
		}
	},
	 onShareAppMessage(){
		let that = this
		uni.getProvider({
			service: 'oauth',
			success:async function(res) {
				let userInfo = await that.$helper._getCache('userInfo');
				let plateform = ~res.provider.indexOf('qq') ? 'qq' : 'weixin'
				if(plateform == 'qq'){
					uni.showShareMenu({
						title: '下次打印可以来这里哦！超方便实惠！',
						query: `pid=${userInfo.id}&group_id=${userInfo.group_id}`
					});
				}
				if(plateform == 'weixin'){
					let path = `/pages/index/home?pid=${userInfo.id}&group_id=${userInfo.group_id}`;
					uni.showShareMenu({
						title: '下次打印可以来这里哦！超方便实惠！',
						path: path
					});
				}
			}
		});
		
		
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
.content {
	width: 100%;
	min-height: 2000upx;
	background: url('http://qswy.com/static/xcximg/invitation_bg@2x.png') no-repeat;
	background-size: cover;
	padding-bottom: 100upx;
	& .top-guize {
		position: absolute;
		top: 0;
		right: 44upx;
		@include w-h(82upx, 104upx);
	}
	& .container {
		padding: 920upx 32upx 0;
		& .dalibao {
			min-height: 600upx;
			padding-bottom: 54upx;
			background: url('http://qswy.com/static/xcximg/invitation_reward_bg@2x.png') no-repeat;
			background-size: 100% 100%;
			& .title-img {
				position: absolute;
				top: 866upx;
				left: 10%;
				@include w-h(80%, 102upx);
			}
			& .voucher-list {
				@include display-flex-space-between;
				padding: 100upx 0 43upx;

				& .voucher-info {
					padding-bottom: 20upx;
					@include w-h(32%, 212upx);
					background: url('http://qswy.com/static/xcximg/invitation_coupon_bg@2x.png') no-repeat;
					background-size: cover;
					view:nth-child(1) {
						padding-top: 30upx;
						@include font-no-height(24upx, 500, $color-F9381B);
						opacity: 0.5;
						text-align: center;
					}
					view:nth-child(2) {
						text-align: center;
						text:nth-child(1) {
							@include font-no-height(28upx, 500, $color-F9381B);
						}
						text:nth-child(2) {
							@include font-no-height(52upx, 500, $color-F9381B);
						}
					}
					view:nth-child(3) {
						padding-top: 25upx;
						@include font-no-height(30upx, 500, $color-ff);
						text-align: center;
					}
				}
			}
			& .voucher-list::after {
				content: '';
				@include w-h(32%, 212upx);
			}
			& .share-int {
				@include font-no-height(30upx, 500, $color-2E);
				text-align: center;
			}
			& .ljyq-btn {
				width: 60%;
				line-height: 85upx;
				margin: 72upx auto 0;
				background: linear-gradient(0deg, $color-FE7954 0%, $color-EB3506 100%);
				box-shadow: 0px 4px 0px 0px rgba(245, 89, 43, 0.23);
				border-radius: 42upx;
				@include font-no-height(32upx, 500, $color-ff);
				text-align: center;
			}
		}

		& .haoyou-img {
			position: absolute;
			top: 1645upx;
			left: 10%;
			@include w-h(80%, 102upx);
			z-index: 2;
		}
		& .yaoqinglist {
			min-height: 227upx;
			margin-top: 120upx;
			padding-bottom: 54upx;
			background: url('http://qswy.com/static/xcximg/invitation_people_bg@2x.png') no-repeat;
			background-size: 100% 100%;
			max-height: 360upx;
			overflow-y: scroll;
			overflow: hidden;
			& .table-head {
				padding-top: 100upx;
				text {
					display: inline-block;
					@include font-no-height(26upx, 400, $color-99);
					text-align: center;
				}
				text:nth-child(1) {
					width: 30%;
				}
				text:nth-child(2) {
					width: 40%;
				}
				text:nth-child(3) {
					width: 30%;
				}
			}
			& .share-list {
				padding-top: 24upx;
				@include display-flex-space-between;

				view:nth-child(1) {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30%;
					@include font-no-height(26upx, 500, $color-33);
					image {
						@include w-h(54upx, 54upx);
						border-radius: 50%;
						margin-right: 12upx;
					}
				}
				view:nth-child(2) {
					width: 40%;
					@include font-no-height(26upx, 400, $color-33);
					text-align: center;
				}
				view:nth-child(3) {
					width: 30%;
					@include font-no-height(26upx, 400, $color-33);
					text-align: center;
				}
			}
		}
	}
}
</style>
