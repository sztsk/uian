//event.animate.js

//FAnimateEvent slider/fade效果
function FAnimateEvent (selector,params) {

	if (typeof selector === 'undefined') return;

	if (!(selector.nodeType)) {
        if ($(selector).length === 0) return;
    };

    var _this = this;

    var defaults = {
    	speed: 300,
        type: 0,                    //type: 0-->slider  1-->fade
    	aniWrapper: 'wrapper',
    	aniElement: 'box',
    	aniNum: 'num',
        currClass: 'coll_curr',     //for fade
        underClass: 'coll_under',   //for fade
    	pnClass: 'spt',
    	prevClass: 'prev',
    	nextClass: 'next',
    	numCurr: 'curr',
    	numTotal: 'total'
    };

    params = params || {};
    for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
            for (var subProp in defaults[prop]) {
                if (! (subProp in params[prop])) {
                    params[prop][subProp] = defaults[prop][subProp];
                }
            }
        }
        else if (! (prop in params)) {
            params[prop] = defaults[prop];
        }
    };

    _this.params = params;

    _this.selector = selector = $(selector);

    var $wrapper = selector.find('.' + params.aniWrapper),
    	$box = $wrapper.children('.'+params.aniElement),
    	nBoxWidth = $box.width(),
    	nBoxLength = $box.length;

    var $num = selector.find('.' + params.aniNum),
    	$prev = selector.find('.' + params.prevClass),
    	$next = selector.find('.' + params.nextClass),
    	$numCurr = $num.find('[data-box="' + params.numCurr + '"]'),
    	$numTotal = $num.find('[data-box="' + params.numTotal + '"]');

    _this.setNumWrapper = function (num) {
    	$numTotal.text(nBoxLength);
    	$numCurr.text(num);
    };

    //设置wrapper高度，for fade
    _this.setWrapperSize = function (elem) {
        var el_height = Math.floor(elem.attr('col-height'));

        elem.height(el_height);
        selector.height(el_height);
        $wrapper.height(el_height);
    };

    var bIsAnimating = false,
    	nCurrNum;

    _this.fMoveWrapper = function (direction) {//direction: 1->to left,0->to right
        if (!!bIsAnimating) { return false };

        if (params.type === 0) {
            //slider动画
            var _nPos = Math.floor($wrapper.position().left);

            var _condition = false;

            _condition = (direction === 1) ? -nBoxWidth * (nBoxLength - 1) :  0;

            if (_nPos === _condition) { return false };

            bIsAnimating = !bIsAnimating;

            var _move = (direction === 1) ? _nPos - nBoxWidth :  _nPos + nBoxWidth;

            $wrapper.animate(
                { left: _move },
                params.speed,
                function () {
                    nCurrNum = (direction === 1) ? nCurrNum + 1 : nCurrNum - 1;
                    _this.setNumWrapper(nCurrNum);
                    bIsAnimating = !bIsAnimating;
                }
            );
        }else{
            //fade动画
            var _curr = $('.' + params.currClass),      //当前层
                _index = _curr.index(),
                _under;                                 //下一个将出现的层

            var _condition = false;

            _condition = (direction === 1) ? nBoxLength - 1 : 0;

            if (_index === _condition) { return false };

            bIsAnimating = !bIsAnimating;

            //下一层设置
            _under = (direction === 1) ? _curr.next() : _curr.prev();

            _under.addClass(params.underClass);
            _this.setWrapperSize(_under);

            //切换开始
            _curr.fadeOut(params.speed - 100, function () {
                nCurrNum = (direction === 1) ? nCurrNum + 1 : nCurrNum - 1;
                _this.setNumWrapper(nCurrNum);

                _curr.removeClass(params.currClass);
            });

            _under.fadeIn(params.speed + 100, function () {

                _under.removeClass(params.underClass)
                .addClass(params.currClass);

                _this.setUrlLocation(nCurrNum);

                bIsAnimating = !bIsAnimating;
            });

        }

    };

    //for fade - 切换视图之后更改url的hash值
    _this.setUrlLocation = function (num) {
        window.location.hash = '#!index=' + num;
    };

    //for fade
    _this.setToPage = function (num) {
        num = (num <= 0 || num > nBoxLength) ? 1 : num;

        nCurrNum = num;

        var _elem = $box.eq(num - 1);

        _elem.addClass(params.currClass);
        _this.setWrapperSize(_elem);
        _this.setNumWrapper(nCurrNum);
    };
    

    _this.initSlider = function () {
        nCurrNum = 1;
    	if(params.type === 0){
            //slider初始
            $wrapper.width(nBoxWidth * nBoxLength);
        }else{
            //fade初始
            $box.first().addClass(params.currClass);
            _this.setWrapperSize($('.' + params.currClass));
        };
        //初始页码计数
    	_this.setNumWrapper(nCurrNum);
    };

    //绑定前后按钮事件
    $num.delegate('a.' + params.pnClass,'click',function (e) {
        var _t = $(this),
            _type = _t.hasClass('prev') ? 0 : 1;

        _this.fMoveWrapper(_type);
    });

};

FAnimateEvent.prototype = {
	constructor : FAnimateEvent,
	init : function () {
		this.initSlider();
	}
};


