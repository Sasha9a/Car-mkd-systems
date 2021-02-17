package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.FirmCar;
import ru.carmkdsystems.repositories.FirmCarRepos;

@Controller
@RequestMapping("/edit-models")
public class EditModelsController {
    @Autowired
    private FirmCarRepos firmCarRepos;

    @GetMapping
    public String showHtml(Model model) {
        model.addAttribute("allFirms", firmCarRepos.findAll());
        return "editModels";
    }

    @PostMapping
    public String postEditList(@RequestParam(value = "firm", required = false) String firm,
                               @RequestParam(value = "id", required = false) Long id,
                               @RequestParam("task") int task,
                               Model model) {
        if (task == 1 || task == 2) {
            if (!firm.isEmpty() && firm.length() > 64) {
                model.addAttribute("errorText", "Слишком длинное название фирмы производителя");
                model.addAttribute("allFirms", firmCarRepos.findAll());
                return "editModels";
            }
            if (!firm.isEmpty()) {
                if (firmCarRepos.findByFirm(firm) != null) {
                    model.addAttribute("errorText", "Эта фирма уже существует!");
                    model.addAttribute("allFirms", firmCarRepos.findAll());
                    return "editModels";
                }
                FirmCar firmCar;
                if (task == 1) {
                    firmCar = new FirmCar();
                    firmCar.setFirm(firm);
                    firmCarRepos.save(firmCar);
                    model.addAttribute("successText", String.format("Фирма %s успешно создана!", firm));
                } else {
                    firmCar = firmCarRepos.findById(id).get();
                    String oldFirm = firmCar.getFirm();
                    firmCar.setFirm(firm);
                    firmCarRepos.save(firmCar);
                    model.addAttribute("successText", String.format("Фирма %s успешно изменена на %s!", oldFirm, firm));
                }
            }
        }
        model.addAttribute("allFirms", firmCarRepos.findAll());
        return "editModels";
    }
}
