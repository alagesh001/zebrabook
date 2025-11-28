import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormScreen from "./FormScreen";
import SlotScreen from "./SlotScreen";
import ConfirmationScreen from "./ConfirmationScren"; // fix typo

export default function App() {
  return (
    <BrowserRouter basename="/zebraslot">
      <Routes>
        <Route path="/" element={<FormScreen />} />
        <Route path="/slots" element={<SlotScreen />} />
        <Route path="/confirm" element={<ConfirmationScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
