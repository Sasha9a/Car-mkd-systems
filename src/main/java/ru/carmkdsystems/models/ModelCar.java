package ru.carmkdsystems.models;

import javax.persistence.*;

@Entity
public class ModelCar {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String model;

    @ManyToOne(fetch = FetchType.EAGER)
    private FirmCar firmCar;

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

    public FirmCar getFirmCar() {
        return firmCar;
    }

    public void setFirmCar(FirmCar firmCar) {
        this.firmCar = firmCar;
    }
}
