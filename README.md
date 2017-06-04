Print Shop Back End

**Link to deployed app:**
(https://squadorange.github.io/PrintShopClient/)

**Link to deployed back-end:**
(https://secure-chamber-31638.herokuapp.com/

**Link to front-end repo:**
(https://github.com/SquadOrange/PrintShopClient)

**Link to back-end repo:**
(https://github.com/SquadOrange/printshopbackend)

By Maggie, Catherine, and Spencer!

Print Shop -- Description:
  Print shop is an online store where you can choose from 9 different prints to order, each of which costs $100.  You can order as many prints as you want.  You can add prints to the cart and then change the number of prints you order from the cart or remove the prints altogether.  Prints are purchased using the third party API stripe, and require only an email address and a valid credit card number. Stripe can only be used in test mode with the test credit card number 4242-4242-4242-4242 and an expiration date in the future.  This allows you to simulate purchasing the prints using stripe and clears the cart.

Routes:
  The user resource has the following routes to difference user controller methods --
  /sign-up is a post request tosign up a new user using the user controller method signup.
  /sign-in is a route that is also a post request using the signin controller method.
  /sign-out/:id is a route to a delete request that requires a specific user id and uses the signout controller method.
  /change-password/:id is a patch ajax request that uses the changepw controller method and also requires a user id.

  The prints resource has the following routes to different prints controller methods --
  /prints is a get ajax request which maps to the index method and returns all the prints for a specific user
  /prints/:id is a patch request which updates the prints, specifically to change the quantity, of a print, using the update method.
  /prints is a post ajax call that creates a new print using the create method.
  /prints/:id is a delete ajax call that uses the destroy controller action to delete a specific print.

  The orders collection has the following routes to different orders controller methods:
  /orders is a route for a post ajax request that creates a new order using the create controller method
  /orders is a route for a get ajax request that uses the index controller action to return all orders connected to specific user.

  The charges collection has the following routes to different charge controller methods --
  /charges is a post ajax call which uses the create controller action to make a new charge.
