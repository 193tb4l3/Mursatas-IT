// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update active nav link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Hero button scroll
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Animate elements when scrolling
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, #about, #contact, form');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animations
window.addEventListener('load', () => {
  document.querySelectorAll('.card, #about, #contact, form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
  });
  
  // Trigger initial animation
  setTimeout(animateOnScroll, 300);
});

window.addEventListener('scroll', animateOnScroll);

// Form submission with animation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    button.innerHTML = '<span class="spinner"></span>Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      button.innerHTML = '✓ Message Sent!';
      button.style.background = 'linear-gradient(to right, #4ade80, #22c55e)';
      
      // Reset form
      setTimeout(() => {
        this.reset();
        button.innerHTML = 'Send Message';
        button.style.background = 'linear-gradient(to right, var(--primary), var(--accent))';
        button.disabled = false;
        
        // Show confetti
        createConfetti();
      }, 1500);
    }, 2000);
  });
}

// Confetti effect
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '1000';
  document.body.appendChild(confettiContainer);
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.opacity = '0';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    
    confettiContainer.appendChild(confetti);
    
    const animationDuration = Math.random() * 3 + 2;
    
    confetti.animate([
      { 
        opacity: 0,
        top: '-10px',
        transform: 'rotate(0deg) scale(0)'
      },
      { 
        opacity: 1,
        offset: 0.1
      },
      { 
        opacity: 1,
        top: '100vh',
        transform: 'rotate(' + Math.random() * 360 + 'deg) scale(1)'
      },
      { 
        opacity: 0,
        transform: 'scale(0.5)'
      }
    ], {
      duration: animationDuration * 1000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    });
    
    setTimeout(() => {
      confetti.remove();
      if (i === 99) confettiContainer.remove();
    }, animationDuration * 1000);
  }
}

function getRandomColor() {
  const colors = ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#7209b7'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Typewriter effect for hero text
const heroText = document.querySelector('.hero p');
if (heroText) {
  const originalText = heroText.textContent;
  heroText.textContent = '';
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < originalText.length) {
      heroText.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 50);
}

// Add particles to hero section
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 10 + 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 255, 255, ' + Math.random() * 0.7 + ')';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.zIndex = '1';
    
    hero.appendChild(particle);
    
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const duration = Math.random() * 20 + 10;
  const xMovement = Math.random() * 100 - 50;
  const yMovement = Math.random() * 100 - 50;
  
  particle.animate([
    { transform: 'translate(0, 0)' },
    { transform: `translate(${xMovement}px, ${yMovement}px)` }
  ], {
    duration: duration * 1000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
});