"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const locale = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    else if (!/[A-Z]/.test(form.password))
      newErrors.password = "Must contain at least one uppercase letter.";
    else if (!/[0-9]/.test(form.password))
      newErrors.password = "Must contain at least one number.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      await authService.register(data);
      toast.success("Registration successful! Please log in.");
      router.push(`/${locale}/login`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { id: "name",            label: "Full Name",        type: "text",     placeholder: "Md. Abdur Rahman" },
    { id: "email",           label: "Email",            type: "email",    placeholder: "you@example.com" },
    { id: "phone",           label: "Phone (bKash)",    type: "tel",      placeholder: "01XXXXXXXXX" },
    { id: "password",        label: "Password",         type: "password", placeholder: "Min 8 chars, uppercase & number" },
    { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter your password" },
  ];

  return (
    <div className="card w-full max-w-md p-8">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex justify-center">
          <img src="/images/logo.png" alt="SYICT Logo" className="h-10 w-auto object-contain" />
        </Link>
        <h1 className="text-xl font-bold text-textPrimary mt-1">Create your account</h1>
        <p className="text-textSecondary text-sm mt-1">Start your IT career today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label className="block text-sm font-medium text-textPrimary mb-1">{label}</label>
            <input
              id={id}
              type={type}
              required
              className={`input w-full ${errors[id] ? "border-red-400" : ""}`}
              placeholder={placeholder}
              value={form[id]}
              onChange={(e) => {
                setForm({ ...form, [id]: e.target.value });
                setErrors((prev) => ({ ...prev, [id]: undefined }));
              }}
            />
            {errors[id] && (
              <p className="text-xs text-red-500 mt-1">{errors[id]}</p>
            )}
          </div>
        ))}

        <button
          id="register-btn"
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={loading}
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-textSecondary mt-6">
        Already have an account?{" "}
        <Link href={`/${locale}/login`} className="text-brand-pink font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
