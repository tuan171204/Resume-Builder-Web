@echo off
REM Set PayOS environment variables
set PAYOS_CLIENT_ID=e84b4e59-8ad2-411d-b52b-d863f42205b5
set PAYOS_API_KEY=470e8749-5a5a-4155-82e8-4297da8260bc
set PAYOS_CHECKSUM_KEY=b44091eaa9fa859e28be9deacf03e635ca03cdf852cba9691089172d748ad626
set PAYOS_ENDPOINT=https://api-merchant.payos.vn/v2/payment-requests

echo Starting Payment Service on port 8080...
echo PayOS Client ID: %PAYOS_CLIENT_ID%
echo.

call mvnw.cmd spring-boot:run

pause
