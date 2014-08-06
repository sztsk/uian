//collections.js
$(function ($) {
	var fFade = new FAnimateEvent('#collList',{
		speed: 800,
		type: 1,
		aniWrapper: 'coll_box',
    	aniElement: 'coll',
    	aniNum: 'num_box'
	});

	var getUrlLocation = function () {
		var sUrlHash = window.location.hash + '',
			_index = Math.floor(sUrlHash.split('#!index=')[1]);

		 return _index;
	};

	//如果url有带'?index='参数
	if (!!getUrlLocation()) {
		fFade.setToPage(getUrlLocation());
	}else{
		fFade.init();
	};

	var $gotoColl = $('#gotoColl');

	if ($gotoColl.length) {
		$gotoColl.on('click',function (e) {
			$('body,html').animate({scrollTop:0},500,function () {
				window.location.hash = '#!index=' + 3;
			window.location.reload();
			});
			
			return false;
		});
	};


});

