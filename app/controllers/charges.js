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
  let amount = 500
  console.log('req is:', req)
  console.log('at pay req email and id card it', req.body.id, req.body.email)
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer => {
    console.log('at then at customer', customer)
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    })
    .then(charge => {
        res.send(charge)
        console.log('charge is', charge)
        Charge.create({
          "stripeToken": charge.id,
          "amount": charge.amount,
          "_owner": req.user._id
        })
      })
    })
}


//     , function (err, charge) {
//       if (err) {
//         console.log('err', err)
//       } else {
//         console.log('charge: ', charge)
//       }
//     })
//     })
//   .then(charge => {
//     res.send(charge)
//     console.log('charge is', charge)
//   })
//   .catch(err => {
//     console.log("We are reached he catch, Error:", err)
//     res.status(500).send({error: "Purchase Failed"})
//   })
// }

// need to change this stuff
module.exports = controller({
  create
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show',] },
  { method: setModel(Charge), only: ['show'] },
  { method: setModel(Charge, { forUser: true }), only: ['update', 'destroy'] },
], })
