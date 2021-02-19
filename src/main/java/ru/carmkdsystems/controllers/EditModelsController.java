package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.FirmCar;
import ru.carmkdsystems.models.ModelCar;
import ru.carmkdsystems.repositories.FirmCarRepos;
import ru.carmkdsystems.repositories.ModelCarRepos;

@Controller
@RequestMapping("/edit-models")
public class EditModelsController {
    @Autowired
    private FirmCarRepos firmCarRepos;
    @Autowired
    private ModelCarRepos modelCarRepos;

    @GetMapping
    public String showHtml(Model model) {
        model.addAttribute("allFirms", firmCarRepos.findAll());
        model.addAttribute("allModels", modelCarRepos.findAll());
        return "editModels";
    }

    @PostMapping
    public String postEditList(@RequestParam(value = "input", required = false) String input,
                               @RequestParam(value = "id", required = false) Long id,
                               @RequestParam("task") int task,
                               Model model) {
        if (task == 1 || task == 2 || task == 4) {
            if (!input.isEmpty() && input.length() > 64) {
                if (task == 1 || task == 2) {
                    model.addAttribute("errorText", "Слишком длинное название фирмы производителя");
                } else {
                    model.addAttribute("errorText", "Слишком длинное название модели автотранспорта");
                }
                model.addAttribute("allFirms", firmCarRepos.findAll());
                model.addAttribute("allModels", modelCarRepos.findAll());
                return "editModels";
            }
            if (!input.isEmpty()) {
                if (task == 1 || task == 2) {
                    if (firmCarRepos.findByFirm(input) != null) {
                        model.addAttribute("errorText", "Эта фирма уже существует!");
                        model.addAttribute("allFirms", firmCarRepos.findAll());
                        model.addAttribute("allModels", modelCarRepos.findAll());
                        return "editModels";
                    }
                } else {
                    if (modelCarRepos.findByModelAndFirmCar(input, firmCarRepos.findById(id).get()) != null) {
                        model.addAttribute("errorText", "Эта модель уже существует!");
                        model.addAttribute("allFirms", firmCarRepos.findAll());
                        model.addAttribute("allModels", modelCarRepos.findAll());
                        return "editModels";
                    }
                }
                if (task == 1) {
                    FirmCar firmCar = new FirmCar();
                    firmCar.setFirm(input);
                    firmCarRepos.save(firmCar);
                    model.addAttribute("successText", String.format("Фирма %s успешно создана!", input));
                } else if (task == 2) {
                    if (firmCarRepos.findById(id).isPresent()) {
                        FirmCar firmCar = firmCarRepos.findById(id).get();
                        String oldFirm = firmCar.getFirm();
                        firmCar.setFirm(input);
                        firmCarRepos.save(firmCar);
                        model.addAttribute("successText", String.format("Фирма %s успешно изменена на %s!", oldFirm, input));
                    }
                } else {
                    ModelCar modelCar = new ModelCar();
                    modelCar.setModel(input);
                    modelCar.setFirmCar(firmCarRepos.findById(id).get());
                    modelCarRepos.save(modelCar);
                    model.addAttribute("successText", String.format("Модель %s успешно создана!", input));
                }
            }
        } else if (task == 3) {
            if (firmCarRepos.findById(id).isPresent()) {
                String firmCar = firmCarRepos.findById(id).get().getFirm();
                modelCarRepos.deleteByFirmCar(firmCarRepos.findById(id).get());
                firmCarRepos.deleteById(id);
                model.addAttribute("successText", String.format("Фирма %s успешно удалена!", firmCar));
            }
        } else if (task == 5) {
            if (modelCarRepos.findById(id).isPresent()) {
                String modelCar = modelCarRepos.findById(id).get().getModel();
                modelCarRepos.deleteById(id);
                model.addAttribute("successText", String.format("Модель %s успешно удален!", modelCar));
            }
        }
        model.addAttribute("allFirms", firmCarRepos.findAll());
        model.addAttribute("allModels", modelCarRepos.findAll());
        return "editModels";
    }
}
