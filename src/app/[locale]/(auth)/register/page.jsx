import AuthContainer from "@/components/auth/AuthContainer";

export const metadata = {
  title: "Register — Smart Youth ICT",
  description: "Create your SYICT account.",
};

export default function RegisterPage() {
  return <AuthContainer defaultTab="register" />;
}
