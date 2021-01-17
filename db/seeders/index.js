'use strict';
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        db[file.split('.')[0]] = require(path.join(__dirname, file));
    });

Object.keys(db).forEach(modelName => {
    db[modelName]()
});

module.exports = db;