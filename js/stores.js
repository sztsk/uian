//stores.js

setMapInit = function () {
	var defaultProvince = '广东'; 	//默认选中省份
	var defaultZoom = 12;			//默认地图缩放大小
	var $PROVINCE = $('#province');
	$PROVINCE.change(function() {
		var _t = $(this),
			_txt = _t.siblings('span.txt');

		_txt.text(_t.val());

		ajaxGetData($PROVINCE.val());
	});

	// 百度地图API功能
	var map = new BMap.Map("map",{enableMapClick:false});            // 创建Map实例
	map.centerAndZoom(defaultProvince,defaultZoom);
	var myIcon = new BMap.Icon("images/marker_store.png", new BMap.Size(32,42));
	init();
	map.enableScrollWheelZoom();                            //启用滚轮放大缩小
	//map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件


	$("#mscroll").delegate("li","click", function(){
		var _t = $(this);
		_t.addClass("curr").siblings("li.curr").removeClass("curr");

		jumpSelectCenter(_t.attr("point")); 
	}); 

	function init(){
		initMapAllMarker();
		ajaxGetData(defaultProvince);
	};

	// 编写自定义函数,创建标注
	function addMarker(point,city){
		var arr = point.split(',');
		if(arr.length != 2)
		{
			return;
		};
		
		var point = new BMap.Point(parseFloat(arr[0]), parseFloat(arr[1]));
	  	var marker = new BMap.Marker(point,{icon:myIcon});

		//marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 跳动的动画
		
	  	map.addOverlay(marker);
	};

	function jumpSelectCenter(point){
		var arr = point.split(',');
		if(arr.length != 2)
		{
			return;
		};
		
		var point = new BMap.Point(parseFloat(arr[0]), parseFloat(arr[1]));
		map.setZoom(15);
		map.panTo(point);

	};

	//初始化所有城市坐标
	function initMapAllMarker(){
		$.get('data/store-locator.xml', function(data) {
			
			var html = '',itemHtml = '';
			var setCurrProvince = name;

			$(data).find("city").each(function() {
				var $city = $(this);
				var txtPoint = $city.attr('point');
				var txtCity = $city.attr('value');
				addMarker(txtPoint,txtCity);
			});
			$(data).find('province').each(function() {
				var txtProvince = $(this).attr('value');
				html += "<option value='" + txtProvince + "'>" + txtProvince + "</option>";
			});
			$PROVINCE.append(html);
			setTimeout(function(){
				//定时可以兼容IE6
				$PROVINCE.val(defaultProvince);
			},0);
		});
	}

	function ajaxGetData(name){
		$.get('data/store-locator.xml', function(data) {
			var html = '',itemHtml = '';
			
			var option = "province[value='" + name + "'] > city";
			var setCurrProvince = name;
			var setZoom = 8;

			$(data).find(option).each(function() {
				var $city = $(this);
				var txtPoint = $city.attr('point');
				var txtCity = $city.attr('value');
				
				itemHtml += '<li point="'+ txtPoint + '">\
							<span>'+ txtCity +'</span>\
							</li>';
			});
				
			var mscrollHtml = '<ul>' + itemHtml + '</ul>';
			$('#mscroll').html(mscrollHtml);
			map.centerAndZoom(setCurrProvince,setZoom);
		});
	};
};


		
