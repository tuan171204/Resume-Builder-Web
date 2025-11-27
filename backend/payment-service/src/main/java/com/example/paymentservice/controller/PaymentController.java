package com.example.paymentservice.controller;

import com.example.paymentservice.service.PaymentService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@Slf4j
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    private final Gson gson = new Gson();

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(
            @RequestParam(defaultValue = "20000") long amount,
            @RequestParam(defaultValue = "test") String description,
            @RequestParam(defaultValue = "http://localhost:3000/cancel") String cancelUrl,
            @RequestParam(defaultValue = "http://localhost:3000/return") String returnUrl
    ) {
        try {
            long orderCode = System.currentTimeMillis();

            String payosResponse = paymentService.createPaymentLink(orderCode, amount, description, cancelUrl, returnUrl);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Payment link created successfully");
            response.put("data", gson.fromJson(payosResponse, Object.class));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error creating payment", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Payment service is running");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
