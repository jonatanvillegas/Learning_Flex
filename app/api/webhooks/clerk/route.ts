import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser } from '@/lib/users';
import { User } from '@prisma/client';

export async function POST(req: Request): Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Por favor, agrega CLERK_WEBHOOK_SECRET desde el panel de Clerk a .env o .env.local'
    );
  }

  // Obtener los headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Si no hay headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    });
  }

  // Obtener el cuerpo
  const payload = await req.json();
  const body = JSON.stringify(payload);


  // Crear una nueva instancia de Svix con tu secreto.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verificar la carga útil con los headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response('Error occurred -- missing data', {
        status: 400
      });
    }

    const user: User = {
      id: id,
      email: email_addresses[0].email_address,
      clerkUserId: id,
      ...(first_name !== undefined ? { firstName: first_name } : { firstName: null }),
      ...(last_name !== undefined ? { lastName: last_name } : { lastName: null }),
      ...(image_url !== undefined ? { imageUrl: image_url } : { imageUrl: null }),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await createUser(user);
  }

  return new Response('el proceso ha finalizado', { status: 200 });
}
