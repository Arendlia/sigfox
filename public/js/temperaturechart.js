function filterDataByDate(dataArray, startDate, endDate) {
	// Convert startDate and endDate to timestamps if they are not already
	const startTimestamp = startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();
	const endTimestamp = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();

	// Filter the array based on the date range
	const filteredData = dataArray.filter(item => {
		return item.date >= startTimestamp && item.date <= endTimestamp;
	});

	return filteredData;
}


axios({
		'method': 'GET',
		'url': '/sensor/'+document.querySelector('#sensorId').dataset.id+'/messages'
	}).then(function(result) {
		$('#humidityData').text(result.data[0].humidity);
		$('#temperatureData').text(result.data[0].temperature);
		$('#batteryData').text(result.data[0].battery);
		setColors();
		datareversed = result.data.reverse();
		document.getElementById('temperatureloading').classList.remove('d-flex');
		document.getElementById('temperatureloading').classList.add('d-none');
		document.getElementById('temperaturechart').classList.remove('d-none');
		temperatureseries = createChart('temperaturechart',	datareversed, 'temperature', '°C');
		document.getElementById('humidityloading').classList.remove('d-flex');
		document.getElementById('humidityloading').classList.add('d-none');
		document.getElementById('humiditychart').classList.remove('d-none');
		humidityseries = createChart('humiditychart', datareversed, 'humidity', '%');

		document.querySelectorAll('.periodbutton').forEach((periodButton) => {
			periodButton.addEventListener('click', function() {
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

	});