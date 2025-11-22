//package com.example.project.service;
//
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Base64;
//
//public class PhotoUtils {
//    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\photos\\";
//
//    public static void uploadImage(MultipartFile file) throws IOException {
//        //לשמור את התמונה במחשב השרת
//        String path=UPLOAD_DIRECTORY+file.getOriginalFilename();
//        Path fileName = Paths.get(path);
//        Files.write(fileName, file.getBytes());
//
//    }
//    public static String getImage(String path) throws IOException {
//        Path fileName=Paths.get(UPLOAD_DIRECTORY+path);
//        byte[] byteImage= Files.readAllBytes(fileName);//מעביר אותה למערך של ביטים
//        //כדי להפחית את תעבורת הרשת, נקודד למחרוזת של base64 שהיא קטנה יותר
//        return Base64.getEncoder().encodeToString(byteImage);
//    }
//}


//מהצאט 11/23
package com.example.project.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.*;
import java.util.Base64;
import java.util.UUID;

public class PhotoUtils {

    // יצירת תיקייה באופן תקין ל-Windows ול-Linux
    private static final Path UPLOAD_DIRECTORY =
            Paths.get(System.getProperty("user.dir"), "photos");

    static {
        try {
            Files.createDirectories(UPLOAD_DIRECTORY);
        } catch (IOException e) {
            System.err.println("Failed to create photo upload directory: " + UPLOAD_DIRECTORY.toAbsolutePath());
            e.printStackTrace();
        }
    }

    /**
     * העלאת תמונה: יצירת שם ייחודי + שמירה על הסיומת
     * @param file קובץ תמונה
     * @return String השם החדש של הקובץ (לשמירה ב-DB)
     */
    public static String uploadImage(MultipartFile file) throws IOException {

        // חילוץ סיומת
        String original = file.getOriginalFilename();
        String extension = "";
        int dot = original.lastIndexOf(".");
        if (dot > 0) {
            extension = original.substring(dot);
        }

        // יצירת שם קובץ חדש ייחודי
        String newFileName = UUID.randomUUID().toString() + "__img" + extension;

        // יצירת נתיב מלא לקובץ
        Path filePath = UPLOAD_DIRECTORY.resolve(newFileName);

        // שמירת התמונה בשרת
        Files.write(filePath, file.getBytes());

        // החזרת שם חדש לשמירה במסד הנתונים
        return newFileName;
    }

    /**
     * שליפת תמונה כ-Base64
     */
    public static String getImage(String path) throws IOException {
        Path filePath = UPLOAD_DIRECTORY.resolve(path);

        // בדיקה אם קיים
        if (Files.notExists(filePath)) {
            throw new FileNotFoundException("Image not found: " + filePath.toAbsolutePath());
        }

        // קריאת הקובץ
        byte[] imageBytes = Files.readAllBytes(filePath);

        // החזרה כ-base64
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}

