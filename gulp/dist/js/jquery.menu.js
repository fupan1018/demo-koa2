/**
 * jQuery EasyUI 1.5
 * 
 * Copyright (c) 2009-2016 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: http://www.jeasyui.com/license_freeware.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
/**
 * menu - jQuery EasyUI
 * 
 */
!function($){/**
	 * initialize the target menu, the function can be invoked only once
	 */
function init(e){function t(e){var n=[];return e.addClass("menu"),n.push(e),e.hasClass("menu-content")||e.children("div").each(function(){var e=$(this).children("div");if(e.length){e.appendTo("body"),this.submenu=e;// point to the sub menu
var i=t(e);n=n.concat(i)}}),n}var n=$.data(e,"menu").options;$(e).addClass("menu-top"),// the top menu
n.inline?$(e).addClass("menu-inline"):$(e).appendTo("body"),$(e).bind("_resize",function(t,n){return($(this).hasClass("easyui-fluid")||n)&&$(e).menu("resize",e),!1});for(var i=t($(e)),o=0;o<i.length;o++)createMenu(e,i[o])}function createMenu(e,t){var n=$(t).addClass("menu");n.data("menu")||n.data("menu",{options:$.parser.parseOptions(n[0],["width","height"])}),n.hasClass("menu-content")||(n.children("div").each(function(){createItem(e,this)}),$('<div class="menu-line"></div>').prependTo(n)),setMenuSize(e,n),n.hasClass("menu-inline")||n.hide(),bindMenuEvent(e,n)}/**
	 * create the menu item
	 */
function createItem(target,div,options){var item=$(div),itemOpts=$.extend({},$.parser.parseOptions(item[0],["id","name","iconCls","href",{separator:"boolean"}]),{disabled:!!item.attr("disabled")||void 0,text:$.trim(item.html()),onclick:item[0].onclick},options||{});itemOpts.onclick=itemOpts.onclick||itemOpts.handler||null,item.data("menuitem",{options:itemOpts}),itemOpts.separator&&item.addClass("menu-sep"),item.hasClass("menu-sep")||(item.addClass("menu-item"),item.empty().append($('<div class="menu-text"></div>').html(itemOpts.text)),itemOpts.iconCls&&$('<div class="menu-icon"></div>').addClass(itemOpts.iconCls).appendTo(item),itemOpts.id&&item.attr("id",itemOpts.id),itemOpts.onclick&&("string"==typeof itemOpts.onclick?item.attr("onclick",itemOpts.onclick):item[0].onclick=eval(itemOpts.onclick)),itemOpts.disabled&&setDisabled(target,item[0],!0),item[0].submenu&&$('<div class="menu-rightarrow"></div>').appendTo(item))}function setMenuSize(e,t){var n=$.data(e,"menu").options,i=t.attr("style")||"",o=t.is(":visible");t.css({display:"block",left:-1e4,height:"auto",overflow:"hidden"}),t.find(".menu-item").each(function(){$(this)._outerHeight(n.itemHeight),$(this).find(".menu-text").css({height:n.itemHeight-2+"px",lineHeight:n.itemHeight-2+"px"})}),t.removeClass("menu-noline").addClass(n.noline?"menu-noline":"");var s=t.data("menu").options,a=s.width,u=s.height;isNaN(parseInt(a))&&(a=0,t.find("div.menu-text").each(function(){a<$(this).outerWidth()&&(a=$(this).outerWidth())}),
// width += 40;
a=a?a+40:"");var d=t.outerHeight();if(isNaN(parseInt(u)))if(u=d,t.hasClass("menu-top")&&n.alignTo){var r=$(n.alignTo),m=r.offset().top-$(document).scrollTop(),l=$(window)._outerHeight()+$(document).scrollTop()-r.offset().top-r._outerHeight();u=Math.min(u,Math.max(m,l))}else u>$(window)._outerHeight()&&(u=$(window).height());t.attr("style",i),// restore the original style
t.show(),t._size($.extend({},s,{width:a,height:u,minWidth:s.minWidth||n.minWidth,maxWidth:s.maxWidth||n.maxWidth})),t.find(".easyui-fluid").triggerHandler("_resize",[!0]),t.css("overflow",t.outerHeight()<d?"auto":"hidden"),t.children("div.menu-line")._outerHeight(d-2),o||t.hide()}/**
	 * bind menu event
	 */
function bindMenuEvent(e,t){var n=$.data(e,"menu"),i=n.options;t.unbind(".menu");for(var o in i.events)t.bind(o+".menu",{target:e},i.events[o])}function mouseenterHandler(e){var t=e.data.target,n=$.data(t,"menu");n.timer&&(clearTimeout(n.timer),n.timer=null)}function mouseleaveHandler(e){var t=e.data.target,n=$.data(t,"menu");n.options.hideOnUnhover&&(n.timer=setTimeout(function(){hideAll(t,$(t).hasClass("menu-inline"))},n.options.duration))}function mouseoverHandler(e){var t=e.data.target,n=$(e.target).closest(".menu-item");if(n.length){if(n.siblings().each(function(){this.submenu&&hideMenu(this.submenu),$(this).removeClass("menu-active")}),
// show this menu
n.addClass("menu-active"),n.hasClass("menu-item-disabled"))return void n.addClass("menu-active-disabled");var i=n[0].submenu;i&&$(t).menu("show",{menu:i,parent:n})}}function mouseoutHandler(e){var t=$(e.target).closest(".menu-item");if(t.length){t.removeClass("menu-active menu-active-disabled");var n=t[0].submenu;n?e.pageX>=parseInt(n.css("left"))?t.addClass("menu-active"):hideMenu(n):t.removeClass("menu-active")}}function clickHandler(e){var t=e.data.target,n=$(e.target).closest(".menu-item");if(n.length){var i=$(t).data("menu").options,o=n.data("menuitem").options;if(o.disabled)return;n[0].submenu||(hideAll(t,i.inline),o.href&&(location.href=o.href)),n.trigger("mouseenter"),i.onClick.call(t,$(t).menu("getItem",n[0]))}}/**
	 * hide top menu and it's all sub menus
	 */
function hideAll(e,t){var n=$.data(e,"menu");return n&&$(e).is(":visible")&&(hideMenu($(e)),t?$(e).show():n.options.onHide.call(e)),!1}/**
	 * show the menu, the 'param' object has one or more properties:
	 * left: the left position to display
	 * top: the top position to display
	 * menu: the menu to display, if not defined, the 'target menu' is used
	 * parent: the parent menu item to align to
	 * alignTo: the element object to align to
	 */
function showMenu(e,t){function n(e,t){return e+a.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()&&(e=t?$(t).offset().top-a._outerHeight():$(window)._outerHeight()+$(document).scrollTop()-a.outerHeight()),e<0&&(e=0),e}t=t||{};var i,o,s=$.data(e,"menu").options,a=$(t.menu||e);if($(e).menu("resize",a[0]),a.hasClass("menu-top")){if($.extend(s,t),i=s.left,o=s.top,s.alignTo){var u=$(s.alignTo);i=u.offset().left,o=u.offset().top+u._outerHeight(),"right"==s.align&&(i+=u.outerWidth()-a.outerWidth())}i+a.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()&&(i=$(window)._outerWidth()+$(document).scrollLeft()-a.outerWidth()-5),i<0&&(i=0),o=n(o,s.alignTo)}else{var d=t.parent;// the parent menu item
i=d.offset().left+d.outerWidth()-2,i+a.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()&&(i=d.offset().left-a.outerWidth()+2),o=n(d.offset().top-3)}a.css(s.position.call(e,a[0],i,o)),a.show(0,function(){a[0].shadow||(a[0].shadow=$('<div class="menu-shadow"></div>').insertAfter(a)),a[0].shadow.css({display:a.hasClass("menu-inline")?"none":"block",zIndex:$.fn.menu.defaults.zIndex++,left:a.css("left"),top:a.css("top"),width:a.outerWidth(),height:a.outerHeight()}),a.css("z-index",$.fn.menu.defaults.zIndex++),a.hasClass("menu-top")&&s.onShow.call(e)})}function hideMenu(e){function t(e){e.stop(!0,!0),e[0].shadow&&e[0].shadow.hide(),e.hide()}e&&e.length&&(t(e),e.find("div.menu-item").each(function(){this.submenu&&hideMenu(this.submenu),$(this).removeClass("menu-active")}))}function findItem(e,t){function n(s){s.children("div.menu-item").each(function(){var s=$(e).menu("getItem",this),a=o.empty().html(s.text).text();t==$.trim(a)?i=s:this.submenu&&!i&&n(this.submenu)})}var i=null,o=$("<div></div>");return n($(e)),o.remove(),i}function setDisabled(e,t,n){var i=$(t);if(i.hasClass("menu-item")){var o=i.data("menuitem").options;o.disabled=n,n?(i.addClass("menu-item-disabled"),i[0].onclick=null):(i.removeClass("menu-item-disabled"),i[0].onclick=o.onclick)}}function appendItem(e,t){var n=($.data(e,"menu").options,$(e));if(t.parent){if(!t.parent.submenu){var i=$("<div></div>").appendTo("body");t.parent.submenu=i,$('<div class="menu-rightarrow"></div>').appendTo(t.parent),createMenu(e,i)}n=t.parent.submenu}var o=$("<div></div>").appendTo(n);createItem(e,o,t)}function removeItem(e,t){function n(e){if(e.submenu){e.submenu.children("div.menu-item").each(function(){n(this)});var t=e.submenu[0].shadow;t&&t.remove(),e.submenu.remove()}$(e).remove()}n(t)}function setVisible(e,t,n){var i=$(t).parent();n?$(t).show():$(t).hide(),setMenuSize(e,i)}function destroyMenu(e){$(e).children("div.menu-item").each(function(){removeItem(e,this)}),e.shadow&&e.shadow.remove(),$(e).remove()}$(function(){$(document).unbind(".menu").bind("mousedown.menu",function(e){var t=$(e.target).closest("div.menu,div.combo-p");t.length||($("body>div.menu-top:visible").not(".menu-inline").menu("hide"),hideMenu($("body>div.menu:visible").not(".menu-inline")))})}),$.fn.menu=function(e,t){return"string"==typeof e?$.fn.menu.methods[e](this,t):(e=e||{},this.each(function(){var t=$.data(this,"menu");t?$.extend(t.options,e):(t=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),e)}),init(this)),$(this).css({left:t.options.left,top:t.options.top})}))},$.fn.menu.methods={options:function(e){return $.data(e[0],"menu").options},show:function(e,t){return e.each(function(){showMenu(this,t)})},hide:function(e){return e.each(function(){hideAll(this)})},destroy:function(e){return e.each(function(){destroyMenu(this)})},/**
		 * set the menu item text
		 * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	text: string, the new text
		 * }
		 */
setText:function(e,t){return e.each(function(){var e=$(t.target).data("menuitem").options;e.text=t.text,$(t.target).children("div.menu-text").html(t.text)})},/**
		 * set the menu icon class
		 * param: {
		 * 	target: DOM object, indicate the menu item
		 * 	iconCls: the menu item icon class
		 * }
		 */
setIcon:function(e,t){return e.each(function(){var e=$(t.target).data("menuitem").options;e.iconCls=t.iconCls,$(t.target).children("div.menu-icon").remove(),t.iconCls&&$('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(t.target)})},/**
		 * get the menu item data that contains the following property:
		 * {
		 * 	target: DOM object, the menu item
		 *  id: the menu id
		 * 	text: the menu item text
		 * 	iconCls: the icon class
		 *  href: a remote address to redirect to
		 *  onclick: a function to be called when the item is clicked
		 * }
		 */
getItem:function(e,t){var n=$(t).data("menuitem").options;return $.extend({},n,{target:$(t)[0]})},findItem:function(e,t){return findItem(e[0],t)},/**
		 * append menu item, the param contains following properties:
		 * parent,id,text,iconCls,href,onclick
		 * when parent property is assigned, append menu item to it
		 */
appendItem:function(e,t){return e.each(function(){appendItem(this,t)})},removeItem:function(e,t){return e.each(function(){removeItem(this,t)})},enableItem:function(e,t){return e.each(function(){setDisabled(this,t,!1)})},disableItem:function(e,t){return e.each(function(){setDisabled(this,t,!0)})},showItem:function(e,t){return e.each(function(){setVisible(this,t,!0)})},hideItem:function(e,t){return e.each(function(){setVisible(this,t,!1)})},resize:function(e,t){return e.each(function(){setMenuSize(this,$(t?t:this))})}},$.fn.menu.parseOptions=function(e){return $.extend({},$.parser.parseOptions(e,[{minWidth:"number",itemHeight:"number",duration:"number",hideOnUnhover:"boolean"},{fit:"boolean",inline:"boolean",noline:"boolean"}]))},$.fn.menu.defaults={zIndex:11e4,left:0,top:0,alignTo:null,align:"left",minWidth:120,itemHeight:22,duration:100,// Defines duration time in milliseconds to hide when the mouse leaves the menu.
hideOnUnhover:!0,// Automatically hides the menu when mouse exits it
inline:!1,// true to stay inside its parent, false to go on top of all elements
fit:!1,noline:!1,events:{mouseenter:mouseenterHandler,mouseleave:mouseleaveHandler,mouseover:mouseoverHandler,mouseout:mouseoutHandler,click:clickHandler},position:function(e,t,n){return{left:t,top:n}},onShow:function(){},onHide:function(){},onClick:function(e){}}}(jQuery);