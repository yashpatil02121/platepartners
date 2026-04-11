import Navbar from "../components/Navbar"

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="p-6 mt-16 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">About PlatePartners</h1>

        <p className="text-gray-700 mb-3">
          PlatePartners is a community-powered platform that transforms surplus
          food into meaningful impact. Instead of letting extra food go to waste,
          anyone can share it so it reaches those who truly need it.
        </p>

        <p className="text-gray-700 mb-3">
          This isn’t just about feeding people. It also extends to feeding street
          animals like dogs who often struggle to find food every day.
        </p>

        <p className="text-gray-700 mb-3">
          PlatePartners works through a network of kind individuals who are
          willing to collect food and distribute it. These contributors act as
          connectors - picking up available food and delivering it to needy
          people or animals in their surroundings.
        </p>

        <p className="text-gray-700 mb-3">
          It removes the dependency on requests. Instead, it empowers action -
          if you see food available, you can take responsibility and ensure it
          reaches someone in need.
        </p>

        <p className="text-gray-700 font-medium">
          Our mission is simple: reduce waste, feed the hungry, care for animals,
          and build a culture of everyday kindness - one plate at a time.
        </p>

        <div className="bg-green-50 p-4 rounded mt-4">
        <p className="text-green-700 font-medium">
            Anyone can contribute by sharing food or by delivering it to those who need it.
        </p>
        </div>
        {/* 👤 Founder Section */}
        <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-center">
            Meet the Founder
        </h2>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center">
            
            {/* Founder Image */}
            <img
            src="https://totvbqirycowhbpzutnn.supabase.co/storage/v1/object/public/food-images/Profile%20Black%20Blue.jpeg"
            alt="Founder"
            className="w-28 h-28 rounded-full object-cover mb-4 shadow"
            />

            {/* Name */}
            <h3 className="text-lg font-semibold">
            Yash Patil
            </h3>

            {/* Role */}
            <p className="text-sm text-gray-500 mb-3">
            Founder, PlatePartners
            </p>

            {/* Message */}
            <p className="text-gray-600 text-sm max-w-md mb-4">
            PlatePartners was created with a simple belief that small acts of sharing
            can create meaningful change. By connecting people who want to help with those
            who need it, we can build a more compassionate and supportive community.
            </p>

            {/* 🔗 Social Links */}
            <div className="flex gap-4 mt-2">
            
            {/* 🔗 Social Links */}
            <div className="flex gap-3 mt-2">

            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/in/yash-patil-6655b5215/recent-activity/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-100 transition"
            >
                LinkedIn
            </a>

            {/* Instagram */}
            <a
                href="https://www.instagram.com/__yash_patil_2121__"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-100 transition"
            >
                Instagram
            </a>

            </div>

            </div>
        </div>
        </div>
      </div>
    </div>
  )
}