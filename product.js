// Product Detail Page JavaScript

let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', function () {
    // Get product ID from URL
    const productId = parseInt(getUrlParameter('id'));

    if (!productId) {
        window.location.href = 'collection.html';
        return;
    }

    // Load product
    currentProduct = getProductById(productId);

    if (!currentProduct) {
        window.location.href = 'collection.html';
        return;
    }

    // Render product details
    renderProductDetails();

    // Load related products
    loadRelatedProducts();

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('quantity').value = currentQuantity;
        }
    });

    document.getElementById('increaseQty').addEventListener('click', function () {
        if (currentQuantity < 10) {
            currentQuantity++;
            document.getElementById('quantity').value = currentQuantity;
        }
    });

    document.getElementById('quantity').addEventListener('change', function () {
        let val = parseInt(this.value);
        if (val < 1) val = 1;
        if (val > 10) val = 10;
        currentQuantity = val;
        this.value = val;
    });

    // Add to Cart buttons
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    document.getElementById('mobileAddToCart').addEventListener('click', addToCart);

    // Buy Now buttons
    document.getElementById('buyNowBtn').addEventListener('click', buyNow);
    document.getElementById('mobileBuyNow').addEventListener('click', buyNow);
});

// Render Product Details
function renderProductDetails() {
    // Update page title
    document.getElementById('pageTitle').textContent = `${currentProduct.name} | RUVA`;
    document.title = `${currentProduct.name} | RUVA`;

    // Breadcrumb
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

    // Product Info
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productCategory').textContent = capitalizeFirst(currentProduct.category);
    document.getElementById('productPrice').textContent = formatPrice(currentProduct.price);
    document.getElementById('productOriginalPrice').textContent = formatPrice(currentProduct.originalPrice);
    document.getElementById('productDiscount').textContent = `${currentProduct.discount}% OFF`;
    document.getElementById('productDescription').textContent = currentProduct.description;
    document.getElementById('productMaterial').textContent = currentProduct.material;
    document.getElementById('productAdjustable').textContent = currentProduct.adjustable ? 'Yes' : 'No';

    // Stock status
    const stockElement = document.getElementById('productStock');
    if (currentProduct.inStock) {
        stockElement.innerHTML = '<span class="text-green-600">✓ In Stock</span>';
    } else {
        stockElement.innerHTML = '<span class="text-red-600">✗ Out of Stock</span>';
        document.getElementById('addToCartBtn').disabled = true;
        document.getElementById('buyNowBtn').disabled = true;
        document.getElementById('mobileAddToCart').disabled = true;
        document.getElementById('mobileBuyNow').disabled = true;
    }

    // Images
    renderImages();
}

// Render Images
function renderImages() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailsContainer = document.getElementById('thumbnails');

    // Set main image
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.name;

    // Create thumbnails
    thumbnailsContainer.innerHTML = currentProduct.images.map((img, index) => `
        <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-rose-600' : 'border-transparent'} hover:border-rose-400 transition" onclick="changeMainImage('${img}', this)">
            <img src="${img}" alt="${currentProduct.name}" class="w-full h-full object-cover">
        </div>
    `).join('');
}

// Change Main Image
function changeMainImage(imgSrc, element) {
    document.getElementById('mainImage').src = imgSrc;

    // Update border on thumbnails
    document.querySelectorAll('#thumbnails > div').forEach(thumb => {
        thumb.classList.remove('border-rose-600');
        thumb.classList.add('border-transparent');
    });

    element.classList.remove('border-transparent');
    element.classList.add('border-rose-600');
}

// Add to Cart
function addToCart() {
    if (!currentProduct.inStock) return;

    cart.addItem(currentProduct.id, currentQuantity);

    // Optional: Show added animation
    const btn = document.getElementById('addToCartBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
    btn.classList.add('bg-green-600');

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('bg-green-600');
    }, 1500);
}

// Buy Now
function buyNow() {
    if (!currentProduct.inStock) return;

    // Add to cart and redirect to checkout
    cart.addItem(currentProduct.id, currentQuantity);
    window.location.href = 'cart.html';
}

// Load Related Products
function loadRelatedProducts() {
    const container = document.getElementById('relatedProducts');

    // Get products from same category, exclude current product
    let related = products.filter(p =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id
    );

    // If not enough, add other products
    if (related.length < 4) {
        const others = products.filter(p => p.id !== currentProduct.id);
        related = [...related, ...others];
    }

    // Take first 4
    related = related.slice(0, 4);

    container.innerHTML = related.map(product => createProductCard(product)).join('');

    // Add event listeners
    addProductCardListeners();
}

// Helper function
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
