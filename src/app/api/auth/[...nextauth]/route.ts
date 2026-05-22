import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
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
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          const { prisma } = await import("@/lib/prisma")
          const dbUser = await prisma.user.findFirst({
            where: { email: session.user.email }
          })
          if (dbUser) {
            (session.user as any).id = dbUser.id
          }
        } catch (e) {
          console.error("session error:", e)
        }
      }
      return session
    },
    async jwt({ token, user }) {
      return token
    }
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  secret: process.env.NEXTAUTH_SECRET,
} as any)

export { handler as GET, handler as POST }
