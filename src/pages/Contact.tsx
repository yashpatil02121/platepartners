import Navbar from "../components/Navbar"

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

        <div className="bg-white p-4 rounded shadow">
          <p className="mb-2">
            📧 Email: platepartners20@gmail.com
          </p>

          <p className="mb-2">
            📍 Location: Mumbai, India
          </p>

          <p>
            📞 Phone: +91 8828587896
          </p>
        </div>
      </div>
    </div>
  )
}