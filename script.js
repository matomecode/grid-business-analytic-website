// Load GSAP from CDN if not already loaded
if (typeof gsap === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
  script.onload = initAnimations;
  document.head.appendChild(script);
} else {
  initAnimations();
}

function initAnimations() {
  // Preloader animation
  window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => loader.style.display = 'none'
      });
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Initialize floating cards with GSAP
  const floatingCards = document.querySelectorAll('.floating-card');
  if (floatingCards.length > 0 && typeof gsap !== 'undefined') {
    floatingCards.forEach((card, i) => {
      // Make cards visible
      gsap.set(card, { opacity: 0.85 });
      
      // Create individual float animations
      gsap.to(card, {
        y: 15,
        x: 15,
        duration: 4 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 1.5,
      });
    });

    // Parallax effect on mouse move
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        floatingCards.forEach((card, i) => {
          const moveX = x * (10 + i * 5);
          const moveY = y * (10 + i * 5);
          gsap.to(card, {
            x: moveX,
            y: moveY,
            duration: 0.8,
            ease: 'power2.out'
          });
        });
      });

      hero.addEventListener('mouseleave', () => {
        floatingCards.forEach((card) => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });
    }
  }

  // Initialize Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('card')) {
          entry.target.classList.add('animate');
        } else if (entry.target.classList.contains('chart-container')) {
          entry.target.classList.add('animate');
          // You would add your chart drawing animation here
          animateChart(entry.target);
        } else if (entry.target.classList.contains('form-group')) {
          entry.target.classList.add('animate');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements that need to animate on scroll
  document.querySelectorAll('.card, .chart-container, .form-group').forEach(el => {
    observer.observe(el);
  });

  // Ripple effect for buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Animate hamburger icon
      if (mobileMenu.classList.contains('active')) {
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(1)'), {
          rotate: 45,
          y: 6,
          duration: 0.3
        });
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(2)'), {
          opacity: 0,
          duration: 0.2
        });
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(3)'), {
          rotate: -45,
          y: -6,
          duration: 0.3
        });
      } else {
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(1)'), {
          rotate: 0,
          y: 0,
          duration: 0.3
        });
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(2)'), {
          opacity: 1,
          duration: 0.3,
          delay: 0.1
        });
        gsap.to(mobileMenuBtn.querySelector('.line:nth-child(3)'), {
          rotate: 0,
          y: 0,
          duration: 0.3
        });
      }
    });
  }

  // Form submission handling with animations
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="skeleton" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></span> Sending...';
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-success');
        alert.textContent = 'Message sent successfully!';
        form.prepend(alert);
        
        // Animate alert
        setTimeout(() => alert.classList.add('show'), 10);
        
        // Reset form
        form.reset();
      } catch (error) {
        // Show error message
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-error');
        alert.textContent = 'Error sending message. Please try again.';
        form.prepend(alert);
        
        // Animate alert
        setTimeout(() => alert.classList.add('show'), 10);
      } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Remove alerts after 5 seconds
        setTimeout(() => {
          const alerts = form.querySelectorAll('.alert');
          alerts.forEach(alert => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 400);
          });
        }, 5000);
      }
    });
  });
}

// Chart animation function
function animateChart(chartContainer) {
  // This would be specific to your chart library
  // Example for Chart.js:
  const canvas = chartContainer.querySelector('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        // Your chart data
      },
      options: {
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }
}
