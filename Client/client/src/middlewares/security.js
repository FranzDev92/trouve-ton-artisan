const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

module.exports = function security({allowedOrigin}) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300, // plafond global API
    standardHeaders: true,
    legacyHeaders: false
  });

  return [
    helmet({
      contentSecurityPolicy: false, // simple pour dev; à durcir en prod
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
    }),
    cors({
      origin: function (origin, cb) {
        // autorise le front local uniquement
        if (!origin || origin === allowedOrigin) return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
      },
      credentials: false,
      methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
      allowedHeaders: ["Content-Type","Authorization"]
    }),
    limiter
  ];
};
