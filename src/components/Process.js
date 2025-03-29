import { motion } from "framer-motion"
import React from "react"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"

const Process = () => {
  return (
    <section className="py-16 w-full max-w-6xl mx-auto px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
          How It Works
        </h2>
        <p className="text-gray-700 text-lg font-medium mb-12">
          Simple steps to plan the perfect trip, exactly when you need it.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {processSteps.map(
          ({ icon: Icon, title, description, color }, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg h-full relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-center mb-5">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                      color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : color === "green"
                        ? "bg-green-100 text-green-600"
                        : color === "yellow"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon fontSize="large" />
                  </motion.div>
                </div>

                <div className="flex flex-col items-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <div className="w-12 h-1 bg-gray-200 rounded mb-4"></div>
                  <p className="text-gray-600 text-center">{description}</p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  )
}

const processSteps = [
  {
    icon: AccountCircleOutlinedIcon,
    title: "Get Started",
    description:
      "Create your free Om Tours account to unlock personalized travel planning.",
    color: "blue",
  },
  {
    icon: SearchOutlinedIcon,
    title: "Set Your Preferences",
    description:
      "Tell us where you're going, your travel dates, budget, and what you love to do.",
    color: "green",
  },
  {
    icon: ChatOutlinedIcon,
    title: "Explore Your Itinerary",
    description:
      "Get a custom AI-generated itinerary tailored to your interests and travel style.",
    color: "yellow",
  },
  {
    icon: PeopleOutlinedIcon,
    title: "Travel With Ease",
    description:
      "Enjoy real-time updates, smart suggestions, and stress-free adventures, start to finish.",
    color: "red",
  },
]

export default Process
