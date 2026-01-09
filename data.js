// RUVA - Product Database (Demo)

const products = [
    {
        id: 1,
        name: "Eternal Love Heart Pendant",
        category: "necklaces",
        price: 1299,
        originalPrice: 1732,
        discount: 25,
        images: ["Images/product-heart-pendant.png", "Images/product-heart-pendant.png"],
        description: "A timeless heart-shaped pendant that speaks volumes. Perfect for expressing your deepest emotions this Valentine's Day.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        stock: 7,
        featured: true,
        tags: ["valentine", "bestseller", "gift"]
    },
    {
        id: 2,
        name: "Infinity Promise Ring",
        category: "rings",
        price: 899,
        originalPrice: 1199,
        discount: 25,
        images: ["Images/product-infinity-ring.png", "Images/product-infinity-ring.png"],
        description: "Symbolizing endless love, this elegant infinity ring is a perfect promise of forever.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: true,
        tags: ["valentine", "rings", "promise"]
    },
    {
        id: 3,
        name: "Rose Charm Bracelet",
        category: "bracelets",
        price: 1099,
        originalPrice: 1465,
        discount: 25,
        images: ["Images/product-rose-bracelet.png", "Images/product-rose-bracelet.png"],
        description: "Delicate rose charms dancing on pure silver. A romantic gesture she'll cherish forever.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: true,
        tags: ["valentine", "bracelets", "romantic"]
    },
    {
        id: 4,
        name: "Couple's Matching Rings Set",
        category: "couple",
        price: 1799,
        originalPrice: 2399,
        discount: 25,
        images: ["Images/couple-rings-1.jpg", "Images/couple-rings-2.jpg"],
        description: "Two souls, one love. Matching rings that celebrate your bond.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: true,
        tags: ["valentine", "couple", "bestseller"]
    },
    {
        id: 5,
        name: "Minimalist Moon Necklace",
        category: "minimal",
        price: 749,
        originalPrice: 999,
        discount: 25,
        images: ["Images/necklace-moon-1.jpg", "Images/necklace-moon-2.jpg"],
        description: "Simple yet stunning. Perfect for everyday elegance.",
        material: "925 Sterling Silver",
        adjustable: false,
        inStock: true,
        featured: false,
        tags: ["minimal", "daily-wear"]
    },
    {
        id: 6,
        name: "Crystal Heart Stud Earrings",
        category: "necklaces",
        price: 649,
        originalPrice: 865,
        discount: 25,
        images: ["Images/earrings-crystal-1.jpg", "Images/earrings-crystal-2.jpg"],
        description: "Sparkle with love. Tiny hearts with maximum charm.",
        material: "925 Sterling Silver with Cubic Zirconia",
        adjustable: false,
        inStock: true,
        featured: true,
        tags: ["valentine", "earrings", "sparkle"]
    },
    {
        id: 7,
        name: "Love Letter Initial Pendant",
        category: "necklaces",
        price: 999,
        originalPrice: 1332,
        discount: 25,
        images: ["Images/pendant-initial-1.jpg", "Images/pendant-initial-2.jpg"],
        description: "Personalize your love with her initial. A thoughtful gift she'll treasure.",
        material: "925 Sterling Silver",
        adjustable: false,
        inStock: true,
        featured: false,
        tags: ["personalized", "necklaces"]
    },
    {
        id: 8,
        name: "Couple's Bracelet Set",
        category: "couple",
        price: 1599,
        originalPrice: 2132,
        discount: 25,
        images: ["Images/couple-bracelet-1.jpg", "Images/couple-bracelet-2.jpg"],
        description: "Connected hearts, connected wrists. Magnetic couple bracelets.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["couple", "bracelets", "magnetic"]
    },
    {
        id: 9,
        name: "Butterfly Dream Ring",
        category: "rings",
        price: 849,
        originalPrice: 1132,
        discount: 25,
        images: ["Images/ring-butterfly-1.jpg", "Images/ring-butterfly-2.jpg"],
        description: "Let your love take flight with this delicate butterfly ring.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["rings", "nature"]
    },
    {
        id: 10,
        name: "Layered Chain Necklace",
        category: "minimal",
        price: 1199,
        originalPrice: 1599,
        discount: 25,
        images: ["Images/necklace-layered-1.jpg", "Images/necklace-layered-2.jpg"],
        description: "Three-layer elegance. Minimal yet statement-making.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["minimal", "trendy"]
    },
    {
        id: 11,
        name: "Crown Princess Ring",
        category: "rings",
        price: 1299,
        originalPrice: 1732,
        discount: 25,
        images: ["Images/ring-crown-1.jpg", "Images/ring-crown-2.jpg"],
        description: "Treat her like royalty. A crown fit for your queen.",
        material: "925 Sterling Silver with Cubic Zirconia",
        adjustable: true,
        inStock: true,
        featured: true,
        tags: ["valentine", "rings", "luxury"]
    },
    {
        id: 12,
        name: "Charm Anklet",
        category: "bracelets",
        price: 749,
        originalPrice: 999,
        discount: 25,
        images: ["Images/anklet-charm-1.jpg", "Images/anklet-charm-2.jpg"],
        description: "Beach vibes meets elegance. Perfect for summers and special moments.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["bracelets", "summer"]
    },
    {
        id: 13,
        name: "Lock & Key Couple Set",
        category: "couple",
        price: 1899,
        originalPrice: 2532,
        discount: 25,
        images: ["Images/couple-lockkey-1.jpg", "Images/couple-lockkey-2.jpg"],
        description: "You hold the key to my heart. Romantic lock & key necklace set.",
        material: "925 Sterling Silver",
        adjustable: false,
        inStock: true,
        featured: true,
        tags: ["valentine", "couple", "romantic"]
    },
    {
        id: 14,
        name: "Star Constellation Bracelet",
        category: "bracelets",
        price: 899,
        originalPrice: 1199,
        discount: 25,
        images: ["Images/bracelet-star-1.jpg", "Images/bracelet-star-2.jpg"],
        description: "Written in the stars. Your love story in silver.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["bracelets", "celestial"]
    },
    {
        id: 15,
        name: "Minimalist Bar Necklace",
        category: "minimal",
        price: 799,
        originalPrice: 1065,
        discount: 25,
        images: ["Images/necklace-bar-1.jpg", "Images/necklace-bar-2.jpg"],
        description: "Sleek, modern, and versatile. Perfect for daily wear.",
        material: "925 Sterling Silver",
        adjustable: false,
        inStock: true,
        featured: false,
        tags: ["minimal", "daily-wear"]
    },
    {
        id: 16,
        name: "Twisted Love Band Ring",
        category: "rings",
        price: 949,
        originalPrice: 1265,
        discount: 25,
        images: ["Images/ring-twisted-1.jpg", "Images/ring-twisted-2.jpg"],
        description: "Love intertwined. A beautiful twisted band design.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["rings", "elegant"]
    },
    {
        id: 17,
        name: "Angel Wings Pendant",
        category: "necklaces",
        price: 1149,
        originalPrice: 1532,
        discount: 25,
        images: ["Images/pendant-angel-1.jpg", "Images/pendant-angel-2.jpg"],
        description: "Your guardian angel. Delicate wings to protect your love.",
        material: "925 Sterling Silver",
        adjustable: false,
        inStock: true,
        featured: false,
        tags: ["necklaces", "spiritual"]
    },
    {
        id: 18,
        name: "Chain Layering Set",
        category: "minimal",
        price: 1399,
        originalPrice: 1865,
        discount: 25,
        images: ["Images/necklace-layering-1.jpg", "Images/necklace-layering-2.jpg"],
        description: "Four chains, endless possibilities. Mix and match your style.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["minimal", "versatile"]
    },
    {
        id: 19,
        name: "Couple's Name Bracelet",
        category: "couple",
        price: 1699,
        originalPrice: 2265,
        discount: 25,
        images: ["Images/couple-name-1.jpg", "Images/couple-name-2.jpg"],
        description: "Wear each other's names. Customizable couple bracelets.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["couple", "personalized"]
    },
    {
        id: 20,
        name: "Flower Garden Ring",
        category: "rings",
        price: 1199,
        originalPrice: 1599,
        discount: 25,
        images: ["Images/ring-flower-1.jpg", "Images/ring-flower-2.jpg"],
        description: "Blooming with love. A garden of silver flowers on your finger.",
        material: "925 Sterling Silver",
        adjustable: true,
        inStock: true,
        featured: false,
        tags: ["rings", "nature", "romantic"]
    }
];

// Coupon Codes
const coupons = [
    {
        code: "VALLOVE25",
        discount: 25,
        type: "percentage",
        description: "Valentine Special - 25% OFF",
        minOrder: 0,
        active: true
    },
    {
        code: "FIRST10",
        discount: 10,
        type: "percentage",
        description: "First Order - Extra 10% OFF",
        minOrder: 0,
        active: true
    },
    {
        code: "FREESHIP",
        discount: 0,
        type: "freeship",
        description: "Free Shipping on all orders",
        minOrder: 999,
        active: true
    }
];

// Sample Reviews
const reviews = [
    {
        productId: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "Absolutely beautiful! My girlfriend loved it. Pure 925 silver, great quality.",
        date: "2026-01-05",
        verified: true
    },
    {
        productId: 2,
        name: "Rahul Verma",
        rating: 5,
        comment: "Perfect promise ring. She said yes! Highly recommended.",
        date: "2026-01-03",
        verified: true
    },
    {
        productId: 4,
        name: "Anjali & Rohan",
        rating: 5,
        comment: "Matching couple rings are stunning. Worth every penny!",
        date: "2026-01-01",
        verified: true
    }
];

// Gift Guide Categories
const giftGuide = {
    under999: products.filter(p => p.price < 999),
    under1999: products.filter(p => p.price < 1999),
    coupleGifts: products.filter(p => p.category === 'couple'),
    lastMinute: products.filter(p => p.featured)
};

// Cart Management (LocalStorage)
class Cart {
    constructor() {
        this.items = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('ruva_cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('ruva_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.showToast(`${product.name} added to cart!`);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    updateCartCount() {
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            const count = this.getItemCount();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Get total cart items
        const totalItems = this.getItemCount();

        // Create new enhanced toast
        const toast = document.createElement('div');
        toast.className = 'toast-enhanced';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">
                    <i class="fas fa-check-circle text-2xl"></i>
                </div>
                <div class="toast-message">
                    <div class="toast-title">✓ ${totalItems} Item${totalItems > 1 ? 's' : ''} Added!</div>
                    <div class="toast-subtitle">${message}</div>
                </div>
            </div>
            <div class="toast-actions">
                <button onclick="window.location.href='cart.html'" class="toast-btn-primary">
                    <i class="fas fa-shopping-cart mr-1"></i> Complete Order
                </button>
                <button onclick="this.closest('.toast-enhanced').remove()" class="toast-btn-secondary">
                    Continue Shopping
                </button>
            </div>
        `;
        document.body.appendChild(toast);

        // Auto-remove after 8 seconds (longer to allow user to click)
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'toastSlideOut 0.4s ease-out forwards';
                setTimeout(() => toast.remove(), 400);
            }
        }, 8000);
    }
}

// Wishlist Management
class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        const saved = localStorage.getItem('ruva_wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('ruva_wishlist', JSON.stringify(this.items));
    }

    toggle(productId) {
        const index = this.items.indexOf(productId);
        if (index > -1) {
            this.items.splice(index, 1);
        } else {
            this.items.push(productId);
        }
        this.saveWishlist();
    }

    isInWishlist(productId) {
        return this.items.includes(productId);
    }
}

// Initialize
const cart = new Cart();
const wishlist = new Wishlist();

// Helper Functions
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
}

function getFeaturedProducts() {
    return products.filter(p => p.featured);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, coupons, reviews, giftGuide, Cart, Wishlist };
}
