(function() {
  function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
  }
  function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
      elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
  }

  function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  }

  function showById(id) {
    document.getElementById(id).style.display = 'block';
  }
  function hideById(id) {
    document.getElementById(id).style.display = 'none';
  }

  var map = new BMap.Map('map');
  var point = new BMap.Point(116.404, 39.915);
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  var myCity = new BMap.LocalCity();
  myCity.get(function(result) {
    var cityName = result.name;
    map.setCenter(cityName);
  });

  // 设置左边面板高度
  function setLeftPanelHeight() {
    var height = window.innerHeight - 80;
    document.getElementById('left-panel').style.height = height + 'px';
    document.getElementById('card').style.maxHeight = height - 50 + 'px';
  }
  setLeftPanelHeight();
  window.addEventListener('resize', function() {
    setLeftPanelHeight();
  });

  var searchButton = document.getElementById('search-button');
  var soleSearchButton = document.getElementById('sole-searchbox-button');
  var routeSearchButton = document.getElementById('route-searchbox-button');
  var cateFilter = document.getElementById('cateFilter');
  var routeSearch = document.getElementById('route-searchbox-content');

  function openRouteSearchBox() {
    hideById('sole-searchbox-content');
    showById('route-searchbox-content');
  }

  function closeRouteSearchBox() {
    hideById('route-searchbox-content');
    showById('sole-searchbox-content');
  }

  function changeToolBar(index) {
    var toolItems = cateFilter.querySelectorAll('.tool-item');
    for (var i = 0; i < toolItems.length; i++) {
      var toolItem = toolItems[i];
      if (toolItem.dataset.index == index && !hasClass(toolItem, 'active')) {
        addClass(toolItem, 'active');
      } else {
        removeClass(toolItem, 'active');
      }
    }
  }

  soleSearchButton.addEventListener('click', function(event) {
    var target = event.currentTarget;
    if (hasClass(target, 'route-button')) {
      openRouteSearchBox();
    } else if (hasClass(target, 'cancel-button')) {
      hideById('cardlist');
      removeClass(soleSearchButton, 'cancel-button');
      addClass(soleSearchButton, 'route-button');
    }
  });

  searchButton.addEventListener('click', function(event) {
    showById('cardlist');
    removeClass(soleSearchButton, 'route-button');
    addClass(soleSearchButton, 'cancel-button');
  });
  routeSearchButton.addEventListener('click', function(event) {
    closeRouteSearchBox();
  });
  cateFilter.addEventListener('click', function(event) {
    var target = event.target;
    while (target !== cateFilter) {
      if (hasClass(target, 'tool-item')) {
        if (hasClass(target, 'active')) {
          hideById('select-pannel');
        } else {
          showById('select-pannel');
        }
        changeToolBar(target.dataset.index);
        break;
      }
      target = target.parentNode;
    }
  });
  routeSearch.addEventListener('click', function(event) {
    var target = event.target;
    while (target !== routeSearch) {
      if (hasClass(target, 'tab-item')) {
        var index = target.dataset.index;
        var currentIndex = routeSearch.dataset.current;
        if (index !== currentIndex) {
          removeClass(routeSearch, currentIndex);
          addClass(routeSearch, index);
          routeSearch.dataset.current = index;
        }
        break;
      }
      target = target.parentNode;
    }
  });
})();
