import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmationScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {}; // form + slot

  const handleConfirm = () => {
    alert(
      `Booking Confirmed!\nName: ${data.name}\nMobile: ${data.mobile}\nAge: ${data.age}\nSlot: ${data.slot}`
    );
    navigate("/"); // go back to form
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>

        <p className="mb-3 text-gray-700"><strong>Name:</strong> {data.name}</p>
        <p className="mb-3 text-gray-700"><strong>Mobile:</strong> {data.mobile}</p>
        <p className="mb-3 text-gray-700"><strong>Age:</strong> {data.age}</p>
        <p className="mb-6 text-gray-700"><strong>Slot:</strong> {data.slot}</p>

        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-pink-600 text-white rounded-2xl font-bold text-xl hover:bg-pink-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
