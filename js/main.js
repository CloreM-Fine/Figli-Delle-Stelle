/**
 * FIGLI DELLE STELLE - PASQUETTA 2026
 * Main JavaScript with particles, animations & form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add JS active class for enhanced animations
    document.body.classList.add('js-active');
    
    // Initialize all modules
    initParticles();
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initFormHandling();
    initPackageSelection();
    initModal();
});

/**
 * Particles Background System
 */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(container, i);
    }
    
    // Add occasional shooting stars
    setInterval(() => {
        createShootingStar(container);
    }, 4000);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.2;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
    `;
    
    // Random gold variation
    const hue = 45 + Math.random() * 10; // Gold range
    particle.style.background = `hsl(${hue}, 70%, ${60 + Math.random() * 20}%)`;
    
    container.appendChild(particle);
}

function createShootingStar(container) {
    const star = document.createElement('div');
    const startY = Math.random() * 30;
    const startX = Math.random() * 50;
    
    star.style.cssText = `
        position: absolute;
        width: 100px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        top: ${startY}%;
        left: ${startX}%;
        transform: rotate(-45deg);
        opacity: 0;
        pointer-events: none;
        animation: shooting-star 1.5s ease-out forwards;
    `;
    
    container.appendChild(star);
    
    setTimeout(() => star.remove(), 1500);
}

// Add shooting star keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shooting-star {
        0% {
            transform: rotate(-45deg) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: rotate(-45deg) translateX(500px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Navigation System
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = () => {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                // Staggered delay for elements in same row
                const delay = index * 100;
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const form = document.getElementById('bookingForm');
    const pacchettoSelect = document.getElementById('pacchetto');
    const personeSelect = document.getElementById('persone');
    const totalAmount = document.getElementById('totalAmount');
    
    // Prices
    const prices = {
        'pranzo': 20,
        'dopo-pranzo': 10
    };
    
    // Calculate total
    const calculateTotal = () => {
        const pacchetto = pacchettoSelect?.value;
        const persone = parseInt(personeSelect?.value) || 0;
        
        if (pacchetto && persone && prices[pacchetto]) {
            const total = prices[pacchetto] * persone;
            totalAmount.textContent = `€${total}`;
        } else {
            totalAmount.textContent = '€0';
        }
    };
    
    pacchettoSelect?.addEventListener('change', calculateTotal);
    personeSelect?.addEventListener('change', calculateTotal);
    
    // Form submission - WhatsApp Integration
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get form values directly
        const nome = document.getElementById('nome')?.value?.trim();
        const telefono = document.getElementById('telefono')?.value?.trim();
        const email = document.getElementById('email')?.value?.trim();
        const persone = document.getElementById('persone')?.value;
        const pacchetto = document.getElementById('pacchetto')?.value;
        const note = document.getElementById('note')?.value?.trim();
        
        // Validate
        if (!nome || !telefono || !persone || !pacchetto) {
            alert('⚠️ Compila tutti i campi obbligatori (Nome, Telefono, Persone, Pacchetto)');
            return;
        }
        
        // Calculate total
        const price = prices[pacchetto] || 0;
        const total = price * parseInt(persone);
        
        // Build WhatsApp message
        const pacchettoNome = {
            'pranzo': '🍕 Pranzo Show',
            'dopo-pranzo': '🎧 Afterlunch/DJ Set'
        }[pacchetto] || pacchetto;
        
        const message = `*NUOVA PRENOTAZIONE* 🎵%0A%0A` +
            `*Evento:* Sarà perchè... è PASQUETTA%0A` +
            `*Data:* Lunedì 6 Aprile 2026%0A%0A` +
            `*Nome:* ${nome}%0A` +
            `*Telefono:* ${telefono}%0A` +
            `*Email:* ${email || 'Non specificata'}%0A%0A` +
            `*Pacchetto:* ${pacchettoNome}%0A` +
            `*Persone:* ${persone}%0A` +
            `*Totale:* €${total}%0A` +
            (note ? `%0A*Note:* ${note}%0A` : '%0A') +
            `---%0A✅ Conferma richiesta`;
        
        // WhatsApp number
        const yourWhatsAppNumber = '393450688943';
        
        // Build WhatsApp URL
        const whatsappURL = `https://api.whatsapp.com/send?phone=${yourWhatsAppNumber}&text=${message}`;
        
        console.log('Opening WhatsApp:', whatsappURL);
        
        // Try to open WhatsApp
        const newWindow = window.open(whatsappURL, '_blank');
        
        // Check if popup was blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Fallback: redirect in same window
            window.location.href = whatsappURL;
        }
        
        // Show success message
        alert('📱 WhatsApp si sta aprendo!\n\nInvia il messaggio pre-compilato per confermare la prenotazione.');
        
        // Reset form
        setTimeout(() => {
            form.reset();
            if (totalAmount) totalAmount.textContent = '€0';
        }, 1000);
    });
    
    // Input formatting
    const telefonoInput = document.getElementById('telefono');
    telefonoInput?.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('39')) value = '+' + value;
        else if (value.startsWith('0')) value = value;
        else if (value.length > 0) value = '+39' + value;
        e.target.value = value;
    });
}

function simulateSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve({ success: true });
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: ${type === 'error' ? 'rgba(231, 76, 60, 0.95)' : 'rgba(212, 175, 55, 0.95)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Package Selection
 */
function initPackageSelection() {
    const packageButtons = document.querySelectorAll('.btn-package');
    const pacchettoSelect = document.getElementById('pacchetto');
    
    packageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packageType = btn.dataset.package;
            
            if (pacchettoSelect) {
                pacchettoSelect.value = packageType;
                
                // Trigger change event for price calculation
                pacchettoSelect.dispatchEvent(new Event('change'));
                
                // Scroll to form
                document.getElementById('prenota')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Success Modal
 */
function initModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');
    
    closeBtn?.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close on backdrop click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function showSuccessModal(data) {
    const modal = document.getElementById('successModal');
    const modalName = document.getElementById('modalName');
    const modalPackage = document.getElementById('modalPackage');
    
    const packageNames = {
        'pranzo': 'il Pranzo',
        'dopo-pranzo': 'il Dopo Pranzo',
        'full': 'l\'esperienza Full Day'
    };
    
    if (modalName) modalName.textContent = data.nome.split(' ')[0];
    if (modalPackage) modalPackage.textContent = packageNames[data.pacchetto] || data.pacchetto;
    
    modal?.classList.add('active');
}

/**
 * Parallax Effect for Hero - Disabled for better compatibility
 * Uncomment if needed:
 */
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});
*/

/**
 * Mouse Follow Effect for Cards
 */
document.querySelectorAll('.package-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/**
 * Countdown Timer (Optional - can be enabled)
 */
function initCountdown() {
    const eventDate = new Date('2026-04-06T12:30:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) return;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update elements if they exist
        document.getElementById('countdown-days')?.textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours')?.textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes')?.textContent = String(minutes).padStart(2, '0');
    };
    
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Uncomment to enable countdown
// initCountdown();
