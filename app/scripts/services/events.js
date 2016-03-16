'use strict';

/**
 * @ngdoc function
 * @name knitMoAngularjsApp.service:eService
 * @description
 * # eService
 * Service of the knitMoAngularjsApp
 */
angular.module('knitMoAngularjsApp')
  .factory('eService', 
      ['$rootScope','$timeout',
        function ($rootScope,$timeout) {
        var eS = {};
        function _createColumns (rows, columns){
            
            var result = [];
            for(var i = 0; i < rows; i++){
               
                result.push(_createRow(columns));
            };
            return result;
        };
        function _createRow(items){
                var row = [];
                for(var j = 0; j < items; j++){
                    row[j] = null;
                }
                return row;
            
        }
        
        eS.currentChart = {};
        
        eS.convertColor = function(color){
            var red = (255 - parseInt(color.substring(1, 3), 16)).toString(16);
            
            if(red.length === 1)
            {
                red = '0' + red;
            }
            var green = (255 - parseInt(color.substring(3, 5), 16)).toString(16);
            
            if(green.length === 1)
            {
                green = '0' + green;
            }
            var blue = (255 - parseInt(color.substring(5, 7), 16)).toString(16);
            
            if(blue.length === 1)
            {
                blue = '0' + blue;
            }
            return "#" +  red + green + blue;
            };
        eS.createNew = function(xLimit, yLimit, defaultColor){
                    
                    
                    eS.currentChart = {
                        limit : {x: xLimit, y: yLimit},
                        content: _createColumns(yLimit, xLimit),
                        defaultColor: defaultColor
                        
                    };
                    
                    return eS.currentChart;
        };
        
        eS.updateCell = function(y, x, data){
           eS.currentChart.content[y][x] = data;
        };
        
        eS.updateDefaultColor = function(color){
           eS.currentChart.defaultColor = color;
        };
        
       
        
        
        eS.changeAmountOfRows = function(current, before, after){
            var array = [];
           
            if (current.action === 'delete' && before.action === 'delete' && after.action === 'delete' &&
                    (Number(before.amount) + Number(after.amount) + 1) === Number(eS.currentChart.content.length))
                {
                    eS.currentChart.content = array;
                }
            else {
                if(before.action === 'delete')
                    {
                       array = array.concat(eS.currentChart.content.slice(0, current.y - before.amount));
                    }
                else if (before.action === 'add') 
                    {
                        array = array.concat(eS.currentChart.content.slice(0, current.y), _createColumns(before.amount, eS.currentChart.limit.x));
                    }
                if(current.action !== 'delete')
                    {
                        array = array.concat(eS.currentChart.content.slice(current.y, Number(current.y) + 1));
                        
                    } 
                if(after.action === 'delete')
                    {
                       array = array.concat(eS.currentChart.content.slice(Number(current.y) + Number(after.amount) + 1, eS.currentChart.content.length));
                    }
                else if (after.action === 'add') 
                    {
                        array = array.concat(_createColumns(after.amount, eS.currentChart.limit.x), eS.currentChart.content.slice(Number(current.y) + 1, eS.currentChart.content.length));
                    }
            }
                eS.currentChart.content = array;
                eS.currentChart.limit.y = eS.currentChart.content.length;
                
            
           
        };
        eS.changeAmountOfColumns = function(current, before, after){
           
            for (var i = 0; i < eS.currentChart.content.length; i++){
                 var array = [];
            if (current.action === 'delete' && before.action === 'delete' && after.action === 'delete' &&
                    (Number(before.amount) + Number(after.amount) + 1) === Number(eS.currentChart.content[i].length))
                {
                    eS.currentChart.content[i] = array;
                }
            else {
                if(before.action === 'delete')
                    {
                       array = array.concat(eS.currentChart.content[i].slice(0, Number(current.x) - before.amount));
                       
                    }
                else if (before.action === 'add') 
                    {
                        array = array.concat(eS.currentChart.content[i].slice(0, current.x), _createRow(before.amount));
                       
                    }
                if(current.action !== 'delete')
                    {
                        array = array.concat(eS.currentChart.content[i].slice(current.x, Number(current.x) + 1));
                    }
                if(after.action === 'delete')
                    {
                       array = array.concat(eS.currentChart.content[i].slice(Number(current.x) + Number(after.amount) + 1, eS.currentChart.content[i].length));
                    }
                else if (after.action === 'add') 
                    {
                        array = array.concat(_createRow(after.amount), eS.currentChart.content[i].slice(Number(current.x) + 1, eS.currentChart.content[i].length));
                    }
            }
                eS.currentChart.content[i] = array;
            }
            eS.currentChart.limit.x = eS.currentChart.content[0].length;
           
        };
       
        return eS;
        }  
]);