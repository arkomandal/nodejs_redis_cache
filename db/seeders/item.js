module.exports = async () => {
    const ItemModel = require('../model/item');
    let data = await ItemModel.findOne({ item_id: 1 });
    if (!data) {
        let itemModel = new ItemModel({
            item_id: 1,
            item_name: "item1"
        });
        itemModel.save();
    }
}