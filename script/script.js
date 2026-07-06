document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Variables & Elements ---
    const navMenu = document.querySelector('.navbar nav');
    const langToggle = document.getElementById('lang-toggle');
    const healthBarFill = document.getElementById('health-bar-fill');
    const healthBarText = document.getElementById('health-bar-text');

    // --- 2. Interactive Components ---

    // Health Bar Logic
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        healthBarFill.style.width = scrollPercent + '%';

        // Optional: Update text like "HP: 50/100"
        const currentHP = Math.round(scrollPercent);
        healthBarText.textContent = `HP: ${currentHP}/100`;
    });

    // Lazy Loading (Images & Videos)
    const lazyImages = document.querySelectorAll('img.lazy-img');
    const lazyVideos = document.querySelectorAll('video.lazy-video');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.classList.remove('lazy-img'); // or add 'loaded' class
                }
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(img => imageObserver.observe(img));

    // Video Logic: Lazy load AND Play on Hover
    // We lazy load the source first.
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                const dataSrc = source.getAttribute('data-src');
                if (dataSrc) {
                    source.src = dataSrc;
                    video.load(); // Load the video
                }
                observer.unobserve(video);
            }
        });
    }, observerOptions);

    lazyVideos.forEach(video => {
        videoObserver.observe(video);

        // Smart Play/Pause on Hover to save performance
        const card = video.closest('.game-card');
        if (card) {
            card.addEventListener('mouseenter', () => {
                video.currentTime = 0; // Restart
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // Auto-play might be blocked
                        console.log("Autoplay blocked or failed", error);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    });


    // --- 3. Localization (New Robust System) ---

    const texts = {
        en: {
            nav_profile: 'Profile',
            nav_skills: 'Skills',
            nav_projects: 'Projects',
            nav_resume: 'Resume',
            nav_contact: 'Contact',
            
            btn_projects: 'View Projects',
            btn_resume: 'Download Resume',

            section_skills: 'Skills',
            section_projects: 'Personal Projects',
            section_contact: 'Contact',

            home_intro: 'Software Programmer with a background in Multimedia Engineering, focused on problem-solving, system design, and developing interactive applications using C++, C#, and Java.',
            home_desc: 'This website serves as my personal portfolio, showcasing the video games I have contributed to as a programmer. Feel free to explore the projects section to learn more about my involvement and the technologies I\'ve used.',

            skill_softdev_title: 'Software Development',
            skill_softdev_desc: 'Experience designing and implementing software systems with a focus on clean code, problem-solving, and maintainability across academic and personal projects.',

            skill_gamedev_title: 'Game & Interactive Development',
            skill_gamedev_desc: 'Hands-on experience developing interactive applications and games for PC and mobile platforms, applying real-time logic, system design, and performance considerations.',

            skill_engines_title: 'Game Engines (Unity & Unreal Engine 5)',
            skill_engines_desc: 'Experience working with Unity (C#) and Unreal Engine 5 (C++/Blueprints), developing gameplay systems, tools, and real-time interactive features.',

            skill_cpp_title: 'C++',
            skill_cpp_desc: 'Solid foundation in C++ with experience in object-oriented programming, memory management, and performance-oriented system design.',

            skill_csharp_title: 'C#',
            skill_csharp_desc: 'Proficient in C# for developing application logic, game systems, and tools, mainly within Unity-based projects.',

            skill_java_title: 'Java',
            skill_java_desc: 'Experience using Java for software development, applying object-oriented principles, data structures, and problem-solving in academic projects.',

            proj_borova_title: 'Borova: The Forsaken Village',
            proj_borova_desc: 'My Final Degree Project: an exploration and mystery video game developed using Unreal Engine 5, incorporating C++ and Blueprints for gameplay mechanics and environmental storytelling.',

            proj_relicraider_title: 'Relic Raider',
            proj_relicraider_desc: 'University group project involving the creation of a custom game engine in C++ from the ground up, used to develop a video game with mechanics similar to Zelda: Link\'s Awakening.',

            proj_unitypathway_title: 'Unity Junior Programmer Pathway',
            proj_unitypathway_desc: 'Completed the official Junior Programmer Pathway, covering everything from core C# programming to OOP, functional UIs, and data persistence in engine.',

            proj_chess2d_title: 'Chess 2D Mobile',
            proj_chess2d_desc: 'A 2D Chess game optimized for mobile devices, built with Unity and playable directly in the browser.',

            contact_text: 'You can reach me via email at:',
            filter_all: 'All',
            filter_cpp: 'C++',
            filter_unreal: 'Unreal Engine',
            filter_unity: 'Unity'
        },
        es: {
            nav_profile: 'Perfil',
            nav_skills: 'Habilidades',
            nav_projects: 'Proyectos',
            nav_resume: 'Currículum',
            nav_contact: 'Contacto',
            
            btn_projects: 'Ver Proyectos',
            btn_resume: 'Descargar CV',

            section_skills: 'Habilidades',
            section_projects: 'Proyectos Personales',
            section_contact: 'Contacto',

            home_intro: 'Programador de software con formación en Ingeniería Multimedia, enfocado en la resolución de problemas, el diseño de sistemas y el desarrollo de aplicaciones interactivas utilizando C++, C# y Java.',
            home_desc: 'Este sitio web sirve como mi portafolio personal, mostrando los videojuegos a los que he contribuido como programador. Te invito a explorar la sección de proyectos para conocer más sobre mi participación y las tecnologías que he utilizado.',

            skill_softdev_title: 'Desarrollo de Software',
            skill_softdev_desc: 'Experiencia en el diseño e implementación de sistemas de software, con enfoque en código limpio, resolución de problemas y mantenibilidad.',

            skill_gamedev_title: 'Desarrollo Interactivo y de Videojuegos',
            skill_gamedev_desc: 'Experiencia práctica en el desarrollo de aplicaciones interactivas y videojuegos para PC y móvil, aplicando lógica en tiempo real, diseño de sistemas y optimización de rendimiento.',

            skill_engines_title: 'Motores de Juego (Unity y Unreal Engine 5)',
            skill_engines_desc: 'Experiencia trabajando con Unity (C#) y Unreal Engine 5 (C++/Blueprints), desarrollando sistemas de gameplay, herramientas y funcionalidades interactivas en tiempo real.',

            skill_cpp_title: 'C++',
            skill_cpp_desc: 'Base sólida en C++ con experiencia en programación orientada a objetos, gestión de memoria y diseño de sistemas eficientes.',

            skill_csharp_title: 'C#',
            skill_csharp_desc: 'Dominio de C# para el desarrollo de lógica de aplicaciones, sistemas de juego y herramientas, principalmente en proyectos con Unity.',

            skill_java_title: 'Java',
            skill_java_desc: 'Experiencia con Java en el desarrollo de software, aplicando principios de programación orientada a objetos, estructuras de datos y resolución de problemas en proyectos académicos.',

            proj_borova_title: 'Borova: The Forsaken Village',
            proj_borova_desc: 'Mi Proyecto de Fin de Grado: un videojuego de terror psicológico y misterio desarrollado en Unreal Engine 5, usando C++ y Blueprints para las mecánicas de juego y la narrativa ambiental.',

            proj_relicraider_title: 'Relic Raider',
            proj_relicraider_desc: 'Proyecto grupal universitario que consistió en la creación de un motor de juego personalizado en C++ desde cero, utilizado para desarrollar un videojuego con mecánicas similares a Zelda: Link\'s Awakening.',

            proj_unitypathway_title: 'Unity Junior Programmer Pathway',
            proj_unitypathway_desc: 'Completado el curso oficial Junior Programmer Pathway, abarcando desde fundamentos de C# hasta POO, interfaces (UIs) funcionales y persistencia de datos en el motor.',

            proj_chess2d_title: 'Ajedrez 2D Móvil',
            proj_chess2d_desc: 'Un juego de ajedrez en 2D optimizado para dispositivos móviles, desarrollado con Unity y jugable directamente en el navegador.',

            contact_text: 'Puedes contactarme vía email en:',
            filter_all: 'Todos',
            filter_cpp: 'C++',
            filter_unreal: 'Unreal Engine',
            filter_unity: 'Unity'
        }
    };

    let currentLang = 'en';

    function updateLanguage() {
        const t = texts[currentLang];

        // Find all elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(elem => {
            const key = elem.getAttribute('data-lang-key');
            if (t[key]) {
                // Check if it's the specific "nav_resume" link to potentially change the PDF path if needed (optional)
                // content update:
                elem.innerText = t[key];
            }
        });

        langToggle.textContent = currentLang === 'en' ? 'Español' : 'English';
    }

    langToggle.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateLanguage();
    });

    // --- 4. UI Animations & Effects ---
    const faders = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    faders.forEach(fader => {
        fadeObserver.observe(fader);
    });

    // Navbar scroll shadow
    const navbarItem = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbarItem.classList.add('scrolled');
        } else {
            navbarItem.classList.remove('scrolled');
        }
    });

    // --- 5. Project Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectLinks = document.querySelectorAll('.project-link');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Apply fade-out animation first
            projectLinks.forEach(link => {
                link.classList.add('filtering-out');
            });

            // Wait for transition, then filter elements
            setTimeout(() => {
                projectLinks.forEach(link => {
                    const engines = link.getAttribute('data-engine') || '';
                    const engineList = engines.split(' ');

                    if (filterValue === 'all' || engineList.includes(filterValue)) {
                        link.classList.remove('hidden');
                    } else {
                        link.classList.add('hidden');
                    }
                });

                // Trigger reflow for transition, then fade back in
                // (Using requestAnimationFrame ensures the browser registers the display change before animating)
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        projectLinks.forEach(link => {
                            link.classList.remove('filtering-out');
                        });
                    });
                });
            }, 350); // Matches the 0.35s CSS transition duration
        });
    });

    // Initial Lang load
    updateLanguage();
});
