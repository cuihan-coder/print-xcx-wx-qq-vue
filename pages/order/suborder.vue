<template>
	<view class="content">
		<scanEquipment></scanEquipment>

		<view class="file-content" v-for="(item, index) in taskList" :key="index">
			<view class="row-1">
				<image
					@click="changeFilter(index, 'is_checked', false)"
					v-if="item.is_checked == true"
					class="check-cricle"
					src="https://qs.shideng-inc.com/static/xcximg/currency_wancheng@2x.png"
				></image>
				<image
					@click="changeFilter(index, 'is_checked', true)"
					v-if="item.is_checked == false"
					class="check-cricle"
					src="https://qs.shideng-inc.com/static/xcximg/file_choice_n@2x.png"
				></image>
				<view class="row-1-right">
					<view class="row-1-right-item1">
						<view class="row-1-right-item1-left">
							<!-- pptx -->
							<image v-if="item.file_ext == 'pptx' || item.file_ext == 'ppt'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_ppt@2x.png"></image>
							<!-- xlsx -->
							<image v-if="item.file_ext == 'xlsx' || item.file_ext == 'xls'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_exl@2x.png"></image>
							<!-- doc -->
							<image v-if="item.file_ext == 'doc' || item.file_ext == 'docx'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_word@2x.png"></image>
							<!-- pdf -->
							<image v-if="item.file_ext == 'pdf'" class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_pdf@2x.png"></image>

							<text>{{ item.file_name }}</text>
						</view>
						<view class="row-1-right-item1-right" @click="openDoc(index)">
							<image class="img-icon" src="https://qs.shideng-inc.com/static/xcximg/file_preview@2x.png"></image>
							<text>预览</text>
						</view>
					</view>
					<view class="row-2-right">
						<text class="font-show">{{ item.detail }}</text>
						<view class="row-2-right-money">
							<text class="nth-1">计</text>
							<text class="nth-2">{{ item.price }}元</text>
						</view>
					</view>
				</view>
			</view>
			<text class="print-title" v-if="item.is_open == true">打印参数设置</text>
			<view class="where-container" v-if="item.is_open == true">
				<view class="where-container-row-1">
					<view class="where-container-row-1-left bottom-line bottom-height">
						<view class="where-container-row-1-left-1">份数</view>
						<view class="counter-com">
							<view class="counter-dec" @click="changeFilter(index, 'printNum', -1)">-</view>
							<input type="number" disabled="true" class="input-num" v-model="item.printNum" />
							<view class="counter-inc-dec" @click="changeFilter(index, 'printNum', 1)">+</view>
						</view>
					</view>
					<view class="where-container-row-1-rfight bottom-line bottom-height">
						<view class="where-container-row-1-rfight-1">版面</view>
						<view class="where-page-num">
							<view @click="changeFilter(index, 'sides', 0)" :class="item.sides == 0 ? 'left-btn l-xuanzhong' : 'left-btn'">单面</view>
							<view @click="changeFilter(index, 'sides', 1)" :class="item.sides == 1 ? 'right-btn r-xuanzhong' : 'right-btn'">双面</view>
						</view>
					</view>
				</view>
				<view class="where-container-row-1">
					<view class="where-container-row-1-left top-height">
						<view class="where-container-row-1-left-1">页面</view>
						<view class="page-num-set">
							<input class="min-page" @input="changeFilter(index, 'start_page', item.start_page)" v-model="item.start_page" />
							<view class="zhi">至</view>
							<input class="max-page" @input="changeFilter(index, 'end_page', item.end_page)" v-model="item.end_page" />
						</view>
					</view>
					<view class="where-container-row-1-rfight top-height">
						<view class="where-container-row-1-rfight-1">颜色</view>
						<view class="where-page-num">
							<view @click="changeFilter(index, 'color', 0)" :class="item.color == 0 ? 'left-btn l-xuanzhong' : 'left-btn'">黑白</view>
							<view @click="changeFilter(index, 'color', 1)" :class="item.color == 1 ? 'right-btn r-xuanzhong' : 'right-btn'">彩色</view>
						</view>
					</view>
				</view>
			</view>
			<view class="show-btn">
				<image @click="deleteFile(index)" class="trush" src="https://qs.shideng-inc.com/static/xcximg/file_dle@2x.png"></image>
				<view class="hide" v-if="item.is_open == true" @click="taskList[index].is_open = false">
					<image class="jt" src="https://qs.shideng-inc.com/static/xcximg/file_hide@2x.png"></image>
					收起
				</view>
				<view class="show" v-if="item.is_open == false" @click="taskList[index].is_open = true">
					<image class="jt" src="https://qs.shideng-inc.com/static/xcximg/file_display@2x.png"></image>
					打印设置
				</view>
			</view>
		</view>

		<!-- 悬浮图标 -->
		<image @click="uploadFile" class="xuanfu-img" src="https://qs.shideng-inc.com/static/xcximg/file_choice@2x.png"></image>
		<footerCount :pageNums="pageNums" :orderPrice="orderMoney"></footerCount>
	</view>
</template>

<script>
import footerCount from '../../components/footerCount.vue';
import scanEquipment from '../../components/scanEquipment.vue';

export default {
	components: {
		footerCount,
		scanEquipment
	},
	data() {
		return {
			taskList: [],
			//勾选待打印订单金额
			orderMoney: 0,
			pageNums: 0,
			//选择打印的任务ID
			taskIds: [],
			//是否提交中
			is_subing:0 
		};
	},
	computed: {
		taskList_computed: function() {
			return this.taskList;
		}
	},
	watch: {
		taskList_computed() {
			this.sumCheckedMoney();
		}
	},
	async onLoad() {
		let ret = await this.$helper.httpGet(this.$api.getUserPrintFileTask_url_get);
		this.taskList = ret.data;
		let that = this
		uni.$on('subOrder',async function(){
			
			if(that.is_subing == 1){
				return
			}
			console.log(that.taskIds.length)
			if(that.taskIds.length == 0){
				uni.showToast({
					title: '请选择打印的文档',
					icon:'none',
					duration:3000
				})
				return
			}
			
			that.is_subing = 1
			let device_code = that.$store.state.deviceCode
			let ret = await that.$helper.httpPost(that.$api.addMainOrder_url_post,{taskIds:that.taskIds,device_code})
			if(ret.state == 'success'){
				uni.$off('subOrder')
				uni.showToast({
					title: ret.msg,
					icon:'none'
				})
				uni.navigateTo({
					url:"/pages/print/payPrint?main_id=" + ret.data.main_id
				})
			}
			that.is_subing = 0
		})
		
		
	},
	methods: {
		//浏览
		openDoc(index) {
			uni.showLoading({
				title: '读取文件中'
			});
			uni.downloadFile({
				url: this.taskList[index].file_path,
				success: function(res) {
					var filePath = res.tempFilePath;
					uni.openDocument({
						filePath: filePath,
						success: function(res) {
							uni.hideLoading();
							console.log('打开文档成功');
						}
					});
				}
			});
		},
		//修改参数 进行参数请求
		async changeFilter(index, field, val) {
			if (field == 'printNum') {
				if (this.taskList[index][field] + val <= 0) {
					return;
				}
				this.taskList[index][field] += val;
				let ret = await this.$helper.httpPost(this.$api.changeParamPrice_url_post, this.taskList[index]);
				this.$set(this.taskList, index, ret.data);
				return;
			}
			if (field == 'end_page' && this.taskList[index][field] > this.taskList[index]['file_pages']) {
				uni.showToast({
					title: '当前页码过大',
					icon: 'none',
					duration:3000
				});
				return;
			}
			if (field == 'start_page' && val == '') {
				return;
			}
			if (field == 'start_page' && (this.taskList[index][field] > this.taskList[index]['file_pages'] || this.taskList[index][field] < 1)) {
				uni.showToast({
					title: '当前页码过大或过小',
					icon: 'none',
					duration:3000
				});
				return;
			}
			this.taskList[index][field] = val;
			if(field == 'is_checked'){
				this.$set(this.taskList, index, this.taskList[index]);
				return
			}
			let ret = await this.$helper.httpPost(this.$api.changeParamPrice_url_post, this.taskList[index]);
			this.$set(this.taskList, index, ret.data);
		},
		async deleteFile(index) {
			let ret = await this.$helper.httpPost(this.$api.delFilePrintTask_url_post, { id: this.taskList[index].id });
			if (ret.state == 'success') {
				this.taskList.splice(index, 1);
			}
		},
		//合计打印费用
		sumCheckedMoney() {
			this.orderMoney = this.pageNums = 0 ;
			this.taskIds = []
			let taskId = []
			for (let item of this.taskList) {
				if (item.is_checked == true) {
					this.orderMoney += parseFloat(item.price) ;
					this.pageNums += (item.end_page - item.start_page + 1) * item.printNum;
					taskId.push(item.id)
				}
			}
			this.$set(this,'taskIds',taskId)
		},
		async startUPload(res, that) {
			// tempFilePath可以作为img标签的src属性显示图片
			uni.showLoading({
				title: '文件上传中'
			});
			const tempFilePaths = res.tempFiles;

			uni.uploadFile({
				url: that.$api.fileUpload_url_post, //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0].path,
				name: 'file',
				formData: {
					name: tempFilePaths[0].name,
					printNum: 1,
					color: 1,
					sides: 0
				},
				header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
				success: uploadFileRes => {
					uni.hideLoading();
					uploadFileRes = JSON.parse(uploadFileRes.data);
					
					if (uploadFileRes.state == 'success') {
						that.taskList.unshift(uploadFileRes.data);
						uni.showToast({
							title: uploadFileRes.msg,
							icon: 'none',
							duration:3000
						});
						return;
					}
					uni.showToast({
						title: '上传失败',
						icon: 'none',
						duration:3000
					});
				}
			});
		},
		async uploadFile() {
			let that = this;
			let userInfo = await this.$helper._getCache('userInfo')
			if(userInfo.group_id == 0){
				uni.showToast({
					title: '请扫码，再上传',
					icon: 'none',
					duration:3000
				});	
				return
			}
			
			// #ifdef MP-QQ
			qq.chooseMessageFile({
			  count: 1,
			  type:'file',
			  async success (res) {
			    const tempFilePaths = res.tempFiles
				that.startUPload(res, that);
			  }
			})
		
			// #endif
			// #ifdef MP-WEIXIN
			
			wx.chooseMessageFile({
				count: 1,
				type:'file',
				async success(res) {
					that.startUPload(res, that);
				}
			});
			// #endif
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
	& .file-content {
		margin-top: 22upx;
		padding: 30upx 30upx 42upx 30upx;
		background: $color-ff;
		border-radius: 30upx;
		& .row-1 {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			border-bottom: solid 2upx $color-f1;
			padding-bottom: 30upx;
			& .check-cricle {
				@include w-h(40upx, 40upx);
				flex-shrink: 0;
			}
			& .row-1-right {
				width:90%;
				margin-left: 20upx;
				& .row-1-right-item1 {
					width: 100%;
					@include display-flex-space-between;
					& .row-1-right-item1-left {
						@include display-flex-start;
						max-width: 82%;
						& text{
							display: block;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						& .img-icon {
							@include w-h(54upx, 54upx);
							flex-shrink: 0;
							padding-right: 9upx;
						}
						@include font-no-height(30, 500, $color-33);
					}
					& .row-1-right-item1-right {
						@include display-flex-start;
						flex-shrink: 0;
						& .img-icon {
							@include w-h(32upx, 28upx);
							flex-shrink: 0;
							padding-right: 9upx;
						}
						@include font-no-height(28, 500, $color-66);
					}
				}
			}
			& .row-2-right {
				width: 100%;
				margin-top: 33upx;
				@include display-flex-space-between;
				& .font-show {
					@include font-no-height(28upx, 500, $color-66);
				}
				& .row-2-right-money {
					& .nth-1 {
						@include font-no-height(28upx, 500, $color-66);
						padding-right: 10upx;
					}
					& .nth-2 {
						@include font-no-height(28upx, 500, $color-FF4646);
					}
				}
			}
		}

		& .print-title {
			margin-top: 32upx;
			@include font-no-height(24upx, 500, $color-99);
		}
		& .where-container {
			padding: 42upx;
			border-bottom: solid 2upx $color-f1;
			& .where-container-row-1 {
				@include display-flex-space-between;

				& .where-container-row-1-left {
					width: calc(50% - 2upx);
					display: grid;
					justify-items: flex-start;
					border-right: solid 2upx $color-f1;
				}
				& .where-container-row-1-rfight {
					width: calc(50% - 2upx);
					display: grid;
					justify-items: flex-end;
				}
				& .bottom-line {
					border-bottom: solid 2upx $color-f1;
				}
				& .bottom-height {
					padding-bottom: 20upx;
				}
				& .top-height {
					padding-top: 20upx;
				}
				& .where-container-row-1-left-1 {
					@include font-no-height(24upx, 400, $color-33);
				}
				& .counter-com {
					@include display-flex-start;
					& .counter-dec {
						@include w-h(70upx, 80upx);
						border: 3upx solid $color-C5;
						border-radius: 10upx 0px 0px 10upx;
						@include font-center;
					}
					& .input-num {
						@include w-h(70upx, 80upx);
						border-top: 3upx solid $color-C5;
						border-bottom: 3upx solid $color-C5;
						text-align: center;
					}
					& .counter-inc-dec {
						@include w-h(70upx, 80upx);
						border: 3upx solid $color-C5;
						border-radius: 0px 10upx 10upx 0px;
						@include font-center;
					}
				}
				& .page-num-set {
					@include display-flex-start;
					& .min-page {
						@include w-h(70upx, 80upx);
						border: 3upx solid $color-C5;
						border-radius: 10upx 0px 0px 10upx;
						text-align: center;
					}
					& .zhi {
						@include w-h(70upx, 80upx);
						border-top: 3upx solid $color-C5;
						border-bottom: 3upx solid $color-C5;
						@include font-center;
					}
					& .max-page {
						@include w-h(70upx, 80upx);
						border: 3upx solid $color-C5;
						border-radius: 0px 10upx 10upx 0px;
						text-align: center;
					}
				}
				& .where-container-row-1-rfight-1 {
					width: 206upx;
					@include font-no-height(24upx, 400, $color-33);
					text-align: left;
				}
				& .where-page-num {
					@include display-flex-start;
					& .left-btn {
						@include w-h(106upx, 80upx);
						border-radius: 10upx 0px 0px 10upx;
						@include font-center;
						border-top: 3upx solid $color-C5;
						border-bottom: 3upx solid $color-C5;
						border-left: 3upx solid $color-C5;
						@include font-no-height(24upx, 500, $color-A2A3A3);
					}
					& .right-btn {
						@include w-h(106upx, 80upx);
						border-radius: 0px 10upx 10upx 0px;
						@include font-center;
						border-top: 3upx solid $color-C5;
						border-bottom: 3upx solid $color-C5;
						border-right: 3upx solid $color-C5;
						@include font-no-height(24upx, 500, $color-A2A3A3);
					}
					& .l-xuanzhong {
						border-top: 3upx solid $color-3985FF;
						border-bottom: 3upx solid $color-3985FF;
						border-left: 3upx solid $color-3985FF;
						background: $color-3985FF;
						@include font-no-height(24upx, 500, $color-ff);
					}
					& .r-xuanzhong {
						border-top: 3upx solid $color-3985FF;
						border-bottom: 3upx solid $color-3985FF;
						border-right: 3upx solid $color-3985FF;
						background: $color-3985FF;
						@include font-no-height(24upx, 500, $color-ff);
					}
				}
			}
		}

		& .show-btn {
			@include display-flex-space-between;
			padding-top: 30upx;
			& .trush {
				@include w-h(34upx, 34upx);
			}
			& .hide {
				@include display-flex-start;
				@include font-no-height(24, 500, $color-A4);
				& .jt {
					@include w-h(30upx, 30upx);
					padding-right: 10upx;
				}
			}
			& .show {
				@include display-flex-start;
				@include font-no-height(24, 500, $color-3985FF);
				& .jt {
					@include w-h(30upx, 30upx);
					padding-right: 10upx;
				}
			}
		}
	}
	& .xuanfu-img {
		position: fixed;
		right: 40upx;
		bottom: 238upx;
		@include w-h(120upx, 120upx);
	}

	& .height-pad {
		width: 100%;
		height: 100upx;
	}
}
</style>
