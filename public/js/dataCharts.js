function filterDataByDate(dataArray, startDate, endDate) {
	const startTimestamp = startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();
	const endTimestamp = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();
	const filteredData = dataArray.filter(item => {
		return item.date >= startTimestamp && item.date <= endTimestamp;
	});
	return filteredData;
}

function setLastPositions(data) {
	let html = '<li class="list-group-item bold">Dernières Positions</li>';
	let htmlMobile = '';
	data.forEach(position => {
		if (position.latitude && position.longitude) {
			html += `<li data-lat="${position.latitude}" data-lng="${position.longitude}" class="sensor-position-item list-group-item d-flex flex-column">
			<span>${moment(position.date).format('DD/MM/YYYY - HH:MM')}</span>
			<span class="text-text text-small">${position.latitude}, ${position.longitude}</span>
			</li>`
			htmlMobile += `<tr class="sensor-position-item" data-lat="${position.latitude}" data-lng="${position.longitude}">
			<th scope="row">${moment(position.date).format('DD/MM/YYYY - HH:MM')}</th>
			<td>${position.latitude}</td>
			<td>${position.longitude}</td>
			</tr>`
		}
	});
	$('#collapse .list-group').html(html);
	$('#collapse-mobile tbody').html(htmlMobile);
}

$(function() {
	axios({
		'method': 'GET',
		'url': '/sensor/'+$('#sensorId').data('id')+'/messages?device-type='+$('#sensorId').data('sensorGroup')
	}).then(function(result) {
		if (result.data.length != 0) {
			data = result.data.slice();
			datareversed = result.data.reverse();
			setLastPositions(data);
			if ($('#sensorId').data('sensorGroup') == '643d74c4e0b8bb55977b2e59') {
				$('#batteryData').text(data[0].battery);
				$('#humidityData').text(data[0].humidity);
				$('#humidityloading').removeClass('d-flex');
				$('#humidityloading').addClass('d-none');
				$('#humiditychart').removeClass('d-none');
				humidityseries = createChart('humiditychart', datareversed, 'humidity', '%');
			} else if ($('#sensorId').data('sensorGroup') == '6445409bc69c3c4137aea1c7') {
				$('#latitudeData').text(data[0].latitude);
				$('#longitudeData').text(data[0].longitude);
				$('#map').removeClass('d-none');
				$('#mapLoader').addClass('d-none');
				setMap(data);
			}
			$('#temperatureData').text(data[0].temperature);
			$('#temperatureloading').removeClass('d-flex');
			$('#temperatureloading').addClass('d-none');
			$('#temperaturechart').removeClass('d-none');
			temperatureseries = createChart('temperaturechart',	datareversed, 'temperature', '°C');
			setColors();
			
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
	
			$('#collapse').on('click', '.sensor-position-item', function() {
				setMarker($(this).data('lat'), $(this).data('lng'))
			})
			$('#collapse-mobile').on('click', '.sensor-position-item', function() {
				setMarker($(this).data('lat'), $(this).data('lng'))
			})
		}
	});
})
