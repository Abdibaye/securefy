import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Users, Zap, Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Header */}
      <header className="relative z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-white" />
          <span className="text-lg font-semibold text-white">Securfy</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            About Securfy
          </Link>
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Sun className="h-6 w-6 text-white cursor-pointer" />
          <Link href="/login">
            <Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground px-4 py-2 rounded-l-lg text-sm font-semibold">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Large circular gradient background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-gray-800/30 via-gray-900/20 to-transparent"></div>
      </div>

      {/* Floating profile elements */}
      <div className="absolute top-32 left-16 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
        <Shield className="w-8 h-8 text-white" />
      </div>

      <div className="absolute top-48 right-24 w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-white" />
      </div>

      <div className="absolute bottom-48 left-32 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
        <Users className="w-7 h-7 text-white" />
      </div>

      <div className="absolute bottom-32 right-32 w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
        <Zap className="w-5 h-5 text-white" />
      </div>

      <div className="absolute top-64 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500"></div>
      <div className="absolute bottom-64 right-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Where secure identity meets the power of <span className="text-white">verification</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ethiopia's leading identity verification platform. Streamline KYC processes, prevent fraud, and build trust
            with secure, AI-powered verification solutions.
          </p>

          <Link href="/register">
            <Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground px-6 py-3 rounded-l-lg text-lg font-semibold">
              Request Access
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">Trusted by 500+ Ethiopian businesses</p>
        </div>
      </div>
    </div>
  )
}
