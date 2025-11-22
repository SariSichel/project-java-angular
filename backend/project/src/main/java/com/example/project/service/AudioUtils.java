//
////של גמיני
//package com.example.project.service;
//
//import org.springframework.core.io.InputStreamResource;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.FileNotFoundException;
//import java.io.IOException;
//import java.io.InputStream;
//import java.nio.file.*;
//
//public class AudioUtils {
//
//    // שינוי: שימוש ב-Paths.get כדי לאחד את הנתיב בצורה בטוחה, ללא מפרידים ידניים.
//    private static final Path UPLOAD_DIRECTORY =
//            Paths.get(System.getProperty("user.dir"), "audios");
//
//    // ודא שהתיקייה נוצרת מראש
//    static {
//        try {
//            Files.createDirectories(UPLOAD_DIRECTORY);
//        } catch (IOException e) {
//            System.err.println("Failed to create audio upload directory: " + UPLOAD_DIRECTORY.toAbsolutePath());
//            e.printStackTrace();
//        }
//    }
//
//
//    public static InputStreamResource getAudio(String path) throws IOException {
//        // בניית הנתיב המלא באופן בטוח ללא מפרידים כפולים: [UPLOAD_DIRECTORY] / [path]
//        Path filename = UPLOAD_DIRECTORY.resolve(path);
//
//        // --- הדפסת DEBUG נשארת כדי לאמת את הנתיב החדש ---
//        System.out.println("DEBUG: Attempting to read file from path: " + filename.toAbsolutePath());
//        // ------------------------------------
//
//        // בדיקה מפורשת לקיום וקריאות
//        if (Files.notExists(filename)) {
//            throw new FileNotFoundException("Audio file not found: " + filename.toAbsolutePath());
//        }
//        if (!Files.isReadable(filename)) {
//            // אם הקובץ קיים אבל אין הרשאה לקרוא
//            throw new IOException("Permission denied to read audio file: " + filename.toAbsolutePath());
//        }
//
//        // קריאת הקובץ
//        InputStream stream = Files.newInputStream(filename, StandardOpenOption.READ);
//        return new InputStreamResource(stream);
//    }
//
//    public static void uploadAudio(MultipartFile audio) throws Exception {
//        // שימוש ב-UPLOAD_DIRECTORY.resolve() כדי לבנות את הנתיב בצורה בטוחה
//        Path path = UPLOAD_DIRECTORY.resolve(audio.getOriginalFilename());
//        // Files.createDirectories(path.getParent()); - כבר בוצע בבלוק static
//        Files.write(path, audio.getBytes());
//    }
//}
//
//
//
//
//
//
////הקוד שלנו
////package com.example.project.service;
////
////import org.springframework.core.io.InputStreamResource;
////import org.springframework.web.multipart.MultipartFile;
////
////import java.io.IOException;
////import java.io.InputStream;
////import java.nio.file.*;
////
////
////public class AudioUtils {
////
////    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\audios\\";
////
////    public static InputStreamResource getAudio(String path) throws IOException {
////        Path filename= Paths.get(UPLOAD_DIRECTORY+path);
////
////        //
////        // --- הוסף את שורת ההדפסה הזו! ---
////        System.out.println("DEBUG: Attempting to read file from path: " + filename.toAbsolutePath());
////        // ------------------------------------
////
////        if (Files.notExists(filename) || !Files.isReadable(filename)) {
////            // זורק שגיאה ספציפית אם הקובץ לא נמצא או לא קריא
////            throw new java.io.FileNotFoundException("Audio file not found or unreadable: " + filename.toAbsolutePath());
////        }
////
////        //
////        InputStream stream = Files.newInputStream(filename);
////        return new InputStreamResource(stream);
////    }
////        public static void uploadAudio(MultipartFile audio) throws Exception {
////            Path path = Path.of(UPLOAD_DIRECTORY+ audio.getOriginalFilename());
////            Files.createDirectories(path.getParent());
////            Files.write(path, audio.getBytes());
////        }
//////
//////        public static byte[] getAudioBytes(String filePath) throws Exception {
//////            Path path = Path.of(filePath);
//////            return Files.readAllBytes(path);
//////        }
////}
package com.example.project.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.UUID; // ייבוא נדרש

public class AudioUtils {

    private static final Path UPLOAD_DIRECTORY =
            Paths.get(System.getProperty("user.dir"), "audios");

    static {
        try {
            Files.createDirectories(UPLOAD_DIRECTORY);
        } catch (IOException e) {
            System.err.println("Failed to create audio upload directory: " + UPLOAD_DIRECTORY.toAbsolutePath());
            e.printStackTrace();
        }
    }


    public static InputStreamResource getAudio(String path) throws IOException {
        Path filename = UPLOAD_DIRECTORY.resolve(path);

        System.out.println("DEBUG: Attempting to read file from path: " + filename.toAbsolutePath());

        if (Files.notExists(filename)) {
            throw new FileNotFoundException("Audio file not found: " + filename.toAbsolutePath());
        }
        if (!Files.isReadable(filename)) {
            throw new IOException("Permission denied to read audio file: " + filename.toAbsolutePath());
        }

        InputStream stream = Files.newInputStream(filename, StandardOpenOption.READ);
        return new InputStreamResource(stream);
    }

    /**
     * מקבל קובץ אודיו, יוצר לו שם ייחודי + הסיומת המקורית, שומר ושולח את שם הקובץ החדש.
     * @param audio הקובץ לעיבוד
     * @return String שם הקובץ החדש שנוצר (כולל סיומת)
     */
    public static String uploadAudio(MultipartFile audio) throws Exception {
        // 1. מחלץ את שם הקובץ המקורי כדי לקבל את הסיומת (.mp3)
        String originalFilename = audio.getOriginalFilename();
        String fileExtension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFilename.substring(dotIndex);
        }

        // 2. יוצר שם קובץ חדש (GUID + סיומת)
        String newFileName = UUID.randomUUID().toString() + "__d210" + fileExtension;

        // 3. בונה את הנתיב לשמירה
        Path path = UPLOAD_DIRECTORY.resolve(newFileName);

        // 4. שומר את הקובץ
        Files.write(path, audio.getBytes());

        // 5. מחזיר את השם החדש שנוצר (לשמירה ב-DB)
        return newFileName;
    }


}
