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

	private Integer price = 0;

	private Integer discount;

	private Integer stock = 0;

	private boolean isPublic;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
	private Set<String> images = new HashSet<>();

	@ManyToMany(fetch = FetchType.EAGER)
	private Set<ModelCar> modelsCars = new HashSet<>();

	public String convertToMoney() {
		if (price != null) {
			return NumberFormat.getCurrencyInstance(new Locale("ru", "RU")).format(price);
		} else {
			return "";
		}
	}

	public String convertToMoneyDiscount() {
		if (discount != null) {
			return NumberFormat.getCurrencyInstance(new Locale("ru", "RU")).format(discount);
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

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public Set<String> getImages() {
		return images;
	}

	public void setImages(Set<String> images) {
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
