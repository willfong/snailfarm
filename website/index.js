$.get('data/light.txt', function(stats) {
  var dataarray = [];
  var lastTs = '';
  var lines = stats.split('\n');
  for(var i = 0;i < lines.length;i++){
    if (lines[i]) {
      var v = lines[i].split(',');
      dataarray.push(v[1]);
      lastTs = v[0];
    }
  }
  console.log(lastTs);
  var imgsrc = "data/tank-"+lastTs.replace(/(\s|:)/g, '-')+".jpg";
  console.log(imgsrc);
  $( "#tankimg" ).append( "<img src='"+imgsrc+"' />" );

  console.log(dataarray);
  var data = {
    // A labels array that can contain any sort of values
    //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      dataarray
    ]
  };
  var options = {
    showLabels: false,
    showPoint: false
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

$.get('data/temp.txt', function(stats) {
  var airarray = [];
  var waterarray = [];
  var lines = stats.split('\n');
  for(var i = 0;i < lines.length;i++){
    if (lines[i]) {
      var v = lines[i].split(',');
      airarray.push(v[1]);
      waterarray.push(v[2]);
    }
  }
  console.log(airarray);
  console.log(waterarray);

  var data = {
    // A labels array that can contain any sort of values
    //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      airarray,
      waterarray
    ]
  };
  var options = {
    showLabels: false,
    showPoint: false
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
