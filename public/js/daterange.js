/**
 * This function initializes the date range picker on the page.
 */
$(function() {
  /**
     * The current date and time.
     * @type {Date}
     */
  var nowDate = new Date();

  /**
   * The start date of the date range.
   * @type {Date}
   */
    var nowDate = new Date();
     /**
     * The current date of the date range.
     * @type {Date}
     */
     var date = startDate

     /**
      * Event handler for the day button.
      */
    var startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0);
    var date = startDate
    $( "#day" ).on( "click", function() {
      // Update the date range text.
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      // Update the start date.
      date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0);
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    /**
     * Event handler for the week button.
     */
    $( "#week" ).on( "click", function() {
      // Update the date range text.
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-7, 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      // Update the start date.
      date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-7, 0, 0, 0, 0)
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    /**
     * Event handler for the month button.
     */
    $( "#mounth" ).on( "click", function() {
      // Update the date range text.
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      // Update the date range text.
      startDate = new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString()
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    /**
     * Callback function for the date range picker.
     * @param {Date} start The start date of the selection.
     * @param {Date} end The end date of the selection.
     */
    function cb(start, nowDate) {
        // Update the date range text.
        $('#daterange span').html(start.toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
        $('#daterange-mobile span').html(start.toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
    }
    // Initialize the date range picker with the current date range.
    cb(startDate, nowDate)
    $('#daterange').daterangepicker({
      opens: 'left',
      minDate: new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0),
      maxDate: new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0),
      startDate: startDate,
      locale: {
        format: 'DD/MM/YYYY'
      }
    }, function(start, end, label) {
        // Update the date range text.
        $('#daterange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
      console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
    });



    // Initialize the mobile date range picker with the current date range.
    $('#daterange-mobile').daterangepicker({
      startDate: startDate,
      opens: 'left',
      minDate: new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0),
      maxDate: new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0),
      locale: {
        format: 'DD/MM/YYYY'
      },
      ranges: {
         '1 jour': [moment(), moment()],
         '1 semaine': [moment().subtract(7, 'days'), moment()],
         '1 mois': [moment().subtract(1, 'mounth'), moment()],
      }
  }, cbMobile);
  function cbMobile(start, end) {
    $('#daterange-mobile span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
  }
  // Update the text of the custom range button.
  $('[data-range-key="Custom Range"]').text('Choisir sa durée');
  })