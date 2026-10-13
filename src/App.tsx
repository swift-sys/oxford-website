import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Maintenance from "./pages/Maintenance";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Maintenance />}
        />

        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}