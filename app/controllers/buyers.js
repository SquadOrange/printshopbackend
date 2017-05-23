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

  let owner = {_owner: req.user._id }
  Buyer.findOne(owner, { cart: { $elemMatch: {idNum: req.body.buyer.cart[0].idNum}}})
  .then(object => {
    console.log('object is', object)
    if (object.cart.length === 0) {
      req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
        .then((buyers) => res.sendStatus(201))
        .then(console.log('Cart newly updated!'))
        .catch(next)
    }
    else {
      console.log('need to be updated', object)
    }
  })

  // req.buyer.update({'$set': {cart: req.body.buyer.cart[0]}})
  //   .then((buyers) => res.sendStatus(201))
  //   .then(console.log('Cart newly updated!'))
  //   .catch(next)
  // console.log('cart id num is', req.body.buyer.cart[0].idNum)
    // req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
    //   .then((buyers) => res.sendStatus(201))
    //   .then(console.log('Cart newly updated!'))
    //   .catch(next)
}

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
  { method: setUser, only: ['index', 'show', 'update'] },
  { method: authenticate, except: ['index', 'show', 'update'] },
  { method: setModel(Buyer), only: ['show'] },
  { method: setModel(Buyer, { forUser: true }), only: ['update', 'destroy'] },
], });
