package ru.carmkdsystems.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.carmkdsystems.repositories.ProductRepos;

@Controller
public class HomeController {

	@Autowired
	private ProductRepos productRepos;

	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("AllProducts", productRepos.findAll());
		return "home";
	}
}
