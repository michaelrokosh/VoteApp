Meteor.startup(function () {
  HIGHCHARTS_COLORS = [
    '#FF5722', 
    '#43A047', 
    '#EC407A', 
    '#9C27B0', 
    '#673AB7', 
    '#F44336', 
    '#3F51B5', 
    '#2196F3', 
    '#009688', 
    '#795548', 
    '#607D8B',
    '#E040FB',
    '#2196F3',
    '#EF6C00',
    '#6D4C41',
    '#757575'
  ];
  Highcharts.setOptions({
    colors: HIGHCHARTS_COLORS,
    chart: {
      style: {
        fontFamily: 'sans-serif'
      }
    }
  });
});