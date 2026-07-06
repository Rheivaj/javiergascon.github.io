document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const healthBarFill = document.getElementById('health-bar-fill');
    const healthBarText = document.getElementById('health-bar-text');

    let currentLang = 'en';

    const texts = {
        en: {
            nav: ['Home', 'Development', 'Resume', 'Contact'],
            title: 'Chess 2D Mobile',
            projectInfo: [
                'Primary Focus: <b>Mobile UI/UX & WebGL Deployment</b>'
            ],
            description: [
                'Play this beautiful 2D Chess game, designed specifically for mobile devices, directly in your browser. This project showcases standard chess rules, board state evaluations, clean user interface animations, and a seamless mobile WebGL deployment.',
                'The gameplay has been fully optimized to work on touch screens, featuring responsive canvas resizing and light resource consumption.'
            ],
            sections: {
                core: 'Core Features',
                contact: 'Contact'
            },
            contact: 'You can reach me via email at: <a href="mailto:javier.gascon.14@gmail.com">javier.gascon.14@gmail.com</a>',
            contributions: [
                {
                    title: 'Gameplay & Chess Rules Engine',
                    intro: 'Implemented core chess mechanics and validation systems including:',
                    bullets: [
                        '<b>Move Validation:</b> Accurate logic for all classic pieces (pawns, knights, bishops, rooks, queens, kings).',
                        '<b>Special Rules:</b> Support for castling, en passant, and pawn promotion.',
                        '<b>Game Loop:</b> Turn-based system with detection for check, checkmate, and stalemate.'
                    ],
                    outro: 'The rules engine is designed to be robust, preventing invalid board configurations.'
                },
                {
                    title: 'Mobile UI/UX Design',
                    intro: 'Focused on creating a smooth and pleasant experience for touch devices:',
                    bullets: [
                        '<b>Responsive Layout:</b> The game canvas automatically adapts to vertical orientations typical of mobile screens.',
                        '<b>Touch Inputs:</b> Drag-and-drop mechanics optimized for precise touch screen control.',
                        '<b>Minimalist Aesthetics:</b> Clean visual design that minimizes distractions and enhances readability of the board.'
                    ],
                    outro: 'This ensures the game remains highly playable on all screen sizes.'
                }
            ]
        },
        es: {
            nav: ['Inicio', 'Trabajo', 'Currículum', 'Contacto'],
            title: 'Ajedrez 2D Móvil',
            projectInfo: [
                'Foco Principal: <b>UI/UX Móvil y Despliegue WebGL</b>'
            ],
            description: [
                'Juega a este hermoso juego de Ajedrez 2D, diseñado específicamente para dispositivos móviles, directamente en tu navegador. Este proyecto destaca las reglas estándar del ajedrez, la evaluación del estado del tablero, animaciones limpias de la interfaz de usuario y un despliegue WebGL fluido.',
                'La experiencia de juego se ha optimizado por completo para pantallas táctiles, con un redimensionamiento responsivo del canvas y bajo consumo de recursos.'
            ],
            sections: {
                core: 'Características Principales',
                contact: 'Contacto'
            },
            contact: 'Puedes contactarme vía email en: <a href="mailto:javier.gascon.14@gmail.com">javier.gascon.14@gmail.com</a>',
            contributions: [
                {
                    title: 'Motor de Reglas y Gameplay',
                    intro: 'Implementación de las mecánicas centrales y sistemas de validación del ajedrez:',
                    bullets: [
                        '<b>Validación de Movimientos:</b> Lógica precisa para todas las piezas clásicas (peones, caballos, alfiles, torres, reinas, reyes).',
                        '<b>Reglas Especiales:</b> Soporte para enroque, captura al paso (en passant) y coronación del peón.',
                        '<b>Bucle de Juego:</b> Sistema por turnos con detección de jaque, jaque mate y tablas.'
                    ],
                    outro: 'El motor de reglas está diseñado para ser robusto y evitar estados inválidos en el tablero.'
                },
                {
                    title: 'Diseño de Interfaz Móvil (UI/UX)',
                    intro: 'Centrado en crear una experiencia fluida y agradable para dispositivos táctiles:',
                    bullets: [
                        '<b>Diseño Responsivo:</b> El canvas del juego se adapta automáticamente a las orientaciones verticales típicas de las pantallas móviles.',
                        '<b>Controles Táctiles:</b> Mecánicas de arrastrar y soltar optimizadas para una entrada táctil precisa.',
                        '<b>Estética Minimalista:</b> Diseño visual limpio que reduce distracciones y mejora la legibilidad del tablero.'
                    ],
                    outro: 'Esto garantiza que el juego sea perfectamente jugable en cualquier tamaño de pantalla.'
                }
            ]
        }
    };

    function updateLangButton() {
        langToggle.textContent = currentLang === 'en' ? 'Español' : 'English';
    }

    function translate() {
        // NAV
        navLinks.forEach((link, i) => {
            if (texts[currentLang].nav[i]) link.textContent = texts[currentLang].nav[i];
        });

        // TITLE
        document.querySelector('#project h1').textContent = texts[currentLang].title;
        document.title = texts[currentLang].title;

        // PROJECT INFO
        const infoItems = document.querySelectorAll('.info-item p');
        infoItems.forEach((p, i) => {
            p.innerHTML = texts[currentLang].projectInfo[i];
        });

        // DESCRIPTION
        document.querySelectorAll('.project-description').forEach((p, i) => {
            if (texts[currentLang].description[i]) p.innerHTML = texts[currentLang].description[i];
        });

        // CONTACT
        document.querySelector('.contact-text').innerHTML = texts[currentLang].contact;

        // SECTION TITLES
        document.querySelector('#project h2').textContent = texts[currentLang].sections.core;
        document.querySelector('#contact h2').textContent = texts[currentLang].sections.contact;

        // CONTRIBUTIONS
        document.querySelectorAll('.contribution-item').forEach((item, i) => {
            const data = texts[currentLang].contributions[i];
            item.querySelector('h3').textContent = data.title;
            item.querySelector('p').textContent = data.intro;

            const lis = item.querySelectorAll('ul li');
            lis.forEach((li, index) => {
                if(data.bullets[index]) li.innerHTML = data.bullets[index];
            });

            const paragraphs = item.querySelectorAll('p');
            if (data.outro && paragraphs[1]) {
                paragraphs[1].textContent = data.outro;
            }
        });

        updateLangButton();
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        translate();
    });

    translate();

    // Animations logic
    const faders = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(fader => {
        fadeObserver.observe(fader);
    });

    // Health Bar Logic
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if(healthBarFill) healthBarFill.style.width = scrollPercent + '%';
        if(healthBarText) {
            const currentHP = Math.round(scrollPercent);
            healthBarText.textContent = `HP: ${currentHP}/100`;
        }
    });
});
