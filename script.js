// Smooth floating animations for hero section cards and SVG blobs
document.addEventListener('DOMContentLoaded', () => {
  const floatingCards = document.querySelectorAll('.floating-card');

  // Helper to create a smooth float animation using GSAP or fallback
  if (typeof gsap !== 'undefined') {
    floatingCards.forEach((card, i) => {
      gsap.to(card, {
        y: 15,
        x: 15,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 2,
      });
    });
  } else {
    // Fallback to CSS keyframe animation is already applied in CSS
  }

  // Optional: subtle parallax effect on mouse move for hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatingCards.forEach((card, i) => {
        const moveX = x * (10 + i * 5);
        const moveY = y * (10 + i * 5);
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      floatingCards.forEach((card) => {
        card.style.transform = '';
      });
    });
  }
});
