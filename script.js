// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        span.style.transform = navMenu.classList.contains('active') 
            ? index === 1 ? 'scale(0)' : index === 0 ? 'rotate(45deg) translateY(7px)' : 'rotate(-45deg) translateY(-7px)'
            : '';
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
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

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to a server
    console.log('Form data:', data);
    
    // Show success message
    alert('Tack för ditt meddelande! Vi återkommer så snart som möjligt.');
    
    // Reset form
    contactForm.reset();
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-card, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

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
    
    // Animate blog cards on scroll
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});