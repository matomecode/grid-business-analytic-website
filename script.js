// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// Button click animation
document.querySelectorAll('a[class^="btn"]').forEach(btn => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("clicked");
  });
  btn.addEventListener("mouseup", () => {
    btn.classList.remove("clicked");
  });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }));
  }

  // Particle System
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;

    // Use enhanced color palette for dynamic particles
    const colors = ['#635bff', '#ff6b6b', '#4ecdc4', '#8268ff', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    let colorIndex = 0;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.colorChangeSpeed = Math.random() * 0.02 + 0.005;
        this.colorPhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep particles within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        // Dynamic color change
        this.colorPhase += this.colorChangeSpeed;
        const colorIndex = Math.floor((Math.sin(this.colorPhase) + 1) / 2 * colors.length);
        this.color = colors[colorIndex];
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, this.color + '00');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.25;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Dynamic connection colors
            const gradient = ctx.createLinearGradient(particle.x, particle.y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, particles[j].color);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Interactive chart tooltips
    document.querySelectorAll('.bar').forEach((bar, index) => {
      const value = bar.getAttribute('data-value');
      bar.style.setProperty('--final-height', value + '%');
      
      bar.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'chart-tooltip';
        tooltip.style.cssText = `
          position: absolute;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 1000;
          pointer-events: none;
        `;
        tooltip.textContent = `Revenue: ${value}K`;
        bar.style.position = 'relative';
        bar.appendChild(tooltip);
      });

      bar.addEventListener('mouseleave', () => {
        const tooltip = bar.querySelector('.chart-tooltip');
        if (tooltip) tooltip.remove();
      });
    });

    // Animate data visualizations on scroll
    const observerOptions = {
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.bar');
          const pieChart = entry.target.querySelector('.pie-chart');
          const lineChart = entry.target.querySelector('.trend-line');
          
          bars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.animation = 'growBar 1s ease-out forwards';
            }, index * 100);
          });

          if (pieChart) {
            pieChart.style.animation = 'rotatePie 2s ease-out';
          }

          if (lineChart) {
            lineChart.style.animation = 'drawLine 3s ease-out forwards';
          }
        }
      });
    }, observerOptions);

    const chartWidgets = document.querySelectorAll('.chart-widget');
    chartWidgets.forEach(widget => observer.observe(widget));
  }
});
