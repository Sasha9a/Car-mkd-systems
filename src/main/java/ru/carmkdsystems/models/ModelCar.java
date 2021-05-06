package ru.carmkdsystems.models;

import javax.persistence.*;

@Entity
public class ModelCar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String model;

    private String firm;

    public ModelCar() { }

    public ModelCar(String model, String firm) {
        this.model = model;
        this.firm = firm;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getFirm() {
        return firm;
    }

    public void setFirm(String firm) {
        this.firm = firm;
    }
}
