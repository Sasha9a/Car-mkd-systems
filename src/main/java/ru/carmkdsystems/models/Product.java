package ru.carmkdsystems.models;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank(message = "Введите название товара")
	@Length(max = 128, message = "Слишком длинное название товара")
	private String name;

	@NotNull(message = "Введите цену товара")
	@Min(value = 0, message = "Цена не может быть отрицательной")
	@Max(value = 100000, message = "Слишком большая цена")
	private Integer price;

	private Integer oldPrice;

	@NotNull(message = "Введите кол-во товара на складе")
	@Min(value = 0, message = "Кол-во не может быть отрицательной")
	@Max(value = 100000, message = "Слишком много товара на складе")
	private Integer inStock;

	@NotBlank(message = "Введите текст")
	@Lob
	private String text;

	@ElementCollection(targetClass = Category.class, fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	private Set<Category> category;

	@ElementCollection(targetClass = CarBrands.class, fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	private Set<CarBrands> carBrands;

	@NotBlank(message = "Введите модели машин")
	@Length(max = 128, message = "Превышен лимит символов")
	private String carModels;

	@Min(value = 0, message = "Год не может быть отрицательным")
	@Max(value = 2021, message = "Превышен минимальный год")
	private Integer minYear;

	@Min(value = 0, message = "Год не может быть отрицательным")
	@Max(value = 2021, message = "Превышен максимальный год")
	private Integer maxYear;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
