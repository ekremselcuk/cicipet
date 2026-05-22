import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      try {
        const { prisma } = await import("@/lib/prisma")
        const existing = await prisma.user.findFirst({
          where: { email: user.email! }
        })
        if (!existing) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "",
              avatarUrl: user.image || null,
              googleId: account?.providerAccountId || "",
            }
          })
        }
        return true
      } catch (e) {
        console.error("signIn error:", e)
        return true
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user?.email) {
        try {
          const { prisma } = await import("@/lib/prisma")
          const dbUser = await prisma.user.findFirst({
            where: { email: session.user.email }
          })
          if (dbUser) {
            session.user.id = dbUser.id
          }
        } catch (e) {
          console.error("session error:", e)
        }
      }
      return session
    },
    async jwt({ token }: { token: any }) {
      return token
    }
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
