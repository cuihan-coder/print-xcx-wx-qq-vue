<template>
	<view>
		<view class="mn-A4">
			<view class="title">
				<image :src="printType.pic"></image>
				<text>{{ printType.name }}</text>
				<text>({{ printType.size }})</text>
			</view>
			<view class="case-img"><image src="https://qs.shideng-inc.com/static/xcximg/certificates_example @2x.png"></image></view>
			<view class="pic-desc">
				<view>最佳拍摄姿势</view>
				<view class="ul-num">
					<text>1</text>
					<text>优先使用后置摄像头拍摄</text>
				</view>
				<view class="ul-num">
					<text>2</text>
					<text>站白墙(纯色) 前，光线充足均匀</text>
				</view>
				<view class="ul-num">
					<text>3</text>
					<text>头部居中，正对镜头</text>
				</view>
				<view class="ul-num">
					<text>4</text>
					<text>露出眉毛和耳朵，面部无遮挡</text>
				</view>
			</view>
		</view>
		<view class="upload-play-btn">
			<image @click="chooseImage('camera')" src="https://qs.shideng-inc.com/static/xcximg/certificates_but_shot@2x.png"></image>
			<image @click="chooseImage('album')" src="https://qs.shideng-inc.com/static/xcximg/certificates_but_album@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data: () => ({
	
	}),
	props:{
		printType:{
			type:[Object],
			default:()=>({})
		}
	},
	methods:{
		chooseImage(sourceType){
			let that = this
			
			uni.chooseImage({
			    count: 6, //默认9
			    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: [sourceType], //从相册选择
			    success: async function (res) {
					uni.showLoading({
						title: '文件上传中'
					});
					const tempFilePaths = res.tempFiles;
					uni.uploadFile({
						url: that.$api.uploadImg_url_post, //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0].path,
						name: 'file',
						header: { Authorization: 'Bearer ' + (await that.$helper._getCache('loginToken')) },
						success: uploadFileRes => {
							uni.hideLoading();
							uploadFileRes = JSON.parse(uploadFileRes.data);
							if (uploadFileRes.state == 'success') {
								uni.showToast({
									title: uploadFileRes.msg,
									icon: 'none',
									duration:3000
								});
								that.$store.commit('zjzprint/SET_IMGURL',uploadFileRes.data[0])
								uni.navigateTo({
									url:"/pages/print/zjzConfirm"
								})
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
	& .case-img {
		margin: 59upx auto;
		@include w-h(260upx, 360upx);
		image {
			@include w-h(100%, 100%);
		}
	}
	& .pic-desc {
		display: grid;
		justify-content: center;
		align-content: center;
		view:nth-child(1) {
			@include font-no-height(30upx, 500, $color-33);
			text-align: center;
		}
		& .ul-num {
			@include item-center;
			padding-top: 25upx;
			text:nth-child(1) {
				display: inline-block;
				width: 30upx;
				line-height: 30upx;
				@include font-no-height(20upx, 600, $color-ff);
				text-align: center;
				background: $color-1668FF;
				border-radius: 50%;
			}
			text:nth-child(2) {
				padding-left: 10upx;
				@include font-no-height(26upx, 400, $color-33);
			}
		}
	}
}
.upload-play-btn{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 90upx;
	image{
		@include w-h(297upx,83upx);
	}
}
</style>
