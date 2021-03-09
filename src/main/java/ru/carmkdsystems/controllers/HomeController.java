package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.carmkdsystems.repositories.ProductRepos;

import javax.servlet.http.HttpServletRequest;

@Controller
public class HomeController {

	@Autowired
	private ProductRepos productRepos;

	@GetMapping("/")
	public String home(Model model,
					   HttpServletRequest user,
					   @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
		if (user != null && user.isUserInRole("ADMIN")) {
			model.addAttribute("AllProducts", productRepos.findAllDesc(pageable));
		} else {
			model.addAttribute("AllProducts", productRepos.findAllByIsProduct(pageable));
		}
		return "home";
	}
}
