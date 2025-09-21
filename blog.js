// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Category filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogPosts = document.querySelectorAll('.blog-post, .featured-post');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter posts
      blogPosts.forEach(post => {
        if (filter === 'all' || post.dataset.category === filter) {
          post.style.display = 'block';
          post.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });

  // Newsletter signup
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      // Simple validation
      if (email) {
        // Here you would typically send to your email service
        alert('Thank you for subscribing! We\'ll send you the latest financial insights.');
        this.querySelector('input[type="email"]').value = '';
      }
    });
  }

  // Smooth animations for blog posts
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe blog posts for animation
  blogPosts.forEach(post => {
    post.style.opacity = '0';
    post.style.transform = 'translateY(30px)';
    post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(post);
  });
});

// Function to open full blog post (you'll expand this)
function openPost(postId) {
  // For now, this is a placeholder
  // Later you can expand this to show full post content
  console.log('Opening post:', postId);
  
  // Example of how you could handle this:
  // 1. Load post content from JSON
  // 2. Show in modal or navigate to dedicated page
  // 3. Update URL for sharing
  
  alert('Post opening functionality - you can expand this to load full post content from your JSON files!');
}

// Load blog posts from JSON (you'll create this file)
async function loadBlogPosts() {
  try {
    const response = await fetch('/posts/posts.json');
    const data = await response.json();
    
    // You can use this to dynamically load posts
    // renderPosts(data.posts);
    
  } catch (error) {
    console.log('Posts file not found yet - using demo content');
    // Fallback to demo content shown in HTML
  }
}

// Call load function
loadBlogPosts();
