import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      navigate("/home")
    }
  }

const handleGoogleLogin = async () => {
  const env = import.meta.env.VITE_APP_ENV

  const redirectUrl =
    env === "prod"
      ? "https://platepartners.vercel.app/home"
      : "http://localhost:5173/home"

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
    },
  })
}

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 px-4">

    {/* Card */}
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

      {/* Logo / Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        PlatePartners 🍱
      </h1>

      {/* Tagline */}
      <p className="text-gray-600 mb-6">
        Share food. Reduce waste. Spread kindness.
      </p>

      {/* Illustration / Emoji */}
      <div className="text-5xl mb-6">
        🌱🍛🐶
      </div>

      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium"
      >
        Continue with Google
      </button>

      {/* Footer Note */}
      <p className="text-xs text-gray-400 mt-6">
        By continuing, you join a community that shares and helps others
      </p>
    </div>
  </div>
)
}