import { Language } from "./language-context";

export type NewsItem = {
  id: number | string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  author?: string;
  featured?: boolean;
  tone?: "coral" | "sea" | "butter" | "ink" | "lavender" | string;
  published?: boolean;
  title_de?: string;
  title_en?: string;
  excerpt_de?: string;
  excerpt_en?: string;
  content_de?: string;
  content_en?: string;
  category_de?: string;
  category_en?: string;
  author_de?: string;
  author_en?: string;
};

export type MultilingualArticle = {
  id: number | string;
  date: {
    id: string;
    de: string;
    en: string;
  };
  category: {
    id: string;
    de: string;
    en: string;
  };
  title: {
    id: string;
    de: string;
    en: string;
  };
  excerpt: {
    id: string;
    de: string;
    en: string;
  };
  content: {
    id: string;
    de: string;
    en: string;
  };
  author: {
    id: string;
    de: string;
    en: string;
  };
  featured?: boolean;
  tone?: "coral" | "sea" | "butter" | "ink" | "lavender" | string;
  imageUrl?: string;
  published?: boolean;
};

export const defaultMultilingualArticles: MultilingualArticle[] = [
  {
    id: 1,
    date: {
      id: "18 JUN 2024",
      de: "18. JUN 2024",
      en: "18 JUN 2024",
    },
    category: {
      id: "Media",
      de: "Medien",
      en: "Media",
    },
    title: {
      id: "Bagaimana peserta Ausbildung dari Indonesia membantu menjawab kebutuhan tenaga kerja?",
      de: "Wie Auszubildende aus Indonesien zur Deckung des Fachkräftebedarfs beitragen",
      en: "How Indonesian Ausbildung trainees help address the skilled labor shortage",
    },
    excerpt: {
      id: "ICH LIEBE DEUTSCH MEDAN berbagi perspektif tentang persiapan kandidat, kualitas pendampingan, dan proses membangun masa depan lintas negara.",
      de: "ICH LIEBE DEUTSCH MEDAN teilt Einblicke in die Kandidatenvorbereitung, Begleitungsqualität und den Aufbau einer internationalen Zukunft.",
      en: "ICH LIEBE DEUTSCH MEDAN shares perspectives on candidate preparation, quality mentoring, and building an international career.",
    },
    content: {
      id: `Proses perpindahan lintas negara untuk pendidikan vokasi (Ausbildung) memerlukan perencanaan yang matang dan rasa saling percaya antara calon peserta, lembaga pengirim, dan perusahaan penerima di Jerman.\n\nDalam wawancara khusus ini, tim ICH LIEBE DEUTSCH MEDAN memaparkan bagaimana kombinasi pembelajaran bahasa Jerman intensif (hingga tingkat B1/B2) serta pengenalan budaya kerja secara nyata terbukti meminimalisir kendala komunikasi pada bulan-bulan pertama di Jerman.\n\n"Kami tidak hanya mengajarkan tata bahasa, tetapi juga kebiasaan kerja sehari-hari di Jerman, seperti ketepatan waktu, kemandirian dalam menyampaikan kendala, dan pemahaman tentang hak serta kewajiban sebagai peserta Ausbildung," ungkap perwakilan tim ICH LIEBE DEUTSCH MEDAN.\n\nDengan pendampingan berkelanjutan hingga peserta tiba di lokasi dan memulai hari pertamanya, kami berkomitmen memastikan bahwa setiap talenta muda Indonesia memiliki fondasi yang kokoh untuk sukses di lingkungan profesional internasional.`,
      de: `Der länderübergreifende Wechsel für eine duale Berufsausbildung in Deutschland erfordert eine sorgfältige Planung und ein hohes Maß an gegenseitigem Vertrauen zwischen Bewerbern, dem Vorbereitungsinstitut und den aufnehmenden Ausbildungsbetrieben.\n\nIn diesem Fachbeitrag erläutert das Team von ICH LIEBE DEUTSCH MEDAN, wie die Kombination aus intensivem Deutschunterricht (bis Niveau B1/B2) und praxisnaher Einführung in die deutsche Arbeitskultur Sprach- und Anpassungsbarrieren in den ersten Monaten spürbar abbaut.\n\n„Wir vermitteln nicht nur Grammatikregeln, sondern auch den gelebten Berufsalltag in Deutschland – darunter Pünktlichkeit, proaktive Kommunikation bei Herausforderungen sowie ein klares Verständnis der Rechte und Pflichten als Auszubildende“, erklärt die Leitung von ICH LIEBE DEUTSCH MEDAN.\n\nDurch unsere kontinuierliche Begleitung bis zum Eintreffen am Ausbildungsort und dem erfolgreichen Einstieg in den Berufsalltag stellen wir sicher, dass junge indonesische Talente ein verlässliches Fundament für ihre Zukunft in Deutschland erhalten.`,
      en: `Moving across borders for vocational training (Ausbildung) in Germany requires meticulous planning and mutual trust between applicants, sending institutes, and receiving German employers.\n\nIn this special interview, the ICH LIEBE DEUTSCH MEDAN team shares how combining intensive German language preparation (up to level B1/B2) with practical orientation to German workplace culture minimizes communication hurdles in the crucial early months.\n\n"We do not merely teach grammar; we cultivate everyday professional habits in Germany, such as punctuality, open problem-solving, and a thorough understanding of rights and obligations as an apprentice," notes the ICH LIEBE DEUTSCH MEDAN team.\n\nWith continuous guidance up to arrival on site and starting the first working day, we are committed to ensuring every young Indonesian talent builds a resilient foundation for long-term international success.`,
    },
    author: {
      id: "Tim Redaksi ILD Medan",
      de: "Redaktionsteam ILD Medan",
      en: "ILD Medan Editorial Team",
    },
    featured: true,
    tone: "coral",
    published: true,
  },
  {
    id: 2,
    date: {
      id: "12 JUN 2024",
      de: "12. JUN 2024",
      en: "12 JUN 2024",
    },
    category: {
      id: "Cerita",
      de: "Erfahrungsbericht",
      en: "Story",
    },
    title: {
      id: "Dari Medan ke dapur hotel di Baden-Württemberg",
      de: "Von Medan in die Hotelküche in Baden-Württemberg",
      en: "From Medan to a Hotel Kitchen in Baden-Württemberg",
    },
    excerpt: {
      id: "Satu perjalanan peserta, dari kelas bahasa hingga hari pertama mengenal tempat kerja barunya di Jerman.",
      de: "Der Weg eines Teilnehmers: Vom intensiven Sprachkurs in Medan bis zum ersten Tag im neuen Ausbildungsbetrieb in Deutschland.",
      en: "One student's journey: From intensive language classes in Medan to the first day at work in Germany.",
    },
    content: {
      id: `Perjalanan melintasi benua selalu dimulai dari satu langkah berani. Bagi kawan kita dari Medan, impian menjadi juru masak profesional di Jerman diwujudkan melalui dedikasi belajar bahasa Jerman selama berbulan-bulan intensif.\n\nHari pertama bekerja di dapur hotel berbintang di kawasan Baden-Württemberg membawa kesan yang tak terlupakan. Dari mempelajari kosakata peralatan masak dalam bahasa Jerman hingga beradaptasi dengan ritme dapur profesional yang cepat.\n\n"Tim di tempat kerja sangat menyambut hangat. Meskipun awalnya agak canggung berbicara bahasa Jerman secara langsung, persiapan saat kelas di Medan sangat membantu saya memahami instruksi Chef," ceritanya.\n\nKisah ini menjadi bukti bahwa dengan niat yang kuat dan sistem pendampingan yang tepat, mimpi karier internasional dapat terwujud secara terarah.`,
      de: `Eine Reise über Kontinente hinweg beginnt stets mit einem mutigen ersten Schritt. Für unseren Teilnehmer aus Medan wurde der Traum vom Berufseinstieg in der deutschen Gastronomie durch monatelangen, disziplinierten Deutschunterricht Wirklichkeit.\n\nDer erste Arbeitstag in der Küche eines renommierten Hotels in Baden-Württemberg hinterließ bleibende Eindrücke: Vom Erlernen der deutschen Küchenfachbegriffe bis hin zur Anpassung an das dynamische Tempo eines Profiteams.\n\n„Das Kollegium vor Ort hat mich überaus herzlich aufgenommen. Auch wenn das direkte freie Sprechen anfangs Überwindung kostete, half mir das fachsprachliche Training in Medan enorm, die Arbeitsanweisungen des Küchenchefs sofort zu verstehen“, berichtet der Auszubildende.\n\nDiese Erfahrung belegt: Mit Entschlossenheit und strukturierter Begleitung wird der Weg in eine internationale Fachkarriere realisierbar und erfolgreich.`,
      en: `A journey across continents always starts with a brave first step. For our candidate from Medan, the dream of becoming a professional chef in Germany was realized through months of focused, intensive German language study.\n\nThe first day in the kitchen of a premier hotel in Baden-Württemberg created unforgettable memories: from mastering German culinary terminology to adapting to the fast-paced rhythm of a professional culinary team.\n\n"The team on site welcomed me warmly. Although speaking German freely was slightly intimidating at first, the preparation during class in Medan helped me understand the Chef's instructions right away," he shares.\n\nThis journey proves that with strong dedication and structured mentoring, international career aspirations can be systematically achieved.`,
    },
    author: {
      id: "Kandidat Story",
      de: "Erfahrungsbericht",
      en: "Candidate Story",
    },
    tone: "sea",
    published: true,
  },
  {
    id: 3,
    date: {
      id: "03 SEP 2023",
      de: "03. SEP 2023",
      en: "03 SEP 2023",
    },
    category: {
      id: "Partner",
      de: "Partner",
      en: "Partner",
    },
    title: {
      id: "Peluang Ausbildung Perawat dan Hospitaliti di Jerman",
      de: "Ausbildungschancen in Pflege und Gastronomie in Deutschland",
      en: "Ausbildung Opportunities in Nursing and Hospitality in Germany",
    },
    excerpt: {
      id: "Mengenal kebutuhan tenaga kerja serta cara membuka peluang Ausbildung yang lebih terarah dan aman bagi generasi muda.",
      de: "Bedarfsanalyse für Fachkräfte sowie transparente, sichere Ausbildungswege für junge Talente in Deutschland.",
      en: "Understanding workforce needs and opening structured, secure Ausbildung pathways for young talents in Germany.",
    },
    content: {
      id: `Kehadiran program resmi ke Jerman membuka ruang dialog yang sangat produktif bersama mitra fasilitas kesehatan dan perhotelan di Jerman.\n\nBanyak institusi di Jerman mengungkapkan kebutuhan besar tenaga muda yang bersemangat dan memiliki integritas. Dalam kesempatan ini, ICH LIEBE DEUTSCH MEDAN memperlihatkan kurikulum persiapan bahasa dan etos kerja yang terstruktur.\n\nKerja sama ini diharapkan dapat membuka lebih banyak kuota Ausbildung bagi talenta Indonesia di masa mendatang.`,
      de: `Die offiziellen Kooperationsprogramme nach Deutschland eröffnen einen überaus produktiven Dialog mit Partnern aus dem Gesundheits- und Hotelwesen in Deutschland.\n\nZahlreiche deutsche Einrichtungen betonen den hohen Bedarf an motivierten Nachwuchskräften mit Integrität und solider Vorbildung. Bei diesem Austausch präsentierte ICH LIEBE DEUTSCH MEDAN das fundierte Sprachcurriculum sowie das Vorbereitungskonzept für die hiesige Arbeitskultur.\n\nDiese Zusammenarbeit soll in Zukunft noch mehr jungen Talenten aus Indonesien den Zugang zu qualifizierten Ausbildungsplätzen in Deutschland ermöglichen.`,
      en: `Official program channels to Germany open productive dialogues with partner healthcare facilities and hospitality providers in Germany.\n\nNumerous German institutions emphasize the strong demand for motivated young individuals with integrity and solid preparation. During these discussions, ICH LIEBE DEUTSCH MEDAN showcased our structured language curriculum and workplace culture coaching.\n\nThis ongoing cooperation aims to unlock even more Ausbildung opportunities for Indonesian talent in the years ahead.`,
    },
    author: {
      id: "Tim Kemitraan",
      de: "Partnerschaftsteam",
      en: "Partnership Team",
    },
    tone: "butter",
    published: true,
  },
  {
    id: 4,
    date: {
      id: "31 OKT 2022",
      de: "31. OKT 2022",
      en: "31 OCT 2022",
    },
    category: {
      id: "Partner",
      de: "Partner",
      en: "Partner",
    },
    title: {
      id: "Membangun kesiapan mental dan bahasa untuk masa depan di Jerman",
      de: "Mentale und sprachliche Bereitschaft für die Zukunft in Deutschland",
      en: "Building Mental and Language Readiness for a Future in Germany",
    },
    excerpt: {
      id: "Diskusi bersama jaringan mitra tentang kebutuhan tenaga kerja, budaya kerja, dan kesiapan peserta dari Indonesia.",
      de: "Fachgespräche mit Partnernetzwerken über Arbeitskultur, Alltagsintegration und die gezielte Vorbereitung indonesischer Teilnehmender.",
      en: "Discussions with partner networks on workplace culture, everyday integration, and applicant preparation from Indonesia.",
    },
    content: {
      id: `Dalam sesi diskusi berkala, dibahas secara mendalam tentang pentingnya integrasi budaya, akomodasi awal bagi peserta internasional, serta strategi bimbingan mentor 1:1 di tempat kerja. Mitra sangat mengapresiasi transparansi informasi dan kesiapan bahasa peserta yang disalurkan.`,
      de: `In regelmäßigen Fachgesprächen stehen die kulturelle Integration, erste Unterkunftsfragen für internationale Teilnehmende sowie praxisnahe 1:1-Mentoringkonzepte im Fokus. Unsere Partner schätzen insbesondere die offene Informationspolitik und die fundierte Sprachkompetenz der entsendeten Kandidatinnen und Kandidaten.`,
      en: `In regular roundtable discussions, topics such as cultural integration, initial accommodations, and 1:1 workplace mentoring strategies are addressed in depth. Partner organizations particularly commend the transparent communication and solid language competence of our candidates.`,
    },
    author: {
      id: "Tim Kemitraan",
      de: "Partnerschaftsteam",
      en: "Partnership Team",
    },
    tone: "ink",
    published: true,
  },
  {
    id: 5,
    date: {
      id: "11 OKT 2022",
      de: "11. OKT 2022",
      en: "11 OCT 2022",
    },
    category: {
      id: "Program",
      de: "Programm",
      en: "Program",
    },
    title: {
      id: "Memahami Jalur Au Pair & FSJ / BFD ke Jerman",
      de: "Au-Pair und FSJ / BFD als Einstiegswege nach Deutschland verstehen",
      en: "Understanding Au Pair & FSJ / BFD Pathways to Germany",
    },
    excerpt: {
      id: "Perbedaan mendasar antara pertukaran budaya Au Pair dan program sukarelawan sosial FSJ/BFD sebagai batu loncatan di Jerman.",
      de: "Wesentliche Unterschiede zwischen dem Au-Pair-Kulturaustausch und dem Freiwilligendienst (FSJ/BFD) als Fundament in Deutschland.",
      en: "Fundamental differences between the Au Pair cultural exchange and social volunteer programs (FSJ/BFD) as stepping stones in Germany.",
    },
    content: {
      id: `Bagi generasi muda yang ingin memperdalam bahasa Jerman langsung di negara asalnya, program Au Pair dan FSJ (Freiwilliges Soziales Jahr) adalah opsi terbaik.\n\nProgram Au Pair memungkinkan peserta tinggal bersama keluarga Jerman (Host Family) dengan akomodasi dan uang saku gratis, sementara FSJ adalah program kesukarelawanan sosial 1 tahun di rumah sakit, TK, atau fasilitas sosial dengan uang saku bulanan resmi.`,
      de: `Für junge Menschen, die ihre Deutschkenntnisse direkt im Land vertiefen und den Alltag erleben möchten, sind Au-Pair und das Freiwillige Soziale Jahr (FSJ) ideale Programme.\n\nDas Au-Pair-Programm ermöglicht das Leben bei einer deutschen Gastfamilie bei freier Unterkunft, Verpflegung, Taschengeld und Sprachkurszuschuss, während das FSJ ein 1-jähriges soziales Engagement in Krankenhäusern, Kitas oder Sozialeinrichtungen mit offiziellem Taschengeld bietet.`,
      en: `For young people seeking to immerse themselves in the German language and everyday life in Germany, Au Pair and FSJ (Freiwilliges Soziales Jahr) are premier stepping stones.\n\nThe Au Pair program allows participants to live with a German host family with free accommodation, meals, monthly pocket money, and language course subsidies, while FSJ provides 1 year of social volunteering in hospitals, kindergartens, or social centers with official monthly stipends.`,
    },
    author: {
      id: "Tim Edukasi",
      de: "Bildungsteam",
      en: "Education Team",
    },
    tone: "lavender",
    published: true,
  },
  {
    id: 6,
    date: {
      id: "22 SEP 2022",
      de: "22. SEP 2022",
      en: "22 SEP 2022",
    },
    category: {
      id: "Program",
      de: "Programm",
      en: "Program",
    },
    title: {
      id: "Pentingnya Sertifikat B1 & B2 Goethe-Zertifikat",
      de: "Die Bedeutung der Goethe-Zertifikate B1 & B2",
      en: "The Importance of Goethe-Zertifikat B1 & B2",
    },
    excerpt: {
      id: "Mengapa kemampuan bahasa Jerman yang riil dan sertifikasi resmi menjadi kunci utama keberhasilan di Jerman.",
      de: "Warum fundierte Deutschkenntnisse und offizielle Zertifikate der Schlüssel zum Erfolg in Deutschland sind.",
      en: "Why authentic German proficiency and official certificates are key to thriving in Germany.",
    },
    content: {
      id: `Sertifikasi Goethe-Institut diakui secara resmi oleh Kedutaan Besar Jerman, Ausländerbehörde, dan perusahaan di Jerman sebagai tolok ukur kemampuan bahasa.\n\nDengan kurikulum intensif dan latihan ujian berkala di ICH LIEBE DEUTSCH MEDAN, peserta dilatih menguasai 4 modul: Hören (Mendengar), Lesen (Membaca), Schreiben (Menulis), dan Sprechen (Berbicara) dengan percaya diri.`,
      de: `Die Zertifikate des Goethe-Instituts werden von der Deutschen Botschaft, Ausländerbehörden und deutschen Betrieben als offizieller Nachweis der Sprachkompetenz anerkannt.\n\nMit dem intensiven Lehrplan und regelmäßigen Prüfungssimulationen bei ICH LIEBE DEUTSCH MEDAN trainieren Teilnehmende alle 4 Fertigkeiten: Hören, Lesen, Schreiben und Sprechen für einen sicheren und erfolgreichen Prüfungsabschluss.`,
      en: `Goethe-Institut certificates are officially recognized by the German Embassy, immigration authorities, and companies across Germany as standard language benchmarks.\n\nThrough our intensive curriculum and regular mock exams at ICH LIEBE DEUTSCH MEDAN, students practice all 4 core modules: Listening, Reading, Writing, and Speaking with genuine confidence.`,
    },
    author: {
      id: "Tim Edukasi",
      de: "Bildungsteam",
      en: "Education Team",
    },
    tone: "sea",
    published: true,
  },
];

// Additional title and content translation mapping for custom or alternative CMS seeds
const articleTranslationDictionary: Record<
  string,
  {
    title: { de: string; en: string };
    excerpt?: { de: string; en: string };
    content?: { de: string; en: string };
  }
> = {
  "mengenal 5 program kursus & jalur ke jerman di ich liebe deutsch medan": {
    title: {
      de: "Die 5 Kursprogramme & Wege nach Deutschland bei Ich Liebe Deutsch Medan",
      en: "Understanding the 5 Course Programs & Pathways to Germany at Ich Liebe Deutsch Medan",
    },
    excerpt: {
      de: "Umfassender Leitfaden zu Ausbildung, Au Pair, FSJ/BFD, G to G und Studium mit Voraussetzungen und Vorteilen.",
      en: "Comprehensive guide to Ausbildung, Au Pair, FSJ/BFD, G to G, and University with requirements and benefits.",
    },
    content: {
      de: `Ich Liebe Deutsch Medan eröffnet die Einschreibung für intensive Deutschkurse zur Vorbereitung auf Ausbildung, Au Pair, FSJ/BFD, G to G und Hochschulstudium in Deutschland. Gegründet von einer UNIMED-Absolventin mit 6 Jahren Lebenserfahrung in Deutschland.\n\nUnsere strukturierte Begleitung gewährleistet, dass jeder Teilnehmer sowohl sprachlich als auch fachlich bestens vorbereitet ist.`,
      en: `Ich Liebe Deutsch Medan opens registration for intensive German courses preparing for Ausbildung, Au Pair, FSJ/BFD, G to G, and University study in Germany. Founded by a UNIMED graduate with 6 years of experience in Germany.\n\nOur structured mentoring ensures every candidate is thoroughly prepared both linguistically and culturally.`,
    },
  },
  "pelatihan khusus kosakata profesi bagi pemegang kontrak kerja (ausbildungsvertrag)": {
    title: {
      de: "Spezifisches Fachsprachentraining für Ausbildungsvertrags-Inhaber",
      en: "Specialized Occupational Vocabulary Training for Ausbildungsvertrag Holders",
    },
    excerpt: {
      de: "Wie ILD Medan Auszubildende vor der Abreise mit berufsbezogenem Vokabular in Technik, Pflege und Gastronomie ausstattet.",
      en: "How ILD Medan equips Ausbildung candidates with specialized technical, nursing, and hospitality vocabulary before departure.",
    },
    content: {
      de: `Auszubildende, die bereits einen Ausbildungsvertrag erhalten haben, bekommen ein maßgeschneidertes Fachworttraining, um von Tag eins an reibungslos im deutschen Betrieb zu kommunizieren.\n\nDer Schwerpunkt liegt auf berufsbezogenem Vokabular für Pflege, Hotel & Gastronomie, Mechatronik und Informationstechnologie.`,
      en: `Ausbildung candidates with confirmed contracts receive tailored workplace terminology coaching to ensure seamless communication in German enterprises from day one.\n\nThe focus is placed on vocational vocabulary for nursing, hotel & gastronomy, mechatronics, and information technology.`,
    },
  },
  "dari bandung ke dapur hotel di baden-württemberg": {
    title: {
      de: "Von Bandung in die Hotelküche in Baden-Württemberg",
      en: "From Bandung to a Hotel Kitchen in Baden-Württemberg",
    },
    excerpt: {
      de: "Der Weg eines Teilnehmers von den Sprachkursen bis zum ersten Arbeitstag in Deutschland.",
      en: "One participant's journey from language courses to their first workday in Germany.",
    },
  },
  "apa yang perlu disiapkan sebelum membuka posisi ausbildung?": {
    title: {
      de: "Was vor der Eröffnung von Ausbildungsplätzen vorbereitet werden sollte",
      en: "What needs to be prepared before opening Ausbildung positions?",
    },
    excerpt: {
      de: "Wichtige Vorbereitungsschritte und Standards für Arbeitgeber und Partner.",
      en: "Key preparation steps and qualification standards for employers and partners.",
    },
  },
  "mengapa bahasa kerja dimulai dari kebiasaan kecil": {
    title: {
      de: "Warum Fachsprache mit kleinen Alltagsgewohnheiten beginnt",
      en: "Why professional language begins with everyday habits",
    },
    excerpt: {
      de: "Kleine Routinen, die das freie Sprechen und Verstehen am Arbeitsplatz fördern.",
      en: "Small routines that build confidence in workplace communication.",
    },
  },
  "lernpfad hadir di chefs culinar messe di leipzig": {
    title: {
      de: "Präsenz auf der CHEFS CULINAR Messe in Leipzig",
      en: "Presence at the CHEFS CULINAR Fair in Leipzig",
    },
    excerpt: {
      de: "Austausch mit Branchenexperten und gastronomischen Ausbildungsbetrieben in Deutschland.",
      en: "Exchanging insights with industry leaders and culinary hospitality partners in Germany.",
    },
  },
};

// Category translations
export function getLocalizedCategory(category: string, language: Language): string {
  if (language === "id") return category;

  const normalized = (category || "").trim().toLowerCase();

  const map: Record<string, { de: string; en: string }> = {
    semua: { de: "Alle", en: "All" },
    all: { de: "Alle", en: "All" },
    media: { de: "Medien", en: "Media" },
    cerita: { de: "Erfahrungsbericht", en: "Story" },
    "cerita peserta": { de: "Erfahrungsbericht", en: "Student Story" },
    partner: { de: "Partner", en: "Partner" },
    "untuk partner": { de: "Für Partner", en: "For Partners" },
    program: { de: "Programm", en: "Program" },
    ausbildung: { de: "Ausbildung", en: "Ausbildung" },
    "tips bahasa": { de: "Sprachtipps", en: "Language Tips" },
    bahasa: { de: "Sprache", en: "Language" },
    pengumuman: { de: "Mitteilung", en: "Announcement" },
    edukasi: { de: "Bildung", en: "Education" },
    kabar: { de: "Nachrichten", en: "News" },
  };

  if (map[normalized]) {
    return map[normalized][language];
  }

  return category;
}

// Localize date string
export function getLocalizedDate(dateStr: string, language: Language): string {
  if (!dateStr || language === "id") return dateStr;

  let res = dateStr;
  if (language === "de") {
    res = res
      .replace(/MEI/gi, "MAI")
      .replace(/AGU(STUS)?/gi, "AUG")
      .replace(/OKT(OBER)?/gi, "OKT")
      .replace(/DES(EMBER)?/gi, "DEZ");
  } else if (language === "en") {
    res = res
      .replace(/MEI/gi, "MAY")
      .replace(/AGU(STUS)?/gi, "AUG")
      .replace(/OKT(OBER)?/gi, "OCT")
      .replace(/DES(EMBER)?/gi, "DEC");
  }
  return res;
}

// Localize author string
export function getLocalizedAuthor(author: string | undefined, language: Language): string {
  if (!author || language === "id") return author || "ICH LIEBE DEUTSCH MEDAN";

  const norm = author.trim().toLowerCase();
  if (norm.includes("redaksi") || norm.includes("editorial")) {
    return language === "de" ? "Redaktionsteam ILD Medan" : "ILD Medan Editorial Team";
  }
  if (norm.includes("kandidat") || norm.includes("story") || norm.includes("peserta")) {
    return language === "de" ? "Erfahrungsbericht" : "Candidate Story";
  }
  if (norm.includes("kemitraan") || norm.includes("partner")) {
    return language === "de" ? "Partnerschaftsteam" : "Partnership Team";
  }
  if (norm.includes("edukasi") || norm.includes("akademik") || norm.includes("guru")) {
    return language === "de" ? "Bildungsteam ILD" : "ILD Education Team";
  }

  return author;
}

/**
 * Given any NewsItem (from CMS or local state) and current language,
 * return a fully localized NewsItem with matching title, excerpt, content, category, author, and date.
 */
export function getLocalizedArticle(item: NewsItem, language: Language): NewsItem {
  if (!item) return item;

  // If language is Indonesian, return original unless explicit id properties exist
  if (language === "id") {
    return {
      ...item,
      category: item.category || "Media",
      author: item.author || "ICH LIEBE DEUTSCH MEDAN",
    };
  }

  // 1. Check if the item matches any defaultMultilingualArticles by ID
  const matchedById = defaultMultilingualArticles.find(
    (a) => String(a.id) === String(item.id)
  );

  // 2. Check if the item matches by title in defaultMultilingualArticles
  const matchedByTitle = !matchedById
    ? defaultMultilingualArticles.find(
        (a) =>
          a.title.id.trim().toLowerCase() === (item.title || "").trim().toLowerCase() ||
          a.title.de.trim().toLowerCase() === (item.title || "").trim().toLowerCase() ||
          a.title.en.trim().toLowerCase() === (item.title || "").trim().toLowerCase()
      )
    : undefined;

  const matched = matchedById || matchedByTitle;

  if (matched) {
    return {
      ...item,
      title: matched.title[language] || item.title,
      excerpt: matched.excerpt[language] || item.excerpt,
      content: matched.content[language] || item.content || matched.content.id,
      category: matched.category[language] || getLocalizedCategory(item.category, language),
      author: matched.author[language] || getLocalizedAuthor(item.author, language),
      date: matched.date[language] || getLocalizedDate(item.date, language),
    };
  }

  // 3. Check explicit fields in item (e.g. title_de, content_de, etc.)
  const explicitTitle = language === "de" ? item.title_de : item.title_en;
  const explicitExcerpt = language === "de" ? item.excerpt_de : item.excerpt_en;
  const explicitContent = language === "de" ? item.content_de : item.content_en;
  const explicitCategory = language === "de" ? item.category_de : item.category_en;
  const explicitAuthor = language === "de" ? item.author_de : item.author_en;

  // 4. Check dictionary by normalized title
  const normTitle = (item.title || "").trim().toLowerCase();
  const dictMatch = articleTranslationDictionary[normTitle];

  const resolvedTitle = explicitTitle || dictMatch?.title[language] || item.title;
  const resolvedExcerpt = explicitExcerpt || dictMatch?.excerpt?.[language] || item.excerpt;
  const resolvedContent = explicitContent || dictMatch?.content?.[language] || item.content;

  return {
    ...item,
    title: resolvedTitle,
    excerpt: resolvedExcerpt,
    content: resolvedContent,
    category: explicitCategory || getLocalizedCategory(item.category, language),
    author: explicitAuthor || getLocalizedAuthor(item.author, language),
    date: getLocalizedDate(item.date, language),
  };
}

/**
 * Returns the default articles localized for the selected language.
 */
export function getDefaultLocalizedArticles(language: Language): NewsItem[] {
  return defaultMultilingualArticles.map((a) => ({
    id: a.id,
    date: a.date[language] || a.date.id,
    category: a.category[language] || a.category.id,
    title: a.title[language] || a.title.id,
    excerpt: a.excerpt[language] || a.excerpt.id,
    content: a.content[language] || a.content.id,
    author: a.author[language] || a.author.id,
    featured: a.featured,
    tone: a.tone,
    imageUrl: a.imageUrl,
    published: a.published,
  }));
}
