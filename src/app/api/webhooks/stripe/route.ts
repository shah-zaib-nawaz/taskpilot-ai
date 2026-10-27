import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { inngest } from '@/inngest/client';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: any;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // Test-mode / mock fallback parser
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Dispatch to Inngest for durable, idempotent processing with exponential retries
  try {
    await inngest.send({
      name: 'stripe/webhook.received',
      data: {
        type: event.type,
        data: event.data?.object || event,
      },
    });
  } catch (err) {
    console.error('Failed to dispatch webhook event to Inngest:', err);
  }

  return NextResponse.json({ received: true });
}
