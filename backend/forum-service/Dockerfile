# Sử dụng Java 17 làm nền
FROM openjdk:17-jdk-slim

# Thư mục làm việc trong container
WORKDIR /app

# Copy file JAR đã build vào container
COPY target/*.jar app.jar

# Mở port (thay đổi theo service của bạn)
EXPOSE 8084

# Lệnh khởi chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]

