import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../components/Navbar"
import AddNeedyModal from "../components/AddNeedyModal"
import AddPostModal from "../components/AddPostModal"

export default function Needy() {
  const [data, setData] = useState<any[]>([])
  const [foods, setFoods] = useState<any[]>([])

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openDeliveryModal, setOpenDeliveryModal] = useState(false)
  const [openFoodModal, setOpenFoodModal] = useState(false)

  const [selectedNeedyId, setSelectedNeedyId] = useState<string | null>(null)
  const [foodSearch, setFoodSearch] = useState("")

  useEffect(() => {
    fetchNeedy()
    fetchFoods()
  }, [])

  // 🟢 Fetch Needy
  const fetchNeedy = async () => {
    const { data, error } = await supabase
      .from("needy_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setData(data || [])
  }

  // 🟢 Fetch Foods
  const fetchFoods = async () => {
    const { data, error } = await supabase
      .from("food_posts")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setFoods(data || [])
  }

  // 🟢 Add Needy
  const addNeedy = async ({ title, location, phone, type, file }: any) => {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    let imageUrl = ""

    if (file) {
      const filePath = `needy/${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("needy-images")
        .upload(filePath, file)

      if (error) {
        alert("Image upload failed")
        return
      }

      const { data } = supabase.storage
        .from("needy-images")
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

    fetchNeedy()
  }

  // 🟢 Add Food (from modal)
  const addFood = async (title: string, location: string, file: File | null) => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return

    let imageUrl = ""

    if (file) {
      const filePath = `food/${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("food-images")
        .upload(filePath, file)

      if (error) {
        alert("Upload failed")
        return
      }

      const { data: urlData } = supabase.storage
        .from("food-images")
        .getPublicUrl(filePath)

      imageUrl = urlData.publicUrl
    }

    await supabase.from("food_posts").insert({
      user_id: data.user.id,
      title,
      pickup_location: location,
      image_url: imageUrl,
    })

    fetchFoods()
  }

  // 🟢 Link Food → Needy
  const linkFood = async (foodId: string) => {
    const { data } = await supabase.auth.getUser()
    if (!data.user || !selectedNeedyId) return

    const { error } = await supabase.from("deliveries").insert({
      food_post_id: foodId,
      needy_request_id: selectedNeedyId,
      volunteer_id: data.user.id,
    })

    if (error) {
      console.error(error)
      alert("Failed to link")
      return
    }

    alert("Delivery linked successfully!")
    setOpenDeliveryModal(false)
  }

  const filteredFoods = foods.filter((food) => {
    const term = foodSearch.toLowerCase()
    return (
      food.title?.toLowerCase().includes(term) ||
      food.pickup_location?.toLowerCase().includes(term)
    )
  })

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

            <p className="text-gray-600 text-sm">{item.location}</p>

            <p className="text-xs text-gray-500 mt-1">
              {item.type === "animals" ? "🐶 Animals" : "👤 People"}
            </p>

            {item.phone && (
              <p className="text-sm mt-2">📞 {item.phone}</p>
            )}

            <button
              onClick={() => {
                setSelectedNeedyId(item.id)
                setOpenDeliveryModal(true)
              }}
              className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
            >
              Available Food
            </button>
          </div>
        ))}
      </div>

      {/* ➕ Add Needy */}
      <button
        onClick={() => setOpenAddModal(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white w-24 h-12 rounded-full shadow"
      >
        Add
      </button>

      <AddNeedyModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={addNeedy}
      />

      {/* 🚚 Delivery Modal */}
      {openDeliveryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded w-96 max-h-[80vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-3">
              Select Food to Deliver
            </h2>

            {/* 🔍 Search */}
            <input
              type="text"
              placeholder="Search food or location..."
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            {/* Food List */}
            {filteredFoods.length === 0 && (
              <p className="text-sm text-gray-500 mb-2">
                No matching food found
              </p>
            )}

            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="border p-2 mb-2 rounded cursor-pointer hover:bg-gray-50"
                onClick={() => linkFood(food.id)}
              >
                <p className="font-medium">{food.title}</p>
                <p className="text-xs text-gray-500">
                  {food.pickup_location}
                </p>
              </div>
            ))}

            {/* ➕ Add Food */}
            <button
              onClick={() => {
                setOpenDeliveryModal(false)
                setOpenFoodModal(true)
              }}
              className="mt-3 bg-gray-100 text-gray-700 px-3 py-2 rounded w-full hover:bg-gray-200"
            >
              + Add New Food Post
            </button>

            {/* Cancel */}
            <button
              onClick={() => setOpenDeliveryModal(false)}
              className="mt-2 border px-3 py-1 rounded w-full"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ➕ Food Modal */}
      <AddPostModal
        open={openFoodModal}
        onClose={() => setOpenFoodModal(false)}
        onSubmit={addFood}
      />
    </div>
  )
}