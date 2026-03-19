/**
 * Component Loader - Figli delle Stelle
 * Carica header e footer dinamicamente nelle pagine
 */

// Configurazione dei componenti
const COMPONENTS_CONFIG = {
    header: {
        url: 'components/header.html',
        selector: '#header-container',
        fallback: 'components/header.html'
    },
    footer: {
        url: 'components/footer.html',
        selector: '#footer-container',
        fallback: 'components/footer.html'
    }
};

/**
 * Carica un componente HTML via fetch
 * @param {string} type - Tipo di componente ('header' o 'footer')
 * @param {HTMLElement} container - Elemento contenitore
 * @param {Object} options - Opzioni di configurazione
 */
async function loadComponent(type, container, options = {}) {
    if (!container) {
        console.warn(`[Components] Contenitore non trovato per ${type}`);
        return false;
    }

    const config = COMPONENTS_CONFIG[type];
    if (!config) {
        console.error(`[Components] Configurazione non trovata per ${type}`);
        return false;
    }

    try {
        const response = await fetch(config.url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        container.innerHTML = html;

        // Applica configurazioni specifiche della pagina
        if (type === 'header') {
            configureHeader(options);
        } else if (type === 'footer') {
            configureFooter(options);
        }

        console.log(`[Components] ${type} caricato con successo`);
        return true;

    } catch (error) {
        console.error(`[Components] Errore caricamento ${type}:`, error);
        
        // Fallback: mostra un messaggio nel contenitore
        container.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--color-accent);">
                <p>Errore caricamento ${type}. Ricarica la pagina.</p>
            </div>
        `;
        return false;
    }
}

/**
 * Configura l'header in base alla pagina corrente
 * @param {Object} options - Opzioni: { activePage: 'home'|'eventi'|'gallery', isEventPage: boolean }
 */
function configureHeader(options = {}) {
    const { activePage = 'home', isEventPage = false } = options;

    // Gestione link attivo
    const navLinks = document.querySelectorAll('.nav-link[data-nav]');
    navLinks.forEach(link => {
        const nav = link.getAttribute('data-nav');
        if (nav === activePage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Se siamo in una pagina evento, modifica il menu
    if (isEventPage) {
        const galleryLink = document.querySelector('.nav-link[data-nav="gallery"]');
        if (galleryLink) {
            galleryLink.setAttribute('href', '#prenota');
            galleryLink.setAttribute('data-nav', 'prenota');
            galleryLink.innerHTML = 'Prenota';
        }
    }
}

/**
 * Configura il footer in base alla pagina corrente
 * @param {Object} options - Opzioni: { isEventPage: boolean }
 */
function configureFooter(options = {}) {
    const { isEventPage = false } = options;

    if (isEventPage) {
        // Nascondi contatti home, mostra info evento
        const homeContact = document.querySelector('[data-footer-contact="home"]');
        const homeLinks = document.querySelector('[data-footer-links="home"]');
        const eventLinks = document.querySelector('[data-footer-links="event"]');
        const eventInfo = document.querySelector('[data-footer-info="event"]');

        if (homeContact) homeContact.style.display = 'none';
        if (homeLinks) homeLinks.style.display = 'none';
        if (eventLinks) eventLinks.style.display = 'block';
        if (eventInfo) eventInfo.style.display = 'block';
    }
}

/**
 * Inizializza tutti i componenti nella pagina
 * @param {Object} options - Configurazione per header e footer
 */
async function initComponents(options = {}) {
    console.log('[Components] Inizializzazione...');

    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');

    // Carica entrambi i componenti in parallelo
    const promises = [];

    if (headerContainer) {
        promises.push(loadComponent('header', headerContainer, options.header));
    }

    if (footerContainer) {
        promises.push(loadComponent('footer', footerContainer, options.footer));
    }

    await Promise.all(promises);

    // Riemette l'event listener per la navigazione mobile
    initMobileNav();

    console.log('[Components] Inizializzazione completata');
}

/**
 * Reinizializza la navigazione mobile dopo il caricamento dei componenti
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Rimuovi listener precedenti per evitare duplicati
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);

        // Aggiungi nuovo listener
        newNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            newNavToggle.classList.toggle('active');
        });

        // Chiudi menu al click su un link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', () => {
                navMenu.classList.remove('active');
                newNavToggle.classList.remove('active');
            });
        });
    }
}

// Esporta funzioni per uso globale
window.Components = {
    init: initComponents,
    load: loadComponent,
    configureHeader,
    configureFooter
};

// Auto-inizializza se il DOM è già pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // La pagina deve chiamare Components.init() manualmente con le proprie opzioni
        console.log('[Components] Pronto. Chiama Components.init({...}) per caricare i componenti.');
    });
} else {
    console.log('[Components] Pronto. Chiama Components.init({...}) per caricare i componenti.');
}
