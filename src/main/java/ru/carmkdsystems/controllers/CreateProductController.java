package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.repositories.ProductRepos;

import javax.validation.Valid;
import java.util.Map;

@Controller
@RequestMapping("/create-product")
public class CreateProductController {

    @Autowired
    private ProductRepos productRepos;

    @GetMapping
    public String showHtml() {
        return "createProduct";
    }

    @PostMapping
    public String addProduct(@Valid Product product,
                             BindingResult bindingResult,
                             Model model) {
        model.addAttribute("product", product);
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = ControllerUtils.getErrors(bindingResult);
            model.mergeAttributes(errors);
            return "createProduct";
        }
        Product res = productRepos.save(product);
        return "redirect:/products/" + res.getId().toString();
    }
}
