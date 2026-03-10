import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@/services/authService';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await authService.login(credentials);
          if (data?.token) {
            return {
              id:    data.user._id,
              name:  data.user.name,
              email: data.user.email,
              role:  data.user.role,
              token: data.token,
            };
          }
        } catch {
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id    = user.id;
        token.role  = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id    = token.id;
      session.user.role  = token.role;
      session.user.token = token.token;
      return session;
    },
  },
  pages: {
    signIn:  '/login',
    error:   '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
