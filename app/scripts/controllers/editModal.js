'use strict';

/**
 * @ngdoc function
 * @name knitMoAngularjsApp.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the knitMoAngularjsApp
 */


angular.module('knitMoAngularjsApp')
.controller('ModalInstanceCtrl', 
['$scope', '$uibModalInstance', 'coordinate', '$uibModal','eService','appConfig',
    function ($scope, $uibModalInstance, coordinate, $uibModal, eService, appConfig) {
        
        
        
        //Вспомогательные функции
        function _changeColor(color){
            angular.element('#defaultColorEdit').css({background: color,
                                                      color: eService.convertColor(color)});
        };
        
        function _detectChanges(){
            var changes = {};
            changes.defaultColor = $scope.defaultColor;
            changes.actionsRow = {before:{}, after:{}};
            changes.actionsColumn = {before:{}, after:{}};
            changes.currentColumn = {action:null, x:coordinate.x};
            changes.currentRow = {action:null, y:coordinate.y};
            
            angular.element('actionbox').each(function(){
                    if(angular.element(this).attr('data-subject') === 'row') 
                        {
                          if(angular.element(this).attr('data-position') === 'top') 
                          {
                              changes.actionsRow.before.action = angular.element(this).find('select').val();
                              changes.actionsRow.before.amount = angular.element(this).find('input').val();
                          } else if (angular.element(this).attr('data-position') === 'bottom')
                          {
                              changes.actionsRow.after.action = angular.element(this).find('select').val();
                              changes.actionsRow.after.amount = angular.element(this).find('input').val();
                          }
                        }
                    else if (angular.element(this).attr('data-subject') === 'column')  
                        {
                            if(angular.element(this).attr('data-position') === 'left') 
                          {
                              changes.actionsColumn.before.action = angular.element(this).find('select').val();
                              changes.actionsColumn.before.amount = angular.element(this).find('input').val();
                          } else if (angular.element(this).attr('data-position') === 'right')
                          {
                              changes.actionsColumn.after.action = angular.element(this).find('select').val();
                              changes.actionsColumn.after.amount = angular.element(this).find('input').val();
                          }
                        }
            });
            if(angular.element('#deleteCurrentColumn').is(":checked"))
                {
                    changes.currentColumn.action = 'delete';
                }
            if(angular.element('#deleteCurrentRow').is(":checked"))
                {
                    changes.currentRow.action = 'delete';
                }

            return changes;
        };
    
    $scope.test = function(){
        console.log('acr')
    }
    
    $scope.currentX = coordinate.x;
    $scope.currentY = coordinate.y;
    
    $scope.ok = function () {
      $uibModalInstance.close(_detectChanges());
      /*$scope.$parent.defaultColor = $scope.defaultColor;
      
      eService.updateDefaultColor($scope.defaultColor);
      console.log();*/
   
      
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    
    $scope.defaultColor = $scope.$parent.defaultColor;
    _changeColor($scope.defaultColor);
    
    $scope.chooseColor = function(){
                var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                template: "<div class=\"modal-header\">\n\
                            <button class=\"close\" type=\"button\" ng-click=\"ok()\"><span>&times;</span></button>\n\
                            </div><div class=\"modal-body\"><div web-colorpicker \n\
                            dab-model=\"$parent.defaultColor\" \n\
                            dab-height=\"20\" dab-width=\"20\" dab-radius=\"50\" dab-vertical=\"3\" dab-rotate=\"0\"\n\
                            show-grayscale=\"true\"></div>\n\
                            </div>",
                controller: 'PickerCtrl',
                size: 'sm',
                scope: $scope
              });
              modalInstance.result.then(function(){
                 _changeColor($scope.defaultColor); 
              });
             
              
    };
    
    $scope.deleteCurrentRow = false;
    $scope.deleteCurrentColumn = false;
    
}]);