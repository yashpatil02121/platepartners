import { useState } from "react"

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete",
  description = "Are you sure you want to delete this?",
}: any) {
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleDelete = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}