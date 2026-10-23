import NextAuth from "next-auth";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getApiBaseUrl } from "./api-base";

const API_BASE_URL = getApiBaseUrl({ absolute: true });

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
  secondaryBranches: authData.user.secondaryBranches || [],
  permissions: authData.user.permissions || [],
  providers: authData.user.providers || [],
  accessToken: authData.accessToken || authData.token,
});

const providers = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
      twoFactorCode: { label: "2FA Code", type: "text" },
      tempToken: { label: "Temp Token", type: "text" },
    },
    async authorize(credentials) {
      if ((!credentials?.email || !credentials?.password) && (!credentials?.tempToken || !credentials?.twoFactorCode)) {
        throw new Error("Email and password or 2FA verification code are required");
      }

      try {
        const data = await exchangeAuth("/auth/login", credentials);
        if (data?.require2FA) {
          throw new Error(`2FA_REQUIRED:${JSON.stringify(data)}`);
        }
        if (!data?.accessToken && !data?.token) {
          return null;
        }

        return toSessionUser(data);
      } catch (error) {
        if (error.message?.startsWith("2FA_REQUIRED:")) {
          throw error;
        }

        const message = error?.response?.data?.message;
        if (message) throw new Error(message);

        if (error.code === "ECONNREFUSED" || !error.response) {
          throw new Error("Unable to connect to authentication server. Please try again later.");
        }

        throw new Error(error.message || "An unexpected error occurred. Please try again.");
      }
    },
  }),
];

const hasGoogleCreds =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.GOOGLE_CLIENT_ID.trim().startsWith("REPLACE_") &&
  !process.env.GOOGLE_CLIENT_SECRET.trim().startsWith("REPLACE_");

if (hasGoogleCreds) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
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
        token.secondaryBranches = user.secondaryBranches || [];
        token.permissions = user.permissions || [];
        token.providers = user.providers || [];
        token.accessToken = user.accessToken;
        token.picture = user.image || token.picture;
      }

      if (trigger === "update") {
        if (session?.user?.name) token.name = session.user.name;
        if (session?.user?.image) token.picture = session.user.image;
        if (session?.name) token.name = session.name;
        if (session?.user?.role) token.role = session.user.role;
        if (session?.user?.branchId !== undefined) token.branchId = session.user.branchId;
        if (session?.user?.secondaryBranches) token.secondaryBranches = session.user.secondaryBranches;
        if (session?.user?.permissions) token.permissions = session.user.permissions;
        if (session?.user?.accessToken) token.accessToken = session.user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.branchId = token.branchId;
      session.user.secondaryBranches = token.secondaryBranches || [];
      session.user.permissions = token.permissions || [];
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
  secret: (() => {
    const s = process.env.NEXTAUTH_SECRET?.trim();
    if (!s || s.startsWith('REPLACE_') || s.length < 16) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('FATAL: A strong, unguessable NEXTAUTH_SECRET (min 32 chars) is required in production.');
      }
      console.warn('[SECURITY WARNING] NEXTAUTH_SECRET is weak or unset. Sessions are vulnerable.');
    }
    return s;
  })(),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
