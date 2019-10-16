(function() {
  var map = new BMap.Map('map');
  var point = new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  var myCity = new BMap.LocalCity();
  myCity.get(function(result) {
    var cityName = result.name;
    map.setCenter(cityName);
  });
})();
