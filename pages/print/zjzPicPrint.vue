<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<view class="mn-A4">
			<view class="title">
				<image src="http://qswy.com/static/xcximg/certificates_icon17@2x.png"></image>
				<text>证件照打印</text>
			</view>
			<view class="a4-model-1">
				<view class="type-entry" v-for="(item,index) in selectList.slice(0,2)" :key="index">
					<image :src="item.pic"></image>
					<view class="size-set">
						<view>{{item.name}}</view>
						<view>{{item.size}}</view>
					</view>
				</view>
			</view>
			<view class="a4-model">
				<view class="type-entry" v-for="(item,index) in selectList.slice(2,selectList.length)" v-if="index <= loadMore" :key="index">
					<image :src="item.pic"></image>
					<view class="size-set">
						<view>{{item.name}}</view>
						<view>{{item.size}}</view>
					</view>
				</view>
			</view>
			<view class="load-more" @click="`${loadMore = selectList.length}`">
				<image src="http://qswy.com/static/xcximg/file_display@2x.png"></image>
				更多规格
			</view>
		</view>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';

export default {
	components: {
		scanEquipment
	},
	data() {
		return {
			selectList:[
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
			//是否加载更多，默认展示下标到2 
			loadMore: 2
		};
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
		& .load-more {
			margin-top: 80upx;
			@include item-center;
			justify-content: center;
			@include font-no-height(24upx, 500, $color-3985FF);
			image {
				@include w-h(30upx, 30upx);
				padding-right: 10upx;
			}
		}
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
		& .a4-model-1 {
			@include display-flex-space-between;
			& .type-entry {
				margin-top: 40upx;
				@include w-h(46%, 240upx);
				background: $color-ff;
				box-shadow: 0px 0px 9upx 0px rgba(157, 157, 157, 0.39);
				border-radius: 10upx;
				display: grid;
				justify-items: center;
				align-content: center;
				image {
					@include w-h(48upx, 60upx);
				}
				& .size-set {
					view:nth-child(1) {
						text-align: center;
						margin-top: 35upx;
						@include font-no-height(26upx, 500, $color-00);
					}
					view:nth-child(2) {
						@include font-no-height(20upx, 500, $color-87);
					}
				}
			}
		}
		& .a4-model {
			@include display-flex-space-between;
			flex-wrap: wrap;
			& .type-entry {
				margin-top: 40upx;
				@include w-h(30%, 240upx);
				background: $color-ff;
				box-shadow: 0px 0px 9upx 0px rgba(157, 157, 157, 0.39);
				border-radius: 10upx;
				display: grid;
				justify-items: center;
				align-content: center;
				image {
					@include w-h(48upx, 60upx);
				}
				& .size-set {
					view:nth-child(1) {
						text-align: center;
						margin-top: 35upx;
						@include font-no-height(26upx, 500, $color-00);
					}
					view:nth-child(2) {
						@include font-no-height(20upx, 500, $color-87);
					}
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
