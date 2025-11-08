import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Stars from "../components/Stars.jsx";

const API = import.meta.env.VITE_API || "http://localhost:5000";


const safeSrc = (u) => {
  try {
    if (!u) return null;
    const s = String(u).trim();
    return s.startsWith("/") ? s : new URL(s, window.location.origin).toString();
  } catch {
    return null;
  }
};

export default function Home() {
  const [top, setTop] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const a = await fetch(`${API}/api/artisans`).then((r) => r.json());
        setTop([...a].sort((x, y) => (y.rating || 0) - (x.rating || 0)).slice(0, 3));
      } catch {
        setErr("Erreur de chargement.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Accueil | Trouve ton artisan</title>
        <meta name="description" content="Trouvez un artisan, consultez sa fiche et contactez-le." />
      </Helmet>

      <Header />

      <main className="container py-4">
        <section className="mb-4" aria-label="Comment trouver mon artisan ?">
          <h3 className="h4">Comment trouver mon artisan ?</h3>
          <ol className="mt-2 mb-0">
            <li>Choisir la catégorie d’artisanat dans le menu.</li>
            <li>Choisir un artisan.</li>
            <li>Le contacter via le formulaire de contact.</li>
            <li>Une réponse sera apportée sous 48h.</li>
          </ol>
        </section>

        <section className="mb-4" aria-label="Artisans du mois">
          <h3 className="h4 mb-3">Les artisans du mois</h3>
          {loading && <p>Chargement…</p>}
          {err && <p className="text-danger" role="alert">{err}</p>}

          <div className="row g-3">
            {top.map((a) => {
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
                      <h4 className="h5">{a.name}</h4>
                      <div className="mb-1"><Stars value={a.rating} /></div>
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
