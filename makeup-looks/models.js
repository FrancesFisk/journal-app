'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const makeupLookSchema = mongoose.Schema({
    image: {type: String},
    title: {type: String, required: true},
    username: {type: String},
    steps: {type: Array},
    products: {type: Array},
    skintype: {type: String, enum: ['oily', 'dry']},
    colortheme:{type: String, required: true},
    publish: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    updated: {type: Date}
});

const MakeupLook = mongoose.model('MakeupLook', makeupLookSchema);

module.exports = {MakeupLook};