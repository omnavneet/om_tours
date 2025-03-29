"use client"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Process from "../components/Process"
import Contact from "../components/contact"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-orange-50">
      <Navbar />

      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            Travel Smarter with <br />
            <span className="text-orange-600">AI-Powered Itineraries</span>
          </h1>
          <p className="text-black text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto">
            Om Tours creates dynamic, personalized travel plans that adapt to
            your interests, schedule, and real-time changes — making every trip
            seamless and unforgettable.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={"/check_signup"}
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white text-base px-8 py-3 rounded-lg mt-8 font-semibold shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
            About us
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            At Om Tours, we believe travel should feel personal, not stressful.
            Planning a trip can be overwhelming — juggling time, budget, and
            endless recommendations. That’s why we created Om Tours: to make
            travel planning smarter, simpler, and all about you. With the power
            of AI, we craft personalized itineraries that match your interests,
            adapt in real-time, and guide you every step of the way — from
            must-see sights to hidden gems. Whether you're chasing adventure,
            culture, or just a little peace, Om Tours helps you get the most out
            of every moment. Because great trips aren’t just about where you go
            — they’re about how you feel along the way. Let’s make travel
            easier, together.
          </p>
        </motion.div>
      </section>

      <section id="process" className="py-20 bg-orange-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Process />
        </motion.div>
      </section>

      <section id="contact" className="py-20 bg-orange-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Contact />
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
