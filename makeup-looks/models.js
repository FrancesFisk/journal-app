'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const makeupLookSchema = mongoose.Schema({
  image: {type: String},
  title: {type: String, required: true},
  username: {type: String},
  steps: {type: Array},
  products: {type: Array},
  skintype: {type: String, enum: ['N/A','oily', 'dry', 'combination', 'normal', 'sensitive']},
  colortheme: {type: Array},
  publish: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  updated: {type: Date}
});

makeupLookSchema.methods.serialize = function() {
  return {
    id: this._id,
    image: this.image,
    title: this.title,
    username: this.username,
    steps: this.steps,
    products: this.products,
    skintype: this.skintype,
    colortheme: this.colortheme,
    publish: this.publish
  };
}

const MakeupLook = mongoose.model('MakeupLook', makeupLookSchema);

module.exports = {MakeupLook};