// Mobile Menu Toggle with Accessibility
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', isActive);
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = isActive 
                ? index === 1 ? 'scale(0)' : index === 0 ? 'rotate(45deg) translateY(7px)' : 'rotate(-45deg) translateY(-7px)'
                : '';
        });
        
        // Trap focus when menu is open
        if (isActive) {
            navMenu.querySelector('a').focus();
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.focus();
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.style.transform = '');
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach(span => span.style.transform = '');
        }
    });
});

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler with Better UX
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Add ARIA live region for form feedback
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Skickar...';
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        try {
            // Here you would normally send the data to a server
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form data:', data);
            
            // Show success message
            const successMessage = 'Tack för ditt meddelande! Vi återkommer så snart som möjligt.';
            liveRegion.textContent = successMessage;
            
            // Visual feedback
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = successMessage;
            successDiv.style.cssText = 'background: var(--farm-green); color: white; padding: 1rem; border-radius: 6px; margin-top: 1rem;';
            contactForm.appendChild(successDiv);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        } catch (error) {
            // Handle error
            liveRegion.textContent = 'Ett fel uppstod. Försök igen senare.';
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
    
    // Form validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.validity.valid) {
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.removeAttribute('aria-invalid');
            }
        });
    });
}

// Add scroll animations with reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature-card, .contact-form, .blog-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--farm-green); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; z-index: 100; box-shadow: var(--shadow);';
    
    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        darkModeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    document.body.appendChild(darkModeToggle);
}

// Initialize dark mode when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Optimize images on load
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Seasonal product data
const seasonalProducts = {
    spring: [
        { name: 'Sallad', icon: 'fa-leaf', status: 'Tillgänglig' },
        { name: 'Spenat', icon: 'fa-leaf', status: 'Tillgänglig' },
        { name: 'Ärtor', icon: 'fa-circle', status: 'Kommer snart' },
        { name: 'Jordgubbar', icon: 'fa-strawberry', status: 'Kommer snart' }
    ],
    summer: [
        { name: 'Tomater', icon: 'fa-apple-alt', status: 'Tillgänglig' },
        { name: 'Majs', icon: 'fa-corn', status: 'Tillgänglig' },
        { name: 'Bär', icon: 'fa-seedling', status: 'Tillgänglig' },
        { name: 'Örter', icon: 'fa-leaf', status: 'Tillgänglig' }
    ],
    autumn: [
        { name: 'Pumpor', icon: 'fa-circle', status: 'Tillgänglig' },
        { name: 'Äpplen', icon: 'fa-apple-alt', status: 'Tillgänglig' },
        { name: 'Squash', icon: 'fa-pepper-hot', status: 'Tillgänglig' },
        { name: 'Rotfrukter', icon: 'fa-carrot', status: 'Tillgänglig' }
    ],
    winter: [
        { name: 'Hö', icon: 'fa-wheat', status: 'Tillgänglig' },
        { name: 'Lammkött', icon: 'fa-drumstick-bite', status: 'Tillgänglig' },
        { name: 'Konserver', icon: 'fa-jar', status: 'Tillgänglig' },
        { name: 'Ullprodukter', icon: 'fa-mitten', status: 'Tillgänglig' }
    ]
};

// Season tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContent = document.getElementById('seasonContent');
    
    if (seasonTabs.length > 0 && seasonContent) {
        // Function to display seasonal products
        function showSeason(season) {
            const products = seasonalProducts[season];
            seasonContent.innerHTML = '';
            
            products.forEach((product, index) => {
                const item = document.createElement('div');
                item.className = 'season-item';
                item.style.animationDelay = `${index * 0.1}s`;
                
                item.innerHTML = `
                    <i class="fas ${product.icon}"></i>
                    <h4>${product.name}</h4>
                    <p class="season-status ${product.status === 'Tillgänglig' ? 'available' : 'soon'}">${product.status}</p>
                `;
                
                item.addEventListener('click', () => {
                    alert(`Klicka här för att beställa ${product.name}!`);
                });
                
                seasonContent.appendChild(item);
            });
        }
        
        // Add click handlers to tabs
        seasonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                seasonTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                showSeason(tab.dataset.season);
            });
        });
        
        // Show spring by default
        showSeason('spring');
    }
    
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add keyboard navigation for season tabs
const seasonTabs = document.querySelectorAll('.season-tab');
if (seasonTabs.length > 0) {
    seasonTabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active'));
        tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
        
        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            let newIndex;
            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % seasonTabs.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + seasonTabs.length) % seasonTabs.length;
            } else if (e.key === 'Home') {
                newIndex = 0;
            } else if (e.key === 'End') {
                newIndex = seasonTabs.length - 1;
            }
            
            if (newIndex !== undefined) {
                e.preventDefault();
                seasonTabs[newIndex].click();
                seasonTabs[newIndex].focus();
            }
        });
    });
}

// Announce dynamic content changes to screen readers
function announceChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Update showSeason function to announce changes
const originalShowSeason = window.showSeason;
if (typeof originalShowSeason === 'function') {
    window.showSeason = function(season) {
        originalShowSeason(season);
        const seasonNames = {
            spring: 'vår',
            summer: 'sommar',
            autumn: 'höst',
            winter: 'vinter'
        };
        announceChange(`Visar produkter för ${seasonNames[season]}`);
    };
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // LCP observer not supported
    }
    
    // Monitor First Input Delay
    try {
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
        // FID observer not supported
    }
}

// Lazy load background images
function lazyLoadBackgroundImages() {
    const elements = document.querySelectorAll('[data-bg]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const bgImage = element.getAttribute('data-bg');
                element.style.backgroundImage = `url(${bgImage})`;
                element.removeAttribute('data-bg');
                observer.unobserve(element);
            }
        });
    });
    
    elements.forEach(el => imageObserver.observe(el));
}

document.addEventListener('DOMContentLoaded', lazyLoadBackgroundImages);

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll event listener
const optimizedScroll = debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}, 10);

// Replace the existing scroll event listener
window.removeEventListener('scroll', window.scrollHandler);
window.addEventListener('scroll', optimizedScroll, { passive: true });

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
        { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// Execute preloading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.section-header, .product-card, .feature-card, .blog-card, .season-item');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        animateOnScroll.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', addRippleEffect);

// Debug mode - Add ?debug=true to URL to enable
function initDebugMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug') === 'true';
    
    if (debugMode) {
        document.body.classList.add('debug-mode');
        console.log('🐛 Debug mode enabled');
        
        // Log all CSS variables
        const styles = getComputedStyle(document.documentElement);
        console.log('CSS Variables:', {
            'Primary Text': styles.getPropertyValue('--color-text-primary'),
            'Secondary Text': styles.getPropertyValue('--color-text-secondary'),
            'Background': styles.getPropertyValue('--color-bg-primary'),
            'Primary Color': styles.getPropertyValue('--color-primary')
        });
        
        // Add debug panel
        const debugPanel = document.createElement('div');
        debugPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            max-width: 300px;
        `;
        
        debugPanel.innerHTML = `
            <h4 style="margin: 0 0 10px 0;">Debug Panel</h4>
            <p>Text Primary: ${styles.getPropertyValue('--color-text-primary')}</p>
            <p>Text Secondary: ${styles.getPropertyValue('--color-text-secondary')}</p>
            <p>BG Primary: ${styles.getPropertyValue('--color-bg-primary')}</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        
        document.body.appendChild(debugPanel);
    }
}

document.addEventListener('DOMContentLoaded', initDebugMode);