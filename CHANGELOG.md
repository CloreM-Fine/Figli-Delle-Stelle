# 📝 Registro Modifiche - Figli delle Stelle

> **Ciao!** Questo è il registro dove tengo traccia di tutte le modifiche che faccio al sito. Lo uso per ricordare cosa ho cambiato e quando, così se qualcuno (o io stesso tra qualche mese) dovesse chiedere "ma perché l'hai fatto così?", ho tutto scritto qui.

---

## 📅 Marzo 2026

### 17 Marzo 2026 - Creazione del registro

**Cosa ho fatto:**
Ho creato questo file per tener traccia di tutte le modifiche future al progetto. Prima non avevo un sistema per documentare i cambiamenti e spesso mi dimenticavo cosa avevo modificato e perché.

**Perché l'ho fatto:**
Perché sto lavorando con Claude (l'assistente AI) a diverse modifiche del sito e voglio avere uno storico chiaro di tutto quello che facciamo. Così se tra qualche mese qualcosa non funziona, posso tornare indietro e capire cosa è successo.

**File coinvolti:**
- `CHANGELOG.md` (nuovo file)

**Note per il futuro:**
Ogni volta che facciamo una modifica significativa, la scriviamo qui con:
- La data
- Cosa abbiamo cambiato
- Perché l'abbiamo cambiato
- Quali file sono stati toccati
- Eventuali problemi o cose da ricordare

---

## 🗓️ Prossime modifiche in programma

Questa sezione la uso per appuntarmi cosa voglio fare nei prossimi giorni/settimane:

- [x] ~~Creare componenti separati per header e footer~~ ✅ FATTO
- [ ] Ottimizzare le immagini (sono troppo pesanti)
- [ ] Sistemare il carosello su mobile
- [ ] Aggiungere i nomi dei DJ nel lineup
- [ ] Controllare che il form WhatsApp funzioni bene

---

### 17 Marzo 2026 - Componenti Header e Footer separati

**Cosa ho fatto:**
Ho estratto l'header (navbar) e il footer da entrambe le pagine e li ho messi in file separati nella cartella `components/`. Ora ho:
- `components/header.html` - La navbar con logo e menu
- `components/footer.html` - Il footer con contatti e link
- `js/components.js` - Script che carica i componenti dinamicamente

**Perché l'ho fatto:**
Perché ogni volta che dovevo modificare un link nel menu o nel footer, dovevo cambiarlo in entrambe le pagine (index.html e evento-pasquetta.html). Rischiavo di dimenticarmi di aggiornare una delle due. Così invece modifico solo un file e le modifiche si riflettono automaticamente su tutte le pagine.

**Come funziona ora:**
1. Nelle pagine HTML ho messo dei contenitori vuoti: `<div id="header-container"></div>` e `<div id="footer-container"></div>`
2. Lo script `components.js` carica via AJAX i file HTML dei componenti
3. Ogni pagina chiama `Components.init()` con le proprie opzioni (es. per evidenziare il link corretto nel menu)
4. La navigazione mobile viene reinizializzata automaticamente dopo il caricamento

**File coinvolti:**
- `components/header.html` - Nuovo componente navbar
- `components/footer.html` - Nuovo componente footer (gestisce sia home che pagine evento)
- `js/components.js` - Script per caricare i componenti
- `index.html` - Rimosse navbar e footer inline, aggiunti contenitori e script di inizializzazione
- `evento-pasquetta.html` - Stesse modifiche di index.html

**Problemi riscontrati:**
Le due pagine avevano piccole differenze nel menu (la pagina evento ha "Prenota" al posto di "Gallery") e nel footer (la pagina evento mostra info evento al posto dei contatti generici). Ho risolto mettendo entrambe le versioni nel componente footer e mostrando/nascondendo quella giusta via JavaScript in base alla pagina.

**Test effettuati:**
- [ ] Mobile
- [ ] Tablet  
- [ ] Desktop
- [ ] Verificare che i link funzionino correttamente
- [ ] Verificare che il menu mobile si apra/chiuda

---

### 17 Marzo 2026 - Footer centrato

**Cosa ho fatto:**
Nel componente footer ho aggiunto degli stili inline per centrare il logo in alto e la descrizione dei contatti. Prima erano allineati a sinistra, ora sono centrati nella colonna.

**File coinvolti:**
- `components/footer.html` - Aggiunti stili inline per centrare logo, testo e social icons

**Modifiche specifiche:**
- `footer-brand`: `text-align: center`
- `footer-logo`: `margin: 0 auto 15px auto; display: block`
- Testo descrizione: `text-align: center`
- `social-links`: `justify-content: center`

---

### 17 Marzo 2026 - Allargato container eventi per animazione card

**Cosa ho fatto:**
Ho modificato il CSS della sezione eventi (`.events-horizontal`) per dare più spazio alle card quando fanno l'animazione di hover/ingrandimento. Prima la card si ingrandiva ma veniva tagliata dai bordi del container, ora ha abbastanza spazio per espandersi senza essere tagliata.

**File coinvolti:**
- `css/home.css` - Modificata la classe `.events-horizontal`

**Modifiche specifiche:**
- Rimosso `overflow-x: auto` che tagliava l'animazione delle card
- Cambiato in `flex-wrap: wrap` e `justify-content: center` per layout responsive
- Aumentato `padding` a `40px 30px` per dare spazio all'animazione hover
- Aggiunto `min-width: 320px` e `max-width: 320px` alle card per mantenere dimensione fissa

---

### 17 Marzo 2026 - Configurato deploy automatico GitHub Actions → SiteGround

**Cosa ho fatto:**
Ho creato il workflow GitHub Actions per fare il deploy automatico del sito su SiteGround via FTP ogni volta che faccio push sul branch `main`.

**File coinvolti:**
- `.github/workflows/deploy.yml` - Nuovo file workflow

**Configurazione:**
- Trigger: push su branch `main` o esecuzione manuale (`workflow_dispatch`)
- Server FTP: preso da `secrets.FTP_SERVER`
- Username/Password: da `secrets.FTP_USERNAME` e `secrets.FTP_PASSWORD`
- **IMPORTANTE**: `server-dir: /public_html/` → deploy diretto nella root, senza creare sottocartelle
- File esclusi dal deploy:
  - `.git*`, `node_modules/`, `.DS_Store`
  - File di test (`test-*.png`)
  - File di sviluppo (`screenshot.js`, `AGENTS.md`, `CHANGELOG.md`, `README.md`)

**Come funziona:**
1. Faccio modifiche in locale
2. Commit e push su GitHub
3. GitHub Actions parte automaticamente
4. Carica tutti i file via FTP su SiteGround in `/public_html/`
5. Il sito è aggiornato!

---

### 20 Marzo 2026 - Convertite tutte le immagini in WebP

**Cosa ho fatto:**
Ho convertito tutte le immagini del sito dal formato JPG/PNG a WebP per migliorare le performance di caricamento. Il formato WebP offre una compressione migliore mantenendo la stessa qualità visiva.

**File coinvolti:**
- Tutte le immagini in `assets/images/` convertite da .jpg/.png a .webp
- `index.html` - Aggiornati tutti i riferimenti nel carosello (12 immagini)

**Modifiche specifiche:**
- Sostituite 26 immagini (.jpg/.png) con equivalenti .webp
- Aggiornati i path in index.html da `.jpg` a `.webp`
- Rimossi file di test delle card non più necessari

**Vantaggi:**
- File più leggeri (fino al 50% di riduzione)
- Caricamento pagina più veloce
- Migliore SEO (Core Web Vitals)

---

**Note per dopo:**
- Se aggiungo altre pagine, devo ricordarmi di:
  1. Aggiungere `<div id="header-container"></div>` e `<div id="footer-container"></div>`
  2. Includere `<script src="js/components.js"></script>`
  3. Chiamare `Components.init()` con le opzioni appropriate
- I componenti usano fetch API, quindi servono un server locale (non funziona aprendo il file direttamente con `file://`)

---

## 📋 Template per nuove modifiche

Quando aggiungo una nuova modifica, copio questo template e lo compilo:

```markdown
### [DATA] - [TITOLO BREVE]

**Cosa ho fatto:**
[Descrivi in modo semplice cosa hai cambiato]

**Perché l'ho fatto:**
[Spiega il motivo della modifica - utile per capire se serve rollback]

**Come funziona ora:**
[Se necessario, spiega il nuovo funzionamento]

**File coinvolti:**
- `file1` - [cosa hai cambiato]
- `file2` - [cosa hai cambiato]

**Problemi riscontrati:**
[Se hai avuto difficoltà, scrivile qui per non rifare gli stessi errori]

**Test effettuati:**
- [ ] Mobile
- [ ] Tablet  
- [ ] Desktop
- [ ] Browser diversi (Chrome, Safari, Firefox)

**Note per dopo:**
[Qualsiasi cosa da ricordare per modifiche future]
```

---

## 🏷️ Convenzioni usate

Per tenere tutto ordinato, uso queste etichette nei titoli:

- 🐛 **BUGFIX** - Ho corretto un bug o un problema
- ✨ **FEATURE** - Ho aggiunto qualcosa di nuovo
- 🎨 **DESIGN** - Ho modificato lo stile/grafica
- ⚡ **PERF** - Ottimizzazione performance
- 🔧 **CONFIG** - Cambiamenti di configurazione
- 📝 **DOCS** - Solo documentazione

---

## 📞 Contatti utili

Se qualcuno (me incluso) ha domande sulle modifiche:

- **Sviluppo:** Fatto con Claude AI
- **Repo:** GitHub (da configurare se serve)
- **Hosting:** SiteGround (FTP)
- **WhatsApp prenotazioni:** +39 345 068 8943

---

*Ultimo aggiornamento: 17 Marzo 2026*
*Prossimo controllo: Da definire*
