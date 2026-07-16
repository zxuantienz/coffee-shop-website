# ☕ Quyết Tiến Coffee - Website Thương Mại Điện Tử F&B

Dự án thiết kế và xây dựng giao diện website (Frontend) cho thương hiệu cửa hàng cà phê "Quyết Tiến Coffee", thuộc khuôn khổ Đồ án môn học Kỹ thuật phần mềm. 

🌐 **Link truy cập Website (Live Demo):** `[Nhóm dán link Netlify vào đây]`
🎨 **Link bản thiết kế (Figma):** `[Nhóm dán link Figma vào đây]`

## 👥 Đội ngũ phát triển (Nhóm 07)
* **Đoàn Xuân Tiến :** Phụ trách Quản lý File Báo cáo Word. Thiết kế luồng User Flow (Login, Profile, Order History, Blog).
* **Xuân Phước:** Phụ trách thiết lập Figma Design System. Code luồng Khám phá (Trang Chủ, Thực đơn, Giới thiệu, Liên hệ).
* **Võ Thanh Danh:** Phụ trách thiết lập Prototype. Code luồng Mua hàng (Chi tiết SP, Giỏ hàng, Checkout, Success).

## ✨ Điểm nổi bật của dự án
1. **Giao diện đáp ứng (Responsive Design):** Tối ưu hóa trải nghiệm trên cả PC và thiết bị di động (Mobile-friendly) với menu Hamburger tiện lợi.
2. **Hệ thống thiết kế chuẩn UI/UX:** Áp dụng nguyên tắc phối màu 60-30-10 (Trắng ngà - Nâu cà phê - Cam điểm nhấn) để tạo sự cân bằng thị giác và kích thích hành vi mua hàng.
3. **Mô phỏng tương tác (Prototype):** Trải nghiệm luồng đặt hàng mượt mà với các chức năng chọn Size, tùy chỉnh lượng đường đá, và hiệu ứng Toast Notification khi thêm vào giỏ hàng.

## 🛠 Công nghệ & Công cụ sử dụng
* **UI/UX Design:** Figma
* **Frontend:** HTML5, CSS3 (Flexbox, Grid, CSS Variables), Vanilla JavaScript.
* **Quản lý mã nguồn:** Git & GitHub (Mô hình nhánh - Branching strategy).
* **Triển khai (Deployment):** Netlify (Tự động hóa CI/CD từ nhánh `main`).

## 📁 Cấu trúc thư mục (Architecture)
```text
coffee-shop-website/
├── assets/                  # Tài nguyên dùng chung
│   ├── css/style.css        # Hệ thống Design System & Variables
│   └── js/main.js           # Xử lý tương tác Mobile Menu
├── pages/                   # Các trang module chức năng
│   ├── auth/                # Luồng Thành viên & Tin tức (Tiến)
│   ├── info/                # Luồng Khám phá & Thông tin (Phước)
│   └── shop/                # Luồng Mua sắm & Thanh toán (Danh)
├── index.html               # Trang chủ
└── README.md                # Tài liệu dự án