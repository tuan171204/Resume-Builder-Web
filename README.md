# 🚀 AI Resume Builder - Microservices Project

Dự án xây dựng CV tự động sử dụng kiến trúc Microservices với Spring Boot, ReactJS và tích hợp AI (Gemini/OpenRouter). Hệ thống được đóng gói hoàn toàn bằng Docker để dễ dàng triển khai.

# 📋 Mục lục

1. Yêu cầu hệ thống

2. Cấu trúc dự án

3. Hướng dẫn cài đặt & Chạy

4. Troubleshooting (Sửa lỗi thường gặp)

## 1.Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
+ Docker Desktop (Bắt buộc): Tải tại đây [https://docs.docker.com/desktop/setup/install/windows-install/] dành cho Windown
+ Git: Để clone source code.
+ RAM: Tối thiểu 8GB (Khuyến nghị 16GB để chạy mượt mà 10+ containers).

## 2.Cấu trúc dự án

my-project/
├── backend/                 # Chứa các Microservices (Java Spring Boot)
│   ├── api-gateway/         # Cổng giao tiếp chính (Port 8888)
│   ├── identity-service/    # Quản lý User & Auth (MySQL)
│   ├── user-service/        # Quản lý Profile (Neo4j)
│   ├── resume-service/      # Xử lý CV & AI (MongoDB)
│   ├── notification-service/# Thông báo (Kafka - Optional)
│   └── forum-service/       # Diễn đàn
├── frontend/                # Giao diện người dùng (React + Vite)
├── docker-compose.yml       # File cấu hình Docker (Orchestration)
└── .env                     # File chứa biến môi trường (API Keys, Secrets)


## 3. Hướng dẫn cài đặt & Chạy

### Bước 1: Clone dự án
> git clone <link-repo-của-bạn>
> cd Resume-Builder-Web
> 
### Bước 2: Cấu hình biến môi trường
Tạo một file tên là .env tại thư mục gốc (ngang hàng với docker-compose.yml) và dán nội dung sau vào. Thay thế your_api_key bằng key thực tế của bạn.

#### .env.example file 
> OPENROUTER_API_KEY= <tạo key trong trang của openrouter> ( bạn có thể tự đổi tên model và url trong file docker-compose.yml )


### Bước 3: Khởi động hệ thống
- Mở Terminal tại thư mục gốc và chạy lệnh sau để build và khởi động toàn bộ hệ thống (Frontend + Backend + Database):
> docker compose up -d --build

- Lưu ý: Lần chạy đầu tiên có thể mất từ 5-10 phút để tải images và biên dịch code Java/React.

### Bước 4: Kiểm tra trạng thái
Đảm bảo tất cả các containers đều ở trạng thái Running hoặc Healthy:
> docker compose ps

## 4. Troubleshooting (Sửa lỗi thường gặp)

### 1. Lỗi "Ports are not available" (3306, 8888...)
- Nguyên nhân: Máy của bạn đang chạy MySQL hoặc ứng dụng khác chiếm cổng này.
- Khắc phục:
Cách 1: Tắt MySQL/XAMPP trên máy.
Cách 2: Hoặc chỉnh sửa docker-compose.yml, đổi cổng host (bên trái dấu :) sang cổng khác. VD: "3309:3306".

### 2. Lỗi "Access denied for user 'root'" ở Identity Service

- Nguyên nhân: Mật khẩu DB cũ còn lưu trong Volume Docker.
- Khắc phục: Xóa volume để MySQL khởi tạo lại mật khẩu mới.
> docker compose down
> docker volume rm <ten_folder_du_an>_mysql_data
> docker compose up -d --build


### 3. Frontend báo lỗi "Rollup" hoặc "Node version"

- Nguyên nhân: Image Node.js trong Dockerfile cũ hoặc dùng Alpine không tương thích.
- Khắc phục: Đảm bảo frontend/Dockerfile đang sử dụng FROM node:20-slim.

### 4. API báo lỗi "Connection Refused" giữa các service

- Nguyên nhân: Service A gọi Service B qua localhost thay vì tên service.
- Khắc phục: Kiểm tra docker-compose.yml, đảm bảo các biến môi trường *_SERVICE_URL trỏ đến tên service (ví dụ: http://user-service:8082).

Chúc bạn thành công với dự án! :> 
