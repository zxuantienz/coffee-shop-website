// 1. DATABASE GIẢ LẬP
const products = [
    { id: '1', name: 'Cà Phê Sữa Đá', price: 45000, category: 'coffee', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', desc: 'Hương vị cà phê Robusta đậm đà hòa quyện cùng sữa đặc truyền thống.', type: 'drink' },
    { id: '2', name: 'Trà Đào Cam Sả', price: 55000, category: 'tea', img: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80', desc: 'Thanh mát vị trà, thơm hương đào và sả tươi.', type: 'drink' },
    { id: '3', name: 'Bánh Croissant Bơ Tỏi', price: 35000, category: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', desc: 'Bánh sừng trâu giòn rụm, thơm lừng bơ tỏi.', type: 'food' }
];

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // 2. TOGGLE MENU MOBILE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 3. XỬ LÝ TRANG CHI TIẾT SẢN PHẨM (product-detail.html)
    const detailContainer = document.querySelector('.product-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || '1'; 
        const product = products.find(p => p.id === productId);

        if (!product) {
            document.querySelector('.product-info').innerHTML = `
                <h1 style="color: red;">Không tìm thấy sản phẩm!</h1>
                <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <button onclick="javascript:history.back()" class="btn-primary" style="margin-top: 15px;">Quay lại</button>
            `;
            document.querySelector('.product-image').style.display = 'none';
        } else {
            document.getElementById('detail-img').src = product.img;
            document.getElementById('detail-name').textContent = product.name;
            document.getElementById('detail-price').textContent = product.price.toLocaleString() + ' VNĐ';
            document.getElementById('detail-desc').textContent = product.desc;
            document.getElementById('add-to-cart-form').setAttribute('data-id', product.id);

            if (product.type === 'food') {
                document.querySelectorAll('.drink-only-option').forEach(opt => opt.style.display = 'none');
            }
        }
    }

    // 4. LỌC DANH MỤC Ở THỰC ĐƠN
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.menu-product-card');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. NÚT TĂNG GIẢM SỐ LƯỢNG (Chỉ dùng cho Trang Chi Tiết Món)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-minus') && !e.target.classList.contains('cart-qty-btn')) {
            const input = e.target.nextElementSibling;
            if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
        }
        if (e.target.classList.contains('btn-plus') && !e.target.classList.contains('cart-qty-btn')) {
            const input = e.target.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        }
    });

    // 6. THÊM VÀO GIỎ HÀNG (Logic Topping, Đường, Size & Gộp Món)
    const detailForm = document.getElementById('add-to-cart-form');
    if (detailForm) {
        detailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pId = detailForm.getAttribute('data-id');
            const product = products.find(p => p.id === pId);
            const qty = parseInt(detailForm.querySelector('input[name="quantity"]').value);
            
            let size = '';
            let sugar = '';
            let toppings = [];
            let extraPrice = 0;

            if (product.type === 'drink') {
                size = document.querySelector('input[name="size"]:checked').value;
                sugar = document.querySelector('input[name="sugar"]:checked').value;
                
                extraPrice += (size === 'M' ? 10000 : (size === 'L' ? 15000 : 0));

                document.querySelectorAll('input[name="topping"]:checked').forEach(cb => {
                    let label = cb.nextElementSibling.textContent.split(' +')[0];
                    toppings.push(label);
                    extraPrice += (cb.value === 'tranchau' ? 10000 : (cb.value === 'kem' ? 15000 : 0));
                });
            }
            
            const cartItem = {
                productId: product.id,
                name: product.name,
                img: product.img,
                qty: qty,
                size: size,
                sugar: sugar,
                toppings: toppings,
                price: product.price + extraPrice
            };

            let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
            
            let existingIndex = cart.findIndex(item => 
                item.productId === cartItem.productId && 
                item.size === cartItem.size && 
                item.sugar === cartItem.sugar && 
                JSON.stringify(item.toppings) === JSON.stringify(cartItem.toppings)
            );

            if (existingIndex !== -1) {
                cart[existingIndex].qty += cartItem.qty; 
            } else {
                cart.push(cartItem); 
            }

            localStorage.setItem('qt_cart', JSON.stringify(cart));
            updateCartBadge();
            showToast(`Đã thêm ${qty} ${product.name} vào giỏ!`);
        });
    }

    // Nút mua nhanh ở trang ngoài
    document.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pId = btn.getAttribute('data-id');
            const product = products.find(p => p.id === pId);
            let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];

            const quickSize = product.type === 'drink' ? 'S' : '';
            const quickSugar = product.type === 'drink' ? '100' : '';

            let existingIndex = cart.findIndex(item =>
                item.productId === product.id &&
                item.size === quickSize &&
                item.sugar === quickSugar &&
                (!item.toppings || item.toppings.length === 0)
            );
            if(existingIndex !== -1) {
                cart[existingIndex].qty += 1;
            } else {
                cart.push({ productId: product.id, name: product.name, img: product.img, qty: 1, size: quickSize, sugar: quickSugar, toppings: [], price: product.price });
            }
            
            localStorage.setItem('qt_cart', JSON.stringify(cart));
            updateCartBadge();
            showToast(`Đã thêm ${product.name} vào giỏ!`);
        });
    });

    // 7. RENDER GIỎ HÀNG THỰC SỰ
    renderCartPage();

    // 8. RENDER THANH TOÁN (checkout.html)
    const checkoutSummary = document.getElementById('checkout-summary-items');
    if (checkoutSummary) {
        let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
        let total = 0;
        checkoutSummary.innerHTML = '';
        
        cart.forEach(item => {
            total += (item.price * item.qty);
            checkoutSummary.innerHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.95rem;">
                    <span>${item.qty}x ${item.name} ${item.size ? '('+item.size+')' : ''}</span>
                    <strong>${(item.price * item.qty).toLocaleString()}đ</strong>
                </div>
            `;
        });
        
        const shipping = cart.length > 0 ? 15000 : 0;
        document.getElementById('checkout-subtotal').textContent = total.toLocaleString() + 'đ';
        document.getElementById('checkout-shipping').textContent = shipping.toLocaleString() + 'đ';
        document.getElementById('checkout-final-total').textContent = (total + shipping).toLocaleString() + ' VNĐ';

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(cart.length === 0) return alert('Giỏ hàng trống!');
            
            const orderId = '#QT' + Math.floor(1000 + Math.random() * 9000);
            const now = new Date();
            const dateStr = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}`;

            const newOrder = {
                id: orderId,
                date: dateStr,
                items: cart,
                total: total + shipping,
                status: 'Đang pha chế'
            };

            let orders = JSON.parse(localStorage.getItem('qt_orders')) || [];
            orders.unshift(newOrder);
            localStorage.setItem('qt_orders', JSON.stringify(orders));
            
            localStorage.setItem('qt_last_order', orderId); 
            localStorage.removeItem('qt_cart'); 
            
            // SỬA THÀNH ĐƯỜNG DẪN TƯƠNG ĐỐI ĐỂ KHÔNG BỊ LỖI TRÊN NETLIFY
            window.location.href = 'success.html';
        });
    }

    // 9. TRANG THÀNH CÔNG (success.html)
    const orderCodeElement = document.getElementById('success-order-code');
    if (orderCodeElement) {
        const lastOrder = localStorage.getItem('qt_last_order') || '#QT0000';
        orderCodeElement.textContent = 'Mã đơn hàng: ' + lastOrder;
    }

    // 10. RENDER LỊCH SỬ ĐƠN HÀNG (history.html)
    const historyContainer = document.getElementById('order-history-container');
    if (historyContainer) {
        let orders = JSON.parse(localStorage.getItem('qt_orders')) || [];
        historyContainer.innerHTML = '';

        if (orders.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; color: #888;">Bạn chưa có đơn hàng nào.</p>';
        } else {
            orders.forEach(order => {
                let itemsHTML = '';
                order.items.forEach(item => {
                    let optText = [];
                    if(item.size) optText.push(item.size);
                    if(item.sugar) optText.push(`${item.sugar}% Đường`);
                    if(item.toppings && item.toppings.length > 0) optText.push(item.toppings.join(', '));
                    let optString = optText.length > 0 ? ` (${optText.join(' - ')})` : '';

                    itemsHTML += `<li><span>${item.qty}x ${item.name} <span style="font-size:0.8rem; color:#888;">${optString}</span></span> <span>${(item.price * item.qty).toLocaleString()}đ</span></li>`;
                });

                itemsHTML += `<li><span>Phí vận chuyển</span> <span>15.000đ</span></li>`;

                historyContainer.innerHTML += `
                    <div class="order-card">
                        <div class="order-header">
                            <div>
                                <strong>Mã đơn: ${order.id}</strong>
                                <p style="font-size: 0.9rem; color: #888;">${order.date}</p>
                            </div>
                            <div class="order-status">${order.status}</div>
                        </div>
                        <ul class="order-items">
                            ${itemsHTML}
                        </ul>
                        <div class="order-total">Tổng tiền: ${order.total.toLocaleString()} VNĐ</div>
                    </div>
                `;
            });
        }
    }

    // ==========================================================
    // 11. XỬ LÝ FORM LIÊN HỆ (Không chuyển trang, hiện Toast)
    // ==========================================================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            showToast('Cảm ơn bạn! Chúng tôi đã ghi nhận góp ý và sẽ phản hồi sớm.');
            contactForm.reset(); 
        });
    }

    // ==========================================================
    // 12. GIẢ LẬP ĐĂNG NHẬP / ĐĂNG KÝ / ĐĂNG XUẤT (Session)
    // ==========================================================
    const registerForm = document.querySelector('.auth-box form[action*="login.html"]');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Đăng ký thành công! Đang chuyển đến Đăng nhập...');
            setTimeout(() => { window.location.href = 'login.html'; }, 1500); 
        });
    }

    const loginForm = document.querySelector('.auth-box form[action*="profile.html"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('phone') ? document.getElementById('phone').value : 'User';
            localStorage.setItem('qt_user', JSON.stringify({ isLoggedIn: true, phone: phoneInput }));
            showToast('Đăng nhập thành công!');
            setTimeout(() => { window.location.href = 'profile.html'; }, 1500);
        });
    }

    // Đồng bộ Header Navigation dựa trên trạng thái Đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('qt_user'));
    const navLists = document.querySelectorAll('.nav-links');
    const isAtRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    
    navLists.forEach(ul => {
        const lastLi = ul.lastElementChild;
        if (currentUser && currentUser.isLoggedIn) {
            const profileLink = isAtRoot ? './pages/auth/profile.html' : '../../pages/auth/profile.html';
            lastLi.innerHTML = `<a href="${profileLink}" style="color: var(--accent-color);">Hồ sơ</a>`;
            
            if (!ul.querySelector('.logout-btn')) {
                const logoutLi = document.createElement('li');
                logoutLi.innerHTML = `<a href="#" class="logout-btn">Đăng xuất</a>`;
                ul.appendChild(logoutLi);
            }
        }
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('logout-btn')) {
            e.preventDefault();
            localStorage.removeItem('qt_user'); 
            showToast('Đã đăng xuất tài khoản!');
            const homeLink = isAtRoot ? './index.html' : '../../index.html';
            setTimeout(() => { window.location.href = homeLink; }, 1500);
        }
    });
});

/* ==============================================
   CÁC HÀM HỖ TRỢ BÊN NGOÀI
   ============================================== */

function renderCartPage() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    let total = 0;
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem;">Giỏ hàng của bạn đang trống!</td></tr>';
        document.getElementById('cart-total-price').textContent = '0 VNĐ';
        document.getElementById('checkout-btn').style.pointerEvents = 'none';
        document.getElementById('checkout-btn').style.opacity = '0.5';
    } else {
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.qty;
            total += itemTotal;
            
            let optText = [];
            if(item.size) optText.push(`Size ${item.size}`);
            if(item.sugar) optText.push(`${item.sugar}% Đường`);
            if(item.toppings && item.toppings.length > 0) optText.push(item.toppings.join(', '));
            let detailString = optText.join(' | ');

            cartContainer.innerHTML += `
                <tr>
                    <td data-label="Sản phẩm">
                        <div class="item-info">
                            <img src="${item.img}" class="item-img">
                            <div>
                                <strong>${item.name}</strong><br>
                                <span style="font-size: 0.8rem; color: #888;">${detailString}</span><br>
                                <button onclick="removeCartItem(${index})" style="color: red; background: none; border: none; font-size: 0.8rem; cursor: pointer; margin-top: 5px;">Xóa</button>
                            </div>
                        </div>
                    </td>
                    <td data-label="Đơn giá">${item.price.toLocaleString()}đ</td>
                    <td data-label="Số lượng">
                        <div class="quantity-control" style="display: inline-flex; border: 1px solid #ccc; border-radius: 5px; height: 30px;">
                            <button onclick="updateCartQty(${index}, -1)" class="cart-qty-btn" style="border: none; padding: 0 10px; cursor:pointer;">-</button>
                            <input type="text" value="${item.qty}" readonly style="width: 30px; text-align: center; border: none; background: transparent;">
                            <button onclick="updateCartQty(${index}, 1)" class="cart-qty-btn" style="border: none; padding: 0 10px; cursor:pointer;">+</button>
                        </div>
                    </td>
                    <td data-label="Thành tiền" style="color: var(--accent-color); font-weight: bold;">${itemTotal.toLocaleString()}đ</td>
                </tr>
            `;
        });
        document.getElementById('cart-total-price').textContent = total.toLocaleString() + ' VNĐ';
        document.getElementById('checkout-btn').style.pointerEvents = 'auto';
        document.getElementById('checkout-btn').style.opacity = '1';
    }
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
        b.textContent = totalItems;
        b.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

function showToast(message) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

window.removeCartItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('qt_cart', JSON.stringify(cart));
    renderCartPage();
    updateCartBadge();
};

window.updateCartQty = function(index, change) {
    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    if (cart[index].qty + change > 0) {
        cart[index].qty += change;
        localStorage.setItem('qt_cart', JSON.stringify(cart));
        renderCartPage();
        updateCartBadge();
    }
};