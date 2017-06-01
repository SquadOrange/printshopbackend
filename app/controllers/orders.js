'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Order = models.order;

const authenticate = require('./concerns/authenticate');
const setUser = require('./concerns/set-current-user');
const setModel = require('./concerns/set-mongoose-model');

const index = (req, res, next) => {
  Order.find({_owner: req.user._id})
    .then(orders => res.json({
      orders: orders.map((e) =>
        e.toJSON({ virtuals: true, user: req.user })),
    }))
    .catch(next);
};

const create = (req, res, next) => {
  let order = Object.assign(req.body.order, {
    _owner: req.user._id,
  });
  Order.create(order)
    .then(order =>
      res.status(201)
        .json({
          order: order.toJSON({ virtuals: true, user: req.user }),
        }))
    .catch(next);
};

module.exports = controller({
  index,
  create
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Order), only: ['show'] },
], });
