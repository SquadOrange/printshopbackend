'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Charge = models.charge

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SUPER_SECRET_KEY;

const express = require("express");
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

// charges only has a create method

const create = (req, res, next)  => {
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer => {
    stripe.charges.create({
      amount: req.body.amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    })
    .then(charge => {
        res.send(charge)
        Charge.create({
          "stripeToken": charge.id,
          "amount": charge.amount,
          "_owner": req.user._id
        })
      })
      .catch(err => {
        res.status(500).send({error: "Purchase Failed"})
      })
    })
}

module.exports = controller({
  create
}, { before: [
  { method: authenticate, except: ['index', 'show'] }
], })
