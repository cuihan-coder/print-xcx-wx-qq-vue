<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		
		<view class="file-content">
			<view class="row-1">
				<image class="check-cricle" src="http://qswy.com/static/xcximg/currency_wancheng@2x.png"></image> 
				<view class="row-1-right">
					<view class="row-1-right-item1">
						<view class="row-1-right-item1-left">
							<image class="img-icon" src="http://qswy.com/static/xcximg/file_ppt@2x.png"></image>
							<text>个人简历.pptx</text>
						</view>
						<view class="row-1-right-item1-right">
							<image class="img-icon" src="http://qswy.com/static/xcximg/file_preview@2x.png"></image>
							<text>预览</text>
						</view>
					</view>
					<view class="row-2-right">
						<text class="font-show">A4/黑白/单面/1份 共5张</text>
						<view class="row-2-right-money">
							<text class="nth-1">计</text>
							<text class="nth-2">20.50元</text>
						</view>
					</view>
				</view>
			</view>
			<text class="print-title" v-if="true">打印参数设置</text>
			<view class="where-container" v-if="true">
				<view class="where-container-row-1">
					<view class="where-container-row-1-left bottom-line bottom-height">
						<view class="where-container-row-1-left-1">份数</view>
						<view class="counter-com">
							<view class="counter-dec" @click="counter('printNum',-1)">-</view>
							<input type="number"  disabled="true" class="input-num" v-model="printNum" />
							<view class="counter-inc-dec"  @click="counter('printNum',1)">+</view>
						</view>
					</view>
					<view class="where-container-row-1-rfight bottom-line bottom-height">
						<view class="where-container-row-1-rfight-1">版面</view>
						<view class="where-page-num">
							<view @click="sides = 0 " :class=" sides == 0 ? 'left-btn l-xuanzhong' : 'left-btn' ">单面</view>
							<view @click="sides = 1 " :class=" sides == 1 ? 'right-btn r-xuanzhong' : 'right-btn' ">双面</view>
						</view>
					</view>
				</view>
				<view class="where-container-row-1">
					<view class="where-container-row-1-left top-height">
						<view class="where-container-row-1-left-1">页面</view>
						<view class="page-num-set">
							<input class="min-page" value="1" />
							<view class="zhi">至</view>
							<input class="max-page" value="1" />
						</view>
					</view>
					<view class="where-container-row-1-rfight top-height">
						<view class="where-container-row-1-rfight-1">颜色</view>
						<view class="where-page-num">
							<view @click="color = 0 " :class=" color == 0 ? 'left-btn l-xuanzhong' : 'left-btn' ">黑白</view>
							<view @click="color = 1 " :class=" color == 1 ? 'right-btn r-xuanzhong' : 'right-btn' ">彩色</view>
						</view>
					</view>
				</view>
			</view>
			<view class="show-btn">
				<image class="trush" src="http://qswy.com/static/xcximg/file_dle@2x.png"></image>
				<!-- <view class="hide">
					<image class="jt" src="http://qswy.com/static/xcximg/file_hide@2x.png"></image>
					收起
				</view> -->
				<view class="show">
					<image class="jt" src="http://qswy.com/static/xcximg/file_display@2x.png"></image>
					展开
				</view>
			</view>
		</view>
		
		<!-- 悬浮图标 -->
		<image class="xuanfu-img" src="http://qswy.com/static/xcximg/file_choice@2x.png"></image>
		<footerCount></footerCount>
	</view>
</template>

<script>
	import footerCount from "../../components/footerCount.vue"
	import scanEquipment from "../../components/scanEquipment.vue"
	export default{
		components:{
			footerCount,
			scanEquipment
		},
		data(){
			return {
				printNum:1,
				//颜色 1 彩色  0 黑白
				color:1,
				//单双面 1双面 0 单面
				sides: 0,
			}
		},
		methods:{
			counter(field,val){
				if(this[field] + val <= 0){
					return
				}
				this[field] += val
			}
		}
	}
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

			& .check-cricle {
				@include w-h(40upx, 40upx);
			}
			& .row-1-right {
				width: 100%;
				margin-left: 20upx;
				& .row-1-right-item1 {
					@include display-flex-space-between;
					& .row-1-right-item1-left {
						@include display-flex-start;
						& .img-icon {
							@include w-h(54upx, 54upx);
							flex-shrink: 0;
							padding-right: 9upx;
						}
						@include font-no-height(30, 500, $color-33);
					}
					& .row-1-right-item1-right {
						@include display-flex-start;
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
				margin-top: 33upx;
				@include display-flex-space-between;
				& .font-show {
					@include font-no-height(28upx, 500, $color-66);
				}
				& .row-2-right-money {
					padding-bottom: 30upx;
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
			
				& .where-container-row-1-left{
					width: calc(50% - 2upx);
					display: grid;
					justify-items: flex-start;
					border-right: solid 2upx $color-f1;
				}
				& .where-container-row-1-rfight{
					width: calc(50% - 2upx);
					display: grid;
					justify-items: flex-end;
						
				}
				& .bottom-line{
					border-bottom: solid 2upx $color-f1;
				}
				& .bottom-height{
					padding-bottom: 20upx;
				}
				& .top-height{
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
				& .page-num-set{
					@include display-flex-start;
					& .min-page{
						@include w-h(70upx, 80upx);
						border: 3upx solid $color-C5;
						border-radius: 10upx 0px 0px 10upx;
						text-align: center;
					}
					& .zhi{
						@include w-h(70upx, 80upx);
						border-top: 3upx solid $color-C5;
						border-bottom: 3upx solid $color-C5;
						@include font-center;
					}
					& .max-page{
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
		
		& .show-btn{
			@include  display-flex-space-between;
			padding-top: 30upx;
			& .trush{
				@include w-h(34upx, 34upx);
			}
			& .hide{
				@include display-flex-start;
				@include font-no-height(24, 500, $color-A4);
				& .jt{
					@include w-h(30upx, 30upx);
					padding-right: 10upx;
				}
			}
			& .show{
				@include display-flex-start;
				@include font-no-height(24, 500, $color-3985FF);
				& .jt{
					@include w-h(30upx, 30upx);
					padding-right: 10upx;
				}
			}
		}
	
	}
	& .xuanfu-img{
		position: fixed;
		right: 40upx;
		bottom: 238upx;
		@include w-h(94upx,94upx);
	}
	
	& .height-pad{
		width: 100%;
		height: 100upx;
	}
}
</style>
