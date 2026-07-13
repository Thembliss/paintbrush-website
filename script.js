document.addEventListener('DOMContentLoaded', () => {

    // Build the lightbox markup once and append to body
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(overlay);

    const lightboxImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function openLightbox(src, alt){
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox(){
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // clear src after the fade-out so it doesn't flash the old image next open
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    // Wire up every painting image on the page
    document.querySelectorAll('.painting-card img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    // Close interactions
    closeBtn.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', (e) => {
        // only close if the click was on the overlay itself, not the image
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
    });

});