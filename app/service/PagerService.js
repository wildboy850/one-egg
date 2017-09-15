'use strict';

module.exports = app => {
    class PagerService extends app.Service {

        * takePagesFormMongoDb(requrl) {
            let data = [];
            data = yield this.ctx.model.Pagers.find({});
            return data;
        }

        * updatePagerByRow(_row,param){
            var rt = yield _row.update({$set:param});
            return rt;
        }
    }
    return PagerService;
};
