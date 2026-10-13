import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Maintenance from "./pages/Maintenance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Maintenance />}
        />
      </Routes>
    </BrowserRouter>
  );
}