// config/config.default.js
const fs = require('fs');
const path = require('path');
module.exports = appInfo => {
    return {
        keys: 'fuckoff',
        //404处理
        notfound: {
            pageUrl: '/404',
        },
        siteFile: {
            '/favicon.ico': 'http://pic2.aoyou.com/images/favicon.ico',
        },
        view: {
            root: [
                path.join(appInfo.baseDir, 'app/view'),
                path.join(appInfo.baseDir, 'path/to/another'),
            ].join(','),
            cache: true,
            mapping: {
                '.pug': 'pug',
                '.jade': 'pug'
            }
        },
        mongoose : {
            //url: 'mongodb://127.0.0.1/activity',
            url: 'mongodb://127.0.0.1/example',
            options: {}
        }
    }
};
