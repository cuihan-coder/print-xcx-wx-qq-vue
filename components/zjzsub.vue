<template>
	<view class="mn-A4">
		<view class="title">
			<image :src="printType.pic"></image>
			<text>{{printType.name }}</text>
			<text>({{ printType.size }})</text>
		</view>
		<view class="case-img">
			<image :src="sinPic"></image>
		</view>
		<view class="preview-title">排列预览（6寸胶纸)</view>
		<view class="preview-img">
			<image :src="tyPic"></image>
		</view>
		<view class="color-selector">
			<text>底色</text>
			<view :class="color == 'blue' ? 'select-btn blue' : (color == 'red' ? 'select-btn red' : 'select-btn white')">
				<view @click="changeBackColor('blue')"></view>
				<view @click="changeBackColor('red')"></view>
				<view @click="changeBackColor('white')"></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data: () => ({
		
	}),
	props:{
		color:{
			type:String,
			default:''
		},
		printType:{
			type:Object,
			default:() => ({})
		},
		//单张图片
		sinPic:{
			type:String,
			default:''
		},
		//排版图片
		tyPic:{
			type:String,
			default:''
		},
	},
	methods:{
		changeBackColor(backColor){
			this.$store.commit('zjzprint/SET_COLOR',backColor)
			uni.$emit('changeBackColor',backColor)
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
		@include w-h(178upx, 250upx);
		image {
			@include w-h(100%, 100%);
		}
	}
	& .preview-title{
		@include font-no-height(26upx, 500, $color-99);
	}
	& .preview-img{
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
		& .blue{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_bule@2x.png') no-repeat;
			background-size: contain;
		}
		& .red{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_red@2x.png') no-repeat;
			background-size: contain;
		}
		& .white{
			background: url('http://qswy.com/static/xcximg/certificates_bgcolor_white@2x.png') no-repeat;
			background-size: contain;
		}
	}
}

</style>
