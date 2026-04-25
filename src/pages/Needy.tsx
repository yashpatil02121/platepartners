import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../components/Navbar"
import AddNeedyModal from "../components/AddNeedyModal"

export default function Needy() {
  const [data, setData] = useState<any[]>([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase
      .from("needy_requests")
      .select("*")
      .order("created_at", { ascending: false })

    setData(data || [])
  }

  const addNeedy = async ({ title, location, phone, type, file }: any) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    let imageUrl = ""

    if (file) {
      const filePath = `needy/${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("food-images")
        .upload(filePath, file)

      if (error) {
        alert("Image upload failed")
        return
      }

      const { data } = supabase.storage
        .from("food-images")
        .getPublicUrl(filePath)

      imageUrl = data.publicUrl
    }

    await supabase.from("needy_requests").insert({
      user_id: userData.user.id,
      title,
      location,
      phone,
      type,
      image_url: imageUrl,
    })

    fetchData()
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="p-6 mt-16 max-w-3xl mx-auto">

        <h1 className="text-xl font-semibold mb-4">
          Places Where Help is Needed
        </h1>

        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 mb-3 rounded shadow">

            {item.image_url && (
              <img
                src={item.image_url}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-gray-600 text-sm">
              {item.location}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {item.type === "animals" ? "🐶 Animals" : "👤 People"}
            </p>

            {item.phone && (
              <p className="text-sm mt-2">📞 {item.phone}</p>
            )}
          </div>
        ))}
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white w-24 h-12 rounded-full shadow"
      >
        Add
      </button>

      {/* Modal */}
      <AddNeedyModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={addNeedy}
      />
    </div>
  )
}