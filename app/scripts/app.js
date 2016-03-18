'use strict';

/**
 * @ngdoc overview
 * @name knitMoAngularjsApp
 * @description
 * # knitMoAngularjsApp
 *
 * Main module of the application.
 */
angular
  .module('knitMoAngularjsApp', [
    'ngAnimate',
    'ui.router',
    'ngSanitize',
    'ui.bootstrap'
    
  ])
 .constant('appConfig',
    {
        MAX_X: 300,
        MAX_Y: 300
    })
 .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('app',{
            url:'/',
            views: {
                'content': {
                    templateUrl: 'views/chart.html',
                    controller: 'ChartCtrl',
                    onEnter: function(title){console.log(title);    
                    }
                }
            }
        });
        $urlRouterProvider.otherwise('/');
    })
            .run(['$rootScope','$timeout', function($rootScope,$timeout){
                  
               angular.element(window).resize(function() {
                var resizeTimeout;
                function resizeThrottler() {
                
                  // ignore resize events as long as an actualResizeHandler execution is in the queue
                  if ( !resizeTimeout ) {
                      resizeTimeout = $timeout(function() {
                      resizeTimeout = null;
                      actualResizeHandler();
                     }, 120);
                  }
                }
                function actualResizeHandler() {
                    $rootScope.width = angular.element(window).width();
                    
                };
                resizeThrottler();
                });
                $rootScope.width = angular.element(window).width();
                
            }])
            ;
