'use strict';

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  // all prints attributts are in event.target
  cart: [{
    // need to figure out, contains a qusntity connected to a print reference
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
    }
  }],
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

buyerSchema.virtual('cost').get(function length() {
  return this.quantity * this.print.cost;
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
