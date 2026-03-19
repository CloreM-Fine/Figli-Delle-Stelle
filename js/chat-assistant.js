/**
 * Chat Assistant - Risposte automatiche basate sul contenuto della pagina
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageInput = document.querySelector('.message-input');
    
    if (!contactForm || !messageInput) return;
    
    // Knowledge base con le informazioni della pagina
    const knowledgeBase = {
        prezzi: {
            keywords: ['prezzo', 'prezzi', 'costo', 'costa', 'quanto', 'euro', '€', 'soldi', 'pagare'],
            response: `💰 *PREZZI*

🍕 *Pranzo Show* - €20 a persona
• Focacce gourmet
• Pizze al portafoglio  
• Piano bar con Giannino

🎧 *Afterlunch/DJ Set* - €10 a persona
• House commerciale
• Balli fino a tardi

📍 Bambini under 12: gratuito!`
        },
        
        orari: {
            keywords: ['orario', 'orari', 'quando', 'che ora', 'inizia', 'fino a', 'orario', 'apertura', 'chiusura'],
            response: `🕐 *ORARI*

☀️ *Pranzo Show*: dalle 12:30
🎶 *Afterlunch*: dalle 17:00

L'evento dura tutto il giorno!

📅 *Data*: Lunedì 6 Aprile 2026`
        },
        
        location: {
            keywords: ['dove', 'location', 'indirizzo', 'luogo', 'posto', 'mura', 'lucca', 'arrivare', 'parcheggio', 'caffe'],
            response: `📍 *LOCATION*

*Antico Caffè delle Mura*
Via delle Mura, 24
55100 Lucca LU

🚗 Parcheggio disponibile nelle vicinanze

📍 <a href="https://maps.google.com/?q=Antico+Caffè+delle+Mura+Lucca" target="_blank">Guarda su Google Maps</a>`
        },
        
        pacchetti: {
            keywords: ['pacchetto', 'pacchetti', 'pranzo', 'serata', 'afterlunch', 'full day', 'opzioni', 'cosa include'],
            response: `📦 *PACCHETTI*

🍕 *PRANZO SHOW* (€20)
• Piano bar con Giannino
• Focacce gourmet
• Pizze al portafoglio

🎧 *AFTERLUNCH/DJ SET* (€10)
• House commerciale
• DJ set esclusivo
• Bar & cocktail

💡 *Scegli tu* se venire solo a pranzo, solo alla serata, o tutto il giorno!`
        },
        
        prenotazione: {
            keywords: ['prenotare', 'prenota', 'prenotazione', 'come prenoto', 'riservare', 'posto', 'tavolo'],
            response: `📝 *PRENOTAZIONE*

Compila il form qui sotto oppure scrivici su WhatsApp!

📱 *WhatsApp*: 345 068 8943

Ti servirà:
• Nome e cognome
• Numero di persone
• Pacchetto scelto`
        },
        
        cibo: {
            keywords: ['mangiare', 'cibo', 'menu', 'pizza', 'focaccia', 'intolleranze', 'allergie', 'glutine', 'vegano', 'vegetariano'],
            response: `🍽️ *CIBO*

Al Pranzo Show troverai:
• Focacce gourmet
• Pizze al portafoglio

✅ *Intolleranze*: scrivile nelle note quando prenoti, ci adatteremo!`
        },
        
        musica: {
            keywords: ['musica', 'dj', 'piano bar', 'giannino', 'solea', 'house', 'ballare', 'concerto', 'live'],
            response: `🎵 *MUSICA*

☀️ *Pranzo*: Piano bar con Giannino
🎧 *Serata*: House commerciale con DJ Set

5 DJ misteriosi si esibiranno durante l'evento! 
Scopri chi sono cliccando sulle card nella sezione Lineup 🎧`
        },
        
        bambini: {
            keywords: ['bambini', 'bimbi', 'bambino', 'piccoli', 'under', 'eta', 'anni', 'famiglia', 'ragazzi'],
            response: `👶 *BAMBINI*

✅ *Under 12*: entrata GRATIS!

I bambini sono i benvenuti, è un evento per tutta la famiglia 🎉`
        },
        
        data: {
            keywords: ['data', 'quando', 'giorno', 'pasquetta', 'aprile', '2026'],
            response: `📅 *DATA*

Lunedì 6 Aprile 2026

*Sarà perchè... è PASQUETTA* 🎉`
        }
    };
    
    // Trova la risposta migliore
    function findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Cerca parole chiave
        for (const [topic, data] of Object.entries(knowledgeBase)) {
            for (const keyword of data.keywords) {
                if (lowerQuestion.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        // Risposta di default se non trova corrispondenze
        return null;
    }
    
    // Crea il container per la chat
    function createChatInterface() {
        // Aggiungi stili CSS
        const style = document.createElement('style');
        style.textContent = `
            .chat-messages {
                margin-top: 20px;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .chat-message {
                padding: 16px 20px;
                margin-bottom: 12px;
                border-radius: 20px;
                font-size: 15px;
                line-height: 1.6;
                animation: fadeInUp 0.3s ease;
            }
            
            .chat-message.user {
                background: rgba(59, 130, 246, 0.2);
                border: 1px solid rgba(59, 130, 246, 0.3);
                margin-left: 40px;
            }
            
            .chat-message.bot {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                margin-right: 40px;
                white-space: pre-line;
            }
            
            .chat-message.bot strong {
                color: #60a5fa;
            }
            
            .chat-message.bot a {
                color: #60a5fa;
                text-decoration: underline;
            }
            
            .chat-divider {
                text-align: center;
                margin: 20px 0;
                font-size: 13px;
                color: rgba(255,255,255,0.4);
            }
            
            .chat-divider::before,
            .chat-divider::after {
                content: '';
                display: inline-block;
                width: 60px;
                height: 1px;
                background: rgba(255,255,255,0.2);
                vertical-align: middle;
                margin: 0 15px;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Container messaggi
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'chat-messages';
        messagesContainer.id = 'chatMessages';
        contactForm.parentNode.insertBefore(messagesContainer, contactForm.nextSibling);
        
        return messagesContainer;
    }
    
    const chatContainer = createChatInterface();
    
    // Gestisci invio messaggio
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const question = messageInput.value.trim();
        if (!question) return;
        
        // Mostra domanda utente
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = question;
        chatContainer.appendChild(userMsg);
        
        // Pulisci input
        messageInput.value = '';
        
        // Trova e mostra risposta
        const answer = findAnswer(question);
        
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            
            if (answer) {
                botMsg.innerHTML = answer;
            } else {
                botMsg.innerHTML = `🤔 Non ho capito bene...\n\nProva a chiedermi di:\n• Prezzi 💰\n• Orari 🕐\n• Location 📍\n• Pacchetti 📦\n• Come prenotare 📝`;
            }
            
            chatContainer.appendChild(botMsg);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 500);
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    
    // Aggiorna label del form
    const label = contactForm.querySelector('label');
    if (label) {
        label.textContent = 'Fai una domanda:';
    }
    
    // Aggiorna placeholder
    messageInput.placeholder = 'Es: Quanto costa il pranzo?';
});
