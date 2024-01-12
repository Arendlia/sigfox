$(function() {
    var nowDate = new Date();
    var startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0);
    var date = startDate
    $( "#day" ).on( "click", function() {
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-1, 0, 0, 0, 0);
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    $( "#week" ).on( "click", function() {
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-7, 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-7, 0, 0, 0, 0)
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    $( "#mounth" ).on( "click", function() {
      $('#daterange span').html(new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
      startDate = new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0, 0).toLocaleDateString() + ' - ' + nowDate.toLocaleDateString()
      $('#daterange').data('daterangepicker').setStartDate(date);
    } );
    function cb(start, nowDate) {
        $('#daterange span').html(start.toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
        $('#daterange-mobile span').html(start.toLocaleDateString() + ' - ' + nowDate.toLocaleDateString());
    }
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
        $('#daterange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
      console.log("A new date selection was made: " + start.format('DD/MM/YYYY') + ' to ' + end.format('DD/MM/YYYY'));
    });




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
  $('[data-range-key="Custom Range"]').text('Choisir sa durée');
  })