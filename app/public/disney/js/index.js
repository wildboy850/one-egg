$(document).ready(function () {
    aoyoutoolbox.detectionInit_after();
    aoyoutoolbox._navAdd();

    firstloadData();
});

//初始化
function firstloadData(){
    alluseFunc('con04')
    alluseFunc('con05');
/*    getData('con04',7983);
    getData('con05',7984);*/

    //侧导航
    $(".sidenav").smartFloat(860);

    //锚点滑动
    $('a[href*=#],area[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                        scrollTop: targetOffset
                    },
                    1000);
                return false;
            }
        }
    });
}

//切换和初始化公用方法
function alluseFunc(destination){
    var $id = $("#" + destination);
    var $main = $(".main");
    if ( $.trim( $id.html() ) == '' ) {
        $id.html( "<p class=\"tips\">\u4ea7\u54c1\u7ef4\u62a4\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u007e" );
        $id.css( "text-algin" , "center" );
    }
    $("#" + destination + " .reserve-btn").html("立即预订");
}

// 获取产品
function getData(destination, titleID) {
    var $id = $("#" + destination);
    var $main = $(".main");

    $id.html("<img class=\"loading\" src=\"images/loading.gif\"/>");
    $.ajax({
        type: "Get",
        url: "http://activity.aoyou.com/promotion/index?titleID=" + titleID,
        dataType: "jsonp",
        jsonp: "callback",
        cache: false,
        async: true,
        success: function (json) {
            $id.html(json.product);
            alluseFunc(destination);
        }
    });
}

//tab切换
$('.smalltab li').click(function(){
    $('.smalltab li').removeClass('selected');
    $(this).addClass('selected');
    var thisidx = $(this).index()+1;
    var otheridx = thisidx>1?1:2;
    $('.con01 .day'+otheridx).hide();
    $('.con01 .day'+thisidx).show();
});

//右侧漂浮
$.fn.smartFloat = function ( sidenavtop ) {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > sidenavtop ) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: "0px",
                        _top: "0px"


                    });
                } else {
                    element.css({
                        top: scrolls
                    });
                }
            } else {
                element.css({
                    position: "absolute",
                    top: sidenavtop
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};
