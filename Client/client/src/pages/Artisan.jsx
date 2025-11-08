import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Stars from "../components/Stars.jsx";

const API=import.meta.env.VITE_API||"http://localhost:5000";

export default function Artisan(){
  const {id}=useParams();const [a,setA]=useState(null),[loading,setLoading]=useState(true),[err,setErr]=useState("");
  const [f,setF]=useState({sender_name:"",sender_email:"",subject:"",message:""});const [sent,setSent]=useState(false),[sendErr,setSendErr]=useState("");
  useEffect(()=>{(async()=>{try{const r=await fetch(`${API}/api/artisans/${id}`);if(!r.ok)throw 0;setA(await r.json());}catch{setErr("Fiche introuvable.");}finally{setLoading(false);}})();},[id]);
  const submit=async e=>{e.preventDefault();setSendErr("");try{const r=await fetch(`${API}/api/artisans/${id}/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)});if(!r.ok)throw 0;setSent(true);}catch{setSendErr("Échec de l’envoi. Vérifiez les champs.");}};
  if(loading) return(<><Header/><main className="container py-4">Chargement…</main><Footer/></>);
  if(err||!a) return(<><Header/><main className="container py-4" role="alert">{err||"Erreur."}</main><Footer/></>);
  return(
    <>
      <Helmet><title>{a.name}</title><meta name="description" content={`Artisan ${a.specialty?.name||""} à ${a.locality}`}/></Helmet>
      <Header/>
      <main className="container py-4">
        <h1 className="h3 mb-2">{a.name}</h1>
        <div className="mb-1"><Stars value={a.rating}/></div>
        <p className="m-0">{a.specialty?.name} — {a.locality}</p>
        <p className="text-muted">{a.about}</p>
        {a.website&&<p><a href={a.website} target="_blank" rel="noreferrer">Site web</a></p>}
        <hr/>
        <h2 className="h5">Contacter cet artisan</h2>
        {sent? <p className="text-success">Message envoyé.</p> :
        <form className="row g-2" onSubmit={submit} aria-label="Formulaire de contact artisan">
          <div className="col-md-6"><input required className="form-control" placeholder="Votre nom" value={f.sender_name} onChange={e=>setF({...f,sender_name:e.target.value})}/></div>
          <div className="col-md-6"><input required type="email" className="form-control" placeholder="Votre email" value={f.sender_email} onChange={e=>setF({...f,sender_email:e.target.value})}/></div>
          <div className="col-12"><input required className="form-control" placeholder="Objet" value={f.subject} onChange={e=>setF({...f,subject:e.target.value})}/></div>
          <div className="col-12"><textarea required className="form-control" rows="5" placeholder="Message" value={f.message} onChange={e=>setF({...f,message:e.target.value})}></textarea></div>
          {sendErr&&<div className="text-danger" role="alert">{sendErr}</div>}
          <div className="col-12"><button className="btn btn-primary">Envoyer</button></div>
        </form>}
      </main>
      <Footer/>
    </>
  );
}
