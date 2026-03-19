/**
 * HOMEPAGE - FIGLI DELLE STELLE
 * Logo Animation + Carousel + Events
 */

document.addEventListener('DOMContentLoaded', () => {
    initStarsBackground();
    initLogoAnimation();
    initHorizontalCarousel();
    initLogoParticles();
});

/**
 * Logo Animation - Create floating particles around logo
 */
function initLogoAnimation() {
    const container = document.querySelector('.hero-logo-container');
    if (!container) return;

    // Add entrance animation
    const logo = container.querySelector('.hero-logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            logo.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 300);
    }
}

/**
 * Create particles around the logo
 */
function initLogoParticles() {
    const container = document.getElementById('logoParticles');
    if (!container) return;

    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        createLogoParticle(container, i);
    }
}

function createLogoParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'logo-particle';
    
    // Random position around the logo
    const angle = (index / 12) * Math.PI * 2;
    const radius = 180 + Math.random() * 40;
    const x = Math.cos(angle) * radius + 200;
    const y = Math.sin(angle) * radius + 200;
    
    const size = Math.random() * 3 + 2;
    const delay = index * 0.2;
    const duration = 2 + Math.random() * 2;
    
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
}

/**
 * Stars Background with tsParticles - Blue Theme
 */
function initStarsBackground() {
    if (typeof tsParticles === 'undefined') return;
    
    tsParticles.load("tsparticles", {
        fullScreen: {
            enable: true,
            zIndex: 0
        },
        particles: {
            number: {
                value: 180,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af", "#22d3ee"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: { min: 0.4, max: 1 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: 0.2,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "out"
                }
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.03,
                    opacity: 0.9
                }
            },
            glow: {
                enable: true,
                color: "#3b82f6",
                distance: 15,
                size: 5
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 0.6,
                        color: "#60a5fa"
                    }
                },
                push: {
                    quantity: 4
                }
            }
        },
        background: {
            color: "transparent"
        }
    });
}

/**
 * Horizontal Carousel - Auto-scroll fluido e continuo
 */
function initHorizontalCarousel() {
    const carousel = document.getElementById('carouselHorizontal');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!carousel) return;

    // Clona le card per creare un loop infinito senza interruzioni
    const cards = Array.from(carousel.children);
    const cardWidth = 300; // larghezza card + gap
    
    // Duplica le card alla fine per il loop infinito
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    let scrollPos = 0;
    let isPaused = false;
    let animationId = null;
    const scrollSpeed = 1.5; // pixels per frame
    
    // Funzione di animazione fluida
    const animate = () => {
        if (!isPaused) {
            scrollPos += scrollSpeed;
            
            // Quando arriviamo alla metà (dove finiscono le card originali), torniamo a 0
            const halfWidth = carousel.scrollWidth / 2;
            if (scrollPos >= halfWidth) {
                scrollPos = 0;
            }
            
            carousel.scrollLeft = scrollPos;
        }
        animationId = requestAnimationFrame(animate);
    };

    // Pulsanti navigazione
    prevBtn?.addEventListener('click', () => {
        scrollPos -= cardWidth;
        if (scrollPos < 0) {
            scrollPos = (carousel.scrollWidth / 2) - cardWidth;
        }
        carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
        scrollPos += cardWidth;
        if (scrollPos >= carousel.scrollWidth / 2) {
            scrollPos = 0;
        }
        carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        scrollPos = carousel.scrollLeft;
    });

    // Touch/drag support
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        isPaused = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        isPaused = false;
        scrollPos = carousel.scrollLeft;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        isPaused = false;
        scrollPos = carousel.scrollLeft;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
        scrollPos = carousel.scrollLeft;
    });
    
    // Touch support
    carousel.addEventListener('touchstart', () => {
        isPaused = true;
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        isPaused = false;
        scrollPos = carousel.scrollLeft;
    }, { passive: true });

    // Avvia l'animazione
    animate();
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: ${type === 'success' ? 'rgba(39, 174, 96, 0.95)' : 'rgba(212, 175, 55, 0.95)'};
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

/**
 * Parallax on scroll for hero - Fade out effect
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.home-hero');
    const logo = document.querySelector('.hero-logo-container');
    const tagline = document.querySelector('.hero-tagline');
    const btnScroll = document.querySelector('.btn-scroll');
    const particles = document.getElementById('tsparticles');
    
    if (!hero) return;
    
    const heroHeight = hero.offsetHeight;
    const scrollProgress = Math.min(scrolled / (heroHeight * 0.5), 1);
    
    if (scrolled < heroHeight) {
        // Logo fade out + scale down + slight upward movement
        if (logo) {
            const scale = 1 - (scrollProgress * 0.15);
            const opacity = 1 - (scrollProgress * 1.2);
            const translateY = scrolled * 0.2;
            logo.style.transform = `scale(${scale}) translateY(${-translateY}px)`;
            logo.style.opacity = Math.max(0, opacity);
        }
        
        // Tagline fade out faster
        if (tagline) {
            const taglineOpacity = 1 - (scrollProgress * 2);
            tagline.style.opacity = Math.max(0, taglineOpacity);
            tagline.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Button fade out
        if (btnScroll) {
            const btnOpacity = 1 - (scrollProgress * 3);
            btnScroll.style.opacity = Math.max(0, btnOpacity);
        }
        
        // Particles fade out slightly
        if (particles) {
            particles.style.opacity = 1 - (scrollProgress * 0.5);
        }
    }
});

/**
 * Intersection Observer for fade-in animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe event cards
document.querySelectorAll('.event-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
});

// Add revealed class style
const style = document.createElement('style');
style.textContent = `
    .event-card.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
