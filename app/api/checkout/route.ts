import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe"
import prisma from '@/lib/prisma'; 

const stripe =  new Stripe("sk_test_51QIZDHJYinh3t81VrZz9508aUVqi5fLGx61ZJOI23HhdP9nXww15rbiuKlhwU2RKzRqsynGt6IpAeevz3lLKfEd800n7S0tNLB")

export async function POST(req: NextRequest) {
  try {
   
    const data = await req.json();
    const { priceId } = data; 
    const {userid} = data

   
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', 
      payment_method_types: ['card'], 
      line_items: [
        {
          price: priceId, 
          quantity: 1, 
        },
      ],
      success_url: 'http://localhost:3000/dashboard', 
      cancel_url: 'http://localhost:3000/dashboard', 
    });
    const UserActualizado = await prisma.user.update({
      where:{
        id: userid
      },
      data:{
        premium: true
      }
    })
    console.log("prueba de retorno")
    return NextResponse.json({
      url: session.url, 
      UserActualizado
    });
  } catch (error) {
    console.error('Error al crear la sesión de pago:', error);
    return NextResponse.json({ error: 'No se pudo crear la sesión de pago' }, { status: 500 });
  }
}