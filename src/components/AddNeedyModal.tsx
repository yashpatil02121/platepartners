import { useState, useEffect } from "react"

export default function AddNeedyModal({ open, onClose, onSubmit }: any) {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [type, setType] = useState("people")
  const [file, setFile] = useState<File | null>(null)

  // ✅ Reset function
  const resetForm = () => {
    setTitle("")
    setLocation("")
    setPhone("")
    setType("people")
    setFile(null)
  }

  // ✅ Auto reset when modal closes
  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-lg font-semibold mb-4">Add Help Needed</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Title (e.g. Street dogs near park)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="people">People</option>
          <option value="animals">Animals</option>
        </select>

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end gap-2">
          
          {/* ❌ Cancel now resets */}
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          {/* ✅ Submit resets */}
          <button
            onClick={() => {
              onSubmit({ title, location, phone, type, file })
              resetForm()
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