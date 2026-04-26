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
  <div className="min-h-screen flex flex-col bg-gray-50">

    {/* ✅ Navbar */}
    <Navbar />

    {/* 🌟 SECTION 1 — HERO */}
    <div className="flex flex-col items-center text-center mt-20 px-6">


      <p className="text-gray-700 max-w-xl mb-6">
        Connecting people who want to help with those who need it.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/posts")}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg shadow"
        >
          Available Food
        </button>

        <button
          onClick={() => navigate("/required-helps")}
          className="bg-white border border-green-600 text-green-600 hover:bg-green-50 transition px-6 py-3 rounded-lg shadow"
        >
          Places That Need Help
        </button>
      </div>
    </div>

<div className="mt-16 px-6 max-w-3xl mx-auto text-center">

  {/* IMAGE */}
  <img
    src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/donation.png"
    alt="Food Donation"
    className="w-60 mx-auto mb-6"
  />

  <h2 className="text-xl font-semibold mb-4">
    The Gap We Bridge
  </h2>

  <p className="text-gray-600 mb-3">
    Many people have extra food they are willing to share,
    but they may not have the time or don’t know where to take it.
  </p>

  <p className="text-gray-600">
    At the same time, there are people who know where help is needed
    whether it’s individuals or street dogs and they are willing to step in.
  </p>
</div>

   <div className="mt-12 px-6 max-w-3xl mx-auto text-center">

  {/* IMAGE */}
  <img
    src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/food.png"
    alt="Helping Community"
    className="w-60 mx-auto mb-6"
  />

  <h2 className="text-xl font-semibold mb-4">
    How PlatePartners Helps
  </h2>

  <p className="text-gray-600 mb-3">
    PlatePartners brings these two groups together.
  </p>

  <p className="text-gray-600 mb-3">
    You can share food if you have it, or you can collect and deliver it
    if you have the time and know where it’s needed.
  </p>

  <p className="text-gray-700 font-medium">
    Together, small actions turn into meaningful help for people and animals
  </p>
</div>

    {/* 🚀 FINAL CTA */}
    <div className="mt-12 mb-10 text-center flex flex-col sm:flex-row gap-4 justify-center">

      <button
        onClick={() => navigate("/posts")}
        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg shadow"
      >
        Share Food
      </button>

      <button
        onClick={() => navigate("/required-helps")}
        className="bg-white border border-green-600 text-green-600 hover:bg-green-50 transition px-6 py-3 rounded-lg shadow"
      >
        Deliver Help
      </button>

    </div>

  </div>
)
}