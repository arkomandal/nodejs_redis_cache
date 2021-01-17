const mongoose = require('mongoose'),
    schemaInstance = mongoose.Schema({
        item_id: Number,
        item_name: String
    }, { timestamps: true }),
    modelInstance = mongoose.model("item", schemaInstance);

module.exports = modelInstance;