const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  TabStopType, TabStopPosition
} = require("docx");

// --- DESIGN TOKENS ---
const LIME = "C8FF00";
const DARK = "0C0C0D";
const DARK_SURFACE = "1A1A1D";
const DARK_CARD = "222225";
const GRAY_TEXT = "B0B0B0";
const WHITE = "FFFFFF";
const ACCENT_BLUE = "4DA6FF";
const ACCENT_RED = "FF6B6B";
const ACCENT_GREEN = "4ADE80";
const ACCENT_AMBER = "FBBF24";

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "333336" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

const PAGE_W = 11906;
const MARGIN = 1134; // ~2cm
const CONTENT_W = PAGE_W - MARGIN * 2; // 9638

// --- HELPER FUNCTIONS ---
function spacer(pts = 200) {
  return new Paragraph({ spacing: { before: pts, after: 0 }, children: [] });
}

function sectionTitle(text, color = LIME) {
  return new Paragraph({
    spacing: { before: 400, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: color, space: 4 } },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, size: 30, font: "Arial", color: color }),
    ],
  });
}

function subTitle(text) {
  return new Paragraph({
    spacing: { before: 280, after: 80 },
    children: [
      new TextRun({ text, bold: true, size: 24, font: "Arial", color: WHITE }),
    ],
  });
}

function subSubTitle(text) {
  return new Paragraph({
    spacing: { before: 200, after: 60 },
    children: [
      new TextRun({ text, bold: true, size: 22, font: "Arial", color: ACCENT_BLUE }),
    ],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 60, after: opts.spaceAfter || 60 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [
      new TextRun({
        text,
        size: 20,
        font: "Arial",
        color: opts.color || GRAY_TEXT,
        bold: opts.bold || false,
        italics: opts.italics || false,
      }),
    ],
  });
}

function richParagraph(runs, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.spaceBefore || 60, after: opts.spaceAfter || 60 },
    alignment: opts.align || AlignmentType.LEFT,
    children: runs.map(r => new TextRun({
      text: r.text,
      size: r.size || 20,
      font: r.font || "Arial",
      color: r.color || GRAY_TEXT,
      bold: r.bold || false,
      italics: r.italics || false,
    })),
  });
}

function bulletItem(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text, size: 20, font: "Arial", color: GRAY_TEXT }),
    ],
  });
}

function checkItem(text) {
  return new Paragraph({
    numbering: { reference: "checks", level: 0 },
    spacing: { before: 30, after: 30 },
    children: [
      new TextRun({ text, size: 19, font: "Arial", color: GRAY_TEXT }),
    ],
  });
}

function makeHeaderRow(cells, colWidths) {
  return new TableRow({
    tableHeader: true,
    children: cells.map((text, i) =>
      new TableCell({
        borders: thinBorders,
        width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: DARK_SURFACE, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 100, right: 100 },
        children: [
          new Paragraph({
            children: [new TextRun({ text, bold: true, size: 18, font: "Arial", color: LIME })],
          }),
        ],
      })
    ),
  });
}

function makeRow(cells, colWidths, opts = {}) {
  return new TableRow({
    children: cells.map((text, i) =>
      new TableCell({
        borders: thinBorders,
        width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: opts.fill || DARK_CARD, type: ShadingType.CLEAR },
        margins: { top: 50, bottom: 50, left: 100, right: 100 },
        children: [
          new Paragraph({
            children: [new TextRun({
              text,
              size: 18,
              font: "Arial",
              color: opts.textColor || GRAY_TEXT,
              bold: opts.bold || false,
            })],
          }),
        ],
      })
    ),
  });
}

function makeTable(headers, rows, colWidths) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      makeHeaderRow(headers, colWidths),
      ...rows.map(r => makeRow(r, colWidths)),
    ],
  });
}

function highlightBox(text, bgColor = "1E2A1E", textColor = ACCENT_GREEN) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: textColor },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: textColor },
              left: { style: BorderStyle.SINGLE, size: 6, color: textColor },
              right: { style: BorderStyle.SINGLE, size: 1, color: textColor },
            },
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 160, right: 160 },
            width: { size: CONTENT_W, type: WidthType.DXA },
            children: [
              new Paragraph({
                children: [new TextRun({ text, size: 19, font: "Arial", color: textColor })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function warningBox(text) {
  return highlightBox(text, "2A2218", ACCENT_AMBER);
}

function dangerBox(text) {
  return highlightBox(text, "2A1818", ACCENT_RED);
}

function phaseHeader(number, title, period, color) {
  return [
    new Paragraph({ children: [new PageBreak()] }),
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [CONTENT_W],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: noBorders,
              width: { size: CONTENT_W, type: WidthType.DXA },
              shading: { fill: color, type: ShadingType.CLEAR },
              margins: { top: 200, bottom: 200, left: 300, right: 300 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: `FASE ${number}`, bold: true, size: 22, font: "Arial", color: DARK }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 60 },
                  children: [
                    new TextRun({ text: title, bold: true, size: 36, font: "Arial", color: DARK }),
                  ],
                }),
                new Paragraph({
                  spacing: { before: 40 },
                  children: [
                    new TextRun({ text: period, size: 20, font: "Arial", color: DARK_SURFACE }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    spacer(200),
  ];
}

// --- BUILD DOCUMENT ---
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
      {
        reference: "checks",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ],
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20, color: GRAY_TEXT } },
    },
  },
  sections: [
    // ==================== COVER PAGE ====================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      },
      children: [
        new Table({
          width: { size: 11906, type: WidthType.DXA },
          columnWidths: [11906],
          rows: [
            new TableRow({
              height: { value: 16838, rule: "exact" },
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 11906, type: WidthType.DXA },
                  shading: { fill: DARK, type: ShadingType.CLEAR },
                  margins: { top: 3000, bottom: 1000, left: 1400, right: 1400 },
                  verticalAlign: "center",
                  children: [
                    spacer(1000),
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      children: [
                        new TextRun({ text: "PIANO", bold: true, size: 80, font: "Arial", color: WHITE }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { before: 0 },
                      alignment: AlignmentType.LEFT,
                      children: [
                        new TextRun({ text: "MARKETING", bold: true, size: 80, font: "Arial", color: LIME }),
                      ],
                    }),
                    new Paragraph({
                      spacing: { before: 0 },
                      alignment: AlignmentType.LEFT,
                      children: [
                        new TextRun({ text: "& SVILUPPO", bold: true, size: 80, font: "Arial", color: LIME }),
                      ],
                    }),
                    spacer(400),
                    new Paragraph({
                      border: { top: { style: BorderStyle.SINGLE, size: 3, color: LIME, space: 8 } },
                      spacing: { before: 200 },
                      children: [
                        new TextRun({ text: "GymTracker PWA", size: 28, font: "Arial", color: GRAY_TEXT }),
                        new TextRun({ text: "  |  v1.8.4", size: 28, font: "Arial", color: "666666" }),
                      ],
                    }),
                    spacer(100),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Traccia pesi e calisthenics in un'unica app.", size: 22, font: "Arial", color: GRAY_TEXT, italics: true }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Offline-first. Gratis. Niente social, solo allenamento.", size: 22, font: "Arial", color: GRAY_TEXT, italics: true }),
                      ],
                    }),
                    spacer(1800),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Documento generato: 14 maggio 2026", size: 18, font: "Arial", color: "555555" }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Target: B2C  |  Mercato: Italia first  |  Budget: Bootstrap", size: 18, font: "Arial", color: "555555" }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Obiettivo 6 mesi: Validazione prodotto-mercato", size: 18, font: "Arial", color: "555555" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    },

    // ==================== MAIN CONTENT ====================
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "333336", space: 4 } },
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: "GYMTRACKER", bold: true, size: 16, font: "Arial", color: LIME }),
                new TextRun({ text: "\tPiano Marketing & Sviluppo", size: 16, font: "Arial", color: "555555" }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: "333336", space: 4 } },
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: "Confidenziale", size: 14, font: "Arial", color: "444444" }),
                new TextRun({ text: "\tPagina ", size: 14, font: "Arial", color: "444444" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 14, font: "Arial", color: LIME }),
              ],
            }),
          ],
        }),
      },
      children: [
        // ==================== INDICE ====================
        sectionTitle("Indice del Piano"),
        spacer(100),
        richParagraph([
          { text: "Fase 0", bold: true, color: LIME },
          { text: "  Pre-Launch ..................................... Settimane 1-3", color: GRAY_TEXT },
        ]),
        richParagraph([
          { text: "Fase 1", bold: true, color: ACCENT_BLUE },
          { text: "  Soft Launch / Beta .......................... Settimane 4-6", color: GRAY_TEXT },
        ]),
        richParagraph([
          { text: "Fase 2", bold: true, color: ACCENT_GREEN },
          { text: "  Launch Pubblico .............................. Settimane 7-12", color: GRAY_TEXT },
        ]),
        richParagraph([
          { text: "Fase 3", bold: true, color: ACCENT_AMBER },
          { text: "  Crescita e Validazione ..................... Mesi 4-6", color: GRAY_TEXT },
        ]),
        richParagraph([
          { text: "Fase 4", bold: true, color: ACCENT_RED },
          { text: "  Monetizzazione & Scale ................... Mesi 7-12", color: GRAY_TEXT },
        ]),
        spacer(200),

        // ==================== ANALISI PRODOTTO ====================
        sectionTitle("Analisi del Prodotto Attuale"),
        spacer(100),
        bodyText("GymTracker e' una Progressive Web App (PWA) per il tracciamento di allenamenti che combina pesi e calisthenics in un'unica piattaforma. L'app e' costruita con React 18 + Supabase ed e' contenuta in un singolo file HTML da 239KB, deployabile su hosting statico senza build step."),
        spacer(100),

        subSubTitle("Punti di Forza"),
        bulletItem("Unica app che unifica pesi e calisthenics nello stesso workflow"),
        bulletItem("Funzionamento offline completo con sync cloud automatico"),
        bulletItem("Statistiche avanzate: MEV/MAV/MRV per gruppo muscolare, e1RM, delta periodi"),
        bulletItem("Design dark mode OLED-friendly, ottimizzato per il fitness"),
        bulletItem("Privacy-first: Supabase EU, nessun tracker, GDPR compliant"),
        bulletItem("Timer di recupero con notifiche che sopravvivono allo screen lock"),
        bulletItem("Zero dipendenza da app store: installabile da browser"),

        spacer(80),
        subSubTitle("Punti di Debolezza"),
        bulletItem("Nome generico (GymTracker) non registrabile e gia' usato"),
        bulletItem("Single-file monolith (239KB HTML) difficile da mantenere nel tempo"),
        bulletItem("Google OAuth non ancora attivo (frizione registrazione)"),
        bulletItem("Nessuna funzione di condivisione social (viralita' = 0)"),
        bulletItem("Assenza di landing page e presenza online"),

        spacer(80),
        subSubTitle("Stack Tecnologico"),
        makeTable(
          ["Componente", "Tecnologia", "Note"],
          [
            ["Frontend", "React 18 (CDN/UMD)", "Nessun build step, vanilla"],
            ["Backend / DB", "Supabase (PostgreSQL)", "Auth + RLS + Realtime"],
            ["Offline", "Service Worker + localStorage", "Sync last-write-wins"],
            ["Hosting", "GitHub Pages", "HTTPS automatico, gratuito"],
            ["Design", "CSS custom (dark theme)", "Lime #C8FF00 su nero"],
            ["PWA", "manifest + SW", "Installabile iOS/Android"],
          ],
          [2400, 3200, 4038]
        ),

        // ==================== FASE 0 ====================
        ...phaseHeader("0", "PRE-LAUNCH", "Settimane 1-3", LIME),

        subTitle("0.1 Branding & Nome"),
        bodyText("Il nome 'GymTracker' e' provvisorio, generico e gia' utilizzato da decine di app. E' necessario un nome definitivo prima di qualsiasi attivita' di marketing."),
        spacer(60),
        subSubTitle("Criteri per il nome"),
        bulletItem("Corto (max 3 sillabe), memorabile, pronunciabile in italiano e inglese"),
        bulletItem("Dominio .app, .fit, .io o .com disponibile"),
        bulletItem("Non gia' presente su App Store / Play Store"),
        bulletItem("Evocativo di forza, progresso o disciplina"),
        spacer(60),
        subSubTitle("Direzioni creative"),
        makeTable(
          ["Tipo", "Esempi", "Pro"],
          [
            ["Composti brevi", "RepForge, SetLog, LiftNote", "Chiari, professionali"],
            ["Parole inventate", "Repzo, Forzapp, Allenio", "Unici, registrabili"],
            ["Acronimi", "GT (gia' nel logo)", "Minimalista, tech"],
          ],
          [2400, 3600, 3638]
        ),
        spacer(80),
        subSubTitle("Checklist Branding"),
        checkItem("Brainstorm 10-15 nomi candidati"),
        checkItem("Verificare disponibilita' dominio (Namecheap, Porkbun)"),
        checkItem("Verificare assenza su App Store e Play Store"),
        checkItem("Scegliere nome definitivo"),
        checkItem("Acquistare dominio (budget: 5-15 EUR/anno)"),
        spacer(60),
        highlightBox("Tool gratuiti: Namecheap Search, Lean Domain Search, Namelix (AI naming)"),

        // --- 0.2 Landing Page ---
        spacer(200),
        subTitle("0.2 Landing Page / Sito Vetrina"),
        bodyText("Serve una pagina pubblica che spieghi il prodotto, raccolga email e funga da punto di atterraggio per tutti i canali marketing."),
        spacer(80),
        subSubTitle("Struttura consigliata"),
        makeTable(
          ["Sezione", "Contenuto", "Obiettivo"],
          [
            ["Hero", "Nome + tagline + screenshot + CTA", "Catturare attenzione in 3 secondi"],
            ["Problema", "Le app fitness non supportano il calisthenics", "Creare identificazione"],
            ["Soluzione", "3-4 feature principali con screenshot", "Mostrare il valore"],
            ["Social proof", "Testimonianze beta tester (anche 2-3)", "Costruire fiducia"],
            ["Come funziona", "3 step: Registrati - Scegli - Allena", "Ridurre la complessita' percepita"],
            ["FAQ", "5-6 domande comuni", "Eliminare obiezioni"],
            ["CTA finale", "Inizia ad allenarti (link app)", "Convertire"],
          ],
          [2200, 4000, 3438]
        ),
        spacer(80),
        subSubTitle("Opzioni tecniche (budget zero)"),
        bulletItem("GitHub Pages + HTML statico: stesso hosting dell'app, massimo controllo"),
        bulletItem("Carrd.co (free tier): landing page in 1 ora, dominio custom a 19$/anno"),
        bulletItem("Linktree/Bento: pagina ponte temporanea per i social"),
        spacer(80),
        checkItem("Scrivere copy per la landing page"),
        checkItem("Creare 3-4 screenshot/mockup dell'app su telefono"),
        checkItem("Pubblicare la landing page"),
        checkItem("Configurare dominio custom"),
        checkItem("Aggiungere form raccolta email (Buttondown, gratuito fino a 100 iscritti)"),

        // --- 0.3 Sviluppo Prioritario ---
        spacer(200),
        subTitle("0.3 Sviluppo Prioritario Pre-Launch"),
        bodyText("Prima di far provare l'app a chiunque, questi interventi sono necessari:"),
        spacer(80),
        subSubTitle("Must-Have"),
        checkItem("Onboarding migliorato: guida rapida 3 schermate al primo accesso"),
        checkItem("Attivare Google OAuth su Supabase (riduce frizione registrazione del 40-60%)"),
        checkItem("Pagina 'Cosa c'e' di nuovo' in-app (changelog)"),
        checkItem("Verificare che il sistema feedback in-app funzioni e invii notifiche"),
        spacer(80),
        subSubTitle("Nice-to-Have (alto impatto)"),
        checkItem("Condivisione sessione: bottone che genera immagine social (motore virale #1)"),
        checkItem("Aggiungere 2-3 template popolari (PPL 6gg, Upper/Lower, Full Body 3x)"),
        spacer(80),
        dangerBox("DA NON FARE ORA: Light mode, Apple Watch, AI Coach, sistema pagamenti. Sono tutte distrazioni dalla validazione."),

        // --- 0.4 Analytics ---
        spacer(200),
        subTitle("0.4 Analytics & Tracking"),
        bodyText("Senza dati non puoi validare nulla. Setup gratuito e GDPR compliant."),
        spacer(80),
        subSubTitle("Setup consigliato"),
        bulletItem("Plausible Cloud (gratuito fino a 10K pageviews) oppure Umami (self-hosted)"),
        bulletItem("Entrambi sono GDPR compliant e non richiedono cookie banner"),
        spacer(80),
        subSubTitle("Eventi chiave da tracciare"),
        makeTable(
          ["Evento", "Cosa misura", "Perche' conta"],
          [
            ["Registrazione completata", "Conversione visitatore-utente", "Top of funnel"],
            ["Prima sessione salvata", "Attivazione", "L'utente ha usato l'app davvero"],
            ["Sessioni per settimana", "Engagement/Retention", "L'utente torna"],
            ["Scheda creata/duplicata", "Personalizzazione", "L'utente investe tempo"],
            ["Stats visitata", "Interesse analytics", "Feature differenziante"],
            ["Feedback inviato", "Coinvolgimento", "Utente motivato a migliorare l'app"],
          ],
          [3000, 3200, 3438]
        ),
        spacer(100),
        subSubTitle("Target di validazione (6 mesi)"),
        makeTable(
          ["Metrica", "Target 'Validato'", "Target 'Promettente'"],
          [
            ["Utenti registrati", "200+", "50+"],
            ["Activation rate (1+ sessione)", "> 40%", "> 25%"],
            ["Retention W1 (torna dopo 7gg)", "> 30%", "> 15%"],
            ["Retention M1 (torna dopo 30gg)", "> 20%", "> 10%"],
            ["NPS (da feedback)", "> 40", "> 20"],
          ],
          [3800, 2919, 2919]
        ),

        // --- 0.5 Social ---
        spacer(200),
        subTitle("0.5 Infrastruttura Social"),
        bodyText("Creare gli account subito per riservare il nome. Non serve postare ancora."),
        spacer(80),
        makeTable(
          ["Piattaforma", "Priorita'", "Motivo"],
          [
            ["Instagram", "ALTA", "Canale #1 per fitness in Italia"],
            ["TikTok", "ALTA", "Virale, perfetto per demo veloci dell'app"],
            ["Twitter/X", "MEDIA", "Community tech e indie hackers"],
            ["Reddit", "MEDIA", "r/bodyweightfitness, r/fitness"],
          ],
          [2600, 2000, 5038]
        ),
        spacer(80),
        highlightBox("Bio unificata: '[Nome App] - Traccia pesi e calisthenics in un'unica app. Offline-first. Gratis. Niente social, solo allenamento.'"),

        // ==================== FASE 1 ====================
        ...phaseHeader("1", "SOFT LAUNCH / BETA", "Settimane 4-6", ACCENT_BLUE),

        subTitle("1.1 Reclutamento Beta Tester"),
        richParagraph([
          { text: "Target: ", bold: true, color: WHITE },
          { text: "20-30 utenti reali che si allenano regolarmente." },
        ]),
        spacer(80),
        subSubTitle("Dove trovarli (gratis)"),
        makeTable(
          ["Canale", "Come", "Utenti attesi"],
          [
            ["Cerchia personale", "Amici/conoscenti che si allenano", "5-10"],
            ["Gruppi Facebook IT", "Calisthenics Italia, Powerlifting IT, Home Gym IT", "8-12"],
            ["Reddit", "r/bodyweightfitness, r/italy (thread settimanali)", "3-5"],
            ["Forum fitness IT", "Body Building Italia, Calisthenics IT", "2-5"],
            ["Telegram", "Gruppi fitness/calisthenics italiani", "2-5"],
          ],
          [2600, 4438, 2600]
        ),
        spacer(80),
        warningBox("NON spammare. Scrivi un post genuino: 'Ho creato un'app per tracciare pesi e calisthenics insieme, cerco 20 persone che vogliano provarla gratis e darmi feedback.'"),
        spacer(80),
        subSubTitle("Processo Beta"),
        checkItem("Creare Google Form di candidatura (nome, frequenza, tipo allenamento, telefono)"),
        checkItem("Selezionare 20-30 persone con mix: solo pesi, solo calisthenics, entrambi"),
        checkItem("Creare gruppo WhatsApp/Telegram per beta tester"),
        checkItem("Dare accesso + mini guida (PDF 1 pagina o video 2 min)"),
        checkItem("Raccogliere feedback ogni settimana (survey breve)"),

        // --- 1.2 Framework Feedback ---
        spacer(200),
        subTitle("1.2 Framework di Feedback"),
        subSubTitle("Domande settimanali (Google Form, 2 minuti)"),
        bulletItem("Quante sessioni hai fatto questa settimana con l'app? (0-7)"),
        bulletItem("Cosa ti ha dato piu' fastidio? (testo libero)"),
        bulletItem("Cosa ti e' piaciuto di piu'? (testo libero)"),
        bulletItem("Consiglieresti l'app a un amico? (1-10, NPS)"),
        spacer(80),
        subSubTitle("Domande di uscita (dopo 3 settimane)"),
        bulletItem("Se l'app sparisse domani, quanto ti peserebbe? (Per niente / Un po' / Molto)"),
        bulletItem("Quale singola cosa la renderebbe irrinunciabile per te?"),
        bulletItem("Quanto pagheresti al mese? (0 / 2 / 5 / 10 EUR)"),
        spacer(80),
        highlightBox("La domanda 'se sparisse domani' e' il test di validazione piu' potente. Se >40% dice 'Molto', hai product-market fit."),

        // --- 1.3 Iterazione ---
        spacer(200),
        subTitle("1.3 Ciclo di Iterazione Rapida"),
        makeTable(
          ["Giorno", "Attivita'", "Output"],
          [
            ["Lunedi'", "Leggi feedback settimana precedente", "Lista priorita'"],
            ["Martedi'-Giovedi'", "Implementa 2-3 fix/miglioramenti top", "Codice aggiornato"],
            ["Venerdi'", "Rilascia update + comunica nel gruppo", "Release note"],
            ["Weekend", "Gli utenti testano la nuova versione", "Nuovo feedback"],
          ],
          [2200, 4438, 3000]
        ),
        spacer(80),
        warningBox("Regola d'oro: se 3+ persone segnalano lo stesso problema, e' priorita' assoluta."),

        // ==================== FASE 2 ====================
        ...phaseHeader("2", "LAUNCH PUBBLICO", "Settimane 7-12", ACCENT_GREEN),

        subTitle("2.1 Directory Submissions"),
        bodyText("Backlink gratuiti, visibilita' iniziale e fondamenta SEO."),
        spacer(80),
        makeTable(
          ["Directory", "Tipo", "Effort", "Note"],
          [
            ["Product Hunt", "Launch platform", "Alto", "Assets + post in inglese, preparare community"],
            ["AlternativeTo", "Alternative listing", "Basso", "Alternativa a Strong, JEFIT, Hevy"],
            ["SaaSHub", "SaaS directory", "Basso", "Gratuito, buon backlink"],
            ["BetaList", "Beta products", "Medio", "Ottimo per early adopters"],
            ["Launching Next", "Startup directory", "Basso", "Gratuito"],
            ["StartupBase", "Startup directory", "Basso", "Gratuito"],
            ["ToolFinder", "Tool directory", "Basso", "Gratuito"],
          ],
          [2400, 2200, 1600, 3438]
        ),
        spacer(80),
        subSubTitle("Preparazione Product Hunt (settimana 10-12)"),
        checkItem("Tagline in inglese (max 60 caratteri)"),
        checkItem("4 screenshot / GIF dell'app in azione"),
        checkItem("Video demo 30 secondi (consigliato)"),
        checkItem("Chiedere ai beta tester di supportare il lancio (upvote)"),
        checkItem("Lanciare di martedi' o mercoledi' (meno competizione)"),

        // --- 2.2 Content Marketing ---
        spacer(200),
        subTitle("2.2 Content Marketing (SEO a costo zero)"),
        bodyText("Strategia: creare 1 contenuto/settimana sul blog del sito. Ogni articolo targettizza una keyword specifica e contiene un CTA verso l'app."),
        spacer(80),
        subSubTitle("Keyword target (Italia, bassa competizione)"),
        makeTable(
          ["Keyword", "Tipo contenuto", "Intent"],
          [
            ["scheda allenamento calisthenics", "Guida completa + link app", "Informazionale > Conversione"],
            ["come tracciare gli allenamenti", "Tutorial + l'app e' la risposta", "Conversione diretta"],
            ["volume allenamento gruppo muscolare", "Articolo MEV/MAV/MRV (differenziatore)", "Informazionale"],
            ["scheda push pull legs", "Template + importa nell'app", "Conversione diretta"],
            ["app allenamento offline", "Listicle/comparativa", "Transazionale"],
            ["progressione calisthenics", "Guida + tracking nell'app", "Informazionale > Conversione"],
            ["alternativa a Strong app", "Pagina comparativa VS", "Transazionale"],
            ["alternativa a Hevy", "Pagina comparativa VS", "Transazionale"],
          ],
          [3800, 3200, 2638]
        ),
        spacer(80),
        subSubTitle("Formato articoli"),
        bulletItem("800-1200 parole per articolo"),
        bulletItem("1 keyword principale + 2-3 correlate"),
        bulletItem("CTA in fondo: 'Traccia i tuoi allenamenti gratis con [NomeApp]'"),
        bulletItem("Schema markup FAQ dove possibile"),

        // --- 2.3 Social Media ---
        spacer(200),
        subTitle("2.3 Social Media (organico, zero budget)"),
        subSubTitle("Instagram (3 post/settimana)"),
        makeTable(
          ["Tipo", "Frequenza", "Esempio"],
          [
            ["Screenshot/demo app", "1x/settimana", "GIF di come loggi una sessione"],
            ["Tip fitness + app", "1x/settimana", "Come calcolare il volume settimanale"],
            ["Meme/relatable", "1x/settimana", "When the app says your volume is too low"],
            ["Story", "Quotidiano", "Behind the scenes, poll, domande"],
          ],
          [2600, 2400, 4638]
        ),
        spacer(80),
        subSubTitle("TikTok (2 video/settimana)"),
        bulletItem("Video 15-30 sec: 'Questa app fa X che nessun'altra fa'"),
        bulletItem("Screen recording dell'app con voiceover"),
        bulletItem("'POV: tracci pesi e calisthenics nella stessa app'"),
        bulletItem("Trend fitness + menzione app"),
        spacer(80),
        subSubTitle("Reddit (1-2 commenti/settimana)"),
        bulletItem("Rispondi a thread su r/bodyweightfitness, r/fitness"),
        bulletItem("NON spammare l'app. Aggiungi valore, menziona solo se rilevante"),
        bulletItem("Thread 'What app do you use to track workouts?' = risposta genuina"),

        // --- 2.4 Community & Influencer ---
        spacer(200),
        subTitle("2.4 Community Seeding & Micro-Influencer"),
        bodyText("Identifica 5-10 creator fitness italiani con 1K-10K follower (nano/micro influencer)."),
        spacer(80),
        makeTable(
          ["Cosa offri", "Cosa chiedi"],
          [
            ["Accesso lifetime al futuro piano Premium", "1 post/story genuino sulla loro esperienza"],
            ["Menzione come 'beta tester ufficiale'", "Feedback onesto e visibilita'"],
            ["Feature request prioritarie", "Tag dell'app nei post fitness"],
          ],
          [4819, 4819]
        ),
        spacer(80),
        highlightBox("Budget per influencer: 0 EUR. Il 'pagamento' e' accesso Premium lifetime + riconoscimento."),

        // ==================== FASE 3 ====================
        ...phaseHeader("3", "CRESCITA E VALIDAZIONE", "Mesi 4-6", ACCENT_AMBER),

        subTitle("3.1 Dashboard Metriche"),
        bodyText("Crea un Google Sheet con queste colonne e aggiornalo settimanalmente:"),
        spacer(80),
        makeTable(
          ["Metrica", "Come misurarla", "Frequenza"],
          [
            ["Nuovi utenti", "Registrazioni Supabase", "Settimanale"],
            ["Activation rate", "% con almeno 1 sessione", "Settimanale"],
            ["Retention W1", "% che torna dopo 7 giorni", "Settimanale"],
            ["Retention M1", "% che torna dopo 30 giorni", "Mensile"],
            ["Sessioni totali", "Conteggio sessioni globale", "Settimanale"],
            ["NPS", "Survey feedback (1-10)", "Mensile"],
            ["Fonte acquisizione", "UTM o domanda 'come ci hai trovato'", "Settimanale"],
          ],
          [2600, 4038, 3000]
        ),

        spacer(150),
        subTitle("3.2 Segnali di Product-Market Fit"),
        spacer(80),
        subSubTitle("Segnali positivi (hai PMF)"),
        bulletItem("Retention M1 > 20%: gli utenti tornano, il prodotto serve"),
        bulletItem("NPS > 40: gli utenti lo raccomanderebbero spontaneamente"),
        bulletItem("Crescita organica > 30% del totale: il passaparola funziona"),
        bulletItem("'Se sparisse domani' > 40% 'Molto': hai product-market fit confermato"),
        spacer(80),
        subSubTitle("Segnali di allarme"),
        bulletItem("Activation < 20%: l'onboarding e' rotto, gli utenti non capiscono cosa fare"),
        bulletItem("Retention W1 < 10%: il prodotto non risolve un problema reale"),
        bulletItem("Zero feedback spontaneo: nessuno e' coinvolto abbastanza"),
        bulletItem("Solo pesi O solo calisthenics: il differenziatore non funziona"),
        spacer(80),
        dangerBox("Se dopo 3 mesi di beta la retention M1 e' sotto il 10%, considera un pivot: forse il mercato vuole qualcosa di diverso."),

        // --- 3.3 Sviluppo guidato dai dati ---
        spacer(200),
        subTitle("3.3 Sviluppo Guidato dai Dati"),
        bodyText("Ogni feature che sviluppi deve risolvere un problema emerso dai dati o dal feedback. Mai aggiungere feature 'perche' sarebbe bello averle'."),
        spacer(80),
        makeTable(
          ["Priorita'", "Feature", "Perche'"],
          [
            ["P0", "Fix bug segnalati dai beta tester", "Retention killer assoluto"],
            ["P1", "Condivisione sessione (immagine social)", "Motore virale gratuito"],
            ["P1", "Notifiche reminder allenamento", "Retention booster"],
            ["P2", "Piu' template pre-fatti", "Riduce frizione onboarding"],
            ["P2", "Grafici progresso nel tempo", "'Aha moment' per retention"],
            ["P3", "Esportazione PDF per personal trainer", "Caso d'uso B2B2C"],
            ["P3", "Internazionalizzazione (inglese)", "Prerequisito per scalare"],
          ],
          [1200, 4238, 4200]
        ),

        // --- 3.4 ASO Prep ---
        spacer(200),
        subTitle("3.4 Preparazione App Store (ASO)"),
        bodyText("Anche se ora sei una PWA, prepara il materiale per gli store:"),
        spacer(80),
        checkItem("Screenshot in formato store (6.5'' iPhone, 1080p Android)"),
        checkItem("Descrizione app: titolo 30 char, sottotitolo 30 char, body 4000 char"),
        checkItem("Ricerca keyword: workout tracker, calisthenics app, gym log"),
        checkItem("Icona definitiva ad alta risoluzione (1024x1024)"),

        // ==================== FASE 4 ====================
        ...phaseHeader("4", "MONETIZZAZIONE & SCALE", "Mesi 7-12", ACCENT_RED),

        subTitle("4.1 Quando Monetizzare"),
        warningBox("NON monetizzare finche' non hai: almeno 100 utenti attivi settimanali, Retention M1 > 15%, almeno 10 persone che hanno detto 'pagherei', e un'idea chiara di cosa mettere dietro paywall."),

        spacer(150),
        subTitle("4.2 Modello Freemium Consigliato"),
        spacer(80),

        // Free vs Premium table
        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [Math.floor(CONTENT_W / 2), Math.ceil(CONTENT_W / 2)],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: { top: { style: BorderStyle.SINGLE, size: 3, color: GRAY_TEXT }, bottom: thinBorder, left: thinBorder, right: thinBorder },
                  width: { size: Math.floor(CONTENT_W / 2), type: WidthType.DXA },
                  shading: { fill: DARK_SURFACE, type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 160, right: 160 },
                  children: [
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [
                      new TextRun({ text: "FREE", bold: true, size: 26, font: "Arial", color: WHITE }),
                    ]}),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [
                      new TextRun({ text: "Per sempre", size: 18, font: "Arial", color: GRAY_TEXT }),
                    ]}),
                  ],
                }),
                new TableCell({
                  borders: { top: { style: BorderStyle.SINGLE, size: 3, color: LIME }, bottom: thinBorder, left: thinBorder, right: thinBorder },
                  width: { size: Math.ceil(CONTENT_W / 2), type: WidthType.DXA },
                  shading: { fill: "1A1E12", type: ShadingType.CLEAR },
                  margins: { top: 100, bottom: 100, left: 160, right: 160 },
                  children: [
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [
                      new TextRun({ text: "PREMIUM", bold: true, size: 26, font: "Arial", color: LIME }),
                    ]}),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [
                      new TextRun({ text: "3.99 EUR/mese  |  29.99 EUR/anno", size: 18, font: "Arial", color: LIME }),
                    ]}),
                  ],
                }),
              ],
            }),
            ...[
              ["Sessioni illimitate", "Tutto il piano Free +"],
              ["Fino a 3 schede attive", "Schede illimitate"],
              ["Storico 3 mesi", "Storico illimitato"],
              ["Statistiche base (volume, conteggio)", "Stats avanzate (MEV/MAV/MRV, e1RM, delta)"],
              ["Timer con notifiche", "Sync cloud multi-device"],
              ["Backup JSON", "Template premium (8-10 programmi)"],
              ["4 template base", "Esportazione PDF"],
            ].map(([free, premium]) =>
              new TableRow({
                children: [
                  new TableCell({
                    borders: thinBorders,
                    width: { size: Math.floor(CONTENT_W / 2), type: WidthType.DXA },
                    shading: { fill: DARK_CARD, type: ShadingType.CLEAR },
                    margins: { top: 50, bottom: 50, left: 160, right: 160 },
                    children: [new Paragraph({ children: [new TextRun({ text: free, size: 18, font: "Arial", color: GRAY_TEXT })] })],
                  }),
                  new TableCell({
                    borders: thinBorders,
                    width: { size: Math.ceil(CONTENT_W / 2), type: WidthType.DXA },
                    shading: { fill: DARK_CARD, type: ShadingType.CLEAR },
                    margins: { top: 50, bottom: 50, left: 160, right: 160 },
                    children: [new Paragraph({ children: [new TextRun({ text: premium, size: 18, font: "Arial", color: ACCENT_GREEN })] })],
                  }),
                ],
              })
            ),
          ],
        }),
        spacer(80),
        highlightBox("Perche' 3.99 EUR e non 4.99 EUR? Nel fitness B2C italiano, sotto i 4 EUR/mese la barriera psicologica e' molto piu' bassa. Potrai sempre alzare il prezzo dopo."),
        spacer(60),
        bodyText("Opzionale: Lifetime a 59.99 EUR. Molto popolare nel fitness, recuperi subito cash flow e crei evangelisti.", { italics: true }),

        // --- 4.3 Stack pagamenti ---
        spacer(200),
        subTitle("4.3 Implementazione Pagamenti"),
        makeTable(
          ["Componente", "Soluzione", "Costo"],
          [
            ["Payment gateway", "Stripe", "1.4% + 0.25 EUR per transazione"],
            ["Subscription management", "Stripe Billing (incluso)", "0 EUR"],
            ["Webhook handler", "Supabase Edge Functions", "Incluso nel free tier"],
            ["Paywall UI", "Componente React custom", "0 EUR (lo fai tu)"],
          ],
          [2600, 3800, 3238]
        ),
        spacer(80),
        subSubTitle("Flusso di pagamento"),
        bulletItem("1. Utente clicca 'Passa a Premium' in-app"),
        bulletItem("2. Redirect a Stripe Checkout (hosted page, zero PCI compliance da gestire)"),
        bulletItem("3. Stripe invia webhook a Supabase Edge Function"),
        bulletItem("4. Edge Function aggiorna campo premium: true nel profilo utente"),
        bulletItem("5. L'app legge il profilo e sblocca le feature Premium"),

        // --- 4.4 App Nativa ---
        spacer(200),
        subTitle("4.4 Transizione a App Nativa"),
        bodyText("Solo dopo aver validato la monetizzazione sulla PWA. Non prima."),
        spacer(80),
        makeTable(
          ["Opzione", "Pro", "Contro", "Costo annuo"],
          [
            ["Capacitor/Ionic", "Riusa 90% codice React", "Performance non nativa", "~120 EUR (dev accounts)"],
            ["React Native", "Performance migliore", "Riscrittura significativa", "~120 EUR"],
            ["Flutter", "Performance eccellente", "Riscrittura totale (Dart)", "~120 EUR"],
            ["PWA su store (TWA)", "Zero riscrittura", "Limitato su iOS", "~120 EUR"],
          ],
          [2000, 2400, 2600, 2638]
        ),
        spacer(80),
        highlightBox("Raccomandazione: parti con Capacitor. Wrappa la PWA React in un container nativo. E' la via piu' veloce e riutilizza quasi tutto il codice. Migra a React Native solo se Capacitor mostra limiti."),
        spacer(80),
        subSubTitle("Timeline App Nativa"),
        bulletItem("Mese 7-8: Setup Capacitor + test su device fisici"),
        bulletItem("Mese 9: Beta su TestFlight (iOS) e Internal Testing (Android)"),
        bulletItem("Mese 10: Submission agli store"),
        bulletItem("Mese 11: Pubblicazione + integrazione RevenueCat per in-app purchases"),

        // ==================== SEO LONG TERM ====================
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("Strategia SEO a Lungo Termine", ACCENT_BLUE),
        spacer(100),

        subTitle("Pagine Programmatiche (pSEO)"),
        bodyText("Crea pagine template per catturare traffico long-tail. Ogni pagina = 1 keyword + 1 CTA verso l'app."),
        spacer(80),
        makeTable(
          ["URL", "Contenuto", "Keyword target"],
          [
            ["/scheda/push-pull-legs", "Scheda PPL + CTA importa", "scheda push pull legs"],
            ["/scheda/full-body-3x", "Scheda Full Body", "scheda full body 3 giorni"],
            ["/scheda/calisthenics-principianti", "Scheda Cal", "calisthenics principianti scheda"],
            ["/esercizio/panca-piana", "Guida esercizio", "panca piana esecuzione"],
            ["/alternativa/strong-app", "Comparativa VS", "strong app alternativa"],
            ["/alternativa/hevy", "Comparativa VS", "hevy alternativa gratis"],
          ],
          [3200, 2800, 3638]
        ),

        spacer(150),
        subTitle("Structured Data (Schema Markup)"),
        bulletItem("SoftwareApplication sulla homepage (rating, prezzo, OS)"),
        bulletItem("FAQPage sulle pagine blog"),
        bulletItem("HowTo sulle guide pratiche"),
        bulletItem("AggregateRating quando hai recensioni"),

        // ==================== BUDGET ====================
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("Budget Stimato (12 Mesi)", ACCENT_GREEN),
        spacer(100),
        makeTable(
          ["Voce", "Costo", "Frequenza"],
          [
            ["Dominio (.app o .io)", "10-15 EUR", "Annuale"],
            ["Apple Developer Account", "99 USD (~92 EUR)", "Annuale"],
            ["Google Play Developer", "25 USD (~23 EUR)", "Una tantum"],
            ["Supabase", "0 EUR", "Free tier"],
            ["Analytics (Plausible/Umami)", "0 EUR", "Free tier / self-hosted"],
            ["Email list (Buttondown)", "0 EUR", "Free fino a 100 iscritti"],
            ["Stripe", "Solo % su transazioni", "~1.5% per vendita"],
            ["Hosting (GitHub Pages)", "0 EUR", "Gratuito"],
            ["Social media", "0 EUR", "Solo tempo"],
            ["Micro-influencer", "0 EUR", "Premium lifetime in cambio"],
          ],
          [3600, 2600, 3438]
        ),
        spacer(100),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [CONTENT_W],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: { top: { style: BorderStyle.SINGLE, size: 3, color: LIME }, bottom: { style: BorderStyle.SINGLE, size: 3, color: LIME }, left: noBorder, right: noBorder },
                  width: { size: CONTENT_W, type: WidthType.DXA },
                  shading: { fill: DARK_SURFACE, type: ShadingType.CLEAR },
                  margins: { top: 120, bottom: 120, left: 200, right: 200 },
                  children: [
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [
                      new TextRun({ text: "TOTALE COSTI FISSI ANNO 1:  ~130 EUR", bold: true, size: 28, font: "Arial", color: LIME }),
                    ]}),
                    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [
                      new TextRun({ text: "Tutto il resto e' tempo e impegno, non denaro.", size: 20, font: "Arial", color: GRAY_TEXT }),
                    ]}),
                  ],
                }),
              ],
            }),
          ],
        }),

        // ==================== RISCHI ====================
        spacer(300),
        sectionTitle("Rischi e Mitigazioni", ACCENT_RED),
        spacer(100),
        makeTable(
          ["Rischio", "Probabilita'", "Impatto", "Mitigazione"],
          [
            ["Nessuno usa l'app dopo beta", "Media", "Alto", "Interviste 1:1 con chi abbandona, pivot se necessario"],
            ["Competitor aggiunge calisthenics", "Bassa", "Medio", "Differenziarsi su semplicita' e offline-first"],
            ["Single-file diventa ingestibile", "Alta", "Medio", "Refactoring con Vite prima della v2"],
            ["Rejection dagli store", "Media", "Medio", "Seguire HIG Apple, testare con TestFlight"],
            ["Burnout (sei solo)", "Alta", "Alto", "Max 10h/sett, seguire le fasi, non tutto subito"],
          ],
          [2800, 1400, 1200, 4238]
        ),

        // ==================== CHECKLIST FINALE ====================
        new Paragraph({ children: [new PageBreak()] }),
        sectionTitle("Checklist Riassuntiva"),
        spacer(100),

        subSubTitle("Settimana 1-2 (ADESSO)"),
        checkItem("Scegliere nome definitivo"),
        checkItem("Comprare dominio"),
        checkItem("Attivare Google OAuth su Supabase"),
        checkItem("Migliorare onboarding (3 schermate guida)"),
        checkItem("Creare account Instagram + TikTok"),

        spacer(100),
        subSubTitle("Settimana 3-4"),
        checkItem("Creare e pubblicare landing page"),
        checkItem("Setup analytics (Plausible/Umami)"),
        checkItem("Reclutare 20 beta tester"),
        checkItem("Creare gruppo Telegram/WhatsApp beta"),

        spacer(100),
        subSubTitle("Settimana 5-8"),
        checkItem("Raccogliere feedback settimanale"),
        checkItem("Iterare su bug e richieste top"),
        checkItem("Iniziare a postare su Instagram (3x/settimana)"),
        checkItem("Scrivere primi 2 articoli blog"),

        spacer(100),
        subSubTitle("Settimana 9-12"),
        checkItem("Lanciare su Product Hunt"),
        checkItem("Submittare a 5-10 directory"),
        checkItem("Contattare 5 micro-influencer fitness"),
        checkItem("Scrivere pagine comparative (vs Strong, vs Hevy)"),

        spacer(100),
        subSubTitle("Mese 4-6"),
        checkItem("Analizzare metriche di validazione"),
        checkItem("Decidere se monetizzare o pivotare"),
        checkItem("Aggiungere condivisione sessione (virale)"),
        checkItem("Iniziare traduzione inglese se i numeri sono buoni"),

        spacer(100),
        subSubTitle("Mese 7-12"),
        checkItem("Implementare Stripe + paywall (se validato)"),
        checkItem("Wrappare con Capacitor per store"),
        checkItem("Pubblicare su App Store + Play Store"),
        checkItem("Integrare RevenueCat per in-app purchases"),

        spacer(300),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: "333336", space: 8 } },
          spacing: { before: 200 },
          children: [
            new TextRun({ text: "Questo piano e' un documento vivo. Aggiornalo ogni mese con i risultati reali.", size: 18, font: "Arial", color: "555555", italics: true }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\Utente\\Desktop\\other-database\\Piano_Marketing_Sviluppo_GymTracker.docx", buffer);
  console.log("DOCX created successfully!");
});
