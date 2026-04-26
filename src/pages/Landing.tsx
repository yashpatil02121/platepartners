import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 shadow">
        <h1 className="text-xl font-bold text-green-600">
          PlatePartners 🍱
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>

      {/* 🌟 HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center px-6 py-12 max-w-6xl mx-auto gap-8">

        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">
            Turning Extra Food Into Everyday Help
          </h2>

          <p className="text-gray-600 mb-4">
            PlatePartners is a <span className="font-semibold">non-profit platform</span> that connects people who have extra food with those who can deliver it to people and animals in need.
          </p>

          <p className="text-gray-600 mb-6">
            Small acts of sharing can create meaningful impact one plate at a time.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
          >
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/stp-dal-chawal-7654.webp"
            alt="food sharing"
            className="rounded-lg shadow"
          />
        </div>
      </div>

      {/* 🍽️ PROBLEM SECTION */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h3 className="text-2xl font-semibold mb-4">
            The Problem We Often Ignore
          </h3>

          <p className="text-gray-600 mb-6">
            During functions like <span className="font-medium">birthdays, weddings, and events</span>, a large amount of food is prepared but a significant portion goes unused.
          </p>

          <p className="text-gray-600">
            While some food is discarded, there are people and animals nearby who could truly benefit from it.
          </p>

          <img
            src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/authentic-indian-food-and-snacks-close-up.webp"
            className="mt-8 rounded-lg shadow mx-auto"
          />
        </div>
      </div>

      {/* 🔗 SOLUTION SECTION */}
      <div className="py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">

        <div className="flex-1">
          <img
            src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/new-delhi-india-a-woman-rides-a-scooter-during-the-pre-monsoon-showers-near-sheikh-sarai-on.webp"
            className="rounded-lg shadow"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-4">
            How PlatePartners Helps
          </h3>

          <p className="text-gray-600 mb-4">
            PlatePartners bridges the gap between:
          </p>

          <ul className="text-gray-600 space-y-2">
            <li>• People who have extra food but limited time</li>
            <li>• People who want to help but don’t have access to food</li>
            <li>• Communities and animals in need</li>
          </ul>

          <p className="text-gray-600 mt-4">
            Anyone can contribute by sharing food or by delivering it where it’s needed.
          </p>
        </div>
      </div>

      {/* 🐶 IMPACT SECTION */}
      <div className="bg-gray-50 py-12 px-6 text-center">

        <h3 className="text-2xl font-semibold mb-4">
          Helping People and Animals
        </h3>

        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          PlatePartners is not limited to helping people it also supports feeding street animals like dogs who struggle to find food daily.
        </p>

        <img
          src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/stray-dogs-sleeping-on-the-pavement-pondicherry-india-let-sleeping-dogs-lie.webp"
          className="rounded-lg shadow mx-auto"
        />
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="py-12 text-center">

        <h3 className="text-2xl font-semibold mb-4">
          Be Part of the Change
        </h3>

        <p className="text-gray-600 mb-6">
          Whether you want to share food or deliver it your small action can make a big difference.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
        >
          Login to Continue
        </button>
      </div>

      {/* 🔻 FOOTER */}
      <div className="bg-gray-100 text-center text-sm text-gray-500 py-4">
        PlatePartners • A Non-Profit Initiative • Spreading kindness through food
      </div>

    </div>
  )
}