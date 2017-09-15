$(document).ready(function () {
    aoyoutoolbox.detectionInit_after();
    aoyoutoolbox._navAdd();

    firstloadData();

    //侧导航
    $(".sidenav").smartFloat(600);

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

function makekppager(pid,pno,totalsize,tatalnum,hrefstr,hreflatter){
    //元素id 当前页码 总共页数 总共条数 链接str 链接结束str
    kkpager.init({
        //divID
        pagerid: pid,
        //当前页码
        pno: pno,
        //总页码
        total: totalsize,
        //总数据条数
        totalRecords: tatalnum,
        //链接前部
        hrefFormer: hrefstr,
        hrefLatter: hreflatter
    });
    kkpager.generPageHtml();    
}

//切换和初始化公用方法
function alluseFunc(id){
    var _num = id.substr(id.length-1,id.length)
    $(".main").find(".con").each(function (i, j) {
        var _pt = $.cookie('pagetotal'+_num)
        var _psize = $.cookie('pagesize'+_num)
        if(_pt){
            makekppager(id + "pages",
                        p,
                        parseInt(_psize),
                        parseInt(_pt),
                        "javascript:getDataPro(\'" + id + "\'," + b + ", '" + l + "' ," + ps,
                        ",'" + other + "');"
                       );               
        }else{
            if ($("#" + id).next().hasClass("page")){
                    $("#" + id).next().remove();
            }
        }

        $(j).find(".itemfour").each(function (k, v) {
            if (k % 4 == 3) {
                $(v).css("margin-right", "0");
            }
        });
    });
}

//初始化
function firstloadData(){
    alluseFunc("con01");
    alluseFunc("con02");
}

//b:出发城市，l:目的地标签 ,p:当前页，ps:每页条数,other:pr优惠标签,k搜索字eg:pr317,kclubmed f1为国内 f2为出境
function getDataPro(id, b, l, ps, p, other) {       
        $("#" + id).html("<img class=\"loading\" src=\"/public/gdyh/images/loading.gif\"/>");
        $.ajax({
            type: "Get",
            url: "http://activity.aoyou.com/Promotion/SearchProduct?param=b" + b + "-" + l + "-ps" + ps + "-p" + p + "-" + other + "-s2-sb0",
            dataType: "jsonp",
            jsonp: "callback",
            cache: false,
            async: true,
            success: function (DataPro) {
                if (DataPro == undefined) {
                    $("#" + id).html("<p class=\"tips\">&#36968;&#28216;&#21531;&#27491;&#22312;&#19978;&#20135;&#21697;&#65292;&#32;&#20146;&#65292;&#32;&#35831;&#32784;&#24515;&#31561;&#24453;&#21734;&#126;&#126;&#126;</p>");
                    if ($("#" + id).next().hasClass("page")){
                        $("#" + id).next().remove();
                    }
                }
                else {
                    var pageSize = Math.ceil(DataPro.TotalCount / ps);
                    if (pageSize > 0) {
                        if ($("#" + id).next().hasClass("page")) {
                            $("#" + id).empty();
                            $("#" + id).html("<img class=\"loading\" src=\"/public/gdyh/images/loading.gif\"/>");
                            $("#" + id).empty();
                            $.each(DataPro.ProductList, function (i, obj) {
                                $("#" + id).append('<li class="itemfour"><a href="' + obj.ProductUrl + '" target="_blank" class="fl"><span class="corner"></span><img src="' + obj.MaxImageUrl + '?imageView2/2/w/244/h/183/"><p>出发日期：' + obj.DepartDate + '</p></a><div class="fr"><h3><a href="' + obj.ProductUrl + '" target=“_blank" title="' + obj.ProductName + '">' + obj.ProductName + '</a></h3><ul>' + obj.SubTitle + '</ul><div class="clearfix"><p class="price"><span>￥</span>' + (obj.OriginalPrice-obj.PromotionPrice)+'<b>起</b></p><a href="' + obj.ProductUrl + '" target="_blank" class="reserve-btn">立即出发</a></div></div></li>');
                            });
                            $("#" + id).children(".loading").remove();
                        }
                        else {
                            $("#" + id).after("<div class=\"page clearfix\" id=\"" + id + "pages\" ></div>");
                            $("#" + id).empty();
                            $.each(DataPro.ProductList, function (i, obj) {
                                $("#" + id).append('<li class="itemfour"><a href="' + obj.ProductUrl + '" target="_blank" class="fl"><span class="corner"></span><img src="' + obj.MaxImageUrl + '?imageView2/2/w/244/h/183/"><p>出发日期：' + obj.DepartDate + '</p></a><div class="fr"><h3><a href="' + obj.ProductUrl + '" target=“_blank" title="' + obj.ProductName + '">' + obj.ProductName + '</a></h3><ul>' + obj.SubTitle + '</ul><div class="clearfix"><p class="price"><span>￥</span>' + (obj.OriginalPrice-obj.PromotionPrice)+'<b>起</b></p><a href="' + obj.ProductUrl + '" target="_blank" class="reserve-btn">立即出发</a></div></div></li>');
                            });
                        }
                        makekppager(id + "pages",
                            p,
                            pageSize,
                            DataPro.TotalCount,
                            "javascript:getDataPro(\'" + id + "\'," + b + ", '" + l + "' ," + ps,
                            ",'" + other + "');"
                        ); 
                        /* $('.item').hover(function(){
                         $(this).addClass("ahover");
                         },function () {
                         $(this).removeClass("ahover");
                         });*/
                    }
                    $(".main").find(".con").each(function (i, j) {
                        $(j).find(".itemfour").each(function (k, v) {
                            if (k % 4 == 3) {
                                $(v).css("margin-right", "0");
                            }
                        });
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#" + id).html("<p class=\"tips\">&#36968;&#28216;&#21531;&#27491;&#22312;&#19978;&#20135;&#21697;&#65292;&#32;&#20146;&#65292;&#32;&#35831;&#32784;&#24515;&#31561;&#24453;&#21734;&#126;&#126;&#126;</p>");
            }
        })

}
//ProductUrl：产品地址 , MaxImageUrl：产品图片地址 , ProductName：产品主标题, SubTitle ：产品描述, OriginalPrice：原价 , PromotionPrice：线上价格


//分页
var kkpager = {
    //divID
    pagerid: 'div_pager',
    //当前页码
    pno: 1,
    //总页码
    total: 1,
    //总数据条数
    totalRecords: 0,
    //是否显示总页数
    isShowTotalPage: false,
    //是否显示总记录数
    isShowTotalRecords: false,
    //是否显示页码跳转输入框
    isGoPage: false,
    //链接前部
    hrefFormer: '',
    //链接尾部
    hrefLatter: '',
    /****链接算法****/
    getLink: function (n) {
        //这里的算法适用于比如：
        //hrefFormer=http://www.xx.com/news/20131212
        //hrefLatter=.html
        //那么首页（第1页）就是http://www.xx.com/news/20131212.html
        //第2页就是http://www.xx.com/news/20131212_2.html
        //第n页就是http://www.xx.com/news/20131212_n.html
        if (n == 0) {
            return this.hrefFormer + this.hrefLatter;
        } else {
            return this.hrefFormer + ',' + n + this.hrefLatter;
        }
    },
    //跳转框得到输入焦点时
    focus_gopage: function () {
        var btnGo = $('#btn_go');
        $('#btn_go_input').attr('hideFocus', true);
        btnGo.show();
        btnGo.css('left', '0px');
        $('#go_page_wrap').css('border-color', '#6694E3');
        btnGo.animate({left: '+=44'}, 50, function () {
            //$('#go_page_wrap').css('width','88px');
        });
    },

    //跳转框失去输入焦点时
    blur_gopage: function () {
        setTimeout(function () {
            var btnGo = $('#btn_go');
            //$('#go_page_wrap').css('width','44px');
            btnGo.animate({
                left: '-=44'
            }, 100, function () {
                $('#btn_go').css('left', '0px');
                $('#btn_go').hide();
                $('#go_page_wrap').css('border-color', '#DFDFDF');
            });
        }, 400);
    },
    //跳转框页面跳转
    gopage: function () {
        var str_page = $("#btn_go_input").val();
        if (isNaN(str_page)) {
            $("#btn_go_input").val(this.next);
            return;
        }
        var n = parseInt(str_page);
        if (n < 1 || n > this.total) {
            $("#btn_go_input").val(this.next);
            return;
        }
        //这里可以按需改window.open
        window.location = this.getLink(n);
    },
    //分页按钮控件初始化
    init: function (config) {
        //赋值
        this.pno = isNaN(config.pno) ? 1 : parseInt(config.pno);
        this.total = isNaN(config.total) ? 1 : parseInt(config.total);
        this.totalRecords = isNaN(config.totalRecords) ? 0 : parseInt(config.totalRecords);
        if (config.pagerid) {
            this.pagerid = config.pagerid;
        }
        if (config.isShowTotalPage != undefined) {
            this.isShowTotalPage = config.isShowTotalPage;
        }
        if (config.isShowTotalRecords != undefined) {
            this.isShowTotalRecords = config.isShowTotalRecords;
        }
        if (config.isGoPage != undefined) {
            this.isGoPage = config.isGoPage;
        }
        this.hrefFormer = config.hrefFormer || '';
        this.hrefLatter = config.hrefLatter || '';
        if (config.getLink && typeof (config.getLink) == 'function') {
            this.getLink = config.getLink;
        }
        //验证
        if (this.pno < 1) this.pno = 1;
        this.total = (this.total <= 1) ? 1 : this.total;
        if (this.pno > this.total) this.pno = this.total;
        this.prv = (this.pno <= 2) ? 1 : (this.pno - 1);
        this.next = (this.pno >= this.total - 1) ? this.total : (this.pno + 1);
        this.hasPrv = (this.pno > 1);
        this.hasNext = (this.pno < this.total);

        this.inited = true;
    },
    //生成分页控件Html
    generPageHtml: function () {
        if (!this.inited) {
            return;
        }

        var str_prv = '', str_next = '';
        if (this.hasPrv) {
            str_prv = '<a href="' + this.getLink(this.prv) + '" title="上一页">上一页</a>';
        } else {
            str_prv = '<span class="disabled">上一页</span>';
        }

        if (this.hasNext) {
            str_next = '<a href="' + this.getLink(this.next) + '" title="下一页">下一页</a>';
        } else {
            str_next = '<span class="disabled">下一页</span>';
        }


        var str = '';
        var dot = '<span>...</span>';
        var total_info = '';
        if (this.isShowTotalPage || this.isShowTotalRecords) {
            total_info = '<span class="normalsize">共';
            if (this.isShowTotalPage) {
                total_info += this.total + '页';
                if (this.isShowTotalRecords) {
                    total_info += '&nbsp;/&nbsp;';
                }
            }
            if (this.isShowTotalRecords) {
                total_info += this.totalRecords + '条产品';
            }

            total_info += '</span>';

        }
        var gopage_info = '';
        if (this.isGoPage) {
            gopage_info = '&nbsp;转到<span id="go_page_wrap" style="display:inline-block;width:44px;height:18px;border:1px solid #DFDFDF;margin:0px 1px;padding:0px;position:relative;left:0px;top:5px;">' +
                '<input type="button" id="btn_go" onclick="kkpager.gopage();" style="width:44px;height:20px;line-height:20px;padding:0px;font-family:arial,宋体,sans-serif;text-align:center;border:0px;background-color:#0063DC;color:#FFF;position:absolute;left:0px;top:-1px;display:none;" value="确定" />' +
                '<input type="text" id="btn_go_input" onfocus="kkpager.focus_gopage()" onkeypress="if(event.keyCode<48 || event.keyCode>57)return false;" onblur="kkpager.blur_gopage()" style="width:42px;height:16px;text-align:center;border:0px;position:absolute;left:0px;top:0px;outline:none;" value="' + this.next + '" /></span>页';
        }

        //分页处理
        if (this.total <= 8) {
            for (var i = 1; i <= this.total; i++) {
                if (this.total == 1) {

                }
                else if (this.pno == i) {
                    str += '<span class="curr">' + i + '</span>';
                } else {
                    str += '<a href="' + this.getLink(i) + '" title="第' + i + '页">' + i + '</a>';
                }


            }
        } else {
            if (this.pno <= 5) {
                for (var i = 1; i <= 7; i++) {
                    if (this.pno == i) {
                        str += '<span class="curr">' + i + '</span>';
                    } else {
                        str += '<a href="' + this.getLink(i) + '" title="第' + i + '页">' + i + '</a>';
                    }
                }
                str += dot;
            } else {
                str += '<a href="' + this.getLink(1) + '" title="第1页">1</a>';
                str += '<a href="' + this.getLink(2) + '" title="第2页">2</a>';
                str += dot;

                var begin = this.pno - 2;
                var end = this.pno + 2;
                if (end > this.total) {
                    end = this.total;
                    begin = end - 4;
                    if (this.pno - begin < 2) {
                        begin = begin - 1;
                    }
                } else if (end + 1 == this.total) {
                    end = this.total;
                }
                for (var i = begin; i <= end; i++) {
                    if (this.pno == i) {
                        str += '<span class="curr">' + i + '</span>';
                    } else {
                        str += '<a href="' + this.getLink(i) + '" title="第' + i + '页">' + i + '</a>';
                    }
                }
                if (end != this.total) {
                    str += dot;
                }
            }
        }

        str = "&nbsp;" + str_prv + str + str_next + total_info + gopage_info;
        $("#" + this.pagerid).html(str);
    }
};

$.fn.smartFloat = function () {
    var position = function (element) {
        var top = element.position().top, pos = element.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > 520 ) {
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
                    top: 520
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

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