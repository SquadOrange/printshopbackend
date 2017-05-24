'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Buyer = models.buyer

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const pay = (req, res, next)  => {
  let amount = 500
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err)
    res.status(500).send({error: "Purchase Failed"})
  })
}

const index = (req, res, next) => {
  let owner = {_owner: req.user._id }
  Buyer.find(owner)
    .then(buyers => res.json({
      buyers: buyers.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next)
}

const update = (req, res, next) => {

  delete req.body._owner  // disallow owner reassignment.

  let owner = {_owner: req.user._id }
  Buyer.findOne(owner, { cart: { $elemMatch: {idNum: req.body.buyer.cart[0].idNum}}})
  .then(object => {
    console.log('object is', object)
    if (object.cart.length === 0) {
      req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
      .then(response => console.log('after push it says', response))
        .then((buyers) => res.sendStatus(201))
        .then(console.log('Cart newly updated!'))
        .catch(next)
    }
    else {
      const idNum = object.cart[0].idNum
      req.buyer.update(
        {'$pull': {cart: { idNum: req.body.buyer.cart[0].idNum}}}
      )
      .then(response => console.log('after pull it says', response))
      req.buyer.update({'$push': {cart: req.body.buyer.cart[0]}})
      .then(response => console.log('after push it says', response))
      .then(res.sendStatus(201))
      .catch(next)
      }
    }
  )}

const create = (req, res, next) => {
  let buyer = Object.assign(req.body.buyer, {
    _owner: req.user._id,
  })
  Buyer.create(buyer)
    .then(buyer =>
      res.status(201)
        .json({
          buyer: buyer.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next)
}

module.exports = controller({
  index,
  pay,
  // show,
  create,
  update
  // destroy
}, { before: [
  { method: setUser, only: ['index', 'show', 'update'] },
  { method: authenticate, except: ['index', 'show', 'update'] },
  { method: setModel(Buyer), only: ['show'] },
  { method: setModel(Buyer, { forUser: true }), only: ['update', 'destroy'] },
], })
