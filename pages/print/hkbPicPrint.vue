<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<singlePicUp :titleParam="{ name: '户口本打印', pic: 'http://qswy.com/static/xcximg/certificates_s_8@2x.png' }"></singlePicUp>
		<printParam :showParam="showParam"></printParam>
		<footerCount></footerCount>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerCount from '../../components/footerCount.vue';
import printParam from '../../components/printParam.vue';
import singlePicUp from '../../components/singlePicUp.vue';
export default {
	components: {
		scanEquipment,
		printParam,
		footerCount,
		singlePicUp
	},
	data() {
		return {
			showParam: [1, 3]
		};
	}
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
