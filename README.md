# 🌟 Pasquetta 2026 - Figli delle Stelle

Landing page moderna e "wow" per l'evento di Pasquetta al Caffè delle Mura - Lucca.

## 📁 Struttura Cartelle

```
pasquetta-figli-delle-stelle/
├── index.html              # Pagina principale
├── css/
│   └── style.css          # Stili principali
├── js/
│   └── main.js            # JavaScript interattivo
├── assets/
│   ├── images/
│   │   └── logo.svg       # Logo SVG
│   └── fonts/             # (per font personalizzati)
└── README.md              # Questo file
```

## 🎨 Personalizzazione Facile

### 1. Cambiare i Colori

Apri `css/style.css` e modifica le variabili CSS all'inizio del file:

```css
:root {
    --color-accent: #d4af37;        /* Oro - cambia con il tuo colore */
    --color-accent-light: #f4d03f;  /* Oro chiaro */
    --color-bg: #0a0a0a;            /* Sfondo nero */
}
```

### 2. Modificare i Prezzi

Apri `js/main.js` e cerca:

```javascript
const prices = {
    'pranzo': 20,
    'dopo-pranzo': 10,
    'full': 28
};
```

### 3. Cambiare la Data

In `index.html`, cerca e modifica:

```html
<span>Lunedì 6 Aprile 2026</span>
```

### 4. Aggiungere un Link WhatsApp per le Prenotazioni

In `js/main.js`, sostituisci la funzione `simulateSubmission` con:

```javascript
function simulateSubmission(data) {
    const phone = "39XXXXXXXXXX"; // Tuo numero WhatsApp
    const message = `Nuova prenotazione!\nNome: ${data.nome}\nTelefono: ${data.telefono}\nPersone: ${data.persone}\nPacchetto: ${data.pacchetto}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    return Promise.resolve({ success: true });
}
```

### 5. Cambiare il Logo

Sostituisci `assets/images/logo.svg` con il tuo logo (PNG/SVG). 
Se usi PNG, aggiorna `index.html`:

```html
<img src="assets/images/logo.png" alt="Figli delle Stelle">
```

## 🚀 Come Usare

1. **Visualizzazione Locale**: Apri `index.html` nel browser
2. **Hosting**: Carica tutti i file su un hosting (Netlify, Vercel, GitHub Pages, ecc.)
3. **Form Prenotazioni**: Collega a Formspree, Netlify Forms, o WhatsApp API

## ✨ Caratteristiche

- 🌟 **Particelle animate** - Effetto stelle che fluttuano
- 🎨 **Glassmorphism design** - Effetti moderni trasparenti
- 📱 **Responsive** - Perfetta su mobile e desktop
- 🎭 **Animazioni scroll** - Elementi che appaiono con effetti
- 💫 **Hover effects** - Interazioni al passaggio del mouse
- 🔥 **Shooting stars** - Stelle cadenti occasionali

## 📝 Note Tecniche

- **Font utilizzati**: Playfair Display, Cormorant Garamond, Inter (Google Fonts)
- **Icone**: Font Awesome 6.5
- **Nessun framework** - Vanilla HTML/CSS/JS per massima performance
- **Compatibilità**: Chrome, Firefox, Safari, Edge (ultime versioni)

## 🎨 Palette Colori

| Colore | Codice | Uso |
|--------|--------|-----|
| Nero Profondo | `#0a0a0a` | Sfondo principale |
| Bianco | `#ffffff` | Testo principale |
| Oro | `#d4af37` | Accent, CTA, Hover |
| Oro Chiaro | `#f4d03f` | Highlights |
| Bianco Trasparente | `rgba(255,255,255,0.6)` | Testo secondario |

---

**Figli delle Stelle** - Eventi che lasciano il segno ⭐
