var routerApp=angular.module('routerApp',['ui.router']);
routerApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'tpls/home.html'
		})
		.state('home.list',{
			url:'/list',
			templateUrl:'tpls/home-list.html',
			controller:function($scope){
				$scope.topics=['Butterscotch','Black Current','Mango'];
			}
		})
		.state('home.paragraph', {
	        url: '/paragraph',
	        template: 'I could sure use a scoop of ice-cream. '
	    })
		.state('about',{
			url:'/about',
			views:{
				'':{
					templateUrl:'tpls/about.html'
				},
				'columnOne@about':{
					template:'这里是第一列的内容'
				},
				'columnTwo@about':{
					templateUrl:'tpls/table-data.html',
					controller:'ctrl'
				}
			}
		})
});

routerApp.controller('ctrl', function($scope) {
    $scope.message = 'test';
    $scope.topics = [{
        name: 'Butterscotch',
        price: 50
    }, {
        name: 'Black Current',
        price: 100
    }, {
        name: 'Mango',
        price: 20
    }];
}); 


//注解：
//1.可以通过state第一个参数来查找我们要的模本
//2.可以通过地址栏的(url)来切换我们需要的模板
//3.可以通过定义控制器来渲染模板，可以在外部定义，但是要通过依赖注入的方式，注入进来
//4.可以通过views来切分多个视图,然后在结构上定义ui-view="columnOne" 进行视图的展示






