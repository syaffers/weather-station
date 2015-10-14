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
      curveType: 'function'
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
      curveType: 'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-hum'))
    chart.draw(data, options);
  });
}

function drawChartLum() {
  $.ajax({
    url: "hum.json",
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
      curveType: 'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('draw-lux'))
    chart.draw(data, options);
  });
}

google.setOnLoadCallback(drawChartTemp);
google.setOnLoadCallback(drawChartTemp);
google.setOnLoadCallback(drawChartHum);
google.setOnLoadCallback(drawChartAll);
