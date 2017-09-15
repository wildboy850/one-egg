$(document).ready(function () {
    aoyoutoolbox.detectionInit_after();
    aoyoutoolbox._navAdd();

    firstloadData();
    //侧导航
    $(".sidenav").smartFloat(590);

    $(".city-tab li").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var tieleid = $(this).attr("data-titleid");
        getData("con02",tieleid);
        switch ($(this).index()) {
            case 0:
                $('.city-con').hide();
                $('.city-con01').show();
                break;
            case 1:
                $('.city-con').hide();
                $('.city-con02').show();
                break;
            case 2:
                $('.city-con').hide();
                $('.city-con03').show();
                break;
            case 3:
                $('.city-con').hide();
                $('.city-con04').show();
                break;
            case 4:
                $('.city-con').hide();
                $('.city-con05').show();
                break;
            case 5:
                $('.city-con').hide();
                $('.city-con06').show();
                break;
            case 6:
                $('.city-con').hide();
                $('.city-con07').show();
                break;
            case 7:
                $('.city-con').hide();
                $('.city-con08').show();
                break;
            case 8:
                $('.city-con').hide();
                $('.city-con09').show();
                break;
            case 9:
                $('.city-con').hide();
                $('.city-con10').show();
                break;
            case 10:
                $('.city-con').hide();
                $('.city-con11').show();
                break;
            case 11:
                $('.city-con').hide();
                $('.city-con12').show();
                break;
            case 12:
                $('.city-con').hide();
                $('.city-con13').show();
                break;
            case 13:
                $('.city-con').hide();
                $('.city-con14').show();
                break;
            default:
                break;
        }
    }); 

    timer = window.setInterval(function () {
        $(".icon").animate({"top":"-15px"},200).animate({"top":"-0px"},200)
            .animate({"top":"-12px"},200).animate({"top":"-0px"},200)
            .animate({"top":"-6px"},200).animate({"top":"-1px"},200)
            .animate({"top":"-1px"},200).animate({"top":"-0px"},200);
    },1000);

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
	
});

//切换和初始化公用方法
function alluseFunc(destination){
    var $id = $("#" + destination);
    var $main = $(".main");
    if ( $.trim( $id.html() ) == '' ) {
        $id.html( "<p class=\"tips\">\u4ea7\u54c1\u7ef4\u62a4\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u007e" );
        $id.css( "text-algin" , "center" );
    }
    $main.find(".con").each(function (i, j) {
        $(j).find(".itemthree").each(function (k, v) {
            if (k % 3 == 2) {
                $(v).css("margin-right", "0");
            }
        });
    });
    $("#" + destination + " .reserve-btn").html("立即抢购");
    $("#" + destination +" .itemfour:gt(7)").remove();
}

//初始化
function firstloadData(){
    alluseFunc('con01');
    alluseFunc('con02');
    alluseFunc('con03');
}

// 获取产品
function getData(destination, titleID) {
    var $id = $("#" + destination);
    var $main = $(".main");
    $id.html("<img class=\"loading\" src=\"/public/ydyl(201703)/images/loading.gif\"/>");
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
