import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sin configuración válida de Supabase (falta la env o la URL no es un
  // https://...), dejar pasar la request en lugar de tumbar todo el sitio con
  // un 500. La landing y el login siguen disponibles.
  if (!supabaseUrl || !supabaseKey || !/^https?:\/\//.test(supabaseUrl)) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  try {
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {
    // Error transitorio o de configuración: tratar como no autenticado
    user = null;
  }

  const { pathname } = request.nextUrl;

  // Rutas públicas — siempre permitidas
  const publicPaths = ["/", "/login"];
  if (publicPaths.includes(pathname)) {
    // Si ya está autenticado y va al login, redirigir al dashboard
    if (user && pathname === "/login") {
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      const dest = profile?.role === "patient"
        ? "/portal"
        : "/dashboard";

      return NextResponse.redirect(new URL(dest, request.url));
    }
    return supabaseResponse;
  }

  // Rutas protegidas — requieren sesión
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protección por rol
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role;

  if (pathname.startsWith("/dashboard") && role !== "institution") {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  if (pathname.startsWith("/portal") && role !== "patient") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
