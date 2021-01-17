var mongoose = require('mongoose'),
    modelName = 'item',
    schemaDefinition = require('../schema/' + modelName),
    schemaInstance = mongoose.Schema(schemaDefinition, { timestamps: true }),
    modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;