import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import pg from "pg";
import fs from "node:fs";
import path from "node:path";
import { scryptSync, randomBytes } from "node:crypto";
import * as schema from "./schema/index";
import { adminsTable, sessionsTable, studentsTable, siteContentTable, cmsSectionsTable } from "./schema/index";
import { defaultCmsData } from "./default-cms";

const { Pool } = pg;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function getEnvAdminCredentials() {
  let emailRaw = process.env.ADMIN_EMAIL;
  let passRaw = process.env.ADMIN_PASSWORD;

  if (!emailRaw || !passRaw) {
    try {
      const envPath = path.resolve(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (key === "ADMIN_EMAIL" && !emailRaw) emailRaw = val;
            if (key === "ADMIN_PASSWORD" && !passRaw) passRaw = val;
          }
        }
      }
    } catch (err) {
      console.warn("[DB] Note on .env reading:", err);
    }
  }

  emailRaw = emailRaw || "admin@co.id";
  passRaw = passRaw || "password123";

  const email = emailRaw.replace(/^["']|["']$/g, "").trim().toLowerCase();
  const password = passRaw.replace(/^["']|["']$/g, "").trim();
  return { email, password };
}

const { email: envAdminEmail, password: envAdminPassword } = getEnvAdminCredentials();

const initialAdmins = [
  {
    id: 1,
    email: envAdminEmail,
    name: "Admin Utama",
    passwordHash: hashPassword(envAdminPassword),
    createdAt: new Date("2024-01-01"),
  },
];

const initialSiteContent = [
  {
    id: 1,
    eyebrow: "Lembaga Kursus Bahasa Jerman Resmi · Medan",
    title: "ICH LIEBE DEUTSCH MEDAN",
    description: "Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik bersama pendiri lulusan UNIMED yang berpengalaman 6 tahun tinggal di Jerman.",
    primaryCta: "Konsultasi WhatsApp",
    secondaryCta: "Lihat 5 Program Kursus",
    introLabel: "Unsere Vision",
    introText: "“Deutsch lernen. Deutschland verstehen. Zukunft gestalten.” — Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik.",
    statOneValue: "A1–B2",
    statOneLabel: "Kursus Bahasa Jerman",
    statTwoValue: "5 Program",
    statTwoLabel: "Jalur Ke Jerman",
    statThreeValue: "2024",
    statThreeLabel: "Terdaftar & Berizin Operasional",
    statFourValue: "6 Tahun",
    statFourLabel: "Pengalaman Pendiri di DE",
    trustTitle: "Kehadiran Kami Berawal Dari Komitmen",
    trustText: "Ich Liebe Deutsch Medan siap mendampingi masyarakat Kota Medan dan seluruh Indonesia untuk melangkah, beradaptasi, dan berkembang di Jerman.",
    updatedAt: new Date(),
  },
];

const initialStudents = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    phone: "+6281234567890",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
    level: "A2",
    status: "ready",
    cohort: "2024-Q3",
    joinedAt: "2024-06-01",
    bio: "Fokus persiapan Ausbildung bidang perhotelan (Hotelfachmann) di Bayern.",
    speakingVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    certificateName: "Goethe-Zertifikat A2",
    certificateUrl: "https://example.com/certificates/ahmad-a2.pdf",
    levelHistory: [
      { level: "A1", completedAt: "2024-04-15", score: 88 },
      { level: "A2", completedAt: "2024-07-20", score: 92 },
    ],
    placement: null,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-07-20"),
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    email: "siti.rahma@example.com",
    phone: "+6281298765432",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    level: "B2",
    status: "placed",
    cohort: "2024-Q1",
    joinedAt: "2024-01-10",
    bio: "Lulusan D3 Keperawatan, telah menyelesaikan B2 Pflege dan siap bertugas di klinik Frankfurt.",
    speakingVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    certificateName: "Goethe-Zertifikat B2",
    certificateUrl: "https://example.com/certificates/siti-b2.pdf",
    levelHistory: [
      { level: "A1", completedAt: "2024-02-01", score: 95 },
      { level: "A2", completedAt: "2024-04-10", score: 90 },
      { level: "B1", completedAt: "2024-06-15", score: 85 },
      { level: "B2", completedAt: "2024-08-20", score: 88 },
    ],
    placement: {
      country: "Jerman",
      program: "Ausbildung Keperawatan (Pflegefachfrau)",
      company: "Universitätsklinikum Frankfurt",
      placedAt: "2024-09-01",
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-09-01"),
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "+6281355556789",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    level: "B1",
    status: "ready",
    cohort: "2024-Q2",
    joinedAt: "2024-03-01",
    bio: "Latar belakang SMK Otomotif, menargetkan program Mechatroniker di Stuttgart.",
    speakingVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    certificateName: "Goethe-Zertifikat B1",
    certificateUrl: "https://example.com/certificates/budi-b1.pdf",
    levelHistory: [
      { level: "A1", completedAt: "2024-04-01", score: 84 },
      { level: "A2", completedAt: "2024-06-01", score: 86 },
      { level: "B1", completedAt: "2024-08-10", score: 82 },
    ],
    placement: null,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-08-10"),
  },
  {
    id: 4,
    name: "Dewi Lestari",
    email: "dewi.lestari@example.com",
    phone: "+6281987654321",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    level: "A1",
    status: "in_progress",
    cohort: "2024-Q4",
    joinedAt: "2024-08-15",
    bio: "Sedang mengikuti kelas bahasa Jerman intensif A1 dengan progres kosakatanya sangat baik.",
    speakingVideoUrl: null,
    certificateName: null,
    certificateUrl: null,
    levelHistory: [
      { level: "A1", completedAt: "2024-08-15", score: null },
    ],
    placement: null,
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
  },
  {
    id: 5,
    name: "Reza Pratama",
    email: "reza.pratama@example.com",
    phone: "+6281765432109",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    level: "B2",
    status: "placed",
    cohort: "2024-Q1",
    joinedAt: "2024-01-15",
    bio: "Peserta program FSJ (Freiwilliges Soziales Jahr) di bidang pelayanan lansia di Hamburg.",
    speakingVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    certificateName: "Goethe-Zertifikat B2",
    certificateUrl: "https://example.com/certificates/reza-b2.pdf",
    levelHistory: [
      { level: "A1", completedAt: "2024-02-15", score: 90 },
      { level: "A2", completedAt: "2024-04-20", score: 92 },
      { level: "B1", completedAt: "2024-06-30", score: 88 },
      { level: "B2", completedAt: "2024-08-10", score: 91 },
    ],
    placement: {
      country: "Jerman",
      program: "Freiwilliges Soziales Jahr (FSJ)",
      company: "Deutsches Rotes Kreuz Hamburg",
      placedAt: "2024-08-15",
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-08-15"),
  },
  {
    id: 6,
    name: "Maya Indah",
    email: "maya.indah@example.com",
    phone: "+6281543210987",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    level: "B1",
    status: "in_progress",
    cohort: "2024-Q2",
    joinedAt: "2024-04-01",
    bio: "Persiapan studi lanjut sarjana teknik di Jerman, fokus memperkuat kemampuan menulis akademik.",
    speakingVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    certificateName: "Goethe-Zertifikat A2",
    certificateUrl: "https://example.com/certificates/maya-a2.pdf",
    levelHistory: [
      { level: "A1", completedAt: "2024-05-15", score: 92 },
      { level: "A2", completedAt: "2024-07-15", score: 89 },
      { level: "B1", completedAt: "2024-09-01", score: null },
    ],
    placement: null,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-09-01"),
  },
];

const initialCmsSections = Object.entries(defaultCmsData).map(([key, value], idx) => ({
  id: idx + 1,
  sectionKey: key,
  content: value,
  updatedAt: new Date(),
}));

export const memoryStore = {
  admins: [...initialAdmins],
  sessions: [] as Array<{ id: string; adminId: number; expiresAt: Date; createdAt: Date }>,
  students: [...initialStudents],
  siteContent: [...initialSiteContent],
  cmsSections: [...initialCmsSections],
};

let studentAutoId = 7;
let siteContentAutoId = 2;
let adminAutoId = 3;
let cmsSectionAutoId = 11;

function unwrapParens(cond: any) {
  if (
    cond?.queryChunks?.length === 3 &&
    Array.isArray(cond.queryChunks[0]?.value) &&
    cond.queryChunks[0].value.join("").trim() === "(" &&
    Array.isArray(cond.queryChunks[2]?.value) &&
    cond.queryChunks[2].value.join("").trim() === ")"
  ) {
    return cond.queryChunks[1];
  }
  return cond;
}

function getRowValue(row: any, colName: string): any {
  if (!row) return undefined;
  if (row[colName] !== undefined) return row[colName];
  const camel = colName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  if (row[camel] !== undefined) return row[camel];
  if (row.session) {
    const s: any = getRowValue(row.session, colName);
    if (s !== undefined) return s;
  }
  if (row.admin) {
    const a: any = getRowValue(row.admin, colName);
    if (a !== undefined) return a;
  }
  return undefined;
}

function evaluateSingleCondition(cond: any, row: any): boolean {
  let colName: string | null = null;
  let operator = "=";
  let paramVal: any = undefined;
  let foundParam = false;

  const walk = (c: any) => {
    if (!c) return;
    if (c.queryChunks && Array.isArray(c.queryChunks)) {
      for (const sub of c.queryChunks) walk(sub);
      return;
    }
    if ("name" in c && c.dataType) {
      colName = c.name;
    } else if ("value" in c && !Array.isArray(c.value)) {
      paramVal = c.value;
      foundParam = true;
    } else if ("value" in c && Array.isArray(c.value)) {
      const opStr = c.value.join("").trim();
      if (["=", ">", "<", ">=", "<=", "!=", "<>"].includes(opStr)) {
        operator = opStr;
      }
    }
  };

  walk(cond);

  if (colName && foundParam) {
    const actualVal = getRowValue(row, colName);
    if (operator === "=") {
      return actualVal == paramVal || String(actualVal) === String(paramVal);
    }
    if (operator === "!=" || operator === "<>") {
      return actualVal !== paramVal && String(actualVal) !== String(paramVal);
    }
    if (operator === ">") {
      return actualVal > paramVal;
    }
    if (operator === ">=") {
      return actualVal >= paramVal;
    }
    if (operator === "<") {
      return actualVal < paramVal;
    }
    if (operator === "<=") {
      return actualVal <= paramVal;
    }
  }
  return true;
}

function evaluateCondition(cond: any, row: any): boolean {
  if (!cond) return true;
  if (typeof cond === "function") {
    try {
      return cond(row);
    } catch {
      return true;
    }
  }
  if (cond.__test) {
    try {
      return cond.__test(row);
    } catch {
      return true;
    }
  }

  const unwrapped = unwrapParens(cond);
  if (!unwrapped || !unwrapped.queryChunks) return true;

  const subConditions: any[] = [];
  let currentOp = "and";

  for (const chunk of unwrapped.queryChunks) {
    if (chunk && chunk.queryChunks) {
      subConditions.push(chunk);
    } else if (chunk && Array.isArray(chunk.value)) {
      const text = chunk.value.join("").toLowerCase();
      if (text.includes(" or ")) currentOp = "or";
      else if (text.includes(" and ")) currentOp = "and";
    }
  }

  if (subConditions.length > 1) {
    if (currentOp === "or") {
      return subConditions.some((sc) => evaluateCondition(sc, row));
    }
    return subConditions.every((sc) => evaluateCondition(sc, row));
  }

  return evaluateSingleCondition(unwrapped, row);
}

function createOrderComparator(orderItem: any) {
  if (!orderItem) return () => 0;
  if (typeof orderItem === "function") return orderItem;

  if (orderItem.queryChunks) {
    let colName: string | null = null;
    let isDesc = false;

    for (const chunk of orderItem.queryChunks) {
      if (chunk && "name" in chunk && chunk.dataType) {
        colName = chunk.name;
      } else if (chunk && Array.isArray(chunk.value)) {
        const str = chunk.value.join("").toLowerCase();
        if (str.includes("desc")) isDesc = true;
      }
    }

    if (colName) {
      const camel = colName.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      return (a: any, b: any) => {
        const valA = a[colName!] ?? a[camel];
        const valB = b[colName!] ?? b[camel];
        if (valA === valB) return 0;
        if (valA > valB) return isDesc ? -1 : 1;
        return isDesc ? 1 : -1;
      };
    }
  }

  return () => 0;
}

function createMockDb() {
  const getTableName = (table: any) => {
    if (table === adminsTable || table?._?.name === "admins") return "admins";
    if (table === sessionsTable || table?._?.name === "admin_sessions") return "sessions";
    if (table === studentsTable || table?._?.name === "students") return "students";
    if (table === siteContentTable || table?._?.name === "site_content") return "siteContent";
    if (table === cmsSectionsTable || table?._?.name === "cms_sections") return "cmsSections";
    return "students";
  };

  return {
    select: (_fields?: any) => ({
      from: (table: any) => {
        const tableName = getTableName(table);

        const executeQuery = (opts: { whereFilter?: any; orders?: any[]; limitNum?: number; joinTable?: any }) => {
          let data: any[] = (memoryStore as any)[tableName] || [];

          if (opts.joinTable && tableName === "sessions") {
            data = data
              .map((sess) => {
                const adm = memoryStore.admins.find((a) => a.id === sess.adminId);
                return { admin: adm, session: sess };
              })
              .filter((item) => item.admin != null);
          }

          if (opts.whereFilter) {
            data = data.filter((row) => evaluateCondition(opts.whereFilter, row));
          }

          if (opts.orders && opts.orders.length > 0) {
            for (const orderItem of opts.orders) {
              const comp = createOrderComparator(orderItem);
              data = [...data].sort(comp);
            }
          }

          if (typeof opts.limitNum === "number") {
            data = data.slice(0, opts.limitNum);
          }

          return data;
        };

        const queryState: any = {
          innerJoin: (joinTbl: any, _onCondition: any) => {
            queryState._joinTable = joinTbl;
            return queryState;
          },
          where: (condition: any) => {
            queryState._where = condition;
            return queryState;
          },
          orderBy: (...orders: any[]) => {
            queryState._orders = orders;
            return queryState;
          },
          limit: (n: number) => {
            queryState._limit = n;
            return queryState;
          },
          then: (resolve: any, reject?: any) => {
            try {
              const result = executeQuery({
                whereFilter: queryState._where,
                orders: queryState._orders,
                limitNum: queryState._limit,
                joinTable: queryState._joinTable,
              });
              return Promise.resolve(result).then(resolve, reject);
            } catch (err) {
              if (reject) return reject(err);
              throw err;
            }
          },
        };

        return queryState;
      },
    }),

    insert: (table: any) => ({
      values: (valOrVals: any) => ({
        returning: async () => {
          const items = Array.isArray(valOrVals) ? valOrVals : [valOrVals];
          const results: any[] = [];
          for (const item of items) {
            if (table === studentsTable || table?._?.name === "students") {
              const newRow = {
                id: studentAutoId++,
                createdAt: new Date(),
                updatedAt: new Date(),
                levelHistory: [],
                placement: null,
                ...item,
              };
              memoryStore.students.unshift(newRow);
              results.push(newRow);
            } else if (table === siteContentTable || table?._?.name === "site_content") {
              const newRow = {
                id: siteContentAutoId++,
                updatedAt: new Date(),
                ...item,
              };
              memoryStore.siteContent.unshift(newRow);
              results.push(newRow);
            } else if (table === cmsSectionsTable || table?._?.name === "cms_sections") {
              const newRow = {
                id: cmsSectionAutoId++,
                updatedAt: new Date(),
                ...item,
              };
              memoryStore.cmsSections.unshift(newRow);
              results.push(newRow);
            } else if (table === sessionsTable || table?._?.name === "admin_sessions") {
              const newRow = {
                createdAt: new Date(),
                ...item,
              };
              memoryStore.sessions.unshift(newRow);
              results.push(newRow);
            } else if (table === adminsTable || table?._?.name === "admins") {
              const newRow = {
                id: adminAutoId++,
                createdAt: new Date(),
                ...item,
              };
              memoryStore.admins.unshift(newRow);
              results.push(newRow);
            }
          }
          return results;
        },
        then: (resolve: any, reject?: any) => {
          const items = Array.isArray(valOrVals) ? valOrVals : [valOrVals];
          for (const item of items) {
            if (table === sessionsTable || table?._?.name === "admin_sessions") {
              memoryStore.sessions.unshift({ createdAt: new Date(), ...item });
            } else if (table === studentsTable || table?._?.name === "students") {
              memoryStore.students.unshift({ id: studentAutoId++, createdAt: new Date(), updatedAt: new Date(), ...item });
            } else if (table === siteContentTable || table?._?.name === "site_content") {
              memoryStore.siteContent.unshift({ id: siteContentAutoId++, updatedAt: new Date(), ...item });
            } else if (table === cmsSectionsTable || table?._?.name === "cms_sections") {
              memoryStore.cmsSections.unshift({ id: cmsSectionAutoId++, updatedAt: new Date(), ...item });
            } else if (table === adminsTable || table?._?.name === "admins") {
              memoryStore.admins.unshift({ id: adminAutoId++, createdAt: new Date(), ...item });
            }
          }
          return Promise.resolve(items).then(resolve, reject);
        },
      }),
    }),

    update: (table: any) => ({
      set: (updateData: any) => {
        const tableName = getTableName(table);

        const updateFn = (condition: any) => {
          const performUpdate = () => {
            const results: any[] = [];
            let data: any[] = (memoryStore as any)[tableName] || [];

            (memoryStore as any)[tableName] = data.map((item) => {
              if (evaluateCondition(condition, item)) {
                const updated = { ...item, ...updateData, updatedAt: new Date() };
                results.push(updated);
                return updated;
              }
              return item;
            });

            return results.length ? results : [updateData];
          };

          return {
            returning: async () => performUpdate(),
            then: (resolve: any, reject?: any) => {
              try {
                const res = performUpdate();
                return Promise.resolve(res).then(resolve, reject);
              } catch (err) {
                if (reject) return reject(err);
                throw err;
              }
            },
          };
        };

        return {
          where: updateFn,
        };
      },
    }),

    delete: (table: any) => ({
      where: (condition: any) => {
        const tableName = getTableName(table);

        const performDelete = () => {
          const initial = (memoryStore as any)[tableName] || [];
          (memoryStore as any)[tableName] = initial.filter(
            (item: any) => !evaluateCondition(condition, item)
          );
          return [];
        };

        return {
          returning: async () => performDelete(),
          then: (resolve: any, reject?: any) => {
            try {
              const res = performDelete();
              return Promise.resolve(res).then(resolve, reject);
            } catch (err) {
              if (reject) return reject(err);
              throw err;
            }
          },
        };
      },
    }),
  };
}

let pool: any = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 4000,
    });
    db = drizzle(pool, { schema });
  } catch (e) {
    console.warn("[DB] Could not initialize PostgreSQL connection, using in-memory store", e);
    db = createMockDb();
  }
} else {
  db = createMockDb();
}

async function ensurePostgresTables() {
  if (!pool) return;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS admin_sessions (
          id TEXT PRIMARY KEY,
          admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS students (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          photo_url TEXT,
          level TEXT NOT NULL,
          status TEXT NOT NULL,
          cohort TEXT NOT NULL,
          joined_at DATE NOT NULL,
          bio TEXT,
          speaking_video_url TEXT,
          certificate_name TEXT,
          certificate_url TEXT,
          level_history JSONB NOT NULL DEFAULT '[]'::jsonb,
          placement JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS site_content (
          id SERIAL PRIMARY KEY,
          eyebrow TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          primary_cta TEXT NOT NULL,
          secondary_cta TEXT NOT NULL,
          intro_label TEXT NOT NULL,
          intro_text TEXT NOT NULL,
          stat_one_value TEXT NOT NULL,
          stat_one_label TEXT NOT NULL,
          stat_two_value TEXT NOT NULL,
          stat_two_label TEXT NOT NULL,
          stat_three_value TEXT NOT NULL,
          stat_three_label TEXT NOT NULL,
          stat_four_value TEXT NOT NULL,
          stat_four_label TEXT NOT NULL,
          trust_title TEXT NOT NULL,
          trust_text TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS cms_sections (
          id SERIAL PRIMARY KEY,
          section_key TEXT NOT NULL UNIQUE,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      console.log("[DB] PostgreSQL tables checked/created successfully.");
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn("[DB] Note on table check (non-fatal, fallback to memory if offline):", err);
  }
}

export async function seedDevelopmentData() {
  try {
    await ensurePostgresTables();

    // 1. Seed or Synchronize Admin credentials from .env
    const { email: envAdminEmail, password: envAdminPass } = getEnvAdminCredentials();
    const envAdminHash = hashPassword(envAdminPass);

    const [existingEnvAdmin] = await db
      .select({ id: adminsTable.id, email: adminsTable.email })
      .from(adminsTable)
      .where(eq(adminsTable.email, envAdminEmail))
      .limit(1);

    if (!existingEnvAdmin) {
      await db.insert(adminsTable).values({
        email: envAdminEmail,
        name: "Admin Utama",
        passwordHash: envAdminHash,
        createdAt: new Date(),
      });
    } else {
      // Always update passwordHash and name to guarantee synchronization with .env
      await db.update(adminsTable).set({
        passwordHash: envAdminHash,
        name: "Admin Utama",
      }).where(eq(adminsTable.id, existingEnvAdmin.id));
    }

    // Purge any other admins not matching .env so only the .env configured admin can login
    try {
      if (pool) {
        const client = await pool.connect();
        try {
          await client.query("DELETE FROM admins WHERE LOWER(email) != $1", [envAdminEmail]);
        } finally {
          client.release();
        }
      } else {
        memoryStore.admins = memoryStore.admins.filter(
          (a) => a.email.toLowerCase() === envAdminEmail
        );
      }
    } catch (cleanErr) {
      console.warn("[DB] Note on admin isolation:", cleanErr);
    }

    // 2. Seed Students
    const [existingStudents] = await db.select({ id: studentsTable.id }).from(studentsTable).limit(1);
    if (!existingStudents) {
      await db.insert(studentsTable).values(initialStudents);
    }

    // 3. Seed SiteContent
    const [existingContent] = await db.select({ id: siteContentTable.id }).from(siteContentTable).limit(1);
    if (!existingContent) {
      await db.insert(siteContentTable).values(initialSiteContent);
    }

    // 4. Seed all CMS sections
    for (const [key, val] of Object.entries(defaultCmsData)) {
      const [existingSection] = await db
        .select({ id: cmsSectionsTable.id })
        .from(cmsSectionsTable)
        .where(eq(cmsSectionsTable.sectionKey, key))
        .limit(1);

      if (!existingSection) {
        await db.insert(cmsSectionsTable).values({
          sectionKey: key,
          content: val,
          updatedAt: new Date(),
        });
      }
    }
    console.log("[DB] PostgreSQL / in-memory database initialized and seeded successfully.");
  } catch (err) {
    console.warn("[DB] Error seeding data (non-fatal):", err);
  }
}

export { pool, db };
export * from "./schema/index";
export * from "./default-cms";
