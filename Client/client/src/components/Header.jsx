import {useEffect,useState} from "react";
import {Link,useNavigate,useLocation} from "react-router-dom";

const API=import.meta.env.VITE_API||"http://localhost:5000";

export default function Header(){
  const [cats,setCats]=useState([]);const [q,setQ]=useState("");
  const nav=useNavigate();const loc=useLocation();
  useEffect(()=>{(async()=>{try{const r=await fetch(`${API}/api/categories`);if(r.ok)setCats(await r.json());}catch{}})();},[]);
  useEffect(()=>{const u=new URLSearchParams(loc.search);setQ(u.get("q")||"");},[loc]);
  const onSubmit=e=>{e.preventDefault();nav(`/search?q=${encodeURIComponent(q.trim())}`)};
  return(
    <header className="tt-header border-bottom">
      <div className="container d-flex align-items-center justify-content-between gap-3 flex-wrap py-3">
        <Link to="/" className="text-reset text-decoration-none">
          <div className="logo-text text-center">
            <h1 className="tt-title m-0">Trouve ton artisan&nbsp;!</h1>
            <h2 className="tt-subtitle m-0">Avec la région<br/>Auvergne-Rhône-Alpes</h2>
          </div>
        </Link>
        <nav className="d-flex gap-3 flex-wrap" aria-label="Catégories">
          {cats.map(c=><Link key={c.id} to={`/c/${c.id}`} className="tt-nav-link">{c.name}</Link>)}
        </nav>
        <form className="d-flex gap-2 ms-auto" onSubmit={onSubmit} aria-label="Recherche artisans par nom">
          <input className="form-control" placeholder="Rechercher un artisan" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn btn-primary">Rechercher</button>
        </form>
      </div>
    </header>
  );
}
