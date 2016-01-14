function drawChartAll() {
  var url = window.location.href.split('/')
  $.ajax({
    url: "../all/" + url[url.length - 2] + "/" +  url[url.length - 1],
    dataType: 'json'
  })
  .done(function (results) {
    var data = new google.visualization.DataTable()

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Temperature');
    data.addColumn('number', 'Humidity');
    data.addColumn('number', 'Illuminance');

    $.each(results, function (index, row) {
      data.addRow([
        (new Date(row.created_on)),
        parseFloat(row.temperature),
        parseFloat(row.humidity),
        parseFloat(row.illuminance)
      ]);
    });

    var options = {
      // title: 'Stuff',
      // curveType: 'function'
      colors: ['#DC3912', '#3366CC', '#FF9900'],
      legend: 'bottom'
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-all'))
    chart.draw(data, options);
  });
}

function drawChartTemp() {
  var url = window.location.href.split('/')
  $.ajax({
    url: "../temp/" + url[url.length - 2] + "/" +  url[url.length - 1],
    dataType: 'json'
  })
  .done(function (results) {
    var data = new google.visualization.DataTable()

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Temperature');

    $.each(results, function (index, row) {
      data.addRow([
        (new Date(row.created_on)),
        parseFloat(row.temperature)
      ]);
    });

    var options = {
      // title: 'Stuff',
      // curveType: 'function',
      colors: ['#DC3912'],
      legend: 'bottom',
      vAxis: { format: '#°C' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-tem'))
    chart.draw(data, options);
  });
}

function drawChartHum() {
  var url = window.location.href.split('/')
  $.ajax({
    url: "../hum/" + url[url.length - 2] + "/" +  url[url.length - 1],
    dataType: 'json'
  })
  .done(function (results) {
    var data = new google.visualization.DataTable()

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Humidity');

    $.each(results, function (index, row) {
      data.addRow([
        (new Date(row.created_on)),
        parseFloat(row.humidity)
      ]);
    });

    var options = {
      // title: 'Stuff',
      legend: 'bottom',
      colors: ['#3366CC'],
      vAxis: { format: '#\'%\'' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-hum'))
    chart.draw(data, options);
  });
}

function drawChartLum() {
  var url = window.location.href.split('/')
  $.ajax({
    url: "../lux/" + url[url.length - 2] + "/" +  url[url.length - 1],
    dataType: 'json'
  })
  .done(function (results) {
    var data = new google.visualization.DataTable()

    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Illuminance');

    $.each(results, function (index, row) {
      data.addRow([
        (new Date(row.created_on)),
        parseFloat(row.illuminance)
      ]);
    });

    var options = {
      // title: 'Stuff',
      legend: 'bottom',
      colors: ['#FF9900'],
      // curveType: 'function',
      vAxis: { format: '# lum' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-lux'))
    chart.draw(data, options);
  });
}

google.setOnLoadCallback(drawChartTemp);
google.setOnLoadCallback(drawChartLum);
google.setOnLoadCallback(drawChartHum);
google.setOnLoadCallback(drawChartAll);
