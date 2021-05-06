package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.carmkdsystems.models.Product;
import ru.carmkdsystems.repositories.ModelCarRepos;
import ru.carmkdsystems.repositories.ProductRepos;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

	@Autowired
	private ProductRepos productRepos;
	@Autowired
	private ModelCarRepos modelCarRepos;

	@GetMapping("/")
	public String home(Model model,
					   HttpServletRequest user,
					   @RequestParam(defaultValue = "", required = false) String firmCar,
					   @RequestParam(defaultValue = "", required = false) String modelCar/*,
					   @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC, size = 20) Pageable pageable*/) {
//		Page<Product> products;
//		if (user != null && user.isUserInRole("ADMIN")) {
//			if (firmCar != null && !firmCar.isEmpty() && modelCar != null && !modelCar.isEmpty()) {
//				products = productRepos.findAllByFirmAndModel(firmCar, modelCar, pageable);
//			} else if (firmCar != null && !firmCar.isEmpty()) {
//				products = productRepos.findAllByFirm(firmCar, pageable);
//			} else {
//				products = productRepos.findAllDesc(pageable);
//			}
//		} else {
//			if (firmCar != null && !firmCar.isEmpty() && modelCar != null && !modelCar.isEmpty()) {
//				products = productRepos.findAllByFirmAndModelIsProduct(firmCar, modelCar, pageable);
//			} else if (firmCar != null && !firmCar.isEmpty()) {
//				products = productRepos.findAllByFirmIsProduct(firmCar, pageable);
//			} else {
//				products = productRepos.findAllByIsProduct(pageable);
//			}
//		}
//		model.addAttribute("AllProducts", products);
//		if (firmCar != null && !firmCar.isEmpty()) {
//			model.addAttribute("firmCar", firmCar);
//			model.addAttribute("AllModels", modelCarRepos.findAllByFirmCar(firmCarRepos.findByFirm(firmCar)));
//		}
//		if (modelCar != null && !modelCar.isEmpty()) {
//			model.addAttribute("modelCar", modelCar);
//		}
		return "home";
	}
}
