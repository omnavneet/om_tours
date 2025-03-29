"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { z } from "zod"

const Page = () => {
  const [error, setError] = useState(null)
  const [newRequest, setNewRequest] = useState({
    destination: "",
    budget: "",
    startDate: "",
    endDate: "",
    noOfPeople: "",
    purpose: "",
    modeOfTravel: "car", // Default value
    yourLocation: "",
  })
  const router = useRouter()

  const InputSchema = z.object({
    destination: z.string().min(1, { message: "Destination is required" }),
    budget: z.string().min(1, { message: "Budget is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    noOfPeople: z.string().min(1, { message: "No of people is required" }),
    purpose: z.string().min(1, { message: "Purpose is required" }),
    modeOfTravel: z.string().min(1, { message: "Mode of travel is required" }),
    yourLocation: z.string().min(1, { message: "Your location is required" }),
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNewRequest = async (e) => {
    e.preventDefault()
    try {
      InputSchema.parse(newRequest)
      setError(null)

      const res = await fetch("/api/newRequest", {
        method: "POST",
        body: JSON.stringify({ newRequest }),
      })

      const data = await res.json()
    } catch (e) {
      if (e.errors) {
        setError(e.errors)
      } else {
        console.log(e)
      }
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center p-20 text-black">
      <h1 className="text-2xl font-bold"> Please fill in the details to get started!</h1>
      <p className="text-xl font-semibold mt-2">
       
      </p>
      <form onSubmit={handleNewRequest} className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
          <div>
            {/*Destination*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Destination<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="destination"
                value={newRequest.destination}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter a destination"
                required
              />
              {error && error.some((e) => e.path[0] === "destination") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "destination")?.message}
                </p>
              )}
            </div>

            {/*Budget*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Budget<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="budget"
                value={newRequest.budget}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter your budget"
                required
              />
              {error && error.some((e) => e.path[0] === "budget") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "budget")?.message}
                </p>
              )}
            </div>

            {/*Start Date*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Start Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={newRequest.startDate}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                required
              />
              {error && error.some((e) => e.path[0] === "startDate") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "startDate")?.message}
                </p>
              )}
            </div>

            {/*End Date*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                End Date<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={newRequest.endDate}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                required
              />
              {error && error.some((e) => e.path[0] === "endDate") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "endDate")?.message}
                </p>
              )}
            </div>

            {/*Your Location*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Your Location<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="yourLocation"
                value={newRequest.yourLocation}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                placeholder="Enter your current location"
                required
              />
              {error && error.some((e) => e.path[0] === "yourLocation") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "yourLocation")?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            {/*Mode of travel*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Mode of Travel<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="modeOfTravel"
                    value="car"
                    checked={newRequest.modeOfTravel === "car"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Car</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="modeOfTravel"
                    value="train"
                    checked={newRequest.modeOfTravel === "train"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Train</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="modeOfTravel"
                    value="flight"
                    checked={newRequest.modeOfTravel === "flight"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Flight</span>
                </label>
              </div>
              {error && error.some((e) => e.path[0] === "modeOfTravel") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "modeOfTravel")?.message}
                </p>
              )}
            </div>

            {/*No of people*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Number of People<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="noOfPeople"
                value={newRequest.noOfPeople}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                min="1"
                placeholder="Enter number of people"
                required
              />
              {error && error.some((e) => e.path[0] === "noOfPeople") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "noOfPeople")?.message}
                </p>
              )}
            </div>

            {/*Purpose*/}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Purpose<span className="text-red-500">*</span>
              </label>
              <textarea
                name="purpose"
                value={newRequest.purpose}
                onChange={handleInputChange}
                className="w-full p-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                rows="8"
                placeholder="Describe the purpose of your trip"
                required
              ></textarea>
              {error && error.some((e) => e.path[0] === "purpose") && (
                <p className="text-red-500 text-sm mt-1">
                  {error.find((e) => e.path[0] === "purpose")?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-orange-600 text-white font-medium rounded-xl shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page
