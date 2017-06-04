'use strict';

const mongoose = require('mongoose');

const chargeSchema = new mongoose.Schema({
  stripeToken: {
    type: String,
    required: true
},
    amount: {
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

const Charges = mongoose.model('Charges', chargeSchema);

module.exports = Charges;
