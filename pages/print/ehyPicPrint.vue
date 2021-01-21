<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="mn-A4">
			<view class="title">
				<image src="https://qs.shideng-inc.com/static/xcximg/certificates_s_6@2x.png"></image>
				<text>二合一图片打印</text>
			</view>
			<view class="a4-model">
				<view class="no-file" v-if=" zmImg == '' " @click="uploadPic('zmImg')">
					<image src="https://qs.shideng-inc.com/static/xcximg/certificates_img@2x.png"></image>
					<view>点击添加图片</view>
				</view>
				<image v-if="zmImg"  class="file-img" :src="zmImg"></image>
				<image @click="zmImg = '' " v-if="zmImg"  class="trush" src="https://qs.shideng-inc.com/static/xcximg/certificates_del@2x.png"></image>
			</view>
			<view class="a4-model">
				<view class="no-file" v-if=" fmImg == '' " @click="uploadPic('fmImg')">
					<image src="https://qs.shideng-inc.com/static/xcximg/certificates_img@2x.png"></image>
					<view>点击添加图片</view>
				</view>
				<image v-if="fmImg"  class="file-img" :src="fmImg"></image>
				<image @click="fmImg = '' " v-if="fmImg"  class="trush" src="https://qs.shideng-inc.com/static/xcximg/certificates_del@2x.png"></image>
			</view>
		</view>
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
			zmImg:'',
			fmImg:'',
			printNum: 1, //打印份数
			orderMoney: 0,
			pageNums: 0, //面数
			is_subing: 0,
			taskId: []
		};
	},
	
	async onLoad() {
		let that = this;
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
			if(!that.zmImg|| !that.fmImg){
				uni.showToast({
					title: '请将图片都上传完整',
					icon: 'none',
					duration: 3000
				});
				return
			}
			that.is_subing = 1;
			
			//创建打印任务记录
			let postData = {
				imgUrl:that.zmImg + ',' + that.fmImg,
				color: that.color,
				printNum: that.printNum,
				pic_is_a4: 1,
				template_num:8
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
		//上传图片
		uploadPic(imgType) {
			let that = this;
			uni.chooseImage({
				count: 1, //默认1
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: async function(res) {
					uni.showLoading({
						title: '文件上传中'
					});
					await uni.uploadFile({
						url: that.$api.uploadImg_url_post, //仅为示例，非真实的接口地址
						filePath: res.tempFilePaths[0],
						name: 'file',
						header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
						success: uploadFileRes => {
							uploadFileRes = JSON.parse(uploadFileRes.data);
							if (uploadFileRes.state == 'success') {
								that[imgType] = uploadFileRes.data[0]
								return;
							}
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					});
					uni.hideLoading();
					//加载价格
					let postData = {
						document_type: 2, //2 相片打印
						isA4: 1, //相片打印至A4
						color: that.color,
						printNum: that.printNum
					};
					that.getPrice(that, postData);
				}
			});
		},
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
	.mn-A4 {
		margin: 20upx 0 20upx 0;
		padding: 42upx 25upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include item-center;
			padding-bottom: 43upx;
			border-bottom: solid 2upx $color-f1;
			& text:nth-child(2) {
				@include font-no-height(30upx, 500, $color-33);
			}
			image {
				@include w-h(38upx, 38upx);
				padding-right: 6upx;
			}
		}
		& .a4-model {
			position: relative;
			border: 2upx solid #d7d7d7;
			@include item-center;
			padding: 9upx;
			height: 431upx;
			& .no-file {
				width: 100%;
				text-align: center;
				image {
					@include w-h(100upx, 100upx);
				}
				view {
					@include font-no-height(26upx, 500, $color-B6);
				}
			}
			& .file-img{
				width: 100%;
				height: 100%;
			}
			& .trush {
				position: absolute;
				left: 20upx;
				bottom: 20upx;
				@include w-h(60upx, 60upx);
			}
		}
	}
}
</style>
