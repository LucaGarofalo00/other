# Piano Marketing & Sviluppo — GymTracker PWA

> Generato: 14 maggio 2026
> Stato attuale: v1.8.4, prodotto funzionante, non pubblicato
> Obiettivo 6 mesi: Validazione prodotto-mercato
> Budget: Bootstrap (minimo possibile)
> Mercato: Italia first, poi espansione

---

## Riepilogo Strategico

| Fase | Periodo | Focus |
|------|---------|-------|
| **Fase 0** | Settimane 1-3 | Pre-launch: branding, landing page, infrastruttura |
| **Fase 1** | Settimane 4-6 | Soft launch: beta chiusa, primi utenti reali |
| **Fase 2** | Settimane 7-12 | Launch pubblico: directory, community, contenuti |
| **Fase 3** | Mesi 4-6 | Crescita organica e validazione |
| **Fase 4** | Mesi 7-12 | Monetizzazione e transizione native |

---

## FASE 0 — Pre-Launch (Settimane 1-3)

### 0.1 Branding & Nome

**Problema attuale:** "GymTracker" è generico, già usato da decine di app. Non è registrabile come marchio e i domini sono tutti presi.

**Criteri per il nome:**
- Corto (max 3 sillabe), memorabile, pronunciabile in italiano e inglese
- Dominio `.app`, `.fit`, `.io` o `.com` disponibile
- Non già usato su App Store / Play Store
- Evocativo di forza/progresso/disciplina (non solo "gym")

**Opzioni da valutare (esempi di direzione):**
- Composti brevi: RepForge, SetLog, LiftNote, TrackRep
- Parole inventate: Gymnote, Repzo, Forzapp, Allenio
- Acronimi espansi: GT (già usato nel logo), GTrack

**Azioni:**
- [ ] Brainstorm 10-15 nomi candidati
- [ ] Verificare disponibilità dominio (Namecheap, Porkbun)
- [ ] Verificare che non esista su App Store e Play Store
- [ ] Scegliere nome definitivo
- [ ] Acquistare dominio (budget: 5-15€/anno)

**Tool gratuiti:** Namecheap search, Lean Domain Search, Namelix (AI naming)

---

### 0.2 Landing Page / Sito Vetrina

**Obiettivo:** Avere una pagina pubblica che spieghi il prodotto, raccolga email di interessati e funga da punto di atterraggio per tutti i canali.

**Struttura della landing page:**
1. **Hero**: Nome + tagline + screenshot mockup + CTA "Prova gratis"
2. **Problema**: "Le app di fitness sono pensate solo per la palestra. E il calisthenics?"
3. **Soluzione**: 3-4 feature principali con screenshot
4. **Social proof**: Testimonianze beta tester (anche 2-3 bastano)
5. **Come funziona**: 3 step (Registrati → Scegli scheda → Allena)
6. **FAQ**: 5-6 domande comuni
7. **CTA finale**: "Inizia ad allenarti" → link all'app

**Opzioni tecniche (budget zero):**
- **GitHub Pages + HTML statico**: Già sai farlo, stesso hosting dell'app
- **Carrd.co** (free tier): Landing page bella in 1 ora, dominio custom a 19$/anno
- **Linktree/Bento**: Come pagina ponte temporanea per i social

**Azioni:**
- [ ] Scrivere copy per la landing page (vedi skill `copywriting`)
- [ ] Creare 3-4 screenshot/mockup dell'app su telefono
- [ ] Pubblicare la landing page
- [ ] Configurare dominio custom
- [ ] Aggiungere form di raccolta email (Buttondown gratuito fino a 100 iscritti)

---

### 0.3 Sviluppo Prioritario Pre-Launch

Prima di far provare l'app a chiunque, sistema queste cose:

**Must-have:**
- [ ] **Onboarding migliorato**: Al primo accesso, guida rapida (3 schermate) che mostra cosa fare — molti utenti non capiscono da dove iniziare
- [ ] **Fix Google OAuth**: Attivare il login con Google su Supabase — riduce la frizione di registrazione del 40-60%
- [ ] **Pagina "Cosa c'è di nuovo"**: Changelog accessibile in-app per comunicare aggiornamenti
- [ ] **Feedback in-app**: Già presente, verificare che funzioni e che tu riceva notifica

**Nice-to-have (ma impattanti):**
- [ ] **Condivisione sessione**: Bottone "Condividi allenamento" che genera un'immagine/link — è il motore virale #1 per le app fitness
- [ ] **Template pre-compilati migliorati**: Aggiungere 2-3 schede popolari (PPL 6 giorni, Upper/Lower, Full Body 3x)

**Da NON fare ora:**
- ❌ Light mode (tempo sprecato, il dark mode è lo standard fitness)
- ❌ Apple Watch (troppo presto, serve prima validazione)
- ❌ AI Coach (feature creep, zero valore per la validazione)
- ❌ Pagamenti/Premium (prima valida, poi monetizza)

---

### 0.4 Analytics & Tracking

**Obiettivo:** Sapere cosa fanno gli utenti per validare il prodotto.

**Setup gratuito:**
- [ ] **Plausible Cloud** (gratuito fino a 10K pageviews) o **Umami** (self-hosted gratuito) — GDPR compliant, no cookie banner
- [ ] **Eventi chiave da tracciare:**
  - Registrazione completata
  - Prima sessione salvata (= attivazione)
  - Sessioni per settimana (= retention)
  - Scheda creata/duplicata
  - Schermata Stats visitata
  - Tempo medio in sessione
  - Feedback inviato

**Metriche di validazione (target 6 mesi):**
| Metrica | Target "validato" | Target "promettente" |
|---------|-------------------|---------------------|
| Utenti registrati | 200+ | 50+ |
| Activation rate (1+ sessione) | >40% | >25% |
| Retention W1 (tornano dopo 7gg) | >30% | >15% |
| Retention M1 (tornano dopo 30gg) | >20% | >10% |
| NPS (da feedback) | >40 | >20 |

---

### 0.5 Infrastruttura Social

**Creare account (non serve postare subito, ma riserva il nome):**
- [ ] **Instagram** — canale #1 per fitness in Italia
- [ ] **TikTok** — virale, perfetto per demo veloci dell'app
- [ ] **Twitter/X** — per community tech/indie hacker
- [ ] **Reddit** — r/bodyweightfitness, r/fitness, r/italygames (o simili IT)

**Bio unificata:**
> [Nome App] — Traccia pesi e calisthenics in un'unica app.
> Offline-first. Gratis. Niente social, solo allenamento.
> [link landing page]

---

## FASE 1 — Soft Launch / Beta (Settimane 4-6)

### 1.1 Reclutamento Beta Tester

**Target: 20-30 utenti reali che si allenano regolarmente.**

**Dove trovarli (gratis):**

1. **Cerchia personale**: Amici/conoscenti che si allenano — i primi 5-10 utenti vengono sempre da qui
2. **Gruppi Facebook italiani**:
   - "Calisthenics Italia" (15K+ membri)
   - "Powerlifting Italia"
   - "Home Gym Italia"
   - Gruppi locali della tua palestra/città
   - **Come postare**: Non spammare. Scrivi un post genuino: "Ho creato un'app per tracciare pesi e calisthenics insieme, cerco 20 persone che vogliono provarla gratis e darmi feedback"
3. **Reddit**:
   - r/bodyweightfitness (thread settimanale)
   - r/italy (se pertinente)
4. **Forum fitness italiani**:
   - Forum di Body Building Italia
   - Forum Calisthenics Italia
5. **Telegram**: Gruppi fitness/calisthenics italiani

**Processo beta:**
- [ ] Creare un Google Form di candidatura (nome, frequenza allenamento, pesi/calisthenics/entrambi, telefono usato)
- [ ] Selezionare 20-30 persone con mix di: solo pesi, solo calisthenics, entrambi
- [ ] Creare gruppo WhatsApp/Telegram per beta tester
- [ ] Dare accesso + mini guida (PDF 1 pagina o video 2 min)
- [ ] Raccogliere feedback ogni settimana (survey breve 3 domande)

### 1.2 Framework di Feedback

**Domande settimanali (Google Form, 2 minuti):**
1. Quante sessioni hai fatto questa settimana con l'app? (0-7)
2. Cosa ti ha dato più fastidio? (testo libero)
3. Cosa ti è piaciuto di più? (testo libero)
4. Consiglieresti l'app a un amico? (1-10, NPS)

**Domande di uscita (dopo 3 settimane):**
1. Se l'app sparisse domani, quanto ti peserebbe? (Per niente / Un po' / Molto)
2. Quale singola cosa la renderebbe irrinunciabile per te?
3. Quanto pagheresti al mese? (0€ / 2€ / 5€ / 10€)

**La domanda "se sparisse domani"** è il test di validazione più potente. Se >40% dice "Molto", hai product-market fit.

---

### 1.3 Iterazione Rapida

**Ciclo settimanale durante la beta:**
1. Lunedì: Leggi feedback della settimana precedente
2. Martedì-Giovedì: Implementa i 2-3 fix/miglioramenti più richiesti
3. Venerdì: Rilascia update + comunica nel gruppo cosa hai cambiato
4. Weekend: Gli utenti testano la nuova versione

**Regola d'oro:** Se 3+ persone segnalano lo stesso problema, è priorità assoluta.

---

## FASE 2 — Launch Pubblico (Settimane 7-12)

### 2.1 Directory Submissions

**Obiettivo:** Backlink, visibilità iniziale, SEO foundation.

**Directory gratuite da cui partire (in ordine di priorità):**

| Directory | Tipo | Effort | Note |
|-----------|------|--------|------|
| Product Hunt | Launch platform | Alto | Preparare assets, post in inglese |
| AlternativeTo | Alternative listing | Basso | Alternativa a Strong, JEFIT, Hevy |
| SaaSHub | SaaS directory | Basso | Gratuito |
| BetaList | Beta products | Medio | Ottimo per early adopters |
| Launching Next | Startup directory | Basso | Gratuito |
| StartupBase | Startup directory | Basso | Gratuito |
| ToolFinder | Tool directory | Basso | Gratuito |

**Per Product Hunt (settimana 10-12):**
- [ ] Preparare tagline in inglese (max 60 char)
- [ ] 4 screenshot/GIF dell'app
- [ ] Video demo 30 secondi (opzionale ma fortemente consigliato)
- [ ] Chiedere ai beta tester di supportare il lancio (upvote)
- [ ] Lanciare di martedì o mercoledì (meno competizione)

---

### 2.2 Content Marketing (SEO a costo zero)

**Strategia: creare 1 contenuto/settimana sul blog (pagina del sito).**

**Keyword target (volume IT, bassa competizione):**

1. **"scheda allenamento calisthenics"** — alto volume, articolo guida + link all'app
2. **"come tracciare gli allenamenti"** — intent perfetto, l'app è la risposta
3. **"volume allenamento per gruppo muscolare"** — MEV/MAV/MRV è il tuo differenziatore
4. **"scheda push pull legs"** — template popolarissimo, offri la scheda pre-fatta nell'app
5. **"app allenamento offline"** — nicchia, ma intent d'acquisto altissimo
6. **"progressione calisthenics"** — guida + tracking nell'app
7. **"alternativa a Strong app"** — competitor comparison page
8. **"alternativa a Hevy"** — competitor comparison page

**Formato articoli:**
- 800-1200 parole
- 1 keyword principale + 2-3 correlate
- CTA in fondo: "Traccia i tuoi allenamenti gratis con [NomeApp]"
- Schema markup FAQ dove possibile

---

### 2.3 Social Media (organico, zero budget)

**Instagram (3 post/settimana):**

| Tipo | Frequenza | Esempio |
|------|-----------|---------|
| Screenshot/demo app | 1x/sett | GIF di come loggi una sessione |
| Tip fitness + app | 1x/sett | "Come calcolare il volume settimanale" → lo fa l'app |
| Meme/relatable | 1x/sett | "When the app says your volume is too low" |
| Story | quotidiano | Behind the scenes, poll, domande |

**TikTok (2 video/settimana):**
- Video 15-30 sec: "Questa app fa X che nessun'altra fa"
- Screen recording dell'app con voiceover
- "POV: tracci pesi e calisthenics nella stessa app"
- Trend fitness + menzione app

**Reddit (1-2 commenti/settimana):**
- Rispondi a thread su r/bodyweightfitness, r/fitness
- NON spammare l'app — aggiungi valore, menziona solo se rilevante
- Thread "What app do you use to track workouts?" → risposta genuina

---

### 2.4 Community Seeding

**Gruppi dove essere presente (non spammare, contribuisci):**

- **Telegram**: Crea un canale/gruppo ufficiale dell'app (per annunci + feedback)
- **Discord**: Valuta un server se il target è giovane (18-30)
- **Facebook Groups**: Partecipa attivamente nei gruppi fitness IT, rispondi a domande, menziona l'app solo quando pertinente

**Partnership micro-influencer:**
- Cerca 5-10 creator fitness italiani con 1K-10K follower (micro/nano influencer)
- Offri: accesso lifetime gratuito al futuro piano Premium
- Chiedi: 1 post/story genuino sulla loro esperienza
- **Budget: 0€** — il "pagamento" è l'accesso premium lifetime

---

## FASE 3 — Crescita e Validazione (Mesi 4-6)

### 3.1 Metriche da Monitorare

**Dashboard settimanale (crea un semplice Google Sheet):**

```
Settimana | Nuovi utenti | Activation | Retention W1 | Sessioni totali | NPS | Fonte
---------|-------------|------------|-------------|----------------|-----|------
S1       | ...         | ...%       | ...%        | ...            | ... | ...
```

**Segnali di product-market fit:**
- Retention M1 > 20% → gli utenti tornano, il prodotto serve
- NPS > 40 → gli utenti lo raccomanderebbero
- Crescita organica > 30% del totale → il passaparola funziona
- "Se sparisse domani" > 40% "molto" → hai PMF

**Segnali di allarme:**
- Activation < 20% → l'onboarding è rotto
- Retention W1 < 10% → il prodotto non risolve il problema
- Zero feedback spontaneo → nessuno è abbastanza coinvolto da scrivere
- Tutti usano solo pesi O solo calisthenics → il differenziatore (unificazione) non funziona

---

### 3.2 Sviluppo Guidato dai Dati

**Regola: ogni feature che sviluppi deve risolvere un problema emerso dai dati o dal feedback.**

**Priorità probabile (da validare con dati reali):**

| Priorità | Feature | Perché |
|----------|---------|--------|
| P0 | Fix bugs segnalati | Retention killer |
| P1 | Condivisione sessione (immagine social) | Motore virale gratuito |
| P1 | Notifiche reminder allenamento | Retention booster |
| P2 | Più template pre-fatti | Riduce frizione onboarding |
| P2 | Grafici progresso nel tempo | "Aha moment" per retention |
| P3 | Esportazione PDF per PT | Caso d'uso B2B2C |
| P3 | Internazionalizzazione (inglese) | Prerequisito per scale |

---

### 3.3 ASO Prep (App Store Optimization)

Anche se ora sei una PWA, prepara il terreno per gli store:

- [ ] Raccogliere screenshot in formato store (6.5" iPhone, 1080p Android)
- [ ] Scrivere descrizione app (titolo 30 char, sottotitolo 30 char, descrizione 4000 char)
- [ ] Ricercare keyword: "workout tracker", "calisthenics app", "gym log"
- [ ] Preparare icona definitiva ad alta risoluzione (1024x1024)

---

## FASE 4 — Monetizzazione & Scale (Mesi 7-12)

### 4.1 Quando Monetizzare

**NON monetizzare finché non hai:**
- Almeno 100 utenti attivi settimanali
- Retention M1 > 15%
- Almeno 10 persone che hanno detto "pagherei" nel survey
- Un'idea chiara di cosa mettere dietro paywall basata su cosa gli utenti chiedono di più

### 4.2 Modello Freemium Consigliato

**Free (generoso — deve essere un prodotto completo):**
- Sessioni illimitate
- Fino a 3 schede attive
- Storico 3 mesi
- Statistiche base (volume totale, conteggio sessioni)
- Timer con notifiche
- Backup JSON
- 4 template base

**Premium (€3.99/mese o €29.99/anno):**
- Schede illimitate
- Storico illimitato
- Statistiche avanzate (MEV/MAV/MRV, e1RM, delta periodi)
- Sync cloud multi-device
- Template premium (8-10 programmi)
- Esportazione PDF
- Priorità nel supporto

**Perché €3.99 e non €4.99:** Nel fitness B2C italiano, sotto i 4€/mese la barriera psicologica è molto più bassa. Il prezzo lo puoi sempre alzare dopo.

**Lifetime €59.99:** Opzionale ma molto popolare nel fitness. Recuperi subito cash flow e crei evangelisti.

### 4.3 Implementazione Pagamenti

**Stack consigliato (budget minimo):**

| Componente | Soluzione | Costo |
|------------|-----------|-------|
| Payment gateway | **Stripe** | 1.4% + 0.25€ per transazione |
| Subscription management | **Stripe Billing** (incluso) | 0€ |
| Webhook handler | **Supabase Edge Functions** | Incluso nel free tier |
| Paywall UI | Componente React custom | 0€ (lo fai tu) |

**Flusso:**
1. Utente clicca "Passa a Premium" in-app
2. Redirect a Stripe Checkout (hosted page, zero PCI compliance)
3. Stripe invia webhook a Supabase Edge Function
4. Edge Function aggiorna campo `premium: true` nel profilo
5. App legge il profilo e sblocca le feature

### 4.4 Transizione a App Nativa

**Quando:** Solo dopo aver validato il modello di monetizzazione sulla PWA.

**Opzioni realistiche (da solo, budget contenuto):**

| Opzione | Pro | Contro | Costo |
|---------|-----|--------|-------|
| **Capacitor/Ionic** | Riusa il 90% del codice React, pubblica su entrambi gli store | Performance non nativa, UX compromessi | ~25€/anno (Apple Dev) + 25€ una tantum (Google Play) |
| **React Native** | Performance migliore, community enorme | Riscrittura significativa del frontend | Stesso |
| **Flutter** | Performance eccellente, un codebase per tutto | Riscrittura totale, nuovo linguaggio (Dart) | Stesso |
| **PWA su store** (TWA/PWABuilder) | Zero riscrittura, pubblica la PWA come app | Funzionalità limitate su iOS, percezione "non è una vera app" | Stesso |

**Raccomandazione:** Parti con **Capacitor** — wrappa la tua PWA React esistente in un container nativo. È la via più veloce e riutilizza quasi tutto il codice. Migra a React Native solo se Capacitor mostra limiti evidenti.

**Timeline realistica:**
- Mese 7-8: Setup Capacitor + test su device fisici
- Mese 9: Beta su TestFlight (iOS) e Internal Testing (Android)
- Mese 10: Submission agli store
- Mese 11: Pubblicazione + integrazione RevenueCat per in-app purchases

---

## FASE 5 — SEO & Crescita Organica a Lungo Termine

### 5.1 Strategia SEO

**Pagine programmatiche (pSEO):**
Crea pagine template per catturare traffico long-tail:

- `/scheda/push-pull-legs` → Scheda PPL + CTA "Importa nell'app"
- `/scheda/full-body-3x` → Scheda Full Body
- `/scheda/calisthenics-principianti` → Scheda Calisthenics
- `/esercizio/panca-piana` → Guida + come tracciarlo nell'app
- `/alternativa/strong-app` → Pagina comparativa
- `/alternativa/hevy` → Pagina comparativa

**Ogni pagina = 1 keyword + 1 CTA verso l'app.**

### 5.2 Structured Data (Schema Markup)

Aggiungi schema markup per:
- **SoftwareApplication** sulla homepage
- **FAQPage** sulle pagine blog
- **HowTo** sulle guide
- **AggregateRating** quando hai recensioni

---

## Checklist Riassuntiva per Priorità

### Settimana 1-2 (ADESSO)
- [ ] Scegliere nome definitivo
- [ ] Comprare dominio
- [ ] Attivare Google OAuth su Supabase
- [ ] Migliorare onboarding (3 schermate guida)
- [ ] Creare account Instagram + TikTok

### Settimana 3-4
- [ ] Creare e pubblicare landing page
- [ ] Setup analytics (Plausible/Umami)
- [ ] Reclutare 20 beta tester
- [ ] Creare gruppo Telegram/WhatsApp beta

### Settimana 5-8
- [ ] Raccogliere feedback settimanale
- [ ] Iterare su bug e richieste top
- [ ] Iniziare a postare su Instagram (3x/settimana)
- [ ] Scrivere primi 2 articoli blog

### Settimana 9-12
- [ ] Lanciare su Product Hunt
- [ ] Submittare a 5-10 directory
- [ ] Contattare 5 micro-influencer fitness
- [ ] Scrivere pagine comparative (vs Strong, vs Hevy)

### Mese 4-6
- [ ] Analizzare metriche di validazione
- [ ] Decidere se monetizzare o pivotare
- [ ] Aggiungere condivisione sessione (virale)
- [ ] Iniziare traduzione inglese se i numeri sono buoni

### Mese 7-12
- [ ] Implementare Stripe + paywall (se validato)
- [ ] Wrappare con Capacitor per store
- [ ] Pubblicare su App Store + Play Store
- [ ] Integrare RevenueCat per in-app purchases

---

## Budget Stimato (12 mesi)

| Voce | Costo |
|------|-------|
| Dominio (.app o .io) | 10-15€/anno |
| Apple Developer Account | 99$/anno (~92€) |
| Google Play Developer | 25$ una tantum (~23€) |
| Supabase (free tier) | 0€ |
| Analytics (Plausible/Umami) | 0€ |
| Email list (Buttondown free) | 0€ |
| Stripe (solo % su transazioni) | ~1.5% |
| Hosting (GitHub Pages) | 0€ |
| **Totale fisso anno 1** | **~130€** |

Tutto il resto è tempo e impegno, non denaro.

---

## Rischi e Mitigazioni

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Nessuno usa l'app dopo la beta | Media | Alto | Interviste 1:1 con chi abbandona, pivot se necessario |
| Competitor grande aggiunge calisthenics | Bassa | Medio | Differenziarsi su semplicità e offline-first |
| Single-file HTML diventa ingestibile | Alta | Medio | Refactoring in componenti con build step (Vite) prima della v2 |
| Rejection dagli store | Media | Medio | Seguire HIG Apple alla lettera, testare con TestFlight prima |
| Burnout (sei solo) | Alta | Alto | Limita a 10h/settimana, non tutto subito, segui le fasi |

---

*Questo piano è un documento vivo. Aggiornalo ogni mese con i risultati reali e adatta le priorità in base ai dati.*
