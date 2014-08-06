//news.js
var setNewsInit = function () {
	var $newsList = $('#newsList'),
		$article = $newsList.find('article.intro');

	var $btn = '<a href="javascript:" class="down"><i class="spt"></i></a>';

	$article.each(function (i) {
		var _t = $(this),
			_h = _t.height();

		_t.attr('data-height',_h)

		if (_h > 114) {
			var _parent = _t.closest('div.txt_box');
			_t.css({
				'height': 114,
				'overflow': 'hidden'
			});
			_parent.append($btn);
		};
	});

	$newsList.delegate('a.down','click',function (e) {
		var _t = $(this),
			_parent = _t.closest('div.txt_box');

		_parent.css('height','auto')
			.parent().css('zIndex',1)
			.find('article.intro').css({
				'overflow': 'visible',
				'height': 'auto'
			}
		);

		_t.removeClass('down').addClass('top');

		return false;
	});

	$newsList.delegate('a.top','click',function (e) {
		var _t = $(this),
			_parent = _t.closest('div.txt_box');

		_parent.removeAttr('style')
			.parent().removeAttr('style')
			.find('article.intro').css({
				'height': 114,
				'overflow': 'hidden'
			}
		);

		_t.removeClass('top').addClass('down');
	});
};
