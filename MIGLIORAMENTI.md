# GymTracker — Miglioramenti applicati (v1.5.1)

Documento di riferimento delle modifiche applicate all'app GymTracker. Le sezioni sono divise in **Fatte** (già nel codice) e **Da fare** (rimane lavoro manuale o decisioni da prendere).

---

## 🟢 Cosa è stato fatto

### A. Fix critici (qualità tecnica) — v1.5.1

#### ✅ A1-fix — Timer di recupero che non partiva
**Problema (v1.5.0):** la `useEffect` del tick aveva dep array `[tmr ? (tmr.endsAt || 0) : 0]`. Quando il timer veniva creato con `setTmr({s, max, label})` (senza `endsAt`), la dep restava `0` come quando `tmr` era `null` — React non ri-eseguiva l'effect e l'inizializzazione di `endsAt`/`setInterval` non avveniva mai.

**Soluzione:**
- Estratto hook `useRestTimer()` → `[tmr, startRest, stopRest]`, condiviso fra `PesiLive` e `CalLive` (prima duplicato).
- `startRest(seconds, label)` imposta `endsAt` direttamente al momento del set, così la dep `[tmr && tmr.endsAt]` cambia (`null → timestamp`) e il tick parte subito.
- `stopRest()` racchiude `setTmr(null) + cancelTimerNotify()` (prima lo skip della TimerBar non cancellava la notifica SW programmata).
- Rimossi gli `setTimeout(..., 50)` in `setOk` / `setWarmFatto` che servivano solo a leggere lo stato pre-update; ora si usa una semplice variabile `willCheck`/`willMark` calcolata prima del `setEs`.

### A. Fix critici (qualità tecnica) — v1.4.0

#### ✅ A1 — Timer di recupero affidabile
**Problema:** `setInterval(..., 1000)` veniva throttlato/fermato quando l'utente bloccava lo schermo o cambiava app.

**Soluzione:**
- Timer ancorato a `Date.now()` con `endsAt` salvato nello stato.
- Listener `visibilitychange`: al ritorno foreground, ricalcola subito.
- Tick ogni 500ms per fluidità + tick immediato.
- WebAudio beep al termine.

#### ✅ A1-bis — Notifiche push via Service Worker
- L'app dice al SW "manda una notifica fra X secondi".
- Sopravvive a schermo bloccato/app chiusa.
- `notificationclick` riapre l'app.

#### ✅ A2 — Wake Lock API
Hook `useWakeLock(active)` in `PesiLive` e `CalLive`. Schermo non si spegne. Riacquisizione automatica al rientro foreground.

#### ✅ A3 — ErrorBoundary funzionante
Vera class component. UI di fallback + bottone "Ricarica app" + messaggio errore.

#### ✅ A4 — Onboarding pulito con scelta template
- Rimossa scheda hardcoded "Luca Garofalo".
- `window.SCHEDE_TEMPLATES`: **Inizia da zero**, **Full Body 3 giorni**, **Push/Pull/Legs**, **Calisthenics base**.
- `ProfileSetup` wizard a 2 step.

#### ✅ A5 — Input numerici mobile-friendly
Tutti i campi peso/reps/durata:
- `type="text"` + `inputMode="decimal"/numeric"` + `pattern`.
- Autoselect al focus.
- Empty quando valore è 0.
- Virgola e punto come separatore.

#### ✅ A6 — Haptic feedback
`hap(pattern)` con `navigator.vibrate`. In: toggle serie, avanzamento, fine sessione, PR, timer finito, nav, opzioni.

### B. UX di funzioni esistenti

#### ✅ B5 — Duplica scheda (v1.4.0)
Pulsante accanto a Attiva/Elimina. Copia parte disattivata con nome `"originale (copia)"`.

#### ✅ B6 — Picker pesi+cal in NuovaScheda (v1.4.0)
`PESI_ES.concat(CAL_ES)`: schede PT possono includere calisthenics.

#### ✅ B10 — Toast Undo (v1.4.0)
"Sessione eliminata · ANNULLA" per 5 secondi. Combinato con soft-delete in v1.5.0.

#### ✅ B2 — Stats con volume per gruppo + MEV/MAV/MRV (v1.5.0)
- Aggrega serie completate per gruppo (Petto, Schiena, Gambe, Spalle, Braccia, Core).
- Normalizza al settimanale rispetto al range selezionato.
- Barre con 4 zone colorate: grigio (sotto MEV) → verde (ottimale) → giallo (vicino MRV) → rosso (oltre).
- Range Schoenfeld+Israetel: `Petto 10/18/22`, `Schiena 10/20/25`, `Gambe 8/18/25`, ecc.
- Indicatori numerici MEV/MAV/MRV sotto la barra.
- Etichetta di stato ("ottimale per crescita", "vicino al limite").

**Inoltre:** delta vs periodo precedente sulle KPI ("+15%" volume, "+2" sessioni). Verde se positivo, rosso se negativo.

#### ✅ B4 — Log con ricerca, filtri, raggruppamento (v1.5.0)
- Barra ricerca: cerca su nome scheda, esercizi, note sessione.
- Pillole filtro: Tutto · Pesi · Cal · 7g · 30g.
- Raggruppamento per settimana: "Questa settimana", "Settimana scorsa", o intervallo date.
- Messaggio chiaro se filtri = 0 risultati.

#### ✅ B9 — Sync conflict resolution (v1.5.0)
**Problema:** modifiche offline simultanee su più device → l'ultimo sync vince, dati persi.

**Soluzione:**
- Ogni record ha `lastModified: Date.now()`.
- Cancellazione = **tombstone** (`{deleted: true, deletedAt}`), non rimozione fisica.
- `loadFromGist` fa merge per `id` tenendo il più recente.
- Tombstone più vecchi di 30 giorni vengono ripuliti.
- Le viste usano `liveRecords()` che filtra i tombstone.

Helper: `touchRecord`, `touchAll`, `softDelete`, `liveRecords`, `pruneTombstones`, `mergeRecords`, `mergeData`, `pickNewer`.

### C. Design system e estetica

#### ✅ C1 — Token system CSS completo (v1.4.0)
CSS variables per colori, spacing scale (sp-1 → sp-7), radius scale (sm → xl), font tokens, semantic colors.

#### ✅ C3 — Hover/focus/active states globali (v1.4.0)
`button:active { transform: scale(0.96); }` + `:focus-visible` outline + transizioni.

#### ✅ C4 — Tap target ≥ 44×44px (v1.4.0)
Pulsanti icona sotto soglia aumentati. Aria-label dove serviva. HIG compliant.

#### ✅ C12 — Animazione PR battuto (v1.4.0)
Overlay celebrativo lime + bounce-back animation + vibrazione + `CustomEvent` dispatch. Detection con anti-double-fire.

#### ✅ C5 — Splash distintivo (v1.5.0)
Sostituito dumbbell con:
- Wordmark "**GT**" Bebas Neue 96px (G bianco, T lime).
- Barra caricamento animata sotto le lettere.
- "GYMTRACKER" in caps tracking espanso.
- Tagline: "L'allenamento, davvero tracciato."

#### ✅ C7 — Empty states caldi (v1.5.0)
Tutti gli "Nessun dato..." asettici sostituiti:
- **Stats**: "📊 Ancora nulla qui · I tuoi numeri appariranno dopo la prima sessione. [Allena ora →]"
- **Log**: "📒 Nessun allenamento ancora · Tutti i tuoi allenamenti finiranno qui. [Allena ora →]"
- **Schede**: "📋 Nessuna scheda ancora · Crea la prima o parti da un template. [+ Crea scheda]"

### Helper riusabili aggiunti

| Funzione | Cosa fa |
|---|---|
| `hap(pattern)` | Haptic vibration safe |
| `notifyTimer(s, label)` / `cancelTimerNotify()` | Notifiche timer via SW |
| `ensureNotifPermission()` | Richiede permesso notifiche una sola volta |
| `useWakeLock(active)` | Hook schermo acceso |
| `e1RM(peso, reps)` | 1RM Epley |
| `findBestSerie(esNome, sessions)` | Miglior volume e e1RM mai fatto |
| `markPRShown` / `wasPRShownRecently` | Dedup PR |
| `window.applyTemplate(id)` | Schede da template |
| `touchRecord(r)` | Aggiunge `lastModified` |
| `softDelete(arr, id)` | Tombstone |
| `liveRecords(arr)` | Filtra tombstone |
| `mergeRecords(local, remote)` | Merge per id+lastModified |
| `mergeData(local, remote)` | Merge completo |

---

## 🟡 Da valutare / fare manualmente

### B1 — Home Streak più espressiva
Oggi: solo numero. Suggerito: icona 🔥 + trend "+2 vs settimana scorsa". ~10 righe in `Home`.

### B3 — PesiBlocks: card per blocco
Oggi tutti i blocchi appiattiti. Suggerito: card per blocco con preview esercizi e possibilità di fare solo un blocco. Refactor medio.

### B7 — Picker filtri per gruppo muscolare
Richiede convertire `PESI_ES`/`CAL_ES` da array di stringhe a oggetti `{n, gr, eq}`. Cambio di tipo invasivo da testare bene.

### B8 — RPE per serie + e1RM Tuchscherer
`e1RM(peso, reps)` Epley c'è. Per RPE: aggiungere campo `rpe`, tabella Tuchscherer, selettore 6-10. Feature Onda 1 della roadmap.

### B11 — Memoization SerieRow con React.memo
Solo se >30 esercizi per sessione iniziano a laggare.

### C2 — Numeri tabulari ovunque
Globale già applicato. Manca verificare numeri Bebas Neue grandi.

### C6 — TimerBar overlay protagonista
Oggi piccola fascia in alto. Suggerito: overlay flottante a fondo con numero grosso, progress bar grande, "salta" visibile.

### C8 — Riduci font caricati
Da 5 famiglie/varianti a 3. Velocizza ~150ms first load.

### C9 — Mood 3 step invece di 5
`[Dura/Bene/Top]` più rapido di 5 emoji ambigue.

### C10 — Bottom nav con FAB centrale
4 tab + FAB lime al centro → menu Sala pesi / Calisthenics / Solo timer.

### C11 — Dark soft e light mode
`@media (prefers-color-scheme: light)` con token alternativi. Con design system in place, è solo un blocco CSS aggiuntivo.

---

## 🔵 Versione e deploy

**SW** → `gymtracker-v1.5.1`. Gli utenti esistenti ricevono l'update alla prossima apertura.

### Test consigliato prima di deploy

**Critical path:**
1. **Onboarding** in incognito → wizard → template → schede create.
2. **Timer**: sessione → blocca schermo 60s → sblocca → timer corretto.
3. **Notifica**: schermo bloccato durante timer → notifica push.
4. **Wake lock**: posa telefono in sessione → schermo acceso.
5. **Input**: tap campo peso → tastiera decimal italiana → autoselect.
6. **Undo**: elimina sessione → ANNULLA entro 5s → ripristino.

**Sync (B9):**
7. Modifica sessione su device A, modifica stessa su device B offline, vai online → verifica che il più recente vinca.
8. Elimina su A → vai online su B → B la marca cancellata (tombstone propagato).

**Stats (B2):**
9. 2-3 sessioni con esercizi diversi → Stats → barre MEV/MAV/MRV colorate.
10. Lo stesso gruppo molte volte → barra diventa gialla/rossa.

**Log (B4):**
11. Cerca per esercizio.
12. Filtra Cal/Pesi + ricerca insieme.
13. Verifica raggruppamento "Questa settimana" / "Settimana scorsa".

**Estetica:**
14. Apri app → splash con wordmark "GT" + barra animata.
15. Stats/Log/Schede vuoti → empty states con emoji + CTA.

### Note operative
- Notifiche richiedono **HTTPS** (GitHub Pages OK).
- iOS: PWA da Safari.
- Il merge è additive ma sostitutivo a livello record: modifica granulare di un campo sostituisce tutto il record. Per granularità campo-per-campo servirebbe CRDT.

---

## 📦 File

| File | Dimensione | Versione |
|---|---|---|
| `index.html` | ~155 KB | v1.5.1 |
| `sw.js` | ~4.3 KB | gymtracker-v1.5.1 |
| `manifest.webmanifest` | 0.9 KB | invariato |
| `MIGLIORAMENTI.md` | questo file | v1.5.1 |
| `PIANO_PRODOTTO.md` | nuovo | branding/pricing/deploy |

---

## 🎯 Cosa hai guadagnato (totale dopo v1.5.0)

| Categoria | Prima | Dopo |
|---|---|---|
| **Affidabilità** | Timer rotto a schermo bloccato | Timer + notifica push |
| | Schermo si spegne | Wake Lock |
| | Crash → schermata bianca | ErrorBoundary recovery |
| | Sync sovrascrive dati | Merge per `lastModified` |
| | Cancellazioni non si propagano | Tombstone TTL 30g |
| **Mobile UX** | Tastiera testuale per peso | Decimal con virgola |
| | "0" forzato | Empty + autoselect |
| | Niente haptic | Pattern haptic curati |
| | Tap 32-38px | 44px minimo |
| **Onboarding** | Scheda hardcoded | Wizard + 4 template |
| **Dati** | Niente celebration PR | Overlay + vibrazione |
| | Delete = perso | Undo 5s |
| | No duplica scheda | Pulsante duplica |
| | PT no calisthenics | Picker unificato |
| **Analytics** | Numeri secchi | Delta vs periodo precedente |
| | No volume per gruppo | Barre MEV/MAV/MRV |
| **Storico** | Lista piatta | Ricerca + filtri + settimane |
| **Estetica** | Tokens scollegati | CSS variables coerenti |
| | No feedback bottoni | Hover/focus/active |
| | "Nessun dato" freddo | Empty caldi + CTA |
| | Logo dumbbell generico | Wordmark GT distintivo |

L'app è ora **a livello di product market** per la tua nicchia. Le feature della roadmap strategica (RPE, plate calculator, body tracking, AI coach) sono il passo successivo per giustificare pricing premium.
