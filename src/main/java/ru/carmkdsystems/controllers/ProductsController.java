package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.repositories.ProductRepos;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductRepos productRepos;
    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/{id}")
    public String addProductFull(@PathVariable("id") Product product,
                                 Model model) {
        model.addAttribute("product", product);
        return "showProduct";
    }

    @PostMapping("/{id}")
    public String addProductFullPost(@PathVariable("id") Product product,
                                     @RequestParam("files") MultipartFile[] files,
                                     Model model) throws IOException {
        if (files != null) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            List<String> list = new ArrayList<>();
            for (MultipartFile f : files) {
                list.add(UUID.randomUUID().toString() + "." + f.getOriginalFilename());
                f.transferTo(new File(uploadPath + "/" + list.get(list.size() - 1)));
            }
            List<String> delImages = product.getImages();
            product.setImages(list);
            productRepos.save(product);
            if (delImages != null && !delImages.isEmpty()) {
                for (String s : delImages) {
                    File f = new File(uploadPath + "/" + s);
                    if (f.exists()) {
                        f.delete();
                    }
                }
            }
        }
        model.addAttribute("product", product);
        return "showProduct";
    }
}
