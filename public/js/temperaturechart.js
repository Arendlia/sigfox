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
		datareversed = result.data.reverse();
		document.getElementById('temperatureloading').classList.remove('d-flex');
		document.getElementById('temperatureloading').classList.add('d-none');
		temperatureseries = createChart('temperaturechart',	datareversed, 'temperature', '°C');
		document.getElementById('humidityloading').classList.remove('d-flex');
		document.getElementById('humidityloading').classList.add('d-none');
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





		// am5.ready(function() {
		// 	let temperatureroot = am5.Root.new("temperaturechart");
		// 	temperatureroot.setThemes([
		// 		am5themes_Animated.new(temperatureroot)
		// 	]);
			
		// 	let temperaturechart = temperatureroot.container.children.push(am5xy.XYChart.new(temperatureroot, {
		// 		panX: true,
		// 		panY: true,
		// 		wheelX: "panX",
		// 		wheelY: "zoomX",
		// 		pinchZoomX: true,
		// 		paddingLeft: 0
		// 	}));
			
		// 	let temperaturecursor = temperaturechart.set("cursor", am5xy.XYCursor.new(temperatureroot, {
		// 		behavior: "none"
		// 	}));
		// 	temperaturecursor.lineY.set("visible", true);
			
		// 	let temperaturexAxis = temperaturechart.xAxes.push(am5xy.DateAxis.new(temperatureroot, {
		// 		maxDeviation: 0.5,
		// 		baseInterval: {
		// 			timeUnit: "minute",
		// 			count: 1
		// 		},
		// 		renderer: am5xy.AxisRendererX.new(temperatureroot, {
		// 			minGridDistance: 80,
		// 			minorGridEnabled: true,
		// 			pan: "zoom"
		// 		}),
		// 		tooltip: am5.Tooltip.new(temperatureroot, {})
		// 	}));
			
		// 	var temperatureyAxis = temperaturechart.yAxes.push(am5xy.ValueAxis.new(temperatureroot, {
		// 		maxDeviation: 1,
		// 		numberFormat: "#°C",
		// 		renderer: am5xy.AxisRendererY.new(temperatureroot, {	
		// 			pan: "zoom"
		// 		})
		// 	}));
			
		// 	var temperatureseries = temperaturechart.series.push(am5xy.SmoothedXLineSeries.new(temperatureroot, {
		// 		name: "Series",
		// 		xAxis: temperaturexAxis,
		// 		yAxis: temperatureyAxis,
		// 		stroke: '#53B3CB',
		// 		valueYField: "temperature",
		// 		valueXField: "date",
		// 		tooltip: am5.Tooltip.new(temperatureroot, {
		// 			labelText: "{valueY}"
		// 		})
		// 	}));
		// 	temperatureseries.set("fill", am5.color(0x53B3CB));
		// 	temperatureseries.fills.template.setAll({
		// 		visible: true,
		// 		fillOpacity: 0.2,
		// 		stroke: 'transparent'
		// 	});
		// 	temperatureseries.bullets.push(function () {
		// 		return am5.Bullet.new(temperatureroot, {
		// 			locationY: 0,
		// 			sprite: am5.Circle.new(temperatureroot, {
		// 			radius: 4,
		// 			stroke: temperatureroot.interfaceColors.get("background"),
		// 			strokeWidth: 2,
		// 			fill: temperatureseries.get("fill")
		// 		})
		// 	});
		// 	});
			
		// 	temperaturechart.set("scrollbarX", am5.Scrollbar.new(temperatureroot, {
		// 		orientation: "horizontal"
		// 	}));

		// 	document.querySelectorAll('.loading').forEach((loading) => {
		// 		loading.style.display = "none";
		// 	})
			
		// 	temperatureseries.data.setAll(result.data.reverse());
		// 	temperatureseries.appear(1000);
		// 	temperaturechart.appear(1000, 100);
		// });

		// am5.ready(function() {

		// var root = am5.Root.new("humiditychart");
        // root.setThemes([
        //     am5themes_Animated.new(root)
        // ]);
    
        // var chart = root.container.children.push(am5xy.XYChart.new(root, {
        //     panX: true,
        //     panY: true,
        //     wheelX: "panX",
        //     wheelY: "zoomX",
        //     pinchZoomX: true,
        //     paddingLeft: 0
        // }));
    
        // var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        //     behavior: "none"
        // }));
		// cursor.lineY.set("visible", true);
    
        // var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        //     maxDeviation: 0.5,
        //     baseInterval: {
        //         timeUnit: "minute",
        //         count: 1
        //     },
        //     renderer: am5xy.AxisRendererX.new(root, {
        //         minGridDistance: 80,
        //         minorGridEnabled: true,
        //         pan: "zoom"
        //     }),
        //     tooltip: am5.Tooltip.new(root, {})
        // }));
    
        // var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        //     maxDeviation: 1,
        //     numberFormat: "#'%'",
        //     renderer: am5xy.AxisRendererY.new(root, {
        //         pan: "zoom"
        //     })
        // }));
    
        // var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
        //     name: "Series",
        //     xAxis: xAxis,
        //     yAxis: yAxis,
        //     stroke: '#53B3CB',
        //     valueYField: "humidity",
        //     valueXField: "date",
        //     tooltip: am5.Tooltip.new(root, {
        //         labelText: "{valueY}"
        //     }),
    
        // }));
    
        // series.set("fill", am5.color(0x53B3CB));
    
        // series.fills.template.setAll({
        //     visible: true,
        //     fillOpacity: 0.2,
        //     stroke: 'transparent'
        // });
    
        // series.bullets.push(function () {
        //     return am5.Bullet.new(root, {
        //         locationY: 0,
        //         sprite: am5.Circle.new(root, {
        //         radius: 4,
        //         stroke: root.interfaceColors.get("background"),
        //         strokeWidth: 2,
        //         fill: series.get("fill")
        //     })
        // });
        // });
        // chart.set("scrollbarX", am5.Scrollbar.new(root, {
        //     orientation: "horizontal"
        // }));

        // document.querySelectorAll('.loading').forEach((loading) => {
        //     loading.style.display = "none";
        // })
		

        // series.data.setAll(result.data);
        // series.appear(1000);
        // chart.appear(1000, 100);

		
		// document.querySelectorAll('.periodbutton').forEach((periodButton) => {
		// 	periodButton.addEventListener('click', function() {
		// 		date = new Date();
		// 		temperatureseries.data.setAll(generateRandomData(date.setDate(date.getDate() - this.dataset.period), new Date()));
		// 	})
		// })

	});