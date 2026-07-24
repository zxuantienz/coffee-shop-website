// 1. DATABASE GIẢ LẬP
const products = [
    { id: '1', name: 'Cà Phê Sữa Đá', price: 45000, category: 'coffee', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', desc: 'Hương vị cà phê Robusta đậm đà hòa quyện cùng sữa đặc truyền thống.', type: 'drink' },
    { id: '2', name: 'Trà Đào Cam Sả', price: 55000, category: 'tea', img: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80', desc: 'Thanh mát vị trà, thơm hương đào và sả tươi.', type: 'drink' },
    { id: '3', name: 'Bánh Croissant Bơ Tỏi', price: 35000, category: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', desc: 'Bánh sừng trâu giòn rụm, thơm lừng bơ tỏi.', type: 'food' }
];

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge(); // Cập nhật số lượng trên icon giỏ hàng ngay khi load trang

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
            // Xử lý lỗi nếu gõ ID bậy bạ trên URL
            document.querySelector('.product-info').innerHTML = `
                <h1 style="color: red;">Không tìm thấy sản phẩm!</h1>
                <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <a href="/pages/info/menu.html" class="btn-primary" style="margin-top: 15px;">Quay lại thực đơn</a>
            `;
            document.querySelector('.product-image').style.display = 'none';
        } else {
            document.getElementById('detail-img').src = product.img;
            document.getElementById('detail-name').textContent = product.name;
            document.getElementById('detail-price').textContent = product.price.toLocaleString() + ' VNĐ';
            document.getElementById('detail-desc').textContent = product.desc;
            
            // Lưu data-id vào form để lúc submit biết thêm món nào
            document.getElementById('add-to-cart-form').setAttribute('data-id', product.id);

            // Ẩn tùy chọn Size/Đường nếu là bánh
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

    // 5. NÚT TĂNG GIẢM SỐ LƯỢNG (Dùng chung cho Chi tiết & Giỏ hàng)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-minus')) {
            const input = e.target.nextElementSibling;
            if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
        }
        if (e.target.classList.contains('btn-plus')) {
            const input = e.target.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        }
    });

    // 6. THÊM VÀO GIỎ HÀNG (Lưu LocalStorage & Hiện Toast UX)
    const detailForm = document.getElementById('add-to-cart-form');
    if (detailForm) {
        detailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pId = detailForm.getAttribute('data-id');
            const product = products.find(p => p.id === pId);
            const qty = parseInt(detailForm.querySelector('input[name="quantity"]').value);
            
            // Lấy options (nếu có)
            let size = product.type === 'drink' ? document.querySelector('input[name="size"]:checked').value : '';
            let extraPrice = size === 'M' ? 10000 : (size === 'L' ? 15000 : 0);
            
            const cartItem = {
                id: Date.now(), // ID duy nhất cho giỏ hàng
                productId: product.id,
                name: product.name,
                img: product.img,
                qty: qty,
                size: size,
                price: product.price + extraPrice
            };

            let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
            cart.push(cartItem);
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
            cart.push({ id: Date.now(), productId: product.id, name: product.name, img: product.img, qty: 1, size: 'S', price: product.price });
            localStorage.setItem('qt_cart', JSON.stringify(cart));
            
            updateCartBadge();
            showToast(`Đã thêm ${product.name} vào giỏ!`);
        });
    });

    // 7. RENDER GIỎ HÀNG (cart.html)
    const cartContainer = document.getElementById('cart-items-container');
    if (cartContainer) {
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
                let sizeText = item.size ? `Size ${item.size}` : '';
                
                cartContainer.innerHTML += `
                    <tr>
                        <td data-label="Sản phẩm">
                            <div class="item-info">
                                <img src="${item.img}" class="item-img">
                                <div>
                                    <strong>${item.name}</strong><br>
                                    <span style="font-size: 0.85rem; color: #888;">${sizeText}</span><br>
                                    <button onclick="removeCartItem(${index})" style="color: red; background: none; border: none; font-size: 0.8rem; cursor: pointer; margin-top: 5px;">Xóa</button>
                                </div>
                            </div>
                        </td>
                        <td data-label="Đơn giá">${item.price.toLocaleString()}đ</td>
                        <td data-label="Số lượng">${item.qty}</td>
                        <td data-label="Thành tiền" style="color: var(--accent-color); font-weight: bold;">${itemTotal.toLocaleString()}đ</td>
                    </tr>
                `;
            });
            document.getElementById('cart-total-price').textContent = total.toLocaleString() + ' VNĐ';
        }
    }

    // 8. RENDER THANH TOÁN (checkout.html)
    const checkoutSummary = document.getElementById('checkout-summary-items');
    if (checkoutSummary) {
        let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
        let total = 0;
        checkoutSummary.innerHTML = '';
        
        cart.forEach(item => {
            total += (item.price * item.qty);
            checkoutSummary.innerHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>${item.qty}x ${item.name} ${item.size ? '(Size '+item.size+')' : ''}</span>
                    <strong>${(item.price * item.qty).toLocaleString()}đ</strong>
                </div>
            `;
        });
        
        const shipping = cart.length > 0 ? 15000 : 0;
        document.getElementById('checkout-subtotal').textContent = total.toLocaleString() + 'đ';
        document.getElementById('checkout-shipping').textContent = shipping.toLocaleString() + 'đ';
        document.getElementById('checkout-final-total').textContent = (total + shipping).toLocaleString() + ' VNĐ';

        // Xử lý khi nhấn nút Đặt hàng
        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if(cart.length === 0) return alert('Giỏ hàng trống!');
            
            // Tạo mã đơn hàng random
            const orderId = '#QT' + Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('qt_last_order', orderId); // Lưu lại để success.html đọc
            localStorage.removeItem('qt_cart'); // Xóa giỏ hàng
            window.location.href = '/pages/shop/success.html'; // Chuyển trang
        });
    }

    // 9. TRANG THÀNH CÔNG (success.html)
    const orderCodeElement = document.getElementById('success-order-code');
    if (orderCodeElement) {
        const lastOrder = localStorage.getItem('qt_last_order') || '#QT0000';
        orderCodeElement.textContent = 'Mã đơn hàng: ' + lastOrder;
    }
});

// Hàm hỗ trợ: Cập nhật Badge trên Header
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
        b.textContent = totalItems;
        b.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

// Hàm hỗ trợ: Hiển thị Toast mượt mà
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
    }, 3000);
}

// Hàm hỗ trợ: Xóa món ở giỏ hàng
window.removeCartItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('qt_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('qt_cart', JSON.stringify(cart));
    location.reload(); // Tải lại trang để update
};