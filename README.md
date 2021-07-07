# **Zing**

Zing is a sleek and minimalistic web application for ordering coffee.

<p float="left">
  <img src="./static/assets/readme-splash.png?raw=true" alt="Splash" width=200px>
  <img src="./static/assets/readme-menu.png?raw=true" alt="Menu" width=200px>
  <img src="./static/assets/readme-order.png?raw=true" alt="Order" width=200px>
  <img src="./static/assets/readme-checkout.png?raw=true" alt="Checkout" width=200px>
</p>

## Summary

Food delivery apps are everywhere - but what if you wanted your artisanal coffee delivered to your door as well? Zing is the answer: Simply go through our carefully curated menu of third-wave coffee drinks, add them to your basket, enter your mobile number and wait for the SMS confirmation!

## Technologies used

**Front End**

- React
- SCSS
- Handlebars

**Back End**

- Node.js
- Express
- Twilio
- Postgres

**Unit Testing**

- Jest

**Build**

- webpack

## Installation

- Fork and clone this repo.
- Run `npm install` to install dependencies.
- Create a `.env` file to store your database credentials and Twilio user ID and token.
- Create a local database using the supplied queries in [database.sql](database.sql).
- Run `npm start` to start the Node server with Nodemon.
- Run `npm run dev` to create a development build with webpack.

- This app was built with mobile-use in mind, it is advised that browser dev tools are used to replicate a mobile or a tablet browser window.

**Tests**

- Run `npm test` to execute the test suite.

## Features

- Basket functionality: Users can add or remove items from inside the menu or inside the basket

- Dynamic delivery charge: £2 for orders below £10, free delivery above £10

- SMS notifications: Successful checkout will be confirmed by an SMS with the order ID

- Design: Fade in-out transitions, parallax, conditional rendering of basket summary

## Questions / Comments?

- Let us know by opening an issue on GitHub!
