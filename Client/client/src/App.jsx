import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Artisan from "./pages/Artisan.jsx";
import Legal from "./pages/Legal.jsx";
import Privacy from "./pages/Privacy.jsx";
import Cookies from "./pages/Cookies.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* liste générale (recherche via ?q=) */}
      <Route path="/artisans" element={<List />} />
      {/* liste filtrée par catégorie */}
      <Route path="/artisans/:id" element={<Artisan />} />
      {/* pages légales */}
      <Route path="/legal" element={<Legal />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<Cookies />} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
