/* Updates for RUVA Website */

// 1. UPDATE LIVE VIEWER COUNT (in index.html around line 465-470)
// Replace the updateLiveViewers function with:

function updateLiveViewers() {
    const viewers = 8568 + Math.floor(Math.random() * 4091); // 8568 to 12658
    const formatted = viewers.toLocaleString('en-IN');
    document.getElementById('liveViewers').textContent = formatted;
    const viewer2El = document.getElementById('liveViewers2');
    if (viewer2El) viewer2El.textContent = formatted;
}

// 2. UPDATE NOTIFICATION BAR HTML (replace lines 47-66 in index.html)
/*
<div class="sticky-offer-bar overflow-hidden">
    <div class="scrolling-wrapper">
        <div class="scrolling-content">
            <div class="scroll-item">
                <span class="animate-pulse">🔥 FLASH SALE:</span>
                <span class="ml-2">Buy ANY 2 @ ₹999 + Name Jewel @ ₹143[X]!</span>
            </div>
            <div class="scroll-item">
                <span class="live-viewers">
                    <span id="liveViewers">8,568</span> viewing now
                </span>
            </div>
            <div class="scroll-item">
                <i class="far fa-clock mr-1"></i>
                <span>Ends Feb 14</span>
            </div>
            <div class="scroll-item">
                <span>💝 Free Gift Box + Express Delivery</span>
            </div>
            
            <!-- Duplicate for seamless loop -->
            <div class="scroll-item">
                <span class="animate-pulse">🔥 FLASH SALE:</span>
                <span class="ml-2">Buy ANY 2 @ ₹999 + Name Jewel @ ₹143[X]!</span>
            </div>
            <div class="scroll-item">
                <span class="live-viewers">
                    <span id="liveViewers2">8,568</span> viewing now
                </span>
            </div>
            <div class="scroll-item">
                <i class="far fa-clock mr-1"></i>  
                <span>Ends Feb 14</span>
            </div>
            <div class="scroll-item">
                <span>💝 Free Gift Box + Express Delivery</span>
            </div>
        </div>
    </div>
</div>
*/

// 3. MAKE BUTTONS RESPONSIVE - Add to styles.css
/*
@media (max-width: 640px) {
    .cta-button-primary,
    .cta-button-secondary {
        width: 100%;
        padding: 14px 24px;
        font-size: 0.875rem;
    }
    
    .add-to-cart-btn {
        padding: 12px 20px;
        font-size: 0.875rem;
    }
}
*/

// 4. UPDATE PRODUCT IMAGES - Update data.js products array
const productImagePaths = [
    'images/product-heart-pendant.png',
    'images/product-infinity-ring.png',
    'images/product-couple-bracelet.png',
    'images/product-rose-bracelet.png',
    'images/product-crown-ring.png',
    'images/product-heart-pendant.png' // Reuse for other products
];
