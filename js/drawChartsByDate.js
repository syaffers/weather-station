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

google.setOnLoadCallback(drawChartAll);
