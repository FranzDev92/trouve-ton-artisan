import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
export default function NotFound(){
  return(<><Header/><main className="container py-5 text-center">
    <img src="/favicon-32.png" alt="" aria-hidden="true" className="mb-3" />
    <h1 className="h3">Page non trouvée</h1>
    <p>La page que vous avez demandée n’existe pas.</p>
  </main><Footer/></>);
}
