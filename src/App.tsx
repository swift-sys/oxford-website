import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Maintenance from "./pages/Maintenance";
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
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}