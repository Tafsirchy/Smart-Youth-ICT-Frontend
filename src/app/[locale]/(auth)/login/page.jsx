import AuthContainer from "@/components/auth/AuthContainer";

export const metadata = {
  title: "Sign In — Smart Youth ICT",
  description: "Sign in to your SYICT account.",
};

export default function LoginPage() {
  return <AuthContainer defaultTab="login" />;
}
