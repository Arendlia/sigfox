/**
 * Filters an array of data based on a date range.
 *
 * @param {Array} dataArray - The array of data to filter.
 * @param {Date|string} startDate - The start date of the date range.
 * @param {Date|string} endDate - The end date of the date range.
 * @returns {Array} The filtered array of data.
 */
function filterDataByDate(dataArray, startDate, endDate) {
	const startTimestamp = startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();
	const endTimestamp = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();

	const filteredData = dataArray.filter(item => {
		return item.date >= startTimestamp && item.date <= endTimestamp;
	});

	return filteredData;
}

// Call /sensor/#id/message road to get all datas from the sensor
axios({
		'method': 'GET',
		'url': '/sensor/'+$('#sensorId').data('id')+'/messages'
	}).then(function(result) {
		// Get data depending on wether it's a bee-keep or a b-swarm ssensor by group-id
		if ($('#sensorId').data('sensorGroup') == '643d74c4e0b8bb55977b2e59') {
			$('#humidityData').text(result.data[0].humidity);
			$('#temperatureData').text(result.data[0].temperature);
			$('#batteryData').text(result.data[0].battery);
		} else if ($('#sensorId').data('sensorGroup') == '6445409bc69c3c4137aea1c7') {
			$('#temperatureData').text(result.data[0].temperature);
		}
		setColors();
		datareversed = result.data.reverse();
		// remove loader after getting datas
		$('#temperatureloading').removeClass('d-flex');
		$('#temperatureloading').addClass('d-none');
		$('#temperaturechart').removeClass('d-none');
		temperatureseries = createChart('temperaturechart',	datareversed, 'temperature', '°C');
		$('#humidityloading').removeClass('d-flex');
		$('#humidityloading').addClass('d-none');
		$('#humiditychart').removeClass('d-none');
		humidityseries = createChart('humiditychart', datareversed, 'humidity', '%');
		// Change daterange of wanted values by clicking on date buttons
		$('.periodbutton').each(function() {
			$(this).on('click', function() {
				let date = new Date();
				filteredData = filterDataByDate(datareversed, date.setDate(date.getDate() - this.dataset.period), new Date());
				temperatureseries.data.setAll(filteredData);
				humidityseries.data.setAll(filteredData);
			})
		})

		// Change daterange of wanted values by change daterangepicker value
		$('#daterange').on('apply.daterangepicker', function(ev, picker) {
			filteredData = filterDataByDate(datareversed, picker.startDate.toDate().getTime(), picker.endDate.toDate().getTime());
			temperatureseries.data.setAll(filteredData);
			humidityseries.data.setAll(filteredData)
		})

		// Change daterange of wanted values by change daterangepicker value on mobile version
		$('#daterange-mobile').on('apply.daterangepicker', function(ev, picker) {
			filteredData = filterDataByDate(datareversed, picker.startDate.toDate().getTime(), picker.endDate.toDate().getTime());
			temperatureseries.data.setAll(filteredData);
			humidityseries.data.setAll(filteredData)
		})

	});