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
      </div>
    </div>
  )
}