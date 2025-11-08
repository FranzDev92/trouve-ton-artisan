require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { sequelize } = require("./models");

const app = express();
const port = process.env.PORT || 5000;

// Désactive l'en-tête x-powered-by (bonne pratique sécurité)
app.disable("x-powered-by");

// Middleware de parsing JSON / URL-encoded
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: false, limit: "200kb" }));

// Sécurité HTTP
app.use(
  helmet({
    contentSecurityPolicy: false, // simplifié pour développement
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);

// CORS : autorise uniquement ton front local
const allowedOrigin = process.env.FRONT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || origin === allowedOrigin) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Limiteur global (anti-abus / DoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Route santé
app.get("/healthz", (req, res) => res.json({ ok: true }));

// Routes API principales
app.use("/api", require("./routes/api"));

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Gestion centralisée des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.message);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS forbidden" });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

// Lancement du serveur après connexion Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie");
    app.listen(port, () =>
      console.log(`🚀 API disponible sur http://localhost:${port}`)
    );
  } catch (e) {
    console.error("❌ Échec de la connexion à la base de données :", e.message);
    process.exit(1);
  }
})();
