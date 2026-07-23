# ☕ Quyết Tiến Coffee - UI/UX & Website Frontend

Dự án thiết kế giao diện website thương mại điện tử ngành F&B (Cửa hàng Cà phê), thuộc khuôn khổ Đồ án môn học Kỹ thuật phần mềm. Hệ thống được thiết kế tối ưu cho việc đặt món nhanh và trải nghiệm thị giác hấp dẫn dựa trên nguyên tắc màu 60-30-10.

🔗 **Link truy cập Website (Live Demo):** figma.com/design/bhIy3I6GnsE3lVd6OETxBv/41.Xuân-Tiến-Đoàn-s-team-library?t=3SCaboDysvfkLweg-0 
🎨 **Link bản thiết kế (Figma):** figma.com/proto/bhIy3I6GnsE3lVd6OETxBv/41.Xuân-Tiến-Đoàn-s-team-library?node-id=3359-123&t=3SCaboDysvfkLweg-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&fuid=1562799235958100802

## 👥 Thành viên nhóm & Phân công công việc

**Lớp:** 71K29CNTT11 | **Trường Đại học Văn Lang**

| Họ và tên | MSSV | Chuyên ngành | Phân công công việc | Trạng thái Git Branch |
| :--- | :--- | :--- | :--- | :--- |
| **Đoàn Xuân Tiến** | 2374802010493 | Công nghệ thông tin | Quản lý File Báo cáo Word. Thiết kế luồng User Flow (Login, Profile, Order History, Blog). Tìm kiếm tài nguyên. | `doan-xuan-tien` |
| **Nguyễn Trương Xuân Phước** | 2474802010322 | Công nghệ thông tin | Thiết lập Figma Design System. Code luồng Khám phá (Trang Chủ, Thực đơn, Giới thiệu, Liên hệ). | `xuan-phuoc` |
| **Võ Thanh Danh** | 2374802010064 | Công nghệ thông tin | Thiết lập Prototype. Code luồng Mua hàng (Chi tiết SP, Giỏ hàng, Checkout, Success). | `thanh-danh` |

## 🛠 Công nghệ & Công cụ sử dụng
- **Thiết kế UI/UX:** Figma (Wireframe & High-fidelity Prototype).
- **Phát triển Frontend:** HTML5 (Semantic), CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla JavaScript.
- **Môi trường:** Visual Studio Code.
- **Quản lý mã nguồn:** Git & GitHub (Mô hình nhánh Individual Branch -> Main Branch).

## 📁 Cấu trúc thư mục (Architecture)
Hệ thống tuân thủ cấu trúc phân lớp tài nguyên tĩnh và module hóa các trang chức năng:

```text
coffee-shop-website/
├── assets/                  # Tài nguyên tĩnh
│   ├── css/
│   │   └── style.css        # Hệ thống Design System & Variables
│   └── js/
│       └── main.js          # Xử lý tương tác Mobile Menu & UI
├── pages/                   # Các trang module chức năng
│   ├── auth/                # Luồng Thành viên & Tin tức (Tiến)
│   │   ├── blog.html
│   │   ├── history.html
│   │   ├── login.html
│   │   └── profile.html
│   ├── info/                # Luồng Thông tin & Danh mục (Phước)
│   │   ├── about.html
│   │   ├── contact.html
│   │   └── menu.html
│   └── shop/                # Luồng Mua sắm & Thanh toán (Danh)
│       ├── cart.html
│       ├── checkout.html
│       ├── product-detail.html
│       └── success.html
├── index.html               # Trang chủ
└── README.md                # Tài liệu dự án
