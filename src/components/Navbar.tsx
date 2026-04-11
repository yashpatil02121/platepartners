import { useState } from "react"
import { useNavigate, useLocation  } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { ArrowLeft } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const location = useLocation()
  const showBack = location.pathname !== "/home"

  return (
  <div className="fixed top-0 left-0 w-full bg-white shadow px-4 py-3 flex justify-between items-center z-50">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-3">

     {showBack && (
        <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded"
        >
            <ArrowLeft size={20} />
        </button>
        )}

  {/* LOGO */}
  <img
    src="/pp_icon.png"
    alt="PlatePartners Logo"
    className="w-8 h-8 object-contain"
  />


      {/* App Name */}
      <h1
        onClick={() => navigate("/home")}
        className="text-xl font-bold text-green-600 cursor-pointer"
      >
        PlatePartners
      </h1>
    </div>

    {/* RIGHT SECTION */}
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/about")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            About
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Contact Us
          </button>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)
}