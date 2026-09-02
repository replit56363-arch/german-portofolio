import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import { seedDevelopmentData } from "@workspace/db";
import apiRouter from "./artifacts/api-server/src/routes/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes FIRST
app.use("/api", apiRouter);

async function startServer() {
  await seedDevelopmentData();
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, "artifacts/german-student-portfolio/vite.config.ts"),
      server: { middlewareMode: true, host: "0.0.0.0" },
      appType: "spa",
      root: path.resolve(__dirname, "artifacts/german-student-portfolio"),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "artifacts/german-student-portfolio/dist/public");
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
