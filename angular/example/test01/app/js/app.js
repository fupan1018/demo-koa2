//依赖注入需要的模块
var app=angular.module('myApp',['ngRoute', 'ngAnimate','bookStoreCtrls']);

//配置路由
app.config(function($routeProvider){
	$routeProvider.when('/hello',{
		templateUrl:'tpls/sayHello.html',
		controller:'HelloCtrl'
	}).when('/list',{
		templateUrl:'tpls/bookList.html',
		controller:'BookListCtrl'
	}).otherwise({
		redirectTo:'/hello'
	});



	//注解：1.当地址栏是index.hml/hello时，页面会跳转到sayHello.html
		//	并且用controllers.js中控制器HelloCtrl来渲染页面
		//2.当地址栏是index.hml/list时，页面会跳转到bookList.html
		//	并且用controllers.js中控制器BookListCtrl来渲染页面
		//3.当地址栏是index.hml/xxxxx时，页面会跳转到sayHello.html
		//	并且用controllers.js中控制器HelloCtrl来渲染页面
});
