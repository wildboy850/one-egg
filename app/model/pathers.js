// app/model/pathers.js
module.exports = app => {
    const mongoose = app.mongoose;
    const PathersSchema = new mongoose.Schema({
        path: { type: String  },
        action: { type: String  }
    });

    return mongoose.model('Pathers', PathersSchema);
}