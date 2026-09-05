import pg from "pg";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scryptSync, randomBytes } from "node:crypto";
import { defaultCmsData } from "../../lib/db/src/default-cms.js";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

function loadEnvFile() {
  const envPath = path.resolve(rootDir, ".env");
  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
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
  }
}

loadEnvFile();

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const databaseUrl =
  process.env.DATABASE_URL || "postgresql://postgres:EDUJUANDA12345@localhost:5432/LPK";
const adminEmail = (process.env.ADMIN_EMAIL || "admin@co.id").trim().toLowerCase();
const adminPassword = (process.env.ADMIN_PASSWORD || "password123").trim();

const initialStudents = [
  {
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
    levelHistory: JSON.stringify([
      { level: "A1", completedAt: "2024-04-15", score: 88 },
      { level: "A2", completedAt: "2024-07-20", score: 92 },
    ]),
    placement: null,
  },
  {
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
    levelHistory: JSON.stringify([
      { level: "A1", completedAt: "2024-02-01", score: 95 },
      { level: "A2", completedAt: "2024-04-10", score: 90 },
      { level: "B1", completedAt: "2024-06-15", score: 85 },
      { level: "B2", completedAt: "2024-08-20", score: 88 },
    ]),
    placement: JSON.stringify({
      country: "Jerman",
      program: "Ausbildung Keperawatan (Pflegefachfrau)",
      company: "Universitätsklinikum Frankfurt",
      placedAt: "2024-09-01",
    }),
  },
  {
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
    levelHistory: JSON.stringify([
      { level: "A1", completedAt: "2024-04-01", score: 84 },
      { level: "A2", completedAt: "2024-06-01", score: 86 },
      { level: "B1", completedAt: "2024-08-10", score: 82 },
    ]),
    placement: null,
  },
  {
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
    levelHistory: JSON.stringify([{ level: "A1", completedAt: "2024-08-15", score: null }]),
    placement: null,
  },
  {
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
    levelHistory: JSON.stringify([
      { level: "A1", completedAt: "2024-02-15", score: 90 },
      { level: "A2", completedAt: "2024-04-20", score: 92 },
      { level: "B1", completedAt: "2024-06-30", score: 88 },
      { level: "B2", completedAt: "2024-08-10", score: 91 },
    ]),
    placement: JSON.stringify({
      country: "Jerman",
      program: "Freiwilliges Soziales Jahr (FSJ)",
      company: "Deutsches Rotes Kreuz Hamburg",
      placedAt: "2024-08-15",
    }),
  },
  {
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
    levelHistory: JSON.stringify([
      { level: "A1", completedAt: "2024-05-15", score: 92 },
      { level: "A2", completedAt: "2024-07-15", score: 89 },
      { level: "B1", completedAt: "2024-09-01", score: null },
    ]),
    placement: null,
  },
];

async function pushDatabase() {
  console.log("\n=======================================================");
  console.log("🚀 PostgreSQL Database Push & Schema Migration Script");
  console.log("=======================================================\n");

  const maskedUrl = databaseUrl.replace(/:([^:@]+)@/, ":****@");
  console.log(`📌 Target DATABASE_URL: ${maskedUrl}`);
  console.log(`👤 Admin Email         : ${adminEmail}`);

  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 5000,
  });

  let client;
  try {
    console.log("\n⏳ Mencoba menghubungkan ke server PostgreSQL...");
    client = await pool.connect();
    console.log("✅ Berhasil terhubung ke server PostgreSQL!");
  } catch (connErr: any) {
    console.error("\n❌ Tidak dapat terhubung ke PostgreSQL:");
    console.error(`   Pesan error: ${connErr?.message || connErr}`);
    console.log("\n💡 Panduan Pemecahan Masalah:");
    console.log("   1. Pastikan server PostgreSQL sedang aktif (service postgresql start / Docker).");
    console.log("   2. Periksa kecocokan kredensial di file .env:");
    console.log(`      DATABASE_URL=${maskedUrl}`);
    console.log("   3. Jika Anda menjalankan PostgreSQL di lokal lewat Docker:");
    console.log("      docker run --name lpk-postgres -e POSTGRES_PASSWORD=EDUJUANDA12345 -e POSTGRES_DB=LPK -p 5432:5432 -d postgres:16-alpine");
    console.log("\nℹ️ Catatan: Aplikasi web (ExpressJS + React) tetap dapat berjalan normal");
    console.log("   menggunakan fallback in-memory store saat PostgreSQL belum terhubung.\n");
    await pool.end();
    process.exit(1);
  }

  try {
    console.log("\n🛠️  Menjalankan DDL Schema Migration...");

    // 1. Admins Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("  ✓ Tabel 'admins' siap");

    // 2. Admin Sessions Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("  ✓ Tabel 'admin_sessions' siap");

    // 3. Students Table
    await client.query(`
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
    `);
    console.log("  ✓ Tabel 'students' siap");

    // 4. Site Content Table
    await client.query(`
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
    `);
    console.log("  ✓ Tabel 'site_content' siap");

    // 5. CMS Sections Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cms_sections (
        id SERIAL PRIMARY KEY,
        section_key TEXT NOT NULL UNIQUE,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("  ✓ Tabel 'cms_sections' siap");

    // Indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_students_level ON students(level);
      CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
      CREATE INDEX IF NOT EXISTS idx_students_cohort ON students(cohort);
      CREATE INDEX IF NOT EXISTS idx_cms_sections_key ON cms_sections(section_key);
    `);
    console.log("  ✓ Indeks database berhasil dibuat/diverifikasi");

    // ================= SEEDING & SYNCHRONIZATION =================
    console.log("\n🌱 Sinkronisasi & Seeding Data Awal...");

    // 1. Admin sync
    const adminCheck = await client.query("SELECT id, email FROM admins WHERE email = $1 LIMIT 1", [adminEmail]);
    const hashedPass = hashPassword(adminPassword);

    if (adminCheck.rows.length === 0) {
      await client.query(
        "INSERT INTO admins (email, name, password_hash, created_at) VALUES ($1, $2, $3, NOW())",
        [adminEmail, "Admin Utama", hashedPass]
      );
      console.log(`  ✓ Akun admin dibuat: ${adminEmail}`);
    } else {
      await client.query(
        "UPDATE admins SET password_hash = $1, name = 'Admin Utama' WHERE email = $2",
        [hashedPass, adminEmail]
      );
      console.log(`  ✓ Akun admin diperbarui dan disinkronkan: ${adminEmail}`);
    }

    // 2. Students seed
    const studentsCountRes = await client.query("SELECT COUNT(*) FROM students");
    const studentsCount = parseInt(studentsCountRes.rows[0].count, 10);
    if (studentsCount === 0) {
      console.log("  → Mengisi 6 data siswa awal...");
      for (const s of initialStudents) {
        await client.query(
          `INSERT INTO students (name, email, phone, photo_url, level, status, cohort, joined_at, bio, speaking_video_url, certificate_name, certificate_url, level_history, placement, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())`,
          [
            s.name,
            s.email,
            s.phone,
            s.photoUrl,
            s.level,
            s.status,
            s.cohort,
            s.joinedAt,
            s.bio,
            s.speakingVideoUrl,
            s.certificateName,
            s.certificateUrl,
            s.levelHistory,
            s.placement,
          ]
        );
      }
      console.log("  ✓ Data siswa berhasil dimasukkan");
    } else {
      console.log(`  ✓ Data siswa sudah ada (${studentsCount} siswa ditemukan)`);
    }

    // 3. Site content seed
    const siteContentCountRes = await client.query("SELECT COUNT(*) FROM site_content");
    const siteContentCount = parseInt(siteContentCountRes.rows[0].count, 10);
    if (siteContentCount === 0) {
      await client.query(
        `INSERT INTO site_content (
          eyebrow, title, description, primary_cta, secondary_cta,
          intro_label, intro_text, stat_one_value, stat_one_label,
          stat_two_value, stat_two_label, stat_three_value, stat_three_label,
          stat_four_value, stat_four_label, trust_title, trust_text, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW()
        )`,
        [
          "Lembaga Kursus Bahasa Jerman Resmi · Medan",
          "ICH LIEBE DEUTSCH MEDAN",
          "Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik bersama pendiri lulusan UNIMED yang berpengalaman 6 tahun tinggal di Jerman.",
          "Konsultasi WhatsApp",
          "Lihat 5 Program Kursus",
          "Unsere Vision",
          "“Deutsch lernen. Deutschland verstehen. Zukunft gestalten.” — Belajar bahasa Jerman, memahami kehidupan di Jerman, dan mempersiapkan masa depan dengan lebih baik.",
          "A1–B2",
          "Kursus Bahasa Jerman",
          "5 Program",
          "Jalur Ke Jerman",
          "2024",
          "Terdaftar & Berizin Operasional",
          "6 Tahun",
          "Pengalaman Pendiri di DE",
          "Kehadiran Kami Berawal Dari Komitmen",
          "Ich Liebe Deutsch Medan siap mendampingi masyarakat Kota Medan dan seluruh Indonesia untuk melangkah, beradaptasi, dan berkembang di Jerman.",
        ]
      );
      console.log("  ✓ Data site_content awal berhasil dimasukkan");
    } else {
      console.log("  ✓ Data site_content sudah tersedia");
    }

    // 4. CMS Sections seed
    console.log("  → Memeriksa 10 bagian CMS...");
    let newSectionsCount = 0;
    for (const [secKey, secContent] of Object.entries(defaultCmsData)) {
      const existsRes = await client.query("SELECT id FROM cms_sections WHERE section_key = $1 LIMIT 1", [secKey]);
      if (existsRes.rows.length === 0) {
        await client.query(
          "INSERT INTO cms_sections (section_key, content, updated_at) VALUES ($1, $2, NOW())",
          [secKey, JSON.stringify(secContent)]
        );
        newSectionsCount++;
      }
    }
    console.log(`  ✓ 10 Bagian CMS lengkap (${newSectionsCount} bagian baru dimasukkan)`);

    // ================= SUMMARY REPORT =================
    console.log("\n📊 Ringkasan Data PostgreSQL Terkini:");
    const [cAdmins, cStudents, cContent, cSections] = await Promise.all([
      client.query("SELECT COUNT(*) FROM admins"),
      client.query("SELECT COUNT(*) FROM students"),
      client.query("SELECT COUNT(*) FROM site_content"),
      client.query("SELECT COUNT(*) FROM cms_sections"),
    ]);

    console.log(`  • Admins        : ${cAdmins.rows[0].count} baris`);
    console.log(`  • Siswa         : ${cStudents.rows[0].count} baris`);
    console.log(`  • Site Content  : ${cContent.rows[0].count} baris`);
    console.log(`  • CMS Sections  : ${cSections.rows[0].count} bagian halaman`);

    console.log("\n🎉 Push skema dan sinkronisasi database PostgreSQL SELESAI!");
    console.log("=======================================================\n");
  } catch (runErr: any) {
    console.error("\n❌ Terjadi kesalahan saat migrasi/seeding:", runErr);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

pushDatabase().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
