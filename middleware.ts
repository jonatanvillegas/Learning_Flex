import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/Admin(.*)']);

const idAmdin = 'user_2lGliP3GlCYNwzOASw5F4L46H8J'

export default clerkMiddleware((auth, req) => { 

  const { userId } = auth();

  // Restringir acceso a la vista Admin solo para el admin
  if (isAdminRoute(req)) {
    if (userId === idAmdin) {
      return;
    } else {
      return NextResponse.redirect('http://localhost:3000/dashboard'); // Redirige si un usuario no admin intenta acceder a Admin
    } 
  }
  // Restringir acceso al dashboard solo para usuarios diferentes al admin
  if (isDashboardRoute(req)) {
    if (userId !== idAmdin) {
      return;
    } else {
      return NextResponse.redirect('http://localhost:3000/Admin'); // Redirige si el admin intenta acceder al dashboard
    }
  }

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};