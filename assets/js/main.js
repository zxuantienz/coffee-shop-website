// 1. DATABASE GIẢ LẬP (MOCK DATA)
const products = [
    { id: '1', name: 'Cà Phê Sữa Đá', price: 45000, category: 'coffee', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', desc: 'Hương vị cà phê Robusta đậm đà hòa quyện cùng sữa đặc truyền thống.', type: 'drink' },
    { id: '2', name: 'Trà Đào Cam Sả', price: 55000, category: 'tea', img: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80', desc: 'Thanh mát vị trà, thơm hương đào và sả tươi.', type: 'drink' },
    { id: '3', name: 'Bánh Croissant Bơ Tỏi', price: 35000, category: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', desc: 'Bánh sừng trâu giòn rụm, thơm lừng bơ tỏi.', type: 'food' }
];

document.addEventListener('DOMContentLoaded', () => {
    // 2. TOGGLE MENU MOBILE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 3. XỬ LÝ TRANG CHI TIẾT SẢN PHẨM (Dynamic Detail Page)
    const detailContainer = document.querySelector('.product-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || '1'; // Mặc định là món 1 nếu không có ID
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('detail-img').src = product.img;
            document.getElementById('detail-name').textContent = product.name;
            document.getElementById('detail-price').textContent = product.price.toLocaleString() + ' VNĐ';
            document.getElementById('detail-desc').textContent = product.desc;

            // Ẩn tùy chọn Size/Đường nếu là bánh ngọt (Giải quyết lỗi 🟢)
            if (product.type === 'food') {
                const drinkOptions = document.querySelectorAll('.drink-only-option');
                drinkOptions.forEach(opt => opt.style.display = 'none');
            }
        }
    }

    // 4. CHỨC NĂNG LỌC DANH MỤC THỰC ĐƠN
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.menu-product-card');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Xóa active cũ, thêm active mới
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

    // 5. NÚT TĂNG GIẢM SỐ LƯỢNG
    const qtyControls = document.querySelectorAll('.quantity-control');
    qtyControls.forEach(control => {
        const minusBtn = control.querySelector('.btn-minus');
        const plusBtn = control.querySelector('.btn-plus');
        const input = control.querySelector('input');

        if(minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                if (val > 1) input.value = val - 1;
            });
            plusBtn.addEventListener('click', () => {
                let val = parseInt(input.value);
                input.value = val + 1;
            });
        }
    });

    // 6. THÔNG BÁO THÊM VÀO GIỎ
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
        });
    });
});