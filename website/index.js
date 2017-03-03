$(document).ready(function(){
  $('.drawChart').click(drawCharts);
  drawCharts();

});

function drawCharts(e) {
  var number;
  if (e) {
    number = e.target.value;
  } else {
    number = 288;
  }

  $.getJSON('https://serioustime.io/api/SQtbKABnsD9r2Lu6F/'+number, function(data) {
    var dataarray = [];
    for(var i = 0;i < data.length;i++){
      if (data[i]) {
        dataarray.push(data[i].value);
      }
    }

    var data = {
      series: [
        dataarray
      ]
    };
    var options = {
      showLabels: false,
      showPoint: false,
      showGrid: false,
      high: 60000,
      low: 30000,
      scaleMinSpace: 2000

    };

    var chart = new Chartist.Line('#light', data, options);
    chart.on('draw', function(context) {
      if(context.type === 'line') {
        context.element.attr({
          style: 'stroke: #F7DC6F'
        });
      }
    });
  });

  $.getJSON('https://serioustime.io/api/67zYukQYFngjb3QTk/'+number, function(water) {
    $.getJSON('https://serioustime.io/api/CwmLesuG3XdHAQMep/'+number, function(air) {
    var airarray = [];
    var waterarray = [];
    for(var i = 0;i < water.length;i++){
      if (water[i]) {
        waterarray.push(water[i].value);
      }
      if (air[i]) {
        airarray.push(air[i].value);
      }
    }

    var data = {
      series: [
        airarray,
        waterarray
      ]
    };
    var options = {
      showLabels: false,
      showPoint: false,
      showGrid: false,
      onlyInteger: true,
    };

    var chart = new Chartist.Line('#temp', data, options);
    chart.on('draw', function(context) {
      if(context.type === 'line' && context.index === 0) {
        context.element.attr({
          style: 'stroke: #AED6F1'
        });
      }
      if(context.type === 'line' && context.index === 1) {
        context.element.attr({
          style: 'stroke: #2471A3'
        });
      }
    });
  });
});

}
