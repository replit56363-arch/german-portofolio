import { defineConfig } from "drizzle-kit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load .env if not loaded yet
function loadEnv() {
  if (process.env.DATABASE_URL) return;
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, ".env"),
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      }
      break;
    }
  }
}

loadEnv();

const dbUrl = process.env.DATABASE_URL || "postgresql://postgres:EDUJUANDA12345@localhost:5432/LPK";

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
});

