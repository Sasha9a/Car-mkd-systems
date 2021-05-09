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

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "product_price", joinColumns = @JoinColumn(name = "product_id"))
	private List<Integer> price = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "product_discount", joinColumns = @JoinColumn(name = "product_id"))
	private List<Integer> discount = new ArrayList<>();

	@NotNull(message = "Введите кол-во товара")
	@Min(value = 0, message = "Кол-во не может быть отрицательной")
	@Max(value = 100000, message = "Слишком большое кол-во")
	private Integer stock;

	private boolean isPublic;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
	private Set<String> images = new HashSet<>();

	@ManyToMany(fetch = FetchType.EAGER)
	private Set<ModelCar> modelsCars = new HashSet<>();

	public String convertToMoney(Integer mod) {
		if (price.get(mod) != null) {
			return NumberFormat.getCurrencyInstance(new Locale("ru", "RU")).format(price.get(mod));
		} else {
			return "";
		}
	}

	public String convertToMoneyDiscount(Integer mod) {
		if (discount.get(mod) != null) {
			return NumberFormat.getCurrencyInstance(new Locale("ru", "RU")).format(discount.get(mod));
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

	public List<Integer> getPrice() {
		return price;
	}

	public void setPrice(List<Integer> price) {
		this.price = price;
	}

	public List<Integer> getDiscount() {
		return discount;
	}

	public void setDiscount(List<Integer> discount) {
		this.discount = discount;
	}
}
