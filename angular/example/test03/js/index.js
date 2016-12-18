angular.module('myApp', [])
    .directive('myTabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope) {
                var panes = $scope.panes = [];
                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function(pane) {
                    if (panes.length == 0) {
                        $scope.select(pane);//控制一个显示
                    }
                    panes.push(pane);
                    
                };
            },
            templateUrl: 'tpls/my-tabs.html'
        };
    })
    .directive('myPane', function() {
        return {
            require: '^myTabs',
            restrict: 'E',
            transclude: true,
            scope: {
               
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            templateUrl: 'tpls/panel.html'
        };
    });

// 注解：1.通过myTabs和myPane两个指令，将模板渲染到页面上
// 2.通过数组把scope存起来，然后通过参数进行调用