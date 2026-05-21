import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './assets/smalllogo.webp'; // import the logo at the top of the file

export default function FormScreen2() {
  const navigate = useNavigate();

  const slotTabs = {
    Morning: [
      "6:00 AM - 6:30 AM",
      "6:30 AM - 7:00 AM",
      "7:00 AM - 7:30 AM",
      "7:30 AM - 8:00 AM",
      "10:00 AM - 10:30 AM",
      "10:30 AM - 11:00 AM"
    ],
    Evening: [
      "3:00 PM - 3:30 PM",
      "3:30 PM - 4:00 PM",
      "4:00 PM - 4:30 PM",
      "6:00 PM - 6:30 PM",
      "6:30 PM - 7:00 PM",
      "7:00 PM - 7:30 PM",
    ],
  };

  const availableSlots = [
    "6:30 AM - 7:00 AM",
    "10:00 AM - 10:30 AM",
    "6:30 PM - 7:00 PM",
  ];

  const [activeTab, setActiveTab] = useState("Morning");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({ name: "", mobile: "", age: "" });
  const [loading, setLoading] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
 const handleDownload = () => {
    window.open("https://oxadmedia.online/zebrasample.pdf", "_blank");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.mobile || !formData.age || !selectedSlot) return;

    setLoading(true);

    try {
      const res = await fetch("https://oxadmedia.online/api/zebra-book-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          age: formData.age,
          slot: selectedSlot,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
          setShowSuccess(true);

       // alert("Booking successful! You will receive a PDF shortly to your mobile number.");
        // Reset form or navigate
        setFormData({ name: "", mobile: "", age: "" });
        setSelectedSlot("");
      } else {
        alert("Failed to book slot: " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 flex justify-center items-center">
  <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative">
    
    {/* Loader Overlay */}
 {loading && (
  <div className="fixed inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-50">
    
    {/* Spinner */}
    <svg
      className="animate-spin h-10 w-10 text-pink-600 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      ></path>
    </svg>

    {/* Booking text */}
    <p className="text-lg font-semibold text-pink-600 mb-1">Please Wait! Booking...</p>

    {/* Tagline about Zebra */}
    <p className="text-center text-gray-600 text-sm max-w-xs">
      Zebra Language Academy – Your one-stop destination to Spoken Tamil, Hindi & English with expert guidance!
    </p>

  </div>
)}

{showSuccess && (
  <div className="fixed inset-0 flex items-center justify-center z-50 px-10">
    {/* Background Overlay */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setShowSuccess(false)}
    ></div>

    {/* Modal Box */}
    <div className="relative bg-white rounded-3xl p-6 max-w-sm mx-auto shadow-xl flex flex-col items-center space-y-4">
      <svg
        className="w-16 h-16 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>

      <h2 className="text-xl font-bold text-gray-800 text-center">
        Booking Successful!
      </h2>
      <p className="text-gray-600 text-center text-sm">
        You will receive a PDF shortly to your Whatsapp.
      </p>

      <button
        className="mt-2 px-6 py-2 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
        onClick={() => setShowSuccess(false)}
      >
        OK
      </button>
    </div>
  </div>
)}

  {/* Logo and Academy Name */}
   <div className="flex flex-col items-center mb-6">
  <img
    src={logo} // imported logo
    alt="Zebra Language Academy Logo"
    className="w-24 h-24 object-contain mb-2"
  />
 
 <p className="text-gray-500 text-center text-sm mt-1">
  5/3, 3rd Street, Trustpuram,<br />
  Chennai - 600024
</p>
   <h3 className="text-lg font-bold text-pink-600 text-center mb-1 mt-4">
  Spoken Tamil, Hindi & English – All Under One Roof!
</h3>
</div>
        {/* Title
        <h1 className="text-3xl font-extrabold text-center mb-1 tracking-tight">
         Book 1 Free Class
        </h1>
        <p className="text-center font-regular mb-8 text-lg">
         (You can pay ₹399 after first class)
        </p> */}

        {/* Form Section */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
              placeholder="Enter mobile number"
              required
            />
          </div>
 <button
  onClick={handleDownload}
  className="mt-3 w-full py-4 rounded-2xl text-xl font-bold transition shadow-md bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
>
  Sample E-Book
</button>
       <button
  onClick={handleDownload}
  className="w-full py-4 rounded-2xl text-xl font-bold transition shadow-md bg-red-600 text-white hover:bg-red-700 active:scale-95"
>
  Full E-Book
</button>
        </div>
      
        {/* Submit Button */}
      
      </div>
    </div>
  );
}
