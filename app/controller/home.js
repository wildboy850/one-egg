// app/controller/home.js
module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            console.log(1111111111);
            const ctx = this.ctx;
            yield ctx.render('home.pug');
        }
        * notfound() {
            const ctx = this.ctx;
            const data = {
                homepath: '/home'
            };
            yield ctx.render('404.pug',data);
        }
        * realaction(){
            let rs = yield ctx.model.Pather.find({});
            return rs;
        }
    }
    return HomeController;
};