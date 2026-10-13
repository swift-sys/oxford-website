import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Maintenance from "./pages/Maintenance";
import Team from "./pages/Team";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Maintenance />}
        />

        <Route
          path="/team"
          element={<Team />}
        />
      </Routes>
    </BrowserRouter>
  );
}