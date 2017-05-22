'use strict';

const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({ [
  // 9 of these are created when you make an account, everyone has acces to them.
   title: {
     type: String,
     required: true
    },
  idNum: {
    type: Number, // this is 0 - 8, and the data_id in the dom.
    required: true
  },
  { price: Number,
    required: true
  },
  {
    purchased: Boolean,
    required: true,
    default: false
  }
]})
// }, {
//   timestamps: true,
//   toJSON: {
//     // virtuals: true,
//     transform: function (doc, ret, options) {
//       let userId = (options.user && options.user._id) || false;
//       ret.editable = userId && userId.equals(doc._owner);
//       return ret;
//     },
//   },
// });

// printSchema.virtual('length').get(function length() {
//   return this.text.length;
// });

const Print = mongoose.model('Print', printSchema);

module.exports = Print;
