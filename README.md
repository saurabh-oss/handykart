# handykart
Web application for an online shop using ReactJS and Microservices based backend with MongoDB NoSql database.

## Technology
- Web application: ReactJS
- Database: MongoDB
- Microservices: Quarkus
- Hosting: RedHat OpenShift containerized platform

## Features
1. Home page with Header, Footer, Main content displaying list of products in simple Bootstrap card view
2. Main navigation menu items containing Home, Register, Login and Cart
3. Product details page displaying product's title, price, description and reviews
4. Cart displaying selected products with unit price, quantity and total price
5. Checkout to display a placed order details page without any payment integration (@TODO)
6. User registration form
7. User login form
8. Data persisted into MongoDB
9. Data getting loaded using Quarkus microservices

## Quickstart with HandyKart project
1. Install NodeJS (latest stable version is preferred)
2. Test installation using commands `node --version` & `npm --version`
3. Clone this project into an empty directory using command `git clone https://github.com/s-a-u-r-a-b-h/handykart.git`
4. Navigate to the project directory using command `cd handykart`
5. Insall all dependencies using the command `npm install` and run the project directly using command `npm start`

A browser window will automatically be opened and you will find the application running on `localhost:3000`.
