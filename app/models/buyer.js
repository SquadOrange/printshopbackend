'use strict';

const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  // all prints attributts are in event.target
  cart: [{
    // need to figure out, contains a qusntity connected to a print reference
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
  let total = 0
  for (let i = 0; i < this.cart.length; i++){
  if (this.cart[i].purchased === false) {
  total += this.cart[i].quantity
}
}
  return total * 100
});

buyerSchema.virtual('cartHas').get(function length() {
  const cartHas = []
  for (let i = 0; i < this.cart.length; i++){
  if (this.cart[i].purchased === false && this.cart[i].quantity > 0) {
  cartHas.push(this.cart[i])
}
}
  return cartHas
});

buyerSchema.virtual('alreadyPurchased').get(function length() {
  const purchasedHistory = []
  for (let i = 0; i < this.cart.length; i++){
  if (this.cart[i].purchased === true && this.cart[i].quantity > 0) {
  purchasedHistory.push(this.cart[i])
}
}
  return purchasedHistory
});



const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
