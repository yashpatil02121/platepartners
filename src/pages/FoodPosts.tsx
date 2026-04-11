import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function FoodPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

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

const addPost = async () => {
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    alert("Please login")
    return
  }

  // ✅ STEP 1: Ensure profile exists (VERY IMPORTANT)
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({
      id: data.user.id,
      name: data.user.user_metadata?.full_name || "User",
    })

  if (profileError) {
    console.error("Profile Error:", profileError)
    alert("Profile creation failed")
    return
  }

  // ✅ STEP 2: Insert food post
  const { error } = await supabase.from("food_posts").insert({
    user_id: data.user.id,
    title,
    pickup_location: location,
  })

  if (error) {
    console.error("Insert Error:", error)
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
  const { error } = await supabase
    .from("requests")
    .update({ status })
    .eq("id", requestId)

  if (error) {
    console.error(error)
    alert("Failed to update request")
    return
  }

  fetchPosts()
}

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Add Post */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Food title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Pickup location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={addPost}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Food
        </button>
      </div>

      {/* Posts */}
      {posts.map((post) => {
        const isOwner = post.user_id === userId

        const alreadyRequested = post.requests?.some(
          (r: any) => r.volunteer_id === userId
        )

  return (
    <div key={post.id} className="bg-white p-4 mb-3 rounded shadow">
      <h3 className="font-bold">{post.title}</h3>
      <p className="text-gray-600">{post.pickup_location}</p>

      {/* ✅ Conditional Button */}
      {/* ✅ If NOT owner AND NOT already requested */}
      {!isOwner && !alreadyRequested && (
        <button
          onClick={() => requestPickup(post.id)}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Request Pickup
        </button>
      )}

      {/* ✅ If already requested */}
      {!isOwner && alreadyRequested && (
        <p className="text-green-600 mt-2">Already Requested</p>
      )}

      {/* ✅ If owner */}
      {isOwner && (
        <p className="text-purple-600 mt-2">Your Post</p>
      )}

      {/* 🔥 Show Requests */}
      {post.requests && post.requests.length > 0 && (
        <div className="mt-3 border-t pt-2">
          <p className="text-sm font-semibold">Requests:</p>

          {post.requests.map((req: any) => (
          <div
            key={req.id}
            className="text-sm text-gray-600 flex justify-between items-center"
          >
            <span>Volunteer: {req.volunteer_id.slice(0, 6)}...</span>

            {/* ✅ If owner → show actions */}
            {isOwner ? (
              <div className="flex gap-2">
                <button
                  onClick={() => updateRequest(req.id, "accepted")}
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
              <span className="text-yellow-600">{req.status}</span>
            )}
          </div>
        ))}
        </div>
      )}
    </div>
  )
})}
    </div>
  )
}