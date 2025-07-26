// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Button click animation
document.querySelectorAll('a[class*="btn"]').forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("clicked");
  });
  btn.addEventListener("mouseup", () => {
    btn.classList.remove("clicked");
  });
  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("clicked");
  });
});

// Mobile menu toggle (optional enhancement)
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.innerHTML = '☰';
mobileMenuToggle.style.display = 'none';

document.querySelector('.navbar').prepend(mobileMenuToggle);

function setupMobileMenu() {
  const nav = document.querySelector('.navbar nav');
  if (window.innerWidth < 768) {
    mobileMenuToggle.style.display = 'block';
    nav.style.display = 'none';
    mobileMenuToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
    });
  } else {
    mobileMenuToggle.style.display = 'none';
    nav.style.display = 'flex';
  }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();