<template>
	<view class="content">
		<view class="top-back">
			<view class="title">青速文印</view>
			<view class="userinfo" v-if="userInfo.nickname && userInfo.headimgurl">
				<image class="userinfo-image" :src="userInfo.headimgurl"></image>
				<view class="userinfo-right">
					<view class="userinfo-name-vip">
						{{userInfo.nickname}}
						<image v-if="userInfo.member_type == 2" class="image" src="https://qs.shideng-inc.com/static/xcximg/me_vip@2x.png"></image>
					</view>
<!-- 					<view v-if="userInfo.mobile" class="userinfo-phone">{{userInfo.mobile}}</view>
					<button class="mobile-btn" v-if="userInfo.mobile == ''" open-type="getPhoneNumber" @getphonenumber="getphonenumber">同步手机号</button> -->
				</view>
			</view>
			<view class="userinfo" v-if="!userInfo.nickname && !userInfo.headimgurl">
				<button open-type="getUserInfo" @getuserinfo="getUserInfo"	>点击获取用户头像</button>
			</view>
		</view>
		<view class="container">
			<view class="order-block">
				<view class="all-order">
					<view>订单</view>
					<view @click="toPage('/pages/order/orderList?tab=1')">
						全部订单
						<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
					</view>
				</view>
				<view class="my-play-btn-list">
					<navigator class="my-play-btn" open-type="navigate" url="/pages/order/orderList?tab=1">
						<image class="btn-img" src="https://qs.shideng-inc.com/static/xcximg/me_order_1@2x.png"></image>
						<view>待支付</view>
					</navigator>
					<navigator class="my-play-btn" open-type="navigate" url="/pages/order/orderList?tab=2">
						<view class="tip-num">{{waitPrintNum}}</view>
						<image class="btn-img" src="https://qs.shideng-inc.com/static/xcximg/me_order_2@2x.png"></image>
						<view>待打印</view>
					</navigator>
					<navigator class="my-play-btn" open-type="navigate" url="/pages/order/orderList?tab=3">
						<image class="btn-img" src="https://qs.shideng-inc.com/static/xcximg/me_order_3@2x.png"></image>
						<view>已打印</view>
					</navigator>
					<navigator class="my-play-btn" open-type="navigate" url="/pages/order/orderList?tab=4">
						<image class="btn-img" src="https://qs.shideng-inc.com/static/xcximg/me_order_4@2x.png"></image>
						<view>售后</view>
					</navigator>
				</view>
			</view>
			<view class="active-list">
				<view class="active-item border-bottom-line"  @click="toPage('/pages/userModule/topup')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/me_menu_1@2x.png"></image>
						<view>我的钱包</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item border-bottom-line" @click="toPage('/pages/userModule/voucher')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/conpon@2x.png"></image>
						<view>优惠券</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item border-bottom-line" @click="toPage('/pages/userModule/shareFriend')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/me_menu_3@2x.png"></image>
						<view>分享有礼</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item" @click="toPage('/pages/index/activeList')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/me_menu_4@2x.png"></image>
						<view>活动中心</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
			</view>
			<view class="active-list margin-bootom-height">
				<view class="active-item border-bottom-line" @click="toPage('/pages/service/help')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/me_menu_5@2x.png"></image>
						<view>使用帮助</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
				<view class="active-item"  @click="toPage('/pages/service/contact')">
					<view class="active-item-left">
						<image class="active-icon" src="https://qs.shideng-inc.com/static/xcximg/me_menu_6@2x.png"></image>
						<view>联系我们</view>
					</view>
					<image class="more-jt" src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
				</view>
			</view>
			<view class="pad-height"></view>
			<footerMenu></footerMenu>
		</view>
	</view>
</template>

<script>
import footerMenu from '../../components/footerMenu.vue';
export default {
	components: {
		footerMenu
	},
	data() {
		return {
			userInfo:{},
			//待打印数量
			waitPrintNum:0
		};
	},
	async onLoad() {
		this.userInfo =  await this.$helper._getCache('userInfo')
		//获取用户的相关信息
		let ret = await this.$helper.httpGet(this.$api.userInitData_url_get)
		if(ret.state == 'success'){
			this.waitPrintNum = ret.data.waitPrintNum
		}
	},
	
	methods: {
		toPage(url) {
			uni.navigateTo({
				url: url
			});
		},
		async getUserInfo(e){
			let ret = await this.$helper.httpPost(this.$api.updateUserInfo_url_post,{updateInfo:{
				headimgurl:e.detail.userInfo.avatarUrl,
				city:e.detail.userInfo.city,
				country:e.detail.userInfo.country,
				sex:e.detail.userInfo.gender,
				nickname: e.detail.userInfo.nickName,
				province:e.detail.userInfo.province,
			}})
			if(ret.state == 'success'){
				this.userInfo = ret.data.userInfo
				this.$helper._setCache('tokenExpireTime', ret.data.expireTime)
				this.$helper._setCache('loginToken', ret.data.token)
				this.$helper._setCache('userInfo', ret.data.userInfo)
			}
		},
		async getphonenumber(e){
			console.log(e)
			let ret = await this.$helper.httpPost(this.$api.updateUserInfo_url_post,{updateInfo:{
				mobile:e.detail.userInfo.avatarUrl,
			}})
			if(ret.state == 'success'){
				this.userInfo = ret.data.userInfo
				this.$helper._setCache('tokenExpireTime', ret.data.expireTime)
				this.$helper._setCache('loginToken', ret.data.token)
				this.$helper._setCache('userInfo', ret.data.userInfo)
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
	@include center;
	& .top-back {
		position: fixed;
		top: 0;
		left: 0;
		width: 750upx;
		height: 395upx;
		background: url('https://qs.shideng-inc.com/static/xcximg/a.png') no-repeat;
		background-size: contain;
		& .title {
			margin-top: var(--status-bar-height);
			margin-left: 30upx;
			@include font-no-height(40upx, bold, $color-ff);
		}
		z-index: 2;
	}
	& .userinfo {
		width: calc(100% - 196upx);
		margin: 70upx auto 0;
		@include display-flex-start;
		padding: 50upx 58upx;
		background: $color-ff;
		border-radius: 30upx;
		& .userinfo-image {
			@include w-h(100upx, 100upx);
			border-radius: 50%;
		}
		& .userinfo-right {
			padding-left: 14upx;
			& .userinfo-name-vip {
				@include item-center;
				@include font-no-height(34upx, 500, $color-33);
				& .image {
					@include w-h(34upx, 34upx);
				}
			}

			& .userinfo-phone {
				@include font-no-height(28upx, 400, $color-99);
			}
		}
		& .mobile-btn{
			@include font-no-height(24upx, 500, $color-4F79FF);
		}
	}

	& .container {
		width: calc(100% - 80upx);
		margin: 400upx auto 0;
		& .order-block {
			width: calc(100% - 64upx);
			padding: 30upx 34upx 42upx;
			background: $color-ff;
			border-radius: 30upx;
			& .all-order {
				@include display-flex-space-between;
				& view:nth-child(1) {
					@include font-no-height(28upx, 500, $color-33);
				}
				& view:nth-child(2) {
					@include item-center;
					@include font-no-height(24upx, 500, $color-66);
				}
				& .more-jt {
					padding-left: 5upx;
					@include w-h(16upx, 18upx);
				}
			}

			& .my-play-btn-list {
				@include display-flex-space-around;
				& .my-play-btn {
					position: relative;
					display: grid;
					justify-items: center;
					margin-top: 44upx;
					& .btn-img {
						@include w-h(48upx, 48upx);
					}
					& view {
						padding-top: 18upx;
						@include font-no-height(26upx, 500, $color-00);
					}
					& .tip-num {
						padding: 0;
						position: absolute;
						top: -16upx;
						right: -8upx;
						width: 40upx;
						line-height: 24upx;
						background: $color-FF3D61;
						border-radius: 10upx;
						@include font-no-height(20upx, 400, $color-ff);
						text-align: center;
					}
				}
			}
		}

		& .active-list {
			width: 100%;
			padding: 10upx 0;
			margin-top: 20upx;
			background: $color-ff;
			border-radius: 30upx;
			& .active-item {
				padding: 42upx 44upx 42upx;
				@include display-flex-space-between;
				& .active-item-left {
					& .active-icon {
						@include w-h(44upx, 40upx);
					}
					@include display-flex-start;
					& view {
						padding-left: 19upx;
						@include font-no-height(30upx, 500, $color-00);
					}
				}
				& .more-jt {
					@include w-h(16upx, 18upx);
				}
			}
			& .border-bottom-line {
				border-bottom: solid 2upx $color-f1;
			}
		}
		& .margin-bootom-height {
			margin-bottom: 92upx;
		}
	}
	& .pad-height {
		width: 100%;
		height: 120upx;
	}
}
</style>
