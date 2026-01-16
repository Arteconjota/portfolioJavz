// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isVisible && !bar.classList.contains('animated')) {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
            bar.classList.add('animated');
        }
    });
};

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> MENSAJE ENVIADO';
            submitBtn.style.background = '#4CAF50';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = '¡Gracias! Tu mensaje ha sido enviado.';
                successMsg.style.cssText = `
                    background: #4CAF50;
                    color: white;
                    padding: 1rem;
                    margin-top: 1rem;
                    text-align: center;
                    animation: fadeIn 0.5s ease;
                `;
                
                contactForm.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }, 2000);
        }, 1500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar background on scroll

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Initialize skill bars animation
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// Add CSS animation for fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Typewriter Effect
class Typewriter {
    constructor() {
        this.textElement = document.querySelector('.typewriter-text');
        this.cursorElement = document.querySelector('.typewriter-cursor');
        this.phrases = [
            "Diseño. Código. Experiencias digitales.",
            "Donde la creatividad encuentra la tecnología.",
            "Transformando ideas en realidad digital."
        ];
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }
    
    init() {
        if (!this.textElement || !this.cursorElement) return;
        
        // Iniciar después de un breve delay
        setTimeout(() => this.type(), 1000);
    }
    
    type() {
        if (this.isPaused) return;
        
        const phrase = this.phrases[this.currentPhrase];
        
        if (!this.isDeleting) {
            // Escribiendo
            this.textElement.textContent = phrase.substring(0, this.currentChar + 1);
            this.currentChar++;
            
            // Efecto sonoro sutil (opcional)
            this.playTypeSound();
            
            if (this.currentChar === phrase.length) {
                // Pausa al finalizar la frase
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.isDeleting = true;
                    setTimeout(() => this.type(), 500);
                }, this.pauseTime);
                return;
            }
        } else {
            // Borrando
            this.textElement.textContent = phrase.substring(0, this.currentChar - 1);
            this.currentChar--;
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
            }
        }
        
        // Velocidad variable
        const speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    playTypeSound() {
        // Crear sonido de teclado sutil (opcional)
        try {
            // const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.value = 600 + Math.random() * 200;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05);
            
            oscillator.start();
            oscillator.stop(context.currentTime + 0.05);
        } catch (e) {
            // Silencioso si no hay soporte de audio
        }
    }
}

// Animate soft skills on scroll
const softSkills = document.querySelectorAll('.soft-skill-item');

const animateSoftSkills = () => {
    softSkills.forEach((skill, index) => {
        const rect = skill.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isVisible && !skill.classList.contains('animated')) {
            setTimeout(() => {
                skill.classList.add('animated');
                skill.style.opacity = '1';
                skill.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

// Añade estos estilos iniciales al CSS
const softSkillsStyle = document.createElement('style');
softSkillsStyle.textContent = `
    .soft-skill-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
    }
    
    .soft-skill-item.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(softSkillsStyle);

// Inicializar animaciones
window.addEventListener('load', () => {
    animateSoftSkills();
});

window.addEventListener('scroll', () => {
    animateSoftSkills();
});

// Soft skills animation on scroll
const softSkillCards = document.querySelectorAll('.soft-skill-card');

const animateSoftSkillCards = () => {
    softSkillCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.animationPlayState = 'running';
        }
    });
};

// Inicializar animaciones de soft skills
window.addEventListener('load', () => {
    animateSoftSkillCards();
});

window.addEventListener('scroll', () => {
    animateSoftSkillCards();
});

// Añadir estilos iniciales para las animaciones
const softSkillsAnimationStyle = document.createElement('style');
softSkillsAnimationStyle.textContent = `
    .soft-skill-card {
        opacity: 0;
        animation-play-state: paused;
    }
    
    .soft-skill-card.animated {
        animation-play-state: running;
    }
`;
document.head.appendChild(softSkillsAnimationStyle);

// Inicializar cuando el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    new Typewriter();
    
    // También puedes inicializar otros efectos aquí
    animateSkillBars();
});