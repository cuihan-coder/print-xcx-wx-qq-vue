	
	// 获取DOM元素到页面顶部的距离
	function getElementToPageTop(el) {
	  if(el.parentElement) {
	    return this.getElementToPageTop(el.parentElement) + el.offsetTop
	  }
	  return el.offsetTop
	}
	
	export default {
		getElementToPageTop
	};