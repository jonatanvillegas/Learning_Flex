import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe"

export async function GET() {

  const stripe =  new Stripe("sk_test_51QIZDHJYinh3t81VrZz9508aUVqi5fLGx61ZJOI23HhdP9nXww15rbiuKlhwU2RKzRqsynGt6IpAeevz3lLKfEd800n7S0tNLB")

  const precios = await stripe.prices.list();

    return NextResponse.json({
        precios:precios,
        message: 'ruta de api /api/precios'
    })
}