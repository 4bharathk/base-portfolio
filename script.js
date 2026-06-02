// Smooth scrolling and navigation
window.onscroll = () => {
    const btn = document.getElementById('btnscrollToTop');
    if (btn) {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
};

const btnscrollToTop = document.getElementById('btnscrollToTop');
if (btnscrollToTop) {
    btnscrollToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function renderPortfolio(data) {
    // 1. Navigation
    const navLogo = document.getElementById('navLogo');
    if (navLogo) navLogo.textContent = "Portfolio"; // You can set this to your name or any text you prefer

    // 2. Hero Section
    const heroProfileImg = document.getElementById('heroProfileImg');
    if (heroProfileImg) {
        heroProfileImg.src = data.personal.profileImage;
        heroProfileImg.alt = data.personal.fullName;
    }
    
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) heroTitle.textContent = data.personal.fullName;
    
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = "Senior Software Engineer";
    
    const heroDesc = document.getElementById('heroDesc');
    if (heroDesc) heroDesc.innerHTML = data.personal.description;

    const certificatesContainer = document.getElementById('certificatesContainer');
    if (certificatesContainer && data.personal.certificates) {
        certificatesContainer.innerHTML = data.personal.certificates.map(cert => 
            `<img src="${cert.src}" alt="${cert.alt}" width="${cert.width}" height="${cert.height}" />`
        ).join('');
    }

    // 3. Skills Section
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid && data.skills) {
        skillsGrid.innerHTML = data.skills.map(skill => {
            if (skill.isImage) {
                return `
                    <div class="topic-card">
                        <img src="${skill.icon}" alt="" width="50" height="50" style="margin-bottom: 1rem; border-radius: 8px;" />
                        <h4>${skill.title}</h4>
                    </div>
                `;
            } else {
                return `
                    <div class="topic-card">
                        <i class="${skill.icon}"></i>
                        <h4>${skill.title}</h4>
                    </div>
                `;
            }
        }).join('');
    }

    // 4. Projects Section
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && data.projects) {
        projectsGrid.innerHTML = data.projects.map(proj => {
            const linkHtml = proj.link 
                ? `<a href="${proj.link}" target="_blank" class="social-link-btn"><i class="fas fa-external-link-alt"></i> ${proj.linkText}</a>`
                : `<span class="social-link-btn" style="cursor: default; filter: brightness(0.95); opacity: 0.85;"><i class="fas fa-lock"></i> ${proj.linkText} (Private)</span>`;
            return `
                <div class="project-card">
                    <div class="project-info">
                        <h3>${proj.title}</h3>
                        <p>${proj.description}</p>
                        ${linkHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    // 5. Blogs Section
    const blogsCarousel = document.getElementById('blogsCarousel');
    if (blogsCarousel && data.blogs) {
        blogsCarousel.innerHTML = data.blogs.map((blog, idx) => {
            const linkHtml = blog.link 
                ? `<a href="${blog.link}" target="_blank" style="margin-left: auto; color: #667eea; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.3rem;">Read Post <i class="fas fa-arrow-right"></i></a>`
                : `<span style="margin-left: auto; color: #999; font-weight: 500; cursor: default; display: flex; align-items: center; gap: 0.3rem;">Internal <i class="fas fa-lock"></i></span>`;
            
            let categoryIcon = 'fas fa-book-open';
            if (blog.category.toLowerCase().includes('security')) categoryIcon = 'fas fa-shield-alt';
            else if (blog.category.toLowerCase().includes('cloud') || blog.category.toLowerCase().includes('aws')) categoryIcon = 'fab fa-aws';
            else if (blog.category.toLowerCase().includes('java') || blog.category.toLowerCase().includes('performance')) categoryIcon = 'fab fa-java';
            else if (blog.category.toLowerCase().includes('devops') || blog.category.toLowerCase().includes('iac')) categoryIcon = 'fas fa-infinity';

            return `
                <div class="blog-card" data-index="${idx}">
                    <div class="blog-card-header">
                        <i class="${categoryIcon}"></i>
                        <span class="blog-card-category">${blog.category}</span>
                    </div>
                    <div class="blog-card-body">
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                        <div class="blog-card-meta">
                            <span><i class="far fa-calendar-alt"></i> ${blog.date}</span>
                            <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                        </div>
                        <div style="display: flex; margin-top: 1.2rem;">
                            ${linkHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    const carouselDots = document.getElementById('carouselDots');
    if (carouselDots && data.blogs) {
        carouselDots.innerHTML = data.blogs.map((_, idx) => 
            `<button class="carousel-dot" data-index="${idx}" aria-label="Go to blog slide ${idx + 1}"></button>`
        ).join('');
    }

    // 6. Footer & Socials
    const reachoutMsg = document.getElementById('reachoutMsg');
    if (reachoutMsg) reachoutMsg.textContent = data.socials.reachoutMessage;

    const socialLinkedin = document.getElementById('socialLinkedin');
    if (socialLinkedin) socialLinkedin.href = data.socials.linkedin;

    const socialEmail = document.getElementById('socialEmail');
    if (socialEmail) socialEmail.href = data.socials.email;

    const socialGithub = document.getElementById('socialGithub');
    if (socialGithub) socialGithub.href = data.socials.github;

    const copyrightText = document.getElementById('copyrightText');
    if (copyrightText) {
        copyrightText.innerHTML = `&copy; ${new Date().getFullYear()} ${data.personal.shortName}. All rights reserved.`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Render Portfolio dynamic contents
    if (typeof PORTFOLIO_DATA !== 'undefined') {
        renderPortfolio(PORTFOLIO_DATA);
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
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
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
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
    
    // Observe dynamic project cards
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth reveal animations for dynamic topic cards
    const revealElements = document.querySelectorAll('.topic-card');
    
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

    // Blogs 3D Carousel State Machine
    const blogCards = document.querySelectorAll('.blog-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalBlogs = blogCards.length;
    let currentBlogIndex = 0;

    function updateBlogsCarousel() {
        if (totalBlogs === 0) return;
        
        blogCards.forEach((card, idx) => {
            card.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');
            
            // Calculate relative offset in circular ring
            let diff = idx - currentBlogIndex;
            
            // Circular carousel index math
            if (diff < -1 && diff < -totalBlogs + 2) {
                diff += totalBlogs;
            } else if (diff > 1 && diff > totalBlogs - 2) {
                diff -= totalBlogs;
            }
            
            if (diff === 0) {
                card.classList.add('active');
            } else if (diff === -1 || (currentBlogIndex === 0 && idx === totalBlogs - 1 && totalBlogs > 2)) {
                card.classList.add('prev');
            } else if (diff === 1 || (currentBlogIndex === totalBlogs - 1 && idx === 0 && totalBlogs > 2)) {
                card.classList.add('next');
            } else if (diff < 0) {
                card.classList.add('hidden-left');
            } else {
                card.classList.add('hidden-right');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === currentBlogIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (totalBlogs > 0) {
        const prevBtn = document.getElementById('carouselPrevBtn');
        const nextBtn = document.getElementById('carouselNextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentBlogIndex = (currentBlogIndex - 1 + totalBlogs) % totalBlogs;
                updateBlogsCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentBlogIndex = (currentBlogIndex + 1) % totalBlogs;
                updateBlogsCarousel();
            });
        }

        // Card clicks - shifts clicked card to center
        blogCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;
                if (idx !== currentBlogIndex) {
                    currentBlogIndex = idx;
                    updateBlogsCarousel();
                }
            });
        });

        // Dot navigation
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                currentBlogIndex = idx;
                updateBlogsCarousel();
            });
        });

        // Touch swiping triggers
        let startX = 0;
        const carouselContainer = document.querySelector('.blogs-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            carouselContainer.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diffX = startX - endX;
                
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        currentBlogIndex = (currentBlogIndex + 1) % totalBlogs;
                    } else {
                        currentBlogIndex = (currentBlogIndex - 1 + totalBlogs) % totalBlogs;
                    }
                    updateBlogsCarousel();
                }
            }, { passive: true });
        }

        // Initialize Blogs Carousel State
        updateBlogsCarousel();
    }
    
    // Particle effect for hero section
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
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(particle);
        }
        
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

// Add scroll-triggered parallax for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preloader / body class setup
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
