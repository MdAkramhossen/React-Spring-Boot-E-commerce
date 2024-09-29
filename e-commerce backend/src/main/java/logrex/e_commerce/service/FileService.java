package logrex.e_commerce.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface FileService {

    String uploadImage(String path, MultipartFile file) throws IOException;
    InputStream downloadImage(String path, String imageName) throws IOException;
}
