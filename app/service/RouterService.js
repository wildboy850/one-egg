'use strict';

module.exports = app => {
    class RouterService extends app.Service {

        * takeRoutesFormMongoDb() {
            let data = [];
            data = yield this.ctx.model.Pathers.find({});
            return data;
        }

        *updateRouter(){
            let data = yield this.takeRoutesFormMongoDb();
            if(data.length>0){
                data.forEach(item => {
                    app.get(item.path, item.action);
                });
            }
        }
    }
    return RouterService;
};
