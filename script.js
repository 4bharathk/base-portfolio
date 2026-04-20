// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.about-card, .stat-item, .project-card, .timeline-item, .contact-card').forEach(el => {
        observer.observe(el);
    });
    
    // Typing animation for hero title
    const titleName = document.querySelector('.title-name');
    if (titleName) {
        const text = titleName.textContent;
        titleName.textContent = '';
        titleName.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    titleName.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Parallax effect for floating cards
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.about-card, .topic-card, .timeline-content, .contact-card');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
    
    // Add stagger effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Particle effect for hero section (optional)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 8s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        document.querySelector('.hero').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class for any load-specific animations
    setTimeout(() => {
        document.querySelectorAll('.hero-title span').forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
            span.classList.add('loaded');
        });
    }, 500);
    

});


function openImageModal(title, images) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modalTitle"></h3>
                    <button class="modal-close" onclick="closeImageModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-images" id="modalImages"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    const modalImages = document.getElementById('modalImages');
    modalImages.innerHTML = images.map(img => 
        `<img src="${img}" alt="${title}" class="modal-image" onclick="openFullImage('${img}')">`
    ).join('');
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openFullImage(src) {
    window.open(src, '_blank');
}


// Image Loading Handlers
function handleImageLoad(img) {
    // Hide loading spinner
    const container = img.parentElement;
    const loading = container.querySelector('.image-loading');
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Show image with fade-in effect
    img.style.opacity = '0';
    img.style.display = 'block';
    
    setTimeout(() => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
    }, 100);
}

function handleImageError(img, eventTitle) {
    console.warn(`Failed to load image: ${img.src} for event: ${eventTitle}`);
    
    const container = img.parentElement;
    const loading = container.querySelector('.image-loading');
    
    // Try different extension if this is the first attempt
    if (!img.dataset.retried) {
        img.dataset.retried = 'true';
        
        // Try different case extensions
        const originalSrc = img.src;
        let newSrc = '';
        
        if (originalSrc.includes('.jpg')) {
            newSrc = originalSrc.replace('.jpg', '.JPG');
        } else if (originalSrc.includes('.JPG')) {
            newSrc = originalSrc.replace('.JPG', '.jpeg');
        } else if (originalSrc.includes('.jpeg')) {
            newSrc = originalSrc.replace('.jpeg', '.JPEG');
        } else if (originalSrc.includes('.png')) {
            newSrc = originalSrc.replace('.png', '.PNG');
        }
        
        if (newSrc && newSrc !== originalSrc) {
            console.log(`Retrying with different extension: ${newSrc}`);
            img.src = newSrc;
            return; // Don't show fallback yet, try the retry first
        }
    }
    
    // Hide loading spinner
    if (loading) {
        loading.style.display = 'none';
    }
    
    // Create fallback content
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.innerHTML = `
        <div class="fallback-content">
            <i class="fas fa-image"></i>
            <p>${eventTitle}</p>
            <small>Image not available</small>
            <button class="retry-btn" onclick="retryImageLoad('${img.src}', this)">
                <i class="fas fa-redo"></i> Retry
            </button>
        </div>
    `;
    
    // Replace image with fallback
    container.appendChild(fallback);
    img.style.display = 'none';
}

function retryImageLoad(originalSrc, button) {
    const fallback = button.closest('.image-fallback');
    const container = fallback.parentElement;
    const img = container.querySelector('img');
    
    // Show loading spinner
    const loading = container.querySelector('.image-loading');
    if (loading) {
        loading.style.display = 'block';
    }
    
    // Hide fallback
    fallback.style.display = 'none';
    
    // Reset retry flag and try loading again
    img.dataset.retried = '';
    img.src = originalSrc + '?retry=' + Date.now(); // Add cache buster
}



