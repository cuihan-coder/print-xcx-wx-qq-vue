<template>
	<view class="content">
		<!-- 代金券 -->
		<djq money="5" useWhere="消费满20元时使用" expireTime="2021-01-14 23:59:59" cardType="证件照"></djq>
		<!-- 奖励券 -->
		<jlq money="5" useWhere="分享奖励券，满10元减5元" expireTime="23小时10分50秒" cardType="证件照"></jlq>
		<!-- 新人券 -->
		<xrq money="5" useWhere="新人凭券免费打印一张" expireTime="23小时10分50秒" cardType="证件照"></xrq>
		<!-- 已过期券 -->
		<ygqq money="5" useWhere="充值满50元时使用" expireTime="2017-09-14" cardType="证件照"></ygqq>
		<ygqq money="5" useWhere="充值满50元时使用" expireTime="2017-09-14" cardType="证件照"></ygqq>
		<ygqq money="5" useWhere="充值满50元时使用" expireTime="2017-09-14" cardType="证件照"></ygqq>
		<ygqq money="5" useWhere="充值满50元时使用" expireTime="2017-09-14" cardType="证件照"></ygqq>
	</view>
</template>

<script>
import djq from '../../components/voucher/djq.vue';
import jlq from '../../components/voucher/jlq.vue';
import xrq from '../../components/voucher/xrq.vue';
import ygqq from '../../components/voucher/ygqq.vue';

export default {
	components: {
		djq,
		jlq,
		xrq,
		ygqq
	},
	data() {
		return {};
	},
	async onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: $color-f1;
}
.content {
	padding: 20upx 40upx;
}
</style>
