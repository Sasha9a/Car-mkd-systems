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

	@NotBlank(message = "Введите текст")
	@Lob
	private String text;

	@ElementCollection(targetClass = CarBrands.class, fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	private Set<CarBrands> carBrands;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
