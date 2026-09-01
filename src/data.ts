// ============================================================
// EVP Learn — Academic Data Module
// Source: Materi_Afrida_Revisi_Final_Siap_Aplikasi v1.0
// Pre-test:  PROTOTYPE / Diagnostic — pending academic validation
// Post-test: PROTOTYPE — pending final bank from source DOCX
// ============================================================

export const PASSING_THRESHOLD = 75;
// ↑ Centralized KKM/KKTP per PRD default (§19.3).
//   Confirm final value with supervising researcher before production.

// ─── Types ───────────────────────────────────────────────────────────────────

export type Question = {
  prompt: string;
  options: string[];
  answer: number; // 0-indexed correct option
  feedback?: string;
};

export type Word = {
  word: string;
  pos: string;
  meaning: string;
};

export type Practice =
  | {
      type: "match" | "tapMatch";
      title: string;
      instruction: string;
      left: string[];
      right: string[];
      pairs: Record<string, string>;
    }
  | {
      type: "sequence";
      title: string;
      instruction: string;
      items: string[];
      answer: string[];
    };

export type IllustrationKind = "furniture" | "pos" | "shelving" | "jacket" | "checkout";

export type Reading = {
  title: string;
  subtitle: string;
  visual: IllustrationKind;
  sections: { heading: string; body: string; highlights: string[] }[];
  /** Interactive glossary for THIS reading — separate from vocabularyPreview. */
  glossary: Word[];
};

export type Module = {
  id: number;
  title: string;
  subtitle: string;
  accent: string;
  tint: string;
  overview: string;
  objectives: string[];
  theory: {
    definition: string;
    structure: string[];
    features: string[];
  };
  /** 5 preview words shown BEFORE reading. Separate from reading interactive glossary. */
  vocabularyPreview: Word[];
  readings: Reading[];
  /** Diagnostic pre-test. Score does NOT affect final result. PROTOTYPE — validation pending. */
  pretest: Question[];
  /** Post-test. Contributes max 70 pts (weighted). PROTOTYPE — awaiting DOCX final bank. */
  posttest: Question[];
  practices: Practice[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const q = (prompt: string, options: string[], answer = 0): Question => ({
  prompt,
  options,
  answer,
});

const w = (word: string, pos: string, meaning: string): Word => ({ word, pos, meaning });

/**
 * Prototype placeholder question bank.
 * PROTOTYPE — replace with finalized questions from DOCX when available.
 */
const bank = (topic: string, answers: string[]): Question[] =>
  [
    "What is the main purpose of",
    "Which statement is correct about",
    "Which key concept appears in",
    "What should a reader identify in",
    "Which feature best supports",
    "What is an important detail in",
    "Which vocabulary is relevant to",
    "Which generic structure is used in",
    "What does the reading material explain about",
    "Which conclusion is appropriate for",
  ].map((stem) => q(`${stem} ${topic}?`, answers, 0));

// ─── Glossary Helpers ─────────────────────────────────────────────────────────

/** Map a reading's glossary to a lookup Record keyed by lowercase word. */
export const readingGlossaryFor = (reading: Reading): Record<string, Word> =>
  Object.fromEntries(reading.glossary.map((item) => [item.word.toLowerCase(), item]));

/**
 * @deprecated Use readingGlossaryFor(reading) for the active reading.
 * Kept for backward compatibility — merges all reading glossaries.
 */
export const glossaryFor = (module: Module): Record<string, Word> =>
  Object.fromEntries(
    module.readings.flatMap((r) => r.glossary).map((item) => [item.word.toLowerCase(), item])
  );

// ─── Module Data ─────────────────────────────────────────────────────────────

export const MODULES: Record<number, Module> = {

  // ══════════════════════════════════════════════════════════════════
  // MODULE 1 — NARRATIVE TEXT
  // Reading: The Story of IKEA
  // Chronology (revised-final): 1943 founding → early 1950s supplier
  //   pressure → 1956 Kamprad + Gillis Lundgren flat-pack → global
  // ══════════════════════════════════════════════════════════════════
  1: {
    id: 1,
    title: "Narrative Text",
    subtitle: "Inspirational Business & Brand Stories",
    accent: "#2563eb",
    tint: "#eff6ff",
    overview:
      "Learn how an inspiring retail business story develops through a setting, challenge, creative solution, and meaningful outcome.",
    objectives: [
      "Identify the purpose of a narrative text in a retail context.",
      "Recognize Orientation, Complication, Resolution, and Re-orientation.",
      "Find main ideas and details in the IKEA story.",
      "Use narrative and retail vocabulary in context.",
    ],
    theory: {
      definition:
        "A narrative text tells a story of connected events. In retail, it presents inspirational business origins, brand histories, and entrepreneurship challenges to entertain and inspire readers.",
      structure: [
        "Orientation — introduces the founder, setting, and starting time.",
        "Complication — presents the main business problem or crisis.",
        "Resolution — explains the creative solution.",
        "Re-orientation — shows success and the moral lesson.",
      ],
      features: [
        "Simple Past Tense — founded, struggled, invented, launched.",
        "Action Verbs — sold, built, shipped, produced.",
        "Time Connectives — long ago, at first, suddenly, finally.",
      ],
    },

    // ── Vocabulary Preview (5 words shown BEFORE reading) ───────────
    vocabularyPreview: [
      w("Founder",      "noun", "Pendiri bisnis atau perusahaan."),
      w("Venture",      "noun", "Usaha atau bisnis baru yang berisiko."),
      w("Crisis",       "noun", "Krisis atau masalah besar."),
      w("Breakthrough", "noun", "Inovasi atau penemuan penting."),
      w("Retailer",     "noun", "Pengecer atau pengusaha ritel."),
    ],

    readings: [
      {
        title: "THE STORY OF IKEA",
        subtitle: "Innovation in Furniture Retail",
        visual: "furniture",
        sections: [
          {
            heading: "ORIENTATION",
            body: "In 1943, a 17-year-old entrepreneur named Ingvar Kamprad founded a small mail-order business in Sweden. He named the company IKEA — combining his own initials (I.K.) with the first letters of Elmtaryd, the farm where he grew up, and Agunnaryd, the nearby village in southern Sweden. In its earliest years, IKEA sold small everyday items such as pens, wallets, and picture frames, before furniture was added to the catalogue a few years later.",
            highlights: [],
          },
          {
            heading: "COMPLICATION",
            body: "By the early 1950s, IKEA had begun offering affordable furniture through its mail-order catalogue. This decision angered traditional Swedish furniture store owners, who pressured local suppliers to boycott IKEA and refuse it pre-assembled goods. Unable to source furniture from Swedish manufacturers, Kamprad had to look for alternatives abroad. The difficulty was made worse by the high cost of shipping bulky items. Oversized tables and sofas required enormous packaging, were expensive to arrange for delivery, and were frequently damaged in transit.",
            highlights: ["affordable", "suppliers", "boycott", "delivery"],
          },
          {
            heading: "RESOLUTION",
            body: "In 1956, a creative solution emerged unexpectedly. While Ingvar Kamprad and his designer Gillis Lundgren were loading a table for shipment, Gillis suggested removing its legs so that it could fit into a flat, compact box. This idea became the foundation of the flat-pack concept: furniture sold in flat boxes that customers could carry home easily and assemble themselves. The innovation dramatically reduced transportation costs, decreased damage during transit, and made it possible to sell quality furniture at surprisingly low prices.",
            highlights: ["flat-pack", "assemble"],
          },
          {
            heading: "RE-ORIENTATION",
            body: "Today, IKEA has grown into the world's most widely recognised furniture retailer, operating hundreds of stores across more than 60 countries. Its journey from a small Swedish mail-order business to a global brand demonstrates that creative problem-solving and a focus on practical customer needs can transform everyday challenges into lasting innovations that benefit millions of people worldwide.",
            highlights: ["retailer"],
          },
        ],
        // Interactive glossary — separate from vocabularyPreview
        glossary: [
          w("Boycott",   "verb/noun",   "Memboikot; menolak bekerja sama sebagai bentuk protes."),
          w("Supplier",  "noun",        "Pemasok; pihak yang menyediakan barang atau bahan baku."),
          w("Affordable","adjective",   "Terjangkau; harganya dapat dijangkau banyak orang."),
          w("Delivery",  "noun",        "Pengiriman; proses mengantar barang kepada pelanggan."),
          w("Flat-pack", "noun phrase", "Kemasan datar; produk dikemas tipis untuk dirakit sendiri."),
          w("Assemble",  "verb",        "Merakit; menyusun bagian-bagian menjadi satu produk."),
          w("Retailer",  "noun",        "Pengecer; penjual yang menjual langsung ke konsumen akhir."),
        ],
      },
    ],

    // PROTOTYPE — diagnostic pre-test, score excluded from final
    pretest: bank("Narrative Text", [
      "A narrative tells connected events",
      "A descriptive text",
      "A procedure text",
      "A report",
    ]),

    // PROTOTYPE — awaiting final bank from Materi_Afrida_Revisi_Final_Siap_Aplikasi.docx
    posttest: bank("IKEA Narrative", [
      "Creative problem solving",
      "A payment method",
      "A product colour",
      "A user account",
    ]),

    practices: [
      {
        type: "match",
        title: "Structure Match",
        instruction: "Match each narrative part with its purpose.",
        left: ["Orientation", "Complication", "Resolution", "Re-orientation"],
        right: [
          "Shows the final success and lesson",
          "Introduces the setting",
          "Shows the solution",
          "Shows the challenge",
        ],
        pairs: {
          "Orientation":    "Introduces the setting",
          "Complication":   "Shows the challenge",
          "Resolution":     "Shows the solution",
          "Re-orientation": "Shows the final success and lesson",
        },
      },
      {
        type: "tapMatch",
        title: "Vocabulary Match",
        instruction: "Match each word with its Indonesian meaning.",
        left: ["Boycott", "Flat-pack", "Assemble", "Delivery"],
        right: [
          "Merakit",
          "Pengiriman barang",
          "Memboikot",
          "Kemasan datar untuk dirakit sendiri",
        ],
        pairs: {
          "Boycott":   "Memboikot",
          "Flat-pack": "Kemasan datar untuk dirakit sendiri",
          "Assemble":  "Merakit",
          "Delivery":  "Pengiriman barang",
        },
      },
      {
        type: "sequence",
        title: "IKEA Event Sequence",
        instruction: "Arrange the IKEA story events from first to last.",
        items: [
          "IKEA became a global retailer",
          "IKEA began selling furniture",
          "Flat-pack was developed",
          "Ingvar founded IKEA",
          "Suppliers boycotted IKEA",
        ],
        answer: [
          "Ingvar founded IKEA",
          "IKEA began selling furniture",
          "Suppliers boycotted IKEA",
          "Flat-pack was developed",
          "IKEA became a global retailer",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // MODULE 2 — DESCRIPTIVE TEXT
  // Readings: POS Terminal · Gondola Shelving · Biker Jacket
  // Jacket glossary: Genuine (not Premium) per revised-final source
  // ══════════════════════════════════════════════════════════════════
  2: {
    id: 2,
    title: "Descriptive Text",
    subtitle: "Retail Products & Store Fixtures",
    accent: "#7c3aed",
    tint: "#f5f3ff",
    overview:
      "Learn to describe retail products and store fixtures through identification, precise details, noun phrases, and adjectives.",
    objectives: [
      "Identify the purpose of a descriptive text.",
      "Recognize Identification and Description.",
      "Find product specifications and descriptive details.",
      "Use retail adjectives and noun phrases in context.",
    ],
    theory: {
      definition:
        "A descriptive text describes a specific object, place, or item in detail. In retail, it describes merchandise specifications, store fixtures, and product selling points.",
      structure: [
        "Identification — introduces the product or fixture.",
        "Description — details physical features, materials, size, colours, durability, and functions.",
      ],
      features: [
        "Simple Present Tense — features, includes, measures, contains.",
        "Adjectives — durable, sleek, ergonomic, sturdy.",
        "Noun Phrases — heavy-duty shelving, dual-screen terminal.",
      ],
    },

    // ── Vocabulary Preview (5 words) ─────────────────────────────────
    vocabularyPreview: [
      w("Merchandise", "noun",      "Barang dagangan."),
      w("Durable",     "adjective", "Tahan lama atau awet."),
      w("Adjustable",  "adjective", "Dapat disesuaikan."),
      w("Display",     "noun/verb", "Penataan atau pajangan barang."),
      w("Sleek",       "adjective", "Halus, modern, dan elegan."),
    ],

    readings: [
      // ── Submaterial 1: POS Terminal ──────────────────────────────
      {
        title: "Modern Touchscreen POS Terminal",
        subtitle: "Retail Hardware / POS System",
        visual: "pos",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "The OmniTouch 500 is a modern touchscreen POS terminal designed for fast-paced retail stores.",
            highlights: [],
          },
          {
            heading: "DESCRIPTION",
            body: "It features a sleek black casing made of high-impact ABS plastic and a 15.6-inch dual-screen display that allows both cashiers and customers to view transactions simultaneously. At the top of the main unit, there is an integrated thermal receipt printer that operates quietly and at high speed. Supported by a sturdy metallic stand with a rust-resistant finish, this device ensures smooth checkout operations while maintaining an elegant aesthetic on the cashier counter.",
            highlights: ["sleek", "casing", "dual-screen display", "integrated", "sturdy", "finish"],
          },
        ],
        glossary: [
          w("Sleek",               "adjective",   "Halus, modern, dan elegan."),
          w("Casing",              "noun",        "Pelindung atau badan luar perangkat."),
          w("Dual-screen display", "noun phrase", "Layar ganda untuk kasir dan pembeli."),
          w("Integrated",          "adjective",   "Terintegrasi; tergabung dalam satu unit."),
          w("Sturdy",              "adjective",   "Kokoh dan tidak mudah goyah."),
          w("Finish",              "noun",        "Lapisan akhir pada permukaan produk."),
        ],
      },

      // ── Submaterial 2: Gondola Shelving ──────────────────────────
      {
        title: "Heavy-Duty Supermarket Gondola Shelving",
        subtitle: "Store Fixtures & Display",
        visual: "shelving",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "This heavy-duty gondola shelving unit is built specifically for organizing supermarket merchandise efficiently.",
            highlights: ["gondola shelving", "merchandise"],
          },
          {
            heading: "DESCRIPTION",
            body: "Standing 2 meters tall, it consists of five adjustable steel shelves painted in a durable matte white powder coating. Each shelf is engineered to support up to 100 kilograms of goods, making it ideal for heavy food packaging and household cleaning items. Its open-front design provides high product visibility, allowing shoppers to easily locate and reach items while maximising aisle space.",
            highlights: ["adjustable", "durable", "open-front", "visibility"],
          },
        ],
        glossary: [
          w("Gondola shelving", "noun phrase", "Rak gondola; rak display standar supermarket."),
          w("Merchandise",      "noun",        "Barang dagangan."),
          w("Adjustable",       "adjective",   "Dapat disesuaikan tinggi atau posisinya."),
          w("Durable",          "adjective",   "Tahan lama; kuat dalam jangka panjang."),
          w("Open-front",       "adjective",   "Terbuka pada bagian depan rak."),
          w("Visibility",       "noun",        "Tingkat keterlihatan produk oleh pelanggan."),
        ],
      },

      // ── Submaterial 3: Biker Jacket (Genuine — not Premium) ──────
      {
        title: "Vintage Leather Biker Jacket",
        subtitle: "Fashion & Merchandise Display",
        visual: "jacket",
        sections: [
          {
            heading: "IDENTIFICATION",
            body: "The Urban Rider Jacket is a classic black biker-style leather jacket crafted for front-window retail display.",
            highlights: [],
          },
          {
            heading: "DESCRIPTION",
            body: "Made from genuine cowhide leather, it features a smooth texture with a subtle natural shine. The jacket includes asymmetrical silver zippers, a snap-button collar, and an adjustable waist belt for a custom fit. Its bold design and high-quality craftsmanship make it an eye-catching centerpiece that attracts potential fashion shoppers into the store.",
            highlights: ["genuine", "asymmetrical", "adjustable", "eye-catching", "centerpiece"],
          },
        ],
        glossary: [
          w("Genuine",      "adjective", "Asli; terbuat dari bahan yang autentik."),
          w("Asymmetrical", "adjective", "Tidak simetris; tidak sama kiri dan kanan."),
          w("Adjustable",   "adjective", "Dapat disesuaikan ukurannya."),
          w("Eye-catching", "adjective", "Menarik perhatian; mencolok secara visual."),
          w("Centerpiece",  "noun",      "Produk utama yang menjadi pusat perhatian display."),
        ],
      },
    ],

    pretest: bank("Descriptive Text", [
      "Describe an object in detail",
      "Tell a past story",
      "Give steps",
      "Debate an issue",
    ]),

    posttest: bank("Retail Products", [
      "Simple Present Tense",
      "Only past tense",
      "No adjectives",
      "Imperatives only",
    ]),

    practices: [
      {
        type: "match",
        title: "Product Feature Match",
        instruction: "Match each feature with the correct retail product.",
        left: ["Dual-screen display", "Adjustable steel shelves", "Asymmetrical silver zippers"],
        right: ["Biker Jacket", "POS Terminal", "Gondola Shelving"],
        pairs: {
          "Dual-screen display":         "POS Terminal",
          "Adjustable steel shelves":    "Gondola Shelving",
          "Asymmetrical silver zippers": "Biker Jacket",
        },
      },
      {
        type: "tapMatch",
        title: "Descriptive Vocabulary",
        instruction: "Match each word with its Indonesian meaning.",
        left: ["Durable", "Sturdy", "Eye-catching"],
        right: ["Kokoh", "Tahan lama", "Menarik perhatian"],
        pairs: {
          "Durable":      "Tahan lama",
          "Sturdy":       "Kokoh",
          "Eye-catching": "Menarik perhatian",
        },
      },
      {
        type: "match",
        title: "Text Structure Sort",
        instruction: "Classify each sentence as Identification or Description.",
        left: [
          "The OmniTouch 500 is a POS terminal.",
          "It has a dual-screen display.",
          "The Urban Rider Jacket is a biker jacket.",
        ],
        right: [
          "Description — product feature",
          "Identification — POS",
          "Identification — jacket",
        ],
        pairs: {
          "The OmniTouch 500 is a POS terminal.":    "Identification — POS",
          "It has a dual-screen display.":            "Description — product feature",
          "The Urban Rider Jacket is a biker jacket.":"Identification — jacket",
        },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // MODULE 3 — PROCEDURE TEXT
  // Reading: Customer Checkout SOP
  // Vocabulary Preview : Scan, Receipt, Checkout, Verify, Cash drawer
  // Interactive Glossary: Greet, Scan, Verify, Payment method,
  //   Enter, Change, Receipt, Hand over
  // NOTE: Cash drawer is Preview ONLY — not a reading glossary target
  // ══════════════════════════════════════════════════════════════════
  3: {
    id: 3,
    title: "Procedure Text",
    subtitle: "Store Standard Operating Procedures",
    accent: "#0f766e",
    tint: "#f0fdfa",
    overview:
      "Learn how a clear store procedure guides a customer checkout accurately, efficiently, and politely.",
    objectives: [
      "Identify the purpose of a procedure text.",
      "Recognize Goal, Materials, and Steps.",
      "Understand the checkout sequence.",
      "Use imperative verbs and sequence adverbs.",
    ],
    theory: {
      definition:
        "A procedure text gives step-by-step instructions to achieve a specific goal. In retail, it covers store SOPs, cash handling, merchandise display rules, and return processing.",
      structure: [
        "Goal / Aim — states what is to be achieved.",
        "Materials / Equipment — lists the tools needed.",
        "Steps / Methods — gives sequential instructions.",
      ],
      features: [
        "Imperative Sentences — greet, scan, press, verify, print.",
        "Sequence Adverbs — First, Next, Then, After that, Finally.",
        "Clear & Precise Directives — scan the barcode carefully.",
      ],
    },

    // ── Vocabulary Preview (5 words) ─────────────────────────────────
    vocabularyPreview: [
      w("Scan",        "verb",        "Memindai barcode produk."),
      w("Receipt",     "noun",        "Struk belanja atau bukti pembayaran."),
      w("Checkout",    "noun",        "Area atau proses pembayaran kasir."),
      w("Verify",      "verb",        "Memeriksa atau memastikan kebenaran data."),
      w("Cash drawer", "noun phrase", "Laci uang kasir."),
    ],

    readings: [
      {
        title: "HOW TO PROCESS CUSTOMER CHECKOUT USING A POS TERMINAL",
        subtitle: "Store Standard Operating Procedure",
        visual: "checkout",
        sections: [
          {
            heading: "GOAL / AIM",
            body: "To complete a retail sales transaction efficiently and accurately using a Point of Sale (POS) terminal.",
            highlights: [],
          },
          {
            heading: "MATERIALS / EQUIPMENT",
            body: "1. POS Terminal & Cash Drawer\n2. Barcode Scanner\n3. Thermal Receipt Paper\n4. Customer's Merchandise",
            highlights: ["receipt"],
          },
          {
            heading: "STEPS / PROCEDURES",
            body: "1. FIRST, GREET the customer warmly and ask if they found everything they needed.\n\n2. NEXT, SCAN each item's barcode using the hand-held scanner. Ensure the scanner beeps to confirm the item is registered on the system screen.\n\n3. THEN, VERIFY the quantity and price of the merchandise displayed on the dual-screen monitor.\n\n4. AFTER THAT, ASK the customer for their preferred PAYMENT METHOD: cash, credit card, or QRIS digital payment.\n\n5. IF paying cash, INSERT the money into the cash drawer and ENTER the amount into the terminal to calculate change automatically.\n\n6. FINALLY, PRINT the receipt, attach it to the shopping bag, and HAND over the items with a warm closing phrase: \"Thank you for shopping with us!\"",
            highlights: ["greet", "scan", "verify", "payment method", "enter", "change", "receipt", "hand over"],
          },
        ],
        // Cash drawer is Preview — NOT included in interactive glossary
        glossary: [
          w("Greet",          "imperative verb", "Menyapa; mengucapkan salam kepada pelanggan."),
          w("Scan",           "verb",            "Memindai; membaca kode barcode produk."),
          w("Verify",         "verb",            "Memeriksa; memastikan kebenaran data."),
          w("Payment method", "noun phrase",     "Metode pembayaran yang dipilih pelanggan."),
          w("Enter",          "imperative verb", "Memasukkan; menginput jumlah uang ke sistem."),
          w("Change",         "noun",            "Kembalian; uang sisa yang dikembalikan ke pelanggan."),
          w("Receipt",        "noun",            "Struk belanja; bukti pembayaran resmi."),
          w("Hand over",      "verb phrase",     "Menyerahkan; memberikan barang kepada pelanggan."),
        ],
      },
    ],

    pretest: bank("Procedure Text", [
      "Give step-by-step instructions",
      "Tell a story",
      "Describe a jacket",
      "Compare scores",
    ]),

    posttest: bank("Customer Checkout", [
      "Clear and ordered steps",
      "A random story",
      "A product description",
      "A user profile",
    ]),

    practices: [
      {
        type: "sequence",
        title: "Checkout Sequencing",
        instruction: "Arrange the checkout steps in the correct order.",
        items: [
          "Print the receipt and hand over items",
          "Verify price and quantity",
          "Scan each barcode",
          "Greet the customer",
          "Ask the payment method",
          "Process the payment",
        ],
        answer: [
          "Greet the customer",
          "Scan each barcode",
          "Verify price and quantity",
          "Ask the payment method",
          "Process the payment",
          "Print the receipt and hand over items",
        ],
      },
      {
        type: "match",
        title: "Equipment Match",
        instruction: "Match each retail tool with its use.",
        left: ["Barcode scanner", "Receipt printer", "Cash drawer"],
        right: ["Store cash", "Read barcode", "Print receipt"],
        pairs: {
          "Barcode scanner": "Read barcode",
          "Receipt printer": "Print receipt",
          "Cash drawer":     "Store cash",
        },
      },
      {
        type: "tapMatch",
        title: "Sequence Connector Match",
        instruction: "Match each connector with its Indonesian meaning.",
        left: ["First", "Next", "Then", "After that", "Finally"],
        right: ["Kemudian", "Setelah itu", "Terakhir", "Berikutnya", "Pertama"],
        pairs: {
          "First":      "Pertama",
          "Next":       "Berikutnya",
          "Then":       "Kemudian",
          "After that": "Setelah itu",
          "Finally":    "Terakhir",
        },
      },
    ],
  },
};
