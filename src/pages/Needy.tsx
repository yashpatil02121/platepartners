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
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchNeedy()
    fetchFoods()
  }, [])

  // 🟢 Fetch Needy + Deliveries
const fetchNeedy = async () => {
  const { data, error } = await supabase
    .from("needy_requests")
    .select(`
      *,
      deliveries (
        id,
        status,
        food_post_id,
        food_posts (
          id,
          title,
          pickup_location
        )
      )
    `)
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
      // .select("*")
      .select(`
        *,
        deliveries (
          id,
          status,
          food_post_id,
          food_posts (
            id,
            title,
            pickup_location
          )
        )
      `)
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

  // 🟢 Add Food
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
    fetchNeedy()
  }

  // 🟢 Collect ALL linked food IDs (GLOBAL)
  const allLinkedFoodIds = data.flatMap((n) =>
    n.deliveries?.map((d: any) => d.food_post_id) || []
  )

  // 🟢 Filter foods (no reuse)
  const filteredFoods = foods.filter((food) => {
    const term = foodSearch.toLowerCase()

    const matchesSearch =
      food.title?.toLowerCase().includes(term) ||
      food.pickup_location?.toLowerCase().includes(term)

    const alreadyLinkedAnywhere = allLinkedFoodIds.includes(food.id)

    return matchesSearch && !alreadyLinkedAnywhere
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 mt-16 max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">
          Places Where Help is Needed
        </h1>
        <input
  type="text"
  placeholder="Search by place, type, or title..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full mb-4 p-2 border rounded"
/>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {data
  .filter((item) => {
    const term = searchTerm.toLowerCase()

    return (
      item.title?.toLowerCase().includes(term) ||
      item.location?.toLowerCase().includes(term) ||
      item.type?.toLowerCase().includes(term)
    )
  })
  .map((item) => (
    <div
      key={item.id}
      className="bg-white/40 backdrop-blur-md rounded-xl border border-white/20 shadow"
    >
      {/* Image */}
      {item.image_url && (
        <img
          src={item.image_url}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      )}

      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold">{item.title}</h3>

        {/* Location */}
        <p className="text-gray-600 text-sm">{item.location}</p>

        {/* Type */}
        <p className="text-xs text-gray-500 mt-1">
          {item.type === "animals" ? "🐶 Animals" : "👤 People"}
        </p>

        {/* Phone */}
        {item.phone && (
          <p className="text-sm mt-2">📞 {item.phone}</p>
        )}

        {/* 🔗 Deliveries */}
        {item.deliveries && item.deliveries.length > 0 && (
          <div className="mt-3 border-t pt-2">
            <p className="text-sm font-semibold text-green-700">
              Nearby Food to be Delivered:
            </p>

            {item.deliveries.map((d: any) => (
              <div
                key={d.id}
                className="text-sm text-gray-600 flex justify-between"
              >
                <span>{d.food_posts?.title}</span>
                <span className="text-xs text-gray-500">
                  {d.food_posts?.pickup_location}
                </span>
              </div>
            ))}
          </div>
        )}
        {/* Button */}
        <button
          onClick={() => {
            setSelectedNeedyId(item.id)
            setOpenDeliveryModal(true)
          }}
          className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
        >
          Deliver Food
        </button>
      </div>
    </div>
  ))}
</div>
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

            <input
              type="text"
              placeholder="Search food or location..."
              value={foodSearch}
              onChange={(e) => setFoodSearch(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            {filteredFoods.length === 0 && (
              <p className="text-sm text-gray-500 mb-2">
                No available food (already used or none added)
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

            <button
              onClick={() => {
                setOpenDeliveryModal(false)
                setOpenFoodModal(true)
              }}
              className="mt-3 bg-gray-100 text-gray-700 px-3 py-2 rounded w-full hover:bg-gray-200"
            >
              + Add New Food Post
            </button>

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