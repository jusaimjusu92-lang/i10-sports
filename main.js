document.addEventListener('DOMContentLoaded', () => {
    // --- Initial Products Data ---
    const initialProducts = [
        { id: 1, name: 'Elite Volt Runner', price: 180, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600' },
        { id: 2, name: 'Urban High Top V2', price: 145, img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600' },
        { id: 3, name: 'Carbon Tech Hoodie', price: 85, img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=600' },
        { id: 4, name: 'i10 Signature Joggers', price: 75, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600' }
    ];

    let products = JSON.parse(localStorage.getItem('i10_products')) || initialProducts;

    // --- DOM Elements ---
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const adminToggle = document.getElementById('admin-toggle');

    // --- Render Products ---
    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card reveal active';
            card.innerHTML = `
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            `;
            productList.appendChild(card);
        });
    };

    // --- Global Actions ---
    window.deleteProduct = (id) => {
        products = products.filter(p => p.id !== id);
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem('i10_products', JSON.stringify(products));
        renderProducts();
    };

    // --- Admin Toggle ---
    adminToggle.addEventListener('click', () => {
        const isAdmin = document.body.classList.toggle('admin-mode');
        adminToggle.innerText = isAdmin ? 'Admin Mode On' : 'Admin Mode Off';
        adminToggle.style.backgroundColor = isAdmin ? 'var(--accent-lime)' : 'var(--surface-color)';
        adminToggle.style.color = isAdmin ? 'var(--bg-color)' : 'var(--text-primary)';
    });

    // --- Add Product ---
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('p-img');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newProduct = {
                    id: Date.now(),
                    name: document.getElementById('p-name').value,
                    price: parseFloat(document.getElementById('p-price').value),
                    img: event.target.result // Base64 string
                };
                products.push(newProduct);
                saveAndRender();
                addProductForm.reset();
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) el.classList.add('active');
        });
    };

    // --- Initialize ---
    renderProducts();
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- Navbar Background Change on Scroll ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 0';
            nav.style.background = 'rgba(5, 5, 5, 0.9)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.background = 'rgba(18, 18, 18, 0.7)';
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('i10 Sports - Ready');
});
