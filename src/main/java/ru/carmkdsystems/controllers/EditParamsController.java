package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.Params;
import ru.carmkdsystems.repositories.ParamsRepos;

@Controller
@RequestMapping("/edit-params")
public class EditParamsController {

    @Autowired
    private ParamsRepos paramsRepos;

    @GetMapping
    public String showHtml(Model model) {
        model.addAttribute("allParams", paramsRepos.findAll());
        return "editParams";
    }

    @PostMapping
    public String editParams(@RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "id", required = false) Long id,
                             Model model) {
        if (name != null) {
            if (!name.isEmpty()) {
                if (name.length() > 100) {
                    model.addAttribute("errorText", "Слишком длинное название характеристики!");
                    model.addAttribute("allProductParams", paramsRepos.findAll());
                    return "editParams";
                }
                if (paramsRepos.findByName(name) != null) {
                    model.addAttribute("errorText", "Такая характеристика уже существует!");
                    model.addAttribute("allProductParams", paramsRepos.findAll());
                    return "editParams";
                }
                Params params = new Params(name);
                paramsRepos.save(params);
                model.addAttribute("successText", String.format("Характеристика <b>%s</b> успешно создана!", name));
            } else {
                model.addAttribute("errorText", "Вы не ввели все данные при создании!");
            }
        } else if (id != null) {
            if (paramsRepos.findById(id).isPresent()) {
                String namePar = paramsRepos.findById(id).get().getName();
                paramsRepos.deleteById(id);
                model.addAttribute("successText", String.format("Характеристика <b>%s</b> успешно удалена!", namePar));
            }
        }
        model.addAttribute("allParams", paramsRepos.findAll());
        return "editParams";
    }
}
