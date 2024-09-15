// Load environment variables from a .env file
require("dotenv").config();

// Initialize the Stripe library using the secret key stored in environment variables
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Define an asynchronous function to handle the incoming event (HTTP request)
exports.handler = async (event) => {
    try {
        // Parse the request body to extract the amount for the payment
        const { amount } = JSON.parse(event.body);

        // Create a new payment intent using Stripe's API with the provided amount and currency (USD)
        const paymentIntent = await stripe.paymentIntents.create({
            amount,                   // Amount to charge
            currency: "usd",           // Currency for the payment
            payment_method_types: ["card"] // Only accept card payments
        });

        // If successful, return a 200 response with the paymentIntent details in the body
        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }) // Return the payment intent object as JSON
        }
    } catch (error) {
        // If an error occurs, return a 400 status and the error message
        return {
            status: 400,                         // Return a bad request status
            body: JSON.stringify({ error })      // Return the error object as JSON
        }
    };
}
