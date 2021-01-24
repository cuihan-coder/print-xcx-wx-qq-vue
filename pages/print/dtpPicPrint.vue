<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="mn-A4">
			<view class="title">
				<image src="https://qs.shideng-inc.com/static/xcximg/certificates_s_1@2x(1).png"></image>
				<text>多图片一次性打印</text>
				<text>（单次最多9张）</text>
			</view>
			<view class="a4-model">
				<view class="file-img" v-for="(item, index) in imgSrcs" :key="index">
					<image @click="imgSrcs.splice(index, 1)" class="cha" src="https://qs.shideng-inc.com/static/xcximg/certificates_del_s@2x.png"></image>
					<image class="img" :src="item"></image>
				</view>
				<view v-if="imgSrcs.length < 9" @click="uploadPic()" class="add-file-img">
					<view>+</view>
					<view>点击添加</view>
				</view>
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
			color: 0,
			//上传的图片列表
			imgSrcs: [],
			printNum: 1, //打印份数
			orderMoney: 0,
			pageNums: 0, //面数
			is_subing: 0,
			taskId: []
		};
	},
	computed: {
		imgSrcs_change() {
			return this.imgSrcs;
		}
	},
	watch: {
		imgSrcs_change(val) {
			if(this.imgSrcs.length == 0){
				return
			}
			let postData = {
				document_type: 2, //2 相片打印
				isA4: 1, //相片打印至A4
				color: this.color,
				printNum: this.printNum * this.imgSrcs.length
			};
			this.getPrice(this, postData);
		}
	},
	onLoad() {
		//打印参数变
		let that = this;
		uni.$on('picPrintParamChange', async function(data) {
			that[data.field] = data.val;
			//加载价格
			let postData = {
				document_type: 2, //2 相片打印
				isA4: 1, //相片打印至A4
				color: that.color,
				printNum: that.printNum * that.imgSrcs.length
			};
			that.getPrice(that, postData);
		});
		//提交订单
		uni.$once('subOrder', async function() {
			if (that.is_subing == 1) {
				return;
			}
			that.is_subing = 1;

			//创建多图片任务
			let res = await that.$helper.httpPost(that.$api.morePicPrintTaskCreate_url_post, {
				imgUrls: that.imgSrcs,
				color: that.color,
				printNum: that.printNum,
				pic_is_a4: 1,
				template_num: 21
			});
			if(res.state == 'error'){
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 3000
				});
				return
			}
			that.taskId = res.data.taskId
			
			let device_code = that.$store.state.deviceCode;
			let ret = await that.$helper.httpPost(that.$api.addMainOrder_url_post, { taskIds: that.taskId, device_code });
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
	methods: {
		//上传图片
		uploadPic() {
			let that = this;
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: async function(res) {
					for (let tmpUrl of res.tempFilePaths) {
						//上传文件到后台
						await uni.uploadFile({
							url: that.$api.uploadImg_url_post, //仅为示例，非真实的接口地址
							filePath: tmpUrl,
							name: 'file',
							header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
							success: uploadFileRes => {
								uploadFileRes = JSON.parse(uploadFileRes.data);
								if (uploadFileRes.state == 'success') {
									that.imgSrcs.push(uploadFileRes.data[0]);
									return;
								}
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								});
							}
						});
					}
					uni.hideLoading();
				}
			});
		},
		async getPrice(that, postData) {
			this.is_subing = 1
			let ret = await that.$helper.httpPost(that.$api.changeParamPrice_url_post, postData);
			if (ret.state == 'success') {
				that.orderMoney = ret.data.price;
				that.pageNums = ret.data.printNum;
				this.is_subing = 0
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
			& text:nth-child(3) {
				@include font-no-height(28upx, 500, $color-99);
			}
			image {
				@include w-h(38upx, 38upx);
				padding-right: 6upx;
			}
		}
		& .a4-model {
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .file-img {
				margin-top: 40upx;
				@include w-h(30%, 249upx);
				position: relative;
				& .img {
					@include w-h(100%, 100%);
				}
				& .cha {
					@include w-h(44upx, 44upx);
					position: absolute;
					right: -22upx;
					top: -22upx;
				}
			}
			& .add-file-img {
				margin-top: 40upx;
				@include w-h(30%, 249upx);
				display: grid;
				justify-content: center;
				align-content: center;
				border: 2upx solid $color-D7;
				view:nth-child(1) {
					@include w-h(100%, 50upx);
					text-align: center;
					@include font-no-height(48upx, 400, $color-D2);
				}
				view:nth-child(2) {
					@include w-h(100%, 22upx);
					@include font-no-height(22upx, 400, $color-B6);
				}
			}
		}
		& .a4-model::after {
			content: '';
			width: 30%;
		}
	}
}
</style>
