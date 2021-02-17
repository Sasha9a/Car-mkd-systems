package ru.carmkdsystems.models;

import javax.persistence.*;

@Entity
public class FirmCar {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firm;

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
}
