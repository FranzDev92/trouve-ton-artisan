import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Stars from "../components/Stars.jsx";

const API = import.meta.env.VITE_API || "http://localhost:5000";

// Nettoie et prépare une URL image venant de la BDD
const safeSrc = (u) => {
  try {
    if (!u) return null;
    const s = String(u).trim();
    return s.startsWith("/") ? s : new URL(s, window.location.origin).toString();
  } catch {
    return null;
  }
};

export default function List() {
  const { categoryId } = useParams();
  const [params] = useSearchParams();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const q = params.get("q") || "";
        const url = categoryId
          ? `${API}/api/artisans?categoryId=${categoryId}&q=${encodeURIComponent(q)}`
          : `${API}/api/artisans?q=${encodeURIComponent(q)}`;
        const r = await fetch(url);
        if (!r.ok) throw 0;
        setArts(await r.json());
      } catch {
        setErr("Erreur lors du chargement des artisans.");
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId, params]);

  return (
    <>
      <Helmet>
        <title>Artisans</title>
        <meta name="description" content="Liste des artisans par catégorie ou recherche." />
      </Helmet>

      <Header />

      <main className="container py-4">
        {loading && <p>Chargement…</p>}
        {err && (
          <p role="alert" className="text-danger">
            {err}
          </p>
        )}

        <div className="row g-3">
          {arts.map((a) => {
            const src = safeSrc(a.picture_url);
            return (
              <div key={a.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100">
                  {src && (
                    <img
                      src={src}
                      alt={a.name}
                      className="card-img-top"
                      style={{ height: "260px", objectFit: "cover" }}
                      loading="lazy"
                    />
                  )}
                  <div className="card-body">
                    <h2 className="h5">{a.name}</h2>
                    <div className="mb-1">
                      <Stars value={a.rating} />
                    </div>
                    <p className="m-0">{a.specialty?.name}</p>
                    <p className="text-muted m-0">{a.locality}</p>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <Link className="btn btn-outline-primary w-100" to={`/artisans/${a.id}`}>
                      Voir la fiche
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          {!loading && !err && arts.length === 0 && <p>Aucun artisan trouvé.</p>}
        </div>
      </main>

      <Footer />
    </>
  );
}
