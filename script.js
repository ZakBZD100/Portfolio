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
                <span class="terminal-title">Terminal</span>
                <button class="terminal-close" onclick="closeMatrixTerminal()">×</button>
            </div>
            <div class="terminal-content">
                <div class="terminal-line">$ <span class="typing-text" data-text="whoami"></span></div>
                <div class="terminal-output" style="display: none;">Zakariae El Bouzidi - Computer Science & Networks Engineering Student</div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="ls -la" data-delay="2000"></span></div>
                <div class="terminal-output" style="display: none;">
                    drwxr-xr-x  home/         4096  Jul 2025<br>
                    drwxr-xr-x  projects/     4096  Jul 2025<br>
                    drwxr-xr-x  skills/       4096  Jul 2025<br>
                    drwxr-xr-x  experience/   4096  Jul 2025<br>
                    drwxr-xr-x  contact/      4096  Jul 2025
                </div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="cat skills.txt" data-delay="4000"></span></div>
                <div class="terminal-output" style="display: none;">
                    === TECHNOLOGIES & TOOLS ===<br>
                    [████████████████████] Python Ecosystem (70%)<br>
                    [████████████████████] Mobile Development (70%)<br>
                    [████████████████████] Web Technologies (70%)<br>
                    [████████████████████] Database Systems (70%)<br>
                    [████████████████████] Problem Solving
                </div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="echo 'Welcome to my portfolio'" data-delay="6000"></span></div>
                <div class="terminal-output" style="display: none;">Welcome to my portfolio</div>
                
                <div class="terminal-line">$ <span class="typing-text" data-text="exit" data-delay="8000"></span></div>
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
                            }, 500);
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