'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Buyer = models.buyer;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  let owner = {_owner: req.user._id }
  Buyer.find(owner)
    .then(buyers => res.json({
      buyers: buyers.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.

  // req.buyer.update({'$set': {cart.idNum: 1, card.quantity: }})
  //   .then((buyers) => res.sendStatus(201))
  //   .then(console.log('Cart newly updated!'))
  //   .catch(next)
//   const currentCartArray
//   for (let i = 0; i < req.buyer.cart.length; i++) {
//      if (currentCartArray[i].idNum = req.body.buyer.cart.idNum)
//       req.buyer.update({idNum: req.body.cart[0].idNum}{$ {cart: req.body.buyer.cart[0]}})
// } else { {idNum: req.body.buyer.cart.idNum},
req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
  .then((buyers) => res.sendStatus(201))
  .then(console.log('Cart newly updated!'))
  .catch(next)
// }


console.log('cart id num is', req.body.buyer.cart[0].idNum)
  req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
    .then((buyers) => res.sendStatus(201))
    .then(console.log('Cart newly updated!'))
    .catch(next)
// }
}

// db.students.update(
//    { name: "joe" },
//    { $push: { scores: { $each: [ 90, 92, 85 ] } } }
// )

// const update = (req, res, next) => {
//   delete req.body._owner  // disallow owner reassignment.
//
//   for (let i = 0; i < req.cart.products.length; i++) {
//     if (lodash.isEqual(req.cart.products[i].sku, req.body.cart.products[0].sku) && req.headers.action === 'add') {
//       res.sendStatus(404)
//       return
//     }
//   }
//   if (req.headers.action === 'add') {
//     req.cart.update({'$push': {products: req.body.cart.products[0]}, '$set': {'totalPrice': req.body.cart.totalPrice}})
//       .then((carts) => res.sendStatus(201))
//       .catch(next)
//   } else if (req.headers.action === 'remove') {
//     req.cart.update({'$pull': {products: req.body.cart.products[0]}, '$set': {'totalPrice': req.body.cart.totalPrice}})
//       .then((carts) => res.sendStatus(204))
//       .catch(next)
//   } else if (req.headers.action === 'changeQuantity') {
//     const sku = (req.body.cart.products[0].sku)
//     req.cart.update({'$pull': {products: {sku: req.body.cart.products[0].sku}}})
//     .then(req.cart.update({'$push': {products: req.body.cart.products[0]}})
//     .then(res.sendStatus(201))
//     .catch(next))
//   }
// }

const create = (req, res, next) => {
  let buyer = Object.assign(req.body.buyer, {
    _owner: req.user._id,
  });
  Buyer.create(buyer)
    .then(buyer =>
      res.status(201)
        .json({
          buyer: buyer.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
}

module.exports = controller({
  index,
  // show,
  create,
  update
  // destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Buyer), only: ['show'] },
  { method: setModel(Buyer, { forUser: true }), only: ['update', 'destroy'] },
], });
