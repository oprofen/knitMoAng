'use strict';

/**
 * @ngdoc function
 * 
 * @description
 * 
 * Directives of the knitMoAngularjsApp
 */
angular.module('knitMoAngularjsApp')

.directive('chart',['$document', '$rootScope', '$timeout','$sce','$uibModal','eService','appConfig',
    function($document, $rootScope, $timeout, $sce, $uibModal, eService, appConfig) {
    
    
  return {
    
    priority: 1,
    template: "<div id=\"header-vertical\"><table class=\"chart\" ng-style=\"chartVert\"><tbody ng-bind-html=\"vert\"></tbody></table></div>\n\
    <div id=\"mainBody\"><table id=\"header-horizontal\" ng-style=\"chartHorz\" class=\"chart\"><tbody  ng-bind-html=\"horz;\"></tbody></table>\n\
    <table id=\"chart\" ng-style=\"chartSize\" class=\"chart\"><tbody ng-bind-html=\"net\"></tbody></table></div>"
    ,
    controller: function($scope, $element, $attrs, $transclude) {
        // Вспомогательные функции DeleteColumnsAfter
        
        function _createNet() {
            var row, result = "";
            
            for(var i = 0; i < eService.currentChart.limit.y; i++){
                row = "<tr>";
                for (var j = 0; j < eService.currentChart.limit.x; j++){
                    var color = "";
                    if(eService.currentChart.content[i][j]){
                        color = "style=\"background:" + eService.currentChart.content[i][j] + "\"";
                    }
                    row +="<td " + color + " data-y=\"" + i +"\" data-x=\"" + j +"\" data-content=\"\"></td>";
                }
                row += "</tr>";
                result += row;
             }
            $scope.net = $sce.trustAsHtml(result);
        };
        function _createHorzHeader(){
            var row;
            row = "<tr>";
            for (var j = 0; j < eService.currentChart.limit.x; j++){
                row +="<th>" + (eService.currentChart.limit.x - j) + "</th>";
            }
            row += "</tr>";
             
            $scope.horz = $sce.trustAsHtml(row);
        };
        function _createVertHeader(){
            var row;
            row = "";
            for (var j = 0; j < eService.currentChart.limit.y; j++){
                row +="<tr><th>" + (eService.currentChart.limit.y - j) + "</th></tr>";
            }
            $scope.vert = $sce.trustAsHtml(row);
        };
        //Генерируем сетку
        _createNet();
        _createHorzHeader();
        _createVertHeader();
        
        //стили 
        $scope.chartSize = {};
        $scope.chartHorz = {};
        $scope.chartVert = {};
        
        //Обновляем
        $scope.$watchCollection(function(){
            var a = {};
            a.x = eService.currentChart.limit.x;
            a.y = eService.currentChart.limit.y;
            a.width = $rootScope.width;
            a.coeff = +$scope.tableSize;
            a.defaultColor = $scope.defaultColor;
            return a;
        }, function(newValue){

         var width = newValue.width  * newValue.coeff * 0.95 / 100 - 45;
         var height = newValue.width / newValue.x  * newValue.y * newValue.coeff * 0.95 / 100 * 1.5 - 45;
         
         
         

         $scope.chartSize.width =  width + 'px';
         $scope.chartSize.height =  height + 'px';
         $scope.chartSize.background = newValue.defaultColor;
         
         
         $scope.chartHorz.width =  width + 'px';
         
         
         $scope.chartVert.height = height + 'px';
        
         
         
         $timeout(function(){
             $scope.tableOffsetTop = angular.element('#chart').offset().top;
             /*$scope.tableOffsetLeft = angular.element('#chart').offset().left;*/
           /*  $scope.chartVert.top =  $scope.tableOffsetTop + 'px';*/
         },0);
         
         //Окно редактирования
         
        $scope.edit = function(a,b){
                var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/editChart.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
                resolve: {'coordinate' : {x: a, y: b}  
               }
              });
            modalInstance.result.then(function(result){
                console.log(result)
                if(result.currentRow.action === 'delete' || result.actionsRow.after.amount > 0 || result.actionsRow.after.amount > 0)
                    {
                         eService.changeAmountOfRows(result.currentRow, result.actionsRow.before, result.actionsRow.after);
                    }
                if(result.currentColumn.action === 'delete' || result.actionsColumn.after.amount > 0 || result.actionsColumn.after.amount > 0)
                    {
                         eService.changeAmountOfColumns(result.currentColumn, result.actionsColumn.before, result.actionsColumn.after);
                    }    

                _createNet();
                _createHorzHeader();
                _createVertHeader();
              });
            };
         
         
         
        }  
        );
    },
    
    link: function(scope, element, attrs) {
        
        var chart = angular.element('#chart');
        var verticalHeader = angular.element('#header-vertical');
        var horizontalHeader = angular.element("#header-horizontal");
        var toolBox = angular.element('#tool-box');
        var firstClicked;
        
        chart.on('touchstart mousedown',function(event){
            
            event.stopPropagation();
            var e = event.originalEvent;
            
            if(angular.element(event.target).is('#chart td') && (!e.touches || e.touches.length === 1))
                {
                    event.preventDefault();
                    
                    /*startPress = new Date();*/
                    firstClicked = angular.element(e.target);
                    /*this.x = event.clientX || event.originalEvent.touches[0].clientX;
                    this.y = event.clientY || event.originalEvent.touches[0].clientY;*/
                }
           
            
        });
        
        
        
        
        chart.on('touchmove mousemove',function(event){
          
            var x, y, target, chartBottom, dataY, dataX, chartRight, chartTop, chartLeft;
            
            event.stopPropagation();
            var e = event.originalEvent;
            
            if(firstClicked && (!e.touches || e.touches.length === 1)) {
                
                event.preventDefault(); 
                if(!firstClicked.is("[data-content=\"" + scope.choosenColor + "\"]"))
                    {
                        firstClicked.css("background", scope.choosenColor);
                        firstClicked.attr("data-content", scope.choosenColor);
                        eService.updateCell(firstClicked.attr("data-y"),
                        firstClicked.attr("data-x"), scope.choosenColor);
                    }
                
                
               
               
                x = event.clientX || event.originalEvent.touches[0].clientX;
                y = event.clientY || event.originalEvent.touches[0].clientY;
                chartBottom = chart[0].getBoundingClientRect().bottom;
                chartTop = chart[0].getBoundingClientRect().top;
                chartRight = chart[0].getBoundingClientRect().right;
                chartLeft = chart[0].getBoundingClientRect().left;
                
                if(chartBottom >= y && y > chartTop && chartRight >= x && x > chartLeft)
                    {   
                        
                        var helperY = Number((chartBottom - y)/chart.height() * eService.currentChart.limit.y) ^ 0;
                        dataY = eService.currentChart.limit.y -  1 - helperY;
                        var helperX = ((chartRight - x)/chart.width()* (eService.currentChart.limit.x)) ^ 0;
                        dataX = eService.currentChart.limit.x - 1 - helperX;
                        target = angular.element("[data-x=\"" + dataX + "\"]" + "[data-y=\"" + dataY + "\"]");
                        if(!target.is("[data-content=\"" + scope.choosenColor + "\"]"))
                            {   
                                target.css("background", scope.choosenColor);
                                target.attr("data-content", scope.choosenColor);
                                eService.updateCell(dataY, dataX, scope.choosenColor);
                                
                            }
                    
                        
                    }
                else {
                    firstClicked = null;
                }
                
                
              
                
           /*if(+x >= 0 && +y >= 0 && 
           (Math.abs(this.x - x ) > this.width / 2 || Math.abs(this.y - y ) >  this.height / 2))
            {   
                
                var target = angular.element($document[0].elementFromPoint(x, y));
                
                if(target.is('#chart td')) {
                    startPress = null;
                    var td = $document[0].elementFromPoint(x, y)
                    td.style.background = scope.choosenColor;
                    angular.element(td).attr('data-content', scope.choosenColor);
                    eService.updateCell(angular.element(td).attr('data-y'),
                    angular.element(td).attr('data-x'), scope.choosenColor);
                    this.x = x;
                    this.y = y;
                }
            }*/
                
            }
            
        });
        
        chart.on('touchend mouseup',function(event){
           event.stopPropagation();
           var e = event.originalEvent;
           
           if(firstClicked && (!e.touches || e.changedTouches.length === 1)) {
               event.preventDefault();
               if(!firstClicked.is("[data-content=\"" + scope.choosenColor + "\"]"))
                    {
                        firstClicked.css("background", scope.choosenColor);
                        firstClicked.attr("data-content", scope.choosenColor);
                        eService.updateCell(firstClicked.attr("data-y"),
                        firstClicked.attr("data-x"), scope.choosenColor);
                    }
               firstClicked = null;
           }
          /* if(startPress && firstClicked) {
               stopPress = new Date();
               
               if((stopPress - startPress) > 100){
                  
                  scope.edit(angular.element(firstClicked).attr('data-x'), angular.element(firstClicked).attr('data-y')); 
               } else {
               firstClicked.style.background = scope.choosenColor;
           }
           }
           startPress = null;
           startPress = null;
           firstClicked = null;*/
        });
       
        $document.bind('scroll touchmove', function() {
            
            
            var offset = angular.element(this).scrollTop();
            var left = angular.element(this).scrollLeft();
            
            if (offset > Math.abs(scope.tableOffsetTop - horizontalHeader.height())) {
                
                horizontalHeader.css('top', offset + horizontalHeader.height() - scope.tableOffsetTop + 'px');
                
                toolBox.css('top', (offset + horizontalHeader.height()) + 'px');
                if(toolBox.hasClass('ng-hide')){
                   toolBox.removeClass('ng-hide');
                }
            }
            else if (offset <= Math.abs(scope.tableOffsetTop - horizontalHeader.height())) {
               
                horizontalHeader.css('top', 0 + 'px');
                if(!toolBox.hasClass('ng-hide')){
                   toolBox.addClass('ng-hide');
                }
            }
            if(left >= scope.tableOffsetLeft){
                verticalHeader.css('left', left + 'px');
            }     
           }
       );
          
    }
  };
}])

.directive('toolbox',['$timeout', '$document',function($timeout,$document) {
   
  return {
    priority: 0,
    template: function(tElement, tAttrs)
    {    
         angular.element('#toolPanel div.btn-group').clone().appendTo(tElement);
    },
    link: function(scope, element, attrs) {
        element.on('click', function(){
           element.fadeTo(0,1);
        });
    }
  };
}])

.directive('actionbox',['appConfig','eService',function(appConfig, eService) {
   
  return {
    priority: 0,
    template: function(tElement, tAttrs)
    {   
        
        if(tAttrs.subject && tAttrs.position) {
        var id = tAttrs.subject.substring(0, 1) + tAttrs.position.substring(0, 1);
        
        return "<div class=\"col-xs-3\"><select class=\"form-control\"" + 
        "><option value=\"add\">Add</option>\n\
         <option value=\"delete\">Delete</option></select></div><label for=\"" + 
         id + "\" class=\"col-xs-6\">" +
        tAttrs.subject + "(s) at the " + tAttrs.position +"</label>" +
        "<div class=\"col-xs-3\">\n\
        <input type=\"number\" class=\"form-control\" id=\"" + id +"\" range=\"1\" min=\"0\">\n\
        </div>";
        }
        return "";
    },
    
    link: function(scope, element, attrs) {
        
        function _correctInput() {
            var can;
            var MAX = attrs.subject === "row" ? appConfig.MAX_Y : appConfig.MAX_X;
            var limit = attrs.subject === "row" ? eService.currentChart.limit.y : eService.currentChart.limit.x;
            var current = attrs.subject === "row" ? scope.currentY : scope.currentX;
            
            var value = +element.find("input").val();
            var action = element.find("select").val();
            
            
            var secEl = angular.element("[data-subject=\"" + attrs.subject + "\"][data-position!=\"" + attrs.position + "\"]");
            var actionSecEl = secEl.find("select").val();
            var valueSecEl = +secEl.find("input").val();
            
            if(action === "add")
                {   
                    if(actionSecEl === "add"){
                       can =  MAX - limit - valueSecEl;
                    }  else if (actionSecEl === "delete"){
                       can =  MAX - limit + valueSecEl; 
                    }
                }
            if(action === "delete")
                {   
                    if(attrs.position === "bottom" || attrs.position === "right"){
                        can = limit - current - 1;
                    } else if (attrs.position === "top" || attrs.position === "left")
                    {
                        can = current;
                    } 
                }
            if(value > can){
                        element.find("input").val(can);
                }
        }
        
        element.find("input").change(_correctInput);
        
        element.find("select").change(_correctInput);
    }
  };
}])

;

