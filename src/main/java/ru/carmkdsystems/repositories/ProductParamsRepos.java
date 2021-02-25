package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.carmkdsystems.models.ProductParams;

import java.util.List;

public interface ProductParamsRepos extends CrudRepository<ProductParams, Long> {
    ProductParams findByName(String name);
    List<ProductParams> findAll();
}
