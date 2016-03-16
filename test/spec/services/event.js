'use strict';

describe('eService', function () {
    function _changeColor(color){
    for(var i = 0; i < eService.currentChart.content.length; i++){
        for(var j = 0; j < eService.currentChart.content[i].length; j++){
            eService.updateCell(i, j, color);
        }
    }
   };
  // Load your module.
  var eService;
  
  beforeEach(module('knitMoAngularjsApp'));

  beforeEach(inject(function ($injector) {
    
    eService = $injector.get('eService');
   
  }));
  
  it('can create a new chart ', function() { 
    eService.createNew(5,5, '#FFFFFF');
    expect(eService.currentChart.content.length).toEqual(5);
    expect(eService.currentChart.content[1].length).toEqual(5);
    for(var i = 0; i < eService.currentChart.content.length; i++){
        for(var j = 0; j < eService.currentChart.content.length; j++){
            expect(eService.currentChart.content[i][j]).toEqual(null);
        }
    }
  });
  describe('eService', function () {
    beforeEach(function () {
    eService.createNew(5,5, '#FFFFFF');;
  });
  var color = '#000000';

  it('can change current chart ', function() { 
    
    
    _changeColor(color);
    
    for(var i = 0; i < eService.currentChart.content.length; i++){
        for(var j = 0; j < eService.currentChart.content[i].length; j++){
            expect(eService.currentChart.content[i][j]).toEqual(color);
        }
    }
    
  });
  describe('eService', function () {
    beforeEach(function () {
    _changeColor(color);
  });
  it('can change amount of rows ', function() { 
    var answer = [];
    var current = {y: 2,action: 'delete'};
    var before = {amount: 2,action: 'delete'};
    var after = {amount: 2,action: 'delete'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of rows ', function() { 
    var answer = [['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000']];
    var current = {y: 2,action: 'delete'};
    var before = {amount: 1,action: 'delete'};
    var after = {amount: 1,action: 'delete'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of rows ', function() { 
    var answer = [['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],];
    var current = {y: 2,action: 'delete'};
    var before = {amount: 0,action: 'delete'};
    var after = {amount: 0,action: 'delete'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of rows ', function() { 
    var answer = [['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000']];
    var current = {y: 2,action: null};
    var before = {amount: 0,action: 'add'};
    var after = {amount: 0,action: 'add'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of rows ', function() { 
    var answer = [['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                [null,null,null,null,null],
                ['#000000','#000000','#000000','#000000','#000000'],
                 [null,null,null,null,null],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000']];
    var current = {y: 2,action: null};
    var before = {amount: 1,action: 'add'};
    var after = {amount: 1,action: 'add'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of rows ', function() { 
    var answer = [['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000'],
                [null,null,null,null,null],
                [null,null,null,null,null],
                ['#000000','#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000','#000000']];
    var current = {y: 2,action: 'delete'};
    var before = {amount: 1,action: 'add'};
    var after = {amount: 1,action: 'add'};
    eService.changeAmountOfRows(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of columns ', function() { 
    var answer = [['#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000'],
                ['#000000','#000000','#000000','#000000']
               ];
    var current = {x: 2,action: 'delete'};
    var before = {amount: 0,action: 'add'};
    var after = {amount: 0,action: 'add'};
    eService.changeAmountOfColumns(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of columns ', function() { 
    var answer = [['#000000','#000000',null,null,'#000000','#000000'],
                    ['#000000','#000000',null,null,'#000000','#000000'],
                    ['#000000','#000000',null,null,'#000000','#000000'],
                    ['#000000','#000000',null,null,'#000000','#000000'],
                    ['#000000','#000000',null,null,'#000000','#000000']
               ];
    var current = {x: 2,action: 'delete'};
    var before = {amount: 1,action: 'add'};
    var after = {amount: 1,action: 'add'};
    eService.changeAmountOfColumns(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of columns ', function() { 
    var answer = [['#000000','#000000',null,'#000000'],
                    ['#000000','#000000',null,'#000000'],
                    ['#000000','#000000',null,'#000000'],
                    ['#000000','#000000',null,'#000000'],
                    ['#000000','#000000',null,'#000000']
               ];
    var current = {x: 2,action: 'delete'};
    var before = {amount: 1,action: 'add'};
    var after = {amount: 1,action: 'delete'};
    eService.changeAmountOfColumns(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of columns ', function() { 
    var answer = [['#000000','#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000','#000000']
               ];
    var current = {x: 2,action: null};
    var before = {amount: 1,action: 'delete'};
    var after = {amount: 1,action: 'add'};
    eService.changeAmountOfColumns(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  it('can change amount of columns ', function() { 
    var answer = [['#000000','#000000',null,'#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000',null,'#000000','#000000'],
                    ['#000000','#000000',null,'#000000',null,'#000000','#000000']
               ];
    var current = {x: 2,action: null};
    var before = {amount: 1,action: 'add'};
    var after = {amount: 1,action: 'add'};
    eService.changeAmountOfColumns(current, before, after);
    expect(eService.currentChart.content).toEqual(answer);
  });
  });
});
});

