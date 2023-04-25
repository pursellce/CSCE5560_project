// importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');
const { pathToFileURL } = require('url');
const stripe = require('stripe')('sk_test_51MzkXaEJsQttsu4Fyt2KWQlRsfkjXH0s3x4O9MIYQTrG57zSoFlPkaaOXaDOui6H4zD93inDiJltFFdHYKTThZng00340CWJ3J'); // secret key

// checkout session
app.post(path.join(__dirname,"/checkout-session"), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            //item price id 
            amount: 'price_1N0XkjEJsQttsu4FFmP5PYDi',
            quantity: 1,
            }
        ],
        node: 'payment',
        success_url: 'https://csce5560-project.web.app/',
        cancel_url: 'https://csce5560-project.web.app/',
    });
    
// Redirect to the URL returned on the Checkout Session.
    res.redirect(303, session.url);
   
});

//intializing expess.js

const app = express();

//routes
//home route
app.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"public","Home.html"));
})

app.listen(3000,() => {
    console.log('listening on port 3000.......')
})