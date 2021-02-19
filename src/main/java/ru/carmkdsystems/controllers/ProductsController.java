package ru.carmkdsystems.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.carmkdsystems.models.Product;

@Controller
@RequestMapping("/products")
public class ProductsController {

    @GetMapping("/{id}")
    public String addProductFull(@PathVariable("id") Product product,
                                 Model model) {
        model.addAttribute("product", product);
        return "showProduct";
    }
}
