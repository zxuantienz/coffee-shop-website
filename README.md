# Quyết Tiến Coffee - UI/UX & Website Frontend

Dự án thiết kế giao diện website thương mại điện tử ngành F&B (Cửa hàng Cà phê), thuộc khuôn khổ Đồ án môn học Kỹ thuật phần mềm. Hệ thống được thiết kế tối ưu cho việc đặt món nhanh và trải nghiệm thị giác hấp dẫn dựa trên nguyên tắc màu 60-30-10.

## 👥 Thành viên nhóm & Phân công công việc

**Lớp:** 71K29CNTT11 | **Trường Đại học Văn Lang**

| Họ và tên | MSSV | Chuyên ngành | Phân công công việc | Trạng thái Git Branch |
| :--- | :--- | :--- | :--- | :--- |
| **Đoàn Xuân Tiến** | 2374802010493 | Trí tuệ Nhân tạo | Quản lý File Báo cáo Word. Thiết kế luồng User Flow (Login, Profile, Order History). Tìm kiếm tài nguyên. Định hướng Frontend Intern. | `feature/doan-xuan-tien` |
| **Xuân Phước** | (Cập nhật MSSV) | Công nghệ thông tin | Thiết lập Figma Design System. Code luồng Khám phá (Trang Chủ, Thực đơn, Giới thiệu). | `feature/xuan-phuoc` |
| **Võ Thanh Danh** | (Cập nhật MSSV) | Công nghệ thông tin | Thiết lập Prototype. Code luồng Mua hàng (Chi tiết SP, Giỏ hàng, Checkout, Success). | `feature/thanh-danh` |

## 🛠 Công nghệ & Công cụ sử dụng
- **Thiết kế UI/UX:** Figma (Wireframe & High-fidelity Prototype).
- **Phát triển Frontend:** HTML5 (Semantic), CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla JavaScript.
- **Môi trường:** Visual Studio Code.
- **Quản lý mã nguồn:** Git & GitHub (Mô hình nhánh Individual Branch $\rightarrow$ Main Branch).

## 📁 Cấu trúc thư mục (Architecture)
Hệ thống tuân thủ cấu trúc phân lớp tài nguyên tĩnh và module hóa các trang chức năng:

```text
coffee-shop-website/
├── assets/                  # Tài nguyên CSS, JS, Images
├── pages/
│   ├── auth/                # Chức năng thành viên (Tiến)
│   ├── shop/                # Chức năng mua sắm & thanh toán (Danh)
│   └── info/                # Chức năng thông tin & danh mục (Phước)
├── index.html               # Trang chủ
└── README.md