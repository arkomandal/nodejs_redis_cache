const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    item_id: Number,
    item_name: String,
    // description: String,
    // meta: {
    //     type: String
    // },
    // serial_number: { type: String },
    // parent: { type: Schema.Types.ObjectId }, //to differentiate between category and sub-category
    // lang_id: { type: Schema.Types.ObjectId },
    // fid: { type: Schema.Types.ObjectId }, //_id of the item inserted in main language
    // status: { type: Number, default: 1 }
};