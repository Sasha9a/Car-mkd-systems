package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.carmkdsystems.models.Params;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.models.ProductParams;
import ru.carmkdsystems.repositories.ParamsRepos;
import ru.carmkdsystems.repositories.ProductParamsRepos;
import ru.carmkdsystems.repositories.ProductRepos;

import javax.validation.Valid;
import java.util.Map;

@Controller
@RequestMapping("/create-product")
public class CreateProductController {

    @Autowired
    private ProductRepos productRepos;
    @Autowired
    private ParamsRepos paramsRepos;
    @Autowired
    private ProductParamsRepos productParamsRepos;

    @GetMapping
    public String showHtml() {
        return "createProduct";
    }

    @PostMapping
    public String addProduct(@Valid Product product,
                             BindingResult bindingResult,
                             Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("product", product);
            Map<String, String> errors = ControllerUtils.getErrors(bindingResult);
            model.mergeAttributes(errors);
            return "createProduct";
        }
        product.getDiscount().add(0);
        product.getPrice().add(0);
        Product res = productRepos.save(product);
        for (Params p : paramsRepos.findAll()) {
            ProductParams productParams = new ProductParams();
            productParams.setIdProduct(res.getId());
            productParams.setModProduct(0);
            productParamsRepos.save(productParams);
        }
        return "redirect:/products/" + res.getId().toString();
    }
}
