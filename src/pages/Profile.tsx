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
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6 mt-16 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {user && (
          <div className="bg-white p-4 rounded shadow">
            <p><strong>Name:</strong> {user.user_metadata?.full_name || "User"}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>
    </div>
  )
}