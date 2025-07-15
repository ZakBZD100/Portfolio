//navigationandlanguageswitching
document.addEventListener('DOMContentLoaded', function() {
    //navigationelements
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('.section');
    const languageToggle = document.querySelector('.language-toggle');
    const mobileLangToggle = document.querySelector('.mobile-lang-toggle');
    
    //languagestate
    let currentLang = 'fr';
    let isInitialLoad = true;
    
    //navigationbetweensectionsdesktop
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            //hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            //show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            //update active navigation
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            //update mobile nav
            mobileNavLinks.forEach(mobileLink => mobileLink.classList.remove('active'));
            document.querySelectorAll('.mobile-nav-link[data-section="'+targetSection+'"]').forEach(mobileLink => mobileLink.classList.add('active'));
        });
    });
    //navigation between sections (mobile)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            //hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            //show target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            //update active navigation
            mobileNavLinks.forEach(mobileLink => mobileLink.classList.remove('active'));
            this.classList.add('active');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            document.querySelectorAll('.nav-link[data-section="'+targetSection+'"]').forEach(navLink => navLink.classList.add('active'));
        });
    });
    //initialize EmailJS with your public key
    emailjs.init("0WBHJeDymJUQ_QPXn");
    //language change desktop
    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        this.textContent = currentLang.toUpperCase();
        this.setAttribute('data-lang', currentLang);
        
        //Prevent typing effect on language change
        isInitialLoad = false;
        
        //Stop any ongoing typing effect
        if (window.stopTyping) {
            window.stopTyping();
        }
        
        //update all texts with data-fr and data-en attributes
        const elementsWithLang = document.querySelectorAll('[data-fr][data-en]');
        elementsWithLang.forEach(element => {
            const newText = currentLang === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
            if (newText) {
                //check if element has span children with data attributes
                const spanChild = element.querySelector('span[data-fr][data-en]');
                if (spanChild) {
                    //update the span child
                    const spanText = currentLang === 'fr' ? spanChild.getAttribute('data-fr') : spanChild.getAttribute('data-en');
                    if (spanText) {
                        spanChild.textContent = spanText;
                    }
                } else if (element.children.length === 0) {
                    //direct text element
                    element.textContent = newText;
                }
            }
        });
        //Traduction des boutons mobile-nav
        document.querySelectorAll('.mobile-nav-link .mobile-nav-text').forEach(textSpan => {
            const parent = textSpan.closest('.mobile-nav-link');
            if (parent && parent.hasAttribute('data-fr') && parent.hasAttribute('data-en')) {
                textSpan.textContent = currentLang === 'fr' ? parent.getAttribute('data-fr') : parent.getAttribute('data-en');
            }
        });
        //Traduction des boutons nav desktop
        document.querySelectorAll('.nav-link .nav-text').forEach(textSpan => {
            const parent = textSpan.closest('.nav-link');
            if (parent && parent.hasAttribute('data-fr') && parent.hasAttribute('data-en')) {
                textSpan.textContent = currentLang === 'fr' ? parent.getAttribute('data-fr') : parent.getAttribute('data-en');
            }
        });
        //sync mobile button
        if (mobileLangToggle) {
            mobileLangToggle.textContent = currentLang.toUpperCase();
            mobileLangToggle.setAttribute('data-lang', currentLang);
        }
    });
    //language change mobile
    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', function() {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            this.textContent = currentLang.toUpperCase();
            this.setAttribute('data-lang', currentLang);
            
            //Prevent typing effect on language change
            isInitialLoad = false;
            
            //Stop any ongoing typing effect
            if (window.stopTyping) {
                window.stopTyping();
            }
            
            //update all texts with data-fr and data-en attributes
            const elementsWithLang = document.querySelectorAll('[data-fr][data-en]');
            elementsWithLang.forEach(element => {
                const newText = currentLang === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
                if (newText) {
                    //check if element has span children with data attributes
                    const spanChild = element.querySelector('span[data-fr][data-en]');
                    if (spanChild) {
                        //update the span child
                        const spanText = currentLang === 'fr' ? spanChild.getAttribute('data-fr') : spanChild.getAttribute('data-en');
                        if (spanText) {
                            spanChild.textContent = spanText;
                        }
                    } else if (element.children.length === 0) {
                        //direct text element
                        element.textContent = newText;
                    }
                }
            });
            //Traduction des boutons mobile-nav
            document.querySelectorAll('.mobile-nav-link .mobile-nav-text').forEach(textSpan => {
                const parent = textSpan.closest('.mobile-nav-link');
                if (parent && parent.hasAttribute('data-fr') && parent.hasAttribute('data-en')) {
                    textSpan.textContent = currentLang === 'fr' ? parent.getAttribute('data-fr') : parent.getAttribute('data-en');
                }
            });
            //Traduction des boutons nav desktop
            document.querySelectorAll('.nav-link .nav-text').forEach(textSpan => {
                const parent = textSpan.closest('.nav-link');
                if (parent && parent.hasAttribute('data-fr') && parent.hasAttribute('data-en')) {
                    textSpan.textContent = currentLang === 'fr' ? parent.getAttribute('data-fr') : parent.getAttribute('data-en');
                }
            });
            //sync desktop button
            if (languageToggle) {
                languageToggle.textContent = currentLang.toUpperCase();
                languageToggle.setAttribute('data-lang', currentLang);
            }
        });
    }
    
    //contact form management with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            //get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            //basic validation
            if (!name || !email || !message) {
                showFormStatus('error', currentLang === 'fr' ? 'Veuillez remplir tous les champs.' : 'Please fill in all fields.');
                return;
            }
            
            //email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('error', currentLang === 'fr' ? 'Veuillez entrer une adresse email valide.' : 'Please enter a valid email address.');
                return;
            }
            
            //disable button and show loading status
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
            
            showFormStatus('loading', currentLang === 'fr' ? 'Envoi du message en cours...' : 'Sending message...');
            
            //prepare parameters for EmailJS according to your template
            const templateParams = {
                name: name,
                email: email,
                message: message,
                time: new Date().toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            //send email via EmailJS with your real template
            emailjs.send('service_limtqfs', 'template_c2p5g0a', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('success', currentLang === 'fr' ? 'Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.' : 'Message sent successfully! I will get back to you as soon as possible.');
                    
                    //reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('error', currentLang === 'fr' ? 
                        'Erreur lors de l\'envoi. Veuillez réessayer.' : 
                        'Error sending message. Please try again.');
                })
                .finally(function() {
                    //reactivate button
                    submitBtn.disabled = false;
                    submitBtn.textContent = currentLang === 'fr' ? 'Envoyer' : 'Send';
                });
        });
    }
    
    //function to display status notifications
    function showFormStatus(type, message) {
        console.log('showFormStatus called:', type, message); //debug
        
        //ensure element exists
        if (!formStatus) {
            console.error('formStatus element not found!');
            return;
        }
        
        //clean and prepare element
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.innerHTML = `<strong>${message}</strong>`;
        
        //force display
        formStatus.style.display = 'block';
        formStatus.style.opacity = '1';
        formStatus.style.visibility = 'visible';
        formStatus.style.position = 'relative';
        formStatus.style.zIndex = '9999';
        
        //scroll to message to ensure it's visible
        setTimeout(() => {
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        //auto-hide after 5 seconds for success
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
    
    //section appearance animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    //observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    //project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });

    //enhanced matrix animation for profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    const photoContainer = document.querySelector('.profile-photo-container');
    
    console.log('Profile photo found:', profilePhoto); //Debug
    console.log('Photo container found:', photoContainer); //Debug
    
    if (profilePhoto && photoContainer) {
        console.log('Adding click event to photo'); //Debug
        let glowInterval;
        
        profilePhoto.addEventListener('mouseenter', function() {
            //matrix pulse effect
            this.style.animation = 'photoGlow 2s ease-in-out infinite';
            
            //matrix scan animation
            //const scanLine = document.createElement('div');
            //scanLine.style.cssText = `
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            //     right: 0;
            //     height: 2px;
            //     background: linear-gradient(90deg, transparent, #00ff41, transparent);
            //     z-index: 10;
            //     animation: matrixScan 1.5s ease-in-out;
            // `;
            //photoContainer.appendChild(scanLine);
            
            //setTimeout(() => {
            //     if (scanLine.parentNode) {
            //         scanLine.parentNode.removeChild(scanLine);
            //     }
            // }, 1500);
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        //scan animation on click
        profilePhoto.addEventListener('click', function() {
            console.log('Photo clicked!'); //Debug
            console.log('Click event triggered!'); //Debug supplémentaire
            
            //complete scan effect
            this.style.animation = 'borderRotate 3s linear';
            
            //create multiple scan effect
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    //const scanLine = document.createElement('div');
                    //scanLine.style.cssText = `
                    //     position: absolute;
                    //     top: 0;
                    //     left: 0;
                    //     right: 0;
                    //     height: 1px;
                    //     background: linear-gradient(90deg, transparent, #00ff88, transparent);
                    //     z-index: 10;
                    //     animation: matrixScan 2s ease-in-out;
                    // `;
                    //photoContainer.appendChild(scanLine);
                    
                    //setTimeout(() => {
                    //     if (scanLine.parentNode) {
                    //         scanLine.parentNode.removeChild(scanLine);
                    //     }
                    // }, 2000);
                }, i * 500);
            }
            
            setTimeout(() => {
                this.style.animation = '';
            }, 3000);
            
            //Open Matrix Terminal
            openMatrixTerminal();
        });
    }
    
    //Matrix Terminal Functions
    let terminalOpen = false;
    
    function openMatrixTerminal() {
        if (terminalOpen) return;
        
        terminalOpen = true;
        
        //Create terminal overlay
        const terminal = document.createElement('div');
        terminal.className = 'matrix-terminal';
        terminal.innerHTML = `
            <div class="terminal-header">
                <span class="terminal-title">${currentLang === 'fr' ? 'Terminal' : 'Terminal'}</span>
                <button class="terminal-close" onclick="closeMatrixTerminal()">×</button>
            </div>
            <div class="terminal-content">
                <div class="terminal-line">$ <span class="typing-text" data-text="whoami"></span></div>
                <div class="terminal-output" style="display: none;">Zakariae El Bouzidi - ${currentLang === 'fr' ? 'Élève-ingénieur en Informatique & Réseaux' : 'Computer Science & Networks Engineering Student'}</div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="ls -la" data-delay="2000"></span></div>
                <div class="terminal-output" style="display: none;">
                    drwxr-xr-x  ${currentLang === 'fr' ? 'accueil/' : 'home/'}         4096  ${currentLang === 'fr' ? 'Jui' : 'Jul'} 2025<br>
                    drwxr-xr-x  ${currentLang === 'fr' ? 'projets/' : 'projects/'}     4096  ${currentLang === 'fr' ? 'Jui' : 'Jul'} 2025<br>
                    drwxr-xr-x  ${currentLang === 'fr' ? 'competences/' : 'skills/'}       4096  ${currentLang === 'fr' ? 'Jui' : 'Jul'} 2025<br>
                    drwxr-xr-x  ${currentLang === 'fr' ? 'experiences/' : 'experience/'}   4096  ${currentLang === 'fr' ? 'Jui' : 'Jul'} 2025<br>
                    drwxr-xr-x  ${currentLang === 'fr' ? 'contact/' : 'contact/'}      4096  ${currentLang === 'fr' ? 'Jui' : 'Jul'} 2025
                </div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="${currentLang === 'fr' ? 'cat competences.txt' : 'cat skills.txt'}" data-delay="4000"></span></div>
                <div class="terminal-output" style="display: none;">
                    === ${currentLang === 'fr' ? 'TECHNOLOGIES & OUTILS' : 'TECHNOLOGIES & TOOLS'} ===<br>
                    [██████████████████░░░░] ${currentLang === 'fr' ? 'Écosystème Python' : 'Python Ecosystem'} (70%)<br>
                    [████████████████████░░] ${currentLang === 'fr' ? 'Développement Mobile' : 'Mobile Development'} (80%)<br>
                    [███████████████████░░░] ${currentLang === 'fr' ? 'Technologies Web' : 'Web Technologies'} (75%)<br>
                    [████████████████████░░] ${currentLang === 'fr' ? 'Systèmes de Base de Données' : 'Database Systems'} (80%)<br>
                    [████████████████████░░] ${currentLang === 'fr' ? 'Résolution de Problèmes' : 'Problem Solving'} (80%)
                </div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="echo '${currentLang === 'fr' ? 'Bienvenue dans mon portfolio' : 'Welcome to my portfolio'}'" data-delay="6000"></span></div>
                <div class="terminal-output" style="display: none;">${currentLang === 'fr' ? 'Bienvenue dans mon portfolio' : 'Welcome to my portfolio'}</div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="./pong.sh" data-delay="8000"></span></div>
            </div>
        `;
        
        document.body.appendChild(terminal);
        
        //Animate terminal opening
        setTimeout(() => {
            terminal.style.opacity = '1';
            terminal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        //Start typing animations
        setTimeout(() => {
            animateTerminalTyping();
        }, 500);
    }
    
    function animateTerminalTyping() {
        const typingElements = document.querySelectorAll('.typing-text');
        let currentIndex = 0;
        
        function typeNext() {
            if (currentIndex < typingElements.length) {
                const element = typingElements[currentIndex];
                const text = element.getAttribute('data-text');
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    typeText(element, text, () => {
                        //Show output after typing
                        const output = element.parentElement.nextElementSibling;
                        if (output && output.classList.contains('terminal-output')) {
                            setTimeout(() => {
                                output.style.display = 'block';
                                output.style.opacity = '1';
                                
                                //Auto-scroll to bottom on mobile
                                const terminalContent = document.querySelector('.terminal-content');
                                if (terminalContent) {
                                    terminalContent.scrollTop = terminalContent.scrollHeight;
                                }
                            }, 500);
                        }
                        
                                                //Check if this is the pong command
                        if (text === './pong.sh') {
                            setTimeout(() => {
                                //Stop any ongoing typing animation
                                if (window.stopTyping) {
                                    window.stopTyping();
                                }
                                
                                //Clear terminal and start Pong game
                                const terminalContent = document.querySelector('.terminal-content');
                                if (terminalContent) {
                                    terminalContent.innerHTML = `<div style="color: #00ff41;">${currentLang === 'fr' ? 'Initialisation du jeu Pong Matrix...' : 'Initializing Pong Matrix game...'}</div>`;
                                    
                                    //Auto-scroll to bottom
                                    terminalContent.scrollTop = terminalContent.scrollHeight;
                                    
                                    setTimeout(() => {
                                        const terminal = document.querySelector('.matrix-terminal');
                                        terminal.classList.add('pong-game');
                                        pongGame = new PongGame(terminal);
                                    }, 1000);
                                }
                            }, 1000);
                        }
                        
                        currentIndex++;
                        typeNext();
                    });
                }, delay);
            }
        }
        
        typeNext();
    }
    
    function typeText(element, text, callback) {
        let index = 0;
        element.textContent = '';
        
        function typeChar() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(typeChar, 50);
            } else {
                if (callback) callback();
            }
        }
        
        typeChar();
    }
    
    function closeMatrixTerminal() {
        const terminal = document.querySelector('.matrix-terminal');
        if (terminal) {
            terminal.style.opacity = '0';
            terminal.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                terminal.remove();
                terminalOpen = false;
            }, 300);
        }
    }
    
    //PONG GAME LOGIC
    let pongGame = null;
    
    class PongGame {
        constructor(terminalElement) {
            this.terminal = terminalElement;
            this.content = terminalElement.querySelector('.terminal-content');
            this.gameRunning = false;
            this.gameLoop = null;
            
            //Game dimensions (ASCII grid) - adaptive for mobile
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           (window.innerWidth <= 768) || 
                           ('ontouchstart' in window || navigator.maxTouchPoints > 0);
            
            //Adjust dimensions for mobile
            if (this.isMobile) {
                this.width = 40;
                this.height = 15;
            } else {
                this.width = 60;
                this.height = 20;
            }
            
            //Game objects
            this.ball = {
                x: Math.floor(this.width / 2),
                y: Math.floor(this.height / 2),
                dx: 1,
                dy: 1,
                speed: 0.8 // Vitesse équilibrée - plus rapide que les raquettes
            };
            
            this.playerPaddle = {
                x: 2,
                y: Math.floor(this.height / 2) - 2,
                height: 4,
                score: 0
            };
            
            this.aiPaddle = {
                x: this.width - 3,
                y: Math.floor(this.height / 2) - 2,
                height: 4,
                score: 0
            };
            
            //Game state
            this.scoreLimit = 5;
            this.gameOver = false;
            this.winner = null;
            
            //Controls
            this.keys = {
                up: false,
                down: false
            };
            
            //Touch controls for mobile
            this.touchY = null;
            this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            this.init();
        }
        
        init() {
            //Clear terminal content
            this.content.innerHTML = '';
            
            //Add game instructions
            this.addGameInstructions();
            
            //Setup controls
            this.setupControls();
            
            //Game will start when user clicks button or presses space
        }
        
        addGameInstructions() {
            const instructions = currentLang === 'fr' ? 
                `<div style="color: #00ff41; text-align: center; margin-bottom: 20px;">
                    <h3 style="color: #00ff41; margin-bottom: 15px;">PONG MATRIX</h3>
                    <p style="margin-bottom: 10px;"><strong>Instructions:</strong></p>
                    <p style="margin-bottom: 5px;">${this.isTouchDevice ? 'Touchez la moitié gauche de l\'écran pour déplacer votre raquette' : 'Utilisez Z (haut) et S (bas) pour déplacer votre raquette'}</p>
                    <p style="margin-bottom: 15px;">Premier à ${this.scoreLimit} points gagne!</p>
                    <p style="margin-bottom: 15px; font-size: 12px; opacity: 0.8;">Appuyez sur ESPACE ou cliquez sur le bouton pour commencer</p>
                    <button id="startGameBtn" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">CLIQUER POUR COMMENCER</button>
                </div>` :
                `<div style="color: #00ff41; text-align: center; margin-bottom: 20px;">
                    <h3 style="color: #00ff41; margin-bottom: 15px;">PONG MATRIX</h3>
                    <p style="margin-bottom: 10px;"><strong>Instructions:</strong></p>
                    <p style="margin-bottom: 5px;">${this.isTouchDevice ? 'Touch the left half of the screen to move your paddle' : 'Use W (up) and S (down) to move your paddle'}</p>
                    <p style="margin-bottom: 15px;">First to ${this.scoreLimit} points wins!</p>
                    <p style="margin-bottom: 15px; font-size: 12px; opacity: 0.8;">Press SPACE or click the button to start</p>
                    <button id="startGameBtn" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">CLICK TO START</button>
                </div>`;
            
            this.content.innerHTML = instructions;
            
            //Add click event to start button
            const startBtn = document.getElementById('startGameBtn');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.startGame();
                });
            }
            
            //Also allow space key to start
            const spaceHandler = (e) => {
                if (e.code === 'Space' && !this.gameRunning) {
                    e.preventDefault();
                    this.startGame();
                    document.removeEventListener('keydown', spaceHandler);
                }
            };
            document.addEventListener('keydown', spaceHandler);
        }
        
        setupControls() {
            //Keyboard controls
            document.addEventListener('keydown', (e) => {
                if (!this.gameRunning) return;
                
                const key = e.key.toLowerCase();
                if (currentLang === 'fr') {
                    if (key === 'z') this.keys.up = true;
                    if (key === 's') this.keys.down = true;
                } else {
                    if (key === 'w') this.keys.up = true;
                    if (key === 's') this.keys.down = true;
                }
            });
            
            document.addEventListener('keyup', (e) => {
                if (!this.gameRunning) return;
                
                const key = e.key.toLowerCase();
                if (currentLang === 'fr') {
                    if (key === 'z') this.keys.up = false;
                    if (key === 's') this.keys.down = false;
                } else {
                    if (key === 'w') this.keys.up = false;
                    if (key === 's') this.keys.down = false;
                }
            });
            
            //Touch controls for mobile
            if (this.isTouchDevice) {
                this.terminal.addEventListener('touchstart', (e) => {
                    if (!this.gameRunning) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const touch = e.touches[0];
                    const rect = this.terminal.getBoundingClientRect();
                    this.touchY = touch.clientY - rect.top;
                });
                
                this.terminal.addEventListener('touchmove', (e) => {
                    if (!this.gameRunning) return;
                    e.preventDefault();
                    e.stopPropagation();
                    const touch = e.touches[0];
                    const rect = this.terminal.getBoundingClientRect();
                    this.touchY = touch.clientY - rect.top;
                });
                
                this.terminal.addEventListener('touchend', (e) => {
                    if (!this.gameRunning) return;
                    e.preventDefault();
                    e.stopPropagation();
                    this.touchY = null;
                });
            }
        }
        
        startGame() {
            this.gameRunning = true;
            this.lastUpdate = Date.now();
            
            //Clear any existing game loop
            if (this.gameLoop) {
                cancelAnimationFrame(this.gameLoop);
            }
            
            this.gameLoop = requestAnimationFrame(() => this.update());
        }
        
        update() {
            if (!this.gameRunning) return;
            
            const now = Date.now();
            const deltaTime = now - this.lastUpdate;
            
            //Limiter à ~25 FPS pour un jeu ASCII fluide mais contrôlable
            if (deltaTime >= 40) { // 40ms = 25 FPS
                this.updatePaddles();
                this.updateBall();
                this.checkCollisions();
                this.draw();
                this.checkGameOver();
                this.lastUpdate = now;
            }
            
            if (!this.gameOver) {
                this.gameLoop = requestAnimationFrame(() => this.update());
            }
        }
        
        updatePaddles() {
            //Player paddle movement
            if (this.isTouchDevice && this.touchY !== null) {
                const rect = this.terminal.getBoundingClientRect();
                const touchPercent = this.touchY / rect.height;
                const targetY = Math.floor(touchPercent * this.height);
                this.playerPaddle.y = Math.max(0, Math.min(this.height - this.playerPaddle.height, targetY - this.playerPaddle.height / 2));
            } else if (this.isMobile && this.touchY !== null) {
                //Fallback for mobile devices
                const rect = this.terminal.getBoundingClientRect();
                const touchPercent = this.touchY / rect.height;
                const targetY = Math.floor(touchPercent * this.height);
                this.playerPaddle.y = Math.max(0, Math.min(this.height - this.playerPaddle.height, targetY - this.playerPaddle.height / 2));
            } else {
                if (this.keys.up && this.playerPaddle.y > 0) {
                    this.playerPaddle.y--;
                }
                if (this.keys.down && this.playerPaddle.y < this.height - this.playerPaddle.height) {
                    this.playerPaddle.y++;
                }
            }
            
            //AI paddle movement (balanced - not too perfect, not too slow)
            const aiCenter = this.aiPaddle.y + this.aiPaddle.height / 2;
            const ballCenter = this.ball.y;
            
            //Add some imperfection but keep it competitive
            if (Math.random() > 0.03) { // 97% chance to move (very slight imperfection)
                if (aiCenter < ballCenter - 0.8 && this.aiPaddle.y < this.height - this.aiPaddle.height) {
                    this.aiPaddle.y++;
                } else if (aiCenter > ballCenter + 0.8 && this.aiPaddle.y > 0) {
                    this.aiPaddle.y--;
                }
            }
        }
        
        updateBall() {
            this.ball.x += this.ball.dx * this.ball.speed;
            this.ball.y += this.ball.dy * this.ball.speed;
        }
        
        checkCollisions() {
            //Wall collisions (top and bottom)
            if (this.ball.y <= 0 || this.ball.y >= this.height - 1) {
                this.ball.dy *= -1;
            }
            
            //Paddle collisions
            if (this.ball.x <= this.playerPaddle.x + 1 && 
                this.ball.y >= this.playerPaddle.y && 
                this.ball.y < this.playerPaddle.y + this.playerPaddle.height) {
                this.ball.dx *= -1;
                this.ball.speed = Math.min(this.ball.speed + 0.05, 1.5); // Accélération plus douce
            }
            
            if (this.ball.x >= this.aiPaddle.x - 1 && 
                this.ball.y >= this.aiPaddle.y && 
                this.ball.y < this.aiPaddle.y + this.aiPaddle.height) {
                this.ball.dx *= -1;
                this.ball.speed = Math.min(this.ball.speed + 0.05, 1.5); // Accélération plus douce
            }
            
            //Score points
            if (this.ball.x <= 0) {
                this.aiPaddle.score++;
                this.resetBall();
            } else if (this.ball.x >= this.width - 1) {
                this.playerPaddle.score++;
                this.resetBall();
            }
        }
        
        resetBall() {
            this.ball.x = Math.floor(this.width / 2);
            this.ball.y = Math.floor(this.height / 2);
            this.ball.dx = Math.random() > 0.5 ? 1 : -1;
            this.ball.dy = Math.random() > 0.5 ? 1 : -1;
            this.ball.speed = 0.8; // Vitesse de départ équilibrée
        }
        
        draw() {
            let display = '';
            
            //Draw score
            display += `${currentLang === 'fr' ? 'Score' : 'Score'}: ${this.playerPaddle.score} - ${this.aiPaddle.score}\n`;
            display += '─'.repeat(this.width) + '\n';
            
            //Draw game field
            for (let y = 0; y < this.height; y++) {
                let line = '';
                for (let x = 0; x < this.width; x++) {
                    let char = ' ';
                    
                    //Draw paddles
                    if (x === this.playerPaddle.x && 
                        y >= this.playerPaddle.y && 
                        y < this.playerPaddle.y + this.playerPaddle.height) {
                        char = '#';
                    }
                    
                    if (x === this.aiPaddle.x && 
                        y >= this.aiPaddle.y && 
                        y < this.aiPaddle.y + this.aiPaddle.height) {
                        char = '#';
                    }
                    
                    //Draw ball
                    if (x === Math.floor(this.ball.x) && y === Math.floor(this.ball.y)) {
                        char = 'O';
                    }
                    
                    //Draw center line
                    if (x === Math.floor(this.width / 2) && y % 2 === 0) {
                        char = '│';
                    }
                    
                    line += char;
                }
                display += line + '\n';
            }
            
            display += '─'.repeat(this.width) + '\n';
            
            //Adaptive font size for mobile
            const fontSize = this.isMobile ? '10px' : '12px';
            const lineHeight = this.isMobile ? '0.8' : '1';
            
            this.content.innerHTML = `<pre style="color: #00ff41; font-family: 'Courier New', monospace; font-size: ${fontSize}; line-height: ${lineHeight}; margin: 0; padding: 0;">${display}</pre>`;
            
            //Auto-scroll to bottom for mobile
            if (this.isMobile) {
                this.content.scrollTop = this.content.scrollHeight;
            }
        }
        
        checkGameOver() {
            if (this.playerPaddle.score >= this.scoreLimit || this.aiPaddle.score >= this.scoreLimit) {
                this.gameOver = true;
                this.winner = this.playerPaddle.score >= this.scoreLimit ? 'player' : 'ai';
                this.endGame();
            }
        }
        
        endGame() {
            this.gameRunning = false;
            
            const message = this.winner === 'player' ? 
                (currentLang === 'fr' ? 'VICTORY! Vous avez gagné!' : 'VICTORY! You won!') :
                (currentLang === 'fr' ? 'GAME OVER! L\'IA a gagné!' : 'GAME OVER! AI won!');
            
            this.content.innerHTML = `
                <div style="color: #00ff41; text-align: center; margin-top: 20px;">
                    <h2 style="color: ${this.winner === 'player' ? '#00ff41' : '#ff0000'};">
                        ${message}
                    </h2>
                    <p>${currentLang === 'fr' ? 'Score final' : 'Final Score'}: ${this.playerPaddle.score} - ${this.aiPaddle.score}</p>
                    <p style="font-size: 12px; margin-top: 20px;">${currentLang === 'fr' ? 'Fermeture automatique dans 3 secondes...' : 'Auto-closing in 3 seconds...'}</p>
                </div>
            `;
            
            //Close terminal after 3 seconds
            setTimeout(() => {
                closeMatrixTerminal();
            }, 3000);
        }
    }
    
    //Make closeMatrixTerminal global
    window.closeMatrixTerminal = closeMatrixTerminal;
    
    //Typing Effect on Hero Title (only on initial load)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let typingInterval = null;
        
        function typeHeroTitle() {
            let index = 0;
            heroTitle.textContent = '';
            
            function typeChar() {
                if (index < originalText.length) {
                    heroTitle.textContent += originalText[index];
                    index++;
                    typingInterval = setTimeout(typeChar, 100);
                }
            }
            typeChar();
        }
        
        function stopTyping() {
            if (typingInterval) {
                clearTimeout(typingInterval);
                typingInterval = null;
            }
        }
        
        //Start typing effect only on initial page load
        if (isInitialLoad) {
            setTimeout(typeHeroTitle, 1000);
        } else {
            //If not initial load, stop any ongoing typing and set text directly
            stopTyping();
            heroTitle.textContent = originalText;
        }
        
        //Make stopTyping available globally for language changes
        window.stopTyping = stopTyping;
    }
    
    //timeline elements animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, observerOptions);
        
        timelineObserver.observe(item);
    });
    
    //smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                //hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                //show target section
                target.classList.add('active');
                
                //update active navigation
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                //find and activate corresponding nav link
                const correspondingNavLink = document.querySelector(`[data-section="${targetId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
                
                //scroll to section
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    //header scroll management
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            //scroll down
            header.style.transform = 'translateY(-100%)';
            header.classList.add('scrolled');
        } else {
            //scroll up
            header.style.transform = 'translateY(0)';
            if(scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    //first section initialization
    if (sections.length > 0) {
        sections[0].classList.add('active');
    }
    
    //first nav link initialization
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    //mobile optimizations
    function initMobileOptimizations() {
        //detect if it's a touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            //optimize animations for touch devices
            const animatedElements = document.querySelectorAll('body::before, body::after, .code-rain, .circuit-lines, .binary-particles');
            
            //reduce animation frequency on mobile
            document.documentElement.style.setProperty('--animation-duration', '60s');
            
            //disable complex animations on less powerful devices
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
                const style = document.createElement('style');
                style.textContent = `
                    body::before, body::after { animation: none !important; }
                    .code-rain, .circuit-lines, .binary-particles { animation: none !important; }
                `;
                document.head.appendChild(style);
            }
        }
        
        //optimize scroll on mobile
        let ticking = false;
        function updateHeaderOnScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                    
                    lastScrollTop = scrollTop;
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        //replace existing scroll event listener
        window.removeEventListener('scroll', window.scrollHandler);
        window.addEventListener('scroll', updateHeaderOnScroll);
        window.scrollHandler = updateHeaderOnScroll;
    }
    
    //initialize mobile optimizations
    initMobileOptimizations();
    
    //image loading error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
    
    //critical resources preloading
    function preloadResources() {
        const criticalImages = [
            'CVPHOTO.jpg',
            'portfolio.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    //preload resources
    preloadResources();
}); 