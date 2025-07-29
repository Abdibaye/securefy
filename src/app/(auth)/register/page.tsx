"use client"
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Shield, User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Zod schema for registration form
const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  terms: z.literal(true, {
    message: "You must accept the terms.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setFormErrors((prev) => {
      const updated = { ...prev };
      delete updated[field as string];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      // Map zod errors to form fields
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      if (Object.values(errors).length > 0) {
        toast.error(Object.values(errors)[0]);
      }
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false);
            router.push("/login?signup=success");
          },
          onError: (ctx: { error: { message: string } }) => {
            setLoading(false);
            setFormErrors({ general: ctx.error.message });
            toast.error(ctx.error.message);
          },
        }
      );

      if (error) {
        setFormErrors({ general: error.message ?? "An unexpected error occurred." });
        toast.error(error.message ?? "An unexpected error occurred.");
        setLoading(false);
      }
    } catch (err: any) {
      setFormErrors({ general: err.message || "An unexpected error occurred." });
      toast.error(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with logo and background */}
      <div className="flex-1 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/60 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/40 rounded-full opacity-30 transform -translate-x-16 translate-y-16"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-4 relative">
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">Securfy</h1>
          <p className="text-white/80 mt-2 text-center max-w-sm">
            Join thousands of users who trust Securfy for their security needs
          </p>
        </div>
      </div>
      {/* Right side with register form */}
      <div className="flex-1 bg-primary/80 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-primary/80">
          <div className="absolute left-0 top-0 w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,0 Q30,50 0,100 L100,100 L100,0 Z" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>
        </div>
        <Card className="w-full max-w-md relative z-10 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <p className="text-sm text-gray-600 mb-2">Create Your Account</p>
            <h2 className="text-2xl font-bold text-gray-800">Sign up</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {/* General error is now shown via toast, but keep this for accessibility if needed */}
              {formErrors.general && (
                <div className="sr-only" aria-live="polite">
                  {formErrors.general}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`w-full px-3 py-2 pl-10 border ${formErrors.fullName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {formErrors.fullName && (
                  <div className="text-red-600 text-xs">{formErrors.fullName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-3 py-2 pl-10 border ${formErrors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {formErrors.email && (
                  <div className="text-red-600 text-xs">{formErrors.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full px-3 py-2 pl-10 pr-10 border ${formErrors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.password && (
                  <div className="text-red-600 text-xs">{formErrors.password}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full px-3 py-2 pl-10 pr-10 border ${formErrors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <div className="text-red-600 text-xs">{formErrors.confirmPassword}</div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className={`w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 ${formErrors.terms ? "border-red-500" : ""}`}
                  checked={formData.terms}
                  onChange={(e) => handleInputChange("terms", e.target.checked)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {formErrors.terms && (
                <div className="text-red-600 text-xs">{formErrors.terms}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <div className="text-center text-sm">
              <Link href="/login" className="text-gray-600 hover:text-gray-800">
                Already have an account? Log in
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-primary/20 text-primary hover:bg-primary/5 font-medium py-2 px-4 rounded-md transition-colors bg-transparent"
              type="button"
              // Implement SSO handler here
            >
              <span className="mr-2">🔐</span>
              Sign in with Fayda E-Signet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}