'use strict';

const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    idNum: {
      type: Number, // this is 0 - 8, and the data_id in the dom.
      required: true
    },
    purchased: {
      type: Boolean,
      required: true,
      default: false
    },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret, options) {
      let userId = (options.user && options.user._id) || false;
      ret.editable = userId && userId.equals(doc._owner);
      return ret;
    },
  },
});

const Print = mongoose.model('Print', printSchema);

module.exports = Print;
