//navigation and language switching
document.addEventListener('DOMContentLoaded', function() {
    //navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const languageToggle = document.querySelector('.language-toggle');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    //language state
    let currentLang = 'fr';
    
    //mobile menu management
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });
        
        //fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        //fermer le menu si on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    //initialize EmailJS with your public key
    emailjs.init("0WBHJeDymJUQ_QPXn");
    
    //navigation between sections
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
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    //language change
    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        this.textContent = currentLang.toUpperCase();
        this.setAttribute('data-lang', currentLang);
        
        //update all texts with data-fr and data-en attributes
        const elementsWithLang = document.querySelectorAll('[data-fr][data-en]');
        elementsWithLang.forEach(element => {
            const newText = currentLang === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
            if (newText) {
                element.textContent = newText;
            }
        });
    });
    
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
    
    if (profilePhoto && photoContainer) {
        let glowInterval;
        
        profilePhoto.addEventListener('mouseenter', function() {
            //matrix pulse effect
            this.style.animation = 'photoGlow 2s ease-in-out infinite';
            
            //matrix scan animation
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff41, transparent);
                z-index: 10;
                animation: matrixScan 1.5s ease-in-out;
            `;
            photoContainer.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentNode) {
                    scanLine.parentNode.removeChild(scanLine);
                }
            }, 1500);
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
        
        //scan animation on click
        profilePhoto.addEventListener('click', function() {
            //complete scan effect
            this.style.animation = 'borderRotate 3s linear';
            
            //create multiple scan effect
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const scanLine = document.createElement('div');
                    scanLine.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background: linear-gradient(90deg, transparent, #00ff88, transparent);
                        z-index: 10;
                        animation: matrixScan 2s ease-in-out;
                    `;
                    photoContainer.appendChild(scanLine);
                    
                    setTimeout(() => {
                        if (scanLine.parentNode) {
                            scanLine.parentNode.removeChild(scanLine);
                        }
                    }, 2000);
                }, i * 500);
            }
            
            setTimeout(() => {
                this.style.animation = '';
            }, 3000);
        });
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
        } else {
            //scroll up
            header.style.transform = 'translateY(0)';
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