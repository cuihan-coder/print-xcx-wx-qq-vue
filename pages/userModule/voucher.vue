<template>
	<view class="content">
		<view v-for="(item, index) in list" :key="index">
			
			<!-- 代金券 -->
			<djq v-if="item.get_method == 3" 
			:money="item.use_benefits" 
			:useWhere="item.title" 
			:expireTime="item.expire_time" 
			:cardType="item.document_type_title"></djq>
			<!-- 奖励券 -->
			<jlq 
			v-if="item.get_method == 1" 
			:money="item.use_benefits"
			:useWhere="item.title" 
			:expireTime="item.expire_time" 
			:cardType="item.document_type_title"></jlq>
			<!-- 新人券 -->
			<xrq v-if="item.get_method == 2" 
			:money="item.use_benefits"
			:useWhere="item.title" 
			:expireTime="item.expire_time" 
			:cardType="item.document_type_title"></xrq>
			<!-- 已过期券 -->
			<ygqq v-if="item.get_method == 0" 
			:money="item.use_benefits"
			:useWhere="item.title" 
			:expireTime="item.expire_time" 
			:cardType="item.document_type_title"></ygqq>
			
		</view>
		
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
		return {
			list:[]
		};
	},
	async onLoad() {
		let ret = await this.$helper.httpGet(this.$api.getVoucherList_url_get)
		if(ret.state == 'success'){
			this.list = ret.data.list
		}
		console.log(ret)
	},
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
