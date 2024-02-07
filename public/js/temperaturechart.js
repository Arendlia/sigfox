/**
 * Filters an array of data based on a date range.
 *
 * @param {Array} dataArray - The array of data to filter.
 * @param {Date|string} startDate - The start date of the date range.
 * @param {Date|string} endDate - The end date of the date range.
 * @returns {Array} The filtered array of data.
 */
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

/**
 * Makes an HTTP GET request to retrieve data from a sensor.
 */
axios({
  method: 'GET',
  url: '/sensor/' + document.querySelector('#sensorId').dataset.id + '/messages'
})
  .then(function (result) {
    // Extract the data from the response
    const data = result.data;

    // Reverse the order of the data
    const dataReversed = data.reverse();

    // Remove the loading indicators
    document.getElementById('temperatureLoading').classList.remove('d-flex');
    document.getElementById('temperatureLoading').classList.add('d-none');
    document.getElementById('humidityLoading').classList.remove('d-flex');
    document.getElementById('humidityLoading').classList.add('d-none');

    // Create the charts
    const temperatureSeries = createChart('temperatureChart', dataReversed, 'temperature', '°C');
    const humiditySeries = createChart('humidityChart', dataReversed, 'humidity', '%');

    // Add event listeners to the period buttons
    document.querySelectorAll('.periodButton').forEach((periodButton) => {
      periodButton.addEventListener('click', function () {
        // Get the current date
        const date = new Date();

        // Calculate the start and end dates for the filtered data
        const filteredStartDate = date.setDate(date.getDate() - this.dataset.period);
        const filteredEndDate = new Date();

        // Filter the data
        const filteredData = filterDataByDate(dataReversed, filteredStartDate, filteredEndDate);

        // Update the charts with the filtered data
        temperatureSeries.data.setAll(filteredData);
        humiditySeries.data.setAll(filteredData);
      });
    });

    // Initialize the date range picker
    $('#daterange').daterangepicker({
      autoUpdateInput: false
    });

    // Update the filtered data when the date range is applied
    $('#daterange').on('apply.daterangepicker', function (ev, picker) {
      const filteredData = filterDataByDate(dataReversed, picker.startDate.toDate().getTime(), picker.endDate.toDate().getTime());
      temperatureSeries.data.setAll(filteredData);
      humiditySeries.data.setAll(filteredData);
    });
  });