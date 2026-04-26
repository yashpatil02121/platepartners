import { useEffect, useState } from "react"

export default function EditPostModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: any) {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "")
      setLocation(initialData.pickup_location || "")
      setPhone(initialData.phone || "")
    }
  }, [initialData])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-lg font-semibold mb-4">
          Edit Food Post
        </h2>

        <input
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit({ title, location, phone })
              onClose()
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}