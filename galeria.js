// JavaScript para la página de galería

document.addEventListener('DOMContentLoaded', function() {
    // Sistema de filtros
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtroBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            const filtro = this.dataset.filter;

            galeriaItems.forEach(item => {
                if (filtro === 'todos') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else if (item.classList.contains(filtro)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Funcionalidad "Ver Más"
    const verMasBtn = document.getElementById('verMasBtn');
    let itemsMostrados = 9; // Mostrar 9 items inicialmente
    const itemsPorCarga = 6;

    if (verMasBtn) {
        // Ocultar items adicionales inicialmente
        galeriaItems.forEach((item, index) => {
            if (index >= itemsMostrados) {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });

        verMasBtn.addEventListener('click', function() {
            const itemsOcultos = Array.from(galeriaItems).filter(item => item.style.display === 'none');

            if (itemsOcultos.length === 0) {
                // Si no hay más items, mostrar mensaje o deshabilitar botón
                this.textContent = 'No hay más productos';
                this.disabled = true;
                return;
            }

            // Mostrar los próximos items
            const itemsAMostrar = itemsOcultos.slice(0, itemsPorCarga);

            itemsAMostrar.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                }, index * 100);
            });

            itemsMostrados += itemsAMostrar.length;

            // Si ya no hay más items por mostrar
            if (itemsMostrados >= galeriaItems.length) {
                this.style.display = 'none';
            }
        });
    }

    // Modal para imágenes (opcional)
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
                <span class="modal-price"></span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price');
    const closeModal = modal.querySelector('.close-modal');

    // Abrir modal al hacer clic en imagen
    galeriaItems.forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.galeria-overlay');

        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalTitle.textContent = overlay.querySelector('h4').textContent;
            modalDescription.textContent = overlay.querySelector('p').textContent;
            const precioTag = overlay.querySelector('.precio-tag');
            modalPrice.textContent = precioTag ? precioTag.textContent : '';

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Animación de entrada para los items visibles inicialmente
    galeriaItems.forEach((item, index) => {
        if (index < itemsMostrados) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        }
    });

    // Lazy loading para imágenes
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.galeria-item img').forEach(img => {
        imageObserver.observe(img);
    });
});

// Estilos adicionales para el modal (se agregan dinámicamente)
const modalStyles = `
    .modal {
        display: none;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        position: relative;
        margin: auto;
        top: 50%;
        transform: translateY(-50%);
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        animation: slideIn 0.3s ease;
    }

    .modal-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
    }

    .modal-info {
        padding: 20px;
        text-align: center;
        background: var(--light-color);
        width: 100%;
    }

    .modal-title {
        margin-bottom: 10px;
        color: var(--dark-color);
    }

    .modal-price {
        display: inline-block;
        background: var(--primary-color);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-weight: 600;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 20px;
        color: white;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-100px); opacity: 0; }
        to { transform: translateY(-50%); opacity: 1; }
    }
`;

// Agregar estilos del modal al head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);