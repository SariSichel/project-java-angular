package com.example.project.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;


public class AudioUtils {

    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\audios\\";

    public static InputStreamResource getAudio(String path) throws IOException {
        Path filename= Paths.get(UPLOAD_DIRECTORY+path);
        InputStream stream = Files.newInputStream(filename);
        return new InputStreamResource(stream);
    }
        public static void uploadAudio(MultipartFile audio) throws Exception {
            Path path = Path.of(UPLOAD_DIRECTORY+ audio.getOriginalFilename());
            Files.createDirectories(path.getParent());
            Files.write(path, audio.getBytes());
        }
//
//        public static byte[] getAudioBytes(String filePath) throws Exception {
//            Path path = Path.of(filePath);
//            return Files.readAllBytes(path);
//        }
}
