const cartSection = document.querySelector('.cart-section');
let cart = JSON.parse(localStorage.getItem('cart') || '{}');

const products = [
    { id: 1, name: 'Bayam Organik Segar', category: 'Sayuran Hijau', labels: ['Fresh'], weight: '200 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran/bayam.png', promo: 'Promo' },
    { id: 2, name: 'Wortel Baby Organik', category: 'Umbi-umbian', labels: ['Fresh'], weight: '250 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/wortel.png', promo: 'Promo' },
    { id: 3, name: 'Brokoli Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '300 gram / pack', price: 22000, originalPrice: 26000, img: './img/product/img sayuran/brokoli.png', promo: 'Promo' },
    { id: 4, name: 'Tomat Cherry Organik', category: 'Sayuran Buah', labels: ['Fresh'], weight: '200 gram / pack', price: 18000, originalPrice: 21000, img: './img/product/img sayuran/tomat.png', promo: 'Promo' },
    { id: 5, name: 'Kentang Organik', category: 'Umbi-umbian', labels: ['Fresh'], weight: '500 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/kentang.png', promo: 'Promo' },
    { id: 6, name: 'Jagung Manis Rebus', category: 'Umbi-umbian', labels: ['Siap Konsumsi'], weight: '200 gram / pack', price: 14000, originalPrice: 16000, img: './img/product/img sayuran/jagung.png', promo: 'Promo'} ,
    { id: 7, name: 'Asparagus', category: 'Sayuran Batang', labels: ['Fresh', 'Siap Masak'], weight: '300 gram / pack', price: 18000, originalPrice: 20000, img: './img/product/img sayuran/asparagus.png', promo: 'Promo' },
    { id: 8, name: 'Sawi Putih Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '250 gram / pack', price: 13000, originalPrice: 16000, img: './img/product/img sayuran/sawi.png', promo: 'Promo' },
    { id: 9, name: 'Cabai Merah Kering', category: 'Sayuran Buah', labels: ['Kering'], weight: '100 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran/cabai.png', promo: 'Promo' },
    { id: 10, name: 'Bawang Merah Kupas', category: 'Herbal', labels: ['Siap Masak'], weight: '150 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/bawang.png', promo: 'Promo' },
    { id: 11, name: 'Jamur Kancing Segar', category: 'Jamur', labels: ['Fresh'], weight: '200 gram / pack', price: 20000, originalPrice: 22000, img: './img/product/img sayuran/jamur.png', promo: 'Promo', isNew: true },
    { id: 12, name: 'Kacang Panjang Organik', category: 'Sayuran Akar', labels: ['Fresh'], weight: '200 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran/kacang.png', promo: 'Promo' },
    { id: 13, name: 'Tauge Segar', category: 'Sayuran Akar', labels: ['Fresh'], weight: '100 gram / pack', price: 8000, originalPrice: 10000, img: './img/product/img sayuran/tauge.png', promo: 'Promo' },
    { id: 14, name: 'Pepaya Muda Olahan', category: 'Sayuran Buah', labels: ['Siap Masak'], weight: '200 gram / pack', price: 14000, originalPrice: 16000, img: './img/product/img sayuran/bundling.jpg', promo: 'Promo' },
    { id: 15, name: 'Kol Putih Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '300 gram / pack', price: 13000, originalPrice: 16000, img: './img/product/img sayuran/kol.png', promo: 'Promo' },
];

function renderCart() {
    cartSection.innerHTML = '';
    const productIds = Object.keys(cart);

    if (productIds.length === 0) {
        cartSection.innerHTML = `<div class="no-item">No Item in your cart</div>`;
        disableCheckout();
        return;
    }

    let totalItems = 0;
    let subtotal = 0;

    for (const productId of productIds) {
        const product = products.find(p => p.id == productId);
        const quantity = cart[productId];
        totalItems += quantity;
        subtotal += product.price * quantity;

        const itemHtml = `
        <div class="cart-item" data-id="${product.id}">
            <div class="item-checkbox">
                <input type="checkbox" checked>
            </div>
            <div class="item-image">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <div class="item-details">
                <a href="#" class="item-title">${product.name}</a>
            </div>
            <div class="item-price">Rp${product.price.toLocaleString('id-ID')}</div>
            <div class="quantity-control">
                <div class="quantity-btn minus"><i class="fas fa-minus"></i></div>
                <input type="text" class="quantity-input" value="${quantity}">
                <div class="quantity-btn plus"><i class="fas fa-plus"></i></div>
            </div>
            <div class="item-actions">
                <span class="delete-item"><i class="fas fa-trash"></i></span>
            </div>
        </div>`;
        cartSection.insertAdjacentHTML('beforeend', itemHtml);
    }

    updateCartSummary();
}

// Quantity & delete functionality
cartSection.addEventListener('click', function(e) {
    const target = e.target;
    const cartItem = target.closest('.cart-item');
    if (!cartItem) return;

    const productId = cartItem.dataset.id;

    if (target.closest('.quantity-btn')) {
        const input = cartItem.querySelector('.quantity-input');
        let value = parseInt(input.value);
        if (target.closest('.plus')) value++;
        if (target.closest('.minus') && value > 1) value--;
        input.value = value;
        cart[productId] = value;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    if (target.closest('.delete-item')) {
        cartItem.classList.add('fade-out');
        setTimeout(() => {
            delete cart[productId];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }, 300);
    }
});

// Select all checkbox
document.getElementById('select-all')?.addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.item-checkbox input');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    updateCartSummary();
});

cartSection.addEventListener('change', function(e) {
    if (e.target.matches('.item-checkbox input')) {
        updateCartSummary();
    }
});

function updateCartSummary() {
    const selectedItems = document.querySelectorAll('.item-checkbox input:checked').length;
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (selectedItems === 0) {
        checkoutBtn.textContent = "No Item selected";
        checkoutBtn.disabled = true;
        document.querySelector('.summary-row span:nth-child(2)').textContent = `Rp0`;
        showNoItemMessage();
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = `Lanjutkan ke Checkout (${selectedItems})`;

        let subtotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const checkbox = item.querySelector('.item-checkbox input');
            if (checkbox.checked) {
                const price = parseInt(item.querySelector('.item-price').textContent.replace(/\D/g,''));
                const quantity = parseInt(item.querySelector('.quantity-input').value);
                subtotal += price * quantity;
            }
        });
        document.querySelector('.summary-row span:nth-child(2)').textContent = `Rp${subtotal.toLocaleString('id-ID')}`;
        hideNoItemMessage();
    }
}

function disableCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.textContent = "No Item in your cart";
    checkoutBtn.disabled = true;
}

function showNoItemMessage() {
    let msg = document.querySelector('.no-item-message');
    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'no-item-message';
        msg.textContent = 'No Item selected';
        cartSection.prepend(msg);
        setTimeout(() => msg.classList.add('show'), 10);
    }
}

function hideNoItemMessage() {
    const msg = document.querySelector('.no-item-message');
    if (msg) {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 300);
    }
}

// Initial render
renderCart();
