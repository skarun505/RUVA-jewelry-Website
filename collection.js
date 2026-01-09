// Collection Page JavaScript

let allProducts = products;
let filteredProducts = products;
let currentSort = 'featured';

document.addEventListener('DOMContentLoaded', function () {

    // Check URL for category parameter
    const urlCategory = getUrlParameter('category');
    if (urlCategory) {
        const categoryRadio = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
        if (categoryRadio) {
            categoryRadio.checked = true;
        }
    }

    // Load products
    renderProducts();

    // Category filter listeners
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', function () {
            applyFilters();
        });
    });

    // Price filter listeners
    document.querySelectorAll('input[name="price"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            applyFilters();
        });
    });

    // Features filter listeners
    document.querySelectorAll('input[name="features"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            applyFilters();
        });
    });

    // Sort change
    const sortBy = document.getElementById('sortBy');
    const mobileSortBy = document.getElementById('mobileSortBy');

    if (sortBy) {
        sortBy.addEventListener('change', function () {
            currentSort = this.value;
            renderProducts();
        });
    }

    if (mobileSortBy) {
        mobileSortBy.addEventListener('change', function () {
            currentSort = this.value;
            renderProducts();
        });
    }

    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function () {
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            document.querySelector('input[name="category"][value="all"]').checked = true;
            applyFilters();
        });
    }

    // Mobile filter toggle (placeholder for future modal)
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    if (mobileFilterBtn) {
        mobileFilterBtn.addEventListener('click', function () {
            alert('Mobile filter modal - To be implemented');
        });
    }
});

// Apply Filters
function applyFilters() {
    let filtered = [...allProducts];

    // Category Filter
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    if (selectedCategory && selectedCategory.value !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory.value);
    }

    // Price Filter
    const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
    if (selectedPrices.length > 0) {
        filtered = filtered.filter(p => {
            return selectedPrices.some(range => {
                if (range === '0-999') return p.price < 999;
                if (range === '1000-1499') return p.price >= 1000 && p.price < 1500;
                if (range === '1500-1999') return p.price >= 1500 && p.price < 2000;
                if (range === '2000') return p.price >= 2000;
                return false;
            });
        });
    }

    // Features Filter
    const selectedFeatures = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value);
    if (selectedFeatures.length > 0) {
        filtered = filtered.filter(p => {
            return selectedFeatures.every(feature => {
                if (feature === 'adjustable') return p.adjustable;
                if (feature === 'featured') return p.featured;
                if (feature === 'instock') return p.inStock;
                return true;
            });
        });
    }

    filteredProducts = filtered;
    renderProducts();
}

// Sort Products
function sortProducts(productsToSort) {
    let sorted = [...productsToSort];

    switch (currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.reverse();
            break;
        case 'featured':
        default:
            sorted.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
            });
            break;
    }

    return sorted;
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countElement = document.getElementById('productCount');

    if (!grid) return;

    const sorted = sortProducts(filteredProducts);

    if (sorted.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                <p class="text-gray-500 mb-6">Try adjusting your filters</p>
                <button onclick="document.getElementById('clearFilters').click()" class="cta-button-primary">
                    Clear Filters
                </button>
            </div>
        `;
        if (countElement) countElement.textContent = '0';
        return;
    }

    grid.innerHTML = sorted.map(product => createProductCard(product)).join('');

    if (countElement) {
        countElement.textContent = sorted.length;
    }

    // Add event listeners
    addProductCardListeners();

    // Animate cards
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}
