import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../components/Navbar"

export default function Profile() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="flex justify-center items-center mt-12 px-4">
        {user && (
          <div className="w-full max-w-md border border-white/20  mt-10 p-6">

            {/* Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={
                  user.user_metadata?.avatar_url ||
                  user.user_metadata?.picture
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              />

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user.user_metadata?.full_name || "User"}
              </h2>

              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}