document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mở/Đóng menu trên thiết bị Mobile
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Hiệu ứng Toast Message khi thêm vào giỏ hàng (Gợi ý cho chức năng của Thanh Danh)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
            // Trong thực tế sẽ thay bằng Toast Message UI
        });
    });
});