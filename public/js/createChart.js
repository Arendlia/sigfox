/**
 * Creates a new am5 xy chart with the given div element and data.
 * @param {HTMLElement} div - The div element to render the chart in.
 * @param {object[]} data - The data for the chart.
 * @param {string} value - The field name of the y-value.
 * @param {string} unit - The unit of the y-value.
 * @returns {am5xy.SmoothedXLineSeries} The created series.
 */
function createChart(div, data, value, unit) {
    var root = am5.Root.new(div);
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
    }));

    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
    }));
    cursor.lineY.set("visible", true);

    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: {
            timeUnit: "minute",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 80,
            minorGridEnabled: true,
            pan: "zoom"
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        numberFormat: "#'"+unit+"'",
        renderer: am5xy.AxisRendererY.new(root, {
            pan: "zoom"
        })
    }));

    var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        stroke: '#53B3CB',
        valueYField: value,
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
        }),

    }));

    series.set("fill", am5.color(0x53B3CB));

    series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
        stroke: 'transparent'
    });

    series.bullets.push(function () {
        return am5.Bullet.new(root, {
            locationY: 0,
            sprite: am5.Circle.new(root, {
            radius: 4,
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2,
            fill: series.get("fill")
        })
    });
    });
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    series.data.setAll(data);
    series.appear(1000);
    chart.appear(1000, 100);

    return series;
}
