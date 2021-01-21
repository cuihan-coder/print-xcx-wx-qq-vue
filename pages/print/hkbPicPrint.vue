<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<singlePicUp :titleParam="{ name: '户口本打印', pic: 'https://qs.shideng-inc.com/static/xcximg/certificates_s_8@2x.png' }"></singlePicUp>
		<printParam :showParam="showParam"></printParam>
		<footerCount :pageNums="pageNums" :orderPrice="orderMoney"></footerCount>
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
			showParam: [1, 3],
			color: 1,
			imgUrl:'',
			printNum: 1, //打印份数
			orderMoney: 0,
			pageNums: 0, //面数
			is_subing: 0,
			taskId: []
		};
	},
	onLoad() {
		let that = this;
		uni.$on('uploadPic',function(imgUrl){
			that.imgUrl = imgUrl
			
			let postData = {
				document_type: 2, //2 相片打印
				isA4: 1, //相片打印至A4
				color: that.color,
				printNum: that.printNum
			};
			that.getPrice(that, postData);
		})
		uni.$on('delImg',function(){
			this.imgUrl = ''
		})
		
		uni.$on('picPrintParamChange', async function(data) {
			that[data.field] = data.val;
			//加载价格
			let postData = {
				document_type: 2, //2 相片打印
				isA4: 1, //相片打印至A4
				color: that.color,
				printNum: that.printNum
			};
			that.getPrice(that, postData);
		});
		//提交订单
		uni.$on('subOrder', async function() {
			if (that.is_subing == 1) {
				return;
			}
			if(!that.imgUrl){
				uni.showToast({
					title: '请上传图片',
					icon: 'none',
					duration: 3000
				});
				return
			}
			that.is_subing = 1;
			
			//创建打印任务记录
			let postData = {
				imgUrl:that.imgUrl ,
				color: that.color,
				printNum: that.printNum,
				pic_is_a4: 1,
				template_num:3
			};
			let res = await that.$helper.httpPost(that.$api.createPicPrintTask_url_post, postData);
			if (res.state == 'error') {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 3000
				});
				return
			}
			that.taskId = res.data.taskId;
			
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
	},
	methods:{
		async getPrice(that, postData) {
			let ret = await that.$helper.httpPost(that.$api.changeParamPrice_url_post, postData);
			if (ret.state == 'success') {
				that.orderMoney = ret.data.price;
				that.pageNums = ret.data.printNum;
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
}
</style>
