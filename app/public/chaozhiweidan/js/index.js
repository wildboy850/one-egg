$(document).ready(function () {
    aoyoutoolbox.detectionInit_after();
    aoyoutoolbox._navAdd();
    firstloadData();
});

//初始化
function firstloadData(){
    getData("con01",8026,true);
    getData("con02",8041,true);
    getData("con03",8028,true);
    getData("con04",8029,true);
    getData("con05",8030,true);
    getData("con06",8031,true);
    getData("con07",8032,true);
    getData("con08",8033,true);
    getData("con09",8034,true);
    getData("con10",8035,true);

    $(".side-nav").smartFloat(870);

    $(".rulebtn").click(function () {
        $(".rulecon").toggle();
    });

    //侧导航滚动增加样式
    var wrapper01 = $("#wrapper01").offset().top;
    var wrapper02 = $("#wrapper02").offset().top;
    var wrapper03 = $("#wrapper03").offset().top;
    var wrapper04 = $("#wrapper04").offset().top;
    var wrapper05 = $("#wrapper05").offset().top;
    var wrapper06 = $("#wrapper06").offset().top;
    var wrapper07 = $("#wrapper07").offset().top;
    var wrapper08 = $("#wrapper08").offset().top;
    var wrapper09 = $("#wrapper09").offset().top;
    var wrapper10 = $("#wrapper10").offset().top;

    $(window).scroll(function () {
        var top = $(window).scrollTop();
        if (top >= wrapper01) {
            $(".side-nav li").eq(0).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper02) {
            $(".side-nav li").eq(1).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper03) {
            $(".side-nav li").eq(2).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper04) {
            $(".side-nav li").eq(3).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper05) {
            $(".side-nav li").eq(4).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper06) {
            $(".side-nav li").eq(5).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper07) {
            $(".side-nav li").eq(6).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper08) {
            $(".side-nav li").eq(7).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper09) {
            $(".side-nav li").eq(8).addClass("on").siblings().removeClass("on");
        }
        if (top >= wrapper10) {
            $(".side-nav li").eq(9).addClass("on").siblings().removeClass("on");
        }
    });

    $(".tab02 li").click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var titleId = $(this).attr("data-titleid");
        getData("con02", titleId);
    });

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
        $id.css( "text-align" , "center" );
    }
    $main.find(".con").each(function (i, j) {
        $(j).find(".itemfour").each(function (k, v) {
            if (k % 4 == 3) {
                $(v).css("margin-right", "0");
            }
        });
    });
    $("#" + destination + " .reserve-btn").html("立即预订");
    if( destination == "con01"){
        $("#con01 .itemfour:gt(11)").remove();
    }else{
        $("#" + destination +" .itemfour:gt(7)").remove();
    }
}

// 获取产品
function getData(destination, titleID, flag) {
    var $id = $("#" + destination);
    var $main = $(".main");

    if(flag){
        alluseFunc(destination);
    }else{
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
}


//右侧漂浮
$.fn.smartFloat = function ( sidenavtop ) {
    var position = function (element) {
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
