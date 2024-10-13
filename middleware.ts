import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/api/get_user/:path*",
    "/api/update_user/:path*",
    "/api/generate_cover_letter/:path*",
  ],
};
