// ============================================
// RUVA Enhanced Button Interactions
// Particle Effects, Ripples, Click Animations
// ============================================

class ButtonEffects {
    constructor() {
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.addParticleEffect();
        this.addClickAnimations();
    }

    // Ripple Effect on Click
    addRippleEffect() {
        const buttons = document.querySelectorAll('.cta-button-primary, .cta-button-secondary, .add-to-cart-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                ripple.classList.add('btn-ripple');

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Particle Burst Effect
    addParticleEffect() {
        const buttons = document.querySelectorAll('.cta-button-primary, .btn-start-shopping');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                createParticleBurst(e.clientX, e.clientY);
            });
        });
    }

    // Click Scale Animation
    addClickAnimations() {
        const buttons = document.querySelectorAll('button, .cta-button-primary, .cta-button-secondary');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 300);
            });
        });
    }
}

// Create Particle Burst Animation
function createParticleBurst(x, y) {
    const colors = ['#6B2C91', '#D81B60', '#E91E63', '#F8BBD0', '#E1BEE7'];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;

        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        particle.style.animation = 'particle-burst 0.8s ease-out forwards';

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
    }
}

// Add to Cart with Animation
function addToCart(productId, button) {
    // Add loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Success animation
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.classList.add('btn-success');

        // Create particle burst at button location
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createParticleBurst(centerX, centerY);

        // Update cart count
        updateCartCount();

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('btn-success');
            button.disabled = false;
        }, 2000);
    }, 800);
}

// Update Cart Count with Animation
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;

        // Bounce animation
        cartCount.style.animation = 'none';
        setTimeout(() => {
            cartCount.style.animation = 'success-bounce 0.5s ease';
        }, 10);
    }
}

// Magnetic Button Effect (follows mouse on hover)
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.cta-button-primary');

    buttons.forEach(button => {
        button.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    new ButtonEffects();

    // Optional: Add magnetic effect (can be commented out if too much)
    // addMagneticEffect();

    console.log('✨ RUVA Enhanced Button Effects Loaded!');
});

// Expose global functions
window.addToCart = addToCart;
window.createParticleBurst = createParticleBurst;
