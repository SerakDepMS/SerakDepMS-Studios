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
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
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

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });


    const projectData = {
        matrix: {
            title: "calculadora-de-matrices",
            tech: "HTML • CSS • JavaScript • DOM Manipulation • Algoritmos",
            desc: "Herramienta web interactiva diseñada para realizar operaciones matemáticas complejas con matrices de forma automatizada y eficiente.",
            features: [
                "Resolución y cálculo rápido de dimensiones múltiples.",
                "Interfaz dinámica basada en manipulación avanzada del DOM.",
                "Validación de datos en tiempo real para evitar errores de sintaxis matemática."
            ],
            github: "https://github.com/SerakDepMS/calculadora-de-matrices"
        },
        clan: {
            title: "Serakdep-MS-Clan-Official",
            tech: "HTML • CSS • JavaScript • Web UI • Comunidad",
            desc: "Plataforma web oficial orientada a la gestión de comunidad, interacción digital y presentación de dinámicas de clan.",
            features: [
                "Diseño responsivo optimizado para múltiples dispositivos.",
                "Secciones interactivas para miembros y eventos.",
                "Estructura modular limpia basada en buenas prácticas de desarrollo web."
            ],
            github: "https://github.com/SerakDepMS/Serakdep-MS-Clan-Official"
        },
        terminal: {
            title: "Crypt-Terminal",
            tech: "HTML • CSS • JavaScript • Simulación CLI • Criptografía",
            desc: "Interfaz de simulación de terminal web interactiva enfocada en herramientas criptográficas y procesamiento de comandos.",
            features: [
                "Intérprete de comandos personalizado en JavaScript nativo.",
                "Diseño inmersivo estilo consola oscura.",
                "Módulos orientados a pruebas de lógica y encriptación web."
            ],
            github: "https://github.com/SerakDepMS/Crypt-Terminal"
        },
        social: {
            title: "red-social-beta",
            tech: "HTML • CSS • JavaScript • Prototipado Web • Beta",
            desc: "Prototipo experimental de red social diseñado para explorar dinámicas de interacción de usuarios y flujos de datos en el cliente.",
            features: [
                "Simulación de publicaciones y perfiles dinámicos.",
                "Arquitectura inicial escalable para componentes sociales.",
                "Interfaz fluida orientada a la experiencia de usuario."
            ],
            github: "https://github.com/SerakDepMS/red-social-beta"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalBodyContent = document.getElementById('modal-body-content');
    const closeModalBtn = document.getElementById('close-modal');

    let lastFocusedCard = null;

    const openProjectModal = (card) => {
        const projectKey = card.getAttribute('data-project');
        const data = projectData[projectKey];

        if (data) {
            modalBodyContent.innerHTML = `
                <p class="modal-tech">${data.tech}</p>
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <ul class="modal-features">
                    ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> <span>${f}</span></li>`).join('')}
                </ul>
                <a href="${data.github}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> Ver Repositorio</a>
            `;
            modalOverlay.classList.add('active');
            modalOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            lastFocusedCard = card;
            if (closeModalBtn) closeModalBtn.focus();
        }
    };

    projectCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-links')) return;
            openProjectModal(card);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card);
            }
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedCard) {
            lastFocusedCard.focus();
            lastFocusedCard = null;
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
        if (e.key === 'Escape') closeModal();
    });


    const sections = document.querySelectorAll('section, footer');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
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
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });


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