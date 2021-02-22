package ru.carmkdsystems.models;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.NumberFormat;
import java.util.*;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank(message = "Введите название товара")
	@Length(max = 100, message = "Слишком длинное название товара")
	private String name;

	@NotNull(message = "Введите цену товара")
	@Min(value = 0, message = "Цена не может быть отрицательной")
	@Max(value = 100000, message = "Слишком большая цена")
	private Integer price;

	@NotNull(message = "Введите кол-во товара")
	@Min(value = 0, message = "Кол-во не может быть отрицательной")
	@Max(value = 100000, message = "Слишком большое кол-во")
	private Integer stock;

	private boolean isPublic;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
	private List<String> images = new ArrayList<>();

	@ManyToMany(fetch = FetchType.EAGER)
	private Set<ModelCar> modelsCars = new HashSet<>();

	public String convertToMoney() {
		if (price != null) {
			return NumberFormat.getCurrencyInstance(new Locale("ru", "RU")).format(price);
		} else {
			return "";
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public boolean isPublic() {
		return isPublic;
	}

	public void setPublic(boolean aPublic) {
		isPublic = aPublic;
	}

	public Set<ModelCar> getModelsCars() {
		return modelsCars;
	}

	public void setModelsCars(Set<ModelCar> modelsCars) {
		this.modelsCars = modelsCars;
	}
}
