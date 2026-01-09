// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutData();
    setupPaymentMethods();
    setupCardFormatting();
    setupPlaceOrder();
});

// Load cart data into checkout
function loadCheckoutData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('orderItems');

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Display order items
    let subtotal = 0;
    orderItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="flex gap-3 pb-4 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                    <p class="text-sm font-bold text-purple-primary">₹${itemTotal.toLocaleString('en-IN')}</p>
                </div>
            </div>
        `;
    }).join('');

    // Calculate totals
    const discount = parseInt(localStorage.getItem('cartDiscount')) || 0;
    const total = subtotal - discount;

    // Update summary
    document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('checkoutDiscount').textContent = discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '₹0';
    document.getElementById('checkoutTotal').textContent = `₹${total.toLocaleString('en-IN')}`;

    // Store total for order
    localStorage.setItem('checkoutTotal', total);
}

// Setup payment method selection
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardForm = document.getElementById('cardPaymentForm');
    const upiForm = document.getElementById('upiPaymentForm');
    const codForm = document.getElementById('codPaymentForm');

    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            // Remove selected class from all
            paymentMethods.forEach(m => m.classList.remove('selected'));

            // Add selected class to clicked
            this.classList.add('selected');

            // Show/hide payment forms
            const selectedMethod = this.dataset.method;
            cardForm.classList.add('hidden');
            upiForm.classList.add('hidden');
            codForm.classList.add('hidden');

            if (selectedMethod === 'card') {
                cardForm.classList.remove('hidden');
            } else if (selectedMethod === 'upi') {
                upiForm.classList.remove('hidden');
            } else if (selectedMethod === 'cod') {
                codForm.classList.remove('hidden');
            }

            // Store selected method
            localStorage.setItem('paymentMethod', selectedMethod);
        });
    });
}

// Setup card number formatting
function setupCardFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');

    // Format card number (XXXX XXXX XXXX XXXX)
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Format expiry date (MM/YY)
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV - numbers only
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Setup place order button
function setupPlaceOrder() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    placeOrderBtn.addEventListener('click', function () {
        if (validateCheckoutForm()) {
            processPayment();
        }
    });
}

// Validate checkout form
function validateCheckoutForm() {
    // Delivery information
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();

    if (!fullName || !phone || !email || !address || !city || !state || !pincode) {
        alert('Please fill in all required delivery information fields');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Phone validation (basic)
    if (phone.length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }

    // PIN code validation
    if (pincode.length !== 6) {
        alert('Please enter a valid 6-digit PIN code');
        return false;
    }

    // Payment method validation
    const paymentMethod = localStorage.getItem('paymentMethod') || 'card';

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardholderName = document.getElementById('cardholderName').value.trim();

        if (!cardNumber || cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }

        if (!expiryDate || expiryDate.length !== 5) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }

        if (!cvv || cvv.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return false;
        }

        if (!cardholderName) {
            alert('Please enter the cardholder name');
            return false;
        }
    } else if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value.trim();
        if (!upiId || !upiId.includes('@')) {
            alert('Please enter a valid UPI ID');
            return false;
        }
    }

    return true;
}

// Process dummy payment
function processPayment() {
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const paymentMethod = localStorage.getItem('paymentMethod') || 'card';

    // Disable button and show loading
    placeOrderBtn.disabled = true;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing Payment...';

    // Simulate payment processing
    setTimeout(() => {
        // Generate order ID
        const orderId = 'RUVA' + Date.now().toString().slice(-8);

        // Store order details
        const orderDetails = {
            orderId: orderId,
            date: new Date().toISOString(),
            customer: {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: {
                    street: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    pincode: document.getElementById('pincode').value
                }
            },
            items: JSON.parse(localStorage.getItem('cart')) || [],
            total: localStorage.getItem('checkoutTotal'),
            paymentMethod: paymentMethod,
            status: 'confirmed'
        };

        // Save order to localStorage (in real app, this would go to backend)
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.removeItem('cart');
        localStorage.removeItem('cartDiscount');
        localStorage.setItem('cartCount', '0');

        // Show success modal
        showSuccessModal(orderId);

        // Reset button
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Place Order Securely';

    }, 2000); // 2 second delay to simulate payment processing
}

// Show success modal
function showSuccessModal(orderId) {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('successModalContent');
    const orderIdSpan = document.getElementById('orderId');

    orderIdSpan.textContent = orderId;
    modal.classList.remove('hidden');

    // Animate modal
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 100);

    // Confetti effect (optional - can add a library for this)
    // For now, just show the modal
}

// Auto-fill form for testing (remove in production)
function autoFillTestData() {
    document.getElementById('fullName').value = 'Arun Kumar';
    document.getElementById('phone').value = '+91 98765 43210';
    document.getElementById('email').value = 'arun@example.com';
    document.getElementById('address').value = '123 Love Street, Apartment 4B';
    document.getElementById('city').value = 'Mumbai';
    document.getElementById('state').value = 'Maharashtra';
    document.getElementById('pincode').value = '400001';
    document.getElementById('cardNumber').value = '4532 1234 5678 9010';
    document.getElementById('expiryDate').value = '12/25';
    document.getElementById('cvv').value = '123';
    document.getElementById('cardholderName').value = 'ARUN KUMAR';
}

// Uncomment to enable auto-fill for testing
// setTimeout(autoFillTestData, 500);
