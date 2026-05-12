# GymTracker — Piano prodotto e go-to-market

Questo documento contiene le decisioni di prodotto, business e infrastruttura **non** ancora codificate nell'app. Va letto e ragionato a mente fresca, perché ogni scelta qui dentro ha effetti a catena. Non c'è fretta tecnica: l'app è pronta, queste sono le scelte che separano un side-project dall'avere clienti veri.

Tutti i numeri di mercato che trovi qui sono aggiornati a metà 2026.

---

## 1. Naming e identità di marca

### Il problema con "GymTracker"

È **descrittivo e generico**. Cerca su App Store/Play Store: ci sono almeno una dozzina di app che si chiamano "GymTracker", "Gym Tracker", "MyGymTracker". Non è registrabile come marchio, non è memorabile, e su Google ti trovi sepolto.

### Criteri per il nome definitivo

1. **Pronunciabile in italiano e inglese** senza ambiguità.
2. **5-9 lettere**, una sola parola se possibile.
3. **Dominio `.com` o `.app` disponibile** (vedi punto 2).
4. **Trademark italiano** e **EU** disponibili (cerca su [TMview](https://www.tmdn.org/tmview/) e [UIBM](https://uibm.mise.gov.it/)).
5. **Senza connotazioni negative** in inglese o italiano.
6. **Riassume il valore promesso**: per la tua nicchia "serio + multidisciplinare + privacy".

### Direzioni di naming da esplorare

| Direzione | Esempi | Tono |
|---|---|---|
| **Numerico/forza** | Tonn, Onerep, Tenrep, Bilanciere, Carico, Sovraccarico | Tecnico, da palestra italiana |
| **Astratto evocativo** | Forge, Anvil, Strato, Cresta, Vetta, Crux | Aspirazionale, premium |
| **Calisthenics-compatibile** | Apex, Crux, Holt, Rep, Tide | Bilanciato sala/cal |
| **Italiano puro** | Tempra, Acciaio, Sforzo, Ferro, Stacca | Distintivo, locale, ma rischio inglese |
| **Personale** | Coach Mio, MiAlleno, MiTraino | Caldo ma rischia generico |

**Esempi pronti da verificare disponibilità di TM e dominio:** Tempra, Tonn, Anvil, Crux, Ferro, Forge, Stacca, Onerep, Rep, Tide.

Il mio favorito tra questi è **Tempra**: italiano (ricorda "temprare" — sia il metallo che il carattere), 6 lettere, pronunciabile in inglese, evocativo, premium. Verifica subito `tempra.app` e marchio.

### Logo e identità visiva

Quando hai scelto il nome:
- **Wordmark** (testo stilizzato) prima di un simbolo. Bebas Neue funziona già, mantienilo.
- **Un solo colore di brand**: il lime `#C8FF00` è ottimo, è distintivo, ricorda sport/energia. Tienilo.
- **Pittogramma opzionale**: una "T" stilizzata come una piastra di bilanciere, oppure le iniziali geometriche.
- Spendi €100-300 per un designer freelance su Fiverr/99designs solo dopo aver scelto il nome. Brief: "wordmark + favicon + 3 varianti per app icon su sfondi diversi".

### Tagline

In ordine di forza per il tuo target:
- "L'allenamento, davvero tracciato." (attuale splash, italiano)
- "Sala pesi e calisthenics. Niente social, niente fronzoli."
- "Per chi prende l'allenamento sul serio."
- "Tracker serio. Italiano. Privato."

---

## 2. Dominio e infrastruttura legale

### Dominio

Compra **subito** quando hai il nome:
- `.com` se disponibile (€10-15/anno su Namecheap o Porkbun).
- `.app` come secondo (obbligatorio HTTPS, più "tech").
- `.it` opzionale se vuoi rinforzare il posizionamento italiano.

Da evitare: `.io` (caro e ormai inflazionato), `.fitness` (overkill).

### Hosting iniziale (gratis)

GitHub Pages va bene per i primi mesi. È gratuito, HTTPS automatico, ottimo per PWA. Quando passi i 500 utenti attivi mensili o vuoi più controllo sui log, valuta:
- **Cloudflare Pages**: gratuito, CDN globale, analytics inclusi, edge functions se servono.
- **Vercel**: gratuito fino a un certo traffico, perfetto se in futuro aggiungi backend.
- **Netlify**: simile a Vercel.

Non serve un VPS finché non hai backend.

### Termini di Servizio e Privacy Policy

Sono **obbligatori** per legge se vendi un servizio in EU. Le opzioni:

1. **Generatore gratuito**: [Termly](https://termly.io), [iubenda](https://www.iubenda.com) — quest'ultimo è italiano, perfetto per GDPR, parte da €27/anno per un sito singolo.
2. **Avvocato locale**: €300-800 per una stesura su misura. Vale la pena se prevedi più di €5k/anno di fatturato.

**iubenda** è la scelta pragmatica: ti genera ToS, Privacy Policy e Cookie Policy in italiano e inglese, già conformi GDPR. Includi i link nel footer della landing e nel `Settings` dell'app.

### GDPR — checklist minima per una PWA con sync

L'app gestisce dati personali (nome, peso, allenamenti). Anche con storage locale + Gist personali, devi:

1. **Informativa privacy chiara**: dove vanno i dati, chi può vederli, come cancellarli.
2. **Consenso esplicito** alla raccolta solo al primo onboarding (un toggle "Accetto i ToS e la Privacy").
3. **Diritto all'oblio**: bottone "Cancella tutti i miei dati" in Settings che svuota localStorage e — se l'utente ha sync attivo — anche il Gist remoto.
4. **Diritto alla portabilità**: l'export JSON che hai già copre questo requisito.
5. **Data breach notification**: se mai succedesse, devi notificare entro 72h. Tieni un'email di contatto designata.
6. **DPO**: per app sotto i 250 utenti non è obbligatorio. Sopra, valuta.

Se aggiungi backend in futuro (per autenticazione, pagamenti, ecc.), il livello sale: serve un **registro dei trattamenti** e probabilmente un consulente GDPR. Per ora con la PWA local-first sei in zona molto più semplice.

### Trademark

Registrare il marchio in Italia costa **circa €170-340** (UIBM, classe 9 "software" + classe 41 "fitness"). Per EU il costo sale a €850-1050 (EUIPO). Non servirebbe nei primi 6-12 mesi, ma se l'app prende piede, registra prima possibile per evitare squat.

---

## 3. Modello free vs premium

### Filosofia

Hai due strade fondamentali:

**(A) Free generoso + Premium per power users** (il modello Hevy)
- Free è completamente usabile a vita.
- Premium aggiunge analisi avanzate, esportazioni, cloud illimitato.
- Pro: bassissimo attrito iniziale, viralità organica più alta.
- Contro: conversione bassa (Hevy converte ~3-5% degli utenti attivi).

**(B) Free limitato + Premium per uso reale** (il modello Strong, Fitbod)
- Free è una versione "trial estesa": 7 giorni illimitati o 1 mese / N sessioni.
- Premium è necessario per uso continuativo.
- Pro: conversione 8-15%.
- Contro: hai bisogno di una landing efficace, non puoi sperare nel passaparola gratuito.

**Raccomandazione per il tuo caso**: modello **A**, perché:
1. Sei single founder, non puoi mantenere una pipeline di growth marketing aggressiva.
2. Il tuo posizionamento è "serio, italiano, no fronzoli" — limitare il free contraddice il messaggio.
3. La crescita per passaparola di nicchia funziona meglio con free generoso.

### Cosa va dietro paywall (proposta)

**Free per sempre:**
- Sessioni di sala pesi e calisthenics illimitate.
- Fino a **3 schede attive** (vincolo soft, replica Hevy free).
- Timer recupero con notifiche.
- Wake lock e haptic.
- Storico fino a **3 mesi**.
- Esportazione JSON una tantum (backup).
- Export CSV singola sessione.
- I 4 template iniziali (Full Body, PPL, Calisthenics, Vuoto).
- Statistiche base (tonnellaggio, sessioni, top esercizi).
- Sync GitHub Gist (l'utente porta il suo token).

**Premium (€4,99/mese o €34,99/anno o €79,99 lifetime):**
- **Schede illimitate** (vs 3).
- **Storico illimitato** (vs 3 mesi).
- **Stats avanzate**: MEV/MAV/MRV per gruppo, e1RM con grafici, delta vs periodi precedenti, frequenza per muscolo.
- **RPE/RIR per serie** (quando lo aggiungerai).
- **Plate calculator visivo**.
- **Sync cloud nativo** (senza dover gestire token GitHub — server gestito da te).
- **PDF export sessione e scheda** (per condividere col PT).
- **Programmi pronti** premium (5/3/1, PHUL, GZCLP, Reddit PPL, ecc.).
- **Apple Watch / Wear OS** companion (quando lo svilupperai).
- **Accesso anticipato** alle nuove feature.

### Cosa NON metto dietro paywall, anche se potrei

- Timer recupero (essenziale, non lo limitare).
- Esportazione minima (per non sembrare ostaggio).
- Onboarding (l'esperienza prima impressione deve essere completa).
- Modalità calisthenics base (è il tuo differenziatore, non lo punire).

### Conversione free → premium

Trigger naturali quando il free hit i limiti:
- "Hai raggiunto le 3 schede attive. Sblocca schede illimitate con Premium."
- "Le sessioni precedenti a [3 mesi fa] sono nell'archivio. Sblocca lo storico illimitato con Premium."
- Su Stats avanzate: "Vuoi vedere il volume per gruppo settimanale? Premium."

Non aggressivo: nessun popup invadente, nessun banner persistente. Un solo bottone "Scopri Premium" nel menu impostazioni.

---

## 4. Pricing

### Benchmark mercato 2026

| App | Pricing |
|---|---|
| Hevy Pro | $4,99/mese · $35,99/anno · $74,99 lifetime |
| Strong | $4,99/mese · $29,99/anno · $99 lifetime |
| Fitbod | $9,99/mese · $79,99/anno |
| Boostcamp Plus | $9,99/mese |
| Arvo | €6/mese (AI coach) |
| PRPath | $9,99/mese (AI + nutrizione) |

Il mercato si è **abbassato** rispetto a 2024 (Hevy era $8,99). La pressione di Strong e Hevy ha schiacciato i prezzi vicino a $5/mese. Sopra ci sono solo le app con AI o nutrizione.

### Pricing consigliato per Tempra (chiamiamolo così per ora)

| Piano | Prezzo | Note |
|---|---|---|
| **Mensile** | €4,99 | Allineato a Hevy/Strong, riconoscibile |
| **Annuale** | €34,99 | Sconto 42% (12 × 4,99 = 59,88 → 34,99) |
| **Lifetime** | €79,99 | Sweet spot Hevy/Strong, ottimo per launch |

**Strategia launch:** prezzo lifetime promo a **€49,99 per i primi 100 utenti** (limite chiaramente visibile sulla landing: "Sconto early adopter — 47 / 100 posti rimasti"). Crea urgenza autentica, ti capitalizza subito, e i primi 100 sono i tuoi evangelisti.

### Valuta vs IVA

In EU sei obbligato a far vedere prezzi **IVA inclusa** ai consumatori. €4,99 contiene già IT VAT 22% se sei sotto regime forfettario o partita IVA standard. Se sei in regime forfettario (probabile per un side project italiano), non addebiti IVA all'utente ma comunque devi dichiarare il reddito.

Sotto **€85.000/anno** di fatturato puoi rimanere nel forfettario al 15% (o 5% i primi 5 anni se startup). Sopra, valuta SRL/SRLS con un commercialista.

### Free trial?

Niente trial automatico. Il modello free generoso (sezione 3) **è** il trial. Vendere trial gratuito di Premium + carta di credito richiesta = friction enorme. Salta.

---

## 5. Infrastruttura pagamenti

### Scelta: Stripe diretto

Per una PWA che vendi direttamente (non da App Store/Play Store), **Stripe è la scelta ottimale**:

- Tariffa: **1,5% + €0,25 per carte EU**, 2,5%+€0,25 per carte non-EU. Più basso del solito 2,9% USA.
- Setup: 1-2 giorni di lavoro.
- Webhook per gestire eventi (`customer.subscription.created`, `invoice.payment_failed`, `customer.subscription.deleted`).
- Customer portal Stripe-hosted per gestione abbonamento dall'utente (cambia carta, cancella, fattura).

**Quando NON serve RevenueCat:** finché vendi solo via PWA. RevenueCat costa $0 fino a $2,5k/mese di revenue, poi paghi 1% sul revenue. Aggiunge complessità senza valore reale se non vendi anche su App Store/Play Store.

### Quando RevenueCat diventa rilevante

Se in futuro pubblichi su App Store come PWA wrappata (es. con [PWABuilder](https://www.pwabuilder.com/) o Capacitor):
- Apple e Google **prendono il 30% (15% sotto $1M)** sulle transazioni in-app.
- RevenueCat unisce Stripe (web) + Apple IAP + Google IAP in un'unica entitlement.
- Sotto $2,5k MRR è gratis, sopra 1% sul revenue.

Per ora: **solo Stripe**. Aggiungi RevenueCat quando vai negli store.

### Stack tecnico consigliato

```
Stripe Checkout (hosted, no PCI) → 
Webhook → 
Mini backend (Vercel Function / Cloudflare Worker, gratis) → 
Database mini (Cloudflare KV o Upstash Redis, gratis nel free tier) → 
Mappa email-utente → entitlement (free/pro)
```

L'app PWA al primo avvio dopo l'acquisto chiede l'email all'utente, verifica via API se ha entitlement Pro, sblocca le feature. Niente JWT complicato, niente auth pesante: una mail con magic-link basta.

**Tempo di realizzazione:** un weekend.

### Tax & invoicing

In EU devi:
1. Emettere fattura elettronica (XML SDI) se l'utente è italiano partita IVA — improbabile per il tuo target.
2. Per privati italiani, lo scontrino digitale di Stripe basta (regime forfettario).
3. Per privati EU non italiani, devi gestire IVA del paese del consumatore (OSS — One Stop Shop). Soluzione: **Paddle invece di Stripe** se prevedi molti utenti UE non italiani. Paddle è merchant-of-record, gestisce IVA per te. Tariffa più alta (~5%), ma evita un mal di testa burocratico.

**Raccomandazione:** lancia con Stripe italiano solo per utenti italiani, poi quando l'EU traffic supera il 20%, switch a Paddle. È un cambio di 2 giorni di lavoro.

---

## 6. Sicurezza per la produzione

### Token GitHub in localStorage

Per uso personale ok. Per vendere a estranei: **rischio**. Un XSS (anche teorico) ruba il token e accede a tutti i Gist dell'utente, non solo a quelli di GymTracker. 

**Soluzioni in ordine di costo:**

1. **Token con scope minimo** (`gist` only): già fatto, ma il rischio resta.
2. **Sync alternativo**: invece di GitHub Gist personale, hai il tuo backend che fa da sync proxy. L'utente non possiede mai un token sensibile.
3. **GitHub App OAuth**: setup più complesso, ma l'utente vede chiaramente "GymTracker richiede accesso a Gists" → click → fatto. Token ristretto al solo Gist creato dall'app.

**Raccomandazione:** quando attivi il modello Premium, il sync diventa **server-side** (parte di Premium). L'utente Free continua con GitHub Gist BYO-token, l'utente Premium ha sync cloud nativo gestito da te. Doppio vantaggio: feature di vendita + sicurezza migliorata.

### CSP (Content Security Policy)

Aggiungi un `<meta http-equiv="Content-Security-Policy">` per ridurre l'attack surface XSS:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://api.github.com;
">
```

`'unsafe-inline'` è necessario perché usi stili e script inline. Non è ideale, ma comunque blocca origin esterne sconosciute.

### Audit dipendenze

Quando aggiungi un backend, gira `npm audit` regolarmente. Per ora la PWA carica solo React UMD da jsDelivr — superficie d'attacco minima.

---

## 7. Telemetria errori e analytics

### Sentry (errori)

**Free tier**: 5.000 errori/mese. Più che sufficiente per i primi 6 mesi.

Setup: aggiungi 5 righe nell'`ErrorBoundary` e all'avvio:

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.tracing.min.js"></script>
<script>
Sentry.init({
  dsn: 'TUO_DSN_QUI',
  tracesSampleRate: 0.1,
  release: 'gymtracker@1.5.0',
  environment: window.location.hostname === 'localhost' ? 'dev' : 'prod'
});
</script>
```

Poi nell'`ErrorBoundary.componentDidCatch`, aggiungi `Sentry.captureException(error)`.

Risultato: ogni volta che un utente crasha, ricevi una email con stack trace, browser, OS, frequenza. Fondamentale.

### Plausible / Umami (analytics privacy-first)

**No Google Analytics**. È pesante, richiede banner cookie GDPR, e ai tuoi utenti privacy-conscious darà cattiva impressione.

Alternative gratuite o economiche:
- **Plausible**: €9/mese fino a 10k visitor/mese. Cookie-free, GDPR-friendly, niente banner.
- **Umami Cloud**: $10/mese, simile.
- **Self-hosted Umami**: gratis se hai un VPS qualsiasi.

Cosa tracciare: visite landing, signup, conversione free→paid, sessioni completate (count aggregato, non per-utente). Niente dato personale, niente fingerprint.

### Feedback diretto dagli utenti

- **Email pubblica** `support@tuonome.com` o `feedback@`.
- Bottone "Invia feedback" in Settings che apre `mailto:` con info app pre-compilate (versione, OS, browser, utente).
- Un Discord server pubblico (free) o canale Telegram per la community early adopter — fondamentale per i primi 100 utenti.

---

## 8. Landing page minima

### Cosa deve contenere (in ordine)

1. **Hero**: tagline + screenshot principale + CTA "Provala ora gratis" che apre la PWA.
2. **Problem statement**: 3 frasi su perché le altre app non bastano per il tuo target.
3. **3 feature core con screenshot**: timer + notifica (con immagine schermo bloccato), stats MEV/MAV/MRV, sala pesi + cal unite.
4. **Comparison table**: GymTracker vs Hevy vs Strong su 6-8 caratteristiche dove vinci (italiano, MEV/MAV/MRV nativo, no social, calisthenics integrato, ecc.).
5. **Pricing**: 3 box (Mensile / Annuale / Lifetime), Lifetime con badge "Più popolare".
6. **FAQ**: 5-8 domande standard (Posso cancellare quando voglio? I miei dati sono al sicuro? Funziona offline? Apple Watch? Differenza con Hevy?).
7. **Footer**: link a Privacy, ToS, contatto, social.

### Stack tecnico per la landing

Non perdere tempo con React/Next per una landing statica. Opzioni in ordine di velocità:

1. **HTML + CSS puro** ospitato su GitHub Pages o Cloudflare Pages. 1-2 giorni di lavoro. Zero costi.
2. **Astro**: framework moderno per siti statici, deployment one-click su Vercel. 2-3 giorni.
3. **Framer**: design + hosting in uno, drag-and-drop. €15/mese ma azzera il tempo di sviluppo.

**Raccomandazione**: HTML puro per il MVP, Framer se vuoi iterare velocemente sul design senza scrivere CSS.

### Domain: marketing site vs app

Setup tipico:
- `tuonome.com` → landing page marketing.
- `app.tuonome.com` → la PWA vera e propria.

Configurazione DNS:
- `tuonome.com` → CNAME a `pages.cloudflare.com` (landing) o `usercontent.github.com` (GH Pages).
- `app.tuonome.com` → CNAME al deploy della PWA.

Tempo: 30 minuti se hai già il dominio.

---

## 9. Canali di acquisizione iniziale

I primi 100 utenti vengono **manualmente**, non da pubblicità. Vai dove sono i tuoi.

### Canali italiani con leverage alto

1. **r/Bodybuildingitalia** (~30k membri), **r/AskWeightTraining**, **r/cscarduralia**: posta una review onesta della tua app, non un advert. "Ho fatto un'app perché Hevy non mi bastava: ecco perché". Le mod sono permissive con i self-promo se sono di qualità.
2. **Gruppi Facebook italiani di calisthenics e palestra**: cerca "Calisthenics Italia", "Bodybuilding Natural Italia", "Powerlifting Italia". Sono attivi e i tuoi early adopter sono qui.
3. **Instagram/TikTok micro-influencer fitness italiani**: cerca account 10k-100k follower, contattali, offri lifetime gratuito + €50 in cambio di una storia/video onesto. Costo: €500 totali per 10 collaborazioni, conversione bassa ma autentica.
4. **YouTube italiani fitness** (anche 5k-50k iscritti): stesso modello, offri lifetime gratis per recensione video.
5. **Forum specializzati**: ProjectInvictus, BBHomePage, gruppi Telegram di palestra italiana.
6. **PostS personali**: il tuo network (palestra fisica), conoscenti che già usano l'app, amici amici degli amici. La crescita organica seria parte da qui.

### Canali da NON usare inizialmente

- **Google Ads / Meta Ads**: bruci budget senza creative ottimizzate e landing test. Aspetta dopo i primi 500 utenti.
- **App Store Optimization (ASO)**: non sei ancora negli store.
- **SEO long-tail**: ci vogliono 6+ mesi per vedere effetti. Da iniziare al lancio, non aspettare risultati subito.

### Contenuto evergreen per SEO

Quando hai 30 minuti, scrivi articoli (uno alla settimana) sul blog del marketing site su:
- "Come scegliere una scheda di forza" (long-tail)
- "MEV MAV MRV: cosa sono e come usarli"
- "Hevy vs Strong vs [Tempra]: confronto onesto da chi le ha provate"
- "Calisthenics e sala pesi insieme: la verità sulla compatibilità"
- "Come funziona il deload e quando farlo"

Punti di forza italiani per SEO: pochissimi contenuti italiani di qualità su questi argomenti. Battle ottenibile.

---

## 10. Roadmap 90 giorni go-to-market

### Settimane 1-2 — Naming e fondamenta

- [ ] Scegli nome (vedi sezione 1).
- [ ] Verifica disponibilità marchio su TMview e dominio.
- [ ] Compra dominio.
- [ ] Configura iubenda per ToS e Privacy.
- [ ] Apri partita IVA forfettaria (se non ce l'hai già) — pochi giorni di pratica.
- [ ] Setup Stripe account italiano.

### Settimane 3-4 — Backend minimo e Premium

- [ ] Mini-backend per Stripe webhook + entitlement check (Vercel Function + Upstash Redis).
- [ ] Aggiungi paywall nel codice GymTracker (vincoli su 3 schede free, 3 mesi storico).
- [ ] Pagina "Sblocca Premium" in app che apre Stripe Checkout.
- [ ] Magic-link email per verificare l'utente al primo avvio.
- [ ] Test end-to-end del flusso acquisto.

### Settimane 5-6 — Landing e marketing site

- [ ] Disegna landing HTML/Framer (sezione 8).
- [ ] Setup Sentry per error tracking.
- [ ] Setup Plausible per analytics.
- [ ] Scrivi 3-5 articoli evergreen (sezione 9).
- [ ] Configura DNS finale `tuonome.com` + `app.tuonome.com`.

### Settimane 7-8 — Soft launch (closed beta)

- [ ] Invia ai tuoi 5-10 conoscenti che già usano l'app: spiegagli che ora è in beta a pagamento, lifetime promo €19,99 per loro (founder pricing).
- [ ] Raccogli feedback intensivo. Itera bug fix.
- [ ] Posta su 1-2 community italiane (sezione 9) un "Cerco beta tester" con offerta lifetime promo.
- [ ] Target settimana 8: **30 utenti, almeno 5 paganti**.

### Settimane 9-10 — Launch pubblico

- [ ] Annuncio su 5-6 community italiane (Reddit, Facebook, gruppi Telegram).
- [ ] Contatti con 5-10 micro-influencer fitness italiani (lifetime gratuito + €50).
- [ ] Apri Discord o canale Telegram per la community.
- [ ] Lifetime promo "primi 100" pubblica.
- [ ] Target settimana 10: **100 utenti, 15-20 paganti** (€500-1000 di revenue).

### Settimane 11-12 — Iterazione e crescita

- [ ] Analizza chi paga vs chi resta free. Capisci il profilo del "willing to pay".
- [ ] Aggiungi 1-2 feature richieste insistentemente in feedback.
- [ ] Posta secondo articolo evergreen, ottimizza i primi per SEO.
- [ ] Pianifica le prossime feature dell'Onda 1 della roadmap strategica (RPE, plate calc).

### Mese 4-6 — Crescita organica

- [ ] Programma editoriale blog settimanale.
- [ ] Apertura App Store (PWA wrappata con PWABuilder o Capacitor) → setup RevenueCat per gestire IAP + web.
- [ ] Espansione lingue (inglese, spagnolo) se metriche lo giustificano.
- [ ] Considera Apple Watch companion.

### Target finanziario realistico

| Mese | Utenti tot | Paganti | MRR | LTM Revenue |
|---|---|---|---|---|
| 1 | 30 | 5 | €40 | €100 |
| 3 | 200 | 30 | €200 | €1k |
| 6 | 800 | 100 | €600 | €5k |
| 12 | 3k | 350 | €2k | €18k |

Non è "exit a 7 cifre". È un side-project che genera caffè e iPhone nuovi e un po' di indipendenza. Se ti diverte mantenerlo e gli utenti scalano, può crescere. Se no, è un'esperienza preziosa.

---

## Decisioni che devi prendere ora

Tre domande senza risposta sbagliata, ma che vanno decise prima di partire:

### 1. Nome e brand
Scegli entro 1-2 settimane. Tempra è un'opzione forte ma valutane 3-4 e fai un test rapido (chiedi a 10 persone fuori dalla tua bolla "se vedessi questo nome cosa penseresti?").

### 2. Single vs co-founder
Stai facendo tutto da solo? Considera se hai un amico tecnico/designer che vorrebbe entrare per il 20-30% del progetto in cambio di lavoro reale. Da solo è fattibile ma più lento e più solitario.

### 3. Side-project vs lavoro principale
Quanto tempo a settimana puoi davvero dedicare? Sotto le 8 ore/settimana, il go-to-market di 90 giorni si dilata a 6 mesi. Va bene, ma calibra le aspettative.

---

## Cosa NON fare

Ho visto troppe app di nicchia morire per le stesse ragioni. Da evitare:

1. **Iniziare con feature ambiziose tipo AI coach**. Il tuo MVP funziona già. Lancia, raccogli feedback, poi aggiungi.
2. **Lanciare su App Store/Play Store dal giorno 1**. Aspetta 3-6 mesi di PWA puro per validare. Apple/Google revisione + 30% cut + complessità di build = freeze enorme.
3. **Cercare investitori**. Non hai bisogno di capitali. Il bootstrap a €1-2k/mese MRR è realistico in 6-12 mesi.
4. **Comprare email list o fare cold outreach**. Bruci la reputazione del tuo brand prima ancora di averla.
5. **Espandere troppo presto la lingua**. Il pubblico italiano della tua nicchia non è ancora saturo. Domina quello prima.
6. **Ignorare il feedback negativo iniziale**. Le prime recensioni 1-star ti diranno cose preziose. Rispondi a tutte, anche con un grazie.

---

## Note finali

L'app tecnicamente è pronta. Il vero collo di bottiglia da ora in poi è **tu**: tempo, costanza, gestione di feedback dei primi utenti, e capacità di non perdere il focus su 1-2 feature alla volta.

Non saltare gli step. Il naming sembra una scemenza ma cambia tutto. La GDPR sembra noiosa ma è la differenza tra "side project" e "business serio". Stripe webhook sembrano un mal di testa ma sono 2 giorni di lavoro per anni di passive income.

Se ti perdi in uno step, fammi sapere. Posso aiutarti a:
- Scrivere il mini-backend Stripe (un weekend).
- Generare la landing HTML.
- Validare nome + payoff.
- Scrivere copy per i canali di acquisizione.

Buon lancio.
