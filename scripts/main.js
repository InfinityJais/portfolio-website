/**
 * Main JavaScript for Portfolio Website
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Navbar Effect
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    
    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinksList = document.querySelector(".nav-links");
    
    if(mobileBtn) {
        mobileBtn.addEventListener("click", () => {
            if (navLinksList.style.display === "flex") {
                navLinksList.style.display = "none";
            } else {
                navLinksList.style.display = "flex";
                navLinksList.style.flexDirection = "column";
                navLinksList.style.position = "absolute";
                navLinksList.style.top = "100%";
                navLinksList.style.left = "0";
                navLinksList.style.width = "100%";
                navLinksList.style.background = "rgba(11, 17, 32, 0.98)";
                navLinksList.style.padding = "2rem";
                navLinksList.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if(anchor.getAttribute('href') === "#") return;
        
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if(window.innerWidth <= 768 && navLinksList.style.display === "flex") {
                navLinksList.style.display = "none";
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll(
        '.section-title, .about-content, .skills-container, .timeline-item, .project-card, .hero-content, .hero-visual, .contact-card'
    );
    
    // Initial state
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.5, 0, 0, 1)";
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Draw lines between skills in the Mandala Tree (Desktop only)
    function drawConnections() {
        const svg = document.querySelector('.skills-connections');
        if(!svg || window.innerWidth < 768) return;
        
        // Clear previous lines
        svg.innerHTML = '';
        
        const center = document.querySelector('.skills-center');
        const nodes = document.querySelectorAll('.skill-node');
        const container = document.querySelector('.skills-tree');
        
        const containerRect = container.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        
        const cx = centerRect.left - containerRect.left + centerRect.width / 2;
        const cy = centerRect.top - containerRect.top + centerRect.height / 2;
        
        nodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            const nx = nodeRect.left - containerRect.left + nodeRect.width / 2;
            const ny = nodeRect.top - containerRect.top + nodeRect.height / 2;
            
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', cx);
            line.setAttribute('y1', cy);
            line.setAttribute('x2', nx);
            line.setAttribute('y2', ny);
            line.setAttribute('stroke', 'rgba(252, 211, 77, 0.2)');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-dasharray', '4 4');
            
            svg.appendChild(line);
        });
    }

    // Attempt to draw lines initially and on resize
    setTimeout(drawConnections, 500); // small delay to ensure layout is computed
    window.addEventListener('resize', drawConnections);
});
