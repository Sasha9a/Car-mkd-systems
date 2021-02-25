package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.ProductParams;
import ru.carmkdsystems.repositories.ProductParamsRepos;

@Controller
@RequestMapping("/edit-params")
public class EditParamsController {

    @Autowired
    private ProductParamsRepos productParamsRepos;

    @GetMapping
    public String showHtml(Model model) {
        model.addAttribute("allProductParams", productParamsRepos.findAll());
        return "editParams";
    }

    @PostMapping
    public String editParams(@RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "type", required = false) String type,
                             @RequestParam(value = "id", required = false) Long id,
                             Model model) {
        if (name != null && type != null) {
            if (!name.isEmpty() && !type.equals("Выберите тип...")) {
                if (name.length() > 100) {
                    model.addAttribute("errorText", "Слишком длинное название характеристики!");
                    model.addAttribute("allProductParams", productParamsRepos.findAll());
                    return "editParams";
                }
                if (productParamsRepos.findByName(name) != null) {
                    model.addAttribute("errorText", "Такая характеристика уже существует!");
                    model.addAttribute("allProductParams", productParamsRepos.findAll());
                    return "editParams";
                }
                ProductParams productParams = new ProductParams(name, type);
                productParamsRepos.save(productParams);
                model.addAttribute("successText", String.format("Характеристика <b>%s</b> успешно создана!", name));
            } else {
                model.addAttribute("errorText", "Вы не ввели все данные при создании!");
            }
        } else if (id != null) {
            if (productParamsRepos.findById(id).isPresent()) {
                String namePar = productParamsRepos.findById(id).get().getName();
                productParamsRepos.deleteById(id);
                model.addAttribute("successText", String.format("Характеристика <b>%s</b> успешно удалена!", namePar));
            }
        }
        model.addAttribute("allProductParams", productParamsRepos.findAll());
        return "editParams";
    }
}
