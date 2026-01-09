// Gift Guide Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    loadGiftGuide();
});

function loadGiftGuide() {
    // Gifts Under ₹999
    const under999 = products.filter(p => p.price < 999 && p.inStock);
    renderGiftSection('giftsUnder999', under999.slice(0, 8));

    // Gifts Under ₹1999
    const under1999 = products.filter(p => p.price < 1999 && p.inStock);
    renderGiftSection('giftsUnder1999', under1999.slice(0, 8));

    // Couple Gifts
    const coupleGifts = products.filter(p => p.category === 'couple' && p.inStock);
    renderGiftSection('coupleGifts', coupleGifts);

    // Last Minute Gifts (Featured products - ready for express delivery)
    const lastMinute = products.filter(p => p.featured && p.inStock);
    renderGiftSection('lastMinuteGifts', lastMinute.slice(0, 4));
}

function renderGiftSection(containerId, productsArray) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsArray.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500">More products coming soon!</p>
            </div>
        `;
        return;
    }

    // Special styling for last minute gifts (white cards on colored background)
    const isLastMinute = containerId === 'lastMinuteGifts';

    container.innerHTML = productsArray.map(product => {
        if (isLastMinute) {
            return createLastMinuteCard(product);
        }
        return createProductCard(product);
    }).join('');

    // Add event listeners
    addProductCardListeners();
}

function createLastMinuteCard(product) {
    const isWishlisted = wishlist.isInWishlist(product.id);

    return `
        <div class="product-card bg-white" data-product-id="${product.id}">
            <div class="product-card-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <div class="product-badge bg-green-600">⚡ Express</div>
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
                    <span class="text-xs text-green-600 font-medium">
                        <i class="fas fa-shipping-fast"></i> Arrives by Feb 13
                    </span>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}
