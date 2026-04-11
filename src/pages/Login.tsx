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
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-green-600 text-white mt-16 px-6 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  )
}