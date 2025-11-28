import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SlotScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state || {}; // get data from FormScreen

  const slotTabs = {
    Morning: ["6:00 AM - 6:30 AM", "6:30 AM - 7:00 AM", "7:00 AM - 7:30 AM", "7:30 AM - 8:00 AM"],
    Evening: ["6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM", "7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM"],
  };

  const availableSlots = ["6:30 AM - 7:00 AM", "6:30 PM - 7:00 PM"];
  const [activeTab, setActiveTab] = useState("Morning");
  const [selectedSlot, setSelectedSlot] = useState("");

  const handleNext = () => {
    if (!selectedSlot) return;
    navigate("/confirm", { state: { ...form, slot: selectedSlot } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Select Your Slot</h1>

        {/* Tabs */}
        <div className="flex mb-5 border-b border-gray-200">
          {Object.keys(slotTabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-lg font-semibold flex-1 ${
                activeTab === tab ? "text-pink-600 border-b-4 border-pink-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-2 gap-4">
          {slotTabs[activeTab].map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                disabled={!isAvailable}
                onClick={() => isAvailable && setSelectedSlot(slot)}
                className={`p-3 rounded-xl text-center text-sm font-semibold border transition shadow-sm
                  ${
                    isAvailable
                      ? isSelected
                        ? "bg-green-700 text-white border-green-700 shadow-md scale-[1.02]"
                        : "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                      : "bg-red-100 text-red-600 border-red-300 cursor-not-allowed opacity-70"
                  }
                `}
              >
                {slot}
              </button>
            );
          })}
        </div>

        {/* Submit */}
        <button
          disabled={!selectedSlot}
          onClick={handleNext}
          className={`mt-8 w-full py-4 rounded-2xl text-xl font-bold transition shadow-md ${
            selectedSlot ? "bg-pink-600 text-white hover:bg-pink-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Next → Confirm
        </button>
      </div>
    </div>
  );
}
