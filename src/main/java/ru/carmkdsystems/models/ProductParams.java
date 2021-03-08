package ru.carmkdsystems.models;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Entity
public class ProductParams {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String type;

    @ElementCollection
    private Set<String> params;

    @ElementCollection
    @MapKeyColumn(name = "product_id")
    @Column(name = "param")
    private Map<Long, String> productParams = new HashMap<>();

    public ProductParams() {}

    public ProductParams(String name, String type) {
        this.name = name;
        this.type = type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<String> getParams() {
        return params;
    }

    public void setParams(Set<String> params) {
        this.params = params;
    }

    public Map<Long, String> getProductParams() {
        return productParams;
    }

    public void setProductParams(Map<Long, String> productParams) {
        this.productParams = productParams;
    }
}
