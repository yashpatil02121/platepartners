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
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://platepartners.vercel.app/",
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  )
}