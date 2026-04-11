import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const setupUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error(error)
        return navigate("/")
      }

      if (!data.user) {
        return navigate("/")
      }

      // ✅ Ensure profile exists
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: data.user.id,
          name: data.user.user_metadata?.full_name || "User",
        })

      if (profileError) {
        console.error("Profile error:", profileError)
      }
    }

    setupUser()
  }, [])

 return (
  <div className="min-h-screen flex flex-col">

    {/* ✅ Navbar */}
    <Navbar />

    {/* Main Content */}
    <div className="flex flex-col items-center justify-center text-center p-6 flex-1">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to PlatePartners 🍱
      </h1>

      <p className="mb-6 text-gray-600 max-w-md">
        Share your extra food and help others. Reduce waste, spread kindness.
      </p>

      <button
        onClick={() => navigate("/posts")}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        View Food Posts
      </button>
    </div>
  </div>
)
}