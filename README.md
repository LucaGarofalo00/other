# GymTracker PWA

App di tracking allenamenti (sala pesi + calisthenics) come Progressive Web App,
installabile su iPhone/Android dal browser senza passare per gli app store.

## 📁 Struttura

```
gymtracker-pwa/
├── index.html               ← app (HTML + CSS + React in unico file)
├── manifest.webmanifest     ← manifest PWA (nome, icone, colori)
├── sw.js                    ← service worker (offline-first)
├── icons/                   ← 16 icone in tutte le dimensioni richieste
│   ├── icon-{16..1024}.png
│   ├── icon-maskable-{192,512}.png
│   ├── apple-touch-icon.png
│   ├── favicon-{16,32}.png
│   └── icon-master.svg      ← sorgente vettoriale (per future modifiche)
└── README.md                ← questo file
```

---

## 🚀 Pubblicare su GitHub Pages

### 1. Crea il repository

Su [github.com](https://github.com) → **New repository** →
- Nome: ad esempio `gymtracker` (oppure qualunque nome tu preferisca)
- Visibilità: **Public** (richiesta per il piano gratuito di GitHub Pages)
- ❌ Non spuntare "Add README" / "Add .gitignore"

### 2. Carica i file

**Modalità A — via interfaccia web (più semplice):**
1. Apri il repo appena creato
2. Click su **uploading an existing file**
3. Trascina tutta la cartella `gymtracker-pwa/` (contenuto, non la cartella stessa)
4. Commit message: `Initial deploy`
5. **Commit changes**

**Modalità B — via git (terminale):**
```bash
cd gymtracker-pwa
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/TUOUSERNAME/gymtracker.git
git push -u origin main
```

### 3. Attiva GitHub Pages

Nel repo → **Settings** → **Pages** (menu a sinistra) →
- **Source:** Deploy from a branch
- **Branch:** `main` · cartella `/ (root)`
- **Save**

Dopo 30–60 secondi GitHub ti darà l'URL:
```
https://TUOUSERNAME.github.io/gymtracker/
```

### 4. Verifica

Apri quell'URL nel browser. Dovresti vedere lo splash screen lime su nero e poi l'app.

> ⚠️ HTTPS è obbligatorio per il service worker. GitHub Pages lo fornisce automaticamente — non devi fare nulla di più.

---

## 📱 Installare su iPhone

1. Apri il link **in Safari** (non Chrome, su iOS solo Safari supporta l'installazione PWA)
2. Tocca il pulsante **Condividi** (quadrato con freccia in basso)
3. Scorri il menu e tocca **"Aggiungi a Home"**
4. Conferma il nome (`GymTracker`) e tocca **Aggiungi**
5. L'icona appare sulla home come una vera app

Al primo avvio offline l'app funziona perché il service worker ha già messo in cache tutto.

## 🤖 Installare su Android

Apri l'URL in Chrome → un banner appare in basso "Aggiungi GymTracker alla schermata Home" → tocca → conferma.

Se il banner non appare: menu ⋮ in alto a destra → "Installa app" / "Aggiungi a schermata Home".

---

## 🔧 Configurare la sincronizzazione

Dopo l'installazione, apri l'app, vai in **Impostazioni** e configura:

1. **GitHub Personal Access Token** — crealo qui:
   - [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)**
   - Scope necessari: `gist` (per la sync) + `repo` (per i PDF report)
   - Scadenza: a piacere (90 giorni o "No expiration" se preferisci)
   - Copia il token (inizia con `ghp_`) e incollalo in Impostazioni
2. **Repository PDF** (opzionale) — `tuousername/nome-repo` per archiviare i report PDF su un repository GitHub privato. Puoi crearne uno apposito (es. `gymtracker-data`, privato).

Con questi due valori configurati, dati e PDF si sincronizzano automaticamente fra dispositivi diversi (es. iPhone + iPad + browser desktop) tutti collegati allo stesso account GitHub.

---

## 🔄 Aggiornamenti futuri

Quando modifichi `index.html` o altri file:

1. Carica il nuovo `index.html` su GitHub (sostituendo il vecchio)
2. Modifica `sw.js` cambiando questa riga in alto:
   ```js
   const CACHE_VERSION = 'gymtracker-v1.0.0';  // → bump a v1.0.1, v1.1.0, ecc.
   ```
3. Carica anche `sw.js` aggiornato
4. La prossima volta che apri l'app installata sul telefono, il nuovo service worker viene scaricato, e all'avvio successivo l'app userà la versione aggiornata.

Bump del numero versione: l'app non riprende automaticamente i cambiamenti — è una scelta voluta per stabilità. Cambiando CACHE_VERSION forzi l'invalidazione della cache.

---

## 🔐 Privacy

Tutti i dati restano:
- in `localStorage` del browser (offline)
- nei tuoi **Gist** privati GitHub (sync, se configurata)
- nel tuo **repository** GitHub (PDF report, se configurato)

Nessun dato passa per server terzi. Niente analytics, niente tracker. L'unica connessione esterna è verso le API di GitHub (per la tua sync personale) e i CDN per React e i font Google.

---

## 🛠 Troubleshooting

**L'app non si installa su iPhone**: assicurati di aprire l'URL in **Safari**, non Chrome o altri browser. Su iOS l'installazione PWA funziona solo da Safari.

**Schermata bianca dopo l'apertura**: controlla la console del browser (Safari → Sviluppa → tuoiPhone) per errori. Spesso è un problema di rete al primo caricamento — chiudi e riapri.

**"Sync errore" sempre**: il token GitHub è scaduto o non ha lo scope `gist`. Generane uno nuovo.

**I PDF non si caricano**: serve sia il token (scope `repo`) sia il nome del repository nel formato `username/nome-repo`. Il repo deve esistere già su GitHub (può essere privato).

**Voglio resettare l'app**: dalle impostazioni iOS → Safari → "Cancella dati siti web" oppure disinstalla l'app dalla home (touch+hold → rimuovi).

---

## 📋 Prossimi passi (opzionali)

Quando avrai accesso a un Mac e vorrai distribuire via **TestFlight** (gli amici installano una vera app, non un'icona web):

1. Iscriviti all'Apple Developer Program ($99/anno)
2. Vai su [pwabuilder.com](https://www.pwabuilder.com/) → incolla l'URL GitHub Pages → genera il pacchetto iOS
3. Apri il pacchetto in Xcode sul Mac, firma con il tuo account, carica su App Store Connect
4. Configura TestFlight con link pubblico → invialo agli amici

La PWA che hai pubblicato ora è già il primo step di questo percorso.
