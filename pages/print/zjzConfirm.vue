<template>
	<view class="content">
		<scanEquipment></scanEquipment>
		<zjzsub 
		:color="color" 
		:printType="printType"
		:sinPic="sinPic"
		:tyPic="tyPic"
		></zjzsub>
		<footerCount
		:pageNums="pageNums"
		:orderPrice="orderPrice"
		></footerCount>
	</view>
</template>

<script>
import scanEquipment from '../../components/scanEquipment.vue';
import footerCount from '../../components/footerCount.vue';
import zjzsub from '../../components/zjzsub.vue';
import payModel from '../../common/js/pay.js'

export default {
	components: {
		scanEquipment,
		footerCount,
		zjzsub
	},
	data() {
		return {
			is_subing:0,
			showParam: [1, 3],
			color:0,
			printType:{},
			imgUrl:'',
			sinPic:'',
			tyPic:'',
			pageNums:0,
			orderPrice: 0,
			taskId:[]
		};
	},
	onLoad() {
		this.printType =  this.$store.state.zjzprint.printTypeIndex
		this.color = this.$store.state.zjzprint.color
		this.imgUrl = this.$store.state.zjzprint.imgUrl
		//证件照美化排版
		this.uploadImgbeautify(this.imgUrl,this.color,this.printType.size)
		let that = this
		uni.$on('subOrder',async function(){
			
			if(that.is_subing == 1){
				return
			}
			that.is_subing = 1
			let device_code = that.$store.state.deviceCode
			let ret = await that.$helper.httpPost(that.$api.addMainOrder_url_post,{taskIds:[that.taskId],device_code})
			if(ret.state == 'success'){
				uni.$off('subOrder')
				uni.showToast({
					title: ret.msg,
					icon:'none',
					duration:2000
				})
				uni.navigateTo({
					url:"/pages/print/payPrint?main_id=" + ret.data.main_id
				})
			}
			that.is_subing = 0
		})
		//切换颜色
		uni.$on('changeBackColor',async function(backColor){
			that.uploadImgbeautify(that.imgUrl,backColor,that.printType.size)
		})
		
	},
	methods:{
		async uploadImgbeautify(imgUrl,backColor,size){
			uni.showLoading({
				title:'图片智能处理中'
			})
			let query = this.$helper.objToQuery({imgUrl:this.imgUrl,backColor:backColor,size:this.printType.size})
			let ret = await this.$helper.httpGet(this.$api.cardPicButifulAndTypography_url_get + query)
			uni.showToast({
				title: ret.msg,
				icon:'none',
				duration:2000
			})
			if(ret.state == 'success'){
				this.sinPic = ret.data.sinPic
				this.tyPic = ret.data.tyPic
				this.pageNums = ret.data.file_pages
				this.orderPrice = ret.data.price
				this.taskId = ret.data.taskId
			}
			uni.hideLoading()
		}
	},
	computed:{
		printColor(){
			return this.$store.state.zjzprint.color
		}
	},
	watch:{
		printColor(val){
			this.color = val
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
			image {
				@include w-h(38upx, 38upx);
				padding-right: 6upx;
			}
		}
		& .a4-model {
			position: relative;
			border: 2upx solid #d7d7d7;
			@include item-center;
			padding: 9upx;
			height: 431upx;
			& .no-file {
				width: 100%;
				text-align: center;
				image {
					@include w-h(283upx, 200upx);
				}
				view {
					padding-top: 28upx;
					@include font-no-height(26upx, 500, $color-B6);
				}
			}
			& .file-img {
				width: 100%;
				height: 100%;
			}
			& .trush {
				position: absolute;
				left: 20upx;
				bottom: 20upx;
				@include w-h(60upx, 60upx);
			}
		}
	}
}
</style>
