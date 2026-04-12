import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import AddPostModal from "../components/AddPostModal"
import Navbar from "../components/Navbar"
import { ChevronDown } from "lucide-react"

export default function FoodPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [openPostId, setOpenPostId] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
    getUser()
  }, [])

const getUser = async () => {
  const { data } = await supabase.auth.getUser()
  setUserId(data.user?.id || null)
}

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("food_posts")
    .select(`
      *,
      requests (
        id,
        volunteer_id,
        status,
        created_at
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  setPosts(data || [])
}

const addPost = async (
  title: string,
  location: string,
  phone: string,
  file: File | null
) => {
  const { data } = await supabase.auth.getUser()
  if (!data.user) return

  // Ensure profile
  await supabase.from("profiles").upsert({
    id: data.user.id,
    name: data.user.user_metadata?.full_name || "User",
  })

  let imageUrl = ""

  // 📸 Upload image if exists
  if (file) {
    const filePath = `public/${Date.now()}-${file.name}`

    const { error: uploadError } =
      await supabase.storage
        .from("food-images")
        .upload(filePath, file)

    if (uploadError) {
      console.error(uploadError)
      alert("Image upload failed")
      return
    }

    // ✅ Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("food-images")
      .getPublicUrl(filePath)

    imageUrl = publicUrlData.publicUrl
  }

  // ✅ Insert post
  const { error } = await supabase.from("food_posts").insert({
    user_id: data.user.id,
    title,
    pickup_location: location,
    phone,
    image_url: imageUrl,
  })

  if (error) {
    console.error(error)
    alert(error.message)
    return
  }

  fetchPosts()
}
const requestPickup = async (postId: string) => {
  const { data } = await supabase.auth.getUser()
  if (!data.user) return

  // ✅ Check if already requested
  const { data: existing } = await supabase
    .from("requests")
    .select("*")
    .eq("food_post_id", postId)
    .eq("volunteer_id", data.user.id)

  if (existing && existing.length > 0) {
    alert("You already requested this post")
    return
  }

  await supabase.from("requests").insert({
    food_post_id: postId,
    volunteer_id: data.user.id,
  })

  fetchPosts()
}

const updateRequest = async (requestId: string, status: string) => {
  const { data, error } = await supabase
    .from("requests")
    .update({ status })
    .eq("id", requestId)
    .select()

  console.log("Updated:", data)

  if (error) {
    console.error(error)
    alert(error.message)
    return
  }

  fetchPosts()
}

return (
  <div className="min-h-screen">

    {/* ✅ Navbar */}
    <Navbar />

    {/* Page Content */}
    <div className="p-6 mt-16 max-w-3xl mx-auto">

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by food or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      {/* Posts */}
      {posts
        .filter((post) => {
          const term = searchTerm.toLowerCase()

          return (
            post.title?.toLowerCase().includes(term) ||
            post.pickup_location?.toLowerCase().includes(term)
          )
        })
        .map((post) => {
          const isOwner = post.user_id === userId

          const alreadyRequested = post.requests?.some(
            (r: any) => r.volunteer_id === userId
          )

          return (
            <div key={post.id} className="bg-white/40 backdrop-blur-md rounded-xl mb-3 border border-white/20 shadow">

  {/* HEADER (Always visible) */}
  <div
    onClick={() =>
      setOpenPostId(openPostId === post.id ? null : post.id)
    }
    className="flex justify-between items-center p-4 cursor-pointer"
  >
    <div>
      <h3 className="font-semibold text-gray-800">{post.title}</h3>
      <p className="text-xs text-gray-500">{post.pickup_location}</p>
    </div>

    {/* ICON */}
    <ChevronDown
  className={`transition-transform ${
    openPostId === post.id ? "rotate-180" : ""
  }`}
/>
  </div>

  {/* COLLAPSIBLE CONTENT */}
  {openPostId === post.id && (
    <div className="px-4 pb-4">

      {/* Image */}
      {post.image_url && (
        <img
          src={post.image_url}
          alt="food"
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      {/* Buttons */}
      {!isOwner && !alreadyRequested && (
        <button
          onClick={() => requestPickup(post.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Request Pickup
        </button>
      )}

      {!isOwner && alreadyRequested && (
        <p className="text-green-600 mt-2">Already Requested</p>
      )}

      {isOwner && (
        <p className="text-purple-600 mt-2 text-xs">
          Your Posted Help!
        </p>
      )}

      {/* Requests */}
      {post.requests && post.requests.length > 0 && (
        <div className="mt-3 border-t pt-2">
          <p className="text-sm font-semibold">Requests:</p>

          {post.requests.map((req: any) => (
            <div
              key={req.id}
              className="text-sm text-gray-600 flex justify-between items-center"
            >
              <span>
                Volunteer: {req.volunteer_id.slice(0, 6)}...
              </span>

              {isOwner ? (
  req.status === "pending" ? (
    <div className="flex gap-2">
      <button
        onClick={() => updateRequest(req.id, "approved")}
        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
      >
        Accept
      </button>

      <button
        onClick={() => updateRequest(req.id, "rejected")}
        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
      >
        Reject
      </button>
    </div>
  ) : (
    <span
      className={`text-xs font-medium ${
        req.status === "approved"
          ? "text-green-600"
          : "text-red-600"
      }`}
    >
      {req.status}
    </span>
  )
                ) : (
                  <span className="text-yellow-600">
                    {req.status}
                  </span>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</div>
          )
        })}
    </div>

    {/* Floating Button */}
    <button
      onClick={() => setOpenModal(true)}
      className="fixed bottom-6 right-6 bg-green-600 text-white w-24 h-12 rounded-full text-sm shadow-lg"
    >
      Add Food
    </button>

    {/* Modal */}
    <AddPostModal
      open={openModal}
      onClose={() => setOpenModal(false)}
      onSubmit={addPost}
    />
  </div>
)
}