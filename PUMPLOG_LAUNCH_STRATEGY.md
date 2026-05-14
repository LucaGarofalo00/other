# PumpLog — Launch Strategy
> Versione 1.0 — 14 maggio 2026 | Stato: Pre-Alpha

---

## Dove sei ora

Sei tra **Internal Launch** e **Alpha Launch**: prodotto funzionante (v1.8.4), zero canali owned, zero lista email. Il gap più critico non è tecnico — è che non hai un'audience da attivare il giorno del lancio.

---

## Framework ORB

Tutto deve convergere verso i canali owned. I canali rented e borrowed servono a portare traffico verso la lista email e la landing — non come destinazione finale.

---

## 🟢 Owned — Costruisci prima di lanciare

### Email list (priorità assoluta — inizia questa settimana)

- **Tool:** Resend (gratis fino a 3K contatti) oppure Brevo
- **Entry point:** Form sulla landing "Avvisami al lancio"
- **Offerta:** "Iscriviti → accesso beta anticipato + lifetime a 49,99 EUR (vs 79,99)"
- **Target pre-launch:** 100-200 iscritti prima di aprire al pubblico
- **Sequenza automatica:**
  1. Email di conferma iscrizione
  2. Email "come funziona la beta" (3 giorni dopo)
  3. Email "sei dentro" (invito diretto)

### Blog SEO (settimane 5-8)

Inizia con gli articoli transazionali/comparativi, non con quelli informativi.

| Priorità | Articolo | Keyword target |
|---|---|---|
| 1 | Migliore app allenamento offline | "app allenamento offline" |
| 2 | PumpLog vs Hevy | "alternativa a Hevy" |
| 3 | Come tracciare il volume MEV/MAV/MRV | "volume allenamento per gruppo muscolare" |
| 4 | Scheda Push Pull Legs — template importabile | "scheda push pull legs" |
| 5 | Progressione calisthenics — guida al tracking | "progressione calisthenics" |

---

## 🟡 Rented — 2 canali, non di più

### Instagram (canale primario visivo)

- **Handle:** @pumplog — da riservare subito
- **Formato principale:** Reel 30-45s su feature specifica → link in bio alla waitlist
- **Cadenza pre-launch:** 3x/settimana
- **Content mix:**
  - 50% feature demo (timer, MEV/MAV/MRV, PR detection)
  - 30% educativo (MEV spiegato in 60s, come calcolare il volume)
  - 20% behind the scenes (solo founder = asset narrativo forte)

### Reddit / Forum (canale primario testo)

**Target:** r/Bodybuildingitalia, r/bodyweightfitness, ProjectInvictus, BBHomePage

**Regola:** Partecipa per 2 settimane senza promuovere l'app. Rispondi a domande su volume, tracking, calisthenics. Quando lanci, sei già un membro credibile.

**Post di lancio tipo:**
> "Ho costruito un'app italiana per tracciare pesi + calisthenics — la sto aprendo in beta, cerco feedback onesto"

**Cosa NON fare:** TikTok, LinkedIn, Twitter/X per ora. Disperde energie da solo founder.

---

## 🔵 Borrowed — Leva rapida

### Micro-influencer IT (settimane 7-9)

- **Target:** 20 profili IT fitness (10K-100K follower) — calisthenics, powerlifting, home gym, schede scientifiche
- **Offerta:** Lifetime Premium gratuito, nessun obbligo
- **Script DM:**
  > "Ho costruito PumpLog per risolvere X problema che vedo spesso nei tuoi contenuti — ti regalo il lifetime Premium, nessun obbligo. Se ti piace, dimmi cosa ne pensi."
- **Logica:** Non chiedere una storia — chiedi feedback. Se il prodotto è buono, la storia viene da sola.
- **Escalation:** Se engagano, proponi 50 EUR per una storia onesta.

### ProjectInvictus / BBHomePage

Contatta i founder direttamente: partnership editoriale con articolo ospite su MEV/MAV/MRV e link naturale a PumpLog. Non chiedere banner o ads — chiedi collaborazione editoriale.

---

## Sprint Pre-Launch (settimane 1-4)

### Settimana 1 — Infrastruttura legale e identitaria
- [ ] Compra `pumplog.app` + opzionale `pumplog.it`
- [ ] Verifica trademark su TMview (EU) + UIBM (Italia)
- [ ] Riserva @pumplog su Instagram, TikTok, Twitter/X
- [ ] Commissiona rebrand al designer (wordmark + icona + monogramma PL)
- [ ] Setup iubenda (ToS + Privacy Policy + Cookie Policy)

### Settimana 2 — Landing + Waitlist
- [ ] Landing page live con form waitlist (anche una sola pagina)
- [ ] Setup Resend/Brevo per email list
- [ ] Plausible Analytics attivo
- [ ] Inizia a partecipare sui forum (zero promo)

### Settimana 3 — Backend monetizzazione
- [ ] Stripe account IT configurato
- [ ] Paywall implementato nell'app
- [ ] Entitlement check funzionante
- [ ] Test pagamento end-to-end con carta reale

### Settimana 4 — Contenuto e outreach
- [ ] Primo Reel pubblicato (demo timer + notifiche push)
- [ ] Lista micro-influencer finalizzata (20 profili)
- [ ] Primo articolo SEO pubblicato
- [ ] Beta tester personali invitati (10-15 persone dalla cerchia reale)

---

## Roadmap a 90 giorni

| Settimane | Fase | Focus | KPI target |
|---|---|---|---|
| 1-2 | Pre-launch | Dominio, legale, rebrand | Checklist completata |
| 3-4 | Infrastruttura | Stripe, paywall, landing | 1° pagamento test ok |
| 5-6 | Marketing site | Landing finale, SEO, analytics | 50+ iscritti waitlist |
| 7-8 | Soft launch | Beta chiusa, feedback loop | 30 utenti, 5 paganti |
| 9-10 | Launch pubblico | Community + outreach | 100 utenti, 15-20 paganti |
| 11-12 | Iterazione | Data-driven | Analisi profilo pagante, 1-2 feature richieste |

---

## Meccanica Early Adopter

Il lifetime a 49,99 EUR con contatore "X/100 posti rimasti" è la mossa giusta.

**Esecuzione:**
- Contatore reale e aggiornato via Supabase (non finto scarcity)
- A 50/100: post Instagram "metà dei posti early adopter esauriti"
- A 80/100: email alla lista "ultimi 20 posti"
- A 100/100: lifetime sale a 79,99 EUR — nessuna eccezione

**Valore collaterale:** Gli acquirenti lifetime diventano il tuo advisory board informale. Crea un canale Telegram privato per loro e chiedi feedback attivamente.

---

## Product Hunt — Timing e preparazione

**Quando:** Settimana 9-10. Non prima. PH funziona solo se hai già una base utenti che vota il giorno stesso.

### Prerequisiti prima di andare live su PH
- [ ] Almeno 50 utenti attivi (1+ sessione negli ultimi 14 giorni)
- [ ] Video demo 30s pronto (obbligatorio su PH)
- [ ] Rebrand completato
- [ ] Beta tester disponibili a votare il giorno del lancio
- [ ] Listing ottimizzato: tagline, screenshot, GIF feature principali

### Giorno del lancio PH
- Pubblica alle 00:01 PT (= 09:01 ora italiana)
- Rispondi a ogni commento entro 30 minuti
- Pubblica un post Reddit contemporaneamente
- Invia email alla lista: "Siamo su Product Hunt oggi — se l'app ti piace, questo è il momento"

**Obiettivo realistico:** Top 5 del giorno. Anche #5 dà badge, backlink DoFollow e credibilità.

---

## Post-Launch (settimane 11-12+)

- **Onboarding email sequence:** 3-5 email automatiche per i nuovi iscritti — introduce le feature chiave gradualmente
- **Roundup mensile:** Newsletter con changelog + articolo del mese + metriche selezionate
- **Pagine comparative:** PumpLog vs Hevy, PumpLog vs Strong, PumpLog vs Thenics
- **Programmatic SEO:** Pagine per esercizio (es. "come tracciare la panca piana") e per scheda (es. "template 5/3/1 importabile")
- **Directory submissions:** AlternativeTo, SaaSHub, BetaList, AppSumo (futuro)

---

## Metriche di lancio (prime 4 settimane dalla beta pubblica)

| Metrica | Target "ok" | Target "bene" |
|---|---|---|
| Iscritti waitlist pre-launch | 50 | 150 |
| Utenti beta (settimana 8) | 30 | 60 |
| Activation rate (1+ sessione) | 30% | 50% |
| Retention W1 (tornano dopo 7gg) | 20% | 35% |
| Conversioni lifetime early adopter | 5 | 15 |
| NPS dopo 2 settimane | >25 | >40 |

---

## North Star Metric

**Sessioni completate per settimana per utente attivo.**

Se questo numero cresce, tutto il resto segue: retention, passaparola, willingness to pay.

---

## ⚠️ Avvertimento da solo founder

Il rischio principale è **costruire troppo prima di lanciare**. Paywall completo, rebrand, 5 articoli SEO, video — non servono tutti prima della beta.

**MVP sufficiente per aprire la beta:**
1. Landing page con form waitlist
2. App funzionante (già hai)
3. Stripe configurato + paywall base
4. ToS/Privacy attivi

Tutto il resto viene *dopo* che hai 30 persone che usano l'app e ti dicono cosa non va. Non ottimizzare il marketing prima di validare la retention.

---

*Documento generato il 14 maggio 2026 — aggiornare ad ogni decisione di lancio rilevante.*
