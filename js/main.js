// ==========================================
// DATOS DEL SISTEMA
// ==========================================
const categorias = [
    { 
        id: 'corredizo', 
        nombre: 'Corredizo',
        images: [
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'abatibles', 
        nombre: 'Abatibles',
        images: [
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'fijos', 
        nombre: 'Fijos',
        images: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'plegable', 
        nombre: 'Plegable',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'domos', 
        nombre: 'Domos',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'cristal', 
        nombre: 'Cristal Templado',
        images: [
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'        ]
    },
    { 
        id: 'acoples', 
        nombre: 'Acoples',
        images: [
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80'
        ]
    },
    { 
        id: 'especiales', 
        nombre: 'Especiales',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'
        ]
    }
];

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHeroParallax();
    initCategories();
    initCotizador();
    initScrollAnimations();
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
function initHeader() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// HERO PARALLAX
// ==========================================
function initHeroParallax() {
    const heroBg = document.getElementById('heroBg');    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        heroBg.style.transform = `translateY(${offset * 0.4}px)`;
    });
}

// ==========================================
// CATEGORIES GRID + SLIDESHOW
// ==========================================
function initCategories() {
    const grid = document.getElementById('categories-grid');
    
    categorias.forEach(cat => {
        const card = document.createElement('a');
        card.href = '#cotizador';
        card.className = 'category-card';
        card.dataset.category = cat.id;
        
        card.innerHTML = `
            <div class="slideshow-container" data-images='${JSON.stringify(cat.images)}'></div>
            <div class="card-info"><h2 class="card-title">${cat.nombre}</h2></div>
        `;
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(cat.id);
            document.getElementById('cotizador').scrollIntoView({ behavior: 'smooth' });
        });
        
        grid.appendChild(card);
    });
    
    // Initialize slideshows
    const containers = document.querySelectorAll('.slideshow-container');
    containers.forEach(container => {
        const images = JSON.parse(container.getAttribute('data-images'));
        
        images.forEach((imgUrl, index) => {
            const div = document.createElement('div');
            div.classList.add('slide-img');
            div.style.backgroundImage = `url('${imgUrl}')`;
            if (index === 0) div.classList.add('active');
            container.appendChild(div);
        });

        let currentSlide = 0;
        const slides = container.querySelectorAll('.slide-img');
        
        setInterval(() => {
            slides[currentSlide].classList.remove('active');            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4500);
    });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
function initScrollAnimations() {
    const cards = document.querySelectorAll('.category-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// ==========================================
// COTIZADOR LOGIC
// ==========================================
let currentSystem = 'corredizo';

function initCotizador() {
    const selectorButtons = document.querySelectorAll('.btn-select');
    const widthSlider = document.getElementById('slider-width');
    const heightSlider = document.getElementById('slider-height');
    
    selectorButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectorButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentSystem = e.target.getAttribute('data-type');
            updateQuote();
        });
    });

    widthSlider.addEventListener('input', updateQuote);    heightSlider.addEventListener('input', updateQuote);
    
    updateQuote();
}

function selectCategory(catId) {
    currentSystem = catId;
    const buttons = document.querySelectorAll('.btn-select');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === catId) {
            btn.classList.add('active');
        }
    });
    updateQuote();
}

function generateSVG(system, w, h) {
    const baseSize = 250;
    const aspect = w / h;
    let boxWidth = baseSize;
    let boxHeight = baseSize;

    if (aspect > 1) {
        boxHeight = baseSize / aspect;
    } else {
        boxWidth = baseSize * aspect;
    }

    let svgContent = '';

    switch(system) {
        case 'corredizo':
            svgContent = `
                <rect x="5" y="5" width="${boxWidth-10}" height="${boxHeight-10}" fill="none" stroke="#1d1d1f" stroke-width="3"/>
                <line x1="${boxWidth/2}" y1="5" x2="${boxWidth/2}" y2="${boxHeight-5}" stroke="#1d1d1f" stroke-width="2"/>
                <path d="M ${boxWidth/4 - 10} ${boxHeight/2} L ${boxWidth/4 + 10} ${boxHeight/2} M ${boxWidth/4 + 5} ${boxHeight/2 - 5} L ${boxWidth/4 + 10} ${boxHeight/2} L ${boxWidth/4 + 5} ${boxHeight/2 + 5}" fill="none" stroke="#0071e3" stroke-width="2"/>
            `;
            break;
        case 'abatible':
            svgContent = `
                <rect x="5" y="5" width="${boxWidth-10}" height="${boxHeight-10}" fill="none" stroke="#1d1d1f" stroke-width="3"/>
                <polyline points="5,5 ${boxWidth-5},${boxHeight/2} 5,${boxHeight-5}" fill="none" stroke="#86868b" stroke-dasharray="4" stroke-width="2"/>
            `;
            break;
        case 'fijo':
            svgContent = `
                <rect x="5" y="5" width="${boxWidth-10}" height="${boxHeight-10}" fill="none" stroke="#1d1d1f" stroke-width="4"/>
                <line x1="5" y1="5" x2="${boxWidth-5}" y2="${boxHeight-5}" stroke="#0071e3" stroke-width="0.5" opacity="0.3"/>
            `;            break;
        case 'plegable':
            const segment = (boxWidth - 10) / 3;
            svgContent = `
                <rect x="5" y="5" width="${boxWidth-10}" height="${boxHeight-10}" fill="none" stroke="#1d1d1f" stroke-width="3"/>
                <line x1="${5 + segment}" y1="5" x2="${5 + segment}" y2="${boxHeight-5}" stroke="#1d1d1f" stroke-width="2"/>
                <line x1="${5 + segment*2}" y1="5" x2="${5 + segment*2}" y2="${boxHeight-5}" stroke="#1d1d1f" stroke-width="2"/>
                <path d="M 10 10 L ${5+segment} ${boxHeight/2} L 10 ${boxHeight-10}" fill="none" stroke="#86868b" stroke-dasharray="3"/>
            `;
            break;
        case 'domo':
            svgContent = `
                <path d="M 5 ${boxHeight-5} Q ${boxWidth/2} 5 ${boxWidth-5} ${boxHeight-5}" fill="none" stroke="#1d1d1f" stroke-width="3"/>
                <line x1="${boxWidth/2}" y1="5" x2="${boxWidth/2}" y2="${boxHeight-5}" stroke="#1d1d1f" stroke-width="1.5"/>
                <line x1="5" y1="${boxHeight-5}" x2="${boxWidth-5}" y2="${boxHeight-5}" stroke="#1d1d1f" stroke-width="3"/>
            `;
            break;
        case 'templado':
            svgContent = `
                <rect x="10" y="10" width="${boxWidth-20}" height="${boxHeight-20}" fill="rgba(0,113,227,0.05)" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="150 10"/>
                <circle cx="25" cy="25" r="4" fill="#1d1d1f"/>
                <circle cx="${boxWidth-25}" cy="25" r="4" fill="#1d1d1f"/>
            `;
            break;
    }

    return `<svg width="${boxWidth}" height="${boxHeight}" viewBox="0 0 ${boxWidth} ${boxHeight}">${svgContent}</svg>`;
}

function updateQuote() {
    const widthSlider = document.getElementById('slider-width');
    const heightSlider = document.getElementById('slider-height');
    const w = parseFloat(widthSlider.value);
    const h = parseFloat(heightSlider.value);
    const area = (w * h).toFixed(2);

    document.getElementById('val-width').textContent = `${w.toFixed(2)} m`;
    document.getElementById('val-height').textContent = `${h.toFixed(2)} m`;
    document.getElementById('data-w').textContent = `${w.toFixed(2)} m`;
    document.getElementById('data-h').textContent = `${h.toFixed(2)} m`;
    document.getElementById('data-area').textContent = `${area} m²`;

    const croquisContainer = document.getElementById('croquis-container');
    const specialContainer = document.getElementById('special-container');
    const standardControls = document.getElementById('standard-controls');
    const dataPanel = document.getElementById('data-panel');

    if (currentSystem === 'acoples' || currentSystem === 'especiales') {
        croquisContainer.style.display = 'none';
        dataPanel.style.display = 'none';        standardControls.style.opacity = '0.3';
        standardControls.style.pointerEvents = 'none';
        specialContainer.style.display = 'block';
    } else {
        croquisContainer.style.display = 'flex';
        dataPanel.style.display = 'flex';
        standardControls.style.opacity = '1';
        standardControls.style.pointerEvents = 'all';
        specialContainer.style.display = 'none';
        croquisContainer.innerHTML = generateSVG(currentSystem, w, h);
    }
}

function solicitarCotizacion() {
    const w = document.getElementById('slider-width').value;
    const h = document.getElementById('slider-height').value;
    const cat = categorias.find(c => c.id === currentSystem);
    alert(`Solicitud enviada:\n\nSistema: ${cat.nombre}\nAncho: ${w} m\nAlto: ${h} m\n\nUn asesor se pondrá en contacto contigo.`);
}