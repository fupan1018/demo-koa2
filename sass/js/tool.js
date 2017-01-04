define(['jquery','back'],function($,back){
	function scrollTo(el,opts){
		this.opts=$.extend({},scrollTo.default,opts);
		this.el=$(el);
		this.scroll=new back.scrollTo({
			dest:0,
			speed:this.opts.speed
		}) 
		this.el.on('click',$.proxy(this._move,this));
		$(window).on('scroll',$.proxy(this._checkPosition,this));
	}
	scrollTo.default={
		pos:0,
		speed:800
	};
	scrollTo.prototype._move=function(){
		this.scroll.move();
	}
	scrollTo.prototype._checkPosition=function(){
		var el=this.el;
		if($(window).scrollTop()>this.opts.pos){
			el.fadeIn();
		}else{
			el.fadeOut();
		}
	}
	$.fn.extend({
		scrollTo:function(opts){
			return this.each(function(){
				new scrollTo(this,opts)
			});
		}
	});
});