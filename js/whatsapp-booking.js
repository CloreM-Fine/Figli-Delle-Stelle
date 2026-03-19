/**
 * WhatsApp Booking - Simple and reliable
 */

// Execute when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('WhatsApp Booking script loaded');
    
    const form = document.getElementById('bookingForm');
    const pacchettoSelect = document.getElementById('pacchetto');
    const personeSelect = document.getElementById('persone');
    const totalAmount = document.getElementById('totalAmount');
    
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    console.log('Form found, attaching event listener');
    
    // Prices
    const prices = {
        'pranzo': 20,
        'dopo-pranzo': 10
    };
    
    // Calculate total function
    function calculateTotal() {
        const pacchetto = pacchettoSelect ? pacchettoSelect.value : '';
        const persone = personeSelect ? parseInt(personeSelect.value) : 0;
        
        if (pacchetto && persone && prices[pacchetto]) {
            const total = prices[pacchetto] * persone;
            if (totalAmount) totalAmount.textContent = '€' + total;
        } else {
            if (totalAmount) totalAmount.textContent = '€0';
        }
    }
    
    // Attach change listeners
    if (pacchettoSelect) {
        pacchettoSelect.addEventListener('change', calculateTotal);
    }
    if (personeSelect) {
        personeSelect.addEventListener('change', calculateTotal);
    }
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
        console.log('Form submitted!');
        e.preventDefault();
        
        // Get values
        const nome = document.getElementById('nome').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const persone = document.getElementById('persone').value;
        const pacchetto = document.getElementById('pacchetto').value;
        const note = document.getElementById('note')?.value?.trim() || '';
        
        console.log('Form data:', { nome, telefono, persone, pacchetto });
        
        // Validate
        if (!nome) {
            alert('⚠️ Inserisci il tuo nome');
            return;
        }
        if (!telefono) {
            alert('⚠️ Inserisci il tuo numero di telefono');
            return;
        }
        if (!persone) {
            alert('⚠️ Seleziona il numero di persone');
            return;
        }
        if (!pacchetto) {
            alert('⚠️ Seleziona il pacchetto');
            return;
        }
        
        // Calculate total
        const price = prices[pacchetto] || 0;
        const total = price * parseInt(persone);
        
        // Package names
        const pacchettoNome = pacchetto === 'pranzo' 
            ? '🍕 Pranzo Show (€20)' 
            : '🎧 Afterlunch/DJ Set (€10)';
        
        // Build SHORT message (solo l'essenziale)
        let message = '*PRENOTAZIONE PASQUETTA*\n\n';
        message += nome + '\n';
        message += telefono + '\n';
        message += pacchettoNome + '\n';
        message += persone + ' persone - Totale: €' + total + '\n';
        if (note) {
            message += 'Note: ' + note;
        }
        
        console.log('Message:', message);
        
        // WhatsApp number
        const phoneNumber = '393450688943';
        
        // Build URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
        
        console.log('Opening:', whatsappURL);
        
        // Try opening WhatsApp
        try {
            window.open(whatsappURL, '_blank');
            alert('📱 WhatsApp si sta aprendo!\n\nInvia il messaggio pre-compilato per confermare.');
        } catch (err) {
            console.error('Error opening WhatsApp:', err);
            // Fallback
            window.location.href = whatsappURL;
        }
        
        // Reset form
        setTimeout(function() {
            form.reset();
            if (totalAmount) totalAmount.textContent = '€0';
        }, 1500);
    });
});
