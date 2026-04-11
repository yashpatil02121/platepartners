import { useState } from "react"

export default function AddPostModal({ open, onClose, onSubmit }: any) {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [file, setFile] = useState<File | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm boborder-white/20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-4">Add Food</h2>

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

        {file && (
  <img
    src={URL.createObjectURL(file)}
    className="w-full h-32 object-cover mb-2"
  />
)}

        {/* 📸 Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit(title, location, file)
              setTitle("")
              setLocation("")
              setFile(null)
              onClose()
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}