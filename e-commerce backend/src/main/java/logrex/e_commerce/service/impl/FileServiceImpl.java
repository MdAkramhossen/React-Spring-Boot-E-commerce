package logrex.e_commerce.service.impl;

import logrex.e_commerce.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class FileServiceImpl implements FileService {
    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        String name = file.getOriginalFilename();

        String filePath=path+File.pathSeparator+name;
        File uploadDir = new File(path);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs(); // Creates the directory if it doesn't exist
        }

        Files.copy(file.getInputStream(), Paths.get(filePath));
        return name;
    }

    @Override
    public InputStream downloadImage(String path, String imageName) throws IOException {

        String fullPath=path+File.pathSeparator+imageName;
        InputStream inputStream=new FileInputStream(fullPath);
        return inputStream;
    }
}
