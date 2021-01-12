//全局使用px px 转 upx 除以 2
const a4Pic = {
	//a4厘米 210 * 297mm
	A4HeightMm: 297,
	//自定义高度
	A4Height: 850 / 2,
	//自定义宽度
	A4Width: 598 / 2,
	//文件上传初始化宽高设置 因为框架不能放入upx 所以按照像素除2
	picWHInit: (originalW, originalH) => {
		let W = originalW,
			H = originalH;
		//横屏图
		if (originalW > originalH) {
			if (originalW > a4Pic.A4Width || originalH > a4Pic.A4Height) {
				W = a4Pic.A4Width
				H = W / originalW * originalH
			}
		}
		//竖屏图
		if (originalW < originalH) {
			if (originalW > a4Pic.A4Width || originalH > a4Pic.A4Height) {
				H = a4Pic.A4Height
				W = H / originalH * originalW
			}
		}

		//正方形
		if (originalW == originalH) {
			if (originalW > a4Pic.A4Width || originalH > a4Pic.A4Height) {
				W = a4Pic.A4Width
				H = W
			}
		}

		return {
			W: W,
			H: H
		}

	},

	/**
	 * 上移 正数  下移 负数
	 * @var movePx 移动的像素
	 * @var nowPtPx 现在距离顶部的像素
	 * @var imgHeight 现在图片的高度
	 */
	moveUp: (movePx, nowPtPx, imgHeight, rotaing) => {
		//超出A4高度
		let ptH = nowPtPx + movePx
		if (ptH < 0) {
			uni.showToast({
				title: '超出打印范围',
				duration: 2000,
				icon: 'none'
			});
			return 0;
		}
		console.log(ptH + '+' + imgHeight + '>' + a4Pic.A4Height)
		if (ptH + imgHeight > a4Pic.A4Height) {
			uni.showToast({
				title: '超出打印范围',
				duration: 2000,
				icon: 'none'
			});
			return nowPtPx;
		}
		return ptH
	},
	//居中
	moveMiddle: (imgWidth) => {
		return (a4Pic.A4Width - imgWidth) / 2
	},
	//左移
	moveLeft: () => {
		return 0
	},
	//右移
	moveRight: (imgWidth) => {
		return a4Pic.A4Width - imgWidth
	},
	/**
	 * 放大 正数  缩小 负数
	 * @var changeSize 增加的像素
	 * @var imgWidth 现在图片的宽度
	 * @var imgHeight 现在图片的高度
	 * @var pl 现在的左便宜量
	 * @var pt 现在的上便宜量
	 */
	changeSize: (changeSize, imgWidth, imgHeight, pl, pt, rotate) => {
		let W = imgWidth,
			H = imgHeight;

		//横屏图
		if (imgWidth > imgHeight) {
			W = imgWidth + changeSize
			//增加的宽度占比 * 之前的宽度 等于 应该增加的宽度
			H = imgHeight + (changeSize / imgWidth * imgHeight)
		}
		//竖屏图
		if (imgWidth < imgHeight) {
			H = imgHeight + changeSize
			W = imgWidth + (changeSize / imgHeight * imgWidth)
		}

		//正方形
		if (imgWidth == imgHeight) {
			H = imgHeight + changeSize
			W = H
		}
		if(rotate == 90){
			if (H + pl > a4Pic.A4Width || W + pt > a4Pic.A4Height) {
				uni.showToast({
					title: '超出打印范围',
					duration: 2000,
					icon: 'none'
				});
				W = imgWidth
				H = imgHeight
			}
		}else if(rotate == 0){
			//图片宽 + 放大的像素 + 左侧像素
			if (W + pl > a4Pic.A4Width || H + pt > a4Pic.A4Height) {
				uni.showToast({
					title: '超出打印范围',
					duration: 2000,
					icon: 'none'
				});
				W = imgWidth
				H = imgHeight
			}
		}
		

		return {
			W: W,
			H: H
		}
	},
	//旋转
	rotating: (degree, imgWidth, imgHeight, rotate, pl, pt) => {
		let W = imgWidth,
			H = imgHeight,
			MT = 0,
			ML = 0,
			ROTATE = 0;
		if (H > a4Pic.A4Height) {
			H = a4Pic.A4Height;
			W = parseInt(a4Pic.A4Height / H * W);
		} else if (W > a4Pic.A4Width) {
			W = a4Pic.A4Width;
			H = parseInt(a4Pic.A4Width / W * H);
		}

		ROTATE = rotate == 90 ? 0 : 90;
		({
			MT,
			ML
		} = a4Pic.rotatingFix(W / 2, H / 2))
		return {
			W: W / 2,
			H: H / 2,
			MT: MT,
			ML: ML,
			ROTATE: rotate == 90 ? 0 : 90
		}
	},
	//偏移量换算 像素转换成毫米
	pxToMm: (OffsetPx) => {
		return OffsetPx / a4Pic.A4Height * a4Pic.A4HeightMm
	},
	upxToPx: (upx) => {
		return upx / 2
	},
	//旋转自动纠偏 图片初次纠偏
	rotatingFix(imgW, imgH) {
		if (imgW >= imgH) {
			return {
				MT: (imgW - imgH) / 2,
				ML: -(imgW - imgH) / 2
			}
		}
		if (imgW <= imgH) {
			return {
				MT: -(imgH - imgW) / 2,
				ML: (imgH - imgW) / 2
			}
		}

	},
	//上下位移纠偏
	rotatingPtFix(pt, imgW, imgH) {
		return {
			PT_MT: (pt / 2),
			PT_ML: (pt / 2)
		}
	},
	//左右位移纠偏 moveType 1 左侧 居中2 靠右3
	rotatingPlFix(pl, imgW, imgH, moveType) {

		if (imgW > imgH) {
			let PL_ML = 0
			//左侧
			if (moveType == 1) {
				PL_ML = -(imgW - imgH) / 2
			}
			//居中
			if (moveType == 2) {
				PL_ML = pl / 2
			}
			//靠右
			if (moveType == 3) {
				PL_ML = pl / 2 + (imgW - imgH) / 2
			}

			return {
				PL_MT: (-(pl / 2) + (imgW - imgH) / 2),
				PL_ML: PL_ML
			}
		}

		if (imgW < imgH) {
			let PL_ML = 0
			//左侧
			if (moveType == 1) {
				PL_ML = (imgH - imgW) / 2
			}
			//居中
			if (moveType == 2) {
				PL_ML = pl / 2
			}
			//靠右
			if (moveType == 3) {
				PL_ML = pl / 2 + (imgW - imgH) / 2
			}

			return {
				PL_MT: (-(pl / 2) + (imgW - imgH) / 2),
				PL_ML: PL_ML
			}
		}

	},
}

export default a4Pic;
