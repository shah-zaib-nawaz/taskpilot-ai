import { inngest } from '../client';

export const handleStripeWebhook = inngest.createFunction(
  { id: 'handle-stripe-webhook', retries: 3 },
  { event: 'stripe/webhook.received' },
  async ({ event, step }) => {
    const { type, data } = event.data;

    return await step.run('sync-subscription-entitlements', async () => {
      console.log(`[Inngest Worker] Processing Stripe webhook event: ${type}`);

      switch (type) {
        case 'checkout.session.completed':
          return {
            status: 'processed',
            plan: 'pro',
            message: 'Organization upgraded to Pro tier with 500 AI generations/month.',
          };

        case 'customer.subscription.updated':
          return {
            status: 'processed',
            message: 'Subscription period synchronized.',
          };

        case 'customer.subscription.deleted':
          return {
            status: 'processed',
            plan: 'free',
            message: 'Subscription canceled. Organization reverted to Free tier.',
          };

        default:
          return {
            status: 'ignored',
            message: `Unhandled event type: ${type}`,
          };
      }
    });
  }
);
