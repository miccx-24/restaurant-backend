const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    const { amount, currency, paymentMethodId } = req.body;

    try {
        // Validate input
        if (!amount || !currency || !paymentMethodId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required payment information'
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            metadata: {
                integration_check: 'accept_a_payment'
            }
        });

        res.status(200).json({
            success: true,
            paymentIntent,
            message: 'Payment processed successfully'
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        
        res.status(400).json({
            success: false,
            error: error.message,
            code: error.code,
            type: error.type
        });
    }
};
module.exports = { processPayment };
