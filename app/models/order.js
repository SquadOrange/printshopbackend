'use strict';

const mongoose = require('mongoose');
// Need to update chage schema

const orderSchema = new mongoose.Schema({
  printName: {
    type: String,
    required: true
},
    printQuant: {
      type: Number,
      required: true,
    },
    _owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
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

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
