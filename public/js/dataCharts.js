function filterDataByDate(dataArray, startDate, endDate) {
	const startTimestamp = startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();
	const endTimestamp = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();

	const filteredData = dataArray.filter(item => {
		return item.date >= startTimestamp && item.date <= endTimestamp;
	});

	return filteredData;
}

axios({
		'method': 'GET',
		'url': '/sensor/'+$('#sensorId').data('id')+'/messages?device-type='+$('#sensorId').data('sensorGroup')
	}).then(function(result) {
		if ($('#sensorId').data('sensorGroup') == '643d74c4e0b8bb55977b2e59') {
			$('#humidityData').text(result.data[0].humidity);
			$('#temperatureData').text(result.data[0].temperature);
			$('#batteryData').text(result.data[0].battery);
		} else if ($('#sensorId').data('sensorGroup') == '6445409bc69c3c4137aea1c7') {
			$('#temperatureData').text(result.data[0].temperature);
		}
		setColors();
		datareversed = result.data.reverse();
		$('#temperatureloading').removeClass('d-flex');
		$('#temperatureloading').addClass('d-none');
		$('#temperaturechart').removeClass('d-none');
		temperatureseries = createChart('temperaturechart',	datareversed, 'temperature', '°C');
		$('#humidityloading').removeClass('d-flex');
		$('#humidityloading').addClass('d-none');
		$('#humiditychart').removeClass('d-none');
		humidityseries = createChart('humiditychart', datareversed, 'humidity', '%');
		$('.periodbutton').each(function() {
			$(this).on('click', function() {
				let date = new Date();
				filteredData = filterDataByDate(datareversed, date.setDate(date.getDate() - this.dataset.period), new Date());
				temperatureseries.data.setAll(filteredData);
				humidityseries.data.setAll(filteredData);
			})
		})

		$('#daterange').on('apply.daterangepicker', function(ev, picker) {
			filteredData = filterDataByDate(datareversed, picker.startDate.toDate().getTime(), picker.endDate.toDate().getTime());
			temperatureseries.data.setAll(filteredData);
			humidityseries.data.setAll(filteredData)
		})

		$('#daterange-mobile').on('apply.daterangepicker', function(ev, picker) {
			filteredData = filterDataByDate(datareversed, picker.startDate.toDate().getTime(), picker.endDate.toDate().getTime());
			temperatureseries.data.setAll(filteredData);
			humidityseries.data.setAll(filteredData)
		})

	});