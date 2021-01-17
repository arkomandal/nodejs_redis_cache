const express = require("express");
const redis = require("redis");
const axios = require("axios");
const bodyParser = require("body-parser");
const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || 5000;
const redis_client = redis.createClient(port_redis);
const app = express();
require("./db/index")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const ItemModel = require('./db/model/item');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.put("/items/:item_id", async (req, res) => {
    try {
        let data = await ItemModel.findOneAndUpdate({ item_id: req.params.item_id }, req.body, { useFindAndModify: true, new: true });
        redis_client.flushdb();
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


//Middleware Function to Check Cache
checkCache = (req, res, next) => {
    const { item_id } = req.params;
    redis_client.get(item_id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (data != null) {
            console.log("old")
            res.send(JSON.parse(data));
        } else {
            console.log("new")
            next();
        }
    });
};


app.get("/items/:item_id", checkCache, async (req, res) => {
    try {
        const { item_id } = req.params;
        let data = await ItemModel.findOne({ item_id: req.params.item_id });
        redis_client.setex(item_id, 3600, JSON.stringify(data));
        return res.json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


app.listen(port, () => console.log(`Server running on port ${port}`));