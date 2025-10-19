    // ----------------- PRODUCTS DATA -----------------
    const products = [
        { id: 1, name: 'Bayam Organik Segar', category: 'Sayuran Hijau', labels: ['Fresh'], weight: '200 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran/bayam.png', promo: 'Promo' },
        { id: 2, name: 'Wortel Baby Organik', category: 'Umbi-umbian', labels: ['Fresh'], weight: '250 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/wortel.png', promo: 'Promo' },
        { id: 3, name: 'Brokoli Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '300 gram / pack', price: 22000, originalPrice: 26000, img: './img/product/img sayuran/brokoli.png', promo: 'Promo' },
        { id: 4, name: 'Tomat Cherry Organik', category: 'Sayuran Buah', labels: ['Fresh'], weight: '200 gram / pack', price: 18000, originalPrice: 21000, img: './img/product/img sayuran/tomat.png', promo: 'Promo' },
        { id: 5, name: 'Kentang Organik', category: 'Umbi-umbian', labels: ['Fresh'], weight: '500 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/kentang.png', promo: 'Promo' },
        { id: 6, name: 'Jagung Manis Rebus', category: 'Umbi-umbian', labels: ['Siap Konsumsi'], weight: '200 gram / pack', price: 14000, originalPrice: 16000, img: './img/product/img sayuran/jagung.png', promo: 'Promo'} ,
        { id: 7, name: 'Asparagus', category: 'Sayuran Batang', labels: ['Fresh', 'Siap Masak'], weight: '300 gram / pack', price: 18000, originalPrice: 20000, img: '/img/product/img sayuran/asparagus.png', promo: 'Promo' },
        { id: 8, name: 'Sawi Putih Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '250 gram / pack', price: 13000, originalPrice: 16000, img: './img/product/img sayuran/sawi.png', promo: 'Promo' },
        { id: 9, name: 'Cabai Merah Kering', category: 'Sayuran Buah', labels: ['Kering'], weight: '100 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran//cabai.png', promo: 'Promo' },
        { id: 10, name: 'Bawang Merah Kupas', category: 'Herbal', labels: ['Siap Masak'], weight: '150 gram / pack', price: 15000, originalPrice: 18000, img: './img/product/img sayuran/bawang.png', promo: 'Promo' },
        { id: 11, name: 'Jamur Kancing Segar', category: 'Jamur', labels: ['Fresh'], weight: '200 gram / pack', price: 20000, originalPrice: 22000, img: './img/product/img sayuran/jamur.png', promo: 'Promo', isNew: true },
        { id: 12, name: 'Kacang Panjang Organik', category: 'Sayuran Akar', labels: ['Fresh'], weight: '200 gram / pack', price: 12000, originalPrice: 15000, img: './img/product/img sayuran/kacang.png', promo: 'Promo' },
        { id: 13, name: 'Tauge Segar', category: 'Sayuran Akar', labels: ['Fresh'], weight: '100 gram / pack', price: 8000, originalPrice: 10000, img: './img/product/img sayuran/tauge.png', promo: 'Promo' },
        { id: 14, name: 'Pepaya Muda Olahan', category: 'Sayuran Buah', labels: ['Siap Masak'], weight: '200 gram / pack', price: 14000, originalPrice: 16000, img: './img/product/img sayuran/bundling.jpg', promo: 'Promo' },
        { id: 15, name: 'Kol Putih Segar', category: 'Sayuran Bunga', labels: ['Fresh'], weight: '300 gram / pack', price: 13000, originalPrice: 16000, img: './img/product/img sayuran/kol.png', promo: 'Promo' },
    ];



    // ----------------- CART SYSTEM -----------------
    let cart = {};

    function formatPrice(price) {
        return 'Rp' + price.toLocaleString('id-ID');
    }

    function updateCart(productId, change) {
        if (!cart[productId]) cart[productId] = 0;
        cart[productId] += change;
        if (cart[productId] <= 0) delete cart[productId];

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartBadge();
        renderProducts();
    }

    function updateCartBadge() {
        const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        const badge = document.getElementById('cartBadge');
        badge.textContent = total;
        badge.className = total > 0 ? 'cart-badge active' : 'cart-badge';
    }

    // ----------------- FILTERING -----------------
    let activeCategory = 'all';       // default semua kategori
    let activeFilter = 'all';         // default Semua Produk

    function renderProducts() {
        const grid = document.getElementById('productsGrid');

        let filteredProducts = products;

        if (activeCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
        }

        //  Filter berdasarkan filter sidebar
        if (activeFilter === 'Promo') {
            filteredProducts = filteredProducts.filter(p => p.promo && p.promo.toLowerCase() === 'promo');
        } else if (activeFilter === 'Produk Terbaru') {
            filteredProducts = filteredProducts.filter(p => p.isNew);
        } else if (activeFilter === 'Produk Lainnya') {
            filteredProducts = filteredProducts.filter(p => !p.promo && !p.isNew);
        }
        // if 'all' → tampilkan semua yang sudah difilter kategori saja

        //  Render
        if (filteredProducts.length === 0) {
            grid.innerHTML = '<p>Tidak ada produk di filter ini.</p>';
            return;
        }

        grid.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.img}" alt="${product.name}" />
                    <div class="promo-label">${product.promo || ''}</div>
                    ${product.isNew ? '<div class="new-badge">Baru</div>' : ''}
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    ${product.labels.length > 0 ? `
                        <div class="product-labels">
                            ${product.labels.map(label => `<span class="product-label">${label}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="product-weight">${product.weight}</div>
                    <div class="product-price-section">
                        <div class="price-info">
                            <div class="current-price">${formatPrice(product.price)}</div>
                            <div class="original-price">${formatPrice(product.originalPrice)}</div>
                        </div>
                        <div id="cart-${product.id}">
                            ${cart[product.id] ? `
                                <div class="quantity-control">
                                    <button class="qty-btn" onclick="updateCart(${product.id}, -1)">−</button>
                                    <span class="qty-display">${cart[product.id]}</span>
                                    <button class="qty-btn" onclick="updateCart(${product.id}, 1)">+</button>
                                </div>
                            ` : `<button class="add-btn" onclick="updateCart(${product.id}, 1)">+</button>`}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }


    // ----------------- CATEGORY & SUBCATEGORY NAV -----------------
    document.querySelectorAll('.subcategory-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.subcategory-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const text = this.textContent.trim();
            if (text === 'Semua Produk') activeFilter = 'all';
            else if (text === 'Promo') activeFilter = 'Promo';
            else if (text === 'Produk Terbaru') activeFilter = 'Produk Terbaru';
            else if (text === 'Produk Lainnya') activeFilter = 'Produk Lainnya';

            document.querySelector('.subcategory-title').textContent = text;
            renderProducts();
        });
    });


        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', function() {
                document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                activeCategory = this.querySelector('.category-name').textContent;
                renderProducts();
            });
        });


    // ----------------- JUMP TO TOP -----------------
    const jumpBtn = document.getElementById('jumpToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) jumpBtn.classList.add('visible');
        else jumpBtn.classList.remove('visible');
    });

    jumpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart = savedCart;
updateCartBadge();
renderProducts();
