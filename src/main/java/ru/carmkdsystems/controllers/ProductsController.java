package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.carmkdsystems.models.FirmCar;
import ru.carmkdsystems.models.ModelCar;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.repositories.FirmCarRepos;
import ru.carmkdsystems.repositories.ModelCarRepos;
import ru.carmkdsystems.repositories.ProductRepos;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/products")
public class ProductsController {

    @Autowired
    private ProductRepos productRepos;
    @Autowired
    private FirmCarRepos firmCarRepos;
    @Autowired
    private ModelCarRepos modelCarRepos;
    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/{id}")
    public String addProductFull(@PathVariable("id") Product product,
                                 Model model) {
        Iterable<FirmCar> firmCar = firmCarRepos.findAll();
        ArrayList<FirmCar> isActiveFirm = new ArrayList<>();
        for (FirmCar f : firmCar) {
            if (product.getModelsCars().stream().anyMatch(u -> u.getFirmCar().getFirm().equals(f.getFirm()))) {
                isActiveFirm.add(f);
            }
        }
        model.addAttribute("product", product);
        model.addAttribute("allFirms", firmCar);
        model.addAttribute("allModels", modelCarRepos.findAll());
        model.addAttribute("activeFirms", isActiveFirm);
        return "showProduct";
    }

    @PostMapping("/{id}")
    public String addProductFullPost(@PathVariable("id") Product product,
                                     @RequestParam(value = "files", required = false) MultipartFile[] files,
                                     @RequestParam(value = "idModel", required = false) Long idModel,
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
        } else if (idModel != null) {
            if (modelCarRepos.findById(idModel).isPresent()) {
                ModelCar modelCar = modelCarRepos.findById(idModel).get();
                if (product.getModelsCars().contains(modelCar)) {
                    product.getModelsCars().remove(modelCar);
                } else {
                    product.getModelsCars().add(modelCar);
                }
                productRepos.save(product);
            }
        }
        Iterable<FirmCar> firmCar = firmCarRepos.findAll();
        ArrayList<FirmCar> isActiveFirm = new ArrayList<>();
        for (FirmCar f : firmCar) {
            if (product.getModelsCars().stream().anyMatch(u -> u.getFirmCar().getFirm().equals(f.getFirm()))) {
                isActiveFirm.add(f);
            }
        }
        model.addAttribute("product", product);
        model.addAttribute("allFirms", firmCar);
        model.addAttribute("allModels", modelCarRepos.findAll());
        model.addAttribute("activeFirms", isActiveFirm);
        return "showProduct";
    }
}
