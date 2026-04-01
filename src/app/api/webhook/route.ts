import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const userId = session.metadata?.userId;
    const orderItems = session.metadata?.orderItems ? JSON.parse(session.metadata.orderItems) : [];

    if (userId) {
      try {
        await prisma.order.create({
          data: {
            userId: userId,
            total: session.amount_total ? session.amount_total / 100 : 0,
            status: 'PENDING',
            items: {
              create: orderItems.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                priceAtTime: 0, 
              })),
            },
          },
        });
        console.log("Stripe fulfillment: Order successfully persisted in DB.");
      } catch (err: any) {
        console.error("Failed to commit stripe order to DB:", err);
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}
