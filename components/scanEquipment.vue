<template>
	<view>
		<view class="row-1-container">
			<view class="row-1-container-top">
				<view class="item-1">
					<view class="item-1-left">
						<image class="item-1-left-image" src="http://qswy.com/static/xcximg/currency_printer_s@2x.png"></image>
						<text>{{ device_name }}</text>
					</view>
					<image @click="scanCode" class="item-1-right" src="http://qswy.com/static/xcximg/file_scan_code@2x.png"></image>
				</view>
				<view class="item-2">
					<image class="item-2-image" src="http://qswy.com/static/xcximg/currency_add@2x.png"></image>
					<text>{{ group_name }}</text>
				</view>
				<view class="item-3">
					<text>彩色</text>
					<text>黑白</text>
					<text>相片冲印</text>
					<text>证件照</text>
				</view>
			</view>
			<view v-if="is_must_scan == 0" class="print-directly">当前未连接设备，可采用到店取件方式打印</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'scanEquipment',
	data:()=>({
		//是否需要扫码设备进行打印 1 是 0 不是
		is_must_scan: 0,
		//分组名
		group_name: '请扫码',
		//设备名称
		device_name: '请扫码'
	}),
	computed:{
		STORE_INDEX_DEVICEINFO(){
			return this.$store.state.deviceInfo
		},
		STORE_INDEX_GROUPINFO(){
			return this.$store.state.groupInfo
		}
	},
	watch:{
		STORE_INDEX_DEVICEINFO(val){
			this.device_name = val.name
		},
		STORE_INDEX_GROUPINFO(val){
			this.group_name = val.goup_name
		}
	},
	created(){
		if(this.$store.state.groupInfo){
			this.changeInit(this)
		}
	},
	beforeDestroy(){
		if(this.$store.state.groupInfo){
			this.changeInit(this)
		}
	},
	methods: {
		scanCode() {
			let that = this;
			uni.scanCode({
				onlyFromCamera: true,
				scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
				success: async function(res) {
					that.$store.commit('SET_DEVICECODE', res.result);
					//获取分组价格以及设备信息
					let userInfo = await that.$helper._getCache('userInfo');
					let query = that.$helper.objToQuery({ device_code: that.$store.state.deviceCode, group_id: userInfo.group_id });
					let ret = await that.$helper.httpGet(that.$api.getDeviceGroupInfo_url_get + query);
					if (ret.state == 'success') {
						that.$store.commit('SET_DEVICEINFO', ret.data.deviceInfo);
						that.$store.commit('SET_GROUPINFO', ret.data.groupInfo);
						that.$store.commit('SET_PTPRICE', ret.data.ptPrice);
						that.$store.commit('SET_CZPRICE', ret.data.czPrice);
						//组ID与设备对应组ID不一致，则进行绑定设备对于的组ID，并且更新用户的组ID
						if(ret.data.token){
							userInfo.group_id = ret.data.groupInfo.id
							that.$helper._setCache('userInfo',userInfo);
							that.$helper._setCache('loginToken',token);
						}
						that.changeInit(that)
					} else {
						uni.showToast({
							title: ret.msg,
							icon: 'none',
							duration:3000
						});
					}
				}
			});
		},
		changeInit(that){
			that.is_must_scan = that.$store.state.groupInfo.is_must_scan
			that.group_name = that.$store.state.groupInfo.goup_name
			that.device_name = that.$store.state.deviceInfo.name
		}
	}
};
</script>

<style lang="scss">
.row-1-container {
	width: 100%;
	background: #ffffff;
	border-radius: 30upx;
	& .row-1-container-top {
		padding: 30upx 30upx 0 43upx;
		& .item-1 {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			& .item-1-left {
				& .item-1-left-image {
					@include w-h(32upx, 32upx);
					padding-right: 8upx;
				}
				@include font-no-height(26upx, 400, $color-33);
				@include item-center;
			}
			& .item-1-right {
				@include w-h(190upx, 64upx);
			}
		}
		& .item-2 {
			@include item-center;
			@include font-no-height(24upx, 400, $color-99);
			& .item-2-image {
				@include w-h(20upx, 24upx);
				padding-right: 12upx;
			}
		}
		& .item-3 {
			padding: 22upx 0 30upx 0;
			text {
				margin-right: 10upx;
				padding: 5upx 23upx;
				border: 2upx solid $color-4F79FF;
				border-radius: 16px;
				@include font-no-height(22upx, 400, $color-4F79FF);
			}
		}
	}
	& .print-directly {
		width: 100%;
		line-height: 80upx;

		background: #ff6c6c;
		border-radius: 0 0 30upx 30upx;
		@include font-no-height(28upx, 400, $color-ff);
		text-align: center;
	}
}
</style>
