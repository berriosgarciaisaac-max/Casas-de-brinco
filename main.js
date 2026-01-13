// JavaScript Premium para Casas de Brinco

document.addEventListener('DOMContentLoaded', function() {
    // Header dinámico premium
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Menú hamburguesa premium
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Gracias por tu consulta! Te contactaremos pronto.';

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Aquí normalmente enviarías los datos a un servidor
        // Por ahora, solo mostraremos un mensaje de éxito

        // Simular envío
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Mostrar mensaje de éxito
            contactForm.appendChild(successMessage);
            successMessage.style.display = 'block';

            // Limpiar formulario
            contactForm.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 1000);
    });

    // Sistema de animaciones premium al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para animaciones más naturales
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observar elementos para animación escalonada
    document.querySelectorAll('.servicio-card, .galeria-item, .precio-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animación especial para secciones completas
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Aplicar animación inicial a secciones
    document.querySelectorAll('section > .container').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Cambiar estilo del header al hacer scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Efectos parallax premium
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        const heroBadge = document.querySelector('.hero-badge');

        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
        }

        if (heroBadge) {
            heroBadge.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    // Efecto de typing para el título (opcional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        // Solo activar en desktop y si el elemento es visible
        if (window.innerWidth > 768) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        type();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        } else {
            element.textContent = text;
        }
    }

    // Aplicar efecto typing al título del hero (opcional)
    // const heroTitle = document.querySelector('.hero-content h1');
    // if (heroTitle) {
    //     typeWriter(heroTitle, '¡Haz que sus fiestas sean inolvidables!');
    // }

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // WhatsApp integration
    const whatsappBtn = document.querySelector('.fa-whatsapp').parentElement;
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = encodeURIComponent('Hola, me gustaría información sobre el alquiler de casas de brinco.');
            window.open(`https://wa.me/56912345678?text=${message}`, '_blank');
        });
    }

    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    });
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono chileno
function isValidPhone(phone) {
    const phoneRegex = /^(\+56|56)?[9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Validación en tiempo real del formulario
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefono');

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    }
});