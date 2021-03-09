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
import ru.carmkdsystems.models.ProductParams;
import ru.carmkdsystems.repositories.FirmCarRepos;
import ru.carmkdsystems.repositories.ModelCarRepos;
import ru.carmkdsystems.repositories.ProductParamsRepos;
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
    @Autowired
    private ProductParamsRepos productParamsRepos;
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
        model.addAttribute("allProductParams", productParamsRepos.findAll());
        return "showProduct";
    }

    @PostMapping("/{id}")
    public String addProductFullPost(@PathVariable("id") Product product,
                                     @RequestParam(value = "files", required = false) MultipartFile[] files,
                                     @RequestParam(value = "idModel", required = false) Long idModel,
                                     @RequestParam(value = "idParam", required = false) Long idParam,
                                     @RequestParam(value = "input", required = false) String input,
                                     @RequestParam(value = "number", required = false) Integer number,
                                     @RequestParam(value = "countStock", required = false) Integer countStock,
                                     @RequestParam(value = "price", required = false) Integer price,
                                     @RequestParam(value = "discount", required = false) Integer discount,
                                     @RequestParam(value = "isDel", required = false) Boolean isDel,
                                     @RequestParam(value = "isPublic", required = false) Boolean isPublic,
                                     @RequestParam(value = "isDelProduct", required = false) Boolean isDelProduct,
                                     @RequestParam Map<String, String> form,
                                     Model model) throws IOException {
        if (files != null) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }
            Set<String> list = new HashSet<>();
            for (MultipartFile f : files) {
                list.add(UUID.randomUUID().toString() + "." + f.getOriginalFilename());
                f.transferTo(new File(uploadPath + "/" + list.toArray()[list.size() - 1]));
            }
            Set<String> delImages = product.getImages();
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
        } else if (idParam != null) {
            if (productParamsRepos.findById(idParam).isPresent()) {
                ProductParams pp = productParamsRepos.findById(idParam).get();
                if (input != null) {
                    if (input.isEmpty()) {
                        pp.getProductParams().remove(product.getId());
                    } else {
                        pp.getProductParams().put(product.getId(), input);
                    }
                } else if (number != null) {
                    pp.getProductParams().put(product.getId(), String.format("%d", number));
                } else if (form.containsKey("bool")) {
                    if (form.get("bool").equals("Да") || form.get("bool").equals("Нет")) {
                        pp.getProductParams().put(product.getId(), form.get("bool"));
                    }
                }
                productParamsRepos.save(pp);
            }
        } else if (countStock != null) {
            product.setStock(countStock);
            productRepos.save(product);
        } else if (price != null) {
            product.setPrice(price);
            productRepos.save(product);
        } else if (discount != null) {
            product.setDiscount(discount);
            productRepos.save(product);
        } else if (isDel != null) {
            product.setDiscount(null);
            productRepos.save(product);
        } else if (isPublic != null) {
            product.setPublic(true);
            productRepos.save(product);
            return "redirect:/";
        } else if (isDelProduct != null) {
            for (String s : product.getImages()) {
                File f = new File(uploadPath + "/" + s);
                if (f.exists()) {
                    f.delete();
                }
            }
            productRepos.deleteById(product.getId());
            return "redirect:/";
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
        model.addAttribute("allProductParams", productParamsRepos.findAll());
        return "showProduct";
    }
}
