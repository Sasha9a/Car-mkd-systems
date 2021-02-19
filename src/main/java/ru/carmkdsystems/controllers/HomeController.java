package ru.carmkdsystems.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.carmkdsystems.models.Product;

@Controller
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "home";
	}
}
