<template>
	<view class="content">
		<view class="voucher-cont" v-if="typeList[0] != undefined">
			<text class="title">理由</text>
			<view class="selector">
				<picker class="picker-style" mode="selector" @change="selectVoucher" :range="typeList" range-key="name">{{ typeName }}</picker>
				<image src="https://qs.shideng-inc.com/static/xcximg/file_more@2x.png"></image>
			</view>
		</view>
		<view class="leave-msg">
			<view>备注</view>
			<textarea maxlength="1000" v-model="content" placeholder="请备注信息（详细说明，或联系方式等）"></textarea>
			<view class="uplaod-img">
				<view class="img-cont" v-for="(item,index) in imgUrl" :key="index">
					<!-- 叉 -->
					<image src="https://qs.shideng-inc.com/static/xcximg/certificates_del_s@2x.png"></image>
					<!-- 上传图片 -->
					<image :src="item"></image>
				</view>
				<view @click="uploadPic()" class="add-img">+</view>
			</view>
		</view>
		<view class="ok-btn" @click="refundsub">确定提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: [
				{
					name: '墨迹不清晰',
					id: 1
				},
				{
					name: '没有纸',
					id: 2
				},
				{
					name: '其他',
					id: 3
				}
			],
			typeName: '',
			taskId:'',
			content:'',
			imgUrl:[]
		};
	},
	async onLoad(option) {
		this.taskId = option.taskId
		this.typeName = this.typeList[0].name;
	},
	methods: {
		selectVoucher: function(e) {
			this.typeName = this.typeList[e.target.value]['name']
		},
		async refundsub(){
			if(this.content == ''){
				uni.showToast({
					title:'请填写备注信息，如联系方式',
					icon:'none'
				})
				return
			}
			let postData = {
				taskId:this.taskId,
				content:this.content,
				type:this.typeName,
				imgUrl: this.imgUrl.join(',')
			}
			let ret = await this.$helper.httpPost(this.$api.orderRefund_url_post,postData);
			if(ret.state == 'success'){
				uni.showToast({
					title:ret.msg,
					duration:2000,
					icon:'none'
				})
			}
		},
		uploadPic() {
			let that = this;
			uni.chooseImage({
				count: 3, //默认3
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: async function(res) {
					uni.showLoading({
						title: '文件上传中'
					});
					
					//上传文件到后台
					uni.uploadFile({
						url: that.$api.uploadImg_url_post, //仅为示例，非真实的接口地址
						filePath: res.tempFilePaths[0],
						name: 'file',
						header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
						success: uploadFileRes => {
							uni.hideLoading();
							uploadFileRes = JSON.parse(uploadFileRes.data);
							if (uploadFileRes.state == 'success') {
								uni.showToast({
									title: uploadFileRes.msg,
									icon: 'none',
									duration:2000
								});
								that.imgUrl.push(uploadFileRes.data[0])
								return;
							}
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					});
				}
			});
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
	& .voucher-cont {
		@include display-flex-space-between;
		padding: 47upx 42upx;
		margin-top: 20upx;
		background: $color-ff;
		border-radius: 30upx;
		& .title {
			@include font-no-height(30upx, 500, $color-33);
		}
		& .selector {
			@include display-flex-start;
			& .picker-style {
				@include font-no-height(28upx, 500, $color-99);
			}
			image {
				padding-left: 20upx;
				@include w-h(25upx, 25upx);
			}
		}
		
	}
	& .leave-msg {
		margin-top: 20upx;
		padding: 47upx 42upx;
		background: $color-ff;
		border-radius: 30upx;
		& view {
			margin-bottom: 30upx;
			@include font-no-height(30upx, 500, $color-00);
		}
		& textarea{
			height: 120upx;
			@include font-no-height(30upx, 400, $color-99);
			border-bottom: 2upx solid $color-f1;
		}
		& .uplaod-img{
			margin-top: 30upx;
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .img-cont{
				position: relative;
				@include w-h(30%, 24vw);
				image:nth-child(1){
					position: absolute;
					top: -20upx;
					right: -20upx;
					@include w-h(40upx, 40upx);
				}
				image:nth-child(2){
					@include w-h(100%, 100%);
				}
			}
			& .add-img{
				@include w-h(30%, 24vw);
				border: 3upx solid $color-E8;
				display: grid;
				justify-content: center;
				align-content: center;
				@include font-no-height(80upx, 500, $color-E8);
			}
		}
		& .uplaod-img::after{
			content: '';
			width: 30%;
		}
		
	}
	
	& .ok-btn{
		margin: 94upx auto 0;
		width: 511upx;
		line-height: 94upx;
		background: linear-gradient(-30deg, #4F79FF, #285AFF);
		border-radius: 47upx;
		box-shadow: 0 10upx 5upx #A9BBF6;
		@include font-no-height(32upx, 400, $color-ff);
		text-align: center;
	}
}
</style>
