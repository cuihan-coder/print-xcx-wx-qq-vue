<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<a4Piccom :titleParam="{ name: '图片打印', pic: 'https://qs.shideng-inc.com/static/xcximg/certificates_s_5@2x.png' }"></a4Piccom>
		<printParam :showParam="showParam"></printParam>
		<footerCount :pageNums="pageNums" :orderPrice="orderMoney"></footerCount>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerCount from '../../components/footerCount.vue';
import printParam from '../../components/printParam.vue';
import a4Piccom from '../../components/a4Piccom.vue';
import payModel from '../../common/js/pay.js';
import a4Pic from '../../common/js/a4Pic.js'
export default {
	components: {
		scanEquipment,
		printParam,
		footerCount,
		a4Piccom
	},
	data() {
		return {
			showParam: [1, 3],
			color: 1,
			printNum: 1,
			orderMoney: 0,
			pageNums: 0,
			imgUrl: '',
			//任务ID
			taskId: ''
		};
	},
	async onLoad() {
		let that = this;
		
		//图片上传成功
		uni.$on('picUploadSucToImgurl', async function(imgUrl) {
			that.imgUrl = imgUrl;
			//创建打印任务记录
			let postData = {
				imgUrl,
				color: that.color,
				printNum: that.printNum,
				pic_is_a4: 1,
				template_num:5
			};
			let ret = await that.$helper.httpPost(that.$api.createPicPrintTask_url_post, postData);
			if (ret.state == 'success') {
				that.taskId = ret.data.taskId;
				that.pageNums = ret.data.file_pages;
				that.orderMoney = ret.data.price;
			}
		});
		//打印参数变动
		uni.$on('picPrintParamChange', async function(data) {
			that[data.field] = data.val;
			//加载价格
			let postData = {
				document_type: 2, //2 相片打印
				isA4: 1, //相片打印至A4
				color: that.color,
				printNum: that.printNum,
				id:that.taskId
			};
			let ret = await that.$helper.httpPost(that.$api.changeParamPrice_url_post, postData);
			if (ret.state == 'success') {
				that.orderMoney = ret.data.price;
				that.pageNums = ret.data.printNum;
			}
		});

		//提交订单
		uni.$on('subOrder', async function() {
			if (that.is_subing == 1) {
				return;
			}
			that.is_subing = 1;
			//提交打印的上 左 高参数 到打印任务
		    await that.$helper.httpPost(that.$api.updatePicPrintSelfdfinedParam_url_post,
			{ taskId: that.taskId, 
			left: parseInt((that.$store.state.selfprint.left / a4Pic.A4Height) * a4Pic.A4HeightMm),
			top: parseInt((that.$store.state.selfprint.top / a4Pic.A4Height) * a4Pic.A4HeightMm) , 
			height: parseInt((that.$store.state.selfprint.imgH / a4Pic.A4Height) * a4Pic.A4HeightMm)
			})
			
			let device_code = that.$store.state.deviceCode;
			let ret = await that.$helper.httpPost(that.$api.addMainOrder_url_post, { taskIds: [that.taskId], device_code });
			if (ret.state == 'success') {
				uni.showToast({
					title: ret.msg,
					icon: 'none',
					duration: 3000
				});
				uni.navigateTo({
					url: '/pages/print/payPrint?main_id=' + ret.data.main_id
				});
			}
			that.is_subing = 0;
		});
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
