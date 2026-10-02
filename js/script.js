document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.classList.add("loaded");
        }
    });


    const cursorDot = document.getElementById('cursor-dot');
    const cursorHalo = document.getElementById('cursor-halo');

    if (cursorDot && cursorHalo) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorHalo.style.left = `${posX}px`;
            cursorHalo.style.top = `${posY}px`;
        });

        document.querySelectorAll('a, button, .project-card, .lang-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursorHalo.style.transform = 'translate(-50%, -50%) scale(1.6)';
                cursorHalo.style.borderColor = '#ffffff';
            });
            item.addEventListener('mouseleave', () => {
                cursorHalo.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorHalo.style.borderColor = 'var(--primary-color)';
            });
        });
    }


    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-label', 'Open menu');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });


    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsToggle = document.getElementById('projects-toggle');
    const projectsPerLoad = 3;
    let visibleProjectCount = projectsPerLoad;

    const updateProjects = (filterValue) => {
        const matchingCards = Array.from(projectCards).filter(card => {
            const category = card.getAttribute('data-category');
            return filterValue === 'all' || category.includes(filterValue);
        });

        projectCards.forEach(card => {
            const isMatch = matchingCards.includes(card);
            const shouldHide = isMatch && matchingCards.indexOf(card) >= visibleProjectCount;
            card.classList.toggle('hide', !isMatch || shouldHide);
        });

        if (projectsToggle) {
            const hasMoreProjects = matchingCards.length > projectsPerLoad;
            const allProjectsVisible = visibleProjectCount >= matchingCards.length;
            projectsToggle.hidden = !hasMoreProjects;
            projectsToggle.setAttribute('aria-expanded', String(visibleProjectCount > projectsPerLoad));
            projectsToggle.querySelector('span').textContent = allProjectsVisible ? 'Hide' : 'View more';
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            visibleProjectCount = projectsPerLoad;
            updateProjects(filterValue);
        });
    });

    if (projectsToggle) {
        projectsToggle.addEventListener('click', () => {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            const matchingCount = Array.from(projectCards).filter(card => {
                const category = card.getAttribute('data-category');
                return activeFilter === 'all' || category.includes(activeFilter);
            }).length;
            const shouldCollapse = visibleProjectCount >= matchingCount;

            visibleProjectCount = shouldCollapse
                ? projectsPerLoad
                : Math.min(visibleProjectCount + projectsPerLoad, matchingCount);
            updateProjects(activeFilter);

            if (shouldCollapse) {
                requestAnimationFrame(() => {
                    document.getElementById('projects').scrollIntoView({
                        behavior: 'auto',
                        block: 'start'
                    });
                });
            }
        });
    }

    updateProjects('all');


    const projectData = {
        matrix: {
            title: "matrix-calculator",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ DOM Manipulation â€¢ Algorithms",
            desc: "Interactive web tool designed to perform complex matrix operations automatically and efficiently.",
            challenge: "Turn complex matrix operations into a clear workflow that can be used directly in the browser.",
            approach: "Built a dynamic interface with input validation and DOM manipulation for real-time feedback.",
            outcome: "A functional web resource for practicing and solving matrix calculations without external tools.",
            features: [
                "Fast calculation and resolution for multiple matrix dimensions.",
                "Dynamic interface powered by advanced DOM manipulation.",
                "Real-time data validation to prevent mathematical syntax errors."
            ],
            github: "https://github.com/SerakDepMS/calculadora-de-matrices"
        },
        arenatours: {
            title: "Arena Tours Cartagena",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ Hostinger",
            desc: "Sitio web oficial para una agencia de turismo en Cartagena, Colombia. Plataforma completa para la promociÃ³n de tours, gestiÃ³n de reservas y presentaciÃ³n de destinos turÃ­sticos.",
            challenge: "Crear una plataforma web atractiva y funcional que refleje la esencia del Caribe colombiano y facilite la conversiÃ³n de visitantes en clientes.",
            approach: "DiseÃ±o responsivo con enfoque en la experiencia de usuario, optimizaciÃ³n para SEO local, integraciÃ³n de sistemas de reservas y presentaciÃ³n visual de destinos turÃ­sticos.",
            outcome: "Un sitio web profesional que posiciona a Arena Tours Cartagena como un operador turÃ­stico confiable y accesible para clientes nacionales e internacionales.",
            features: [
                "DiseÃ±o responsivo optimizado para dispositivos mÃ³viles.",
                "CatÃ¡logo completo de tours con precios y detalles.",
                "IntegraciÃ³n con Hostinger para hosting y despliegue continuo.",
                "OptimizaciÃ³n SEO para bÃºsquedas locales en Cartagena."
            ],
            github: null // No hay repositorio pÃºblico porque estÃ¡ en Hostinger
        },
        gamerCommunity: {
            title: "SerakDepMS Ecosystem Base",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ Web UI â€¢ Gaming Community",
            desc: "Official web platform focused on community management, digital interaction, and community activities for the gamer ecosystem.",
            challenge: "Organize a gamer community's digital presence into an accessible and easy-to-navigate experience.",
            approach: "Structured a responsive interface with interactive sections and a modular foundation for community content.",
            outcome: "A centralized platform for presenting the community, its members, and its eSports activities across devices.",
            features: [
                "Responsive design optimized for multiple devices.",
                "Interactive sections for members and events.",
                "Clean modular structure based on web development best practices."
            ],
            github: "https://github.com/SerakDepMS/Serakdep-MS-Clan-Official"
        },
        devs: {
            title: "Serakdep-MS-Devs-Official",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ Web UI â€¢ Programming Community",
            desc: "DivisiÃ³n oficial de programaciÃ³n de SerakDepMS Studios. Un ecosistema donde desarrolladores de todos los niveles aprenden, colaboran y construyen juntos, con divisiones especializadas por Ã¡rea tÃ©cnica.",
            challenge: "Crear un espacio digital accesible y profesional que centralice la informaciÃ³n de la comunidad de programaciÃ³n, sus normas, sanciones y divisiones tÃ©cnicas.",
            approach: "DiseÃ±amos una plataforma web responsiva con secciones claras para normas, sanciones progresivas, divisiones por lenguaje/Ã¡rea y un sistema de FAQ interactivo para resolver dudas frecuentes.",
            outcome: "Un sitio web oficial que posiciona a Serakdep-MS-Devs-Official como la divisiÃ³n de programaciÃ³n de referencia dentro del ecosistema SerakDepMS, con informaciÃ³n clara y accesible para todos los miembros.",
            features: [
                "8 divisiones tÃ©cnicas: Python, Web, Backend, Mobile, Game Dev, Ciberseguridad, IA y Algoritmos.",
                "Sistema de sanciones progresivas de 4 niveles adaptado al contexto de la comunidad.",
                "DiseÃ±o responsivo optimizado para mÃ³viles con navegaciÃ³n fluida.",
                "SecciÃ³n de FAQ interactiva y reglamento completo de convivencia."
            ],
            github: "https://github.com/SerakDepMS/Serakdep-MS-Devs-Official"
        },
        terminal: {
            title: "Crypt-Terminal",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ CLI Simulation â€¢ Cryptography",
            desc: "Interactive web terminal simulation focused on cryptographic tools and command processing.",
            challenge: "Bring terminal and cryptography concepts into an interactive and understandable web interface.",
            approach: "Developed a custom command interpreter with client-side logic and cryptographic validation modules.",
            outcome: "A simulation environment for exploring commands, encryption logic, and security validation in the browser.",
            features: [
                "Custom command interpreter built with native JavaScript.",
                "Immersive dark terminal-style design.",
                "Modules focused on web logic and encryption testing."
            ],
            github: "https://github.com/SerakDepMS/Crypt-Terminal"
        },
        social: {
            title: "red-social-beta",
            tech: "HTML â€¢ CSS â€¢ JavaScript â€¢ Web Prototyping â€¢ Programming Community",
            desc: "Experimental social network prototype designed to explore user interaction patterns and client-side data flows for programmer communities.",
            challenge: "Explore the essential flows of a social network for developers before committing to a final architecture.",
            approach: "Prototyped posts, profiles, and interaction components with an initially scalable structure.",
            outcome: "An experimental foundation for validating social dynamics and product decisions before the next iteration.",
            features: [
                "Simulation of dynamic posts and profiles.",
                "Initially scalable architecture for social components.",
                "Fluid interface focused on user experience."
            ],
            github: "https://github.com/SerakDepMS/red-social-beta"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalContainer = document.querySelector('.modal-container');
    const modalBodyContent = document.getElementById('modal-body-content');
    const closeModalBtn = document.getElementById('close-modal');

    let lastFocusedElement = null;

    const openProjectModal = (card) => {
        const projectKey = card.getAttribute('data-project');
        const data = projectData[projectKey];

        if (data) {
            // Generar botÃ³n de GitHub condicionalmente
            const githubButton = data.github
                ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-brands fa-github"></i> View repository</a>`
                : '';

            modalBodyContent.innerHTML = `
                <p class="modal-tech">${data.tech}</p>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <div class="modal-case-study">
                    <div><strong>Challenge</strong><p>${data.challenge}</p></div>
                    <div><strong>Approach</strong><p>${data.approach}</p></div>
                    <div><strong>Outcome</strong><p>${data.outcome}</p></div>
                </div>
                <ul class="modal-features">
                    ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> <span>${f}</span></li>`).join('')}
                </ul>
                ${githubButton}
            `;
            modalOverlay.classList.add('active');
            modalOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            lastFocusedElement = document.activeElement;
            if (closeModalBtn) {
                setTimeout(() => closeModalBtn.focus(), 0);
            }
        }
    };

    projectCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-links')) return;
            openProjectModal(card);
        });

    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!modalOverlay || !modalOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        if (e.key === 'Tab' && modalContainer) {
            const focusableElements = modalContainer.querySelectorAll(
                'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (!focusableElements.length) return;
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });


    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        if (!current) return;

        navItems.forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .about-content, .about-image, ' +
        '.service-card, .project-card, .cta-wrapper, .manifesto-card, ' +
        '.timeline-item, .arch-card'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(30px)";
        const delay = (el.classList.contains('service-card') || el.classList.contains('project-card'))
            ? (index % 3) * 0.1
            : 0;
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${delay}s`;
        revealObserver.observe(el);
    });

});
