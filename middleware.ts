import { NextResponse, type NextRequest } from 'next/server';
// import { getUserFromSession } from './auth/core/session';
// import { cookies } from 'next/headers';


export async function middleware(request: NextRequest) {
    // const response = (await middlewareAuth(request)) ?? NextResponse.next();

    // return response;
}

// async function middlewareAuth(request: NextRequest) {
//     if(privateRoutes.includes(request.nextUrl.pathname)) {
//         const user = await getUserFromSession(await cookies());
//         if(user == null) {
//             return NextResponse.redirect(new URL("/sign-in", request.url));
//         }
//     }
//     if(adminRoutes.includes(request.nextUrl.pathname)) {
//         const user = await getUserFromSession(await cookies());
//         if(user == null) {
//             return NextResponse.redirect(new URL("/sign-in", request.url));
//         }
//         if(user.role !== "admin") {
//             return NextResponse.redirect(new URL("/", request.url));
//         }
//     }
// }

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    ],
}