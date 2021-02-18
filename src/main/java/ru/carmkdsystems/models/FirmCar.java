package ru.carmkdsystems.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class FirmCar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firm;

    @OneToMany(mappedBy = "firmCar", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private Set<ModelCar> modelCars = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirm() {
        return firm;
    }

    public void setFirm(String firm) {
        this.firm = firm;
    }

    public Set<ModelCar> getModelCars() {
        return modelCars;
    }

    public void setModelCars(Set<ModelCar> modelCars) {
        this.modelCars = modelCars;
    }
}
