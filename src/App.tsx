import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { disableDevTools } from "./src/utils/disableDevTools";

import Maintenance from "./pages/Maintenance";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    return disableDevTools();
  }, []);

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
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
