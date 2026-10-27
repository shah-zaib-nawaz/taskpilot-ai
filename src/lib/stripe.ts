import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || 'sk_test_sample_key_taskpilot',
  {
    apiVersion: '2025-02-24.acacia' as any,
    typescript: true,
  }
);

export async function createStripeCheckoutSession({
  orgSlug,
  organizationId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  orgSlug: string;
  organizationId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: customerEmail,
    client_reference_id: organizationId,
    metadata: {
      orgSlug,
      organizationId,
    },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'TaskPilot AI Pro Tier',
            description: 'Unlimited projects, unlimited members, and 500 AI generations/month',
          },
          unit_amount: 2900, // $29.00
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export async function createStripePortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
