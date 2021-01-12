<template>
	<view class="mn-A4">
		<view class="title">
			<image :src="titleParam.pic"></image>
			{{ titleParam.name }}
		</view>
		<view class="a4-model" :style="'height:' + A4H + 'px;' + 'width:' + A4W + 'px;'" @click="uploadPic">
			<view class="no-file" v-if="!imgSrc">
				<image src="http://qswy.com/static/xcximg/certificates_img@2x.png"></image>
				<view>点击添加图片</view>
			</view>
			<image
				@click="uploadPic"
				v-if="imgSrc"
				:src="imgSrc"
				:style="
					'width:' +
						imgW +
						'px;' +
						'height:' +
						imgH +
						'px;' +
						'padding-left:' +
						pl +
						'px;' +
						'padding-top:' +
						pt +
						'px;' +
						'margin-left:' +
						ml +
						'px;' +
						'margin-top:' +
						mt +
						'px;' +
						'transform-origin:50% 50%;' +
						'transform:rotate(' +
						rotate +
						'deg)'
				"
			></image>
		</view>
		<view class="offset-set">
			<view class="btn-class" @click="playFun('moveUp', 'pt', -2)">
				<image src="http://qswy.com/static/xcximg/certificates_up@2x.png"></image>
				<view>上移</view>
			</view>
			<view class="btn-class" @click="playFun('moveUp', 'pt', 2)">
				<image src="http://qswy.com/static/xcximg/certificates_lower@2x.png"></image>
				<view>下移</view>
			</view>
			<view class="btn-class" @click="playFun('moveLeft', 'pl')">
				<image src="http://qswy.com/static/xcximg/certificates_left@2x.png"></image>
				<view>左移</view>
			</view>
			<view class="btn-class" @click="playFun('moveMiddle', 'pl')">
				<image src="http://qswy.com/static/xcximg/certificates_center@2x.png"></image>
				<view>居中</view>
			</view>
			<view class="btn-class" @click="playFun('moveRight', 'pl')">
				<image src="http://qswy.com/static/xcximg/certificates_right@2x.png"></image>
				<view>右移</view>
			</view>
			<view class="btn-class" @click="playFun('changeSize', '', 4)">
				<image src="http://qswy.com/static/xcximg/certificates_enlarge@2x.png"></image>
				<view>放大</view>
			</view>
			<view class="btn-class" @click="playFun('changeSize', '', -4)">
				<image src="http://qswy.com/static/xcximg/certificates_narrow@2x.png"></image>
				<view>缩小</view>
			</view>
			<view class="btn-class" @click="playFun('rotating', '', 90)">
				<image src="http://qswy.com/static/xcximg/certificates_rotate1@2x.png"></image>
				<view>旋转</view>
			</view>
		</view>
	</view>
</template>

<script>
import a4PicModel from '@/common/js/a4Pic.js';
export default {
	name: 'a4Piccom',
	props: {
		titleParam: {
			type: Object,
			default: () => {
				return {
					name: '',
					pic: ''
				};
			}
		}
	},
	data() {
		return {
			A4H: a4PicModel.A4Height,
			A4W: a4PicModel.A4Width,
			//原始图片信息
			orImg: {},
			//用户上传临时文件地址
			imgSrc: '',
			//图片宽度
			imgW: 0,
			//图片高度
			imgH: 0,
			//padding-left 图片距左像素
			pl: 0,
			//padding-top 图片距上像素
			pt: 0,
			mt_up_down: 0,
			ml_up_down: 0,
			mt_left_right: 0,
			ml_left_right: 0,
			mt: 0,
			ml: 0,
			//当前选中的是  左侧1 居中2 右侧 3
			moveType: 1,
			//旋转角度 每次90度旋转
			rotate: 0
		};
	},
	methods: {
		//上传图片
		uploadPic() {
			let _that = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: function(res) {
					_that.imgSrc = res.tempFilePaths[0];
					_that.allParamInit();
					uni.getImageInfo({
						src: res.tempFilePaths[0],
						success: function(image) {
							_that.orImg = image;
							let picInitParamWH = a4PicModel.picWHInit(image.width, image.height);
							_that.imgH = picInitParamWH.H;
							_that.imgW = picInitParamWH.W;
						}
					});
				}
			});
		},
		allParamInit() {
			this.imgW = this.imgH = this.pl = this.pt = this.mt = this.ml = this.mt_left_right = this.ml_left_right = this.mt_up_down = this.ml_up_down = this.rotate = 0;
		},
		playFun(funcName, playField = '', val = '') {
			if (typeof a4PicModel[funcName] == 'function') {
				if (funcName == 'moveUp') {
					if (this.rotate == 90) {
						//旋转之后 宽高计算超出逻辑变量替换
						let changeH = this.imgW > this.imgH ? this.imgW : this.imgH
						let ret = a4PicModel[funcName](val, this.pt, changeH, this.rotate);
						this[playField] = ret;
						this.plAndPtSum()
						return;
					}
					let ret = a4PicModel[funcName](val, this.pt, this.imgH, this.rotate);
					this[playField] = ret;
				}
				if (funcName == 'moveMiddle') {
					let ret = a4PicModel[funcName](this.imgW);
					this[playField] = ret;
					this.moveType = 2
					if (this.rotate == 90) {
						//旋转的情况下 图片宽为高
						this.plAndPtSum()
					}
				}
				if (funcName == 'moveLeft') {
					let ret = a4PicModel[funcName](this.imgW);
					this[playField] = ret;
					this.moveType = 1
					if (this.rotate == 90) {
						this.plAndPtSum()
					}
				}
				if (funcName == 'moveRight') {
					let ret = a4PicModel[funcName](this.imgW);
					this[playField] = ret;
					this.moveType = 3
					if (this.rotate == 90) {
						this.plAndPtSum()
					}
				}
				if (funcName == 'changeSize') {
					let ret = a4PicModel[funcName](val, this.imgW, this.imgH, this.pl, this.pt,this.rotate);
					this.imgH = ret.H;
					this.imgW = ret.W;
					if (this.rotate == 90) {
						//旋转的情况下 图片宽为高
						this.plAndPtSum()
					}
				}
				if (funcName == 'rotating') {
					if (this.rotate == 90) {
						this.allParamInit();
						let image = this.orImg;
						let picInitParamWH = a4PicModel.picWHInit(image.width, image.height);
						this.imgH = picInitParamWH.H;
						this.imgW = picInitParamWH.W;
						return;
					}
					let ret = a4PicModel[funcName](val, this.imgW, this.imgH, this.rotate, this.pl, this.pt);
					this.imgH = ret.H;
					this.imgW = ret.W;
					this.rotate = ret.ROTATE;
					this.mt = ret.MT;
					this.ml = ret.ML;
				}
			}
		},
		plAndPtSum(val) {
			let { PL_MT, PL_ML } = a4PicModel.rotatingPlFix(this.pl, this.imgW, this.imgH,this.moveType);
			let { PT_MT, PT_ML } = a4PicModel.rotatingPtFix(this.pt, this.imgW, this.imgH);
			this.mt = PL_MT +  PT_MT
			this.ml = PL_ML + PT_ML
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
		// width: 530upx;
		// height: 750upx;
		margin: 40upx auto 0;
		border: solid 2upx $color-D7;
		& .no-file {
			width: 100%;
			margin-top: 45%;
			text-align: center;
			image {
				@include w-h(100upx, 100upx);
			}
			view {
				@include font-no-height(26upx, 500, $color-B6);
			}
		}
	}
	& .offset-set {
		@include display-flex-space-between;
		flex-wrap: wrap;
		.btn-class {
			margin-top: 30upx;
			display: grid;
			justify-content: center;
			align-content: center;
			width: 25%;
			image {
				@include w-h(74upx, 74upx);
			}
			view {
				@include font-no-height(24upx, 500, $color-99);
				text-align: center;
			}
		}
	}
}
</style>
