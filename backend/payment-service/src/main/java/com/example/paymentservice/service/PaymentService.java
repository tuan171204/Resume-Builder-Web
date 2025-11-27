package com.example.paymentservice.service;

import com.example.paymentservice.config.PayOSConfig;
import com.example.paymentservice.util.HmacUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class PaymentService {
    @Autowired
    private PayOSConfig payosConfig;

    private final Gson gson = new Gson();

    public String createPaymentLink(long orderCode, long amount, String description, String cancelUrl, String returnUrl) {
        try {
            // Validate config
            if (payosConfig.getClientId() == null || payosConfig.getClientId().isEmpty()) {
                throw new RuntimeException("PayOS clientId not configured. Set PAYOS_CLIENT_ID env variable.");
            }
            if (payosConfig.getChecksumKey() == null || payosConfig.getChecksumKey().isEmpty()) {
                throw new RuntimeException("PayOS checksumKey not configured. Set PAYOS_CHECKSUM_KEY env variable.");
            }

            // Build request body theo spec PayOS
            JsonObject requestBody = new JsonObject();
            requestBody.addProperty("orderCode", orderCode);
            requestBody.addProperty("amount", amount);
            requestBody.addProperty("description", description);
            requestBody.addProperty("cancelUrl", cancelUrl);
            requestBody.addProperty("returnUrl", returnUrl);

            // Generate signature: amount&cancelUrl&description&orderCode&returnUrl
            String dataToSign = String.format("amount=%d&cancelUrl=%s&description=%s&orderCode=%d&returnUrl=%s",
                    amount, cancelUrl, description, orderCode, returnUrl);

            String signature = HmacUtil.generateSignature(payosConfig.getChecksumKey(), dataToSign);
            requestBody.addProperty("signature", signature);

            // Send request
            String endpoint = payosConfig.getEndpoint();
            URL url = new URL(endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("x-client-id", payosConfig.getClientId());
            conn.setRequestProperty("x-api-key", payosConfig.getApiKey());
            conn.setDoOutput(true);

            // Write request body
            String requestJson = gson.toJson(requestBody);
            log.info("Sending PayOS request: {}", requestJson);
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = requestJson.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // Read response
            int responseCode = conn.getResponseCode();
            log.info("PayOS response code: {}", responseCode);

            if (responseCode >= 200 && responseCode < 300) {
                String response = new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                log.info("PayOS success response: {}", response);
                return response;
            } else {
                String errorResponse = new String(conn.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);
                log.error("PayOS error response: {}", errorResponse);
                throw new RuntimeException("PayOS API error: " + errorResponse);
            }

        } catch (Exception e) {
            log.error("Error calling PayOS API", e);
            throw new RuntimeException("Failed to create payment link: " + e.getMessage(), e);
        }
    }

    public String checkPaymentStatus(long orderCode) {
        try {
            // GET /v2/payment-requests/{orderCode}
            String endpoint = payosConfig.getEndpoint() + "/" + orderCode;
            URL url = new URL(endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("x-client-id", payosConfig.getClientId());
            conn.setRequestProperty("x-api-key", payosConfig.getApiKey());

            int responseCode = conn.getResponseCode();
            log.info("PayOS check status response code: {}", responseCode);

            if (responseCode >= 200 && responseCode < 300) {
                String response = new String(conn.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                log.info("PayOS check status success: {}", response);
                return response;
            } else {
                String errorResponse = new String(conn.getErrorStream().readAllBytes(), StandardCharsets.UTF_8);
                log.error("PayOS check status error: {}", errorResponse);
                throw new RuntimeException("PayOS API error: " + errorResponse);
            }

        } catch (Exception e) {
            log.error("Error checking payment status", e);
            throw new RuntimeException("Failed to check payment status: " + e.getMessage(), e);
        }
    }
}
