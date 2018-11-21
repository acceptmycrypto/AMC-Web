console.log("keys are loaded");
exports.coinpayment = {
  key: process.env.COINPAYMENT_PUBLIC_KEY,
  secret: process.env.COINPAYMENT_PRIVATE_KEY,
  MERCHANT_ID: process.env.COINPAYMENT_MERCHANT_ID,
  IPN_SECRET: process.env.COINPAYMENT_IPN_SECRET
};

exports.sendgrid = process.env.SENDGRID_API_KEY;

exports.JWT_SECRET = process.env.JWT_SECRET;