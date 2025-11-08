import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="tt-footer mt-5">
      <div className="container footer-grid">
        {/* Bloc gauche */}
        <div className="footer-left d-flex flex-column align-items-start gap-2">
          <Link to="/legal/mentions-legales">Mentions légales</Link>
          <Link to="/legal/donnees-personnelles">Données personnelles</Link>
        </div>

        {/* Bloc centre */}
        <div className="footer-center text-center">
          <address className="mb-0">
            101 cours Charlemagne – CS 20033 – 69269 LYON CEDEX 02 – France<br />
            +33 (0)4 26 73 40 00
          </address>
        </div>

        {/* Bloc droite */}
        <div className="footer-right d-flex flex-column align-items-end gap-2">
          <Link to="/legal/accessibilite">Accessibilité</Link>
          <Link to="/legal/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
