import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/Admin(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, orgRole } = auth();


  // Restringir acceso a la vista Admin solo para usuarios con rol de Admin
  if (isAdminRoute(req)) {
    if (orgRole === 'org:admin') {
      return NextResponse.next(); // Permitir acceso si es admin de la organización
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirigir si no es admin
    }
  }

  // Restringir acceso al dashboard para usuarios que son Admin
  if (isDashboardRoute(req)) {
    if (orgRole === 'org:admin') {
      return NextResponse.redirect(new URL('/Admin', req.url)); // Redirigir si es admin
    } else {
      return NextResponse.next(); // Permitir acceso si no es admin
    }
  }

  return NextResponse.next(); // Continuar para otras rutas
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
