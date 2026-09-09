import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // =========================
  // CEK USER LOGIN
  // =========================
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // =========================
  // HALAMAN LOGIN
  // =========================
  const isLoginPage =
    pathname === "/staff/login";

  // =========================
  // HALAMAN ADMIN
  // =========================
  const isAdminPage =
    pathname.startsWith("/admin");

  // =========================
  // HALAMAN STAFF
  // =========================
  const isStaffPage =
    pathname.startsWith("/staff") &&
    !isLoginPage;

  // =========================
  // BELUM LOGIN
  // =========================
  if ((isAdminPage || isStaffPage) && !user) {
    const url = request.nextUrl.clone();

    url.pathname = "/staff/login";

    return NextResponse.redirect(url);
  }

  // =========================
  // SUDAH LOGIN
  // =========================
  if (user) {
    const role =
      user.app_metadata?.role || "staff";

    // =========================
    // ADMIN TIDAK PERLU LOGIN LAGI
    // =========================
    if (isLoginPage && role === "admin") {
      const url = request.nextUrl.clone();

      url.pathname = "/admin";

      return NextResponse.redirect(url);
    }

    // =========================
    // STAFF TIDAK PERLU LOGIN LAGI
    // =========================
    if (isLoginPage && role !== "admin") {
      const url = request.nextUrl.clone();

      url.pathname = "/staff";

      return NextResponse.redirect(url);
    }

    // =========================
    // STAFF DILARANG MASUK ADMIN
    // =========================
    if (isAdminPage && role !== "admin") {
      const url = request.nextUrl.clone();

      url.pathname = "/staff";

      return NextResponse.redirect(url);
    }
  }

  return response;
}

// =========================
// ROUTE YANG DIPROTEKSI
// =========================
export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
  ],
};