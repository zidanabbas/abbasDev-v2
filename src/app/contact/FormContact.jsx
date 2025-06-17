"use client";

import Button from "@/components/atoms/Button";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FormContact() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!formData.firstName || !formData.email || !formData.message) {
        setError("Please fill in all required fields.");
        return;
      }

      const response = await axios.post("/api/contact", formData);
      const result = response.data;

      if (response.status === 200) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setError("Failed to send email: " + (result.error || "Unknow Error"));
      }
    } catch (error) {
      console.error("Submit error", error);
      setError("Unexpected error occured.");
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row max-w-4xl w-full rounded-lg shadow-lg overflow-hidden backdrop:blur-xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-700 text-white p-6 md:w-full flex flex-col justify-between"
        >
          <div className="px-2 py-1">
            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
            <p className="text-sm mb-4">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <span className="mr-2">📞</span> +62896-5478-6299
              </p>
              <a
                className="flex items-center hover:text-slate-500  min-w-fit"
                href="mailto:zidan.abbas28@gmail.com"
              >
                <span className="mr-2 ">📧</span>
                zidan.abbas28@gmail.com
              </a>
              <p className="flex items-center">
                <span className="mr-2">📍</span> Tangerang Selatan.
              </p>
            </div>
          </div>
          <div className="flex gap-4 z-10">
            <a
              href="https://www.instagram.com/apprentice_farmer/"
              target="_blank"
              aria-label="Instagram Profile"
              rel="noopener noreferrer"
              className="cursor-pointer text-neutral-300 hover:text-slate-400 px-4 py-2 rounded transition"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/zidane-abbas/"
              target="_blank"
              aria-label="LinkedIn profile"
              rel="noopener noreferrer"
              className="cursor-pointer text-neutral-300 hover:text-slate-400 px-4 py-2 rounded transition"
            >
              LinkedIn
            </a>
          </div>

          <div className="relative mt-4  pointer-events-none">
            <div className="absolute w-32 h-32 bg-lime-600 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute w-48 h-48 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 -bottom-12 -right-12"></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:w-full z-10 dark:bg-neutral-500"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-red-600">{error}</p>
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Mail"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                What of website do you need?
              </label>
              <div className="text-sm flex flex-col md:flex-row justify-start gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="service"
                    value="Web Design"
                    checked={formData.service === "Web Design"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Web Design
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="service"
                    value="Web Development"
                    checked={formData.service === "Web Development"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Web Development
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="service"
                    value="Logo Design"
                    checked={formData.service === "Logo Design"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Logo Design
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="service"
                    value="Other"
                    checked={formData.service === "Other"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-600 h-32"
            />

            <Button onClick={handleSubmit} variant="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
