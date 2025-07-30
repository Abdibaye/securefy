"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

// Zod schema for login form
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function Page() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message
        toast.error(err.message)
      })
      setFormErrors(errors)
      return
    }

    setLoading(true)
    setFormErrors({})
    try {
      const { error } = await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => {
            setLoading(false)
            toast.success("Login successful!")
            router.push("/dashboard")
          },
          onError: (ctx: { error: { message: string } }) => {
            setLoading(false)
            setFormErrors({ general: ctx.error.message })
            toast.error(ctx.error.message)
          },
        }
      )
      if (error) {
        setFormErrors({ general: error.message || "An unexpected error occurred." })
        toast.error(error.message || "An unexpected error occurred.")
        setLoading(false)
      }
    } catch (err: any) {
      setFormErrors({ general: err.message || "An unexpected error occurred." })
      toast.error(err.message || "An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side with logo and background */}
      <div className="flex-1 bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center relative overflow-hidden">
        {/* Decorative curved background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/60 rounded-full opacity-20 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/40 rounded-full opacity-30 transform -translate-x-16 translate-y-16"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 mb-4 relative">
            {/* Shield logo icon */}
            <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">Securfy</h1>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 bg-primary/80 flex items-center justify-center p-8 relative">
        {/* Curved background element */}
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-primary/80">
          <div className="absolute left-0 top-0 w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,0 Q30,50 0,100 L100,100 L100,0 Z" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>
        </div>

        <Card className="w-full max-w-md relative z-10 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <p className="text-sm text-gray-600 mb-2">Secure Access Portal</p>
            <h2 className="text-2xl font-bold text-gray-800">Log in</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {formErrors.general && (
                <div className="text-red-600 text-center text-sm mb-2">
                  {formErrors.general}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.password && (
                  <div className="text-red-600 text-xs">{formErrors.password}</div>
                )}
              </div>

              <div className="flex justify-between items-center text-sm">
                <Link href="/register" className="text-gray-600 hover:text-gray-800">
                  No Account? Register
                </Link>
                <Link href="/forgot-password" className="text-primary hover:text-primary/80">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>

              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div> */}

              {/* <Button
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary/5 font-medium py-2 px-4 rounded-md transition-colors bg-transparent"
                type="button"
                // Implement SSO handler here
              >
                <span className="mr-2">🔐</span>
                Use single sign-on (SSO)
              </Button> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}