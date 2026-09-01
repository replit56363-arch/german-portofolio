import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { scryptSync, randomBytes } from "node:crypto";
import * as schema from "./schema";
import { adminsTable, sessionsTable, studentsTable, siteContentTable } from "./schema";

const { Pool } = pg;

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

// In-Memory store for offline/demo operation without external Postgres
const initialAdmins = [
  {
    id: 1,
    email: "admin@sprachraum.de",
    name: "Admin Sprachraum",
    passwordHash: hashPassword("Demo1234!"),
    createdAt: new Date("2024-01-01"),
  },
];

const initialSiteContent = [
  {
    id: 1,
    eyebrow: "Lernpfad · Partner portfolio",
    title: "Bukti kesiapan, lebih dekat.",
    description: "Ruang kerja untuk mengelola portofolio bahasa siswa dan menghubungkan talenta siap kerja dengan partner Jerman.",
    primaryCta: "Lihat katalog siswa",
    secondaryCta: "Kelola konten halaman",
    introLabel: "Satu profil. Lebih banyak peluang.",
    introText: "Kami mendampingi siswa dari fondasi A1 hingga kesiapan profesional B2, dengan bukti kemampuan yang mudah dipahami partner.",
    statOneValue: "A1–B2",
    statOneLabel: "Level terukur",
    statTwoValue: "100%",
    statTwoLabel: "Profil terdokumentasi",
    statThreeValue: "1:1",
    statThreeLabel: "Pendampingan karier",
    statFourValue: "DE",
    statFourLabel: "Fokus penempatan",
    trustTitle: "Portofolio yang siap dibagikan.",
    trustText: "Gunakan data ini sebagai dasar percakapan yang lebih cepat, terarah, dan percaya diri bersama partner penempatan.",
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

const memoryStore = {
  admins: [...initialAdmins],
  sessions: [] as Array<{ id: string; adminId: number; expiresAt: Date; createdAt: Date }>,
  students: [...initialStudents],
  siteContent: [...initialSiteContent],
};

let studentAutoId = 7;
let siteContentAutoId = 2;
let adminAutoId = 2;

function createMockDb() {
  return {
    select: (fields?: any) => ({
      from: (table: any) => {
        const getTableName = () => {
          if (table === adminsTable || table?._?.name === "admins") return "admins";
          if (table === sessionsTable || table?._?.name === "admin_sessions") return "sessions";
          if (table === studentsTable || table?._?.name === "students") return "students";
          if (table === siteContentTable || table?._?.name === "site_content") return "siteContent";
          return "students";
        };

        const executeQuery = (opts: { whereFilter?: any; orderFn?: any; limitNum?: number; joinTable?: any }) => {
          const tableName = getTableName();
          let data: any[] = (memoryStore as any)[tableName] || [];

          if (opts.joinTable && tableName === "sessions") {
            data = data.map((sess) => {
              const adm = memoryStore.admins.find((a) => a.id === sess.adminId);
              return { admin: adm, session: sess };
            }).filter((item) => item.admin != null);
          }

          if (opts.whereFilter) {
            data = data.filter((row) => {
              try {
                return opts.whereFilter(row);
              } catch {
                return true;
              }
            });
          }

          if (opts.orderFn) {
            data = [...data].sort(opts.orderFn);
          }

          if (typeof opts.limitNum === "number") {
            data = data.slice(0, opts.limitNum);
          }

          return data;
        };

        const queryState: any = {
          innerJoin: (joinTbl: any, onCondition: any) => {
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
              let filterFn: any = undefined;
              if (queryState._where) {
                const cond = queryState._where;
                if (typeof cond === "function") {
                  filterFn = cond;
                } else if (cond?.op === "eq") {
                  filterFn = (row: any) => {
                    const val = typeof cond.val === "function" ? cond.val(row) : cond.val;
                    const fieldVal = cond.field?.name ? (row[cond.field.name] ?? row?.admin?.[cond.field.name] ?? row?.session?.[cond.field.name]) : undefined;
                    return fieldVal === val;
                  };
                }
              }

              const result = executeQuery({
                whereFilter: filterFn,
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

        // Make it an awaitable thenable directly
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
            } else if (table === adminsTable || table?._?.name === "admins") {
              memoryStore.admins.unshift({ id: adminAutoId++, createdAt: new Date(), ...item });
            }
          }
          return Promise.resolve(items).then(resolve, reject);
        },
      }),
    }),

    update: (table: any) => ({
      set: (updateData: any) => ({
        where: (condition: any) => ({
          returning: async () => {
            const results: any[] = [];
            if (table === studentsTable || table?._?.name === "students") {
              memoryStore.students = memoryStore.students.map((student) => {
                const isMatch = condition?.__test ? condition.__test(student) : true;
                if (isMatch) {
                  const updated = { ...student, ...updateData, updatedAt: new Date() };
                  results.push(updated);
                  return updated;
                }
                return student;
              });
            } else if (table === siteContentTable || table?._?.name === "site_content") {
              memoryStore.siteContent = memoryStore.siteContent.map((content) => {
                const isMatch = condition?.__test ? condition.__test(content) : true;
                if (isMatch) {
                  const updated = { ...content, ...updateData, updatedAt: new Date() };
                  results.push(updated);
                  return updated;
                }
                return content;
              });
            }
            return results.length ? results : [updateData];
          },
        }),
      }),
    }),

    delete: (table: any) => ({
      where: async (condition: any) => {
        if (table === sessionsTable || table?._?.name === "admin_sessions") {
          memoryStore.sessions = memoryStore.sessions.filter((sess) => !(condition?.__test ? condition.__test(sess) : true));
        } else if (table === studentsTable || table?._?.name === "students") {
          memoryStore.students = memoryStore.students.filter((stud) => !(condition?.__test ? condition.__test(stud) : true));
        }
        return [];
      },
    }),
  };
}

let pool: any = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  } catch (e) {
    console.warn("[DB] Could not initialize PostgreSQL connection, using in-memory store", e);
    db = createMockDb();
  }
} else {
  db = createMockDb();
}

export { pool, db };
export * from "./schema";
