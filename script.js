
// SCRIPT FORM

    const form = document.getElementById('reservation-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            // Redirection vers la page merci.html
            window.location.href = 'merci.html';
        } else {
            alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        }
    });


// SCRIPT CAROUSSEL

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".carousel-container").forEach((container) => {
    const track = container.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    // Clones pour la boucle infinie
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.prepend(lastClone);

    const totalSlides = slides.length + 2;
    let index = 1;
    let isAnimating = false;

    track.style.width = `${totalSlides * 100}%`;

    const allSlides = track.querySelectorAll("img");
    allSlides.forEach((img) => {
      img.style.width = `${100 / totalSlides}%`;
    });

    // Position initiale sur la 1ère photo
    track.style.transition = "none";
    track.style.transform = `translateX(-${(100 / totalSlides) * index}%)`;

    function move(direction) {
      if (isAnimating) return;
      isAnimating = true;

      index += direction;
      track.style.transition = "transform 0.4s ease-in-out";
      track.style.transform = `translateX(-${(100 / totalSlides) * index}%)`;
    }

    track.addEventListener("transitionend", function () {
      isAnimating = false;

      // Réinitialisation instantanée pour la boucle infinie
      if (index === 0) {
        track.style.transition = "none";
        index = totalSlides - 2;
        track.style.transform = `translateX(-${(100 / totalSlides) * index}%)`;
      } else if (index === totalSlides - 1) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${(100 / totalSlides) * index}%)`;
      }
    });

    // Attachement des clics sur les flèches
    const prevBtn = container.querySelector(".arrow.prev");
    const nextBtn = container.querySelector(".arrow.next");

    if (prevBtn) prevBtn.addEventListener("click", () => move(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => move(1));
  });
});

// SCRIPT CAROUSSEL LIGHTBOX 

   // --- GESTION LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentGalleryImages = [];
let currentIndex = 0;

// Cible précisément chaque carte de chambre
document.querySelectorAll('article.card').forEach(card => {
  const images = Array.from(card.querySelectorAll('.carousel-track img'));
  
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      // Charge uniquement les photos de la chambre cliquée
      currentGalleryImages = images.map(i => i.src);
      currentIndex = index;
      openLightbox();
    });
  });
});

function openLightbox() {
  lightboxImg.src = currentGalleryImages[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentGalleryImages.length;
  lightboxImg.src = currentGalleryImages[currentIndex];
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  lightboxImg.src = currentGalleryImages[currentIndex];
}

// Événements
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
