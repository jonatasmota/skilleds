import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
