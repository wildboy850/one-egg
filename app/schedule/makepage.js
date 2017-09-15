const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;
const moment = require('moment');
const shell = require('shelljs');

// 异步读取配置
//页面上线时间表
module.exports = function () {
    const exports = {};
    exports.schedule = {
        interval: '120s',
        immediate:true,
        type: 'all'
    };
    // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
    exports.task = function* (ctx) {
        console.log('轮询page配置');
        let dirpath = path.join(ctx.app.baseDir,'/app/page_source/waiting_source/');
        //数据库读取配置
        var nowtime = moment().format('YYYY-MM-DD HH:mm:ss');
        var redata = yield ctx.model.Pagers.find({disabled:false,"$or":[{downover:false},{upover:false}]});
        if (redata.length > 0) {
                var item;
                for ( let i = 0; (item = redata[i]) != null; i++ ) {
                    if(!item.upover){
                        //上线时间大于现在并且上线状态就绪
                        if (item.uptime != '' && nowtime >= item.uptime) {
                            console.log('上线:'+item.name);
                            let _waitingsourceUrl = path.join(ctx.app.baseDir+'/app/page_source/waiting_source/', item.waiting_path);
                            fs.readdir(_waitingsourceUrl, (err, fds) => {
                                if (err) {
                                    if (err.code === 'ENOENT') {
                                        console.error('This file does not exist');
                                        return;
                                    }
                                    throw err;
                                }
                                //发现文件 , 拷贝静态文件至public
                                let _temparr = item.waiting_path.split('/');
                                let _newpagename = _temparr[_temparr.length - 1];
                                ncp(_waitingsourceUrl, path.join(ctx.app.baseDir, '/app/public/' + _newpagename), {stopOnErr: true}, function (err, files) {
                                    if (err) throw err;
                                    fs.mkdir(path.join(ctx.app.baseDir, '/app/view/' + _newpagename), (err, fds) => {
                                        //拷贝模板至view
                                        ncp(path.join(ctx.app.baseDir, '/app/public/' + _newpagename) + '/pug', path.join(ctx.app.baseDir, '/app/view/' + _newpagename + '/pug'), function (err, files) {
                                            if (err) throw err;
                                            // 删除静态资源下的模板
                                            shell.rm('-rf', path.join(ctx.app.baseDir, '/app/public/' + _newpagename + '/pug'));
                                            shell.rm('-rf', _waitingsourceUrl);
                                        });
                                    });
                                });
                            });
                            //设置为已经下过线
                            yield ctx.service.pagerService.updatePagerByRow(item, {upover: true});
                        }
                    }
                    if(!item.downover){
                        //下线时间到了并且下线状态就绪就备份并且下线
                        if (item.downtime != '' && item.downtime <= nowtime) {
                            console.log('下线:'+item.name);
                            let pgservice = ctx.service.pagerService;
                            let itemname = item.name;
                            let backname = item.backupname;
                            let _back_foldername = itemname + moment().format('YYYYMMDDHHmmss');
                            let _backuppath = path.join(ctx.app.baseDir, '/app/page_source/backup_source/' + _back_foldername);
                            shell.mkdir('-p', _backuppath+'/pug');
                            if(item.backupname != 'none' || item.backupname == ''){
                                console.log('开始删除原始备份');
                                shell.rm('-rf', path.join(ctx.app.baseDir, '/app/page_source/backup_source/' + backname ));
                            }
                            yield pgservice.updatePagerByRow(item, {backupname: _back_foldername});

                            //拷贝public关于该页面文件备份
                            ncp(path.join(ctx.app.baseDir, '/app/public/' + itemname), _backuppath + '/', {stopOnErr: true}, function (err, files) {
                                if (err) throw err;
                                shell.rm('-rf',path.join(ctx.app.baseDir, '/app/public/' + itemname));
                                console.log('下面public下面的文件');
                            });
                            //拷贝view关于该页面文件备份
                            ncp(path.join(ctx.app.baseDir, '/app/view/' + itemname + '/pug'), _backuppath + '/pug', {stopOnErr: true}, function (err, files) {
                                if (err) throw err;
                                shell.rm('-rf',path.join(ctx.app.baseDir, '/app/view/' + itemname));
                                console.log('下面view下面的文件');
                            });
                            //设置为已经下过线
                            yield pgservice.updatePagerByRow(item, {downover: true});
                        }
                    }
                }
        }
    }
    return exports;
};