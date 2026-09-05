import dotenv from "dotenv";
dotenv.config();

import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import { seedDevelopmentData } from "@workspace/db";
import apiRouter from "./artifacts/api-server/src/routes/index";

const app: Express = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
      path.resolve(process.cwd(), "dist/public"),
      path.resolve(process.cwd(), "artifacts/german-student-portfolio/dist/public"),
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

