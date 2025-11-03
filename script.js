// script.js

// --- Product Data (Hardcoded - adapted from products.ts) ---
const products = [
    {id: 1, name: "Classic Navy Suit", price: 899, category: "men", sizes: ["S", "M", "L", "XL"], colors: ["Navy", "Charcoal", "Black"], image: "https://images.unsplash.com/photo-1618953989832-f5323bc3c93a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Tailored to perfection...", isNew: true },
    {id: 2, name: "Executive Charcoal Blazer", price: 649, category: "men", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Charcoal", "Navy", "Black"], image: "https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Professional blazer...", onSale: true, salePrice: 499 },
    {id: 3, name: "Premium Business Suit", price: 1099, category: "men", sizes: ["S", "M", "L", "XL"], colors: ["Black", "Navy", "Gray"], image: "https://images.unsplash.com/photo-1618953989832-f5323bc3c93a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "High-quality business suit...", },
    {id: 4, name: "Formal Tuxedo", price: 1499, category: "men", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Black", "Midnight Blue"], image: "https://images.unsplash.com/photo-1648208568747-1d11db081fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Classic tuxedo perfect for weddings...", isNew: true },
    {id: 5, name: "Classic White Dress Shirt", price: 199, category: "men", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Light Blue", "Pink"], image: "https://images.unsplash.com/photo-1758024699178-634329cb7cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Essential dress shirt...", onSale: true, salePrice: 149 },
    {id: 6, name: "Tailored Wool Trousers", price: 399, category: "men", sizes: ["30", "32", "34", "36", "38"], colors: ["Black", "Navy", "Charcoal"], image: "https://images.unsplash.com/photo-1618953989832-f5323bc3c93a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Premium wool trousers...", },
    {id: 11, name: "Elegant Evening Gown", price: 1299, category: "women", sizes: ["XS", "S", "M", "L"], colors: ["Black", "Burgundy", "Navy"], image: "https://images.unsplash.com/photo-1608539091730-04103fc424b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Stunning floor-length gown...", isNew: true },
    {id: 12, name: "Sophisticated Cocktail Dress", price: 799, category: "women", sizes: ["XS", "S", "M", "L"], colors: ["Black", "White", "Red"], image: "https://images.unsplash.com/photo-1729146768776-8356708e907d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Timeless cocktail dress...", onSale: true, salePrice: 599 },
    {id: 13, name: "Designer Evening Dress", price: 1599, category: "women", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Gold", "Silver", "Black"], image: "https://images.unsplash.com/photo-1628009658182-6df033109021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Luxurious designer dress...", },
    {id: 15, name: "Silk Evening Blouse", price: 449, category: "women", sizes: ["XS", "S", "M", "L"], colors: ["Ivory", "Black", "Burgundy"], image: "https://images.unsplash.com/photo-1760551600460-018b52b28045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Elegant silk blouse...", isNew: true },
    {id: 16, name: "Executive Business Suit", price: 1199, category: "women", sizes: ["XS", "S", "M", "L", "XL"], colors: ["Black", "Navy", "Charcoal"], image: "https://images.unsplash.com/photo-1606030495838-34a6e408163e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", description: "Power suit designed for...", onSale: true, salePrice: 899 },
    // Add more products if needed
];

// --- State Simulation ---
let cart = []; // Array to hold { productId, quantity, size, color }
let wishlist = []; // Array to hold product IDs

// --- DOM Elements ---
const pageSections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link-spa');
const navButtons = document.querySelectorAll('.nav-link-spa-btn'); // For buttons acting like links
const cartCountEl = document.getElementById('cart-count');
const wishlistCountEl = document.getElementById('wishlist-count');
const cartContentEl = document.getElementById('cart-content');
const wishlistContentEl = document.getElementById('wishlist-content');
const productDetailContentEl = document.getElementById('product-detail-content');
const shopProductsContainer = document.getElementById('shop-products-container');
const newArrivalsContainer = document.getElementById('new-arrivals-container');
const saleItemsContainer = document.getElementById('sale-items-container');
const shopCategoryTabs = document.getElementById('shopCategoryTabs');
const sortSelect = document.getElementById('sort-select');
const priceRangeShop = document.getElementById('priceRangeShop');
const priceMinDisplay = document.getElementById('price-min-display'); // Assuming you add this span
const priceMaxDisplay = document.getElementById('price-max-display');
const productCountEl = document.getElementById('product-count');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const searchInput = document.getElementById('searchInput');
const searchResultsEl = document.getElementById('searchResults');
const orderTrackingForm = document.getElementById('orderTrackingFormPage');
const trackingResultsEl = document.getElementById('trackingResults');
const orderTrackingFormSpa = document.getElementById('orderTrackingFormSpa');


// --- Helper Functions ---

// Function to show a specific page section and hide others
function showPageSection(targetId) {
    // Remove '#' if present
    const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;

    pageSections.forEach(section => {
        if (section.id === id) {
            section.classList.add('active-section');
            section.style.display = ''; // Make visible
        } else {
            section.classList.remove('active-section');
            section.style.display = 'none'; // Hide
        }
    });

    // Update active state in navbar
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

     // Special handling for Product Detail back button or other context-dependent updates
    const backButton = document.querySelector('#product-detail .back-button');
    if (backButton) {
        // You might store the previous page ID to set the href correctly
        // backButton.setAttribute('href', `#previousPageId`);
    }


    window.scrollTo(0, 0); // Scroll to top
}

// Function to generate Product Card HTML
function createProductCardHTML(product, isDetailPage = false) {
    const isWishlisted = wishlist.includes(product.id);
    const priceHTML = product.onSale ? `
        <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
        <span class="original-price text-muted text-decoration-line-through ms-2">$${product.price.toFixed(2)}</span>
    ` : `$${product.price.toFixed(2)}`;

    const newBadge = product.isNew ? '<span class="badge product-badge-new position-absolute top-0 start-0 m-2">New</span>' : '';
    const saleBadge = product.onSale && !product.isNew ? '<span class="badge product-badge-sale position-absolute top-0 start-0 m-2">Sale</span>' : ''; // Avoid double badges

    // Use placeholder product ID (e.g., 0) for detail link for now
    const detailLink = `#product-detail`;

    return `
    <div class="col">
        <div class="card product-card h-100">
             <a href="${detailLink}" class="product-link nav-link-spa" data-product-id="${product.id}">
                <div class="product-image-container position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    ${newBadge}
                    ${saleBadge}
                     <button class="btn btn-sm btn-light wishlist-icon position-absolute top-0 end-0 m-2 ${isWishlisted ? 'active' : ''}" data-product-id="${product.id}">
                        <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <div class="quick-add-overlay position-absolute bottom-0 start-0 w-100">
                        <button class="btn btn-dark w-100 rounded-0 quick-add-btn" data-product-id="${product.id}">
                            <i class="bi bi-cart me-2"></i>Quick Add
                        </button>
                    </div>
                </div>
             </a>
            <div class="card-body">
                <p class="product-category text-muted text-uppercase small mb-1">${product.category === 'men' ? "Men's Fashion" : "Women's Fashion"}</p>
                <h5 class="card-title product-title">
                     <a href="${detailLink}" class="product-link nav-link-spa" data-product-id="${product.id}">${product.name}</a>
                 </h5>
                <p class="card-text product-price">${priceHTML}</p>
            </div>
        </div>
    </div>
    `;
}

// Function to render products in a container
function renderProducts(container, productList) {
    if (!container) return;
    if (productList.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted py-5">No products found.</div>';
        return;
    }
    container.innerHTML = productList.map(p => createProductCardHTML(p)).join('');
     attachProductCardListeners(container); // Re-attach listeners after rendering
}


// --- Cart Functions ---
function updateCartCount() {
    if (!cartCountEl) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

function renderCart() {
    if (!cartContentEl) return;

    if (cart.length === 0) {
        cartContentEl.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-bag-dash display-1 text-muted"></i>
                <h2 class="mt-3">Your Cart is Empty</h2>
                <p class="text-muted">Looks like you haven't added anything yet.</p>
                <a href="#shop" class="btn btn-dark mt-3 nav-link-spa">Continue Shopping</a>
            </div>`;
        return;
    }

    const itemsHTML = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return ''; // Should not happen if data is consistent
        const itemTotal = (product.onSale ? product.salePrice : product.price) * item.quantity;
        return `
        <div class="d-flex gap-3 border-bottom pb-3 mb-3 cart-item-row" data-product-id="${item.productId}">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img rounded">
            <div class="flex-grow-1">
                <h6 class="mb-1">${product.name}</h6>
                <p class="small text-muted mb-1">Size: ${item.size} | Color: ${item.color}</p>
                <p class="mb-2 fw-bold">$${(product.onSale ? product.salePrice : product.price).toFixed(2)}</p>
                 <div class="d-flex align-items-center">
                    <button class="btn btn-outline-secondary btn-quantity quantity-decrease" data-product-id="${item.productId}">-</button>
                    <span class="mx-2 quantity-display">${item.quantity}</span>
                    <button class="btn btn-outline-secondary btn-quantity quantity-increase" data-product-id="${item.productId}">+</button>
                </div>
            </div>
            <div class="text-end">
                <p class="fw-bold mb-2">$${itemTotal.toFixed(2)}</p>
                <button class="btn btn-sm btn-outline-danger cart-remove-btn" data-product-id="${item.productId}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
        `;
    }).join('');

    const subtotal = cart.reduce((sum, item) => {
         const product = products.find(p => p.id === item.productId);
         return sum + (product.onSale ? product.salePrice : product.price) * item.quantity;
    }, 0);
    const shipping = subtotal > 200 ? 0 : 15; // Example shipping logic
    const tax = subtotal * 0.08; // Example tax
    const total = subtotal + shipping + tax;

    const promoAlertHTML = subtotal < 200 ? `
        <div class="alert alert-warning small promo-alert">
            Add <strong>$${(200 - subtotal).toFixed(2)}</strong> more for FREE shipping!
        </div>` : '';

    cartContentEl.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-8">
                ${itemsHTML}
            </div>
            <div class="col-lg-4">
                <div class="bg-light-gray p-4 rounded cart-summary">
                    <h5 class="mb-3">Order Summary</h5>
                    <div class="d-flex justify-content-between small mb-2"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                    <div class="d-flex justify-content-between small mb-2"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                    <div class="d-flex justify-content-between small mb-3"><span>Tax (Est.)</span><span>$${tax.toFixed(2)}</span></div>
                    <hr>
                    <div class="d-flex justify-content-between fw-bold mb-3"><span>Total</span><span>$${total.toFixed(2)}</span></div>
                    ${promoAlertHTML}
                     <button class="btn btn-dark w-100 mb-2 checkout-btn">Proceed to Checkout</button>
                     <a href="#shop" class="btn btn-outline-secondary w-100 nav-link-spa">Continue Shopping</a>
                    <hr class="my-3">
                    <label for="promoCode" class="form-label small">Promo Code</label>
                    <div class="input-group">
                        <input type="text" id="promoCode" class="form-control form-control-sm" placeholder="Enter code">
                        <button class="btn btn-outline-secondary btn-sm promo-apply-btn">Apply</button>
                    </div>
                </div>
            </div>
        </div>`;

        attachCartListeners(); // Attach listeners for cart buttons
}

function addToCart(productId, quantity = 1, size = 'M', color = 'Default') {
     const product = products.find(p => p.id === productId);
     if (!product) return;

     // Basic implementation: just add to array, doesn't check for existing items yet
     cart.push({ productId, quantity, size, color });
     console.log("Cart:", cart);
     updateCartCount();
     renderCart(); // Re-render cart section
     alert(`${product.name} added to cart! (Simulation)`);
}

function updateCartQuantity(productId, newQuantity) {
     const itemIndex = cart.findIndex(item => item.productId === productId);
     if (itemIndex > -1 && newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
        renderCart();
        updateCartCount();
     } else if (itemIndex > -1 && newQuantity === 0) {
         removeFromCart(productId); // Remove if quantity is zero
     }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
    updateCartCount();
    alert('Item removed from cart (Simulation)');
}


// --- Wishlist Functions ---
function updateWishlistCount() {
    if (!wishlistCountEl) return;
    wishlistCountEl.textContent = wishlist.length;
}

function renderWishlist() {
     if (!wishlistContentEl) return;
     const wishlistProducts = products.filter(p => wishlist.includes(p.id));

      if (wishlistProducts.length === 0) {
         wishlistContentEl.innerHTML = `
            <div class="text-center py-5">
                 <i class="bi bi-heartbreak display-1 text-muted"></i>
                 <h2 class="mt-3">Your Wishlist is Empty</h2>
                 <p class="text-muted">Save your favorite items here.</p>
                 <a href="#shop" class="btn btn-dark mt-3 nav-link-spa">Continue Shopping</a>
             </div>`;
         return;
     }

      const itemsHTML = wishlistProducts.map(product => {
         const priceHTML = product.onSale ? `
             <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
             <span class="original-price text-muted text-decoration-line-through ms-2">$${product.price.toFixed(2)}</span>
         ` : `$${product.price.toFixed(2)}`;

          return `
            <div class="col">
                <div class="card product-card h-100 wishlist-item-card">
                     <a href="#product-detail" class="product-link nav-link-spa" data-product-id="${product.id}">
                        <div class="product-image-container position-relative">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                             <button class="btn btn-sm btn-light wishlist-remove-btn position-absolute top-0 end-0 m-2" data-product-id="${product.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                     </a>
                    <div class="card-body d-flex flex-column">
                        <p class="product-category text-muted text-uppercase small mb-1">${product.category === 'men' ? "Men's Fashion" : "Women's Fashion"}</p>
                        <h5 class="card-title product-title flex-grow-1">
                             <a href="#product-detail" class="product-link nav-link-spa" data-product-id="${product.id}">${product.name}</a>
                         </h5>
                        <p class="card-text product-price mb-3">${priceHTML}</p>
                        <button class="btn btn-dark w-100 btn-sm quick-add-btn mt-auto" data-product-id="${product.id}">
                            <i class="bi bi-cart me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
     }).join('');

      wishlistContentEl.innerHTML = `
        <p class="text-muted small mb-4">${wishlistProducts.length} items saved</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
            ${itemsHTML}
        </div>
        <div class="mt-5 text-center">
            <a href="#shop" class="btn btn-outline-secondary nav-link-spa">Continue Shopping</a>
        </div>`;

      attachWishlistListeners(); // Attach listeners for wishlist buttons
}


function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1); // Remove from wishlist
        alert(`${product.name} removed from wishlist (Simulation)`);
    } else {
        wishlist.push(productId); // Add to wishlist
        alert(`${product.name} added to wishlist (Simulation)`);
    }
    console.log("Wishlist:", wishlist);
    updateWishlistCount();
    renderWishlist(); // Re-render wishlist section
    updateWishlistIcons(); // Update icons on product cards everywhere
}

function updateWishlistIcons() {
    document.querySelectorAll('.wishlist-icon').forEach(button => {
        const productId = parseInt(button.getAttribute('data-product-id'));
        const icon = button.querySelector('i');
        if (icon) {
            if (wishlist.includes(productId)) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                 button.classList.add('active'); // Add active style if needed
                 button.style.color = 'var(--accent-color)';
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                 button.classList.remove('active');
                 button.style.color = ''; // Reset color
            }
        }
    });
}


// --- Shop Page Functions ---
function filterAndSortProducts() {
    const category = shopCategoryTabs.querySelector('.active')?.getAttribute('data-category') || 'all';
    const sortBy = sortSelect.value;
    const maxPrice = parseInt(priceRangeShop.value);

    let filtered = products.filter(p => {
        // Category filter
        if (category === 'all') return true;
        if (category === 'sale') return p.onSale;
        return p.category === category;
    }).filter(p => {
        // Price filter (up to max)
        const price = p.onSale ? p.salePrice : p.price;
        return price <= maxPrice;
    });

    // Sort
    switch (sortBy) {
        case 'price-low':
            filtered.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
            break;
        case 'price-high':
            filtered.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured': // Default/Featured - no specific sort for now, use original order
        default:
             // Keep original order relative to filtering
            break;
    }

    renderProducts(shopProductsContainer, filtered);
    if (productCountEl) {
        productCountEl.textContent = filtered.length;
    }
     updateWishlistIcons(); // Ensure wishlist icons are correct after re-render
}


// --- Product Detail Function ---
function renderProductDetail(productId) {
    if (!productDetailContentEl) return;
    const product = products.find(p => p.id === productId);

    if (!product) {
        productDetailContentEl.innerHTML = '<p class="text-danger">Product not found.</p>';
        return;
    }
     const isWishlisted = wishlist.includes(product.id);
    const priceHTML = product.onSale ? `
        <span class="display-6 sale-price me-2">$${product.salePrice.toFixed(2)}</span>
        <span class="text-muted text-decoration-line-through me-2">$${product.price.toFixed(2)}</span>
        <span class="badge bg-accent text-white">Save $${(product.price - product.salePrice).toFixed(2)}</span>
    ` : `<span class="display-6">$${product.price.toFixed(2)}</span>`;

    const sizesHTML = product.sizes.map((size, index) => `
        <button class="btn size-btn ${index === 0 ? 'active' : ''}" data-value="${size}">${size}</button>
    `).join('');
     const colorsHTML = product.colors.map((color, index) => `
        <button class="btn color-btn ${index === 0 ? 'active' : ''}" data-value="${color}">${color}</button>
    `).join('');

    productDetailContentEl.innerHTML = `
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="product-detail-img-container rounded mb-3 position-relative">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid object-cover w-100 h-100">
                     ${product.isNew ? '<span class="badge product-badge-new position-absolute top-0 start-0 m-3">New</span>' : ''}
                     ${product.onSale ? '<span class="badge product-badge-sale position-absolute top-0 start-0 m-3">Sale</span>' : ''}
                </div>
                </div>
            <div class="col-lg-6">
                 <p class="text-muted text-uppercase small mb-2">${product.category === 'men' ? "Men's Fashion" : "Women's Fashion"}</p>
                 <h1 class="mb-3">${product.name}</h1>
                 <div class="mb-4">${priceHTML}</div>
                 <hr>
                 <p class="text-secondary mb-4">${product.description}</p>

                 <div class="mb-4">
                     <label class="form-label fw-bold">Size</label>
                     <div class="d-flex flex-wrap gap-2" id="sizeSelector">${sizesHTML}</div>
                 </div>
                 <div class="mb-4">
                     <label class="form-label fw-bold">Color</label>
                     <div class="d-flex flex-wrap gap-2" id="colorSelector">${colorsHTML}</div>
                 </div>

                 <div class="mb-4">
                      <label class="form-label fw-bold">Quantity</label>
                      <div class="d-flex align-items-center gap-2 quantity-controls">
                        <button class="btn btn-outline-secondary btn-quantity detail-quantity-decrease">-</button>
                        <span class="mx-2 quantity-display" id="detailQuantity">1</span>
                        <button class="btn btn-outline-secondary btn-quantity detail-quantity-increase">+</button>
                      </div>
                 </div>

                 <div class="d-flex gap-2">
                     <button class="btn btn-dark add-to-cart-btn flex-grow-1 detail-add-to-cart-btn" data-product-id="${product.id}">
                        <i class="bi bi-cart me-2"></i>Add to Cart
                    </button>
                    <button class="btn btn-outline-secondary wishlist-btn ${isWishlisted ? 'active' : ''} detail-wishlist-btn" data-product-id="${product.id}">
                        <i class="bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                 </div>
                 <hr class="my-4">
                 <div class="small space-y-2 product-info-details">
                    <div class="d-flex justify-content-between product-info-row"><span>SKU:</span><span>EW-${String(product.id).padStart(5, '0')}</span></div>
                    <div class="d-flex justify-content-between product-info-row"><span>Category:</span><span>${product.category === 'men' ? "Men's Formal Wear" : "Women's Formal Wear"}</span></div>
                    <div class="d-flex justify-content-between product-info-row"><span>Availability:</span><span class="text-accent">In Stock</span></div>
                 </div>
            </div>
        </div>
         <div class="mt-5">
            <h2 class="section-title mb-4">You May Also Like</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4" id="related-products-container">
                 </div>
         </div>
    `;
     // Load related products
     loadRelatedProducts(product.category, product.id);
     attachDetailListeners(product.id); // Attach listeners specific to detail page
}

function loadRelatedProducts(category, currentProductId) {
    const relatedContainer = document.getElementById('related-products-container');
    if (!relatedContainer) return;
    const related = products.filter(p => p.category === category && p.id !== currentProductId).slice(0, 4);
    renderProducts(relatedContainer, related);
}


// --- Order Tracking Simulation ---
function showTrackingResults(orderNumber, email) {
     if (!trackingResultsEl || !orderTrackingForm) return;

      // Mock data - in real app, fetch this based on orderNumber/email
     const mockResult = {
         orderNumber: orderNumber || 'EW-2025-12345',
         status: 'In Transit',
         estimatedDelivery: 'October 28, 2025',
         items: [
             { name: 'Classic Navy Suit', quantity: 1, image: 'https://images.unsplash.com/photo-1618953989832-f5323bc3c93a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100' } // Small image for display
         ],
         timeline: [
             { status: 'Order Placed', date: 'October 25, 2025', completed: true },
             { status: 'Processing', date: 'October 26, 2025', completed: true },
             { status: 'Shipped', date: 'October 26, 2025', completed: true },
             { status: 'In Transit', date: 'October 27, 2025', completed: true },
             { status: 'Out for Delivery', date: 'October 28, 2025', completed: false },
             { status: 'Delivered', date: 'Expected October 28, 2025', completed: false }
         ]
     };

     // Populate results area
     document.getElementById('resultOrderNumber').textContent = mockResult.orderNumber;
     document.getElementById('resultEstDelivery').textContent = mockResult.estimatedDelivery;
     document.getElementById('resultStatus').textContent = mockResult.status;

     document.getElementById('resultItems').innerHTML = mockResult.items.map(item => `
        <div class="d-flex align-items-center gap-3 small">
            <img src="${item.image}" alt="${item.name}" width="50" class="rounded">
            <div>${item.name} <span class="text-muted">(Qty: ${item.quantity})</span></div>
        </div>
     `).join('');

     document.getElementById('resultTimeline').innerHTML = mockResult.timeline.map((step, index, arr) => `
        <div class="d-flex timeline-step">
            <div class="d-flex flex-column align-items-center me-3">
                 <div class="timeline-icon rounded-circle d-flex align-items-center justify-content-center ${step.completed ? 'bg-accent text-white' : 'bg-secondary text-muted'}">
                     <i class="bi ${step.completed ? 'bi-check-lg' : 'bi-box-seam'}"></i>
                 </div>
                 ${index < arr.length - 1 ? '<div class="timeline-line"></div>' : ''}
            </div>
            <div>
                 <h6 class="mb-0 small ${step.completed ? 'fw-bold' : ''}">${step.status}</h6>
                 <p class="small text-muted mb-0">${step.date}</p>
            </div>
        </div>
     `).join('');


     // Hide form, show results
     orderTrackingForm.closest('.mx-auto > div').style.display = 'none'; // Hide the form container
     if(document.querySelector('#order-tracking img')) { // Hide image if present
          document.querySelector('#order-tracking img').style.display = 'none';
     }
     trackingResultsEl.classList.remove('d-none');
}

// --- Search Simulation ---
function performSearch(query) {
     if (!searchResultsEl) return;
     query = query.trim().toLowerCase();

     if (!query) {
         searchResultsEl.innerHTML = '<p class="text-center text-muted py-5">Start typing to search products...</p>';
         return;
     }

     const results = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
     );

     if (results.length === 0) {
        searchResultsEl.innerHTML = `<p class="text-center text-muted py-5">No products found for "${query}"</p>`;
     } else {
        searchResultsEl.innerHTML = results.map(product => {
            const price = product.onSale ? product.salePrice : product.price;
            return `
            <a href="#product-detail" class="d-flex align-items-center gap-3 p-2 search-result-item nav-link-spa" data-product-id="${product.id}" data-bs-dismiss="modal">
                <img src="${product.image}" alt="${product.name}" width="50" height="50" class="rounded object-cover">
                <div class="flex-grow-1">
                    <h6 class="mb-0 small">${product.name}</h6>
                    <p class="small text-muted mb-0">${product.category === 'men' ? "Men's Fashion" : "Women's Fashion"}</p>
                </div>
                <span class="text-accent small fw-bold">$${price.toFixed(2)}</span>
            </a>
            `;
        }).join('');
         // Re-attach nav listeners for search results
         searchResultsEl.querySelectorAll('.nav-link-spa').forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
     }
}

// --- Event Listeners Setup ---
function attachNavigationListeners() {
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    navButtons.forEach(button => {
         button.addEventListener('click', handleNavButtonClick);
    });

}

function handleNavLinkClick(event) {
     event.preventDefault(); // Prevent default anchor jump
     const targetId = event.currentTarget.getAttribute('href');
     const productId = event.currentTarget.getAttribute('data-product-id');
     const category = event.currentTarget.getAttribute('data-category'); // For category links

     if (productId) {
        renderProductDetail(parseInt(productId));
        showPageSection('#product-detail');
     } else if (targetId) {
        showPageSection(targetId);
        // If navigating to shop from category link, trigger filter
        if (targetId === '#shop' && category && shopCategoryTabs) {
             shopCategoryTabs.querySelectorAll('button').forEach(btn => {
                 btn.classList.toggle('active', btn.getAttribute('data-category') === category);
             });
            filterAndSortProducts(); // Apply filter
        }
     }
}

function handleNavButtonClick(event) {
     const targetId = event.currentTarget.getAttribute('data-target');
     if (targetId) {
          showPageSection(targetId);
           // If it's the order tracking form submission button
          if (event.currentTarget.closest('form')?.id === 'orderTrackingFormSpa') {
               const orderNumEl = document.getElementById('orderNumberSpa');
               const emailEl = document.getElementById('emailSpa'); // Assuming email is needed
               if (orderNumEl && orderNumEl.value) {
                    showTrackingResults(orderNumEl.value, emailEl ? emailEl.value : '');
               }
          }
     }
}

function attachProductCardListeners(container = document) {
     // Quick Add Buttons
     container.querySelectorAll('.quick-add-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent link navigation
            event.stopPropagation(); // Don't trigger card click
            const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });

     // Wishlist Icons on Cards
    container.querySelectorAll('.wishlist-icon').forEach(button => {
         // Remove existing listener to prevent duplicates if re-rendering
         button.replaceWith(button.cloneNode(true));
     });
     // Add new listener
     container.querySelectorAll('.wishlist-icon').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
            toggleWishlist(productId);
            // Visual update handled by updateWishlistIcons() called after toggleWishlist
        });
     });

     // Make product links navigate
      container.querySelectorAll('.product-link.nav-link-spa').forEach(link => {
         link.addEventListener('click', handleNavLinkClick);
     });
}

function attachCartListeners() {
     if (!cartContentEl) return;

     // Remove Item
     cartContentEl.querySelectorAll('.cart-remove-btn').forEach(button => {
         button.addEventListener('click', (event) => {
            const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
            removeFromCart(productId);
        });
    });

     // Decrease Quantity
    cartContentEl.querySelectorAll('.quantity-decrease').forEach(button => {
         button.addEventListener('click', (event) => {
             const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
             const item = cart.find(i => i.productId === productId);
             if (item) {
                 updateCartQuantity(productId, item.quantity - 1);
             }
         });
     });

     // Increase Quantity
     cartContentEl.querySelectorAll('.quantity-increase').forEach(button => {
         button.addEventListener('click', (event) => {
             const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
              const item = cart.find(i => i.productId === productId);
             if (item) {
                 updateCartQuantity(productId, item.quantity + 1);
             }
         });
     });

      // Checkout Button
      const checkoutBtn = cartContentEl.querySelector('.checkout-btn');
      if(checkoutBtn) {
          checkoutBtn.addEventListener('click', () => alert('Proceeding to checkout (Simulation)'));
      }
       // Apply Promo Button
      const promoBtn = cartContentEl.querySelector('.promo-apply-btn');
       if(promoBtn) {
           promoBtn.addEventListener('click', () => alert('Promo code applied! (Simulation - No actual discount)'));
       }
}

function attachWishlistListeners() {
    if (!wishlistContentEl) return;

     // Remove from Wishlist Buttons
    wishlistContentEl.querySelectorAll('.wishlist-remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
             const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
            toggleWishlist(productId); // This removes it
        });
     });

    // Add to Cart Buttons within Wishlist
    wishlistContentEl.querySelectorAll('.quick-add-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.currentTarget.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });

     // Make product links navigate
     wishlistContentEl.querySelectorAll('.product-link.nav-link-spa').forEach(link => {
         link.addEventListener('click', handleNavLinkClick);
     });

}

function attachDetailListeners(productId) {
     if (!productDetailContentEl) return;

     let currentQuantity = 1;
     let selectedSize = productDetailContentEl.querySelector('#sizeSelector .size-btn.active')?.getAttribute('data-value');
     let selectedColor = productDetailContentEl.querySelector('#colorSelector .color-btn.active')?.getAttribute('data-value');

      // Quantity buttons
      const quantityDisplay = productDetailContentEl.querySelector('#detailQuantity');
      productDetailContentEl.querySelector('.detail-quantity-decrease')?.addEventListener('click', () => {
         if (currentQuantity > 1) {
            currentQuantity--;
            if (quantityDisplay) quantityDisplay.textContent = currentQuantity;
         }
      });
      productDetailContentEl.querySelector('.detail-quantity-increase')?.addEventListener('click', () => {
         currentQuantity++;
         if (quantityDisplay) quantityDisplay.textContent = currentQuantity;
      });

      // Size Selector
      productDetailContentEl.querySelectorAll('#sizeSelector .size-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              productDetailContentEl.querySelectorAll('#sizeSelector .size-btn').forEach(b => b.classList.remove('active'));
              e.currentTarget.classList.add('active');
              selectedSize = e.currentTarget.getAttribute('data-value');
          });
      });

      // Color Selector
       productDetailContentEl.querySelectorAll('#colorSelector .color-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
              productDetailContentEl.querySelectorAll('#colorSelector .color-btn').forEach(b => b.classList.remove('active'));
              e.currentTarget.classList.add('active');
              selectedColor = e.currentTarget.getAttribute('data-value');
          });
      });

       // Add to Cart
       productDetailContentEl.querySelector('.detail-add-to-cart-btn')?.addEventListener('click', () => {
           addToCart(productId, currentQuantity, selectedSize, selectedColor);
       });

       // Wishlist
        productDetailContentEl.querySelector('.detail-wishlist-btn')?.addEventListener('click', (e) => {
            toggleWishlist(productId);
             // Update button visual state immediately
             const button = e.currentTarget;
             const icon = button.querySelector('i');
             const isWishlistedNow = wishlist.includes(productId);
             button.classList.toggle('active', isWishlistedNow);
              if (icon) {
                 icon.className = `bi ${isWishlistedNow ? 'bi-heart-fill' : 'bi-heart'}`;
             }

        });
}

function attachShopListeners() {
     // Category Tabs
     if (shopCategoryTabs) {
        shopCategoryTabs.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                 shopCategoryTabs.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                 event.currentTarget.classList.add('active');
                 filterAndSortProducts();
            });
        });
     }
     // Sort Dropdown
     if (sortSelect) {
         sortSelect.addEventListener('change', filterAndSortProducts);
     }
     // Price Range Slider (using max value for simplicity)
     if (priceRangeShop) {
         priceRangeShop.addEventListener('input', (event) => {
             if (priceMaxDisplay) priceMaxDisplay.textContent = event.target.value;
             // Add a small delay (debounce) before filtering if needed for performance
             filterAndSortProducts();
         });
         // Initialize display
          if (priceMaxDisplay) priceMaxDisplay.textContent = priceRangeShop.value;
           if (priceMinDisplay) priceMinDisplay.textContent = priceRangeShop.min; // Assuming min is 0
     }

      // Reset Filters Button
      if (resetFiltersBtn) {
         resetFiltersBtn.addEventListener('click', () => {
              // Reset category to 'all'
              if (shopCategoryTabs) {
                 shopCategoryTabs.querySelectorAll('button').forEach(btn => {
                     btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
                 });
              }
              // Reset sort to 'featured'
              if (sortSelect) sortSelect.value = 'featured';
              // Reset price range
              if (priceRangeShop) priceRangeShop.value = priceRangeShop.max;
              if (priceMaxDisplay) priceMaxDisplay.textContent = priceRangeShop.max;

              // Re-filter
              filterAndSortProducts();
              // Optionally close the filter collapse section
              const filterCollapse = document.getElementById('filterCollapseShop');
              if (filterCollapse && filterCollapse.classList.contains('show')) {
                  var bsCollapse = new bootstrap.Collapse(filterCollapse, {toggle: false});
                  bsCollapse.hide();
              }
         });
      }
}

function attachSearchListeners() {
     if (searchInput) {
          let debounceTimeout;
          searchInput.addEventListener('input', (event) => {
              clearTimeout(debounceTimeout);
              debounceTimeout = setTimeout(() => {
                  performSearch(event.target.value);
              }, 300); // 300ms delay
          });
     }
      // Clear search results when modal is closed (optional)
      const searchModal = document.getElementById('searchModal');
      if (searchModal) {
          searchModal.addEventListener('hidden.bs.modal', function () {
              if (searchInput) searchInput.value = '';
              if (searchResultsEl) searchResultsEl.innerHTML = '<p class="text-center text-muted py-5">Start typing to search products...</p>';
          })
      }
}

function attachFormListeners() {
    // Contact Form Simulation
    const contactFormSpa = document.getElementById('contactFormSpa');
    const successMessageSpa = document.getElementById('formSuccessMessageSpa');
    if (contactFormSpa && successMessageSpa) {
        contactFormSpa.addEventListener('submit', function(event) {
            event.preventDefault();
            successMessageSpa.classList.remove('d-none');
            setTimeout(() => {
                contactFormSpa.reset();
                successMessageSpa.classList.add('d-none');
            }, 3000);
        });
    }

    // Newsletter Form Simulation
     const newsletterForm = document.getElementById('newsletterForm');
     const newsletterSuccess = document.getElementById('newsletterSuccess');
     if (newsletterForm && newsletterSuccess) {
         newsletterForm.addEventListener('submit', function(event) {
             event.preventDefault();
             newsletterForm.classList.add('d-none');
             newsletterSuccess.classList.remove('d-none');
             // Optionally close modal after delay
             setTimeout(() => {
                 const modalElement = document.getElementById('newsletterModal');
                 if (modalElement) {
                     const modalInstance = bootstrap.Modal.getInstance(modalElement);
                      if (modalInstance) {
                         modalInstance.hide();
                          // Reset form state after modal is hidden
                          modalElement.addEventListener('hidden.bs.modal', () => {
                               newsletterForm.reset();
                               newsletterForm.classList.remove('d-none');
                               newsletterSuccess.classList.add('d-none');
                          }, { once: true });
                      }
                 }
             }, 2000);
         });
     }

     // Order Tracking Form (on Contact Page section)
     if (orderTrackingFormSpa) {
          orderTrackingFormSpa.addEventListener('submit', (event) => {
               event.preventDefault(); // Prevent default if not handled by button listener
               const orderNumEl = document.getElementById('orderNumberSpa');
                if (orderNumEl && orderNumEl.value) {
                    showPageSection('#order-tracking'); // Navigate first
                    showTrackingResults(orderNumEl.value, ''); // Then show results
               }
          });
     }

     // Order Tracking Form (on dedicated Order Tracking section)
     if (orderTrackingForm) {
          orderTrackingForm.addEventListener('submit', (event) => {
               event.preventDefault();
               const orderNumEl = document.getElementById('trackOrderNumber');
               const emailEl = document.getElementById('trackEmail');
               if (orderNumEl && emailEl) {
                  showTrackingResults(orderNumEl.value, emailEl.value);
               }
          });

          const trackAnotherBtn = document.getElementById('trackAnotherBtn');
           if (trackAnotherBtn && trackingResultsEl) {
               trackAnotherBtn.addEventListener('click', () => {
                   trackingResultsEl.classList.add('d-none'); // Hide results
                   orderTrackingForm.closest('.mx-auto > div').style.display = ''; // Show form container
                    if (orderTrackingForm) orderTrackingForm.reset(); // Reset form
                    if(document.querySelector('#order-tracking img')) { // Show image
                        document.querySelector('#order-tracking img').style.display = '';
                    }
               });
           }
     }

     // Copy Link Button in Social Modal
      const copyLinkBtn = document.getElementById('copyLinkBtn');
      if (copyLinkBtn) {
          copyLinkBtn.addEventListener('click', () => {
               navigator.clipboard.writeText(window.location.href.split('#')[0]) // Copy base URL
                   .then(() => {
                       const originalText = copyLinkBtn.innerHTML;
                       copyLinkBtn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Copied!';
                       setTimeout(() => { copyLinkBtn.innerHTML = originalText; }, 2000);
                   })
                   .catch(err => console.error('Failed to copy: ', err));
          });
      }
}


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial Page Load
    const initialHash = window.location.hash || '#home';
    showPageSection(initialHash);

    // Load initial products on Home page
    renderProducts(newArrivalsContainer, products.filter(p => p.isNew).slice(0, 4));
    renderProducts(saleItemsContainer, products.filter(p => p.onSale).slice(0, 4));

    // Load initial products on Shop page
    filterAndSortProducts(); // Initial render for shop

    // Initial cart/wishlist rendering
    renderCart();
    renderWishlist();
    updateCartCount();
    updateWishlistCount();

    // Attach all event listeners
    attachNavigationListeners();
    attachProductCardListeners(); // Attach globally first
    attachShopListeners();
    attachSearchListeners();
    attachFormListeners();

    console.log("SPA Simulation Initialized");
});