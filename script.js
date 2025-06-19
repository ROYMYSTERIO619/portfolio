// DOM Elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navContainer = document.querySelector('.nav-container');
const navbarLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const scrollToTopBtn = document.getElementById('scrollToTop');
const typewriterElement = document.getElementById('typewriter');
const contactForm = document.getElementById('contactForm');
const skillBars = document.querySelectorAll('.skill-bar');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const counters = document.querySelectorAll('.counter');
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas ? particleCanvas.getContext('2d') : null;
const profileCards = document.querySelectorAll('.profile-card');

// Testimonials elements
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

// Calculator elements
const calculatorDisplay = document.getElementById('calculatorDisplay');

// Color picker elements
const colorSliders = document.querySelectorAll('.color-slider');
const colorPreview = document.getElementById('colorPreview');
const copyColorBtn = document.getElementById('copyColorBtn');

// Game elements
const snakeCanvas = document.getElementById('snakeCanvas');
const startSnakeBtn = document.getElementById('startSnakeBtn');
const memoryGame = document.getElementById('memoryGame');
const startMemoryBtn = document.getElementById('startMemoryBtn');

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');

// Particles array to store all particles
let particles = [];

// Theme Management
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Initialize all components
    initializeComponents();
});

// Initialize all components
function initializeComponents() {
    setupNavbar();
    setupScrollProgress();
    setupTypewriter();
    setupParticleBackground();
    setupScrollObserver();
    setupContactForm();
    setupAccordion();
    setupTestimonialSlider();
    setupCalculator();
    setupColorPicker();
    setupWeatherApp();
    setupBmiCalculator();
    setupUnitConverter();
    setupSnakeGame();
    setupMemoryGame();
    setupTicTacToe();
    setupRockPaperScissors();
    setupNewsletterForm();
    setupRecommendationsSlider();
    setupChat();
    setupEducationTimeline();
}

// Toggle mobile menu
function setupNavbar() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navContainer.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking a nav link
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navContainer.classList.remove('menu-open');
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active nav link on page load
    setTimeout(updateActiveNavLink, 500);

    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.padding = '15px 0';
        }
    });

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    
    // Dispatch theme change event for radar chart to update
    document.dispatchEvent(new CustomEvent('themeChanged'));
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Update scroll progress bar
function setupScrollProgress() {
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('scroll', updateScrollToTopButton);
    
    if (scrollProgressBar) {
        // Add gradient animation to scroll progress bar
        scrollProgressBar.style.background = 'linear-gradient(90deg, var(--accent-color) 0%, #64ffda 50%, var(--accent-color) 100%)';
        scrollProgressBar.style.backgroundSize = '200% 100%';
        scrollProgressBar.style.animation = 'gradientShift 2s ease infinite';
    }
    
    if (scrollToTopBtn) {
        // Add animation to scroll-to-top button
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.classList.add('pulse-animation');
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add shake animation when clicked
            scrollToTopBtn.classList.remove('pulse-animation');
            scrollToTopBtn.classList.add('shake-animation');
            
            // Reset animation after shaking
            setTimeout(() => {
                scrollToTopBtn.classList.remove('shake-animation');
                scrollToTopBtn.classList.add('pulse-animation');
            }, 500);
        });
    }
}

function updateScrollProgress() {
    if (scrollProgressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgressBar.style.width = scrolled + "%";
    }
}

function updateScrollToTopButton() {
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}

// Education Timeline Animation
function setupEducationTimeline() {
    const educationItems = document.querySelectorAll('.education-item');
    const timelineLine = document.querySelector('.education-timeline .timeline-line');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: unobserve after animation
            }
        });
    }, observerOptions);

    educationItems.forEach(item => {
        observer.observe(item);
    });

    // Animate timeline line on scroll
    window.addEventListener('scroll', () => {
        if (!timelineLine) return;
        const educationSection = document.getElementById('education');
        if (!educationSection) return;

        const sectionTop = educationSection.offsetTop;
        const sectionHeight = educationSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Consider middle of viewport

        if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
            timelineLine.classList.add('scrolled');
        } else {
            // Optional: remove class if you want the glow to disappear when out of view
            // timelineLine.classList.remove('scrolled'); 
        }
    });
}

// Typewriter effect
function setupTypewriter() {
    if (typewriterElement) {
        const texts = ['Developer', 'Problem Solver', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // faster when deleting
            } else {
                // Typing text
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // slower when typing
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // pause at end
            } 
            // If deletion is complete
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length; // next text
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing
        setTimeout(type, 1000);
    }
}

// Particle Background
function setupParticleBackground() {
    if (!particleCanvas || !ctx) return;
    
    // Adjust canvas size
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        initParticles(); // Re-initialize particles on resize
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: getParticleColor()
            });
        }
    }
    
    function getParticleColor() {
        // Change color based on theme
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            return `rgba(100, 255, 218, ${Math.random() * 0.4 + 0.1})`;
        } else {
            return `rgba(10, 25, 47, ${Math.random() * 0.3 + 0.05})`;
        }
    }
    
    // Update particles
    function updateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(p => {
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Connect particles
            connectParticles(p);
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    // Connect particles with lines if they are close
    function connectParticles(p) {
        particles.forEach(p2 => {
            if (p === p2) return;
            
            const dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
            const maxDist = 100;
            
            if (dist < maxDist) {
                ctx.beginPath();
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    }
    
    // Start animation
    initParticles();
    updateParticles();
}

// Intersection Observer for scroll animations
function setupScrollObserver() {
    const sections = document.querySelectorAll('.section');
    const skillsSection = document.getElementById('skills');
    const achievementsSection = document.getElementById('achievements');
    const projectsSection = document.getElementById('projects');
    const blogsSection = document.getElementById('blogs');
    const educationSection = document.getElementById('education');
    const recommendationsSection = document.getElementById('recommendations');
    const certificationsSection = document.getElementById('certifications');
    const codingProfilesSection = document.getElementById('coding-profiles');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const certificationCards = document.querySelectorAll('.certification-card');
    const codingProfileCards = document.querySelectorAll('.coding-profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate skill bars when skills section is visible
                if (entry.target === skillsSection) {
                    animateSkillBars();
                }
                
                // Animate counters when achievements section is visible
                if (entry.target === achievementsSection) {
                    animateCounters();
                }
                
                // Animate project cards when projects section is visible
                if (entry.target === projectsSection) {
                    animateProjectCards();
                }
                
                // Animate education timeline when education section is visible
                if (entry.target === educationSection) {
                    animateTimeline();
                }
                
                // Animate blog cards when blogs section is visible
                if (entry.target === blogsSection) {
                    animateBlogCards();
                }
                
                // Animate recommendations when recommendations section is visible
                if (entry.target === recommendationsSection) {
                    animateRecommendations();
                }
                
                // Animate certification cards when certifications section is visible
                if (entry.target === certificationsSection) {
                    animateCertificationCards();
                }
                
                // Animate coding profile cards when coding profiles section is visible
                if (entry.target === codingProfilesSection) {
                    animateCodingProfiles();
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Set up observers for specific elements with different animations
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections for basic fade-in
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe timeline items for staggered animations
    timelineItems.forEach(item => {
        itemObserver.observe(item);
    });
    
    // Observe certification cards for staggered animations
    certificationCards.forEach(card => {
        itemObserver.observe(card);
    });
    
    // Observe coding profile cards for staggered animations
    codingProfileCards.forEach(card => {
        itemObserver.observe(card);
    });
    
    // Observe profile cards for staggered animations
    profileCards.forEach(card => {
        itemObserver.observe(card);
    });
    
    // Add hover effect for project cards
    setupHoverEffects();
}

// Animate project cards with a staggered effect
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Fade in with staggered delay
        setTimeout(() => {
            card.classList.add('animate-in');
            
            // Add 3D tilt effect on hover
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return; // Skip on mobile
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                // Calculate rotation based on mouse position (max 5deg)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = ((x - centerX) / centerX) * 5; // -5 to 5 degrees
                const rotateX = ((centerY - y) / centerY) * 5; // -5 to 5 degrees
                
                // Apply transform with smooth transition
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translateY(-5px)`;
                
                // Add subtle shadow based on tilt
                card.style.boxShadow = `
                    0 ${10 + Math.abs(rotateX)}px ${20 + Math.abs(rotateY)}px rgba(var(--accent-color-rgb), 0.1),
                    0 4px 10px rgba(0, 0, 0, 0.1)
                `;
            });
            
            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                // Let CSS handle default hover state
                setTimeout(() => {
                    if (!card.matches(':hover')) {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    }
                }, 100);
            });
        }, 300 + (index * 150)); // Staggered delay for cards
    });
}

// Animate timeline items with a staggered effect
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 300);
    });
}

// Animate blog cards with a staggered effect
function animateBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
            
            // Add a subtle initial rotation to enhance the 3D effect
            const inner = card.querySelector('.blog-card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(15deg)';
                setTimeout(() => {
                    inner.style.transform = '';
                }, 300);
            }
        }, index * 200);
    });
}

// Setup hover animations and effects
function setupHoverEffects() {
    // Add glow effect to skill icons on hover
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('glow');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('glow');
        });
    });
    
    // Add subtle hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse-once');
            setTimeout(() => {
                button.classList.remove('pulse-once');
            }, 600);
        });
    });
    
    // Add hover effects to certification cards
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        // Add tilt effect on certification cards for enhanced 3D feeling
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Skip on mobile
            
            const inner = card.querySelector('.certification-inner');
            if (!inner) return;
            
            // Calculate tilt values
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Normalize values
            const xc = (x - rect.width / 2) / (rect.width / 2);
            const yc = (y - rect.height / 2) / (rect.height / 2);
            
            // Apply tilt effect (subtle rotation when not flipped)
            const notFlipped = !inner.style.transform.includes('rotateY(180deg)');
            if (notFlipped) {
                inner.style.transform = `rotateY(${xc * 5}deg) rotateX(${yc * -5}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.certification-inner');
            if (inner && !inner.style.transform.includes('rotateY(180deg)')) {
                inner.style.transform = '';
            }
        });
    });
    
    // Add hover effects for coding profile cards
    const codingProfileCards = document.querySelectorAll('.coding-profile-card');
    codingProfileCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle shadow pulse effect
            card.classList.add('shadow-pulse');
            
            // Highlight stats
            const statItems = card.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('highlight');
                    setTimeout(() => {
                        item.classList.remove('highlight');
                    }, 300);
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow-pulse');
        });
    });
    
    // Add hover effects to profile cards
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect on hover
            const glow = document.createElement('div');
            glow.classList.add('card-glow');
            card.appendChild(glow);
            
            setTimeout(() => {
                glow.style.opacity = '1';
            }, 10);
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => {
                    glow.remove();
                }, 300);
            }
        });
    });
}

// Animate skill bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
    
    // Initialize radar chart if available
    if (typeof initializeRadarChart === 'function') {
        setTimeout(() => {
            initializeRadarChart();
        }, 300); // Add a small delay to ensure chart renders properly
    }
}

// Animate counters
function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = Math.ceil(target / 100);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, duration / 100);
    });
}

// Animate certification cards with a staggered flip effect
function animateCertificationCards() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    certificationCards.forEach((card, index) => {
        // Add staggered entrance animation
        setTimeout(() => {
            card.classList.add('animate-in');
            
            // Add a slight initial tilt to enhance the 3D appearance
            const inner = card.querySelector('.certification-inner');
            if (inner) {
                inner.style.transform = 'rotateY(5deg) rotateX(-2deg)';
                setTimeout(() => {
                    inner.style.transform = '';
                }, 300);
            }
            
            // Setup flip functionality if not already set
            if (!card.dataset.flipInitialized) {
                const flipBtn = card.querySelector('.flip-btn');
                const resetFlipBtn = card.querySelector('.reset-flip-btn');
                
                if (flipBtn && inner) {
                    flipBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        inner.classList.add('flipped');
                    });
                }
                
                if (resetFlipBtn && inner) {
                    resetFlipBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        inner.classList.remove('flipped');
                    });
                }
                
                // Mark as initialized to avoid duplicate listeners
                card.dataset.flipInitialized = 'true';
            }
        }, 300 + (index * 150)); // Staggered delay
    });
}

// Animate coding profile cards with a staggered effect
function animateCodingProfiles() {
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach((card, index) => {
        // Add staggered entrance animation with delay based on index
        setTimeout(() => {
            // Apply a subtle bounce effect on entrance
            card.style.transform = 'translateY(-15px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 400);
            
            // Animate stats with a count-up effect
            const statValues = card.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || stat.textContent);
                const prefix = stat.getAttribute('data-prefix') || '';
                const suffix = stat.getAttribute('data-suffix') || '';
                
                if (!isNaN(target)) {
                    let current = 0;
                    const increment = Math.max(1, Math.ceil(target / 25));
                    const duration = 1500; // ms
                    
                    // Save original text for reference
                    stat.dataset.originalText = stat.textContent;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = `${prefix}${target}${suffix}`;
                            clearInterval(timer);
                            
                            // Add a small highlight animation when counting completes
                            stat.parentElement.classList.add('highlight');
                            setTimeout(() => {
                                stat.parentElement.classList.remove('highlight');
                            }, 500);
                        } else {
                            stat.textContent = `${prefix}${current}${suffix}`;
                        }
                    }, duration / 25);
                }
            });
            
            // Animate difficulty bars if they exist
            const difficultyBars = card.querySelectorAll('.difficulty-fill');
            difficultyBars.forEach(bar => {
                // Get the percentage from the adjacent percentage element
                const percentageEl = bar.closest('.difficulty-item').querySelector('.difficulty-percentage');
                if (percentageEl) {
                    const percentage = parseInt(percentageEl.textContent);
                    if (!isNaN(percentage)) {
                        // Set the custom property for width animation
                        bar.style.setProperty('--fill-width', `${percentage}%`);
                    }
                }
                
                // Apply animation with staggered delay
                setTimeout(() => {
                    bar.style.width = 'var(--fill-width)';
                }, 200);
            });
            
            // Add shimmer effect to the tags if they exist
            const tags = card.querySelectorAll('.gfg-tag');
            tags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        tag.style.transform = '';
                    }, 300);
                }, tagIndex * 150); // Staggered animation for each tag
            });
            
        }, 300 + (index * 200)); // Staggered delay based on card index
    });
}

// Setup accordion
function setupAccordion() {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            accordionItem.classList.toggle('active');
        });
    });
}

// Contact form validation and submission
function setupContactForm() {
    if (contactForm) {
        // Apply animation classes to submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.classList.add('btn-submit');
            // Wrap text content in span for animation effects
            submitButton.innerHTML = `<span>${submitButton.textContent}</span>`;
        }
        
        // Add focus/blur effects for form fields
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Add focus animation
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                
                // Add ripple effect on focus
                const ripple = document.createElement('span');
                ripple.classList.add('input-ripple');
                this.parentElement.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            });
            
            // Remove focus animation
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            
            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            
            let valid = true;
            
            // Validate name with animated feedback
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                nameInput.classList.add('shake-animation');
                setTimeout(() => nameInput.classList.remove('shake-animation'), 500);
                valid = false;
            }
            
            // Validate email with animated feedback
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                emailInput.classList.add('shake-animation');
                setTimeout(() => emailInput.classList.remove('shake-animation'), 500);
                valid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email';
                emailError.style.display = 'block';
                emailInput.classList.add('shake-animation');
                setTimeout(() => emailInput.classList.remove('shake-animation'), 500);
                valid = false;
            }
            
            // Validate message with animated feedback
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                messageInput.classList.add('shake-animation');
                setTimeout(() => messageInput.classList.remove('shake-animation'), 500);
                valid = false;
            }
            
            if (valid) {
                // Add loading animation to button
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.classList.add('loading');
                    submitButton.innerHTML = '<span><i class="fas fa-spinner rotate-animation"></i> Sending...</span>';
                }
                
                try {
                    // Send form data to backend
                    const response = await fetch('http://localhost:3000/api/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: nameInput.value.trim(),
                            email: emailInput.value.trim(),
                            message: messageInput.value.trim()
                        })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Success animation
                        submitButton.classList.remove('loading');
                        submitButton.classList.add('success');
                        submitButton.innerHTML = '<span><i class="fas fa-check"></i> Sent!</span>';
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Show success message with animation
                        const successMessage = document.createElement('div');
                        successMessage.classList.add('success-message');
                        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                        contactForm.appendChild(successMessage);
                        
                        // Remove success message after delay
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            setTimeout(() => {
                                successMessage.remove();
                            }, 300);
                        }, 3000);
                    } else {
                        throw new Error(data.message || 'Failed to send message');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = 'Failed to send message. Please try again later.';
                    contactForm.appendChild(errorMessage);
                    
                    // Remove error message after delay
                    setTimeout(() => {
                        errorMessage.style.opacity = '0';
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 300);
                    }, 3000);
                } finally {
                    // Reset button state
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.classList.remove('success', 'loading');
                        submitButton.innerHTML = '<span>Send Message</span>';
                    }, 1500);
                }
            }
        });
    }
}

// Additional scroll to section for any links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    }
});

// ======================
// TESTIMONIALS CAROUSEL
// ======================
function setupTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!testimonialCards.length) return;
    
    let currentIndex = 0;
    
    // Initialize first testimonial
    testimonialCards[0].classList.add('active');
    dots[0].classList.add('active');
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Hide all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) index = testimonialCards.length - 1;
            showTestimonial(index);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= testimonialCards.length) index = 0;
            showTestimonial(index);
        });
    }
    
    // Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto play
    setInterval(() => {
        let index = currentIndex + 1;
        if (index >= testimonialCards.length) index = 0;
        showTestimonial(index);
    }, 5000);
}

// ======================
// CALCULATOR FUNCTIONS
// ======================
function setupCalculator() {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    let currentInput = '';
    let currentOperation = null;
    let previousInput = null;
    
    // Attach calculator function to window object
    window.calculator = function(action) {
        switch(action) {
            case 'clear':
                currentInput = '';
                currentOperation = null;
                previousInput = null;
                display.value = '0';
                break;
                
            case 'backspace':
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    display.value = currentInput || '0';
                }
                break;
                
            case 'percent':
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    display.value = currentInput;
                }
                break;
                
            case 'divide':
            case 'multiply':
            case 'subtract':
            case 'add':
            case 'power':
                if (currentInput) {
                    previousInput = currentInput;
                    currentOperation = action;
                    currentInput = '';
                }
                break;
                
            case 'sin':
                if (currentInput) {
                    currentInput = Math.sin(parseFloat(currentInput) * Math.PI / 180).toString();
                    display.value = currentInput;
                }
                break;
                
            case 'cos':
                if (currentInput) {
                    currentInput = Math.cos(parseFloat(currentInput) * Math.PI / 180).toString();
                    display.value = currentInput;
                }
                break;
                
            case 'tan':
                if (currentInput) {
                    currentInput = Math.tan(parseFloat(currentInput) * Math.PI / 180).toString();
                    display.value = currentInput;
                }
                break;
                
            case 'sqrt':
                if (currentInput) {
                    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                    display.value = currentInput;
                }
                break;
                
            case 'decimal':
                if (!currentInput.includes('.')) {
                    currentInput = currentInput ? currentInput + '.' : '0.';
                    display.value = currentInput;
                }
                break;
                
            case 'equals':
                if (currentInput && previousInput && currentOperation) {
                    const num1 = parseFloat(previousInput);
                    const num2 = parseFloat(currentInput);
                    let result;
                    
                    switch(currentOperation) {
                        case 'add':
                            result = num1 + num2;
                            break;
                        case 'subtract':
                            result = num1 - num2;
                            break;
                        case 'multiply':
                            result = num1 * num2;
                            break;
                        case 'divide':
                            result = num1 / num2;
                            break;
                        case 'power':
                            result = Math.pow(num1, num2);
                            break;
                    }
                    
                    currentInput = result.toString();
                    display.value = currentInput;
                    previousInput = null;
                    currentOperation = null;
                }
                break;
                
            default:
                // Handle number inputs (0-9)
                if (!isNaN(parseInt(action))) {
                    currentInput += action;
                    display.value = currentInput;
                }
        }
    };
    
    // Initialize display with 0
    display.value = '0';
}

// ======================
// COLOR PICKER
// ======================
function setupColorPicker() {
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');
    const colorPreview = document.getElementById('colorPreview');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const copyColorBtn = document.getElementById('copyColorBtn');
    
    if (!redSlider || !greenSlider || !blueSlider) return;
    
    function updateColor() {
        const r = parseInt(redSlider.value);
        const g = parseInt(greenSlider.value);
        const b = parseInt(blueSlider.value);
        
        // Update display values
        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;
        
        // Update color preview
        const color = `rgb(${r}, ${g}, ${b})`;
        colorPreview.style.backgroundColor = color;
        
        // Update text values
        const hex = rgbToHex(r, g, b);
        hexValue.value = hex;
        rgbValue.value = color;
    }
    
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    
    // Add event listeners
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);
    
    // Copy color to clipboard
    if (copyColorBtn) {
        copyColorBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(hexValue.value).then(() => {
                // Show success message
                copyColorBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyColorBtn.textContent = 'Copy to Clipboard';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
    
    // Initialize with default values
    updateColor();
}

// ======================
// SNAKE GAME
// ======================
function setupSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas && canvas.getContext('2d');
    const startBtn = document.getElementById('startSnakeBtn');
    const scoreElement = document.getElementById('snakeScore');
    
    if (!canvas || !ctx) return;
    
    const GRID_SIZE = 15;
    const GRID_COUNT = canvas.width / GRID_SIZE;
    let snake = [{x: 10, y: 10}];
    let food = {x: 5, y: 5};
    let direction = 'right';
    let score = 0;
    let gameInterval;
    let gameSpeed = 150;
    let isGameRunning = false;
    
    function drawSnake() {
        ctx.fillStyle = '#64FFDA';
        snake.forEach((segment, index) => {
            // Head has different color
            if (index === 0) {
                ctx.fillStyle = '#6C63FF';
            } else {
                ctx.fillStyle = '#64FFDA';
            }
            
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            
            // Draw a smaller square inside for effect
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(segment.x * GRID_SIZE + 3, segment.y * GRID_SIZE + 3, GRID_SIZE - 6, GRID_SIZE - 6);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = '#FF5252';
        ctx.beginPath();
        ctx.arc(
            food.x * GRID_SIZE + GRID_SIZE/2, 
            food.y * GRID_SIZE + GRID_SIZE/2, 
            GRID_SIZE/2, 
            0, 
            Math.PI * 2
        );
        ctx.fill();
        
        // Add shine effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(
            food.x * GRID_SIZE + GRID_SIZE/2 - 2, 
            food.y * GRID_SIZE + GRID_SIZE/2 - 2, 
            GRID_SIZE/5, 
            0, 
            Math.PI * 2
        );
        ctx.fill();
    }
    
    function moveSnake() {
        const head = {...snake[0]};
        
        switch(direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        // Check for collision with walls
        if (head.x < 0 || head.y < 0 || head.x >= GRID_COUNT || head.y >= GRID_COUNT) {
            gameOver();
            return;
        }
        
        // Check for collision with self
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // Insert new head
        snake.unshift(head);
        
        // Check for food collision
        if (head.x === food.x && head.y === food.y) {
            // Generate new food
            generateFood();
            
            // Increase score
            score += 10;
            if (scoreElement) {
                scoreElement.textContent = score;
            }
            
            // Increase speed
            if (score % 50 === 0) {
                gameSpeed = Math.max(50, gameSpeed - 10);
                restartGameInterval();
            }
        } else {
            // Remove tail if no food eaten
            snake.pop();
        }
    }
    
    function generateFood() {
        // Generate random coordinates
        let newFood;
        let isValidPosition = false;
        
        while (!isValidPosition) {
            newFood = {
                x: Math.floor(Math.random() * GRID_COUNT),
                y: Math.floor(Math.random() * GRID_COUNT)
            };
            
            // Check if food is on snake
            isValidPosition = true;
            for (let segment of snake) {
                if (segment.x === newFood.x && segment.y === newFood.y) {
                    isValidPosition = false;
                    break;
                }
            }
        }
        
        food = newFood;
    }
    
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < GRID_COUNT; i++) {
            ctx.beginPath();
            ctx.moveTo(i * GRID_SIZE, 0);
            ctx.lineTo(i * GRID_SIZE, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i * GRID_SIZE);
            ctx.lineTo(canvas.width, i * GRID_SIZE);
            ctx.stroke();
        }
        
        // Move snake
        moveSnake();
        
        // Draw food and snake
        drawFood();
        drawSnake();
    }
    
    function startGame() {
        // Reset game state
        snake = [{x: 10, y: 10}];
        direction = 'right';
        score = 0;
        gameSpeed = 150;
        generateFood();
        
        if (scoreElement) {
            scoreElement.textContent = score;
        }
        
        // Start game loop
        if (!isGameRunning) {
            gameInterval = setInterval(gameLoop, gameSpeed);
            isGameRunning = true;
            
            if (startBtn) {
                startBtn.textContent = 'Restart Game';
            }
        }
    }
    
    function gameOver() {
        clearInterval(gameInterval);
        isGameRunning = false;
        
        // Display game over message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FF5252';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 10);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 20);
    }
    
    function restartGameInterval() {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
    
    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        if (!isGameRunning) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });
    
    // Start game button
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    // Initialize canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw initial text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press "Start Game" to play', canvas.width/2, canvas.height/2);
}

// ======================
// MEMORY MATCH GAME
// ======================
function setupMemoryGame() {
    const memoryGame = document.getElementById('memoryGame');
    const startBtn = document.getElementById('startMemoryBtn');
    const moveCountElement = document.getElementById('moveCount');
    const matchCountElement = document.getElementById('matchCount');
    
    if (!memoryGame || !startBtn) return;
    
    const symbols = ['♠', '♥', '♦', '♣', '★', '✿', '❄', '☀'];
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let moveCount = 0;
    let matchCount = 0;
    
    function createCard(symbol) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.innerHTML = symbol;
        
        card.addEventListener('click', () => {
            // Ignore if card is already flipped or matched
            if (card.classList.contains('flipped') || 
                card.classList.contains('matched') ||
                flippedCards.length >= 2) {
                return;
            }
            
            // Flip card
            card.classList.add('flipped');
            flippedCards.push(card);
            
            // Check for match if two cards are flipped
            if (flippedCards.length === 2) {
                moveCount++;
                updateMoveCount();
                
                const [card1, card2] = flippedCards;
                if (card1.dataset.symbol === card2.dataset.symbol) {
                    // Match found
                    setTimeout(() => {
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        matchedCards.push(card1, card2);
                        flippedCards = [];
                        
                        matchCount++;
                        updateMatchCount();
                        
                        // Check if game is complete
                        if (matchedCards.length === cards.length) {
                            showGameComplete();
                        }
                    }, 500);
                } else {
                    // No match
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
        
        return card;
    }
    
    function updateMoveCount() {
        if (moveCountElement) {
            moveCountElement.textContent = moveCount;
        }
    }
    
    function updateMatchCount() {
        if (matchCountElement) {
            matchCountElement.textContent = matchCount;
        }
    }
    
    function showGameComplete() {
        // Create and show a completion message
        const message = document.createElement('div');
        message.className = 'game-complete-message';
        message.innerHTML = `
            <h3>Congratulations!</h3>
            <p>You completed the game in ${moveCount} moves.</p>
        `;
        
        memoryGame.innerHTML = '';
        memoryGame.appendChild(message);
    }
    
    function startGame() {
        // Reset game state
        memoryGame.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedCards = [];
        moveCount = 0;
        matchCount = 0;
        updateMoveCount();
        updateMatchCount();
        
        // Create pairs of cards
        const cardSymbols = [...symbols, ...symbols];
        
        // Shuffle cards
        for (let i = cardSymbols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
        }
        
        // Create and add cards to the grid
        cardSymbols.forEach(symbol => {
            const card = createCard(symbol);
            cards.push(card);
            memoryGame.appendChild(card);
        });
    }
    
    // Start game button
    startBtn.addEventListener('click', startGame);
    
    // Initialize game
    startGame();
}

// ======================
// NEWSLETTER SUBSCRIBE
// ======================
// Weather App Implementation
function setupWeatherApp() {
    const weatherSearchBtn = document.getElementById('weatherSearchBtn');
    const weatherLocation = document.getElementById('weatherLocation');
    const weatherCity = document.getElementById('weatherCity');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherHumidity = document.getElementById('weatherHumidity');
    const weatherWind = document.getElementById('weatherWind');
    const weatherResult = document.getElementById('weatherResult');

    if (!weatherSearchBtn || !weatherLocation) return;

    weatherSearchBtn.addEventListener('click', () => {
        const location = weatherLocation.value.trim();
        if (location) {
            getWeatherData(location);
        }
    });

    weatherLocation.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const location = weatherLocation.value.trim();
            if (location) {
                getWeatherData(location);
            }
        }
    });

    function getWeatherData(location) {
        const apiKey = 'd22b07cf1d1a86aaad7b1ed2c2213c6f'; // <-- Replace with your key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

        weatherCity.textContent = 'Loading...';
        weatherTemp.textContent = '--';
        weatherDesc.textContent = 'Fetching data...';
        weatherHumidity.textContent = '--%';
        weatherWind.textContent = '-- m/s';

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('City not found');
                return response.json();
            })
            .then(data => {
                weatherCity.textContent = data.name + ', ' + data.sys.country;
                weatherTemp.textContent = Math.round(data.main.temp);
                weatherDesc.textContent = data.weather[0].description.replace(/^\w/, c => c.toUpperCase());
                weatherHumidity.textContent = data.main.humidity + '%';
                weatherWind.textContent = data.wind.speed + ' m/s';
            })
            .catch(error => {
                weatherCity.textContent = 'Not found';
                weatherTemp.textContent = '--';
                weatherDesc.textContent = error.message;
                weatherHumidity.textContent = '--%';
                weatherWind.textContent = '-- m/s';
            });
    }
}

// BMI Calculator Implementation
function setupBmiCalculator() {
    const heightInput = document.getElementById('bmiHeight');
    const weightInput = document.getElementById('bmiWeight');
    const calculateBtn = document.getElementById('calculateBmiBtn');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiMarker = document.getElementById('bmiMarker');
    
    if (!heightInput || !weightInput || !calculateBtn) return;
    
    calculateBtn.addEventListener('click', calculateBMI);
    
    function calculateBMI() {
        const height = parseFloat(heightInput.value) / 100; // Convert cm to m
        const weight = parseFloat(weightInput.value);
        
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            bmiValue.textContent = 'Invalid input';
            bmiCategory.textContent = 'Please enter valid values';
            return;
        }
        
        const bmi = weight / (height * height);
        const roundedBMI = bmi.toFixed(1);
        
        bmiValue.textContent = roundedBMI;
        
        let category;
        let markerPosition;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            markerPosition = (bmi / 18.5) * 25; // Position within underweight range (0-25%)
        } else if (bmi < 25) {
            category = 'Normal weight';
            markerPosition = 25 + ((bmi - 18.5) / 6.5) * 25; // Position within normal range (25-50%)
        } else if (bmi < 30) {
            category = 'Overweight';
            markerPosition = 50 + ((bmi - 25) / 5) * 25; // Position within overweight range (50-75%)
        } else {
            category = 'Obese';
            const maxBMI = 40; // Cap for visualization purposes
            const cappedBMI = Math.min(bmi, maxBMI);
            markerPosition = 75 + ((cappedBMI - 30) / 10) * 25; // Position within obese range (75-100%)
        }
        
        bmiCategory.textContent = 'Category: ' + category;
        bmiMarker.style.left = markerPosition + '%';
        
        // Add animation for result
        bmiValue.classList.add('pulse-animation');
        setTimeout(() => {
            bmiValue.classList.remove('pulse-animation');
        }, 1000);
    }
}

// Unit Converter Implementation
function setupUnitConverter() {
    const converterType = document.getElementById('converterType');
    const converterInput = document.getElementById('converterInput');
    const converterOutput = document.getElementById('converterOutput');
    const converterFromUnit = document.getElementById('converterFromUnit');
    const converterToUnit = document.getElementById('converterToUnit');
    const convertBtn = document.getElementById('convertBtn');
    
    if (!converterType || !convertBtn) return;
    
    // Define conversion units
    const units = {
        length: ['meters', 'kilometers', 'centimeters', 'millimeters', 'miles', 'yards', 'feet', 'inches'],
        weight: ['kilograms', 'grams', 'milligrams', 'pounds', 'ounces'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
        time: ['seconds', 'minutes', 'hours', 'days']
    };
    
    // Populate the unit dropdowns based on the selected type
    converterType.addEventListener('change', updateUnitOptions);
    
    // Initial population
    updateUnitOptions();
    
    // Convert button click handler
    convertBtn.addEventListener('click', convertUnits);
    
    function updateUnitOptions() {
        const type = converterType.value;
        const typeUnits = units[type];
        
        // Clear existing options
        converterFromUnit.innerHTML = '';
        converterToUnit.innerHTML = '';
        
        // Add new options
        typeUnits.forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit;
            fromOption.textContent = unit;
            converterFromUnit.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = unit;
            toOption.textContent = unit;
            converterToUnit.appendChild(toOption);
        });
        
        // Set default selection
        if (type === 'length') {
            converterFromUnit.value = 'meters';
            converterToUnit.value = 'kilometers';
        } else if (type === 'weight') {
            converterFromUnit.value = 'kilograms';
            converterToUnit.value = 'pounds';
        } else if (type === 'temperature') {
            converterFromUnit.value = 'Celsius';
            converterToUnit.value = 'Fahrenheit';
        } else if (type === 'time') {
            converterFromUnit.value = 'minutes';
            converterToUnit.value = 'hours';
        }
    }
    
    function convertUnits() {
        const type = converterType.value;
        const fromUnit = converterFromUnit.value;
        const toUnit = converterToUnit.value;
        const inputValue = parseFloat(converterInput.value);
        
        if (isNaN(inputValue)) {
            converterOutput.value = 'Invalid input';
            return;
        }
        
        // Convert to base unit
        let baseValue;
        
        switch (type) {
            case 'length':
                baseValue = convertToMeters(inputValue, fromUnit);
                converterOutput.value = convertFromMeters(baseValue, toUnit).toFixed(6);
                break;
                
            case 'weight':
                baseValue = convertToGrams(inputValue, fromUnit);
                converterOutput.value = convertFromGrams(baseValue, toUnit).toFixed(6);
                break;
                
            case 'temperature':
                baseValue = convertToCelsius(inputValue, fromUnit);
                converterOutput.value = convertFromCelsius(baseValue, toUnit).toFixed(2);
                break;
                
            case 'time':
                baseValue = convertToSeconds(inputValue, fromUnit);
                converterOutput.value = convertFromSeconds(baseValue, toUnit).toFixed(6);
                break;
        }
    }
    
    // Length conversions
    function convertToMeters(value, unit) {
        switch (unit) {
            case 'meters': return value;
            case 'kilometers': return value * 1000;
            case 'centimeters': return value / 100;
            case 'millimeters': return value / 1000;
            case 'miles': return value * 1609.34;
            case 'yards': return value * 0.9144;
            case 'feet': return value * 0.3048;
            case 'inches': return value * 0.0254;
        }
    }
    
    function convertFromMeters(meters, unit) {
        switch (unit) {
            case 'meters': return meters;
            case 'kilometers': return meters / 1000;
            case 'centimeters': return meters * 100;
            case 'millimeters': return meters * 1000;
            case 'miles': return meters / 1609.34;
            case 'yards': return meters / 0.9144;
            case 'feet': return meters / 0.3048;
            case 'inches': return meters / 0.0254;
        }
    }
    
    // Weight conversions
    function convertToGrams(value, unit) {
        switch (unit) {
            case 'kilograms': return value * 1000;
            case 'grams': return value;
            case 'milligrams': return value / 1000;
            case 'pounds': return value * 453.592;
            case 'ounces': return value * 28.3495;
        }
    }
    
    function convertFromGrams(grams, unit) {
        switch (unit) {
            case 'kilograms': return grams / 1000;
            case 'grams': return grams;
            case 'milligrams': return grams * 1000;
            case 'pounds': return grams / 453.592;
            case 'ounces': return grams / 28.3495;
        }
    }
    
    // Temperature conversions
    function convertToCelsius(value, unit) {
        switch (unit) {
            case 'Celsius': return value;
            case 'Fahrenheit': return (value - 32) * 5/9;
            case 'Kelvin': return value - 273.15;
        }
    }
    
    function convertFromCelsius(celsius, unit) {
        switch (unit) {
            case 'Celsius': return celsius;
            case 'Fahrenheit': return (celsius * 9/5) + 32;
            case 'Kelvin': return celsius + 273.15;
        }
    }
    
    // Time conversions
    function convertToSeconds(value, unit) {
        switch (unit) {
            case 'seconds': return value;
            case 'minutes': return value * 60;
            case 'hours': return value * 3600;
            case 'days': return value * 86400;
        }
    }
    
    function convertFromSeconds(seconds, unit) {
        switch (unit) {
            case 'seconds': return seconds;
            case 'minutes': return seconds / 60;
            case 'hours': return seconds / 3600;
            case 'days': return seconds / 86400;
        }
    }
}

// Tic Tac Toe Implementation
function setupTicTacToe() {
    const cells = document.querySelectorAll('.tictactoe-cell');
    const status = document.getElementById('ticTacToeStatus');
    const resetButton = document.getElementById('resetTicTacToeBtn');
    
    if (!cells.length || !status || !resetButton) return;
    
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = true;
    
    // Initialize game
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
    
    resetButton.addEventListener('click', resetGame);
    
    function handleCellClick(cell) {
        const cellIndex = cell.getAttribute('data-cell');
        
        // Check if cell is already filled or game is inactive
        if (gameBoard[cellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update cell and game state
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        
        // Add animation to newly placed mark
        cell.classList.add('pulse-animation');
        setTimeout(() => {
            cell.classList.remove('pulse-animation');
        }, 500);
        
        // Check for win or draw
        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            highlightWinningCells();
            return;
        }
        
        if (checkDraw()) {
            status.textContent = 'Game ended in a draw!';
            gameActive = false;
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s turn`;
    }
    
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && 
                   gameBoard[a] === gameBoard[b] && 
                   gameBoard[a] === gameBoard[c];
        });
    }
    
    function highlightWinningCells() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && 
                gameBoard[a] === gameBoard[b] && 
                gameBoard[a] === gameBoard[c]) {
                
                cells[a].classList.add('winning');
                cells[b].classList.add('winning');
                cells[c].classList.add('winning');
                break;
            }
        }
    }
    
    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }
    
    function resetGame() {
        gameBoard = Array(9).fill('');
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = `${currentPlayer}'s turn`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
    }
}

// Rock Paper Scissors Implementation
function setupRockPaperScissors() {
    const choices = document.querySelectorAll('.rps-choice');
    const playerChoiceDisplay = document.getElementById('playerChoice');
    const computerChoiceDisplay = document.getElementById('computerChoice');
    const messageDisplay = document.getElementById('rpsMessage');
    const playerScoreDisplay = document.getElementById('playerScore');
    const computerScoreDisplay = document.getElementById('computerScore');
    
    if (!choices.length || !playerChoiceDisplay || !computerChoiceDisplay) return;
    
    let playerScore = 0;
    let computerScore = 0;
    
    // Game emojis
    const emojiMap = {
        'rock': '🪨',
        'paper': '📄',
        'scissors': '✂️'
    };
    
    // Add reset button for scores
    let resetBtn = document.getElementById('rpsResetBtn');
    if (!resetBtn) {
        resetBtn = document.createElement('button');
        resetBtn.id = 'rpsResetBtn';
        resetBtn.className = 'btn btn-outline';
        resetBtn.textContent = 'Reset Scores';
        const scoreDiv = messageDisplay?.parentElement?.querySelector('.rps-score');
        if (scoreDiv) scoreDiv.parentElement.appendChild(resetBtn);
    }
    
    resetBtn.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        playerChoiceDisplay.textContent = '?';
        computerChoiceDisplay.textContent = '?';
        messageDisplay.textContent = 'Choose your weapon!';
        choices.forEach(btn => btn.classList.remove('selected', 'computer-selected'));
    });
    
    // Initialize game
    choices.forEach(choice => {
        choice.addEventListener('click', () => playRound(choice.getAttribute('data-choice')));
    });
    
    function playRound(playerChoice) {
        // Clear previous selections
        choices.forEach(btn => {
            btn.classList.remove('selected', 'computer-selected');
        });
        
        // Get computer choice
        const choiceArr = ['rock', 'paper', 'scissors'];
        const computerChoice = choiceArr[Math.floor(Math.random() * choiceArr.length)];
        
        // Display choices
        playerChoiceDisplay.textContent = emojiMap[playerChoice];
        computerChoiceDisplay.textContent = emojiMap[computerChoice];
        
        // Highlight the selected buttons
        const playerBtn = document.querySelector(`.rps-choice[data-choice="${playerChoice}"]`);
        const computerBtn = document.querySelector(`.rps-choice[data-choice="${computerChoice}"]`);
        if (playerBtn) playerBtn.classList.add('selected');
        if (computerBtn) computerBtn.classList.add('computer-selected');
        
        // Add animation to choices
        playerChoiceDisplay.classList.add('pulse-animation');
        computerChoiceDisplay.classList.add('pulse-animation');
        
        setTimeout(() => {
            playerChoiceDisplay.classList.remove('pulse-animation');
            computerChoiceDisplay.classList.remove('pulse-animation');
        }, 500);
        
        // Determine winner
        let result;
        if (playerChoice === computerChoice) {
            result = 'It\'s a tie!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = 'You win!';
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
        } else {
            result = 'Computer wins!';
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
        }
        
        // Show result
        messageDisplay.textContent = result;
        
        // Add result animation
        messageDisplay.classList.add('pulse-animation');
        setTimeout(() => {
            messageDisplay.classList.remove('pulse-animation');
        }, 500);
    }
}

// Newsletter form handling
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (!newsletterForm || !newsletterMessage) return;
    
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get email input
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput ? emailInput.value.trim() : '';
        
        // Basic validation
        if (!email || !isValidEmail(email)) {
            newsletterMessage.textContent = 'Please enter a valid email address.';
            newsletterMessage.style.color = '#FF5252';
            return;
        }
        
        try {
            // Send subscription request to backend
            const response = await fetch('http://localhost:3000/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                // Show success message
                newsletterMessage.textContent = 'Thank you for subscribing!';
                newsletterMessage.style.color = '#64FFDA';
                
                // Reset form
                newsletterForm.reset();
            } else {
                throw new Error(data.message || 'Failed to subscribe');
            }
        } catch (error) {
            console.error('Error:', error);
            newsletterMessage.textContent = 'Failed to subscribe. Please try again later.';
            newsletterMessage.style.color = '#FF5252';
        }
        
        // Clear message after a delay
        setTimeout(() => {
            newsletterMessage.textContent = '';
        }, 3000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Recommendations Slider
function setupRecommendationsSlider() {
    const slides = document.querySelectorAll('.recommendation-slide');
    const prevBtn = document.getElementById('prevRecommendation');
    const nextBtn = document.getElementById('nextRecommendation');
    const indicators = document.querySelectorAll('.recommendation-indicators .indicator');
    const track = document.querySelector('.recommendations-track');
    
    if (!slides.length || !prevBtn || !nextBtn || !track) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Update indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Adjust slide position
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }
    
    // Add event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Add click event for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });
    
    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    const container = document.querySelector('.recommendations-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Initial setup
    showSlide(currentIndex);
}

// Animate recommendations with a fade-in and slide effect
function animateRecommendations() {
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    const recommendationControls = document.querySelector('.recommendation-controls');
    const indicators = document.querySelectorAll('.recommendation-indicators .indicator');
    const track = document.querySelector('.recommendations-track');
    
    if (!track) return;
    
    // Set initial track width
    track.style.width = `${recommendationCards.length * 100}%`;
    
    // Animate the first slide immediately
    const activeSlide = document.querySelector('.recommendation-slide.active');
    if (activeSlide) {
        activeSlide.style.opacity = '1';
        activeSlide.style.transform = 'scale(1)';
    }
    
    // Animate the recommendation cards with a subtle scale effect
    recommendationCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
            
            // Add a subtle shadow pulse animation
            card.classList.add('shadow-pulse');
        }, 300);
    });
    
    // Animate the controls to fade in
    if (recommendationControls) {
        setTimeout(() => {
            recommendationControls.style.opacity = '1';
        }, 600);
    }
    
    // Animate the indicators with a staggered effect
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.style.transform = 'scale(1)';
            indicator.style.opacity = '1';
        }, 800 + (index * 100));
    });
    
    // Start the recommendations slider
    setupRecommendationsSlider();
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Adding offset for better accuracy
    
    // Loop through sections to find the one in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navbarLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Enhanced recommendations slider with animations
function animateRecommendations() {
    const recommendationCard = document.querySelector('.recommendation-card');
    const recommendationControls = document.querySelector('.recommendation-controls');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!recommendationCard || !recommendationControls || indicators.length === 0) return;
    
    // Animate the card
    setTimeout(() => {
        recommendationCard.style.opacity = '1';
        recommendationCard.style.transform = 'translateY(0)';
        recommendationCard.classList.add('shadow-pulse');
    }, 300);
    
    // Animate controls with delay
    setTimeout(() => {
        recommendationControls.style.opacity = '1';
    }, 600);
    
    // Animate indicators with staggered delay
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });
    
    const recommendationsContainer = document.querySelector('.recommendations-container');
    if (recommendationsContainer && recommendationControls) {
        recommendationsContainer.addEventListener('mouseenter', () => {
            recommendationControls.style.opacity = '1';
        });
        
        recommendationsContainer.addEventListener('mouseleave', () => {
            recommendationControls.style.opacity = '0';
        });
    }
}

// Track mouse movement for dynamic glow effects
document.addEventListener('mousemove', function(e) {
    const glowElements = document.querySelectorAll('.card-glow');
    if (glowElements.length === 0) return;
    
    glowElements.forEach(glow => {
        const parentRect = glow.parentElement.getBoundingClientRect();
        const x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
        const y = ((e.clientY - parentRect.top) / parentRect.height) * 100;
        
        // Update CSS variables for the radial gradient position
        glow.style.setProperty('--x', `${x}%`);
        glow.style.setProperty('--y', `${y}%`);
    });
});

// Chat Bubble Functionality
function setupChat() {
    const chatBubbleBtn = document.getElementById('chatBubbleBtn');
    const chatOverlay = document.getElementById('chatOverlay');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatBubbleBtn || !chatOverlay) return;
    
    // Sample description about yourself
    const myDescription = "I'm Deepta Roy, a B.Tech CSE student at Narula Institute of Technology with a CGPA of 9.05. I'm passionate about software development, algorithm design, and creating efficient solutions to complex problems. I have experience in Java, Python, JavaScript, React, and more. I've worked on projects like Attendance Management System, AI-based Crop Disease Prediction, E-Commerce Website, and Accident Detection System.";
    
    // Toggle chat overlay
    chatBubbleBtn.addEventListener('click', function() {
        chatOverlay.style.display = 'flex';
        
        // If this is the first time opening, show welcome message
        if (chatMessages.children.length === 0) {
            addMessage(`Hi, I am Deepta Roy, what do you want to know about me?`, 'received');
        }
    });
    
    // Close chat overlay
    chatCloseBtn.addEventListener('click', function() {
        chatOverlay.style.display = 'none';
    });
    
    // Send message on button click
    chatSendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'sent');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Call Gemini API
        callGeminiAPI(message);
    }
    
    // Function to add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to call Gemini API
    function callGeminiAPI(message) {
        const GEMINI_API_KEY = "AIzaSyDbNUfpqy46PTIQl0zzI2HYqjSMP3V39po"; // Replace with your actual API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `User_message:${message}. Reply naturally to the usermessage and if required then answer based on: ${myDescription} or just simply give friendly reply. And reply in a way that Deepta Roy is himself talking. Reply in short sentences`
                    }]
                }]
            })
        })
        .then(response => response.json())
        .then(data => {
            hideTypingIndicator();
            const aiResponse = data.candidates[0].content.parts[0].text;
            addMessage(aiResponse, 'received');
        })
        .catch(error => {
            hideTypingIndicator();
            console.error('Error:', error);
            addMessage("Sorry, I couldn't process your request at the moment.", 'received');
        });
    }
}

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatInput || !chatSendBtn || !chatMessages) return;
    
    // Predefined responses for the chatbot
    const botResponses = {
        "hello": "Hello! How can I help you today?",
        "hi": "Hi there! How can I assist you?",
        "who are you": "I'm Deepta's portfolio assistant. I can help you navigate the portfolio or answer questions about Deepta's skills and projects.",
        "what can you do": "I can provide information about Deepta's skills, projects, education, and experience. Feel free to ask me anything!",
        "tell me about deepta": "Deepta Roy is a B.Tech CSE student passionate about programming and problem-solving. He has worked on various projects and has skills in multiple programming languages and frameworks.",
        "projects": "Deepta has worked on several projects including a Smart Home Automation System, AI-based Crop Disease Prediction, and a Personal Finance Tracker. You can find more details in the Projects section.",
        "skills": "Deepta is skilled in various programming languages like C, Java, Python, and JavaScript. He also has experience with frameworks like React, Node.js, and TensorFlow.",
        "contact": "You can contact Deepta through the contact form on this website or via email at deeptaroy619@gmail.com.",
        "education": "Deepta is pursuing a B.Tech in Computer Science Engineering. You can find more details in the Education section.",
        "experience": "Deepta has experience in web development, machine learning, and software development. Check out the Projects section for examples of his work.",
        "default": "I'm here to help! Feel free to ask me about Deepta's skills, projects, or anything else you'd like to know."
    };
    
    // Function to send a message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage('user', message);
        chatInput.value = '';
        
        // Get bot response after a short delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage('bot', response);
        }, 500);
    }
    
    // Function to get bot response based on user input
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific keywords in the message
        for (const [key, value] of Object.entries(botResponses)) {
            if (lowerMessage.includes(key)) {
                return value;
            }
        }
        
        // If no specific match, provide a contextual response
        if (lowerMessage.includes('project')) {
            return "Deepta has worked on several interesting projects. You can explore them in the Projects section of this portfolio.";
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "Deepta is proficient in various technologies including C, Java, Python, JavaScript, React, and more. Check out the Skills section for a complete overview.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can contact Deepta through the contact form or via email at deeptaroy619@gmail.com.";
        } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
            return "Deepta is pursuing a B.Tech in Computer Science Engineering. More details are available in the Education section.";
        }
        
        // Default response
        return botResponses.default;
    }
    
    // Function to add a message to the chat
    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        
        const bubbleElement = document.createElement('div');
        bubbleElement.classList.add('message-bubble', `${sender}-bubble`);
        bubbleElement.textContent = message;
        
        messageElement.appendChild(bubbleElement);
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Modern Education Timeline Animation
function setupEducationTimelineAnimation() {
    const steps = document.querySelectorAll('.timeline-step[data-animate]');
    if (!steps.length) return;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    steps.forEach(step => observer.observe(step));
}

document.addEventListener('DOMContentLoaded', () => {
    setupEducationTimelineAnimation();
});
