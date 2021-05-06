package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.ModelCar;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.repositories.ModelCarRepos;
import ru.carmkdsystems.repositories.ProductRepos;

import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/edit-models")
public class EditModelsController {
    @Autowired
    private ModelCarRepos modelCarRepos;
    @Autowired
    private ProductRepos productRepos;

    @GetMapping
    public String showHtml(Model model) {
        model.addAttribute("allModels", modelCarRepos.findAll());
        model.addAttribute("allFirms", getAllFirms());
        return "editModels";
    }

    @PostMapping
    public String postEditList(@RequestParam(value = "inputModel", required = false) String inputModel,
                               @RequestParam(value = "inputFirm", required = false) String inputFirm,
                               @RequestParam(value = "oldModel", required = false) String oldModel,
                               @RequestParam(value = "oldFirm", required = false) String oldFirm,
                               @RequestParam(value = "id", required = false) Long id,
                               @RequestParam("task") int task,
                               Model model) {
        if (task == 1) {
            if (!inputModel.isEmpty() && inputModel.length() > 64) {
                model.addAttribute("errorText", "Слишком длинное название модели автотранспорта");
            } else if (!inputFirm.isEmpty() && inputFirm.length() > 64) {
                model.addAttribute("errorText", "Слишком длинное название фирмы производителя");
            } else {
                if (!inputModel.isEmpty() && !inputFirm.isEmpty()) {
                    if (modelCarRepos.findByModelAndFirm(inputModel, inputFirm) == null) {
                        ModelCar modelCar = new ModelCar(inputModel, inputFirm);
                        modelCarRepos.save(modelCar);
                        model.addAttribute("successText", String.format("Модель %s фирмы %s успешно создана!", inputModel, inputFirm));
                    } else {
                        model.addAttribute("errorText", "Уже существует!");
                    }
                }
            }
        } else if (task == 2) {
            if (!inputFirm.isEmpty() && inputFirm.length() > 64) {
                model.addAttribute("errorText", "Слишком длинное название фирмы автотранспорта");
            } else {
                if (!inputFirm.isEmpty()) {
                    if (oldFirm.equals(inputFirm)) {
                        model.addAttribute("errorText", "Название фирмы совпадает с нынешним!");
                    } else {
                        Set<ModelCar> modelCarSet = modelCarRepos.findByFirm(oldFirm);
                        Iterable<Product> productSet = productRepos.findAll();
                        for (ModelCar m : modelCarSet) {
                            ModelCar modelCar = modelCarRepos.findByModelAndFirm(m.getModel(), inputFirm);
                            if (modelCar != null) {
                                for (Product p : productSet) {
                                    if (p.getModelsCars().contains(m)) {
                                        p.getModelsCars().add(modelCar);
                                    }
                                }
                                modelCarRepos.delete(m);
                            } else {
                                m.setFirm(inputFirm);
                                modelCarRepos.save(m);
                            }
                        }
                        model.addAttribute("successText", String.format("Фирма %s успешно изменена на %s!", oldFirm, inputFirm));
                    }
                }
            }
        } else if (task == 3) {
            modelCarRepos.deleteByFirm(oldFirm);
            model.addAttribute("successText", String.format("Фирма %s успешно удалена!", oldFirm));
        } else if (task == 4) {
            if (!inputModel.isEmpty() && inputModel.length() > 64) {
                model.addAttribute("errorText", "Слишком длинное название модели автотранспорта");
            } else {
                if (!inputModel.isEmpty()) {
                    if (oldModel.equals(inputModel)) {
                        model.addAttribute("errorText", "Название модели совпадает с нынешним!");
                    } else {
                        ModelCar res = modelCarRepos.findByModelAndFirm(oldModel, inputFirm);
                        ModelCar modelCar = modelCarRepos.findByModelAndFirm(inputModel, inputFirm);
                        Iterable<Product> productSet = productRepos.findAll();
                        if (modelCar != null) {
                            for (Product p : productSet) {
                                if (p.getModelsCars().contains(res)) {
                                    p.getModelsCars().add(modelCar);
                                }
                            }
                            modelCarRepos.delete(res);
                        } else {
                            res.setModel(inputModel);
                            modelCarRepos.save(res);
                        }
                        model.addAttribute("successText", String.format("Модель %s успешно изменена на %s!", oldModel, inputModel));
                    }
                }
            }
        } else if (task == 5) {
            modelCarRepos.delete(modelCarRepos.findByModelAndFirm(inputModel, inputFirm));
            model.addAttribute("successText", String.format("Модель %s успешно удалена!", inputModel));
        }
        model.addAttribute("allModels", modelCarRepos.findAll());
        model.addAttribute("allFirms", getAllFirms());
        return "editModels";
    }

    public Set<String> getAllFirms() {
        Set<String> res = new HashSet<>();
        for (ModelCar m : modelCarRepos.findAll()) {
            res.add(m.getFirm());
        }
        return res;
    }
}
