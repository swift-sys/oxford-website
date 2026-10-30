import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { startAccessTracker } from "./accessTracker";
import { disableDevTools } from "./utils/disableDevTools";

import Maintenance from "./pages/Maintenance";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    startAccessTracker();
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("app-page-view"));
  }, [location.pathname, location.search, location.hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    return disableDevTools();
  }, []);

  return (
    <BrowserRouter>
      <PageViewTracker />

      <Routes>
        <Route path="/" element={<Maintenance />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
