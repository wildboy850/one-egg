'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const saveEval = require('node-eval');

module.exports = app => {
    class DataService extends app.Service {
        // 默认不需要提供构造函数。
        // constructor(ctx) {
        //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        //   // 就可以直接通过 this.ctx 获取 ctx 了
        //   // 还可以直接通过 this.app 获取 app 了
        // }
        
        //核心,service请求分发,各个service方法以'from+项目名'拼接而成
        * takeData(requrl) {
            let data = {};
            if(requrl != undefined && requrl != ""){
                data = yield this.mainFunction(requrl);
            }
            return data;
        }
        

        //主要方法
        /*页面请求开始*/
        * mainFunction(requrl) {
            let filepath = path.join(this.app.config.baseDir,'/app/public/'+requrl+'/json/pageconfig.json');
            let _config = yield this.takePageConfigJson(filepath);
            let _redata = yield this.getConfigFromData(_config)
            let publicsrc = '/public/';
            let _pagesize = 8;
            if(requrl != undefined){
                publicsrc = publicsrc + requrl +'/';
            }
            
            const data = {
                publicsrc:publicsrc,
                redata:_redata
            };
            return data;
            
        }
        /*各个请求页面结束*/
        
        /*请求页面所需数据开始*/
        * takePageData(reqname){
            let filepath = path.join(this.app.config.baseDir,'/app/public/'+reqname+'/json/pageconfig.json');
            let _config = yield this.takePageConfigJson(filepath);
            const data = _config?_config:{};
            return data;
        }
        /*请求页面所需数据结束*/
        
        /*工具方法开始*/
        //ajax请求html方法
        * curlDataHtml(url,mtype,dtype) {
            let rehtml = '';
            const result = yield app.curl(url, {method: mtype,dataType: dtype});
            if (Object.prototype.toString.call(result.data) === "[object String]") {
                    rehtml = result.data.toString();
            }
            return rehtml;
        } 
        
        
        //读取json文件的方法
        * takePageConfigJson(url) {
            let re=JSON.parse(fs.readFileSync(url));
            return re;
        } 

        //读取config的方法
        * getConfigFromData(dt) {
            let _redata = {};
            if(dt){
                _redata = yield this.analyConfig(dt,_redata,'pageconfig','city');;
                if(dt['configExtend']){
                    _redata = yield this.analyConfig(dt,_redata,'pageconfigExtend','week');
                }
            }
            return _redata;
        } 
        //分析配置项的逻辑
        * analyConfig(dt,_redata,tagname,tagtype) {
            let item = null;
            for (var j = dt[tagname].length - 1; j >= 0 && (item = dt[tagname][j]); --j) {
                    if(this.getTrueFalseFunc(tagtype,item)){
                        let innerItem = null;
                        for(var i = item.contents.length - 1; i >= 0 && (innerItem = item.contents[i]); --i) {
                            let _ajaxdata = yield app.curl(innerItem.url, {method: 'get',dataType: 'text'});
                            let _jsondata = null;
                            if(innerItem.gettype == '1'){
                                //获取html字符串
                                if (Object.prototype.toString.call(_ajaxdata.data) === "[object String]") {
                                    _jsondata = _ajaxdata.data.toString();
                                }
                            }else{
                                //json格式数据
                                if(_ajaxdata.data != "()"){
                                    _jsondata = saveEval(_ajaxdata.data);
                                }
                            }
                            if(_jsondata != null && innerItem.pagesize != undefined){
                                if(_jsondata.TotalCount){
                                    this.ctx.cookies.set(innerItem.contentid+'_total', _jsondata.TotalCount,{overwrite:true,httpOnly: false,sign: false});
                                }else{
                                    let $dom = cheerio.load(_jsondata);
                                    let _temSelectStr = innerItem.selectstr?innerItem.selectstr:'li'
                                    this.ctx.cookies.set(innerItem.contentid+'_total', $dom(_temSelectStr).length,{overwrite:true,httpOnly: false,sign: false});
                                    $dom(_temSelectStr).eq(innerItem.pagesize-1).nextAll().remove();
                                    //构成dom并且拆分,截取分页所需的条数
                                    _jsondata = $dom.html();
                                }
                            }
                            _redata[innerItem.contentid] = _jsondata;
                        }
                    }
                }
            return _redata
        }
        //判断主要还是扩展的不同返回情况(默认根据cityid对比)
        * getTrueFalseFunc(type,item) {
            if (type == 'city') {
                let cityid = this.ctx.cookies.get('the_city') || 1;
                return item.cityid == cityid || item.cityid.toString() == "0"
            } else if (type == 'week') {
                let tdweekname = new Date().getDay();
                return item.weeknum == tdweekname || item.extendTagid.toString() == "0"       
            } else {
                return false
            }

        }
        /*工具方法结束*/
    }
    return DataService;
};
