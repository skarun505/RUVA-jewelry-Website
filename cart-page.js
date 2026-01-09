// Cart Page JavaScript

let appliedCoupon = null;

document.addEventListener('DOMContentLoaded', function () {
    renderCart();
    loadSuggestedProducts();

    // Apply coupon button
    document.getElementById('applyCouponBtn').addEventListener('click', function () {
        const code = document.getElementById('couponInput').value.trim();
        applyCartCoupon(code);
    });

    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function () {
        if (cart.items.length > 0) {
            window.location.href = 'checkout.html';
        }
    });
});

// Render Cart
function renderCart() {
    const cartItems = cart.items;

    if (cartItems.length === 0) {
        document.getElementById('emptyCart').classList.remove('hidden');
        document.getElementById('cartWithItems').classList.add('hidden');
        return;
    }

    document.getElementById('emptyCart').classList.add('hidden');
    document.getElementById('cartWithItems').classList.remove('hidden');

    // Render cart items
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = cartItems.map(item => createCartItem(item)).join('');

    // Add event listeners for quantity and remove
    addCartItemListeners();

    // Update summary
    updateCartSummary();
}

// Create Cart Item HTML
function createCartItem(item) {
    return `
        <div class="cart-item">
            <div class="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl overflow-hidden">
                <img src="${item.images[0]}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
                <div class="flex justify-between mb-2">
                    <h3 class="font-semibold text-lg line-clamp-2">${item.name}</h3>
                    <button class="remove-item text-gray-400 hover:text-red-600 transition" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-2">${item.material}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button class="decrease-qty px-3 py-1 hover:bg-gray-100 transition" data-id="${item.id}">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <input type="number" value="${item.quantity}" min="1" max="10" class="w-12 text-center border-x-2 border-gray-200 py-1 qty-input" data-id="${item.id}">
                        <button class="increase-qty px-3 py-1 hover:bg-gray-100 transition" data-id="${item.id}">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-gray-900">${formatPrice(item.price * item.quantity)}</p>
                        ${item.originalPrice ? `<p class="text-sm text-gray-400 line-through">${formatPrice(item.originalPrice * item.quantity)}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add Cart Item Event Listeners
function addCartItemListeners() {
    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            cart.removeItem(id);
            renderCart();
        });
    });

    // Decrease quantity
    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.items.find(i => i.id === id);
            if (item && item.quantity > 1) {
                cart.updateQuantity(id, item.quantity - 1);
                renderCart();
            }
        });
    });

    // Increase quantity
    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.items.find(i => i.id === id);
            if (item && item.quantity < 10) {
                cart.updateQuantity(id, item.quantity + 1);
                renderCart();
            }
        });
    });

    // Direct quantity input
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function () {
            const id = parseInt(this.getAttribute('data-id'));
            let qty = parseInt(this.value);
            if (qty < 1) qty = 1;
            if (qty > 10) qty = 10;
            cart.updateQuantity(id, qty);
            renderCart();
        });
    });
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.getTotal();
    let discount = 0;

    // Calculate discount if coupon applied
    if (appliedCoupon) {
        const result = applyCoupon(appliedCoupon);
        if (result.success) {
            discount = result.discount;
        }
    }

    const total = subtotal - discount;

    // Update UI
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('discountAmount').textContent = discount > 0 ? `-${formatPrice(discount)}` : '-₹0';
    document.getElementById('total').textContent = formatPrice(total);
}

// Apply Coupon to Cart
function applyCartCoupon(code) {
    const result = applyCoupon(code);
    const messageEl = document.getElementById('couponMessage');

    if (result.success) {
        appliedCoupon = code;
        messageEl.textContent = `✓ ${result.message}`;
        messageEl.classList.remove('text-red-600');
        messageEl.classList.add('text-green-600');
        messageEl.classList.remove('hidden');

        // Save to localStorage
        localStorage.setItem('applied_coupon', code);

        updateCartSummary();
    } else {
        appliedCoupon = null;
        messageEl.textContent = `✗ ${result.message}`;
        messageEl.classList.remove('text-green-600');
        messageEl.classList.add('text-red-600');
        messageEl.classList.remove('hidden');

        updateCartSummary();
    }
}

// Load Suggested Products
function loadSuggestedProducts() {
    const container = document.getElementById('suggestedProducts');

    // Get 4 random products not in cart
    const cartIds = cart.items.map(item => item.id);
    const available = products.filter(p => !cartIds.includes(p.id) && p.inStock);

    // Shuffle and take 4
    const shuffled = available.sort(() => 0.5 - Math.random());
    const suggested = shuffled.slice(0, 4);

    container.innerHTML = suggested.map(product => createProductCard(product)).join('');

    // Add event listeners
    addProductCardListeners();
}

// Check for saved coupon on load
const savedCoupon = localStorage.getItem('applied_coupon');
if (savedCoupon) {
    document.getElementById('couponInput').value = savedCoupon;
    applyCartCoupon(savedCoupon);
}
