// RUVA - Main Application JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {

    // Initialize cart count
    cart.updateCartCount();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Countdown Timer
    initCountdownTimer();

    // Load Featured Products on Homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }

    // Generate Placeholder Images
    generatePlaceholderImages();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                cart.showToast('🎉 Welcome! Check your email for 10% discount code.');
                this.reset();
            }
        });
    });

});

// Countdown Timer Function
function initCountdownTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    // Valentine's Day 2026
    const valentinesDay = new Date('2026-02-14T00:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = valentinesDay - now;

        if (distance < 0) {
            timerElement.innerHTML = 'Valentine Sale Ended';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Load Featured Products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = getFeaturedProducts();
    const productsToShow = featured.slice(0, 8); // Show first 8 featured products

    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    // Add event listeners to product cards
    addProductCardListeners();
}

// Create Product Card HTML
function createProductCard(product) {
    const isWishlisted = wishlist.isInWishlist(product.id);

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-card-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <div class="product-badge">-${product.discount}%</div>
                <button class="product-wishlist wishlist-btn" data-product-id="${product.id}">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart text-rose-600"></i>
                </button>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="product-price-current">${formatPrice(product.price)}</span>
                    <span class="product-price-original">${formatPrice(product.originalPrice)}</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="product-badge-925">
                        <i class="fas fa-certificate"></i> 925 Silver
                    </span>
                    ${product.inStock ? '<span class="text-xs text-green-600 font-medium">✓ In Stock</span>' : '<span class="text-xs text-red-600 font-medium">Out of Stock</span>'}
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-bag"></i>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `;
}

// Add Event Listeners to Product Cards
function addProductCardListeners() {
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            cart.addItem(productId);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            wishlist.toggle(productId);

            const icon = this.querySelector('i');
            if (wishlist.isInWishlist(productId)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                cart.showToast('Added to wishlist ❤️');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                cart.showToast('Removed from wishlist');
            }
        });
    });

    // Product card click (navigate to detail page)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't navigate if clicking on button
            if (e.target.closest('button')) return;

            const productId = this.getAttribute('data-product-id');
            window.location.href = `product.html?id=${productId}`;
        });
    });
}

// Generate Placeholder Images using Canvas
function generatePlaceholderImages() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // If image doesn't have a real source or fails to load, create placeholder
        img.addEventListener('error', function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 400;
            canvas.height = 400;

            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 400, 400);
            gradient.addColorStop(0, '#FADADD');
            gradient.addColorStop(1, '#E63946');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 400);

            // Add RUVA logo text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Playfair Display, serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('RUVA', 200, 180);

            ctx.font = '20px Inter, sans-serif';
            ctx.fillText('925 Silver Jewelry', 200, 220);

            // Add decorative heart
            ctx.font = '60px Arial';
            ctx.fillText('💍', 200, 280);

            this.src = canvas.toDataURL();
        });

        // Trigger error for images that don't exist
        if (!img.complete || img.naturalHeight === 0) {
            img.src = img.src; // Force reload
        }
    });
}

// Apply Coupon Code
function applyCoupon(code) {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);

    if (!coupon) {
        return {
            success: false,
            message: 'Invalid coupon code'
        };
    }

    const cartTotal = cart.getTotal();

    if (cartTotal < coupon.minOrder) {
        return {
            success: false,
            message: `Minimum order of ${formatPrice(coupon.minOrder)} required`
        };
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
        discount = Math.round((cartTotal * coupon.discount) / 100);
    } else if (coupon.type === 'fixed') {
        discount = coupon.discount;
    }

    return {
        success: true,
        message: coupon.description,
        discount: discount,
        type: coupon.type
    };
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Get URL Parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Scroll to Top Button
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'fixed bottom-24 right-6 bg-rose-600 text-white w-12 h-12 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 hidden';
    scrollBtn.id = 'scrollToTop';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Call scroll to top on load
addScrollToTop();

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('shimmer');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Quick View Modal (for future implementation)
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content p-0">
            <button class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 z-10" onclick="this.closest('.modal-overlay').remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="grid md:grid-cols-2 gap-6 p-6">
                <div>
                    <img src="${product.images[0]}" alt="${product.name}" class="w-full rounded-2xl">
                </div>
                <div class="space-y-4">
                    <h2 class="font-playfair text-2xl font-bold">${product.name}</h2>
                    <div class="flex items-center gap-3">
                        <span class="text-3xl font-bold text-rose-600">${formatPrice(product.price)}</span>
                        <span class="text-lg text-gray-400 line-through">${formatPrice(product.originalPrice)}</span>
                        <span class="product-discount">${product.discount}% OFF</span>
                    </div>
                    <p class="text-gray-600">${product.description}</p>
                    <div class="space-y-2">
                        <p class="text-sm"><strong>Material:</strong> ${product.material}</p>
                        <p class="text-sm"><strong>Adjustable:</strong> ${product.adjustable ? 'Yes' : 'No'}</p>
                    </div>
                    <div class="flex gap-3">
                        <button class="flex-1 add-to-cart-btn" onclick="cart.addItem(${product.id}); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                        <button class="px-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition" onclick="window.location.href='product.html?id=${product.id}'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on overlay click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

animateOnScroll();

// Console Easter Egg
console.log('%c💍 RUVA - Made with Love', 'color: #E63946; font-size: 24px; font-weight: bold; font-family: Playfair Display');
console.log('%cElegance that Speaks Love ❤️', 'color: #FADADD; font-size: 16px;');
