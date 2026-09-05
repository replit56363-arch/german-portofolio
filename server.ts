import fs from "node:fs";
import path from "node:path";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer as createViteServer } from "vite";
import { seedDevelopmentData } from "@workspace/db";
import apiRouter from "./artifacts/api-server/src/routes/index";

// Built-in zero-dependency .env loader (prevents "Cannot find module 'dotenv'")
function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (key) {
            process.env[key] = val;
          }
        }
      }
    } catch {
      // ignore
    }
  }
}
loadLocalEnv();

const app: Express = express();

// Port determination:
// - AI Studio preview environment: strictly 3000 (required by internal proxy)
// - On VPS / PM2 / Production: always 3001 (or custom PORT from .env, but never 3000 to avoid collision with LPK app)
let PORT = 3001;
if (process.env.APPLET_ID && process.env.NODE_ENV !== "production") {
  PORT = 3000;
} else if (process.env.PORT && process.env.PORT !== "3000") {
  PORT = parseInt(process.env.PORT, 10);
} else {
  PORT = 3001;
}

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API routes FIRST
app.use("/api", apiRouter);

async function startServer() {
  await seedDevelopmentData();

  const isProduction =
    process.env.NODE_ENV === "production" ||
    (typeof process.argv[1] === "string" && process.argv[1].includes("dist")) ||
    fs.existsSync(path.resolve(process.cwd(), "artifacts/german-student-portfolio/dist/public/index.html")) ||
    fs.existsSync(path.resolve(process.cwd(), "dist/public/index.html"));

  if (!isProduction) {
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), "artifacts/german-student-portfolio/vite.config.ts"),
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        hmr: { port: 24680 }, // Hindari konflik port default 24678 jika ada aplikasi lain
      },
      appType: "spa",
      root: path.resolve(process.cwd(), "artifacts/german-student-portfolio"),
    });
    app.use(vite.middlewares);
  } else {
    const candidatePaths = [
      path.resolve(process.cwd(), "artifacts/german-student-portfolio/dist/public"),
      path.resolve(process.cwd(), "dist/public"),
    ];
    const distPath = candidatePaths.find((p) => fs.existsSync(path.join(p, "index.html"))) || candidatePaths[0];

    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`German Student Portfolio running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

