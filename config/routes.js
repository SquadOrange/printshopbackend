'use strict';

module.exports = require('lib/wiring/routes')

.root('root#root')

.resources('examples')

.resources('charges', { only: ['create']})

.resources('prints')
.resources('orders', {only: ['create', 'index']})

.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })
;
