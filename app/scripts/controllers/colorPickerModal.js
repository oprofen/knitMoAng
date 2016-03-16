'use strict';

/**
 * @ngdoc function
 * @name knitMoAngularjsApp.controller:PickerCtrl
 * @description
 * # PickerCtrl
 * Controller of the knitMoAngularjsApp
 */


angular.module('knitMoAngularjsApp')
.controller('PickerCtrl', 
['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
       
  $scope.ok = function () {
    $uibModalInstance.close();
  };
}]);