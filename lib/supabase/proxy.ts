import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);

            supabaseResponse.cookies.set(
              name,
              value,
              options
            );
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isStaffPage = pathname.startsWith("/staff");
  const isLoginPage = pathname === "/staff/login";

  /*
   * BELUM LOGIN
   * Tidak boleh membuka halaman staff.
   */
  if (isStaffPage && !isLoginPage && !user) {
    const url = request.nextUrl.clone();

    url.pathname = "/staff/login";
    url.search = "";

    return NextResponse.redirect(url);
  }

  /*
   * SUDAH LOGIN TAPI BUKAN KASIR/STAFF
   */
  if (isStaffPage && !isLoginPage && user) {
    const role = user.app_metadata?.role;

    if (role !== "kasir" && role !== "staff") {
      const url = request.nextUrl.clone();

      url.pathname = "/staff/login";
      url.search = "error=unauthorized";

      return NextResponse.redirect(url);
    }
  }

  /*
   * SUDAH LOGIN DAN MEMBUKA LOGIN
   */
  if (isLoginPage && user) {
    const role = user.app_metadata?.role;

    if (role === "kasir" || role === "staff") {
      const url = request.nextUrl.clone();

      url.pathname = "/staff";
      url.search = "";

      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}