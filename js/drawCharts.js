function drawChartAll() {
  $.ajax({
    url: "all.json",
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
  $.ajax({
    url: "temp.json",
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
  $.ajax({
    url: "hum.json",
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
      curveType: 'function',
      vAxis: { format: '#\'%\'' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-hum'))
    chart.draw(data, options);
  });
}

function drawChartLum() {
  $.ajax({
    url: "lux.json",
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
      curveType: 'function',
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
