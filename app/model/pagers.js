// app/model/pagers.js
module.exports = app => {
    const mongoose = app.mongoose;
    const PagersSchema = new mongoose.Schema({
        name: { type: String },//活动页面名字
        backupname:{type:String},//备份名字包含时间
        waiting_path: { type: String },//资源等待文件夹
        downtime: { type: String },//下线时间
        uptime: { type: String },//上线时间
        downover:{type:Boolean},//下线结束
        upover:{type:Boolean},//上传结束
        disabled:{type:Boolean}//不可用
    });

    return mongoose.model('Pagers', PagersSchema);
}