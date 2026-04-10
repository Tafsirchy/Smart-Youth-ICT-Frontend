import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const exchangeAuth = async (path, payload) => {
  const { data } = await axios.post(`${API_BASE_URL}${path}`, payload, {
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
  });

  return data;
};

const toSessionUser = (authData) => ({
  id: authData.user._id,
  name: authData.user.name,
  email: authData.user.email,
  image: authData.user.avatar || null,
  role: authData.user.role,
  branchId: authData.user.branchId || null,
  providers: authData.user.providers || [],
  accessToken: authData.accessToken || authData.token,
});

const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required");
      }

      try {
        const data = await exchangeAuth("/auth/login", credentials);
        if (!data?.accessToken && !data?.token) {
          return null;
        }

        return toSessionUser(data);
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "Invalid email or password",
        );
      }
    },
  }),
];

const hasGoogleCreds =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_ID.startsWith("REPLACE_") &&
  !process.env.GOOGLE_CLIENT_SECRET.startsWith("REPLACE_");

if (hasGoogleCreds) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: "select_account" } },
    }),
  );
}

export const authOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      try {
        const data = await exchangeAuth("/auth/google", {
          idToken: account.id_token,
          name: user.name,
        });

        Object.assign(user, toSessionUser(data));
        return true;
      } catch (error) {
        throw new Error(
          error?.response?.data?.message || "Google sign-in failed",
        );
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.branchId = user.branchId;
        token.providers = user.providers || [];
        token.accessToken = user.accessToken;
        token.picture = user.image || token.picture;
      }

      if (trigger === "update") {
        if (session?.user?.name) token.name = session.user.name;
        if (session?.user?.role) token.role = session.user.role;
        if (session?.user?.branchId) token.branchId = session.user.branchId;
        if (session?.user?.image) token.picture = session.user.image;
        if (session?.name) token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.branchId = token.branchId;
      session.user.providers = token.providers || [];
      session.user.accessToken = token.accessToken;
      session.user.token = token.accessToken;
      if (token.picture) session.user.image = token.picture;
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
