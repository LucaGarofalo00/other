# PumpLog · Documenti di brand

Indice e definizione dei file di questa cartella. Per ogni documento: scopo, quando usarlo, stato.

PumpLog è un'app di tracking allenamento (pesi, calisthenics, cardio). I documenti qui dentro
sono asset di **brand & design system**, non documentazione di prodotto (quella vive in
`../PIANO_PRODOTTO.md`, `../MIGLIORAMENTI.md`, `../README.md`).

---

## Gerarchia

```
01 · FOUNDATION (chi siamo, come parliamo)
   └─ PumpLog Brand Voice Guide.html ← primario per copy/tono
   └─ PumpLog Style Guide One-Pager.html ← quick reference 1-pagina

02 · DESIGN SYSTEM (come appare)
   └─ PumpLog Color System.html
   └─ PumpLog Typography System.html
   └─ PumpLog Logo Concepts.html ← decisione pendente

03 · ASSET OPERATIVI (come comunichiamo)
   └─ PumpLog Instagram Templates.html
   └─ PumpLog Pitch Deck System.html
   └─ PumpLog Print Brief.html
```

---

## Single source of truth (token canonici)

Quando i documenti dicono cose diverse, **vince sempre il codice dell'app**
(`../index.html`, blocco `:root{}` in cima allo `<style>`).

| Token       | Valore       | Note                        |
|-------------|--------------|-----------------------------|
| `--acc`     | `#C8FF00`    | Lime · accento primario     |
| `--bg`      | `#0C0C0D`    | Sfondo near-black           |
| `--text`    | `#F0EFE8`    | Off-white · testo primario  |
| `--surf-1`  | `#161618`    | Surface elevation 1         |
| `--surf-2`  | `#202022`    | Surface elevation 2         |
| `--surf-3`  | `#2A2A2D`    | Surface elevation 3         |
| `--danger`  | `#EF4444`    | Errore                      |
| `--success` | `#22C55E`    | Positivo                    |
| `--warning` | `#F59E0B`    | Attenzione                  |
| Font display| Bebas Neue   | KPI, titoli grandi          |
| Font cond.  | Barlow Condensed | Label uppercase, badge  |
| Font body   | Barlow       | Testo corrente              |
| Font mono   | Roboto Mono  | Numeri, kg, reps, tempi     |

Token print-only (usati solo in `Print Brief`):
- `--paper` `#F4F1E8` · `--paper-ink` `#0C0C0D`

---

## I file, uno per uno

### 01 · Foundation

#### `PumpLog Brand Voice Guide.html`
Come PumpLog parla: 5 pillar di voce, glossario parole consentite/vietate, sample
pair SÌ/NO (in-app, landing, email, IG, LinkedIn, recensioni), checklist di pubblicazione.
- **Quando usarlo**: prima di scrivere qualsiasi copy nuovo (app, push, email, social).
- **Stato**: completo, ricco di esempi, font canonici. **Documento primario per voce + posizionamento.**

#### `PumpLog Style Guide One-Pager.html`
Cheat sheet 1-pagina: brand · colori · tipografia · logo · voce · regole visive.
Stampabile, da consegnare a freelance / agenzie in 30 secondi.
- **Quando usarlo**: briefing veloce, riferimento da tenere aperto mentre lavori.
- **Stato**: pulito, allineato (Bebas/Barlow/Roboto Mono). **Riferimento rapido primario.**

### 02 · Design system

#### `PumpLog Color System.html`
Sistema cromatico: scheda dettagliata di ogni colore, matrice contrasto WCAG, anti-pattern.
- **Quando usarlo**: scegliere combinazioni, verificare accessibilità, debug colori.
- **Stato**: contenuti eccellenti, **ma font del documento sono Space Grotesk/JetBrains/Newsreader
  invece dei canonici Bebas/Barlow/Roboto Mono**. Da rifattorizzare al primo refresh.

#### `PumpLog Typography System.html`
Approfondimento font: specimen per Bebas Neue, Barlow, Barlow Condensed, Roboto Mono.
Scala dimensionale, strategie di enfasi, pairing.
- **Quando usarlo**: definire nuove gerarchie, validare uso dei font.
- **Stato**: completo, coerente con l'app. **Documento primario per tipografia.**

#### `PumpLog Logo Concepts.html`
Tre concept esplorativi: **Operator** · **Ferro** · **Tally**.
- **Quando usarlo**: scegliere il logo finale (decisione **pendente**).
- **Stato**: brief per designer + AI prompt per ogni concept. Quando si decide, creare
  un file `PumpLog Logo Final.html` separato.

### 03 · Asset operativi

#### `PumpLog Instagram Templates.html`
Cinque template IG (educativo, product, statistico, quote, carousel) con preview 1:1 e 4:5.
- **Quando usarlo**: creare post IG senza ripartire da zero.
- **Stato**: completo visivamente. Mancano: export PNG pronti (1080×1080, 1080×1350).

#### `PumpLog Pitch Deck System.html`
Sistema slide 16:9: 10 layout (cover, problem, solution, product, market, pricing,
traction, team, ask, thank you). Componenti slide riusabili.
- **Quando usarlo**: preparare pitch a investor, partner, sponsor.
- **Stato**: scaffold pronto. **Contenuti reali da inserire** (numeri, claims, screenshots).

#### `PumpLog Print Brief.html`
Specifiche stampa: biglietto da visita (front/back, 2 layout), letterhead, specifiche per
tipografia. Introduce token print-only.
- **Quando usarlo**: commissionare stampe (business card, lettere, busta).
- **Stato**: brief completo. Manca: file letterhead editabile (PDF/AI) consegnabile alla stampa.

---

## Cosa è stato rimosso (e perché)

- **PumpLog Brand Book.html** — sovrapposto a Voice Guide su tono/lessico, usava font non
  canonici (Space Grotesk / JetBrains / Newsreader) e li raccomandava come display/dati
  ufficiali — contraddicendo l'app. Il contenuto strategico vivo (posizionamento, valori,
  anti-valori) è coperto dal Voice Guide e dal One-Pager.
- **PumpLog Brand Style Guide.html** — duplicato del `Style Guide One-Pager.html` con
  layout meno raffinato.
- **tweaks-panel.jsx** — libreria React per "edit mode" interattivo nei prototipi, default
  beige (`#FAFAF7`/`#29261B`) di un altro progetto, non token PumpLog. Utility dev, non
  brand asset — non c'entra in questa cartella.

---

## Coerenza con l'app — verificata

Allineamento dei claim chiave tra documenti brand e codice (`../index.html`) al 2026-05-16:

| Claim documenti                    | Stato app                                                   |
|------------------------------------|-------------------------------------------------------------|
| MEV/MAV/MRV come framework volume  | ✓ usato in Home + Stats con range Schoenfeld/Israetel       |
| RPE, e1RM, tonnellaggio            | ✓ presenti in scheda esercizio e log                        |
| Tre discipline: pesi, cal, cardio  | ✓ aggiornato — il cardio (spinning, bici, corsa, vogatore…) contribuisce ai gruppi muscolari via durata × intensità |
| Offline-first                      | ✓ PWA con service worker (`../sw.js`)                       |
| Gratis                             | ✓ nessun paywall né pricing in app                          |
| Zero social                        | ✓ nessuna feature social/feed                               |

Note: i documenti precedenti dicevano "pesi e calisthenics" — corretto in
"pesi, calisthenics e cardio" su Voice Guide, One-Pager, Pitch Deck.

---

## Link mobile (GitHub Pages)

I documenti sono serviti su GitHub Pages (branch `database`) a:
**https://lucagarofalo00.github.io/other/documenti-brand/**

Apri questi link dal telefono — funzionano in qualsiasi browser mobile:

- [Brand Voice Guide](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Brand%20Voice%20Guide.html)
- [Style Guide One-Pager](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Style%20Guide%20One-Pager.html)
- [Color System](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Color%20System.html)
- [Typography System](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Typography%20System.html)
- [Logo Concepts](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Logo%20Concepts.html)
- [Instagram Templates](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Instagram%20Templates.html)
- [Pitch Deck System](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Pitch%20Deck%20System.html)
- [Print Brief](https://lucagarofalo00.github.io/other/documenti-brand/PumpLog%20Print%20Brief.html)
- [README (questo file)](https://github.com/LucaGarofalo00/other/blob/database/documenti-brand/README.md)

⚠️ Dopo ogni modifica locale serve `git push` perché i link riflettano la versione aggiornata
(Pages serve dal branch remoto, non dal file locale). Il deploy è quasi immediato.

---

## Convenzioni per nuovi file

- Nome: `PumpLog <Nome>.html` (PascalCase con spazi, prefisso brand)
- Token: sempre quelli canonici della SSOT qui sopra
- Aggiorna questo README (scheda + link mobile) quando aggiungi/rimuovi un file
- Asset operativi: includi anche export pronti all'uso (PDF/PNG)
