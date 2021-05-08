package ru.carmkdsystems.models;

import javax.persistence.*;

@Entity
public class ProductParams {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long idProduct;

    private Integer modProduct;

    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    public Integer getModProduct() {
        return modProduct;
    }

    public void setModProduct(Integer modProduct) {
        this.modProduct = modProduct;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
