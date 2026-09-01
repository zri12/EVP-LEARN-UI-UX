import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, useLocation } from "react-router";
import {
  BookOpen, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, ClipboardCheck,
  Globe, Headphones, Home, Info, Layers3, Play, Pause,
  Target, UserRound, Volume2, X, Check, AlertTriangle,
  GripVertical, ArrowRight, CircleDot, Store, ScanLine, Trophy,
  BarChart2,
} from "lucide-react";
import ReadingIllustration from "./illustrations";
import { MODULES, glossaryFor } from "./data";
import logo from "./imports/LOGO.png";
import module1Art from "./imports/module-art/module-1-narrative.png";
import module2Art from "./imports/module-art/module-2-descriptive.png";
import module3Art from "./imports/module-art/module-3-procedure.png";
import narrativeLessonArt from "./imports/lesson-art/narrative-lesson.png";
import descriptiveLessonArt from "./imports/lesson-art/descriptive-lesson.png";
import procedureLessonArt from "./imports/lesson-art/procedure-lesson.png";

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "id" | "en";
type Module = { id: number; title: string; subtitle: string; accent: string; tint: string; icon: typeof BookOpen; reading: string; art: string };

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  id: {
    navHome: "Beranda", navModules: "Modul", navProgress: "Progres", navProfile: "Profil",
    readyToLearn: "Siap belajar?", startJourney: "Mulai perjalanan belajar Bahasa Inggrismu.",
    exploreModules: "Jelajahi Modul", continueLearning: "Lanjutkan Belajar",
    learningProgress: "Progres Belajar", yourModules: "Modul Kamu",
    quickAccess: "Akses Cepat", seeAll: "Lihat Semua",
    startModule: "Mulai Modul", continueModule: "Lanjutkan Modul", reviewModule: "Pelajari Kembali Modul",
    learningObjectives: "Tujuan Pembelajaran",
    startPretest: "Mulai Pre-test", diagnosticPretest: "Pre-test Diagnostik",
    pretestDesc: "Mari lihat kemampuan awalmu.",
    pretestNote: "Nilai Pre-test tidak memengaruhi nilai akhir modul.",
    startPosttest: "Mulai Post-test",
    posttestDesc: "Hampir selesai! Tunjukkan apa yang sudah kamu pelajari.",
    previous: "Sebelumnya", next: "Berikutnya",
    reviewAndSubmit: "Tinjau & Kirim", submitAnswers: "Kirim Jawaban",
    reviewAnswers: "Tinjau Kembali", submitConfirmTitle: "Kirim jawaban?",
    submitConfirmDesc: "Pastikan semua soal sudah dijawab.",
    reviewMaterial: "Pelajari Kembali Materi", tryAgain: "Coba Lagi",
    backToModules: "Kembali ke Beranda",
    greatJob: "Bagus!", thatCorrect: "Jawabanmu benar.",
    notQuiteYet: "Belum tepat", reviewSentence: "Coba pelajari kembali materinya.",
    continueBtn: "Lanjut",
    yourProgress: "Progres Belajarmu", noProgressYet: "Perjalanan belajarmu dimulai di sini.",
    startLearning: "Mulai Belajar",
    howToUse: "Petunjuk Penggunaan", learningOutcomes: "Capaian Pembelajaran", profileLabel: "Profil",
    improvement: "Peningkatan", pretestLabel: "Pre-test", posttestRaw: "Post-test",
    posttestWeighted: "Post-test Berbobot", practice: "Latihan Interaktif",
    finalScore: "Nilai Akhir", latestScore: "Nilai Terbaru", bestScore: "Nilai Terbaik",
    tuntas: "Tuntas", perluReview: "Perlu Review", tetapSemangat: "Tetap Semangat!",
    excellentProgress: "Progres yang luar biasa!", completedModule: "Kamu menyelesaikan modul ini.",
    reviewRecommended: "Pelajari kembali materi lalu coba lagi.",
    languageTitle: "Bahasa / Language", applyBtn: "Terapkan",
    aboutModule: "Tentang Modul Ini", learningJourney: "Alur Pembelajaran",
    chooseModule: "Pilih modul untuk memulai belajar.", learningModules: "Modul Pembelajaran",
    checkAnswer: "Periksa Jawaban", finishPractice: "Selesaikan Latihan",
    startingScore: "NILAI AWALMU", continueToLearning: "Lanjut ke Materi",
    questionOf: (n: number, tot: number) => `Soal ${n} dari ${tot}`,
    modulesCompletedOf: (n: number) => `${n} dari 3 Modul Selesai`,
    guideTitle: "Petunjuk Penggunaan", guideSub: "Belajar dengan langkah-langkah sederhana berikut.",
    guideItems: ["Pilih Modul", "Kerjakan Pre-test", "Pelajari Materi", "Pelajari Kosakata & Audio", "Kerjakan Latihan Interaktif", "Kerjakan Post-test", "Lihat Progres"],
    outcomesTitle: "Capaian Pembelajaran", outcomesSub: "Kurikulum Merdeka · Fase E · Kelas X SMK",
    outcomesItems: ["Mengidentifikasi fungsi sosial teks berkaitan retail.", "Mengenali struktur generik dan ciri kebahasaan.", "Memahami ide pokok dan informasi rinci.", "Menggunakan kosakata retail dalam konteks bermakna."],
    profileTitle: "Peneliti / Pengembang", profileSub: "Profil ini merupakan informasi peneliti untuk keperluan pengembangan aplikasi.",
    completed: "Selesai", inProgress: "Sedang Dipelajari", notStarted: "Belum Dimulai",
    notStartedYet: "Belum ada modul yang dimulai.", overallProgress: "Progres Keseluruhan",
    vocabPreview: "Pratinjau Kosakata", learnBeforeReading: "Pelajari kata-kata ini sebelum membaca.",
    continueToReading: "Lanjut ke Bacaan",
    listenToReading: "Dengarkan Teks", startPractice: "Mulai Latihan Interaktif",
    moduleResult: "Hasil Modul", yourResult: "Hasil Belajarmu",
    preResult: "Hasil Pre-test",
    learningMaterial: "Materi Pembelajaran",
    learnStep: "Belajar", practiceStep: "Latihan",
    afterModule: "Setelah menyelesaikan modul ini, kamu akan mampu:",
    aboutModuleDesc: "Pelajari cara kerja teks dalam konteks retail melalui bacaan terfokus, kosakata, audio, dan latihan interaktif.",
    activityOf: (n: number, tot: number) => `Aktivitas ${n} dari ${tot}`,
    localAudio: "Audio lokal", audioUnavailable: "Audio saat ini belum tersedia",
    playPronunciation: "Dengarkan pengucapan", playingPronunciation: "Memutar pengucapan...",
    answersReady: (n: number, tot: number) => `${n} dari ${tot} jawaban siap dikirim.`,
    correctCount: (c: number, w: number) => `${c} benar · ${w} salah`,
    percentComplete: (p: number) => `${p}% selesai`,
    practiceActivityTitles: ["Mencocokkan Struktur", "Mencocokkan Kosakata", "Mengurutkan Peristiwa"],
    practiceInstructions: [
      "Pilih bagian teks yang memperkenalkan tokoh dan latar cerita.",
      "Pilih kata yang tepat untuk definisi: 'kemasan padat siap dirakit sendiri'.",
      "Ketuk untuk mengurutkan peristiwa-peristiwa ini secara benar.",
    ],
    wordType: "Jenis kata",
    posttestIntro: "Post-test",
    pretestIntroTitle: "Pre-test Diagnostik",
    stepLearn: "Belajar", stepPractice: "Latihan",
    questionsLabel: "soal", multipleChoice: "Pilihan Ganda",
    structureMatch: "Mencocokkan Struktur", vocabMatch: "Mencocokkan Kosakata", eventSeq: "Mengurutkan Peristiwa",
    subMaterialOf: (n: number, tot: number) => `Teks ${n} dari ${tot}`,
    nextText: "Teks Berikutnya", finishReading: "Selesai Membaca",
    glossaryLabel: "Glosarium",
    profileFields: {
      nama: "Nama Lengkap",
      nim: "NIM",
      prodi: "Program Studi",
      fakultas: "Fakultas",
      universitas: "Universitas",
      pembimbing: "Dosen Pembimbing",
      judul: "Judul Penelitian",
      tahun: "Tahun",
    },
  },
  en: {
    navHome: "Home", navModules: "Modules", navProgress: "Progress", navProfile: "Profile",
    readyToLearn: "Ready to learn?", startJourney: "Start your English learning journey.",
    exploreModules: "Explore Modules", continueLearning: "Continue Learning",
    learningProgress: "Learning Progress", yourModules: "Your Modules",
    quickAccess: "Quick Access", seeAll: "See All",
    startModule: "Start Module", continueModule: "Continue Module", reviewModule: "Review Module",
    learningObjectives: "Learning Objectives",
    startPretest: "Start Pre-test", diagnosticPretest: "Diagnostic Pre-test",
    pretestDesc: "Let's see what you already know.",
    pretestNote: "Your pre-test score does not affect your final module score.",
    startPosttest: "Start Post-test",
    posttestDesc: "You're almost there! Show what you have learned.",
    previous: "Previous", next: "Next",
    reviewAndSubmit: "Review & Submit", submitAnswers: "Submit Answers",
    reviewAnswers: "Review Answers", submitConfirmTitle: "Submit your answers?",
    submitConfirmDesc: "Make sure all questions have been answered.",
    reviewMaterial: "Review Material", tryAgain: "Try Again",
    backToModules: "Back to Home",
    greatJob: "Great job!", thatCorrect: "That's correct.",
    notQuiteYet: "Not quite yet", reviewSentence: "Review the material and try once more.",
    continueBtn: "Continue",
    yourProgress: "Your Learning Progress", noProgressYet: "Your learning journey starts here.",
    startLearning: "Start Learning",
    howToUse: "How to Use", learningOutcomes: "Learning Outcomes", profileLabel: "Profile",
    improvement: "Improvement", pretestLabel: "Pre-test", posttestRaw: "Post-test",
    posttestWeighted: "Post-test Weighted", practice: "Interactive Practice",
    finalScore: "Final Score", latestScore: "Latest Score", bestScore: "Best Score",
    tuntas: "Completed", perluReview: "Review Recommended", tetapSemangat: "Keep Going!",
    excellentProgress: "Excellent progress!", completedModule: "You completed this module.",
    reviewRecommended: "Review the material and try again.",
    languageTitle: "Bahasa / Language", applyBtn: "Apply",
    aboutModule: "About This Module", learningJourney: "Learning Journey",
    chooseModule: "Choose any module to start learning.", learningModules: "Learning Modules",
    checkAnswer: "Check Answer", finishPractice: "Finish Practice",
    startingScore: "YOUR STARTING SCORE", continueToLearning: "Continue to Learning",
    questionOf: (n: number, tot: number) => `Question ${n} of ${tot}`,
    modulesCompletedOf: (n: number) => `${n} of 3 Modules Completed`,
    guideTitle: "How to Use the App", guideSub: "Learn at your own pace with these simple steps.",
    guideItems: ["Choose a Module", "Complete Pre-test", "Study the Material", "Explore Vocabulary & Audio", "Complete Interactive Practice", "Take Post-test", "Check Your Progress"],
    outcomesTitle: "Learning Outcomes", outcomesSub: "Kurikulum Merdeka · Phase E · Grade X SMK",
    outcomesItems: ["Identify the social function of retail-related texts.", "Recognize generic structures and language features.", "Understand main ideas and detailed information.", "Use retail vocabulary in meaningful contexts."],
    profileTitle: "Researcher / Developer", profileSub: "This profile contains researcher information for the application development.",
    completed: "Completed", inProgress: "In Progress", notStarted: "Not Started",
    notStartedYet: "No module has been started yet.", overallProgress: "Overall Progress",
    vocabPreview: "Vocabulary Preview", learnBeforeReading: "Learn these words before reading.",
    continueToReading: "Continue to Reading",
    listenToReading: "Listen to Reading", startPractice: "Start Interactive Practice",
    moduleResult: "Module Result", yourResult: "Your Result",
    preResult: "Pre-test Result",
    learningMaterial: "Learning Material",
    learnStep: "Learn", practiceStep: "Practice",
    afterModule: "After completing this module, you will be able to:",
    aboutModuleDesc: "Learn how texts work in retail contexts through focused reading, vocabulary, audio, and practice activities.",
    activityOf: (n: number, tot: number) => `Activity ${n} of ${tot}`,
    localAudio: "Local audio", audioUnavailable: "Audio is currently unavailable",
    playPronunciation: "Listen to pronunciation", playingPronunciation: "Playing pronunciation...",
    answersReady: (n: number, tot: number) => `${n} of ${tot} answers are ready to submit.`,
    correctCount: (c: number, w: number) => `${c} correct · ${w} incorrect`,
    percentComplete: (p: number) => `${p}% complete`,
    practiceActivityTitles: ["Structure Match", "Vocabulary Match", "Event Sequencing"],
    practiceInstructions: [
      "Choose the text part that introduces the characters and setting.",
      "Select the right word for the definition: 'a compact package ready for self-assembly'.",
      "Tap to arrange these events in the correct order.",
    ],
    wordType: "Part of speech",
    posttestIntro: "Post-test",
    pretestIntroTitle: "Diagnostic Pre-test",
    stepLearn: "Learn", stepPractice: "Practice",
    questionsLabel: "questions", multipleChoice: "Multiple Choice",
    structureMatch: "Structure Match", vocabMatch: "Vocabulary Match", eventSeq: "Event Sequencing",
    subMaterialOf: (n: number, tot: number) => `Text ${n} of ${tot}`,
    nextText: "Next Text", finishReading: "Finish Reading",
    glossaryLabel: "Glossary",
    profileFields: {
      nama: "Full Name",
      nim: "Student ID / NIM",
      prodi: "Study Program",
      fakultas: "Faculty",
      universitas: "University",
      pembimbing: "Supervisor",
      judul: "Research Title",
      tahun: "Year",
    },
  },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: typeof T.id }>({
  lang: "id", setLang: () => {}, t: T.id,
});
function useLang() { return useContext(LangCtx); }

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("evp-lang") as Lang) || "id");
  function setLang(l: Lang) { setLangState(l); localStorage.setItem("evp-lang", l); }
  return <LangCtx.Provider value={{ lang, setLang, t: T[lang] }}>{children}</LangCtx.Provider>;
}

// ─── Static content (English — not translated) ────────────────────────────────
const moduleIcons = [BookOpen, Store, ScanLine] as const;
const moduleArt = [module1Art, module2Art, module3Art] as const;
const modules: Module[] = Object.values(MODULES).map((module, index) => ({
  id: module.id,
  title: module.title,
  subtitle: module.subtitle,
  accent: module.accent,
  tint: module.tint,
  icon: moduleIcons[index],
  reading: module.readings[0].title,
  art: moduleArt[index],
}));
const moduleContent = (id: number) => MODULES[id] || MODULES[1];

// ─── Progress hook ────────────────────────────────────────────────────────────
type Progress = { m1: number; m2: number; m3: number; section: string; score1?: number; score2?: number; score3?: number; lastModule?: number; lastRoute?: string };
function useProgress() {
  const [p, setP] = useState<Progress>(() => {
    try {
      const value = JSON.parse(localStorage.getItem("evp-progress") || "{}");
      if (!value || typeof value !== "object") throw new Error("Invalid progress");
      return { m1: Number(value.m1) || 0, m2: Number(value.m2) || 0, m3: Number(value.m3) || 0, section: typeof value.section === "string" ? value.section : "", score1: Number(value.score1) || undefined, score2: Number(value.score2) || undefined, score3: Number(value.score3) || undefined, lastModule: [1, 2, 3].includes(value.lastModule) ? value.lastModule : undefined, lastRoute: typeof value.lastRoute === "string" ? value.lastRoute : undefined };
    } catch {
      return { m1: 0, m2: 0, m3: 0, section: "" };
    }
  });
  useEffect(() => { localStorage.setItem("evp-progress", JSON.stringify(p)); }, [p]);
  return [p, setP] as const;
}

// ─── Language sheet ───────────────────────────────────────────────────────────
function LanguageSheet({ close }: { close: () => void }) {
  const { lang, setLang, t } = useLang();
  const [sel, setSel] = useState<Lang>(lang);
  return (
    <div className="sheet-backdrop" onClick={close}>
      <div className="sheet lang-sheet" onClick={e => e.stopPropagation()}>
        <i className="handle" />
        <p className="lang-sheet-title">{t.languageTitle}</p>
        {(["id", "en"] as Lang[]).map(l => (
          <button key={l} className={`lang-option${sel === l ? " selected" : ""}`} onClick={() => setSel(l)}>
            <span>{l === "id" ? "Bahasa Indonesia" : "English"}</span>
            <span className={`radio${sel === l ? " checked" : ""}`}>{sel === l && <Check size={12} />}</span>
          </button>
        ))}
        <button className="button primary" style={{ marginTop: 16 }} onClick={() => { setLang(sel); close(); }}>
          {t.applyBtn}
        </button>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
function Shell({ children, title, back = true }: { children: React.ReactNode; title?: string; back?: boolean }) {
  const nav = useNavigate();
  const loc = useLocation();
  const { t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const root = ["/home", "/modules", "/progress", "/profile"].includes(loc.pathname);
  const canChangeLanguage = ["/home", "/modules", "/progress"].includes(loc.pathname);
  return (
    <main className="app-shell">
      <div className="phone">
        <header className="topbar">
          {back && !root
            ? <button className="icon-button" onClick={() => nav(-1)} aria-label={t.previous}><ChevronLeft size={22} /></button>
            : <div className="brand-mark"><img src={logo} alt="EVP Learn" /></div>}
          <span>{title || "EVP Learn"}</span>
          {canChangeLanguage ? (
            <button className="icon-button" onClick={() => setLangOpen(true)} aria-label={t.languageTitle}><Globe size={20} /></button>
          ) : <span className="topbar-spacer" aria-hidden="true" />}
        </header>
        <div className="screen">{children}</div>
        {root && <BottomNav />}
        {langOpen && <LanguageSheet close={() => setLangOpen(false)} />}
      </div>
    </main>
  );
}

function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { t } = useLang();
  const items = [
    ["/home", Home, t.navHome],
    ["/modules", Layers3, t.navModules],
    ["/progress", BarChart2, t.navProgress],
    ["/profile", UserRound, t.navProfile],
  ] as const;
  return (
    <nav className="bottom-nav bottom-nav-4">
      {items.map(([to, I, label]) => (
        <button key={to} className={pathname === to ? "active" : ""} onClick={() => nav(to)}>
          <I size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Button({ children, onClick, variant = "primary", disabled = false }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "text"; disabled?: boolean;
}) {
  return <button disabled={disabled} onClick={onClick} className={`button ${variant}`}>{children}</button>;
}

function ProgressBar({ value, color = "#2563eb" }: { value: number; color?: string }) {
  return <div className="progress"><i style={{ width: `${Math.min(100, value)}%`, background: color }} /></div>;
}

function useLocalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeSrc, setActiveSrc] = useState<string>();
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => () => audioRef.current?.pause(), []);

  function toggle(src: string) {
    const current = audioRef.current;
    if (current && activeSrc === src && !current.paused) {
      current.pause();
      setActiveSrc(undefined);
      return;
    }

    current?.pause();
    const next = new Audio(src);
    audioRef.current = next;
    setElapsed(0);
    setDuration(0);
    setActiveSrc(src);
    next.onloadedmetadata = () => setDuration(Number.isFinite(next.duration) ? next.duration : 0);
    next.ontimeupdate = () => setElapsed(next.currentTime);
    next.onended = () => {
      setActiveSrc(undefined);
      setElapsed(0);
    };
    void next.play().catch(() => setActiveSrc(undefined));
  }

  function stop() {
    audioRef.current?.pause();
    audioRef.current = null;
    setActiveSrc(undefined);
    setElapsed(0);
    setDuration(0);
  }

  return { activeSrc, duration, elapsed, toggle, stop };
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomePage() {
  const nav = useNavigate();
  const { t } = useLang();
  const [p] = useProgress();
  const returning = p.m1 > 0 || p.m2 > 0 || p.m3 > 0;
  const completedCount = [p.m1, p.m2, p.m3].filter(v => v >= 100).length;
  const overallPct = Math.round((p.m1 + p.m2 + p.m3) / 3);

  const activeModule = p.lastModule || (p.m1 > 0 && p.m1 < 100 ? 1 : p.m2 > 0 && p.m2 < 100 ? 2 : p.m3 > 0 && p.m3 < 100 ? 3 : null);
  const m = activeModule ? modules[activeModule - 1] : null;
  const mProgress = activeModule === 1 ? p.m1 : activeModule === 2 ? p.m2 : p.m3;

  return (
    <Shell back={false}>
      <section className="home-hero">
        <p className="eyebrow">ENGLISH FOR VOCATIONAL PURPOSES</p>
        <h1>{t.readyToLearn}</h1>
        <p>{returning ? t.continueLearning + "." : t.startJourney}</p>
        <div className="hero-objects">
          <div className="shelf"><i /><i /><i /></div>
          <img className="hero-logo" src={logo} alt="EVP Learn" />
        </div>
      </section>

      {returning && m ? (
        <section className="continue-card" onClick={() => nav(p.lastRoute || `/module/${activeModule}/reading`)}>
          <span>{t.continueLearning.toUpperCase()}</span>
          <div><b>Module 0{activeModule} · {m.title}</b><p>{p.section || `Reading · ${m.reading}`}</p></div>
          <ProgressBar value={mProgress} color={m.accent} />
          <footer><small>{t.percentComplete(mProgress)}</small><ArrowRight size={19} /></footer>
        </section>
      ) : !returning ? (
        <Button onClick={() => nav("/modules")}>{t.exploreModules} <ArrowRight size={18} /></Button>
      ) : null}

      <section className="section-head">
        <div><h2>{t.learningProgress}</h2><p>{returning ? "" : t.noProgressYet}</p></div>
        <b>{t.modulesCompletedOf(completedCount)}</b>
      </section>
      <ProgressBar value={overallPct} />

      <section className="section-head" style={{ marginTop: 28 }}>
        <h2>{t.yourModules}</h2>
        <button className="text-link" onClick={() => nav("/modules")}>{t.seeAll}</button>
      </section>
      <div className="module-preview">
        {modules.map(mod => {
          const prog = mod.id === 1 ? p.m1 : mod.id === 2 ? p.m2 : p.m3;
          return <MiniModule key={mod.id} m={mod} onClick={() => nav(`/module/${mod.id}`)} progress={prog} t={t} />;
        })}
      </div>

      <section className="section-head" style={{ marginTop: 28 }}>
        <h2>{t.quickAccess}</h2>
      </section>
      <div className="quick-grid-2">
        <Quick2 icon={CircleHelp} label={t.howToUse} onClick={() => nav("/guide")} />
        <Quick2 icon={Target} label={t.learningOutcomes} onClick={() => nav("/outcomes")} />
      </div>
    </Shell>
  );
}

function Quick2({ icon: I, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="quick2">
      <I size={22} />
      <span>{label}</span>
    </button>
  );
}

function MiniModule({ m, onClick, progress, t }: { m: Module; onClick: () => void; progress: number; t: typeof T.id }) {
  const I = m.icon;
  return (
    <button className="mini-module" onClick={onClick}>
      <div style={{ background: m.tint, color: m.accent }}><I size={20} /></div>
      <span><b>Module 0{m.id}</b><small>{m.title}</small></span>
      {progress > 0 ? <em style={{ color: m.accent }}>{progress}%</em> : <ChevronRight size={18} />}
    </button>
  );
}

// ─── Modules page ─────────────────────────────────────────────────────────────
function ModulesPage() {
  const nav = useNavigate();
  const { t } = useLang();
  const [p] = useProgress();
  return (
    <Shell title={t.navModules}>
      <div className="page-title">
        <h1>{t.learningModules}</h1>
        <p>{t.chooseModule}</p>
      </div>
      <div className="module-list">
        {modules.map(m => {
          const prog = m.id === 1 ? p.m1 : m.id === 2 ? p.m2 : p.m3;
          return <ModuleCard key={m.id} m={m} progress={prog} onClick={() => nav(`/module/${m.id}`)} />;
        })}
      </div>
    </Shell>
  );
}

function ModuleCard({ m, progress, onClick }: { m: Module; progress: number; onClick: () => void }) {
  const { t } = useLang();
  const I = m.icon;
  const statusLabel = progress >= 100 ? t.completed : progress > 0 ? t.inProgress : t.notStarted;
  const ctaLabel = progress >= 100 ? t.reviewModule : progress > 0 ? t.continueModule : t.startModule;
  return (
    <article className="module-card" style={{ "--accent": m.accent, "--tint": m.tint } as any}>
      <div className="module-card-top">
        <span className="module-number">0{m.id}</span>
        <span className="status"><CircleDot size={13} />{statusLabel}</span>
      </div>
      <h2>{m.title}</h2>
      <p>{m.subtitle}</p>
      <div className="module-art"><img src={m.art} alt={`${m.title} illustration`} /></div>
      <ProgressBar value={progress} color={m.accent} />
      <footer>
        <small>{t.percentComplete(progress)}</small>
        <Button onClick={onClick} variant="text">{ctaLabel} <ArrowRight size={16} /></Button>
      </footer>
    </article>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview() {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const m = modules[id - 1];
  const content = moduleContent(id);
  const I = m.icon;
  const [, setP] = useProgress();
  return (
    <Shell title={`Module 0${id}`}>
      <div className="overview-hero" style={{ background: m.tint }}>
        <span style={{ color: m.accent }}>MODULE 0{id}</span>
        <h1>{m.title}</h1>
        <p>{m.subtitle}</p>
        <div className="hero-icon" style={{ color: m.accent }}><I size={66} /></div>
      </div>
      <section>
        <h2>{t.aboutModule}</h2>
        <p className="body-copy">{t.aboutModuleDesc}</p>
      </section>
      <section>
        <h2>{t.learningObjectives}</h2>
        <ul className="learn-list">
          {content.objectives.slice(0, 3).map((x, i) => <li key={x}><b>0{i + 1}</b>{x}</li>)}
        </ul>
      </section>
      <section>
        <h2>{t.learningJourney}</h2>
        <div className="stepper">
          {["Pre-test", t.stepLearn, t.stepPractice, "Post-test"].map((x, i) => (
            <div className={i === 0 ? "current" : ""} key={x}><i>{i + 1}</i><span>{x}</span></div>
          ))}
        </div>
      </section>
      <Button onClick={() => { setP(q => ({ ...q, [`m${id}`]: 10, section: "Tujuan Pembelajaran", lastModule: id, lastRoute: `/module/${id}/objectives` })); nav(`/module/${id}/objectives`); }}>
        {t.startModule} <ArrowRight size={18} />
      </Button>
    </Shell>
  );
}

// ─── Objectives ───────────────────────────────────────────────────────────────
function Objectives() {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const m = modules[id - 1];
  const content = moduleContent(id);
  return (
    <Shell title={t.learningObjectives}>
      <div className="page-title">
        <p className="eyebrow">MODULE 0{id} · {m.title.toUpperCase()}</p>
        <h1>{t.learningObjectives}</h1>
        <p>{t.afterModule}</p>
      </div>
      <div className="objective-list">
        {content.objectives.map((x, i) => <article key={x}><b>0{i + 1}</b><p>{x}</p></article>)}
      </div>
      <Button onClick={() => nav(`/module/${id}/pretest`)}>{t.startPretest} <ArrowRight size={18} /></Button>
    </Shell>
  );
}

// ─── Assessment intro ─────────────────────────────────────────────────────────
function AssessmentIntro({ post = false }: { post?: boolean }) {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const m = modules[id - 1];
  return (
    <Shell title={post ? t.posttestIntro : t.pretestIntroTitle}>
      <div className="assessment-intro">
        <div className="intro-icon"><ClipboardCheck size={38} /></div>
        <p className="eyebrow">MODULE 0{id} · {m.title.toUpperCase()}</p>
        <h1>{post ? "Post-test" : t.diagnosticPretest}</h1>
        <p>{post ? t.posttestDesc : t.pretestDesc}</p>
        <div className="meta"><span>10 {t.questionsLabel}</span><span>{t.multipleChoice}</span></div>
        {!post && (
          <aside className="info-box">
            <Info size={19} />
            <p>{t.pretestNote}</p>
          </aside>
        )}
      </div>
      <Button onClick={() => nav(`/module/${id}/${post ? "postquiz" : "prequiz"}`)}>
        {post ? t.startPosttest : t.startPretest} <ArrowRight size={18} />
      </Button>
    </Shell>
  );
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz({ post = false }: { post?: boolean }) {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const [index, setIndex] = useState(0);
  const answerStorageKey = `evp-${post ? "post" : "pre"}-answers-m${id}`;
  const [answers, setAnswers] = useState<number[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(answerStorageKey) || "[]");
      return Array.isArray(stored) ? stored.filter(value => Number.isInteger(value)) : [];
    } catch {
      return [];
    }
  });
  const module = modules[id - 1];
  const questions = post ? moduleContent(id).posttest : moduleContent(id).pretest;
  const q = questions[index % questions.length];
  const last = index === questions.length - 1;

  useEffect(() => { localStorage.setItem(answerStorageKey, JSON.stringify(answers)); }, [answerStorageKey, answers]);

  function next() {
    if (last) nav(`/module/${id}/${post ? "postsubmit" : "presubmit"}`);
    else setIndex(index + 1);
  }

  return (
    <Shell title={post ? "Post-test" : t.diagnosticPretest}>
      <div className="quiz-head">
        <span>{post ? "POST-TEST" : "PRE-TEST DIAGNOSTIK"}</span>
        <b>{t.questionOf(index + 1, questions.length)}</b>
      </div>
      <ProgressBar value={((index + 1) / questions.length) * 100} />
      <section className="question">
        <figure className="question-visual">
          <img src={module.art} alt={`Visual context for ${module.title}`} />
        </figure>
        <h2>{q.prompt}</h2>
        <div className="options">
          {q.options.map((a, i) => (
            <button
              key={a}
              className={answers[index] === i ? "selected" : ""}
              onClick={() => setAnswers(v => { const n = [...v]; n[index] = i; return n; })}
            >
              <b>{"ABCD"[i]}</b>
              <span>{a}</span>
              {answers[index] === i && <Check size={18} />}
            </button>
          ))}
        </div>
      </section>
      <div className="quiz-actions">
        <Button variant="secondary" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
          {t.previous}
        </Button>
        <Button disabled={answers[index] === undefined} onClick={next}>
          {last ? t.reviewAndSubmit : t.next} <ChevronRight size={18} />
        </Button>
      </div>
    </Shell>
  );
}

// ─── Submit confirm ───────────────────────────────────────────────────────────
function SubmitConfirm({ post = false }: { post?: boolean }) {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  return (
    <Shell title={t.reviewAndSubmit}>
      <div className="empty submit">
        <div><ClipboardCheck size={34} /></div>
        <h2>{t.submitConfirmTitle}</h2>
        <p>{t.submitConfirmDesc}</p>
        <aside className="info-box"><Info size={18} /><p>{t.answersReady(7, 10)}</p></aside>
        <Button onClick={() => nav(`/module/${id}/${post ? "postresult" : "preresult"}`)}>
          {t.submitAnswers}
        </Button>
        <Button variant="secondary" onClick={() => nav(-1)}>{t.reviewAnswers}</Button>
      </div>
    </Shell>
  );
}

// ─── Pre-test result ──────────────────────────────────────────────────────────
function PreResult() {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  return (
    <Shell title={t.preResult}>
      <div className="calm-score">
        <span>{t.startingScore}</span>
        <h1>60<small>/100</small></h1>
        <p>{t.correctCount(6, 4)}</p>
      </div>
      <aside className="info-box"><Info size={19} /><p>{t.pretestNote}</p></aside>
      <Button onClick={() => nav(`/module/${id}/theory`)}>{t.continueToLearning} <ArrowRight size={18} /></Button>
    </Shell>
  );
}

// ─── Theory ───────────────────────────────────────────────────────────────────
function Theory() {
  const nav = useNavigate();
  const { t, lang } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const content = moduleContent(id);
  const [, setP] = useProgress();

  const c = {
    defTitle: lang === "id" ? "Pengertian & Tujuan" : "Definition & Purpose",
    defSub: "Definition & Purpose",
    structTitle: lang === "id" ? "Struktur Teks" : "Text Structure",
    structSub: "Generic Structure",
    featTitle: lang === "id" ? "Ciri Kebahasaan" : "Key Language Features",
    featSub: "Key Language Features",
    structures: content.theory.structure.map(item => item.split(" — ")[0]),
    features: content.theory.features.map(item => item.split(" — ")[0]),
  };
  const lesson = {
    definition: content.theory.definition,
    purpose: content.overview,
    structures: content.theory.structure.map(item => item.split(" — ")[1] || item),
    features: content.theory.features.map(item => item.split(" — ")[1] || item),
  };

  const lessonExtra = ({
    1: {
      art: narrativeLessonArt,
      artAlt: "Visual story of a retail entrepreneur solving a delivery challenge.",
      overview: [
        "Narrative texts normally move forward in time. Readers first understand who is involved and where the events happen, then they follow a problem until it is solved.",
        "In a business story, the conflict may be a shortage of supplies, high delivery costs, changing customer needs, or competition. The resolution explains the decision or innovation that changes the situation.",
      ],
      contextTitle: "Penerapan dalam Dunia Retail",
      context: "Brand stories help businesses build an emotional connection with customers. A story about a founder, an early challenge, or a product innovation can make a retail brand feel memorable and trustworthy.",
      exampleTitle: "Contoh Singkat",
      example: "In 1943, Ingvar started a small business in Sweden. When delivery became expensive, he introduced flat-pack furniture. As a result, customers could carry products home more easily.",
    },
    2: {
      art: descriptiveLessonArt,
      artAlt: "Retail point-of-sale terminal, product shelves, and a product detail display.",
      overview: [
        "The identification section names the subject and gives a general category. It answers the question: What exactly is being described? The description section then gives organized details about appearance, parts, quality, materials, and function.",
        "A useful product description is precise rather than vague. Instead of saying a shelf is good, a writer can say that it has adjustable steel shelves, a durable coating, and an open-front design for better visibility.",
      ],
      contextTitle: "Penerapan dalam Dunia Retail",
      context: "Retail staff use descriptive text in catalogues, product labels, online listings, sales presentations, and store-fixture guides. Accurate details help customers compare products and make confident decisions.",
      exampleTitle: "Contoh Singkat",
      example: "The touchscreen POS terminal is a compact retail device with a dual-screen display. Its sturdy aluminum casing, integrated scanner, and receipt printer support efficient daily transactions.",
    },
    3: {
      art: procedureLessonArt,
      artAlt: "Retail cashier processing a customer checkout step by step.",
      overview: [
        "A strong procedure follows a logical order, because readers need to know what to do first, what to prepare, and what to check before moving to the next step.",
        "In retail, a clear procedure protects both customers and staff. It reduces mistakes in payments, product scanning, stock handling, and service standards while ensuring the same quality of service each time.",
      ],
      contextTitle: "Penerapan dalam Dunia Retail",
      context: "Store SOPs are written as procedure texts. They can explain how to open a register, handle a return, restock a shelf, process a cashless payment, or respond to a customer question.",
      exampleTitle: "Contoh Singkat",
      example: "First, greet the customer. Next, scan every barcode and verify the total on the POS screen. Then process the payment, print the receipt, and hand over the bag politely.",
    },
  } as const)[id] || ({ art: narrativeLessonArt, artAlt: "Retail learning illustration.", overview: [], contextTitle: "Konteks", context: "", exampleTitle: "Contoh", example: "" } as const);

  return (
    <Shell title={t.learningMaterial}>
      <p className="eyebrow">MODULE 0{id} · {modules[id - 1].title.toUpperCase()}</p>
      <div className="page-title compact">
        <h1>{t.learningMaterial}</h1>
        <p>{t.stepLearn} · Step 2 of 4</p>
      </div>
      <figure className="lesson-visual">
        <img src={lessonExtra.art} alt={lessonExtra.artAlt} />
      </figure>
      <section className="theory-section">
        <h2>{c.defTitle}</h2>
        <p className="theory-sub">{c.defSub}</p>
        <p>{lesson.definition}</p>
        <p className="theory-purpose">{lesson.purpose}</p>
        {lessonExtra.overview.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section>
        <h2>{c.structTitle}</h2>
        <p className="theory-sub">{c.structSub}</p>
        <div className="structure">
          {c.structures.map((x, i) => (
            <div key={x}><b>{i + 1}</b><span><strong>{x}</strong><small>{lesson.structures[i]}</small></span>{i < c.structures.length - 1 && <i />}</div>
          ))}
        </div>
      </section>
      <section className="theory-section">
        <h2>{c.featTitle}</h2>
        <p className="theory-sub">{c.featSub}</p>
        <div className="feature-list">{c.features.map((x, i) => <article key={x}><b>{x}</b><p>{lesson.features[i]}</p></article>)}</div>
      </section>
      <section className="theory-section lesson-context">
        <h2>{lang === "id" ? lessonExtra.contextTitle : "Retail Application"}</h2>
        <p>{lessonExtra.context}</p>
      </section>
      <section className="lesson-example">
        <span>{lang === "id" ? "CONTOH BAHASA INGGRIS" : "ENGLISH EXAMPLE"}</span>
        <h2>{lang === "id" ? lessonExtra.exampleTitle : "Short Example"}</h2>
        <p>{lessonExtra.example}</p>
      </section>
      <Button onClick={() => { setP(q => ({ ...q, [`m${id}`]: 25, section: "Pratinjau Kosakata", lastModule: id, lastRoute: `/module/${id}/vocabulary` })); nav(`/module/${id}/vocabulary`); }}>
        {t.vocabPreview} <ArrowRight size={18} />
      </Button>
    </Shell>
  );
}

function Vocabulary() {
  const nav = useNavigate();
  const { t, lang } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const { activeSrc, toggle } = useLocalAudio();
  const [, setP] = useProgress();
  const words = moduleContent(id).vocabulary;
  return (
    <Shell title={`${lang === "id" ? "Modul" : "Module"} 0${id}`}>
      <div className="page-title">
        <h1>{t.vocabPreview}</h1>
        <p>{t.learnBeforeReading}</p>
      </div>
      <div className="vocab-list">
        {words.map(({ word, pos: type, meaning }, index) => {
          const source = `/audio/vocabulary/m${id}-${index + 1}.wav`;
          const playing = activeSrc === source;
          return (
          <article key={word}>
            <div>
              <h3>{word}</h3>
              <span>{type}</span>
              <p>{meaning}</p>
            </div>
            <button className={playing ? "playing" : ""} onClick={() => toggle(source)} aria-label={`Play pronunciation for ${word}`}>
              {playing ? <Pause size={18} /> : <Volume2 size={18} />}
            </button>
          </article>
          );
        })}
      </div>
      <Button onClick={() => { setP(q => ({ ...q, [`m${id}`]: Math.max(q[`m${id}` as "m1" | "m2" | "m3"], 35), section: "Teks Bacaan", lastModule: id, lastRoute: `/module/${id}/reading` })); nav(`/module/${id}/reading`); }}>{t.continueToReading} <ArrowRight size={18} /></Button>
    </Shell>
  );
}

// ─── Reading ──────────────────────────────────────────────────────────────────
const GLOSS: Record<string, { pos: string; meaning: string }> = {
  affordable:   { pos: "adjective", meaning: "Terjangkau; dapat dibeli oleh banyak orang." },
  supplier:     { pos: "noun", meaning: "Pemasok; pihak yang menyediakan barang atau bahan." },
  "flat-pack":  { pos: "noun", meaning: "Kemasan datar; furnitur yang dikemas tipis untuk dirakit sendiri." },
  assemble:     { pos: "verb", meaning: "Merakit; menyusun bagian-bagian menjadi satu kesatuan." },
  innovation:   { pos: "noun", meaning: "Inovasi; ide atau cara baru yang membawa perubahan." },
  boycott:      { pos: "verb/noun", meaning: "Memboikot; menolak menggunakan sesuatu sebagai bentuk protes." },
  revolutionary:{ pos: "adjective", meaning: "Revolusioner; membawa perubahan besar dan mendasar." },
  retailer:     { pos: "noun", meaning: "Pengecer; penjual yang menjual langsung ke konsumen." },
  casing:       { pos: "noun", meaning: "Casing; badan atau penutup luar perangkat." },
  integrated:   { pos: "adjective", meaning: "Terintegrasi; tergabung menjadi satu sistem." },
  sturdy:       { pos: "adjective", meaning: "Kokoh; kuat dan tidak mudah rusak." },
  adjustable:   { pos: "adjective", meaning: "Dapat disesuaikan; bisa diubah posisi atau tingginya." },
  durable:      { pos: "adjective", meaning: "Tahan lama; kuat dalam jangka waktu panjang." },
  visibility:   { pos: "noun", meaning: "Visibilitas; kemampuan untuk dilihat dengan jelas." },
  crisis:       { pos: "noun", meaning: "Krisis; masalah besar yang membutuhkan penyelesaian." },
  suppliers:    { pos: "noun", meaning: "Pemasok; pihak yang menyediakan barang atau bahan." },
  genuine:      { pos: "adjective", meaning: "Asli; terbuat dari bahan yang benar atau autentik." },
};

type ReadingSection = { label?: string; text: string[]; highlightMap?: Record<string, string> };
type ReadingData = {
  texts: {
    title: string;
    subtitle?: string;
    illustration: string;
    sections: { heading: string; body: string; highlights?: string[] }[];
  }[];
};

const READING_DATA: Record<number, ReadingData> = {
  1: {
    texts: [{
      title: "THE STORY OF IKEA",
      subtitle: "Innovation in Furniture Retail",
      illustration: "Flat-pack furniture, made for everyday life.",
      sections: [
        {
          heading: "ORIENTATION",
          body: "Long ago in 1943, a 17-year-old boy named Ingvar Kamprad founded a small business in Älmhult, Sweden. He wanted to create affordable furniture that ordinary people could buy and enjoy in their homes.",
          highlights: ["affordable"],
        },
        {
          heading: "COMPLICATION",
          body: "As IKEA grew, its suppliers faced a boycott from competitors. Delivery of goods became difficult and expensive. The company needed a revolutionary way to solve its supply and cost problems.",
          highlights: ["boycott", "revolutionary"],
        },
        {
          heading: "RESOLUTION",
          body: "IKEA developed the flat-pack concept — furniture packed flat in boxes so customers could carry it home easily and assemble it themselves. This innovation reduced shipping costs and changed the furniture retailer industry forever.",
          highlights: ["flat-pack", "assemble", "retailer"],
        },
        {
          heading: "RE-ORIENTATION",
          body: "Today, IKEA operates in more than 50 countries and serves millions of customers worldwide. Its story is a powerful example of innovation and the spirit of making great design accessible to everyone.",
          highlights: ["innovation"],
        },
      ],
    }],
  },
  2: {
    texts: [
      {
        title: "Modern Touchscreen POS Terminal",
        subtitle: "Product Category: Retail Hardware / POS System",
        illustration: "Retail point-of-sale hardware for modern stores.",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "The Modern Touchscreen POS Terminal is a high-performance point-of-sale device designed specifically for busy retail environments.",
            highlights: [],
          },
          {
            heading: "DESCRIPTION",
            body: "It features a sleek aluminum casing with a dual-screen display — one screen faces the cashier and one faces the customer. The system has an integrated barcode scanner, receipt printer, and card payment reader. Its sturdy construction ensures it can withstand daily use in demanding retail settings. The matte black finish gives it a professional and modern appearance.",
            highlights: ["casing", "integrated", "sturdy"],
          },
        ],
      },
      {
        title: "Heavy-Duty Supermarket Gondola Shelving",
        subtitle: "Product Category: Store Fixtures & Display",
        illustration: "Gondola shelving for supermarket display and merchandising.",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "The Heavy-Duty Supermarket Gondola Shelving is a commercial-grade retail fixture widely used in supermarkets, convenience stores, and hypermarkets.",
            highlights: [],
          },
          {
            heading: "DESCRIPTION",
            body: "Each unit consists of a steel frame with adjustable shelves that can be repositioned at different heights. The shelving is made from durable powder-coated steel that resists rust and damage. Its open-front design allows customers to see and reach products easily, maximizing product visibility and encouraging purchases.",
            highlights: ["adjustable", "durable", "visibility"],
          },
        ],
      },
      {
        title: "Vintage Leather Biker Jacket",
        subtitle: "Product Example: Urban Rider Jacket · Fashion & Merchandise Display",
        illustration: "Fashion merchandise for retail display and visual merchandising.",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "The Urban Rider Jacket is a premium vintage-style leather biker jacket designed for fashion-forward retail display and customer appeal.",
            highlights: [],
          },
          {
            heading: "DESCRIPTION",
            body: "The jacket is crafted from full-grain genuine leather with a classic asymmetrical zip closure. It features wide lapels, two front zippered pockets, and a quilted inner lining for comfort. The distressed finish gives it an authentic vintage character. This jacket is a key display piece for fashion retail stores targeting young adult customers.",
            highlights: [],
          },
        ],
      },
    ],
  },
  3: {
    texts: [{
      title: "HOW TO PROCESS CUSTOMER CHECKOUT USING A POS TERMINAL",
      subtitle: "Store Standard Operating Procedure",
      illustration: "POS terminal checkout procedure for retail staff.",
      sections: [
        {
          heading: "GOAL / AIM",
          body: "To process a customer's purchase accurately and efficiently using a POS (Point of Sale) terminal, ensuring a smooth checkout experience.",
          highlights: [],
        },
        {
          heading: "MATERIALS / EQUIPMENT",
          body: "POS terminal with touchscreen display · Barcode scanner · Receipt printer · Card payment reader (EDC machine) · Cash drawer · Price tags and product barcodes",
          highlights: [],
        },
        {
          heading: "STEPS / PROCEDURES",
          body: "1. GREET — Welcome the customer warmly as they approach the counter.\n2. SCAN — Scan each product's barcode using the barcode scanner.\n3. VERIFY — Confirm the product name and price on the POS screen with the customer.\n4. PAYMENT METHOD — Ask the customer whether they will pay by cash or card.\n5. INSERT / ENTER — For card payment: insert or tap the card on the EDC machine. For cash: enter the amount received.\n6. PRINT / ATTACH / HAND OVER — Print the receipt, attach it to the bag if applicable, and hand it over to the customer with a thank-you.",
          highlights: [],
        },
      ],
    }],
  },
};

function Reading() {
  const nav = useNavigate();
  const { t, lang } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const m = modules[id - 1];
  const [glossWord, setGlossWord] = useState<string | undefined>();
  const { activeSrc, duration, elapsed, toggle, stop } = useLocalAudio();
  const [textIndex, setTextIndex] = useState(0);
  const [, setP] = useProgress();

  const texts = moduleContent(id).readings;
  const current = texts[textIndex] || texts[0];
  const isLast = textIndex === texts.length - 1;

  useEffect(() => { setTextIndex(0); }, [id]);
  useEffect(() => { stop(); }, [textIndex]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const audioSource = `/audio/reading/m${id}-${textIndex + 1}.wav`;
  const playing = activeSrc === audioSource;

  function renderBody(body: string, highlights: string[] = []) {
    if (!highlights.length) {
      return body.split("\n").map((line, i) => <p key={i}>{line}</p>);
    }
    const parts: React.ReactNode[] = [];
    let remaining = body;
    highlights.forEach(h => {
      const idx = remaining.toLowerCase().indexOf(h.toLowerCase());
      if (idx >= 0) {
        parts.push(remaining.slice(0, idx));
        parts.push(
          <button key={h} className="gloss-word" onClick={() => setGlossWord(h)}>
            {remaining.slice(idx, idx + h.length)}
          </button>
        );
        remaining = remaining.slice(idx + h.length);
      }
    });
    parts.push(remaining);
    return <p>{parts}</p>;
  }

  return (
    <Shell title={lang === "id" ? "Teks Bacaan" : "Reading"}>
      <p className="eyebrow">MODULE 0{id} · {m.title.toUpperCase()}</p>
      {texts.length > 1 && (
        <>
          <p className="eyebrow" style={{ marginTop: 2, color: m.accent }}>{t.subMaterialOf(textIndex + 1, texts.length)}</p>
          <div className="reading-selector" aria-label={lang === "id" ? "Pilih teks bacaan" : "Choose reading text"}>
            {texts.map((text, index) => <button key={text.title} className={index === textIndex ? "selected" : ""} onClick={() => setTextIndex(index)} aria-label={`${lang === "id" ? "Teks" : "Text"} ${index + 1}: ${text.title}`}>{index + 1}</button>)}
          </div>
        </>
      )}
      <div className="page-title compact">
        <h1>{current.title}</h1>
        {current.subtitle && <p>{current.subtitle}</p>}
      </div>

      <div className="reading-illustration">
        <ReadingIllustration kind={current.visual} />
      </div>

      <article className="audio-card">
        <div className="audio-icon"><Headphones size={21} /></div>
        <div><b>{t.listenToReading}</b><small>{t.localAudio}</small></div>
        <button onClick={() => toggle(audioSource)} aria-label={playing ? "Pause audio" : "Play audio"}>
          {playing ? <Pause size={19} /> : <Play size={19} />}
        </button>
        <div className="audio-progress">
          <i style={{ width: `${duration ? Math.min(100, (elapsed / duration) * 100) : 0}%` }} />
        </div>
        <small>{fmt(elapsed)} <span>{duration ? fmt(duration) : t.localAudio}</span></small>
      </article>

      <article className="reading-copy">
        {current.sections.map(sec => (
          <div key={sec.heading}>
            <h3>{sec.heading}</h3>
            {renderBody(sec.body, sec.highlights)}
          </div>
        ))}
      </article>

      {isLast ? (
        <Button onClick={() => { setP(q => ({ ...q, [`m${id}`]: 50, section: "Latihan Interaktif", lastModule: id, lastRoute: `/module/${id}/practice` })); nav(`/module/${id}/practice`); }}>
          {t.startPractice} <ArrowRight size={18} />
        </Button>
      ) : (
        <Button onClick={() => setTextIndex(textIndex + 1)}>
          {t.nextText} <ArrowRight size={18} />
        </Button>
      )}

      {glossWord && <GlossarySheet word={glossWord} close={() => setGlossWord(undefined)} />}
    </Shell>
  );
}

// ─── Glossary bottom sheet ────────────────────────────────────────────────────
function GlossarySheet({ word, close }: { word: string; close: () => void }) {
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const { activeSrc, toggle } = useLocalAudio();
  const info = glossaryFor(moduleContent(id))[word.toLowerCase()] || GLOSS[word.toLowerCase()] || { pos: "noun", meaning: "Makna tersedia di kamus." };
  const audioSource = `/audio/glossary/${word.toLowerCase().replace(/\s+/g, "-")}.wav`;
  const playing = audioSource === activeSrc;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);
  return (
    <div className="sheet-backdrop" onClick={close} role="presentation">
      <div className="sheet" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${word} glossary`}>
        <i className="handle" />
        <button className="sheet-close" onClick={close}><X size={20} /></button>
        <span className="eyebrow">{t.wordType.toUpperCase()} · {info.pos.toUpperCase()}</span>
        <h2 style={{ textTransform: "capitalize" }}>{word}</h2>
        <button className="pronounce" onClick={() => toggle(audioSource)}>
          {playing ? <Pause size={18} /> : <Volume2 size={18} />}
          {playing ? t.playingPronunciation : t.playPronunciation}
        </button>
        <p>{info.meaning}</p>
      </div>
    </div>
  );
}

// ─── Practice ─────────────────────────────────────────────────────────────────
function Practice() {
  const nav = useNavigate();
  const { t, lang } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const [, setP] = useProgress();
  const [stage, setStage] = useState(1);
  const [selectedLeft, setSelectedLeft] = useState<string | undefined>();
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const modulePractices = moduleContent(id).practices;
  const sequencePractice = modulePractices.find(item => item.type === "sequence");
  const [order, setOrder] = useState<string[]>(() => sequencePractice && sequencePractice.type === "sequence" ? [...sequencePractice.items] : []);
  const practice = modulePractices[stage - 1];
  const isSequence = practice.type === "sequence";
  const matching = isSequence ? undefined : practice;
  const sequenceIsCorrect = isSequence && order.every((item, index) => item === practice.answer[index]);
  const pairIsCorrect = matching && matching.left.every(left => pairs[left] === matching.pairs[left]);
  const practiceCopy = {
    id: {
      1: [["Mencocokkan Struktur", "Cocokkan setiap bagian Narrative Text dengan fungsinya."], ["Mencocokkan Kosakata", "Cocokkan kosakata retail dengan makna bahasa Indonesianya."], ["Mengurutkan Peristiwa", "Atur peristiwa cerita dari awal hingga akhir."]],
      2: [["Mencocokkan Fitur Produk", "Cocokkan setiap fitur dengan produk retail yang tepat."], ["Mencocokkan Kosakata", "Cocokkan kosakata deskriptif dengan makna bahasa Indonesianya."], ["Mengelompokkan Struktur Teks", "Cocokkan kalimat dengan bagian Identification atau Description."]],
      3: [["Mengurutkan Proses Checkout", "Atur langkah checkout dari awal hingga akhir."], ["Mencocokkan Peralatan", "Cocokkan peralatan retail dengan kegunaannya."], ["Mencocokkan Kata Penghubung", "Cocokkan kata penghubung urutan dengan makna bahasa Indonesianya."]],
    },
    en: {
      1: [["Structure Match", "Match each Narrative Text part with its purpose."], ["Vocabulary Match", "Match each retail word with its Indonesian meaning."], ["Event Sequence", "Arrange the story events from first to last."]],
      2: [["Product Feature Match", "Match each feature with the correct retail product."], ["Vocabulary Match", "Match each descriptive word with its Indonesian meaning."], ["Text Structure Sort", "Match each sentence with Identification or Description."]],
      3: [["Checkout Sequence", "Arrange the checkout steps in the correct order."], ["Equipment Match", "Match each retail tool with its use."], ["Sequence Connector Match", "Match each connector with its Indonesian meaning."]],
    },
  } as const;
  const moduleCopy = practiceCopy[lang][id as 1 | 2 | 3][stage - 1];

  function handleCta() {
    if (!checked) { setChecked(true); return; }
    if (stage === modulePractices.length) {
      setP(current => ({ ...current, [`m${id}`]: Math.max(current[`m${id}` as "m1" | "m2" | "m3"], 70), section: "Post-test", lastModule: id, lastRoute: `/module/${id}/posttest` }));
      nav(`/module/${id}/posttest`);
      return;
    }
    setStage(stage + 1);
    setSelectedLeft(undefined);
    setPairs({});
    setChecked(false);
  }

  function moveItem(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= order.length) return;
    setOrder(items => {
      const next = [...items];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
    setChecked(false);
  }

  function chooseRight(right: string) {
    if (!selectedLeft || !matching) return;
    setPairs(current => {
      const next = Object.fromEntries(Object.entries(current).filter(([left, pairedRight]) => left !== selectedLeft && pairedRight !== right));
      next[selectedLeft] = right;
      return next;
    });
    setSelectedLeft(undefined);
    setChecked(false);
  }

  const canCheck = isSequence ? order.length > 0 : Boolean(matching && matching.left.every(left => pairs[left]));
  const isCorrect = isSequence ? sequenceIsCorrect : pairIsCorrect;

  return (
    <Shell title={t.startPractice}>
      <div className="page-title">
        <p className="eyebrow">{t.activityOf(stage, 3).toUpperCase()}</p>
        <h1>{moduleCopy[0]}</h1>
        <p>{moduleCopy[1]}</p>
      </div>
      <ProgressBar value={stage * 33} />

      {!isSequence && matching ? (
        <div className="match-grid practice-match-grid">
          <div>
            <p className="task-label">{lang === "id" ? "PILIH BAGIAN" : "CHOOSE A PART"}</p>
            {matching.left.map(left => {
              const paired = pairs[left];
              const correct = checked && paired === matching.pairs[left];
              const incorrect = checked && paired && !correct;
              return <button key={left} className={["match-source", selectedLeft === left ? "selected" : "", correct ? "correct" : "", incorrect ? "incorrect" : ""].join(" ").trim()} onClick={() => { setSelectedLeft(left); setChecked(false); }} aria-pressed={selectedLeft === left}>
                <span><b>{left}</b>{paired && <small>{paired}</small>}</span>{paired ? <Check size={17} /> : <ChevronRight size={17} />}
              </button>;
            })}
          </div>
          <div>
            <p className="task-label">{lang === "id" ? "PILIH PASANGAN" : "CHOOSE A MATCH"}</p>
            {matching.right.map(right => <button key={right} className={`match-target${Object.values(pairs).includes(right) ? " paired" : ""}`} onClick={() => chooseRight(right)} disabled={!selectedLeft} aria-disabled={!selectedLeft}>
              <span>{right}</span>
            </button>)}
          </div>
        </div>
      ) : (
        <div className="sequence">
          <p className="sequence-help">Gunakan tombol panah untuk memindahkan setiap peristiwa ke atas atau ke bawah.</p>
          {order.map((x, i) => (
            <div className={`seq-row${checked ? (sequenceIsCorrect ? " correct" : " incorrect") : ""}`} key={x}>
              <div className="seq-item">
                <GripVertical size={18} className="drag-handle" />
                <b>{i + 1}</b>
                <span>{x}</span>
              </div>
              <div className="sequence-controls">
                <button onClick={() => moveItem(i, -1)} disabled={i === 0} aria-label={`Pindahkan ${x} ke atas`}><ChevronUp size={17} /></button>
                <button onClick={() => moveItem(i, 1)} disabled={i === order.length - 1} aria-label={`Pindahkan ${x} ke bawah`}><ChevronDown size={17} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {checked && (
        <div className={`feedback ${isCorrect ? "good" : "bad"}`}>
          {isCorrect ? <Check size={22} /> : <AlertTriangle size={22} />}
          <div>
            <b>{isCorrect ? t.greatJob : t.notQuiteYet}</b>
            <p>{isCorrect ? t.thatCorrect : t.reviewSentence}</p>
          </div>
        </div>
      )}

      <Button disabled={!canCheck} onClick={handleCta}>
        {checked ? t.continueBtn : t.checkAnswer}{" "}
        <ArrowRight size={18} />
      </Button>
    </Shell>
  );
}

// ─── Final result ─────────────────────────────────────────────────────────────
function FinalResult() {
  const nav = useNavigate();
  const { t } = useLang();
  const id = Number(useLocation().pathname.split("/")[2]) || 1;
  const [, setP] = useProgress();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setP(q => ({ ...q, [`m${id}`]: 100, [`score${id}`]: 83 }));
    const timer = setTimeout(() => setAnimating(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const pretest = 60;
  const posttestRaw = 80;
  const posttestWeighted = 56;
  const practiceScore = 27;
  const finalScore = posttestWeighted + practiceScore;
  const gain = posttestRaw - pretest;
  const passed = finalScore >= 70;

  return (
    <Shell title={t.moduleResult}>
      <section className="final-hero">
        <div className={`score-ring ${passed ? "pass" : "warn"} ${animating ? "animating" : ""}`}>
          <div>
            <b>{finalScore}</b>
            <span>/100</span>
          </div>
        </div>
        <div>
          <span className={`result-badge ${passed ? "pass" : "warn"}`}>
            {passed ? <><Check size={14} /> {t.tuntas}</> : <><AlertTriangle size={14} /> {t.perluReview}</>}
          </span>
          <h1>{passed ? t.excellentProgress : t.tetapSemangat}</h1>
          <p>{passed ? t.completedModule : t.reviewRecommended}</p>
        </div>
      </section>

      <section className="gain">
        <div><small>{t.pretestLabel}</small><b>{pretest}</b></div>
        <ArrowRight size={16} style={{ color: "#94a3b8", flex: "none" }} />
        <div><small>Post-test</small><b>{posttestRaw}</b></div>
        <div className="gain-badge">+{gain} {t.improvement}</div>
      </section>

      <section className="breakdown">
        <h2>{t.yourResult}</h2>
        {[
          [t.pretestLabel, `${pretest} / 100`],
          [t.posttestRaw, `${posttestRaw} / 100`],
          [t.posttestWeighted, `${posttestWeighted} / 70`],
          [t.practice, `${practiceScore} / 30`],
          [t.finalScore, `${finalScore} / 100`],
        ].map(([a, b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}
      </section>

      <div className="score-meta">
        <div><small>{t.latestScore}</small><b>{finalScore}</b></div>
        <div><small>{t.bestScore}</small><b>{finalScore}</b></div>
      </div>

      <Button onClick={() => nav(`/module/${id}/theory`)}>{t.reviewMaterial}</Button>
      <Button variant="secondary" onClick={() => nav("/home")}>{t.backToModules}</Button>
    </Shell>
  );
}

// ─── Progress page ────────────────────────────────────────────────────────────
function ProgressPage() {
  const nav = useNavigate();
  const { t } = useLang();
  const [p] = useProgress();
  const completed = [p.m1, p.m2, p.m3].filter(v => v >= 100).length;
  const overall = Math.round((p.m1 + p.m2 + p.m3) / 3);
  const empty = !p.m1 && !p.m2 && !p.m3;

  return (
    <Shell back={false} title={t.navProgress}>
      <div className="page-title">
        <h1>{t.yourProgress}</h1>
        <p>{empty ? t.noProgressYet : ""}</p>
      </div>

      {empty ? (
        <div className="empty">
          <div><Target size={34} /></div>
          <h2>{t.notStartedYet}</h2>
          <p>{t.noProgressYet}</p>
          <Button onClick={() => nav("/modules")}>{t.startLearning}</Button>
        </div>
      ) : (
        <>
          <section className="overall">
            <span>{t.overallProgress.toUpperCase()}</span>
            <h2>{t.modulesCompletedOf(completed)}</h2>
            <b>{overall}%</b>
            <ProgressBar value={overall} />
          </section>

          <div className="progress-modules" style={{ marginTop: 24 }}>
            {modules.map(m => {
              const prog = m.id === 1 ? p.m1 : m.id === 2 ? p.m2 : p.m3;
              const score = m.id === 1 ? p.score1 : m.id === 2 ? p.score2 : p.score3;
              const status = prog >= 100 ? "done" : prog > 0 ? "active" : "idle";
              const statusLabel = prog >= 100 ? t.completed : prog > 0 ? t.inProgress : t.notStarted;
              const I = m.icon;
              return (
                <button key={m.id} className="progress-mod-card" onClick={() => nav(`/module/${m.id}`)}>
                  <div className="pm-icon" style={{ background: m.tint, color: m.accent }}><I size={20} /></div>
                  <div className="pm-info">
                    <p className="pm-label">Module 0{m.id} · {m.title}</p>
                    <p className={`pm-status ${status}`}>
                      {status === "done" ? <Check size={13} /> : status === "active" ? <CircleDot size={13} /> : <span className="pm-dot" />}
                      {statusLabel}
                    </p>
                    {prog > 0 && prog < 100 && <ProgressBar value={prog} color={m.accent} />}
                  </div>
                  <div className="pm-right">
                    {prog >= 100 && score ? <b className="pm-score">{score}</b> : prog > 0 ? <em className="pm-pct">{prog}%</em> : <ChevronRight size={17} style={{ color: "#94a3b8" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </Shell>
  );
}

// ─── Guide page ───────────────────────────────────────────────────────────────
function GuidePage() {
  const { t } = useLang();
  return (
    <Shell title={t.howToUse}>
      <div className="page-title">
        <h1>{t.guideTitle}</h1>
        <p>{t.guideSub}</p>
      </div>
      <div className="simple-list">
        {t.guideItems.map((x, i) => <article key={x}><b>0{i + 1}</b><p>{x}</p></article>)}
      </div>
    </Shell>
  );
}

// ─── Outcomes page ────────────────────────────────────────────────────────────
function OutcomesPage() {
  const { t } = useLang();
  return (
    <Shell title={t.learningOutcomes}>
      <div className="page-title">
        <h1>{t.outcomesTitle}</h1>
        <p>{t.outcomesSub}</p>
      </div>
      <div className="metadata-card"><span>Kurikulum Merdeka</span><span>Phase E</span><span>Reading–Viewing</span></div>
      <div className="simple-list">
        {t.outcomesItems.map((x, i) => <article key={x}><b>0{i + 1}</b><p>{x}</p></article>)}
      </div>
    </Shell>
  );
}

// ─── Profile page ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const { t } = useLang();
  const f = t.profileFields;
  const rows: [string, string][] = [
    [f.nama, "— (data peneliti)"],
    [f.nim, "— (NIM peneliti)"],
    [f.prodi, "Pendidikan Bahasa Inggris"],
    [f.fakultas, "— (data peneliti)"],
    [f.universitas, "— (data peneliti)"],
    [f.pembimbing, "— (data peneliti)"],
    [f.judul, "Pengembangan Media Pembelajaran EVP Learn Berbasis Android untuk Siswa Kelas X SMK"],
    [f.tahun, "2026"],
  ];
  return (
    <Shell back={false} title={t.navProfile}>
      <div className="profile-header">
        <div className="profile-avatar-large">
          <UserRound size={44} />
        </div>
        <h1>{t.profileTitle}</h1>
        <p>{t.profileSub}</p>
      </div>
      <div className="profile-fields">
        {rows.map(([label, value]) => (
          <div key={label} className="profile-field">
            <span className="pf-label">{label}</span>
            <span className="pf-value">{value}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

// ─── Splash ───────────────────────────────────────────────────────────────────
function Splash() {
  const nav = useNavigate();
  useEffect(() => { const t = setTimeout(() => nav("/home"), 1200); return () => clearTimeout(t); }, [nav]);
  return (
    <div className="splash">
      <div className="splash-icon"><img src={logo} alt="EVP Learn" /></div>
      <p>ENGLISH FOR VOCATIONAL PURPOSES</p>
      <h1>EVP<br />Learn</h1>
      <span>Learning for the world of retail</span>
      <i />
    </div>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: "/", Component: Splash },
  { path: "/home", Component: HomePage },
  { path: "/modules", Component: ModulesPage },
  { path: "/module/:id", Component: Overview },
  { path: "/module/:id/objectives", Component: Objectives },
  { path: "/module/:id/pretest", Component: () => <AssessmentIntro /> },
  { path: "/module/:id/prequiz", Component: Quiz },
  { path: "/module/:id/presubmit", Component: SubmitConfirm },
  { path: "/module/:id/preresult", Component: PreResult },
  { path: "/module/:id/theory", Component: Theory },
  { path: "/module/:id/vocabulary", Component: Vocabulary },
  { path: "/module/:id/reading", Component: Reading },
  { path: "/module/:id/practice", Component: Practice },
  { path: "/module/:id/posttest", Component: () => <AssessmentIntro post /> },
  { path: "/module/:id/postquiz", Component: () => <Quiz post /> },
  { path: "/module/:id/postsubmit", Component: () => <SubmitConfirm post /> },
  { path: "/module/:id/postresult", Component: FinalResult },
  { path: "/progress", Component: ProgressPage },
  { path: "/guide", Component: GuidePage },
  { path: "/outcomes", Component: OutcomesPage },
  { path: "/profile", Component: ProfilePage },
]);

export default function App() {
  return <LangProvider><RouterProvider router={router} /></LangProvider>;
}
