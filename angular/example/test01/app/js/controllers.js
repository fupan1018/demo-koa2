var bookStoreCtrls = angular.module('bookStoreCtrls', []);
bookStoreCtrls.controller('HelloCtrl',['$scope',function($scope){
	$scope.say={
		text:'good morning!'
	}
	$scope.pageClass="hello";
}]);

bookStoreCtrls.controller('BookListCtrl',['$scope',function($scope){
	$scope.books=[
		{
			name:'javascript',
			author:'fupan'
		},
		{
			name:'php',
			author:'fu'
		},
		{
			name:'java',
			author:'pan'
		}
	];
	$scope.pageClass="list";
}]);
