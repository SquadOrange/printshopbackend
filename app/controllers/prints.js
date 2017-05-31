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
  // show,
  create,
  update,
  destroy,
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Print), only: ['show'] },
  { method: setModel(Print, { forUser: true }), only: ['update', 'destroy'] },
], })
