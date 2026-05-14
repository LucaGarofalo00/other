# PumpLog — Brief Completo & Brand Identity

> **Versione documento:** 1.0 — 14 maggio 2026
> **Stato prodotto:** v1.8.4 — Funzionante, non ancora pubblicato
> **Autore:** Founder / Solo developer
> **Scopo:** Fornire a collaboratori, designer, copywriter e partner un quadro completo e operativo del progetto

---

## PARTE 1 — IL PROGETTO

---

### 1.1 Cos'e il prodotto

**PumpLog** e una **Progressive Web App (PWA)** per il tracking di allenamenti in sala pesi e calisthenics. Si installa direttamente dal browser su iPhone e Android senza passare dagli app store.

**Il nome:** "Pump" (pompare ferro, pump muscolare) + "Log" (registro). 7 lettere, 2 sillabe, zero ambiguita. Dice esattamente cosa fa: il registro dei tuoi allenamenti.

**In una frase:** Un'app italiana, seria, privacy-first per chi si allena con i pesi, a corpo libero, o entrambi, e vuole tracciare progressi senza social, notifiche invasive o abbonamenti obbligatori.

### 1.2 Il problema che risolve

Il mercato delle app fitness e dominato da prodotti che:

1. **Sono solo per la sala pesi** (Strong, Hevy) oppure solo per il calisthenics (Thenics, Caliverse) — chi fa entrambi e costretto a usare due app o a compromessi.
2. **Puntano sul social** (Hevy ha feed, followers, like) — chi vuole solo allenarsi trova rumore.
3. **Sono in inglese** — nessuna app di tracking seria e pensata per il mercato italiano.
4. **Non funzionano offline** — in palestra il segnale spesso non c'e.
5. **Hanno timer inaffidabili** — lo schermo si blocca, il timer muore.
6. **Non tracciano il volume scientifico** — concetti come MEV/MAV/MRV (volume minimo/massimo/di recupero per gruppo muscolare) non esistono nei competitor consumer.

### 1.3 La soluzione

Un'unica app che:
- Unisce **sala pesi + calisthenics** nello stesso workout e nella stessa scheda
- Funziona **100% offline** (offline-first, sync in background quando c'e rete)
- Ha un **timer di recupero a prova di schermo bloccato** (con notifiche push e wake lock)
- Traccia il **volume per gruppo muscolare** con barre colorate MEV/MAV/MRV (basate su Schoenfeld & Israetel)
- E **in italiano**, pensata per chi si allena in Italia
- **Zero social, zero feed, zero fronzoli** — solo allenamento e dati
- Rispetta la **privacy**: nessun tracker di terze parti, nessun analytics invasivo
- E **gratuita e completa** nella versione base, con Premium per power user

### 1.4 Target e ICP (Ideal Customer Profile)

**Target primario:**
- **Eta:** 20-35 anni
- **Genere:** Prevalentemente maschile (70-80%), ma inclusivo
- **Livello:** Intermedio (si allena da 1-3 anni, conosce la terminologia)
- **Disciplina:** Sala pesi, calisthenics, o entrambi (il differenziatore chiave)
- **Mindset:** Prende l'allenamento sul serio, non cerca motivazione o gamification — cerca uno strumento preciso
- **Lingua:** Italiano (mercato primario), inglese (espansione futura)
- **Attitudine tech:** Usa PWA / sa installare da browser, non e spaventato dal non essere su App Store

**Target secondario:**
- Personal trainer italiani che cercano un tool da far usare ai clienti
- Principianti seri che vogliono iniziare "col piede giusto" con template pre-compilati

**Anti-target (NON e per loro):**
- Chi cerca un social network fitness (vai su Hevy)
- Chi vuole un AI coach che scriva la scheda (vai su Fitbod/PRPath)
- Chi cerca nutrizione + workout combinati (vai su MyFitnessPal)
- Chi vuole solo cardio/corsa (vai su Strava/Nike Run Club)

### 1.5 Competitive landscape

| Competitor | Punti di forza | Debolezze vs noi |
|---|---|---|
| **Hevy** | Community, UI pulita, freemium generoso | Solo pesi, social invadente, no italiano, no MEV/MAV/MRV |
| **Strong** | Solido, affidabile, storico lungo | Solo pesi, UI datata, no calisthenics, no italiano |
| **Fitbod** | AI genera workout | Costoso (9.99$/mese), no calisthenics serio, black box |
| **JEFIT** | Database esercizi enorme | UX pesante, ads nel free, no calisthenics reale |
| **Thenics** | Ottimo per calisthenics | Solo calisthenics, no pesi |
| **Boostcamp** | Programmi famosi pre-caricati | No tracking personalizzato, no italiano |

**Il posizionamento unico di PumpLog (why us):**
> L'unica app che unisce sala pesi e calisthenics in un unico log, con analisi del volume scientifico (MEV/MAV/MRV), in italiano, offline-first, senza social e senza fronzoli.

### 1.6 Stack tecnico attuale

| Componente | Tecnologia | Note |
|---|---|---|
| **Frontend** | React 18 (UMD da CDN) | Tutto in un singolo `index.html` (~155 KB) |
| **Stile** | CSS-in-file con design tokens | Variables per colori, spacing, radius, type |
| **Backend/Auth** | Supabase (Postgres + Auth) | Row Level Security, server EU |
| **Sync** | Supabase realtime + localStorage fallback | Offline-first, sync in ~2s |
| **Sync legacy** | GitHub Gist (BYO token) | Fallback opzionale |
| **Hosting** | GitHub Pages | HTTPS automatico, gratis |
| **PWA** | Service Worker custom | Cache-first, versioning manuale |
| **Font** | Bebas Neue, Barlow, Barlow Condensed, Roboto Mono | Da Google Fonts via CDN |
| **Icone** | SVG master + PNG generate (16px-1024px) | Icona bilanciere stilizzato su sfondo lime |

### 1.7 Stato attuale delle feature (v1.8.4)

**Completate e funzionanti:**
- Login/registrazione (magic link, email+password, Google OAuth)
- Profilo utente con dati fisici
- Creazione schede personalizzate (pesi + calisthenics nella stessa scheda)
- 4 template pronti: Full Body 3gg, Push/Pull/Legs, Calisthenics Base, Vuoto
- Sessione live con tracking serie per serie
- Timer di recupero con notifiche push (sopravvive a schermo bloccato)
- Wake lock (schermo acceso durante sessione)
- Haptic feedback su azioni chiave
- Statistiche con volume per gruppo muscolare + barre MEV/MAV/MRV
- Delta percentuale vs periodo precedente su ogni KPI
- e1RM (Epley) calcolato automaticamente
- Rilevamento e celebrazione PR (personal record) con animazione
- Log allenamenti con ricerca, filtri (pesi/cal/tempo), raggruppamento settimanale
- Sync cloud multi-dispositivo (Supabase) + sync GitHub Gist legacy
- Conflict resolution con tombstone e merge per lastModified
- Duplica scheda
- Toast Undo su eliminazioni
- Backup: sync cloud automatica + snapshot giornalieri locali (7gg) + export/import JSON
- Onboarding wizard a 2 step con scelta template
- ErrorBoundary con recovery UI
- Content Security Policy configurata
- Empty states caldi con CTA
- Splash screen con wordmark "GT" animato
- Input numerici ottimizzati per mobile (decimal, autoselect, virgola/punto)
- Accessibilita: skip link, aria-label, tap target 44px+, focus-visible

**Non ancora implementate (roadmap):**
- RPE/RIR per serie
- Plate calculator visivo
- Condivisione sessione come immagine social
- Body tracking (peso, misure, foto)
- PDF export sessione/scheda
- Notifiche reminder allenamento
- Light mode
- Internazionalizzazione (inglese, spagnolo)
- Apple Watch / Wear OS companion
- Paywall / sistema Premium
- Stripe integration per pagamenti
- App Store / Play Store (wrapper Capacitor)

---

## PARTE 2 — MODELLO DI BUSINESS

---

### 2.1 Filosofia: Free generoso + Premium per power user

Il modello scelto e il **Modello A** (stile Hevy): la versione gratuita e un prodotto completo e usabile a vita. Il Premium aggiunge feature avanzate per chi vuole di piu.

**Perche questo modello:**
- Single founder, non c'e budget per growth marketing aggressivo
- Il posizionamento "serio, italiano, no fronzoli" verrebbe contraddetto da limiti aggressivi
- La crescita per passaparola di nicchia funziona meglio con free generoso

### 2.2 Free vs Premium

**Free per sempre:**
- Sessioni illimitate (pesi + calisthenics)
- Fino a 3 schede attive
- Storico fino a 3 mesi
- Timer recupero con notifiche
- Wake lock e haptic
- Statistiche base (tonnellaggio, sessioni, top esercizi)
- 4 template iniziali
- Export JSON (backup)
- Export CSV singola sessione
- Sync GitHub Gist (BYO token)

**Premium:**
- Schede illimitate
- Storico illimitato
- Stats avanzate: MEV/MAV/MRV per gruppo, e1RM con grafici, delta vs periodi, frequenza per muscolo
- RPE/RIR per serie
- Plate calculator visivo
- Sync cloud nativo (server gestito, senza token GitHub)
- PDF export sessione e scheda
- Programmi pronti premium (5/3/1, PHUL, GZCLP, Reddit PPL)
- Apple Watch / Wear OS companion (quando disponibile)
- Accesso anticipato nuove feature

### 2.3 Pricing

| Piano | Prezzo | Note |
|---|---|---|
| Mensile | **4,99 EUR/mese** | Allineato a Hevy/Strong |
| Annuale | **34,99 EUR/anno** | Sconto 42% |
| Lifetime | **79,99 EUR** | Sweet spot del mercato |

**Strategia launch:** Lifetime a **49,99 EUR per i primi 100 utenti** con contatore visibile sulla landing ("Sconto early adopter — 47/100 posti rimasti").

**Pagamenti:** Stripe (diretto, no App Store cut). Paddle in futuro se il traffico EU non-italiano supera il 20%.

### 2.4 Target finanziari realistici

| Mese | Utenti tot | Paganti | MRR | Revenue cumulato |
|---|---|---|---|---|
| 1 | 30 | 5 | 40 EUR | 100 EUR |
| 3 | 200 | 30 | 200 EUR | 1.000 EUR |
| 6 | 800 | 100 | 600 EUR | 5.000 EUR |
| 12 | 3.000 | 350 | 2.000 EUR | 18.000 EUR |

---

## PARTE 3 — BRAND IDENTITY

---

### 3.1 Naming

**Nome scelto: PUMPLOG**

| Proprieta | Dettaglio |
|---|---|
| **Significato** | "Pump" (pompare ferro, pump muscolare) + "Log" (registro, diario) |
| **Cosa comunica** | "Il registro dei tuoi allenamenti" — zero ambiguita |
| **Lettere** | 7 |
| **Sillabe** | 2 (Pump-Log) |
| **Suono** | Energico, diretto, gym culture |
| **Pronuncia** | Identica in italiano e inglese |
| **Design fit** | Dark + lime + PUMPLOG in Bebas Neue = bold, muscolare, riconoscibile |

**Perche funziona:**
- **Immediato:** chiunque nel fitness capisce cosa fa l'app dal nome
- **Memorabile:** due sillabe, ritmo percussivo, facile da ricordare e da dettare
- **Cercabile:** combinazione unica, non inflazionata sugli store
- **Internazionale:** "pump" e "log" sono compresi ovunque, ma il prodotto resta italiano nel tono
- **Estetico:** in uppercase (PUMPLOG) ha presenza grafica forte, perfetto per wordmark bold

**Varianti d'uso:**
- **Logo/brand formale:** PumpLog (CamelCase)
- **Wordmark display:** PUMPLOG (all-caps Bebas Neue)
- **URL/handle:** pumplog (lowercase)
- **Hashtag:** #PumpLog

**Da verificare e acquisire:**
- [ ] Dominio: `pumplog.app`, `pumplog.com`, `pumplog.it`
- [ ] Trademark: TMview (EU) + UIBM (Italia), classe 9 + classe 41
- [ ] Handle social: @pumplog su Instagram, TikTok, Twitter/X
- [ ] App Store / Play Store: verificare che non esista gia un "PumpLog"

### 3.2 Tagline

In ordine di forza per il target:

1. **"L'allenamento, davvero tracciato."** (attuale, funziona — sinergia forte con "Log")
2. **"Pesi e calisthenics. Un unico log."** (rafforza il nome)
3. **"Per chi prende l'allenamento sul serio."**
4. **"Il tuo log. I tuoi pesi. Zero fronzoli."**
5. **"Pump. Log. Ripeti."** (versione ultra-breve per social/merch)

### 3.3 Personalita del brand

Il brand parla come un **compagno di allenamento esperto**: diretto, competente, zero bullshit, presente quando serve e silenzioso quando non serve.

| Attributo | Si | No |
|---|---|---|
| **Tono** | Diretto, tecnico ma comprensibile, asciutto | Motivazionale, urlato, da coach americano |
| **Linguaggio** | Italiano naturale, termini tecnici dove servono | Inglesismi forzati, slang, emoji eccessive |
| **Atteggiamento** | Strumento al servizio dell'utente | Social network, gamification, competizione |
| **Estetica** | Dark, pulita, funzionale, lime come accento — PUMPLOG bold | Colorata, gradients, illustrazioni cartoon |
| **Comunicazione** | Fatti, dati, utilita | Hype, promesse vaghe, "trasforma il tuo corpo" |

**Brand voice — esempi:**

| Contesto | Come parliamo | Come NON parliamo |
|---|---|---|
| Onboarding | "Scegli una scheda e parti." | "Benvenuto nel tuo viaggio fitness!" |
| PR battuto | "Nuovo record: Panca 85kg x 6" | "INCREDIBILE! Sei un campione!" |
| Errore | "Qualcosa non ha funzionato. Riprova." | "Oops! Qualcosa e andato storto :(" |
| Upsell | "Sblocca lo storico completo con Premium." | "Non perderti i tuoi progressi! Aggiorna ORA!" |
| Social post | "Come calcolare il volume settimanale per gruppo muscolare." | "5 TRUCCHI per ESPLODERE in palestra!" |

### 3.4 Palette colori

```
PALETTE PRINCIPALE
==================

Accent (Lime)         #C8FF00    rgb(200, 255, 0)
  - Il colore di brand. Energia, sport, visibilita.
  - Usato per: CTA, elementi interattivi, highlight, icona app.

Accent su testo       #000000    rgb(0, 0, 0)
  - Testo nero su sfondo lime per massimo contrasto.

Background            #0C0C0D    rgb(12, 12, 13)
  - Sfondo principale. Nero profondo, non puro (#000).

Surface 1             #161618    rgb(22, 22, 24)
  - Card, sezioni elevate.

Surface 2             #202022    rgb(32, 32, 34)
  - Elementi interattivi, hover state.

Surface 3             #2A2A2D    rgb(42, 42, 45)
  - Bordi sottili, separatori.

Testo primario        #F0EFE8    rgb(240, 239, 232)
  - Testo principale. Bianco caldo, non puro.

Testo secondario      rgba(240, 239, 232, 0.55)
  - Label, caption, metadata.

Testo terziario       rgba(240, 239, 232, 0.32)
  - Placeholder, hint.

Bordo sottile         rgba(255, 255, 255, 0.06)
Bordo medio           rgba(255, 255, 255, 0.10)


COLORI SEMANTICI
================

Danger (Rosso)        #EF4444    Per errori, eliminazioni, alert
Success (Verde)       #22C55E    Per conferme, PR, completamenti
Warning (Ambra)       #F59E0B    Per avvisi, limiti vicini


ACCENT TRASPARENZE (per sfondi e glow)
=======================================

Accent 9%            rgba(200, 255, 0, 0.09)    Sfondo sottile
Accent 13%           rgba(200, 255, 0, 0.13)    Sfondo card accent
Accent 20%           rgba(200, 255, 0, 0.20)    Hover, glow
```

**Regole d'uso:**
- Il lime `#C8FF00` e SEMPRE su sfondo scuro. Mai su bianco o grigio chiaro.
- Il testo su sfondo lime e SEMPRE nero `#000`.
- Non usare il lime per blocchi di testo estesi — solo per accenti, bottoni, badge.
- Dark mode e l'unico tema ufficiale (per ora). Niente light mode.

### 3.5 Tipografia

```
FONT STACK
==========

Display / Titoli grandi    Bebas Neue          (Google Fonts, free)
  - Usato per: splash "GT", numeri grandi, titoli hero
  - Peso: 400 (unico disponibile)
  - Stile: All-caps naturale, condensato, impattante

Titoli condensati          Barlow Condensed     (Google Fonts, free)
  - Usato per: sotto-titoli, label uppercase, nav
  - Peso: 700
  - Stile: Condensato, leggibile anche a 12px

Body text                  Barlow               (Google Fonts, free)
  - Usato per: tutto il testo di corpo, bottoni, form
  - Pesi: 400 (regular), 500 (medium), 600 (semibold)
  - Stile: Geometrico-umanista, ottima leggibilita mobile

Numeri / Dati              Roboto Mono          (Google Fonts, free)
  - Usato per: pesi, ripetizioni, timer, statistiche
  - Peso: 500
  - Stile: Monospace, tabular-nums per allineamento colonne
```

**Regole tipografiche:**
- Numeri SEMPRE in Roboto Mono con `font-variant-numeric: tabular-nums`
- Titoli hero e splash in Bebas Neue
- Label e categorie in Barlow Condensed uppercase con `letter-spacing: 0.25em`
- Corpo testo in Barlow, mai sotto 14px su mobile
- Niente corsivo. Mai.

### 3.6 Logo e icona

**Stato attuale (da aggiornare con rebrand PumpLog):**
- **Wordmark attuale:** "GT" in Bebas Neue 96px — G bianco, T lime `#C8FF00`
- **Icona app attuale:** Bilanciere stilizzato nero su sfondo quadrato lime `#C8FF00` (SVG master disponibile)
- **Splash screen attuale:** Wordmark "GT" + barra animata lime + "GYMTRACKER" + tagline

**Direzione per il rebrand PumpLog:**

- **Wordmark principale:** "PUMPLOG" in Bebas Neue, tutto maiuscolo
  - Opzione A: "PUMP" in bianco `#F0EFE8` + "LOG" in lime `#C8FF00`
  - Opzione B: Tutto lime `#C8FF00` su sfondo scuro
  - Opzione C: "PUMP" lime + "LOG" bianco (inverte A)
- **Monogramma/Favicon:** "PL" stilizzato in Bebas Neue, oppure la "P" sola con accento lime
- **Icona app:** Mantenere lo sfondo lime `#C8FF00` come base, aggiornare il pittogramma per integrare il concetto "log" (es. bilanciere + linee di registro, o una "P" bold)
- **Splash screen:** "PUMPLOG" in Bebas Neue con barra animata + tagline

**Specifiche tecniche icona:**
- Sfondo: `#C8FF00` (lime pieno)
- Pittogramma: nero su lime, stroke 2-2.5px, geometrico
- Formati necessari: tutte le dimensioni da 16px a 1024px + versione maskable per Android
- File sorgente: SVG + AI/Figma

**Brief per il designer (budget 100-300 EUR):**
- Wordmark "PUMPLOG" in stile bold/condensato (Bebas Neue o custom)
- Monogramma "PL" per favicon (leggibile a 16x16)
- Icona app quadrata su sfondo lime
- 3 varianti: su sfondo scuro, su sfondo lime, versione monocromatica
- File: SVG, PNG (tutte le dimensioni), AI o Figma source

### 3.7 Iconografia e UI

**Stile icone:** Line icons, stroke 1.5-2px, rounded caps. Niente icone filled/solid. Coerenza con l'estetica pulita e tecnica.

**Spacing system (scala geometrica):**
```
sp-1:  4px     Micro-gap (tra icona e label)
sp-2:  8px     Gap stretto (padding interno piccolo)
sp-3: 12px     Gap standard (tra elementi inline)
sp-4: 16px     Padding card, gap sezioni
sp-5: 24px     Separazione sezioni
sp-6: 32px     Margini grandi
sp-7: 48px     Separazione macro-sezioni
```

**Border radius:**
```
r-sm:    6px    Input, badge, chip
r-md:   10px    Card, bottoni
r-lg:   14px    Modal, sheet
r-xl:   20px    Container grandi
r-full: 999px   Pill button, avatar
```

**Animazioni:**
- Durata standard: 120-250ms
- Easing: `ease-out` per entrate, `ease-in-out` per loop
- `scale(0.96)` su tap per feedback tattile visivo
- Slide-up per modal e sheet
- Fade-in per contenuti caricati
- Niente bounce, niente spring esagerato. Sottile e funzionale.

### 3.8 Fotografia e immagini

**Stile fotografico (per landing, social, marketing):**
- Ambientazione palestra reale, non patinata — ferro, gesso, pavimento di gomma
- Persone che si allenano davvero, non in posa. Sudore si, filtri no
- Luce naturale o tungsteno calda, niente flash piatto
- Nessun volto riconoscibile a meno di liberatoria (privacy-first anche nel branding)
- Screenshot dell'app su dispositivo reale, non mockup perfetti

**Cosa evitare:**
- Stock photo di modelli con addominali scolpiti in studio
- Filtri Instagram, grana artificiale, color grading estremo
- Illustrazioni cartoon o flat design
- Immagini AI-generated con artefatti visibili

### 3.9 Tono di voce — guida estesa

**Principio guida:** Parliamo come un allenatore preparato parlerebbe a un intermedio. Non spieghiamo cosa sono le ripetizioni. Non motiviamo con frasi vuote. Diamo informazioni utili.

**Registro:** Semi-formale, tecnico ma accessibile. "Tu" (non "voi" ne "lei").

**Lunghezza:** Brevi. Una frase quando basta una frase. Un paragrafo quando serve un paragrafo. Mai un muro di testo.

**Terminologia:**
- Usiamo: serie, ripetizioni (o reps), recupero, volume, tonnellaggio, e1RM, PR, MEV/MAV/MRV, scheda, blocco, sessione
- Non usiamo: workout (diciamo "sessione" o "allenamento"), gains, grind, beast mode, no pain no gain
- Eccezione: termini tecnici inglesi universali (push-up, pull-up, dip) restano in inglese

**Esempi per canale:**

| Canale | Esempio |
|---|---|
| **In-app** | "3 serie da 8 a 80kg. Recupero 120s." |
| **Landing page** | "PumpLog — traccia pesi e calisthenics in un'unica app. Offline, privata, gratis." |
| **Instagram caption** | "Volume settimanale petto: 14 serie. Sei nella zona ottimale (verde) o stai per sforare il MRV (rosso)? PumpLog te lo dice." |
| **Blog** | "Il MEV (Minimum Effective Volume) e il numero minimo di serie settimanali per far crescere un gruppo muscolare. Sotto il MEV, stai sprecando tempo. Ecco come calcolarlo." |
| **Email** | "Novita nella v2.1: RPE per serie e plate calculator. Aggiorna l'app per provare." |
| **Risposta a feedback** | "Grazie, bug confermato. Fix nella prossima versione." |

---

## PARTE 4 — GO-TO-MARKET

---

### 4.1 Roadmap di lancio (90 giorni)

| Settimane | Fase | Focus | Deliverable |
|---|---|---|---|
| **1-2** | Pre-launch | Dominio, legale, rebrand | Dominio PumpLog comprato, ToS/Privacy via iubenda, rebrand visivo |
| **3-4** | Infrastruttura | Backend Premium, paywall | Stripe webhook, entitlement check, paywall in-app |
| **5-6** | Marketing site | Landing page, analytics | Landing live, Sentry + Plausible attivi, 3-5 articoli SEO |
| **7-8** | Soft launch | Beta chiusa | 30 utenti, 5 paganti, ciclo feedback settimanale |
| **9-10** | Launch pubblico | Community + outreach | 100 utenti, 15-20 paganti, Discord/Telegram aperto |
| **11-12** | Iterazione | Data-driven | Analisi profilo pagante, 1-2 feature richieste, SEO round 2 |

### 4.2 Canali di acquisizione

**Primi 100 utenti (manuali, zero budget):**
1. Cerchia personale (palestra fisica, amici)
2. Gruppi Facebook italiani (Calisthenics Italia, Powerlifting Italia, Home Gym Italia)
3. Reddit (r/Bodybuildingitalia, r/bodyweightfitness)
4. Forum italiani (ProjectInvictus, BBHomePage)
5. Gruppi Telegram fitness italiani
6. Micro-influencer fitness IT (10K-100K follower): lifetime gratuito + 50 EUR per storia/video onesto

**Dopo i 100 utenti:**
- SEO long-tail italiano (articoli settimanali)
- Product Hunt launch
- Directory submissions (AlternativeTo, SaaSHub, BetaList)
- Pagine comparative (vs Hevy, vs Strong)
- Programmatic SEO (pagine per scheda/esercizio)

### 4.3 Landing page — struttura

1. **Hero:** Tagline + screenshot su device + CTA "Provala gratis"
2. **Problema:** 3 frasi su perche le altre app non bastano
3. **3 feature core con screenshot:** Timer+notifica, Stats MEV/MAV/MRV, Pesi+Cal uniti
4. **Tabella comparativa:** Noi vs Hevy vs Strong (6-8 caratteristiche dove vinciamo)
5. **Pricing:** 3 box (Mensile / Annuale / Lifetime con badge "Piu popolare")
6. **FAQ:** 5-8 domande
7. **Footer:** Privacy, ToS, contatto, social

### 4.4 SEO — keyword target italiane

| Keyword | Intent | Tipo contenuto |
|---|---|---|
| "scheda allenamento calisthenics" | Informazionale | Guida + link app |
| "come tracciare gli allenamenti" | Navigazionale | Articolo + CTA |
| "volume allenamento per gruppo muscolare" | Informazionale | Guida MEV/MAV/MRV |
| "scheda push pull legs" | Informazionale | Template + importa in app |
| "app allenamento offline" | Transazionale | Landing page |
| "alternativa a Hevy" | Comparativo | Pagina vs |
| "alternativa a Strong app" | Comparativo | Pagina vs |
| "progressione calisthenics" | Informazionale | Guida + tracking |

---

## PARTE 5 — INFRASTRUTTURA E LEGALE

---

### 5.1 Dominio

- `pumplog.app` o `pumplog.com` per il marketing site
- `app.pumplog.app` per la PWA
- `pumplog.it` opzionale per rafforzare il posizionamento italiano

### 5.2 Hosting

- **Fase 1:** GitHub Pages (gratis, HTTPS automatico)
- **Fase 2 (>500 MAU):** Cloudflare Pages (gratis, CDN globale, analytics)

### 5.3 GDPR — checklist

- Informativa privacy chiara (dove vanno i dati, chi li vede, come cancellarli)
- Consenso esplicito al primo onboarding
- Bottone "Cancella tutti i miei dati" in Settings
- Export JSON = diritto alla portabilita
- Email di contatto per data breach notification (72h)
- iubenda per generare ToS + Privacy Policy + Cookie Policy (27 EUR/anno)

### 5.4 Pagamenti

- **Stripe** per PWA diretta (1,5% + 0,25 EUR per carte EU)
- **Paddle** in futuro se traffico EU non-IT > 20% (merchant of record, gestisce IVA)
- **RevenueCat** solo quando si va su App Store / Play Store

### 5.5 Fiscale

- Regime forfettario (sotto 85.000 EUR/anno): 5% primi 5 anni se startup, poi 15%
- Prezzi IVA inclusa per consumatori EU
- Sopra 85K: valutare SRL/SRLS con commercialista

### 5.6 Trademark

- UIBM (Italia): ~170-340 EUR, classe 9 (software) + classe 41 (fitness)
- EUIPO (EU): ~850-1050 EUR
- Non urgente nei primi 6 mesi, ma registrare appena l'app prende piede

---

## PARTE 6 — ASSET DISPONIBILI

---

### 6.1 File nel repository

| File | Descrizione |
|---|---|
| `index.html` (~155 KB) | App completa (HTML + CSS + React) |
| `sw.js` (~4.3 KB) | Service worker per offline + caching |
| `manifest.webmanifest` | Manifest PWA |
| `icons/icon-master.svg` | Sorgente vettoriale icona (bilanciere) |
| `icons/icon-master-maskable.svg` | Versione maskable per Android |
| `icons/*.png` | Tutte le dimensioni (16-1024px) |
| `PIANO_PRODOTTO.md` | Decisioni prodotto/business/infrastruttura |
| `PIANO_MARKETING_SVILUPPO.md` | Piano marketing 5 fasi dettagliato |
| `MIGLIORAMENTI.md` | Changelog tecnico v1.4.0 - v1.5.1 |

### 6.2 Cosa serve da collaboratori

| Ruolo | Cosa serve | Budget stimato |
|---|---|---|
| **Brand designer** | Wordmark "PUMPLOG" + monogramma "PL" per favicon + icona app + 3 varianti | 100-300 EUR |
| **Copywriter IT** | Copy landing page + 5 articoli SEO + bio social | 200-500 EUR |
| **Video creator** | Demo app 30s per Product Hunt + 3 reel TikTok/IG | 100-300 EUR |
| **Legale/GDPR** | Revisione ToS se revenue > 5K/anno | 300-800 EUR |

---

## PARTE 7 — METRICHE DI SUCCESSO

---

### 7.1 Metriche di validazione (target 6 mesi)

| Metrica | "Validato" | "Promettente" | "Allarme" |
|---|---|---|---|
| Utenti registrati | >200 | >50 | <20 |
| Activation rate (1+ sessione) | >40% | >25% | <20% |
| Retention W1 (tornano dopo 7gg) | >30% | >15% | <10% |
| Retention M1 (tornano dopo 30gg) | >20% | >10% | <5% |
| NPS (da feedback) | >40 | >20 | <0 |
| "Se sparisse domani?" = "Molto" | >40% | >25% | <15% |

### 7.2 North star metric

**Sessioni completate per settimana per utente attivo.**

Se questo numero cresce, tutto il resto segue: retention, passaparola, willingness to pay.

---

## APPENDICE — CHECKLIST IMMEDIATA

Per chi inizia a collaborare oggi, queste sono le azioni piu urgenti:

- [ ] **Verificare e comprare dominio** `pumplog.app` / `pumplog.com`
- [ ] **Verificare trademark** "PumpLog" su TMview (EU) + UIBM (Italia)
- [ ] **Riservare handle social** @pumplog su Instagram, TikTok, Twitter/X
- [ ] **Commissionare rebrand visivo** al designer: wordmark PUMPLOG + monogramma PL + icona app
- [ ] **Aggiornare l'app**: splash screen, manifest, titolo, meta tag con nome PumpLog
- [ ] **Scrivere copy landing page**
- [ ] **Configurare iubenda** (ToS + Privacy)
- [ ] **Setup Stripe** account italiano
- [ ] **Implementare paywall** nel codice

---

*Questo documento e la fonte di verita per chiunque lavori al progetto. Aggiornarlo ad ogni decisione importante.*
