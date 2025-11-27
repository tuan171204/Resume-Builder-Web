@echo off
REM Set PayOS environment variables
set PAYOS_CLIENT_ID=e84b4e59-8ad2-411d-b52b-d863f42205b5
set PAYOS_API_KEY=470e8749-5a5a-4155-82e8-4297da8260bc
set PAYOS_CHECKSUM_KEY=ad864d55f445b079932b5ca342fb464adcda3c017345a7aac20f50784eaa450a
set PAYOS_ENDPOINT=https://api-merchant.payos.vn/v2/payment-requests

echo Starting Payment Service on port 8080...
echo PayOS Client ID: %PAYOS_CLIENT_ID%
echo.

call mvnw.cmd spring-boot:run

pause
