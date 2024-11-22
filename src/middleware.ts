import { NextRequest, NextResponse } from 'next/server';
import { routes } from './app/utils/routes';

//TODO if goes to public route & is logged.. maybe default routing.
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const requestedPath = req.nextUrl.pathname;
  const listRoutes = routes;

  //Get the requested route from my list
  const requestedRoute = listRoutes.find((eachRoute) => eachRoute.url === requestedPath);

  //If not found, 404, dont want to access something not defined by us.
  if (!requestedRoute) return new NextResponse('Not Found', { status: 404 });

  //If its public, we dont care for now
  if (!requestedRoute.private) return NextResponse.next();

  //When my route is private, we must validate session
  const isValidSession = await validateSession(req);

  //Not valid session, forbidden access.
  if (!isValidSession) {
    return new NextResponse('Forbidden Access', { status: 403 });
  }

  return NextResponse.next();
}

//TODO probably in auth.serivice to isolate the responsability
async function validateSession(req: NextRequest): Promise<boolean> {
  // Implement your session validation logic here
  return true; // Example: Replace with actual validation
}

// Routes Middleware should not run on
export const config = {
  matcher: '/backoffice/:path*', // Matches all routes
};
