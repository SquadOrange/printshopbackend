'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Buyer = models.buyer;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const create = (req, res, next) => {
  let buyer = Object.assign(req.body.buyer, {
    _owner: req.user._id,
  });
  Buyer.create(buyer)
    .then(buyer =>
      res.status(201)
        .json({
          buyer: example.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
}

module.exports = controller({
  // index,
  // show,
  create
  // update,
  // destroy,
}, { before: [
  { method: setUser, only: ['create'] },
  { method: authenticate, only: ['create'] },
  { method: setModel(Buyer), only: ['show'] },
  { method: setModel(Buyer, { forUser: true }), only: ['update', 'destroy'] },
], });
