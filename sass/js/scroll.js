define(['jquery'],function($){
	function BackTop(opts){
		//传入的参数覆盖默认的
		this.opts=$.extend({},BackTop.default,opts);
		this.el=$('html,body');
	}
	BackTop.prototype.move=function(){
		var opts=this.opts;
		this.el.animate({
			scrollTop:opts.dest
		},opts.speed);
	};
	BackTop.default={
		dest:0,
		speed:800
	};
	return {
		scrollTo:BackTop
	}

});