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
    document.querySelectorAll('.about-card, .stat-item, .topic-card, .timeline-item, .contact-card').forEach(el => {
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
    
    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    }
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                let target = parseInt(text.replace(/\D/g, ''));
                
                if (text.includes('K')) {
                    target *= 1000;
                }
                
                animateCounter(statNumber, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Opening Email Client...';
            submitBtn.disabled = true;
            
            // Create mailto link
            const subject = encodeURIComponent(`Contact from ${name} - Website`);
            const body = encodeURIComponent(`Hi Yeshwanth,

My name is ${name} and I'm reaching out through your website.

${message}

Best regards,
${name}
${email}`);
            
            const mailtoLink = `mailto:techwithyeshwanth@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message and reset form
            setTimeout(() => {
                showFormMessage('Email client opened! If it didn\'t open automatically, please copy the email address: techwithyeshwanth@gmail.com', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
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
    

    
    // Initialize social media counters
    initializeSocialCounters();
});

// Speaking Events Gallery Functionality - Now handled by load-events.js

function displayEvents(events) {
    const eventsContainer = document.getElementById('events-gallery');
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-calendar"></i>
                <p>No speaking events found. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    // Sort events by date (newest first)
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const eventsHTML = events.map((event, eventIndex) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const topicsHTML = event.topics.map(topic => 
            `<span class="topic-tag">${topic}</span>`
        ).join('');
        
        // Create slideshow for multiple images
        const slideshowHTML = event.images.length > 1 ? `
            <div class="event-slideshow" data-event-index="${eventIndex}">
                ${event.images.map((img, index) => `
                    <div class="event-slide ${index === 0 ? 'active' : ''}">
                        <div class="image-container">
                            <div class="image-loading">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <img src="${img}" alt="${event.title} - Image ${index + 1}" 
                                 onload="handleImageLoad(this)" 
                                 onerror="handleImageError(this, '${event.title}')">
                        </div>
                    </div>
                `).join('')}
                <div class="slideshow-indicators">
                    ${event.images.map((_, index) => `
                        <div class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>
                    `).join('')}
                </div>
            </div>
        ` : `
            <div class="image-container">
                <div class="image-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <img src="${event.images[0]}" alt="${event.title}" class="event-image"
                     onload="handleImageLoad(this)" 
                     onerror="handleImageError(this, '${event.title}')">
            </div>
        `;
        
        return `
            <div class="event-card" data-event='${JSON.stringify(event)}'>
                <div class="event-images">
                    ${slideshowHTML}
                    <div class="event-type-badge">${event.type}</div>
                </div>
                <div class="event-content">
                    <h4 class="event-title">${event.title}</h4>
                    <div class="event-meta">
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-topics">
                        ${topicsHTML}
                    </div>
                    <div class="event-stats">
                        <span class="audience-count">
                            <i class="fas fa-users"></i> ${event.audience} attendees
                        </span>
                        ${event.images.length > 1 ? 
                            `<span class="image-count">
                                <i class="fas fa-images"></i> ${event.images.length} photos
                            </span>` : ''
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = eventsHTML;
    
    // Initialize slideshows
    if (typeof initializeSlideshows === 'function') {
        initializeSlideshows();
    }
    
    // Add animation to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

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

// Instructions for adding new events
function showEventInstructions() {
    alert(`
To add a new speaking event:

1. Create a folder in 'speaking-events/' with your event name
2. Add ANY images to the folder (any name, any format: jpg, png, webp, etc.)
3. Create an 'event.json' file with event details:

{
  "title": "Your Event Title",
  "date": "YYYY-MM-DD",
  "location": "City, Country",
  "description": "Event description...",
  "topics": ["Topic 1", "Topic 2"],
  "audience": "100+",
  "type": "Workshop/Keynote/Meetup"
}

4. Refresh the page to see your event!

Note: The system now automatically detects ALL images regardless of naming!
    `);
}

// Social Media Counter Functionality
function initializeSocialCounters() {
    // Social media follower counts (update these numbers as they grow)
    const socialCounts = {
        youtube: 28000,
        linkedin: 7000,
        github: 450
    };
    
    // Animate counters on page load
    animateSocialCounters(socialCounts);
    
    // Check for updates periodically (every 24 hours)
    setInterval(() => {
        checkForSocialUpdates(socialCounts);
    }, 24 * 60 * 60 * 1000); // 24 hours
}

function animateSocialCounters(counts) {
    Object.keys(counts).forEach(platform => {
        const element = document.querySelector(`[data-platform="${platform}"]`);
        if (element) {
            const targetCount = counts[platform];
            animateCounter(element, targetCount, platform);
        }
    });
}

function animateCounter(element, target, platform) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = formatSocialCount(Math.floor(current));
        element.setAttribute('data-count', Math.floor(current));
    }, 20);
}



function formatSocialCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M+';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(count >= 10000 ? 0 : 1) + 'K+';
    } else {
        return count + '+';
    }
}

// Function to check for social media updates (placeholder for future API integration)
function checkForSocialUpdates(currentCounts) {
    // This is a placeholder function where you could integrate with social media APIs
    // For now, it just logs that it's checking for updates
    console.log('Checking for social media updates...');
    
    // In the future, you could:
    // 1. Call YouTube API to get subscriber count
    // 2. Call LinkedIn API to get connection count
    // 3. Call GitHub API to get follower count
    
    // Example of how you might update counts:
    // updateSocialCount('youtube', newYouTubeCount);
    // updateSocialCount('linkedin', newLinkedInCount);
}

function updateSocialCount(platform, newCount) {
    const element = document.querySelector(`[data-platform="${platform}"]`);
    const currentCount = parseInt(element.getAttribute('data-count'));
    
    if (newCount > currentCount) {
        console.log(`${platform} followers increased from ${currentCount} to ${newCount}`);
        animateCounter(element, newCount, platform);
    }
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

// Contact Form Message Display
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Insert message above the form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Auto-remove success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 10000);
    }
}


