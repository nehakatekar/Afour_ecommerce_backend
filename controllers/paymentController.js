const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51KKcEVSIlsku9NJscTZYgNGdCWHJUsAmMkULA25pp5wd4MEuxotSE1egOUAeal7xPpauc0SMSYb4XwmLhS4j9ctp00dfGdnASd');
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
