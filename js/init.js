//init.js
$(function ($) {
	$('body').jpreLoader();

	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	$('body').append(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fcebc87e2ed113fa202494473a5ccb9cf' type='text/javascript'%3E%3C/script%3E"))

	//footer totop
	$('#totop').on('click',function (e) {
		$('body,html').animate({scrollTop:0},500);
		return false;
	});

});

