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
  let purchased = {purchased: false}
  Print.find(owner, purchased)
    .then(prints => res.json({
      prints: prints.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next)
}

const indexPastPurchases = (req, res, next) => {
  let owner = {_owner: req.user._id }
  let purchased = {purchased: true}
  Print.find(owner, purchased)
    .then(prints => res.json({
      prints: prints.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next)
}

// method to updates purchases status
const updateToPurchased = (req, res, next) => {
  console.log('did it get here?')
  delete req.body._owner;  // disallow owner reassignment.
  req.print.update(
    {"purchased": "false"}, //query, you can also query for email
    {$set: {"purchased": "true"}},
    {"multi": true} //for multiple documents
   )
    .then(() => res.sendStatus(204))
    .catch(next);
}


const update = (req, res, next) => {
  delete req.body._owner;  // disallow owner reassignment.
  req.print.update(req.body.print)
    .then(() => res.sendStatus(204))
    .catch(next);
}

const destroy = (req, res, next) => {
  req.print.remove()
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = controller({
  index,
  indexPastPurchases,
  updateToPurchased,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'indexPastPurchases', 'show'] },
  { method: authenticate, except: ['index', 'indexPastPurchases','show'] },
  { method: setModel(Print), only: ['show'] },
  { method: setModel(Print, { forUser: true }), only: ['update', 'updateToPurchased', 'destroy'] },
], })
