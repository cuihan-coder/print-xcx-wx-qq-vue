<template>
	<view class="mn-A4">
		<view class="title">
			<image :src="titleParam.pic"></image>
			{{titleParam.name}}
		</view>
		<view class="a4-model">
			<view class="no-file" v-if="imgUrl == '' " @click="uploadPic()">
				<image src="https://qs.shideng-inc.com/static/xcximg/certificates_img@2x.png"></image>
				<view>点击添加图片</view>
			</view>
			<image v-if="imgUrl"  class="file-img" :src="imgUrl"></image>
			<image v-if="imgUrl" @click="delImg()" class="trush" src="https://qs.shideng-inc.com/static/xcximg/certificates_del@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	name: 'singlePicUp',
	props: {
		titleParam: {
			type: Object,
			default: () =>{
				return {
					name: '',
					pic: ''
				}
			} 
		},
	},
	data:() => ({
		imgUrl:''
	}),
	methods:{
		//上传图片
		uploadPic() {
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
						url: that.$api.uploadImg_url_post,
						filePath: res.tempFilePaths[0],
						name: 'file',
						header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
						success: uploadFileRes => {
							uploadFileRes = JSON.parse(uploadFileRes.data);
							if (uploadFileRes.state == 'success') {
								that.imgUrl = uploadFileRes.data[0]
								
								uni.$emit('uploadPic',that.imgUrl)
								
								return;
							}
							uni.showToast({
								title: '上传失败',
								icon: 'none'
							});
						}
					});
					uni.hideLoading();
				}
			});
		},
		delImg(){
			this.imgUrl = ''
			uni.$emit('delImg','')
		}
	}
};
</script>

<style lang="scss">
.mn-A4 {
	margin: 20upx 0 20upx 0;
	padding: 42upx 25upx;
	background: $color-ff;
	border-radius: 30upx;
	& .title {
		@include item-center;
		padding-bottom: 43upx;
		border-bottom: solid 2upx $color-f1;
		@include font-no-height(30upx, 500, $color-33);

		image {
			@include w-h(38upx, 38upx);
			padding-right: 6upx;
		}
	}
	& .a4-model {
		position: relative;
		padding: 120upx 84upx;
		height: 752upx;
		margin-top: 40upx;
		border: solid 2upx $color-D7;
		display: flex;
		justify-content: center;
		align-items: center;
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
		& .file-img {
			@include w-h(100%, 100%);
		}
		& .trush {
			position: absolute;
			left: 32upx;
			bottom: 32upx;
			@include w-h(60upx, 60upx);
		}
	}
}
</style>
