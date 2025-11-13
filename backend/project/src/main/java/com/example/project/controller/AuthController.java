//package com.example.project.controller;
//
//import com.example.project.security.jwt.JwtUtils;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//// בקר שאחראי לבדוק אם המשתמש מחובר לפי העוגייה
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
//public class AuthController {
//
//    @Autowired
//    private JwtUtils jwtUtils;
//
//    @GetMapping("/status")
//    public ResponseEntity<Boolean> checkLoginStatus(HttpServletRequest request) {
//        try {
//            String jwt = jwtUtils.getJwtFromCookies(request);
//            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
//                return ResponseEntity.ok(true);  // מחובר
//            } else {
//                return ResponseEntity.ok(false); // לא מחובר
//            }
//        } catch (Exception e) {
//            return ResponseEntity.ok(false);
//        }
//    }
//}

