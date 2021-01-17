
const mongoose = require('mongoose');
mongoose.set('debug', true);

const dbUrl = "mongodb://localhost:27017/redis_cache"

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function (err) {
    if (err) {
        console.log("Mongodb connection error: " + err);
    } else {
        console.log("Mongodb successfully connected.");
        require('./seeders');
    }
});