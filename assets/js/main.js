/**
 * MAIN.JS
 * Navbar functionality, scroll behavior, and initialization
 */

// ============================================
// DOM ELEMENTS
// ============================================

const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const mediaModal = document.getElementById('media-modal');
const mediaModalTitle = document.getElementById('media-modal-title');
const mediaModalDescription = document.getElementById('media-modal-description');
const mediaModalGallery = document.getElementById('media-modal-gallery');
const mediaModalVideoLink = document.getElementById('media-modal-video-link');

function getCurrentLanguage() {
    return document.documentElement.lang === 'fr' ? 'fr' : 'en';
}

function getLocalizedText(enText, frText) {
    return getCurrentLanguage() === 'fr' ? frText : enText;
}

function normalizeText(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '')
        .trim();
}

function getAssetBaseName(path) {
    const fileName = path.split('/').pop() || '';
    return fileName.replace(/\.[^.]+$/, '').toLowerCase();
}

function getTitleKey(trigger) {
    const titleKey = trigger.dataset.mediaTitleKey || trigger.closest('[data-media-title-key]')?.dataset.mediaTitleKey || '';
    return titleKey && window.translations?.[getCurrentLanguage()]?.[titleKey]
        ? window.translations[getCurrentLanguage()][titleKey]
        : '';
}

function collectProjectImages(trigger) {
    const slug = normalizeText(trigger.dataset.mediaSlug || '');
    const titleText = normalizeText(getTitleKey(trigger));
    const target = `${slug}${titleText}`;

    const imageGroups = [
        {
            keys: ['distrisys', 'decisionsupportsystemdistrisys', 'systemedecisionneldistrisys'],
            files: [
                'Distrisys-capture-1.png.png',
                'Distrisys-capture-2.png.png',
                'Distrisys-capture-3.png.png',
                'Distrisys-capture-4.png.png'
            ]
        },
        {
            keys: ['b2mai', 'b2mdeveloper', 'b2maideveloper'],
            files: [
                'Distrisys-capture-1.png.png',
                'Distrisys-capture-2.png.png'
            ]
        },
        {
            keys: ['b2mdatadevelopment', 'b2mdataengineering', 'dataengineeringintern'],
            files: [
                'Distrisys-capture-3.png.png',
                'Distrisys-capture-4.png.png'
            ]
        },
        {
            keys: ['freelance', 'marmoteck', 'cuisina'],
            files: [
                'freelance-capture-1.png.png',
                'freelance-capture-2.png.png',
                'freelance-capture-3.png.png',
                'freelance-capture-4.png.png',
                'freelance-capture-5.png.png',
                'freelance-capture-6.png.png'
            ]
        },
        {
            keys: ['bbt', 'projectbbt', 'datawarehouseforbbt'],
            files: [
                'project-PFE-1.png.png',
                'project-PFE-2.png.png',
                'project-PFE-3.png.png',
                'project-PFE-4.png.png',
                'project-PFE-5.png.png',
                'project-PFE-6.png.png',
                'project-PFE-7.png.png',
                'project-PFE-8.png.png',
                'project-PFE-9.png.png',
                'project-PFE-10.png.png'
            ]
        },
        {
            keys: ['yellowtaxi', 'newyorkyellowtaxi', 'nycyellowtaxi'],
            files: []
        },
        {
            keys: ['salesetl', 'salesanalysis'],
            files: []
        }
    ];

    const matchingGroup = imageGroups.find(group => group.keys.some(key => target.includes(key)));

    return matchingGroup ? matchingGroup.files.map(fileName => `assets/images/${fileName}`) : [];
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu() {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Handle navbar scroll effect
 * Adds 'scrolled' class when page is scrolled
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Smooth scroll to section when nav link is clicked
 */
function smoothScrollToSection(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Show/hide back to top button based on scroll position
 */
function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
}

/**
 * Scroll to top when back to top button is clicked
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// MEDIA MODAL
// ============================================

function closeMediaModal() {
    if (!mediaModal) return;

    mediaModal.classList.remove('open');
    mediaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function renderMediaGallery(mediaSources, title) {
    if (!mediaModalGallery) return;

    mediaModalGallery.innerHTML = '';

    if (!mediaSources.length) {
        const placeholder = document.createElement('div');
        placeholder.className = 'media-modal-placeholder';
        placeholder.textContent = getLocalizedText('No captures available yet', 'Aucune capture disponible pour le moment');
        mediaModalGallery.appendChild(placeholder);
        return;
    }

    mediaSources.forEach((source, index) => {
        const frame = document.createElement('div');
        frame.className = 'media-modal-frame';

        const image = document.createElement('img');
        image.src = source;
        image.alt = `${title} - capture ${index + 1}`;
        image.loading = 'lazy';
        image.addEventListener('error', () => {
            frame.innerHTML = '';
            const fallback = document.createElement('div');
            fallback.className = 'media-modal-placeholder';
            fallback.textContent = source;
            frame.appendChild(fallback);
        });

        frame.appendChild(image);
        mediaModalGallery.appendChild(frame);
    });
}

function openMediaModal(trigger) {
    if (!mediaModal || !mediaModalTitle || !mediaModalDescription || !mediaModalGallery || !mediaModalVideoLink) {
        return;
    }

    const mediaContainer = trigger.closest('.project-card, .timeline-item, .experience-media');
    const mediaSources = (trigger.dataset.mediaImages || mediaContainer?.dataset.mediaImages || '')
        .split('|')
        .map(source => source.trim())
        .filter(Boolean)
        .concat(collectProjectImages(trigger))
        .filter((source, index, array) => array.indexOf(source) === index);
    const mediaVideo = trigger.dataset.mediaVideo || mediaContainer?.dataset.mediaVideo || '';

    let title = '';
    let description = '';

    if (mediaContainer?.classList.contains('project-card')) {
        title = mediaContainer.querySelector('.project-title')?.textContent?.trim() || '';
        description = mediaContainer.querySelector('.project-description')?.textContent?.trim() || '';
        const projectTags = Array.from(mediaContainer.querySelectorAll('.project-tag'))
            .map(tag => tag.textContent.trim())
            .filter(Boolean);
        if (projectTags.length) {
            description = description ? `${description} · ${projectTags.join(', ')}` : projectTags.join(', ');
        }
    } else if (mediaContainer?.classList.contains('timeline-item')) {
        title = mediaContainer.querySelector('.timeline-title')?.textContent?.trim() || '';
        const company = mediaContainer.querySelector('.timeline-company')?.textContent?.trim() || '';
        const bulletPoints = Array.from(mediaContainer.querySelectorAll('.timeline-description li'))
            .map(item => item.textContent.trim())
            .filter(Boolean);
        description = [company, ...bulletPoints].filter(Boolean).join(' · ');
    } else {
        title = trigger.dataset.mediaTitle || trigger.closest('[data-media-title]')?.dataset.mediaTitle || '';
        description = trigger.dataset.mediaDescription || trigger.closest('[data-media-description]')?.dataset.mediaDescription || '';
    }

    if (!mediaSources.length && mediaContainer?.classList.contains('project-card')) {
        mediaSources.push(...collectProjectImages(trigger));
    }

    mediaModalTitle.textContent = title;
    mediaModalDescription.textContent = description;
    renderMediaGallery(mediaSources, title);

    if (mediaVideo) {
        mediaModalVideoLink.style.display = 'inline-flex';
        mediaModalVideoLink.href = mediaVideo;
        mediaModalVideoLink.textContent = getLocalizedText('View video', 'Voir la vidéo');
    } else {
        mediaModalVideoLink.style.display = 'none';
    }

    mediaModal.classList.add('open');
    mediaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function handleMediaTrigger(event) {
    event.preventDefault();
    openMediaModal(event.currentTarget);
}

// ============================================
// CONTACT FORM
// ============================================

/**
 * Handle contact form submission
 * Note: This is a frontend-only implementation
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (in production, this would send to a backend)
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all event listeners and functionality
 */
function init() {
    // Navbar toggle event
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Nav links smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleBackToTopVisibility();
    });
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Media modal triggers
    const mediaTriggers = document.querySelectorAll('.media-modal-trigger');
    mediaTriggers.forEach(trigger => {
        trigger.addEventListener('click', handleMediaTrigger);
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openMediaModal(trigger);
            }
        });
    });

    if (mediaModal) {
        mediaModal.addEventListener('click', (event) => {
            if (event.target.matches('[data-modal-close]')) {
                closeMediaModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMediaModal();
            }
        });
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Initial calls
    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTopVisibility();
    
    console.log('Main.js initialized successfully');
}

// ============================================
// RUN INITIALIZATION WHEN DOM IS READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
