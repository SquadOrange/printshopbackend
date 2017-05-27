'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Print = models.print

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const create = (req, res, next) => {
  let print = Object.assign(req.body.print, {
    _owner: req.user._id,
  })
  Print.create(print)
    .then(print =>
      res.status(201)
        .json({
          print: print.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next)
}

const index = (req, res, next) => {
  let owner = {_owner: req.user._id }
  Print.find(owner)
    .then(prints => res.json({
      prints: prints.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next)
}

const update = (req, res, next) => {

  delete req.body._owner  // disallow owner reassignment.

  let owner = {_owner: req.user._id }
  Print.findOne(owner, { cart: { $elemMatch: {idNum: req.body.print.cart[0].idNum}}})
  .then(object => {
    console.log('object is', object)
    if (object.cart.length === 0) {
      req.print.update({'$push': {cart: req.body.print.cart[0]}})
      .then(response => console.log('after push it says', response))
        .then((prints) => res.sendStatus(201))
        .then(console.log('Cart newly updated!'))
        .catch(next)
    }
    else {
      const idNum = object.cart[0].idNum
      req.print.update(
        {'$pull': {cart: { idNum: req.body.print.cart[0].idNum}}}
      )
      .then(response => console.log('after pull it says', response))
      req.print.update({'$push': {cart: req.body.print.cart[0]}})
      .then(response => console.log('after push it says', response))
      .then(res.sendStatus(201))
      .catch(next)
      }
    }
  )}


module.exports = controller({
  index,
  // show,
  create,
  update
  // destroy
}, { before: [
  { method: setUser, only: ['index', 'show', 'update'] },
  { method: authenticate, except: ['index', 'show', 'update'] },
  { method: setModel(Print), only: ['show'] },
  { method: setModel(Print, { forUser: true }), only: ['update', 'destroy'] },
], })
