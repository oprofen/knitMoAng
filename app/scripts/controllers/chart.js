'use strict';

/**
 * @ngdoc function
 * @name knitMoAngularjsApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the knitMoAngularjsApp
 */
angular.module('knitMoAngularjsApp')
  .controller('ChartCtrl', 
      ['$scope','$timeout','$sce','$rootScope','$uibModal','eService',
        function ($scope,$timeout,$sce,$rootScope,$uibModal, eService) {
            //Вспомогательные функции
              
            // Начальные параметры
            
            
            var chart = eService.createNew(5, 5, '#FFFFFF');
            
            
            $scope.content = chart.content;
            $scope.defaultColor = chart.defaultColor;
            
            
            
            
            $scope.colorBox = '#000000';
            $scope.tableSize = 25;

            
            
            $scope.chooseDefaultColor = function(){
                $scope.choosenColor =  "";
            };
            $scope.chooseColorPaint = function(){
                $scope.choosenColor =  $scope.colorBox;
            };
            $scope.chooseColor = function(){
                var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                template: "<div class=\"modal-header\">\n\
                            <button class=\"close\" type=\"button\" ng-click=\"ok()\"><span>&times;</span></button>\n\
                            </div><div class=\"modal-body\"><div web-colorpicker \n\
                            dab-model=\"$parent.colorBox\" \n\
                            dab-height=\"20\" dab-width=\"20\" dab-radius=\"50\" dab-vertical=\"3\" dab-rotate=\"0\"\n\
                            show-grayscale=\"true\"></div>\n\
                            </div>",
                controller: 'PickerCtrl',
                size: 'sm',
                scope: $scope
                });
                modalInstance.result.then(function(){
                    angular.element('#colorBox').css({'background': $scope.colorBox,
                                                      'color': eService.convertColor($scope.colorBox)});
                $scope.chooseColorPaint();
                });
            };
            
       
          }]);
