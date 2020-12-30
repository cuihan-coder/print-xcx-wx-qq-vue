<template>
	<view class="mn-A4">
		<view class="title">
			<image :src="picList[0].pic"></image>
			<text>{{ picList[0].name }}</text>
			<text>({{ picList[0].size }})</text>
		</view>
		<view class="case-img"><image src="http://qswy.com/static/xcximg/certificates_example @2x.png"></image></view>
		<view class="preview-title">排列预览（6寸胶纸)</view>
		<view class="preview-img">
			<image src="http://qswy.com/static/xcximg/huodong.jpeg"></image>
		</view>
		<view class="color-selector">
			<text>底色</text>
			<view class="select-btn hongse">
				<view></view>
				<view></view>
				<view></view>
			</view>
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
		],
		selector:[
			{
				name:'蓝色',
				id: '1'
			},
			{
				name:'红色',
				id: '2'
			},
			{
				name:'白色',
				id: '3'
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
		@include w-h(178upx, 250upx);
		image {
			@include w-h(100%, 100%);
		}
	}
	& .preview-title{
		@include font-no-height(26upx, 500, $color-99);
	}
	& .preview-img{
		padding: 27upx 45upx;
		border: 2upx solid $color-DC;
		border-radius: 10upx;
		image{
			width: 100%;
			height: 380upx;
		}
	}
	& .color-selector{
		margin-top: 40upx;
		padding-top: 40upx;
		border-top: 2upx solid $color-f1;
		@include display-flex-space-between;
		text{
			@include font-no-height(32upx, 400, $color-33);
		}
		& .select-btn{
			width: 300upx;
			height: 54upx;
			@include display-flex-space-between;
			view{
				@include w-h(33.3%, 100%);
			}
		}
		& .lanse{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_bule@2x.png') no-repeat;
			background-size: contain;
		}
		& .hongse{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_red@2x.png') no-repeat;
			background-size: contain;
		}
		& .baise{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_white@2x.png') no-repeat;
			background-size: contain;
		}
	}
}

</style>
