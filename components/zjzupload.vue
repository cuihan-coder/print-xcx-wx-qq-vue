<template>
	<view>
		<view class="mn-A4">
			<view class="title">
				<image :src="picList[0].pic"></image>
				<text>{{ picList[0].name }}</text>
				<text>({{ picList[0].size }})</text>
			</view>
			<view class="case-img"><image src="http://qswy.com/static/xcximg/certificates_example @2x.png"></image></view>
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
			<image src="http://qswy.com/static/xcximg/certificates_but_shot@2x.png"></image>
			<image src="http://qswy.com/static/xcximg/certificates_but_album@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data: () => ({
		picList: [
			{
				name: '一寸',
				size: '25mm×35mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '二寸',
				size: '35mm×49mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '小一寸',
				size: '22mm×32mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '小二寸',
				size: '35mm×45mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '三寸',
				size: '55mm×84mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '五寸',
				size: '89mm×127mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon17@2x.png'
			},
			{
				name: '身份证',
				size: '26mm×32mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon1@2x.png'
			},
			{
				name: '居住证',
				size: '22mm×32mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon2@2x.png'
			},
			{
				name: '驾驶证',
				size: '22mm×32mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon3@2x.png'
			},
			{
				name: '社保',
				size: '26mm×32mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon4@2x.png'
			},
			{
				name: '中国护照',
				size: '33mm×48mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon5@2x.png'
			},
			{
				name: '台湾通行证',
				size: '33mm×48mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon6@2x.png'
			},
			{
				name: '港澳通行证',
				size: '33mm×48mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon8@2x.png'
			},
			{
				name: '入台证',
				size: '35mm×45mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon7@2x.png'
			},
			{
				name: '入境签证',
				size: '33mm×48mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon16@2x.png'
			},
			{
				name: '通用签证',
				size: '35mm×45mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon15@2x.png'
			},
			{
				name: '来华签证',
				size: '33mm×48mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon14@2x.png'
			},
			{
				name: '泰国签证',
				size: '35mm×45mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon13@2x.png'
			},
			{
				name: '日本签证',
				size: '45mm×45mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon12@2x.png'
			},
			{
				name: '美国签证',
				size: '51mm×51mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon11@2x.png'
			},
			{
				name: '印度签证',
				size: '51mm×51mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon10@2x.png'
			},
			{
				name: '阿根廷签证',
				size: '40mm×mm',
				pic: 'http://qswy.com/static/xcximg/certificates_icon9@2x.png'
			}
		]
	}),
	props: {}
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
