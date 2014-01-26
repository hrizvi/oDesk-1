'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name:   { type: String, required: true, unique: true },
    toggle: { type: Boolean, default: true }
});

mongoose.model('Item', ItemSchema);
